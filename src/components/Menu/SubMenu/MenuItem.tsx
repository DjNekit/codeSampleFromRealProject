import React from 'react'
import { CustomMenuItem } from './style'

export const MenuItem = ({ content, color, active, handleClick, id }) => {
    return (
        <CustomMenuItem active={active} color={color} onClick={handleClick} id={id}>
            {content}
        </CustomMenuItem>
    )
}
