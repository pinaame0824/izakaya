import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import mysql, { RowDataPacket, ResultSetHeader } from 'mysql2';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

// セキュリティヘッダーの設定
app.use(helmet());

// CORSの設定
const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173', // Vite 開発環境
    'http://localhost:3000'
].filter(Boolean) as string[];

app.use(cors({
    origin: (origin, callback) => {
        // originが未定義（自分のサーバー内など）または許可リストに含まれる場合
        if (!origin || allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

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
        console.error('Database connection failed');
        return;
    }
    console.log('Connected to MySQL database.');
});

// 管理者認証ミドルウェア
const adminAuth = (req: Request, res: Response, next: NextFunction) => {
    const adminPassword = process.env.ADMIN_PASSWORD;
    const providedPassword = req.headers['x-admin-password'];

    if (!adminPassword) {
        // パスワードが環境変数に設定されていない場合は、セキュリティのため全ての変更を拒否
        console.warn('ADMIN_PASSWORD is not set in environment variables.');
        return res.status(500).json({ success: false, message: 'Server configuration error' });
    }

    if (providedPassword === adminPassword) {
        next();
    } else {
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
};

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

    if (!date || !time || !people || !name || !tel) {
        res.status(400).json({ success: false, message: '必須項目が不足しています' });
        return;
    }

    const query = `
        INSERT INTO reservations (reservation_date, reservation_time, people_count, course_name, customer_name, customer_phone, customer_email, special_request)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    let peopleCount = typeof people === 'string' ? parseInt(people, 10) : people;
    if (isNaN(peopleCount)) peopleCount = 1;

    connection.query<ResultSetHeader>(query, [date, time, peopleCount, course, name, tel, email, message], (error) => {
        if (error) {
            console.error('Error saving reservation');
            res.status(500).json({ success: false, message: '予約の保存に失敗しました' });
            return;
        }
        res.json({ success: true, message: '予約を受け付けました' });
    });
});

// API: メニュー取得
app.get('/api/menus', (req: Request, res: Response) => {
    const query = 'SELECT * FROM menus WHERE is_available = TRUE ORDER BY id ASC';

    connection.query<MenuItem[]>(query, (error, results) => {
        if (error) {
            console.error('Error fetching menus');
            res.status(500).json({ success: false, message: 'メニューの取得に失敗しました' });
            return;
        }

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

// API: メニュー更新（認証が必要）
app.put('/api/menus/:id', adminAuth, (req: Request, res: Response) => {
    const id = req.params.id;
    const { name, price } = req.body;

    if (!name || price === undefined) {
        res.status(400).json({ success: false, message: '商品名と価格は必須です' });
        return;
    }

    const query = 'UPDATE menus SET name = ?, price = ? WHERE id = ?';
    connection.query<ResultSetHeader>(query, [name, price, id], (error) => {
        if (error) {
            console.error('Error updating menu');
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

app.get('/', (req, res) => {
    res.send('Izakaya Kagaribi API Server');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
