import React from 'react'
import { Link } from './style'

type Props = {
    href: string
    active: boolean
    content: React.ReactNode
}
export const MenuLink: React.FC<Props> = ({ href, active, content }) => {
    return (
        <Link href={href} active={active}>
            {content}
        </Link>
    )
}
