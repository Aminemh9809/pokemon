import React, { useState } from 'react';

function PokemonCardFinder() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false); // State to handle "no results"

  const fetchPokemonCards = async (searchTerm) => {
    setLoading(true);
    setNoResults(false); // Reset "no results" state
    try {
      const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${searchTerm}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCards(data.data);

      // If no cards are returned, set "no results" state
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
        placeholder="search" 
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
        {loading ? 'Searching...' : 'Chercher'}
      </button>

      {loading && <p>Chargement des cartes...</p>}

      {/* Display "no results" message */}
      {noResults && !loading && (
        <p className="text-red-500">il n’y a pas de résultat</p>
      )}

      <div className="card-grid grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
        {cards.map((card) => (
          <div key={card.id} className="card-item">
            <img 
              src={card.images.large} 
              alt={card.name} 
              className="w-full h-auto object-cover rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonCardFinder;
