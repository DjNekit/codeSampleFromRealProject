import styled, { css } from 'styled-components'

interface IProps {
  show: boolean
  timeout: number
  delay: number 
  animation?: 'fade'| 'scaleFade'
  customAnimation?
}

const fade = css<IProps>`
  opacity: ${({ show }) => show ? '1' : '0'};
  visibility: ${({ show }) => show ? 'visible' : 'hidden'};

  &.transition-enter {
    opacity: 0;
    visibility: hidden;
  }
  &.transition-enter-active {
    opacity: 1;
    visibility: visible;
  }
  &.transition-exit {
    opacity: 1;
    visibility: visible;
  }
  &.transition-exit-active {
    opacity: 0;
    visibility: hidden;
  }
`

export const Wrapper = styled.div<IProps>`
  transition: ${({ timeout, delay }) => `${timeout + delay}ms all ease-out ${delay}ms`};

  ${({ animation, customAnimation }) => {

    switch(animation) {
      case 'fade':
        return fade
      
      default:
        return customAnimation
    }
  }}
`
