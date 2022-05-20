import { FC } from 'react'

import usePokemonSearch from '~hooks/usePokemonSearch'

import {
  SearchContainer,
  SearchImageContainer,
  SearchInput,
} from './styles'

const Search: FC = () => {
  const {
    currentPokemon,
    handleSearchChange,
    image,
    placeholder,
  } = usePokemonSearch({ placeholder: 'Search for a pokemon' })

  return (
    <SearchContainer>
      <SearchImageContainer>
        {
          image !== '' && (
            <img
              alt={ currentPokemon }
              src={ image }
            />
          )
        }
      </SearchImageContainer>
      <SearchInput
        placeholder={ currentPokemon || placeholder }
        onChange={ handleSearchChange }
      />
    </SearchContainer>
  )
}

export default Search
