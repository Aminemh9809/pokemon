import { useState } from 'react';
import '../index.css'; // Ensure this file includes the updated styles below
import cardCover from '../assets/pokemon-card-cover.png'; // Path to your Pokémon card cover image

function PokemonCardFinder() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null); // For modal
  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const [totalPages, setTotalPages] = useState(1);
  const cardsPerPage = 10;

  const fetchPokemonCards = async (searchTerm, page = 1) => {
    setLoading(true);
    setNoResults(false);
    try {
      const response = await fetch(
        `https://api.pokemontcg.io/v2/cards?q=name:${searchTerm}&page=${page}&pageSize=${cardsPerPage}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCards(data.data);
      setTotalPages(Math.ceil(data.totalCount / cardsPerPage));
      setCurrentPage(page);

      if (data.data.length === 0) {
        setNoResults(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pokemon-card-finder text-center">
      <input
        className="ml-5 p-3"
        type="text"
        placeholder="Search"
        id="search-input"
      />
      <button
        onClick={() => {
          const searchTerm = document.getElementById('search-input').value;
          fetchPokemonCards(searchTerm);
        }}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        data-testid="search-button"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      {/* Loading Animation */}
      {loading && <div className="loader"></div>}

      {noResults && !loading && (
        <p className="text-red-500">No results found</p>
      )}

      <div className="card-grid grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="card-item"
            onClick={() => setSelectedCard(card)} // Open modal on click
          >
            <div className="card-inner">
              <div className="card-front">
                <img
                  src={card.images.small}
                  alt={card.name}
                  className="w-full h-auto object-cover rounded"
                />
              </div>
              <div className="card-back">
                <img
                  src={cardCover}
                  alt="Backside of the card"
                  className="w-full h-auto object-cover rounded"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`pagination-button ${
                currentPage === index + 1 ? 'active' : ''
              }`}
              onClick={() => {
                const searchTerm =
                  document.getElementById('search-input').value;
                fetchPokemonCards(searchTerm, index + 1);
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* Modal for card details */}
      {selectedCard && (
        <div className="modal-overlay" onClick={() => setSelectedCard(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Pokémon-like styled card preview */}
            <div className="pokemon-card-preview">
              <img
                src={selectedCard.images.large || selectedCard.images.small}
                alt={selectedCard.name}
                className="pokemon-card-image"
              />
              <div className="pokemon-card-details">
                <h2>{selectedCard.name}</h2>
                <p>
                  <strong>Supertype:</strong> {selectedCard.supertype}
                </p>
              </div>
            </div>

            {/* Attacks and cost statistics */}
            {selectedCard.attacks && (
              <div>
                <h3>Attacks</h3>
                <ul>
                  {selectedCard.attacks.map((attack, index) => (
                    <li key={index}>
                      <strong>{attack.name}</strong>: {attack.damage || 'N/A'}{' '}
                      damage (
                      {attack.cost.length > 0
                        ? attack.cost.join(', ')
                        : 'No cost'}
                      )
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedCard.attacks && (
              <div>
                <h3>Cost Statistics</h3>
                <p>
                  {selectedCard.attacks.map((attack, index) => (
                    <div key={index}>
                      <strong>Attack {index + 1}:</strong>{' '}
                      {attack.cost.length > 0
                        ? `${attack.cost.join(', ')} (${attack.cost.length} cost)`
                        : 'No cost'}{' '}
                    </div>
                  ))}
                </p>
              </div>
            )}
            <button
              onClick={() => setSelectedCard(null)}
              className="close-button"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokemonCardFinder;
