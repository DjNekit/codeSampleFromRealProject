import styled from 'styled-components'

interface Props {
    maxWidth?: string
    minWidth?: string
    width?: string
    padding?: string
    margin?: string
    position?: string
}
export const Container = styled.div<Props>`
    max-width: ${({ maxWidth }) => maxWidth ?? '1170px'};
    min-width: ${({ minWidth }) => minWidth ?? ''};
    width: ${({ width }) => width ?? '100%'};
    padding: ${({ padding }) => padding ?? '0 1rem'};
    margin: ${({ margin }) => margin ?? '0 auto'};
    position: ${({ position }) => position ?? 'relative'};
`
