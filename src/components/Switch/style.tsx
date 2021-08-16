import styled from 'styled-components'

export const Wrapper = styled.div<{ timeout }>`
  transition: opacity ${({ timeout }) => timeout}ms;
  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active,
  &.fade-enter-done {
    opacity: 1;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active,
  &.fade-exit-done {
    opacity: 0;
  }

  &.fade-enter-active .btn,
  &.fade-exit-active .btn {
    transition: opacity 2000ms;
  }
`
