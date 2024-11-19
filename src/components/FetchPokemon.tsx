import React, { useState } from 'react';

function PokemonCardFinder() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPokemonCards = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.pokemontcg.io/v2/cards?pageSize=10');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCards(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pokemon-card-finder text-center">
      <input className="ml-5 p-3" type="text" name="" id="" placeholder='search'/>
      <button 
        onClick={fetchPokemonCards} 
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {loading ? 'Searching...' : 'Chercher'}
      </button>
      
      {loading && <p>Chargement des cartes...</p>}
      
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