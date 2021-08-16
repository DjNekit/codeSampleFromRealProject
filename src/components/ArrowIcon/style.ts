import styled from 'styled-components'

interface OpenClose {
  open: boolean
}
export const Arrow = styled.svg<OpenClose>`
  transform: ${props => props.open ? 'rotate(-180deg)' : 'rotate(0deg)'};
  transition: .2s transform;
  margin: 0 auto;
`
