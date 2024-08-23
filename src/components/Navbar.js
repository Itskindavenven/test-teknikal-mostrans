import { Link } from 'react-router-dom';
import './Navbar.css'; // Include this if you have custom styles for Navbar

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    MyApp
                </Link>
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <Link to="/" className="navbar-link">Home</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/characters" className="navbar-link">Characters</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/locations" className="navbar-link">Locations</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/about" className="navbar-link">About</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
