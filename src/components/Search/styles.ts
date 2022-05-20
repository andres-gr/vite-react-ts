import styled from '@emotion/styled'

import { flexCenter } from '~styles/main'

const SearchContainer = styled('div')`
  ${flexCenter}

  flex-direction: column;
`

const SearchImageContainer = styled('div')`
  height: 300px;
  margin-bottom: 16px;
  width: 300px;

  > img {
    max-height: 100%;
    max-width: 100%;
  }
`

const SearchInput = styled('input')`
  border-radius: 8px;
  font-size: 2rem;
`

export {
  SearchContainer,
  SearchImageContainer,
  SearchInput,
}
