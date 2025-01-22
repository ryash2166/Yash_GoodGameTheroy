import React, { useState, useEffect } from 'react';
import PokemonList from './Components/PokemonList';

const App = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchPokemons = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon');
                const data = await response.json();
                const detailedPokemons = await Promise.all(
                    data.results.map(async (pokemon) => {
                        const res = await fetch(pokemon.url);
                        return res.json();
                    })
                );
                setPokemons(detailedPokemons);
            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
            }
            setLoading(false);
        };

        fetchPokemons();
    }, []);

    const filteredPokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 py-6">
            <h1 className="text-3xl font-bold text-center mb-6">Pokémon List</h1>
            <div className="max-w-md mx-auto mb-6">
                <input
                    type="text"
                    placeholder="Search Pokémon"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                />
            </div>
            <PokemonList pokemons={filteredPokemons} />
        </div>
    );
};

export default App;