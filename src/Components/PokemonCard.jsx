import React from 'react';

const PokemonCard = ({ pokemon }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
            <img
                src={pokemon.sprites?.front_default}
                alt={pokemon.name}
                className="mx-auto"
            />
            <h2 className="text-lg font-semibold mt-4">{pokemon.name}</h2>
        </div>
    );
};

export default PokemonCard;
