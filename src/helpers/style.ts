import styled from 'styled-components'

type GridProps = {
  gap?: string
  rows?: string
  columns?: string
  alignContent?: string
  alignItems?: string
  justifyContent?: string
  justifyItems?: string
  height?: string
}
export const Grid = styled.div<GridProps>`
  display: grid;
  grid-gap: ${props => props.gap && props.gap};
  grid-template-rows: ${props => props.rows && props.rows};
  grid-template-columns: ${props => props.columns && props.columns};
  align-items: ${props => props.alignItems && props.alignItems};
  align-content: ${props => props.alignContent && props.alignContent};
  justify-content: ${props => props.justifyContent && props.justifyContent};
  justify-items: ${props => props.justifyItems && props.justifyItems};
  height: ${props => props.height && props.height};
`

type FlexProps = {
  gap?: string
  alignContent?: string
  alignItems?: string
  justifyContent?: string
  justifyItems?: string
  height?: string
  wrap?: 1 | 0
  direction?: string
  padding?: string
  inline?: boolean
  pointer?: boolean 
}
export const Flex = styled.div<FlexProps>`
  display: ${({ inline }) => inline ? 'inline-' : ''}flex;
  grid-gap: ${({ gap }) => gap || ''};
  align-items: ${({ alignItems }) => alignItems || ''};
  align-content: ${({ alignContent }) => alignContent || ''};
  justify-content: ${({ justifyContent }) => justifyContent || ''};
  justify-items: ${({ justifyItems }) => justifyItems || ''};
  height: ${({ height }) => height || ''};
  flex-wrap: ${({ wrap }) => wrap ? 'wrap' : ''};
  flex-direction: ${({ direction }) => direction || ''};
  padding: ${({ padding }) => padding || ''};
  cursor: ${({ pointer }) => pointer ? 'pointer' : ''};
`


