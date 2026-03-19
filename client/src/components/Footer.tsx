const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-top">
                    <div className="footer-logo">篝火<span>KAGARIBI</span></div>
                    <div className="footer-sns">
                        <a href="#">Instagram</a>
                        <a href="#">Facebook</a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} KAGARIBI. All Rights Reserved.</p>
                    <nav className="footer-nav">
                        <a href="#">プライバシーポリシー</a>
                        <a href="#">求人情報</a>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
