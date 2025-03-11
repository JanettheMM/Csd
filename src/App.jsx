import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

export default function App() {
  const [pokemonList, setPokemonList] = useState([])
  const [offset, setOffset] = useState(0)
  const [error, setError] = useState(null)
  const limit = 6

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .then(response => setPokemonList(response.data.results))
      .catch(() => setError('Error al cargar los Pokémon'))
  }, [offset])

  return (
    <div>
      <h1>Pokédex</h1>
      {error && <p>{error}</p>}
      <ul>
        {pokemonList.map((pokemon, index) => (
          <li key={pokemon.name}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${offset + index + 1}.png`} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </li>
        ))}
      </ul>
      <button onClick={() => setOffset(offset - limit)} disabled={offset === 0}>Atrás</button>
      <button onClick={() => setOffset(offset + limit)}>Adelante</button>
    </div>
  )
}
