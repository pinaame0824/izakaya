import { useState, useEffect } from 'react';

interface MenuItem {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
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

const Menu = () => {
    const [menus, setMenus] = useState<GroupedMenus>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await fetch('/api/menus');
                const data = await response.json();
                if (data.success) {
                    setMenus(data.menus);
                }
            } catch (error) {
                console.error('Error fetching menus:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMenus();
    }, []);

    if (loading) {
        return <div className="section container text-center">読み込み中...</div>;
    }

    return (
        <div className="menu-page">
            <style>{`
                .menu-hero {
                    height: 50vh;
                    background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/assets/hero.png') center/cover fixed;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    text-align: center;
                }
                .menu-hero h1 {
                    font-size: 64px;
                    letter-spacing: 0.3em;
                    font-family: var(--font-serif);
                }
                .menu-page-content {
                    background-color: var(--bg-light);
                    background-image: url("https://www.transparenttextures.com/patterns/natural-paper.png");
                    padding: 100px 0;
                }
                .menu-container {
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 0 40px;
                }
                .category-section {
                    margin-bottom: 100px;
                }
                .category-header-wrap {
                    text-align: center;
                    margin-bottom: 60px;
                    position: relative;
                }
                .category-header-wrap::after {
                    content: '';
                    position: absolute;
                    bottom: -15px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 60px;
                    height: 2px;
                    background: var(--primary-color);
                }
                .category-title {
                    font-family: var(--font-serif);
                    font-size: 32px;
                    color: var(--bg-dark);
                    letter-spacing: 0.1em;
                }
                .menu-list {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 40px 100px;
                }
                .menu-page .menu-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    border-bottom: 1px solid rgba(0,0,0,0.1);
                    padding-bottom: 12px;
                    transition: var(--transition);
                    background-color: transparent; /* グローバルスタイルを上書き */
                    border-radius: 0;
                    padding: 0 0 12px 0;
                    border: none;
                    border-bottom: 1px solid rgba(0,0,0,0.1);
                }
                .menu-page .menu-item:hover {
                    border-bottom-color: var(--primary-color);
                    transform: none;
                }
                .menu-item-info h3 {
                    font-size: 18px;
                    color: var(--bg-dark); /* より濃い色に */
                    font-family: var(--font-main);
                    font-weight: 600;
                    margin-bottom: 4px;
                }
                .menu-item-info p {
                    font-size: 13px;
                    color: #777;
                    margin: 0;
                }
                .menu-item-price {
                    font-family: var(--font-serif);
                    font-weight: 700;
                    color: var(--primary-color);
                    font-size: 20px;
                    margin-left: 20px;
                }
                @media (max-width: 991px) {
                    .menu-list {
                        grid-template-columns: 1fr;
                        gap: 30px;
                    }
                    .menu-hero h1 { font-size: 48px; }
                }
            `}</style>

            <section className="menu-hero">
                <h1>お品書き</h1>
            </section>

            <div className="menu-page-content">
                <div className="menu-container">
                    {categoryOrder.map(catKey => {
                        const items = menus[catKey];
                        if (!items || items.length === 0) return null;

                        return (
                            <div key={catKey} className="category-section">
                                <div className="category-header-wrap">
                                    <h2 className="category-title">{categoryNames[catKey]}</h2>
                                </div>
                                <div className="menu-list">
                                    {items.map(item => (
                                        <div key={item.id} className="menu-item">
                                            <div className="menu-item-info">
                                                <h3>{item.name}</h3>
                                                {item.description && <p>{item.description}</p>}
                                            </div>
                                            <div className="menu-item-price">
                                                ¥{item.price.toLocaleString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Menu;
