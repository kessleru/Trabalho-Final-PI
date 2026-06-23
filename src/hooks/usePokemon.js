import { useState, useEffect, useCallback } from 'react';
import { fetchPokemonList, fetchPokemon, fetchPokemonByType } from '../api';

const PER_PAGE = 20;

export default function usePokemon() {
  // Lista principal de Pokémon exibidos no grid
  const [pokemonList, setPokemonList] = useState([]);
  
  // Estados de controle da API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Estados para Paginação
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  
  // Estado para filtro por tipo
  const [selectedType, setSelectedType] = useState(null);

  // Função para carregar a lista paginada de Pokémon
  const loadPokemon = useCallback(async (currentOffset = 0, append = false) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPokemonList(PER_PAGE, currentOffset);
      const details = await Promise.all(
        data.results.map((p) => fetchPokemon(p.name))
      );
      
      // Se for carregar mais, concatena a nova lista, senão sobrescreve
      setPokemonList((prev) => (append ? [...prev, ...details] : details));
      setHasMore(data.next !== null);
      setOffset(currentOffset + PER_PAGE);
    } catch {
      setError('Erro ao carregar Pokémon.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Carrega a página inicial no primeiro render do hook
  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => {
      if (active) loadPokemon(0);
    });
    return () => {
      active = false;
    };
  }, [loadPokemon]);

  // Função chamada ao clicar em "Carregar mais"
  function loadMore() {
    // Só carrega mais se não estiver carregando, se houver mais páginas e se não houver filtros ativos
    if (!loading && hasMore && !selectedType) {
      loadPokemon(offset, true);
    }
  }

  // Filtra a lista de Pokémon por tipo (Ex: fogo, água)
  async function handleTypeFilter(type) {
    // Se o usuário clicar no mesmo tipo que já está selecionado, limpa o filtro
    if (type === selectedType) {
      clearFilters();
      return;
    }

    setSelectedType(type);
    setLoading(true);
    setError(null);
    setHasMore(false); // Paginação é desativada sob filtros de tipo na PokeAPI

    try {
      const list = await fetchPokemonByType(type);
      const limited = list.slice(0, 40); // Limita aos 40 primeiros por performance
      const details = await Promise.all(limited.map((p) => fetchPokemon(p.name)));
      setPokemonList(details);
    } catch {
      setError('Erro ao filtrar por tipo.');
    } finally {
      setLoading(false);
    }
  }

  // Limpa todos os filtros ativos e recarrega a lista inicial
  function clearFilters() {
    setSelectedType(null);
    setError(null);
    loadPokemon(0);
  }

  return {
    pokemonList,
    loading,
    error,
    hasMore,
    selectedType,
    loadMore,
    handleTypeFilter,
    clearFilters,
  };
}

