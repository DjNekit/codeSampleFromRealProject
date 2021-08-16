import styled from 'styled-components'

export type Timing = 'ease' | 'ease-in' | 'ease-in-out' | 'ease-out' | 'linear'

interface IProps {
  open: boolean
  timeout: number
  timingFunction: Timing
}

export const Wrapper = styled.div<IProps>`
  overflow: ${({ open }) => open ? 'visible' : 'hidden'};
  height: ${({ open }) => open ? 'auto' : '0px'};
  transition: height ${({ timeout, timingFunction }) => `${timeout}ms ${timingFunction}`};
`
