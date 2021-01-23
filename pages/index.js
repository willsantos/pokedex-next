import { useState, useEffect } from "react";

export async function getStaticProps() {
  const pokemons = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((resobj) => resobj.results);

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
      <span>Só os verdadeiros</span>
      <ul>
        {pokemons.map((pokemon) => (
          <li>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
}
