import './Footer.css'; // Include this if you have custom styles for Footer

const Footer = () => {
    return (
        <footer className="footer bg-primary text-white py-4">
            <div className="container text-center">
                <p className="mb-2">&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <a href="/privacy-policy" className="footer-link text-white">Privacy Policy</a>
                    </li>
                    <li className="list-inline-item">
                        <a href="/terms-of-service" className="footer-link text-white">Terms of Service</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
