import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const GET_CHARACTER = gql`
  query($id: ID!) {
    character(id: $id) {
      id
      name
      status
      image
    }
  }
`;

const CharacterDetail = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_CHARACTER, { variables: { id } });
    const [locationName, setLocationName] = useState('');
    const [assignedLocation, setAssignedLocation] = useState('');

    // Function to handle assigning location
    const handleAssignLocation = () => {
        if (!locationName.trim()) {
            alert('Please enter a valid location name');
            return;
        }

        const locationNameTrimmed = locationName.trim();
        // Retrieve existing locations from localStorage
        const existingLocations = JSON.parse(localStorage.getItem('locations')) || [];
        // Find or create location
        let location = existingLocations.find(loc => loc.name === locationNameTrimmed);
        if (!location) {
            location = { name: locationNameTrimmed, characters: [] };
            existingLocations.push(location);
        } else {
            // Ensure character is not already assigned to this location
            if (location.characters.some(character => character.id === data.character.id)) {
                alert('Character is already assigned to this location');
                return;
            }
        }

        // Assign character to location
        location.characters.push({
            id: data.character.id,
            name: data.character.name,
            image: data.character.image
        });

        // Save updated locations to localStorage
        localStorage.setItem('locations', JSON.stringify(existingLocations));

        // Update state
        setAssignedLocation(locationNameTrimmed);
        alert(`Character assigned to ${locationNameTrimmed}`);
        setLocationName(''); // Reset input after assigning
    };

    useEffect(() => {
        // Load the assigned location from localStorage on component mount
        const existingLocations = JSON.parse(localStorage.getItem('locations')) || [];
        const location = existingLocations.find(loc => loc.characters.some(character => character.id === id));
        if (location) {
            setAssignedLocation(location.name);
        }
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>{data.character.name}</h1>
            <img src={data.character.image} alt={data.character.name} />
            <p>Status: {data.character.status}</p>
            <p>Location: {assignedLocation || 'Not assigned yet'}</p>

            <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="Enter location name"
            />
            <button onClick={handleAssignLocation}>Assign to Location</button>
        </div>
    );
};

export default CharacterDetail;
