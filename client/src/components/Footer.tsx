import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-top">
                    <div className="footer-logo">篝火<span>KAGARIBI</span></div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-legal-warning" style={{ marginBottom: '20px', fontSize: '12px', opacity: 0.7, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                        <p>20歳未満の飲酒は法律で禁止されています。お車を運転される方へのアルコール類の提供は固くお断りいたします。</p>
                    </div>
                    <p>&copy; {new Date().getFullYear()} KAGARIBI. All Rights Reserved.</p>
                    <nav className="footer-nav">
                        <Link to="/terms">利用規約</Link>
                        <Link to="/privacy">プライバシーポリシー</Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
