import React from 'react'

import { Header } from '../Header'
import { Menu } from '../Menu'
import { Container } from '../Container'
import { SecondaryHeaderMenu } from '../SecondaryHeaderMenu'
import { GlobalErrorContainer } from '../GlobalErrorContainer'
import { Modal } from '../Modal'
import { FooterMenu } from '../FooterMenu'

import { LayoutWrapper } from './style'

type Props = {
    actMode: string
    userName: string
    isUnifiedAccount: boolean
    headerSecondaryMenu: object
    allMenuLinks: object
    [anotherProp: string]: any
}

export const Layout: React.FC<Props> = props => {
    const { MODAL={} } = props
    const hasMenuLinks = props.headerSecondaryMenu && props.headerSecondaryMenu[""].length > 0

    return (
        <LayoutWrapper>
            <Header {...props} />
            <Menu {...props} />
            <Container margin='2rem auto 0'>
                {hasMenuLinks && <SecondaryHeaderMenu links={props.headerSecondaryMenu} closeHeader={true} />}
                {props.children}
            </Container>
            <FooterMenu {...props} />
            <GlobalErrorContainer error={props.GLOBAL_ERROR} deleteError={props.actions.deleteGlobalError} />
            <Modal {...MODAL} />
        </LayoutWrapper>
    )
}