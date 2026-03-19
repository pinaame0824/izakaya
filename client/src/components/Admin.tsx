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
    const [toast, setToast] = useState<string | null>(null);
    const [password, setPassword] = useState<string>('');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        fetchMenus();
    }, []);

    const fetchMenus = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/menus`);
            const data = await response.json();
            if (data.success) {
                setMenus(data.menus);
            } else {
                alert('メニューの取得に失敗しました');
            }
        } catch (error) {
            console.error('Error:', error);
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
            <div className="admin-page" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)' }}>
                <div style={{ background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', width: '100%', maxWidth: '400px' }}>
                    <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>管理者ログイン</h2>
                    <input
                        type="password"
                        placeholder="管理者パスワード"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && setIsAuthenticated(true)}
                        style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                    <button
                        onClick={() => setIsAuthenticated(true)}
                        style={{ width: '100%', padding: '12px', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        ログイン
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return <div className="section container text-center">読み込み中...</div>;
    }

    return (
        <div className="admin-page">
            <style>{`
                .admin-container {
                    max-width: 1000px;
                    margin: 120px auto 60px;
                    background: white;
                    padding: 40px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                }
                .admin-container h1 {
                    margin-bottom: 20px;
                    color: var(--bg-dark);
                    border-bottom: 2px solid var(--primary-color);
                    padding-bottom: 10px;
                }
                .admin-container p {
                    margin-bottom: 30px;
                    color: #666;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 40px;
                }
                th, td {
                    text-align: left;
                    padding: 15px;
                    border-bottom: 1px solid #eee;
                }
                th {
                    background: #f9f9f9;
                    font-weight: 600;
                    color: var(--bg-dark);
                }
                .category-header {
                    background: var(--bg-dark);
                    color: var(--primary-color);
                    font-weight: bold;
                    padding: 12px 20px;
                    margin-top: 30px;
                    border-radius: 4px 4px 0 0;
                    font-family: var(--font-serif);
                    letter-spacing: 0.1em;
                }
                input[type="text"], input[type="number"] {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-family: inherit;
                }
                input:focus {
                    outline: none;
                    border-color: var(--primary-color);
                }
                .btn-update {
                    background-color: var(--primary-color);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    cursor: pointer;
                    border-radius: 4px;
                    font-weight: 600;
                    transition: var(--transition);
                }
                .btn-update:hover {
                    background-color: var(--accent-color);
                    transform: translateY(-2px);
                }
                .toast {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    background: var(--bg-dark);
                    color: white;
                    padding: 15px 30px;
                    border-radius: 4px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                    border-left: 4px solid var(--primary-color);
                    z-index: 2000;
                    animation: slideIn 0.3s ease-out;
                }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}</style>

            <div className="admin-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h1>メニュー管理画面</h1>
                    <button onClick={() => setIsAuthenticated(false)} style={{ background: '#eee', border: 'none', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer' }}>ログアウト</button>
                </div>
                <p>商品名や価格を変更し「更新」ボタンを押してください。</p>

                {categoryOrder.map(catKey => {
                    const items = menus[catKey];
                    if (!items || items.length === 0) return null;

                    return (
                        <div key={catKey}>
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
                                                    更新
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    );
                })}
            </div>

            {toast && <div className="toast">{toast}</div>}
        </div>
    );
};

export default Admin;
