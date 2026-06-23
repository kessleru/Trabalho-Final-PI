import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import usePokemon from './hooks/usePokemon';
import Header from './components/Header';
import TypeFilter from './components/TypeFilter';
import PokemonGrid from './components/PokemonGrid';
import PokemonModal from './components/PokemonModal';
import Loader from './components/Loader';
import Footer from './components/Footer';

export default function App() {
  const {
    pokemonList,
    loading,
    error,
    hasMore,
    selectedType,
    loadMore,
    handleTypeFilter,
    clearFilters,
  } = usePokemon();

  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <div className="app">
      <Header />

      <main>
        <TypeFilter
          selectedType={selectedType}
          onSelect={handleTypeFilter}
          onClear={clearFilters}
        />

        {error && (
          <div className="mensagem erro">
            <AlertTriangle size={18} />
            {error}
          </div>
        )}

        {!loading && pokemonList.length > 0 && (
          <PokemonGrid
            pokemonList={pokemonList}
            onCardClick={setSelectedPokemon}
            hasMore={hasMore && !selectedType}
            onLoadMore={loadMore}
            loading={loading}
          />
        )}

        {loading && <Loader />}
      </main>

      <Footer />

      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
}

