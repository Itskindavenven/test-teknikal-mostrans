import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './CharactersList.css';

const GET_CHARACTERS = gql`
  query getCharacters($page: Int) {
    characters(page: $page) {
      results {
        id
        name
        image
      }
      info {
        pages
        next
        prev
      }
    }
  }
`;

const CharactersList = () => {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page, pageSize: 12 },
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) return <div className="error">Error: {error.message}</div>;

  const handleNextPage = () => {
    if (data.characters.info.next) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (data.characters.info.prev) setPage(page - 1);
  };

  return (
    <div className="characters-list">
      <div className="hero-section">
        <h1>Characters List</h1>
        <p className="lead">Explore all the amazing characters from Rick and Morty</p>
      </div>

      <div className="container my-4">
        <h2 className="text-center subtitle">Meet the Characters</h2>
        <p className="text-center">Click on a character to learn more about them.</p>
      </div>

      <div className="container">
        <div className="row">
          {data.characters.results.map((character) => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={character.id}>
              <div className="card character-card">
                <img
                  src={character.image}
                  className="card-img-top"
                  alt={character.name}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{character.name}</h5>
                  <Link
                    to={`/character/${character.id}`}
                    className="btn btn-primary view-details-btn"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-between mt-4 mb-4 pagination-controls">
          <button
            className="btn btn-outline-primary"
            onClick={handlePreviousPage}
            disabled={!data.characters.info.prev}
          >
            Previous
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={handleNextPage}
            disabled={!data.characters.info.next}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharactersList;
