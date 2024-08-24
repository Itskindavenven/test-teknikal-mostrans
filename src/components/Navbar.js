import { Link } from 'react-router-dom';
import './Navbar.css'; // Include this if you have custom styles for Navbar

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-primary shadow-sm">
            <div className="container">
                <Link to="/" className="navbar-brand fs-4 fw-bold">
                    RicknMorty
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/characters" className="nav-link">Characters</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/locations" className="nav-link">Locations</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">About</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
