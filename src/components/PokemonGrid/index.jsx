import { ChevronDown } from 'lucide-react';
import PokemonCard from '../PokemonCard';
import './PokemonGrid.css';

export default function PokemonGrid({ pokemonList, onCardClick, hasMore, onLoadMore, loading }) {
  return (
    <div>
      <div className="grid">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={onCardClick} />
        ))}
      </div>

      {hasMore && !loading && (
        <div className="load-more">
          <button onClick={onLoadMore}>
            Carregar mais
            <ChevronDown size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
