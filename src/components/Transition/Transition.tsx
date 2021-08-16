import React, { FC } from 'react'
import { CSSTransition } from 'react-transition-group'

import { Wrapper } from './style'

type Delay = {
	onEnter?: number
	onExit?: number
} | number

interface ITransition {
	show: boolean
	timeout?: number
	delay?: Delay
	mountOnEnter?: boolean
	unmountOnExit?: boolean
	animation?: 'fade'
	customAnimation? 
	onExited?
}

export const Transition: FC<ITransition> = ({ 
	show, 
	timeout=300, 
	delay=0, 
	mountOnEnter, 
	unmountOnExit, 
	animation, 
	customAnimation,
	onExited, 
	children 
}) => {
	const del = typeof delay === 'number'
		? delay
		: show
			? delay.onEnter || 0
			: delay.onExit || 0

	return (
    <CSSTransition 
			classNames={'transition'}
			in={show} 
			timeout={timeout} 
			mountOnEnter={mountOnEnter} 
			unmountOnExit={unmountOnExit}
			onExited={onExited}
		>      
      <Wrapper show={show} timeout={timeout} delay={del} animation={animation} customAnimation={customAnimation}>
				{ children }
      </Wrapper>
    </CSSTransition>
	)
}
