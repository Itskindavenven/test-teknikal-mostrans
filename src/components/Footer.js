import './Footer.css'; // Include this if you have custom styles for Footer

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
                <ul className="footer-menu">
                    <li className="footer-item">
                        <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
                    </li>
                    <li className="footer-item">
                        <a href="/terms-of-service" className="footer-link">Terms of Service</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
