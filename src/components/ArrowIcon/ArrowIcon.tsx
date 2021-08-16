import React, { FC } from 'react'
import { Arrow } from './style'

interface IProps {
  open?: boolean
  onClick?: () => void
}
export const ArrowIcon: FC<IProps> = ({ open=false, onClick }) => {
  const clickHandle = () => {
    onClick && onClick()
  }
  return (
    <Arrow open={open} onClick={clickHandle} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 5L7 10L12.5 5" stroke="black" strokeOpacity="0.87" strokeLinecap="round" strokeLinejoin="round" />
    </Arrow>
  )
}
