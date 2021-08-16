import styled from 'styled-components'

export const InfoWrapper = styled.div`
  padding: 1rem 2rem; 

  & > ol {
    margin: 0;
  }

  @media(max-width: 1110px) {
    padding: 0;
  }
`

export const LoaderWrapper = styled(InfoWrapper)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`

export const PimContent = styled.div`
  padding: .5rem 0 1rem 1rem;
`