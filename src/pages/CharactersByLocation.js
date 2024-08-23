import { useState, useEffect } from 'react';

const CharactersByLocation = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Fetch data from localStorage when component mounts
  useEffect(() => {
    const storedLocations = JSON.parse(localStorage.getItem('locations')) || [];
    setLocations(storedLocations);
  }, []);

  const handleSelectLocation = (locationName) => {
    const location = locations.find(loc => loc.name === locationName);
    if (location) {
      setSelectedLocation(location);
    } else {
      alert('Location not found');
    }
  };

  return (
    <div>
      <h1>Characters By Location</h1>
      {locations.length === 0 ? (
        <p>No locations assigned yet.</p>
      ) : (
        <div>
          <h3>Select a location:</h3>
          <ul>
            {locations.map(location => (
              <li key={location.name} onClick={() => handleSelectLocation(location.name)}>
                {location.name}
              </li>
            ))}
          </ul>

          {selectedLocation && (
            <div>
              <h2>Characters in {selectedLocation.name}:</h2>
              <ul>
                {selectedLocation.characters.map(character => (
                  <li key={character.id}>{character.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CharactersByLocation;
