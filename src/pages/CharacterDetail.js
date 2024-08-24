import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './CharacterDetail.css';

const GET_CHARACTER = gql`
  query($id: ID!) {
    character(id: $id) {
      id
      name
      status
      image
      species
      gender
      origin {
        name
      }
      location {
        name
      }
    }
  }
`;

const CharacterDetail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_CHARACTER, { variables: { id } });
  const [locationName, setLocationName] = useState('');
  const [assignedLocation, setAssignedLocation] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleAssignLocation = () => {
    if (!locationName.trim()) {
      alert('Please enter a valid location name');
      return;
    }

    const locationNameTrimmed = locationName.trim();
    const existingLocations = JSON.parse(localStorage.getItem('locations')) || [];
    
    let location = existingLocations.find(loc => loc.name === locationNameTrimmed);
    if (!location) {
      location = { name: locationNameTrimmed, characters: [] };
      existingLocations.push(location);
    }

    const currentLocation = existingLocations.find(loc => loc.characters.some(character => character.id === data.character.id));
    if (currentLocation) {
      if (currentLocation.name === locationNameTrimmed) {
        alert('Character is already assigned to this location');
        return;
      }
      currentLocation.characters = currentLocation.characters.filter(character => character.id !== data.character.id);
      if (currentLocation.characters.length === 0) {
        const index = existingLocations.indexOf(currentLocation);
        if (index > -1) {
          existingLocations.splice(index, 1);
        }
      }
    }

    location.characters.push({
      id: data.character.id,
      name: data.character.name,
      image: data.character.image
    });

    localStorage.setItem('locations', JSON.stringify(existingLocations));

    setAssignedLocation(locationNameTrimmed);
    alert(`Character assigned to ${locationNameTrimmed}`);
    setLocationName('');
    setShowModal(false);
  };

  const handleUnassignLocation = () => {
    const existingLocations = JSON.parse(localStorage.getItem('locations')) || [];
    const location = existingLocations.find(loc => loc.name === assignedLocation);
    if (location) {
      location.characters = location.characters.filter(character => character.id !== data.character.id);

      if (location.characters.length === 0) {
        const index = existingLocations.indexOf(location);
        if (index > -1) {
          existingLocations.splice(index, 1);
        }
      }

      localStorage.setItem('locations', JSON.stringify(existingLocations));

      setAssignedLocation('');
      alert(`Character unassigned from ${assignedLocation}`);
    }
  };

  useEffect(() => {
    const existingLocations = JSON.parse(localStorage.getItem('locations')) || [];
    const location = existingLocations.find(loc => loc.characters.some(character => character.id === id));
    if (location) {
      setAssignedLocation(location.name);
    }
  }, [id]);

  useEffect(() => {
    const savedLocation = localStorage.getItem('newLocation') || '';
    setLocationName(savedLocation);
  }, [showModal]);

  useEffect(() => {
    if (showModal) {
      localStorage.setItem('newLocation', locationName);
    }
  }, [locationName, showModal]);

  if (loading) {
    return (
      <div className="loading-container d-flex justify-content-center align-items-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container my-5 min-vh-100 d-flex flex-column">
      <div className="text-center mb-4">
        <h1 className="display-4 mb-3"><strong>{data.character.name}</strong></h1>
        <img src={data.character.image} alt={data.character.name} className="img-fluid rounded-circle border border-primary character-image mt-5" />
      </div>
      <div className="text-center mb-4">
        <p className="fs-5 mb-2">
          <strong>Status:</strong> 
          <span className={`badge ${data.character.status === 'Alive' ? 'bg-success' : 'bg-danger'}`}>
            {data.character.status}
          </span>
        </p>
        <p className="fs-5 mb-2 mt-2"><strong>Species:</strong> {data.character.species}</p>
        <p className="fs-5 mb-2 mt-2"><strong>Gender:</strong> {data.character.gender}</p>
        <p className="fs-5 mb-2"><strong>Origin:</strong> {data.character.origin.name}</p>
        <p className="fs-5 mb-4"><strong>Assigned Location:</strong> {assignedLocation || 'Not assigned yet'}</p>
      </div>

      <div className="text-center mb-3">
        <button
          className={`btn shadow-sm ${assignedLocation ? 'btn-disabled' : 'btn-primary'}`}
          onClick={() => !assignedLocation && setShowModal(true)}
          disabled={!!assignedLocation}
        >
          Assign Location
        </button>
        {assignedLocation && (
          <button
            className="btn btn-danger shadow-sm ms-2"
            onClick={handleUnassignLocation}
          >
            Unassign Location
          </button>
        )}
      </div>

      <div className={`modal fade ${showModal ? 'show d-block' : ''}`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Assign Character to Location</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="Enter location name"
                className="form-control"
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleAssignLocation}>
                Assign Location
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
