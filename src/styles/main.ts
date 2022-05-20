import { css } from '@emotion/react'

const flexCenter = css`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`

const defaultLayout = css`
  ${flexCenter}

  height: 100vh;
  width: 100vw;
`

export {
  defaultLayout,
  flexCenter,
}
