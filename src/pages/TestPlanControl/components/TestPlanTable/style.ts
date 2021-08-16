import styled, { css } from 'styled-components'
import { Table } from 'semantic-ui-react'

export const TableCell = styled(Table.Cell)`
  padding: 0 !important;
  border-top: 0 !important;
`

interface IStatusSpan {
  color: 'red' | 'green' | 'orange'
}
export const Span = styled.span<IStatusSpan>`
  color: ${({ color }) => color};
  width: 90px;
`

export const TableHeaderCell = styled(Table.HeaderCell)<{ active: boolean }>`
  cursor: pointer!important;
  background: ${({ active }) => active && 'rgba(0,0,0,.05)'} !important;

  &:hover {
    background: rgba(0,0,0,.05) !important;
  }
`

export const iconSlide = css<{ show: boolean }>`
  transform: ${({ show }) => show ? 'translateX(0)' : 'translateX(100%)'};
  
  &.transition-enter {
    transform: translateX(100%);
  }

  &.transition-enter-active {
    transform: translateX(0);
  }

  &.transition-exit {
    transform: translateX(0);
  }

  &.transition-exit-active {
    transform: translateX(100%);
  }
`

export const counterSlide = css<{ show: boolean }>`
  transform: ${({ show }) => show ? 'translateX(5px)' : 'translateX(-20px)'};
  
  &.transition-enter {
    transform: translateX(-20px);
  }

  &.transition-enter-active {
    transform: translateX(5px);
  }

  &.transition-exit {
    transform: translateX(5px);
  }

  &.transition-exit-active {
    transform: translateX(-20px);
  }
`