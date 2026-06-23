import { TYPE_COLORS } from '../../api';
import './TypeFilter.css';

const TYPE_TRANSLATIONS = {
  normal: 'Normal',
  fire: 'Fogo',
  water: 'Água',
  electric: 'Elétrico',
  grass: 'Grama',
  ice: 'Gelo',
  fighting: 'Lutador',
  poison: 'Venenoso',
  ground: 'Terra',
  flying: 'Voador',
  psychic: 'Psíquico',
  bug: 'Inseto',
  rock: 'Pedra',
  ghost: 'Fantasma',
  dragon: 'Dragão',
  dark: 'Sombrio',
  steel: 'Aço',
  fairy: 'Fada',
};

export default function TypeFilter({ selectedType, onSelect, onClear }) {
  const types = Object.keys(TYPE_COLORS);

  return (
    <div className="filtro-tipos">
      <button
        className={`chip ${!selectedType ? 'active' : ''}`}
        onClick={onClear}
        style={{ '--type-color': '#1a1a1a' }}
      >
        Todos
      </button>
      
      {types.map((type) => {
        const isActive = selectedType === type;
        const color = TYPE_COLORS[type];
        return (
          <button
            key={type}
            className={`chip ${isActive ? 'active' : ''}`}
            onClick={() => onSelect(type)}
            style={{ '--type-color': color }}
          >
            {TYPE_TRANSLATIONS[type] || type}
          </button>
        );
      })}
    </div>
  );
}
