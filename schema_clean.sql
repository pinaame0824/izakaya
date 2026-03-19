
-- メニューテーブル（お品書き）
CREATE TABLE IF NOT EXISTS menus (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL COMMENT '商品名',
    price INT NOT NULL COMMENT '価格（税抜）',
    category VARCHAR(50) NOT NULL COMMENT 'カテゴリー（yakitori, sashimi, drink_alcohol, etc）',
    description TEXT COMMENT '商品の説明',
    image_url VARCHAR(255) COMMENT '画像パス',
    is_available BOOLEAN DEFAULT TRUE COMMENT '販売中フラグ',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) COMMENT='メニュー情報を管理するテーブル';

-- 予約テーブル
CREATE TABLE IF NOT EXISTS reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reservation_date DATE NOT NULL COMMENT '予約日',
    reservation_time TIME NOT NULL COMMENT '予約時間',
    people_count INT NOT NULL COMMENT '人数',
    course_name VARCHAR(100) DEFAULT '席のみ予約' COMMENT '選択コース',
    customer_name VARCHAR(100) NOT NULL COMMENT 'お客様名',
    customer_phone VARCHAR(20) NOT NULL COMMENT '電話番号',
    customer_email VARCHAR(255) NOT NULL COMMENT 'メールアドレス',
    special_request TEXT COMMENT 'ご要望・アレルギー等',
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending' COMMENT '予約ステータス',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) COMMENT='予約情報を管理するテーブル';

-- お知らせテーブル
CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL COMMENT 'タイトル',
    content TEXT NOT NULL COMMENT '本文',
    published_date DATE NOT NULL COMMENT '公開日',
    is_visible BOOLEAN DEFAULT TRUE COMMENT '表示フラグ',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) COMMENT='店舗からのお知らせを管理するテーブル';

-- サンプルデータの挿入（メニュー）
INSERT INTO menus (name, price, category, description) VALUES
('大山どり もも', 320, 'yakitori', 'ジューシーな定番部位'),
('極上 つくね（月見）', 450, 'yakitori', '濃厚な卵黄とご一緒に'),
('本日の刺身 三種盛り', 1600, 'sashimi', '豊洲直送の鮮魚'),
('生ビール（アサヒ 熟撰）', 700, 'alcohol', 'こだわりの一杯');
