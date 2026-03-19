import 'dotenv/config';
import express, { Request, Response } from 'express';
import mysql, { RowDataPacket, ResultSetHeader } from 'mysql2';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

// JSONボディのパース
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静的ファイルの配信
app.use(express.static(path.join(__dirname, '../public')));

// MySQL接続設定
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'izakaya_kagaribi'
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

// 型定義
interface MenuItem extends RowDataPacket {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
    image_url: string;
    is_available: boolean;
    created_at: Date;
    updated_at: Date;
}

interface ReservationRequestBody {
    date: string;
    time: string;
    people: string | number;
    course?: string;
    name: string;
    tel: string;
    email: string;
    message?: string;
}

// API: 予約作成
app.post('/api/reservations', (req: Request<{}, {}, ReservationRequestBody>, res: Response) => {
    const { date, time, people, course, name, tel, email, message } = req.body;

    // バリデーション（簡易）
    if (!date || !time || !people || !name || !tel) {
        res.status(400).json({ success: false, message: '必須項目が不足しています' });
        return;
    }

    const query = `
        INSERT INTO reservations (reservation_date, reservation_time, people_count, course_name, customer_name, customer_phone, customer_email, special_request)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // 数値変換
    // req.body.people は string または number の可能性があるため変換
    let peopleCount = typeof people === 'string' ? parseInt(people, 10) : people;
    if (isNaN(peopleCount)) peopleCount = 1;

    connection.query<ResultSetHeader>(query, [date, time, peopleCount, course, name, tel, email, message], (error, results) => {
        if (error) {
            console.error('Error saving reservation:', error);
            res.status(500).json({ success: false, message: '予約の保存に失敗しました' });
            return;
        }
        res.json({ success: true, message: '予約を受け付けました', id: results.insertId });
    });
});

// API: メニュー取得
app.get('/api/menus', (req: Request, res: Response) => {
    const query = 'SELECT * FROM menus WHERE is_available = TRUE ORDER BY id ASC';

    // ジェネリクス <MenuItem[]> を指定して結果の型を定義
    connection.query<MenuItem[]>(query, (error, results) => {
        if (error) {
            console.error('Error fetching menus:', error);
            res.status(500).json({ success: false, message: 'メニューの取得に失敗しました' });
            return;
        }

        // カテゴリーごとにグループ化
        // 戻り値の型は { [key: string]: MenuItem[] }
        const groupedMenus = results.reduce<{ [key: string]: MenuItem[] }>((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = [];
            }
            acc[item.category].push(item);
            return acc;
        }, {});

        res.json({ success: true, menus: groupedMenus });
    });
});

// API: メニュー更新
app.put('/api/menus/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const { name, price } = req.body;

    if (!name || price === undefined) {
        res.status(400).json({ success: false, message: '商品名と価格は必須です' });
        return;
    }

    const query = 'UPDATE menus SET name = ?, price = ? WHERE id = ?';
    connection.query<ResultSetHeader>(query, [name, price, id], (error, results) => {
        if (error) {
            console.error('Error updating menu:', error);
            res.status(500).json({ success: false, message: 'メニューの更新に失敗しました' });
            return;
        }
        res.json({ success: true, message: 'メニューを更新しました' });
    });
});

// データベースの疎通確認API
app.get('/api/health', (req: Request, res: Response) => {
    connection.query('SELECT 1', (err) => {
        if (err) {
            res.status(500).json({ status: 'db_error' });
            return;
        }
        res.json({ status: 'ok' });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
