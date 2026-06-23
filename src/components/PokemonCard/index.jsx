import { TYPE_COLORS } from '../../api';
import './PokemonCard.css';

export default function PokemonCard({ pokemon, onClick }) {
  const id = pokemon.id;
  // Formata o nome com a primeira letra maiúscula
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  // URL da arte oficial de alta qualidade
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  
  // Define a cor de fundo do card baseado no primeiro tipo do Pokémon
  const primaryType = pokemon.types[0].type.name;
  const bgColor = TYPE_COLORS[primaryType];

  return (
    <div
      className="card"
      onClick={() => onClick(pokemon)}
      // Passa a cor do tipo do Pokémon via variável CSS inline para o arquivo .css usar
      style={{ '--card-type-color': bgColor }}
    >
      <span className="card-id">#{String(id).padStart(3, '0')}</span>
      <img src={image} alt={name} loading="lazy" />
      <h3>{name}</h3>
      <div className="card-types">
        {pokemon.types.map(({ type }) => (
          <span
            key={type.name}
            className="type-badge"
            style={{ backgroundColor: TYPE_COLORS[type.name] }}
          >
            {type.name}
          </span>
        ))}
      </div>
    </div>
  );
}

