import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import '../styles/styles.css';

Modal.setAppElement('#root');

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/signin');
    } else {
      validateToken(token);
    }
  }, []);

  const validateToken = async (token) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/validate`, {
        headers: {
          'x-auth-token': token,
        },
      });
      console.log(res.data.msg); // Token is valid
      fetchCharacters('https://swapi.dev/api/people');
    } catch (err) {
      console.error('Token validation error:', err);
      localStorage.removeItem('token');
      history.push('/signin');
    }
  };

  const fetchCharacters = async (url) => {
    setIsLoading(true);
    try {
      const res = await axios.get(url);
      if (url.match(/\/people\/\d+/)) {
        setSelectedCharacter(res.data);
        setIsModalOpen(true);
      } else {
        setCharacters(res.data.results);
        setNextPage(res.data.next);
        setPrevPage(res.data.previous);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  };

  return (
    <div className="container">
      <h2>Star Wars Characters</h2>
      {isLoading && <div className="loader"></div>}
      <table className="character-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Birth Year</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character) => (
            <tr key={character.url}>
              <td>{character.name}</td>
              <td>{character.height}</td>
              <td>{character.mass}</td>
              <td>{character.birth_year}</td>
              <td>
                <button
                  className="show-more-button"
                  onClick={() => fetchCharacters(character.url)}
                >
                  Show More
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {prevPage && <button onClick={() => fetchCharacters(prevPage)} className="pagination-button">Previous</button>}
        {nextPage && <button onClick={() => fetchCharacters(nextPage)} className="pagination-button">Next</button>}
      </div>

      {selectedCharacter && (
        <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="modal">
          <h2>{selectedCharacter.name}</h2>
          <p><strong>Height:</strong> {selectedCharacter.height}</p>
          <p><strong>Mass:</strong> {selectedCharacter.mass}</p>
          <p><strong>Hair Color:</strong> {selectedCharacter.hair_color}</p>
          <p><strong>Skin Color:</strong> {selectedCharacter.skin_color}</p>
          <p><strong>Eye Color:</strong> {selectedCharacter.eye_color}</p>
          <p><strong>Birth Year:</strong> {selectedCharacter.birth_year}</p>
          <p><strong>Gender:</strong> {selectedCharacter.gender}</p>
          <p><strong>Homeworld:</strong> {selectedCharacter.homeworld}</p>
          <p><strong>Films:</strong> {selectedCharacter.films.join(', ')}</p>
          <p><strong>Species:</strong> {selectedCharacter.species.join(', ')}</p>
          <p><strong>Vehicles:</strong> {selectedCharacter.vehicles.join(', ')}</p>
          <p><strong>Starships:</strong> {selectedCharacter.starships.join(', ')}</p>
          <button onClick={closeModal} className="close-button">Close</button>
        </Modal>
      )}
    </div>
  );
};

export default CharacterList;
