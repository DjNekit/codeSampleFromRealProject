import styled from 'styled-components'

export const FilterWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem 3rem; 

  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);

  }
  @media (max-width: 442px) {
    grid-template-columns: 1fr;
  }
`

export const A = styled.a`
  border-bottom: 1px dashed #4183c4;
  cursor: pointer;
  user-select: none;
`

export const FieldWrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 150px auto;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }

`