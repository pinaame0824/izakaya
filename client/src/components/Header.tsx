import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        // 管理画面やサブページでは最初から黒背景にする
        if (pathname !== '/') {
            setScrolled(true);
        } else {
            setScrolled(window.scrollY > 50);
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    return (
        <header id="header" className={scrolled ? 'scrolled' : ''}>
            <div className="header-container">
                <div className="logo">
                    <Link to="/">篝火<span>KAGARIBI</span></Link>
                </div>
                <nav className="desktop-nav">
                    <ul>
                        <li><a href="#concept">こだわり</a></li>
                        <li><Link to="/menu">お品書き</Link></li>
                        <li><a href="#gallery">空間</a></li>
                        <li><a href="#access">アクセス</a></li>
                        <li><Link to="/reservation" className="reserve-btn">ご予約</Link></li>
                    </ul>
                </nav>
                <div className="mobile-menu-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </header>
    );
};

export default Header;
