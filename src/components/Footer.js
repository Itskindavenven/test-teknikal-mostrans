import './Footer.css'; 

const Footer = () => {
    return (
        <footer className="footer bg-gradient-primary text-white py-4">
            <div className="container text-center">
                <p className="mb-2">&copy; {new Date().getFullYear()} Tes Teknikal Mostrans. All rights reserved.</p>
                <p className="mb-0">
                    Developed by <a href="https://itskindaven.vercel.app/" className="footer-link text-white" target="_blank" rel="noopener noreferrer">Itskindavenven</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
