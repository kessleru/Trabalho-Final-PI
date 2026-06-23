import { useEffect, useState } from 'react';
import { X, Ruler, Weight, Sparkles } from 'lucide-react';
import { TYPE_COLORS, fetchPokemonSpecies } from '../../api';
import './PokemonModal.css';

const STAT_LABELS = { hp: 'HP', attack: 'ATK', defense: 'DEF', 'special-attack': 'SpA', 'special-defense': 'SpD', speed: 'SPD' };

export default function PokemonModal({ pokemon, onClose }) {
  const [species, setSpecies] = useState('');

  // Efeito 1: Gerencia o fechamento da modal por teclado (ESC) e impede scroll no fundo do app
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden'; // Remove scroll da página principal ao abrir a modal
    
    // Função de limpeza executada quando a modal fecha
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = ''; // Restaura o scroll da página principal
    };
  }, [onClose]);

  // Efeito 2: Carrega a categoria (espécie) do Pokémon em português ou inglês
  useEffect(() => {
    if (pokemon) {
      fetchPokemonSpecies(pokemon.id)
        .then(setSpecies)
        .catch(() => setSpecies(''));
    }
  }, [pokemon]);

  if (!pokemon) return null;

  // Formatações dos dados exibidos na tela
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); // Nome com primeira letra maiúscula
  const id = `#${String(pokemon.id).padStart(3, '0')}`; // ID formatado como #001, #025, etc.
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;


  const primaryType = pokemon.types[0].type.name;
  const bgColor = TYPE_COLORS[primaryType];

  return (
    <div className="overlay" onClick={onClose}>
      <div 
        className="modal" 
        onClick={(e) => e.stopPropagation()} 
        style={{ '--modal-type-color': bgColor }}
      >
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-header">
          <img src={image} alt={name} />
          <div className="modal-header-info">
            <span className="modal-id">{id}</span>
            <h2>{name}</h2>
            {species && <span className="modal-species">{species}</span>}
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
        </div>

        <div className="modal-content-card">
          <div className="modal-measures">
            <div className="measure">
              <Ruler size={16} />
              <span className="measure-label">Altura</span>
              <span className="measure-value">{(pokemon.height / 10).toFixed(1)} m</span>
            </div>
            <div className="measure">
              <Weight size={16} />
              <span className="measure-label">Peso</span>
              <span className="measure-value">{(pokemon.weight / 10).toFixed(1)} kg</span>
            </div>
          </div>

          <div className="modal-section">
            <h3><Sparkles size={16} /> Habilidades</h3>
            <div className="abilities">
              {pokemon.abilities.map(({ ability, is_hidden }) => (
                <span key={ability.name} className={`ability ${is_hidden ? 'hidden-ability' : ''}`}>
                  {ability.name.replace('-', ' ')}
                  {is_hidden && <em>oculta</em>}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h3>Base Stats</h3>
            <div className="stats">
              {pokemon.stats.map(({ stat, base_stat }) => (
                <div className="stat-row" key={stat.name}>
                  <span className="stat-label">{STAT_LABELS[stat.name] || stat.name}</span>
                  <div className="stat-track">
                    <div className="stat-fill" style={{ width: `${Math.min((base_stat / 255) * 100, 100)}%` }} />
                  </div>
                  <span className="stat-value">{base_stat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
