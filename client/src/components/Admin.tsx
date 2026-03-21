import { useState, useEffect } from 'react';
import API_BASE_URL from '../config';

interface MenuItem {
    id: number;
    name: string;
    price: number;
    category: string;
}

interface GroupedMenus {
    [key: string]: MenuItem[];
}

const categoryNames: { [key: string]: string } = {
    'yakitori': '炭火串焼き',
    'sashimi': '鮮魚',
    'ippin': '酒の肴・一品料理',
    'salad': '菜園・サラダ',
    'rice_noodle': '〆の逸品',
    'alcohol': 'アルコール',
    'soft_drink': 'ソフトドリンク'
};

const categoryOrder = ['yakitori', 'sashimi', 'ippin', 'salad', 'rice_noodle', 'alcohol', 'soft_drink'];

const Admin = () => {
    const [menus, setMenus] = useState<GroupedMenus>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [toast, setToast] = useState<string | null>(null);
    const [password, setPassword] = useState<string>('');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        if (isAuthenticated) {
            fetchMenus();
        }
    }, [isAuthenticated]);

    const fetchMenus = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log('Fetching from:', `${API_BASE_URL}/api/menus`);
            const response = await fetch(`${API_BASE_URL}/api/menus`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.success) {
                setMenus(data.menus);
                if (Object.keys(data.menus).length === 0) {
                    setError('メニュー項目が見つかりませんでした。データベースを確認してください。');
                }
            } else {
                setError(data.message || 'データの取得に失敗しました');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('バックエンドとの通信に失敗しました。CORS設定や接続情報を確認してください。');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (category: string, id: number, field: 'name' | 'price', value: string) => {
        setMenus(prev => ({
            ...prev,
            [category]: prev[category].map(item =>
                item.id === id ? { ...item, [field]: field === 'price' ? parseInt(value) || 0 : value } : item
            )
        }));
    };

    const updateMenu = async (id: number, category: string) => {
        const item = menus[category].find(i => i.id === id);
        if (!item) return;

        try {
            const response = await fetch(`${API_BASE_URL}/api/menus/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Admin-Password': password
                },
                body: JSON.stringify({ name: item.name, price: item.price })
            });

            if (response.status === 401) {
                alert('認証エラー: パスワードが正しくありません');
                setIsAuthenticated(false);
                return;
            }

            const result = await response.json();
            if (result.success) {
                showToast(`更新しました: ${item.name}`);
            } else {
                alert('エラー: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('通信エラーが発生しました');
        }
    };

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    if (!isAuthenticated) {
        return (
            <div className="admin-page" style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80") center/cover no-repeat',
                color: 'white'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    padding: '50px 40px',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                    width: '100%',
                    maxWidth: '400px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    textAlign: 'center'
                }}>
                    <h2 style={{ marginBottom: '30px', fontFamily: 'var(--font-serif)', color: 'var(--primary-color)', fontSize: '2rem' }}>管理者ログイン</h2>
                    <input
                        type="password"
                        placeholder="管理者パスワードを入力"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && setIsAuthenticated(true)}
                        style={{
                            width: '100%',
                            padding: '15px',
                            marginBottom: '25px',
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '8px',
                            color: 'white',
                            fontSize: '1rem',
                            outline: 'none'
                        }}
                    />
                    <button
                        onClick={() => setIsAuthenticated(true)}
                        style={{
                            width: '100%',
                            padding: '15px',
                            background: 'var(--primary-color)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            transition: 'var(--transition)',
                            boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-color)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-color)'}
                    >
                        ログイン
                    </button>
                    <p style={{ marginTop: '20px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>※ 管理担当者以外の方はアクセスできません</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page" style={{ background: 'var(--bg-dark)', minHeight: '100vh', color: 'white' }}>
            <style>{`
                .admin-container {
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 120px 20px 80px;
                }
                .admin-header-section {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 40px;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    padding-bottom: 20px;
                }
                .admin-header-section h1 {
                    font-family: var(--font-serif);
                    color: var(--primary-color);
                    margin: 0;
                }
                .btn-logout {
                    background: transparent;
                    border: 1px solid rgba(255,255,255,0.3);
                    color: white;
                    padding: 8px 18px;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: var(--transition);
                }
                .btn-logout:hover {
                    background: rgba(255,255,255,0.1);
                    border-color: white;
                }
                .status-info {
                    background: rgba(212, 175, 55, 0.1);
                    border-left: 4px solid var(--primary-color);
                    padding: 15px 20px;
                    margin-bottom: 40px;
                    border-radius: 0 4px 4px 0;
                }
                .category-block {
                    margin-bottom: 50px;
                    background: rgba(255,255,255,0.03);
                    border-radius: 12px;
                    overflow: hidden;
                    border: 1px solid rgba(255,255,255,0.05);
                }
                .category-header {
                    background: rgba(255,255,255,0.05);
                    color: var(--primary-color);
                    font-weight: bold;
                    padding: 15px 25px;
                    font-family: var(--font-serif);
                    font-size: 1.3rem;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    text-align: left;
                    padding: 15px 25px;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }
                th {
                    background: rgba(0,0,0,0.2);
                    font-weight: 600;
                    color: rgba(255,255,255,0.7);
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                input[type="text"], input[type="number"] {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: white;
                    padding: 10px 15px;
                    border-radius: 6px;
                    width: 100%;
                    transition: var(--transition);
                }
                input:focus {
                    background: rgba(255,255,255,0.08);
                    border-color: var(--primary-color);
                    outline: none;
                }
                .btn-update {
                    background-color: var(--primary-color);
                    color: white;
                    border: none;
                    padding: 10px 25px;
                    cursor: pointer;
                    border-radius: 6px;
                    font-weight: 600;
                    transition: var(--transition);
                    width: 100%;
                }
                .btn-update:hover {
                    background-color: var(--accent-color);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
                }
                .btn-retry {
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-top: 20px;
                }
                .error-box {
                    background: rgba(220, 53, 69, 0.1);
                    border: 1px solid rgba(220, 53, 69, 0.3);
                    padding: 30px;
                    text-align: center;
                    border-radius: 8px;
                    margin-top: 50px;
                }
                .toast {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    background: #1a1a1a;
                    color: white;
                    padding: 18px 35px;
                    border-radius: 8px;
                    box-shadow: 0 8px 30px rgba(0,0,0,0.5);
                    border-left: 5px solid var(--primary-color);
                    z-index: 2000;
                    animation: slideIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                @keyframes slideIn {
                    from { transform: translateY(100px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>

            <div className="admin-container">
                <div className="admin-header-section">
                    <h1>お品書き管理（管理者専用）</h1>
                    <button onClick={() => {
                        setIsAuthenticated(false);
                        setPassword('');
                    }} className="btn-logout">ログアウト</button>
                </div>

                {loading ? (
                    <div className="text-center" style={{ padding: '100px' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '20px' }}>データを取得しています...</div>
                        <div className="loader"></div>
                    </div>
                ) : error ? (
                    <div className="error-box">
                        <h3 style={{ color: '#dc3545', marginBottom: '15px' }}>通信エラーが発生しました</h3>
                        <p>{error}</p>
                        <button className="btn-retry" onClick={fetchMenus}>再試行する</button>
                    </div>
                ) : (
                    <>
                        <div className="status-info">
                            <p>✅ データベース接続中。商品名や価格を編集し「更新」ボタンをクリックすると反映されます。</p>
                        </div>

                        {categoryOrder.map(catKey => {
                            const items = menus[catKey];
                            if (!items || items.length === 0) return null;

                            return (
                                <div key={catKey} className="category-block">
                                    <div className="category-header">
                                        {categoryNames[catKey] || catKey}
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th style={{ width: '50%' }}>商品名</th>
                                                <th style={{ width: '25%' }}>価格 (¥)</th>
                                                <th style={{ width: '25%' }}>操作</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.map(item => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            value={item.name}
                                                            onChange={(e) => handleInputChange(catKey, item.id, 'name', e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            value={item.price}
                                                            onChange={(e) => handleInputChange(catKey, item.id, 'price', e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn-update"
                                                            onClick={() => updateMenu(item.id, catKey)}
                                                        >
                                                            更新する
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>

            {toast && <div className="toast">{toast}</div>}
        </div>
    );
};

export default Admin;
