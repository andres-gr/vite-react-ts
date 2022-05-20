import {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from 'react'

import { debounce } from 'lodash-es'

import pokemon from '~api/pokemon.json'
import { Pokemon } from '~types/pokemon'

interface UsePokemonSearchArgs {
  placeholder?: string
}

interface UsePokemonSearchResult {
  currentPokemon: string
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  image: string
  loading: boolean
  placeholder: string
}

type UsePokemonSearch = (args: UsePokemonSearchArgs) => UsePokemonSearchResult

const usePokemonSearch: UsePokemonSearch = ({ placeholder = 'Pokemon' }) => {
  const [
    isPending,
    startTransition,
  ] = useTransition()

  const [
    currentSearch,
    setCurrentSearch,
  ] = useState('')

  const [
    currentPokemon,
    setCurrentPokemon,
  ] = useState('')

  const [
    image,
    setImage,
  ] = useState('')

  useEffect(() => {
    if (currentSearch !== '' && currentSearch.length >= 2) {
      const res = pokemon.names.find(name => name.startsWith(currentSearch.toLowerCase()))

      if (res) {
        const pokemonName = `${res.substring(0, 1).toUpperCase()}${res.substring(1)}`
        setCurrentPokemon(pokemonName)
        startTransition(() => {
          const pokeUrl = pokemon.results.find(({ name }) => name === res)?.url
          fetch(pokeUrl!)
            .then<Pokemon>(result => result.json())
            .then(result => {
              setImage(result.sprites?.other?.['official-artwork']?.front_default!)
            })
            // eslint-disable-next-line no-console
            .catch(console.error)
        })
      }

      if (!res) {
        setCurrentPokemon('')
        setImage('')
      }
    }

    if (currentSearch === '' || currentSearch.length < 2) {
      setCurrentPokemon('')
      setImage('')
    }
  }, [currentSearch])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(debounce((value: string) => setCurrentSearch(value), 750), [])

  const handleSearchChange: UsePokemonSearchResult['handleSearchChange'] = useCallback(e => {
    const { value } = e.currentTarget
    debouncedSearch(value)
  }, [debouncedSearch])

  return {
    currentPokemon,
    handleSearchChange,
    image,
    loading: isPending,
    placeholder,
  }
}

export default usePokemonSearch
