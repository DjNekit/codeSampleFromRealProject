import React, { Children, useState } from 'react'
import { Button } from 'semantic-ui-react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'

import { Wrapper } from './style'

export const Switch = ({ state, timeout=300, children }) => {

    return (
        <SwitchTransition mode='out-in' >
          <CSSTransition
            key={state}
            addEndListener={(node, done) => {
              node.addEventListener("transitionend", done, false);
            }}
            classNames="fade"
          >
            <Wrapper timeout={timeout}>
              {children}
            </Wrapper>
            
          </CSSTransition>
        </SwitchTransition>
    )
}
