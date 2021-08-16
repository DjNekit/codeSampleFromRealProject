import styled from 'styled-components'

export const Wrapper = styled.div`
  display: grid;
  grid-gap: 1.2rem;
  margin-top: 1.2rem;
  overflow: hidden;
`

export const A = styled.a`
  display: flex;
`

export const Div = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden ;
  background: #efedf1 ;
  position: relative;
  z-index: 1;
  padding-right: 1rem;
`

export const Slide = styled.div<{ open: boolean }>`
  display: flex;
  align-items: center;
  grid-gap: 1rem;
  transition: transform .3s ease-out;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-219px)'};
`

