export default function pokemon({ pokemon }) {
  const pokemonArt = pokemon.sprites.other.dream_world.front_default;

  return (
    <div>
      <h1>
        ({pokemon.id}){pokemon.name}
      </h1>
      <img src={pokemonArt} alt={`Imagem do pokemon ${pokemon.name}`} />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((resobj) => resobj);

  return {
    props: {
      pokemon,
    },
    revalidate: 604800,
  };
}

export async function getStaticPaths() {
  const pokemons = await fetch("https://pokeapi.co/api/v2/pokedex/2")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((resobj) => resobj.pokemon_entries);
  return {
    paths: pokemons.map((pokemon) => ({
      params: {
        id: pokemon.entry_number.toString(),
      },
    })),
    fallback: false,
  };
}
