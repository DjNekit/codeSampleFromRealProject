import React, { FC, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

import { Timing, Wrapper } from './style'

interface IAccordeon {
  open: boolean
  timeout?: number
  timingFunction?: Timing
  unmountOnExit?: boolean
  mountOnEnter?: boolean
  style?
}

export const Accordeon: FC<IAccordeon> = ({ 
  open, 
  timeout=300, 
  timingFunction='ease-out', 
  unmountOnExit, 
  mountOnEnter, 
  style={}, 
  children 
}) => {
  const isFirstOpen = useRef(open)

  const onEnter = node => {
    node.style.height = '0px'
    node.style.overflow = 'hidden'
  }
  const onEntering = node => {
    node.style.height = node.scrollHeight + 'px'
  }
  const onEntered = node => {
    node.style.height = 'auto'
    node.style.overflow = 'visible'
  }
  const onExit = node => {
    node.style.height = node.scrollHeight + 'px'
    node.style.overflow = 'hidden'
  }
  const onExiting = node => {
    node.style.height = '0px'
  }
  const onExited = node => {
    node.style.height = '0px'
  }

  return (
    <CSSTransition 
      in={open} 
      classNames='transition' 
      timeout={timeout} 
      unmountOnExit={unmountOnExit}
      mountOnEnter={mountOnEnter}

      onEnter={onEnter}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
    >
      <Wrapper open={isFirstOpen.current} timeout={timeout} timingFunction={timingFunction}>
        <div style={style}>
          {children}
        </div>
      </Wrapper>
    </CSSTransition>
  )
}
