import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CharactersByLocation.css';

const CharactersByLocation = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    const storedLocations = JSON.parse(localStorage.getItem('locations')) || [];
    setLocations(storedLocations);
  }, []);

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectLocation = (locationName) => {
    const location = locations.find(loc => loc.name === locationName);
    if (location) {
      setSelectedLocation(location);
    } else {
      alert('Location not found');
    }
    setSearchTerm('');
    setIsDropdownVisible(false);
  };

  return (
    <div className="container container-bawah">
      <div className="hero-section">
        <h1>Characters By Location</h1>
        <p className="lead">Explore characters based on their locations</p>
        <div className="location-search">
          <input
            type="text"
            className="form-control"
            placeholder="Type to search for a location..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsDropdownVisible(true);
            }}
            onFocus={() => setIsDropdownVisible(true)}
            onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)}
          />
          {isDropdownVisible && (
            <ul className="dropdown-menu show position-absolute w-100">
              {filteredLocations.length > 0 ? (
                filteredLocations.map(location => (
                  <li key={location.name}>
                    <a
                      href="#"
                      className="dropdown-item"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSelectLocation(location.name);
                      }}
                    >
                      {location.name}
                    </a>
                  </li>
                ))
              ) : (
                <li><a href="#" className="dropdown-item">No results found</a></li>
              )}
            </ul>
          )}
        </div>
      </div>

      {selectedLocation ? (
        <div>
          <div className="characters-header">
            <h2>Characters in {selectedLocation.name}:</h2>
          </div>
          <div className="row">
            {selectedLocation.characters.length > 0 ? (
              selectedLocation.characters.map(character => (
                <div key={character.id} className="col-md-4 mb-3">
                  <div className="card character-card">
                    <img src={character.image} alt={character.name} className="card-img-top" />
                    <div className="card-body text-center">
                      <h5 className="card-title">{character.name}</h5>
                      <Link 
                        to={`/character/${character.id}`} 
                        className="btn btn-primary"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No characters found in this location.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="card-not-found">
          <h3>No Location Selected</h3>
          <p>Please select a location to view characters.</p>
        </div>
      )}
    </div>
  );
};

export default CharactersByLocation;
