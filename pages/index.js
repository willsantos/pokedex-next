import { useState, useEffect } from "react";
import Link from "next/link";

export async function getStaticProps() {
  const pokemons = await fetch("https://pokeapi.co/api/v2/pokedex/2")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((resobj) => resobj.pokemon_entries);

  return {
    props: {
      pokemons,
    },
  };
}

export default function Home(props) {
  const { pokemons } = props;

  return (
    <div>
      <h1>Pokedex do WillTech</h1>
      <span>Só os verdadeiros :P</span>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.entry_number}>
            <Link href={`/pokemon/${pokemon.entry_number}`}>
              <a>{pokemon.pokemon_species.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
