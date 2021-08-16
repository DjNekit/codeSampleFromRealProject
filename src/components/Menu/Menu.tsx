import React, { useState, useEffect } from 'react'
import { Container } from '../Container'
import { MenuIcon } from './Icons/MenuIcon'
import { HomeIcon } from './Icons/HomeIcon'
import { MenuLink } from './MenuLink'
import { SubMenu } from './SubMenu'
import { themes } from '@context'
import { normalizeActMode } from '@/helpers/index'
import { MenuWrapper, MenuContent, MenuButton, MenuLinks } from './style'

export const Menu = props => {
    const actMode = normalizeActMode(props.actMode)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrollUp, setIsScrollUp] = useState(false)

    const handleToggleMenu = () => setIsMenuOpen(!isMenuOpen)

    let scrollY
    const handleScroll = e => {
        // Скроллим вверх
        if (scrollY >= window.scrollY) setIsScrollUp(true)
        // Скроллим вниз
        if (scrollY < window.scrollY) setIsScrollUp(false)

        // Сохраняем результат последней позиции, чтобы при следующем скролле определить, в какую сторону двигается страница
        scrollY = window.scrollY
    }

    useEffect(() => {
        if (!props.noScroll) {
            window.addEventListener('scroll', handleScroll, false)
            return () => window.removeEventListener('scroll', handleScroll, false)
        }
    }, [])

    return (
        <MenuWrapper isScrollUp={isScrollUp}>
            <Container>
                <MenuContent>
                    <MenuButton onClick={handleToggleMenu}>
                        <MenuIcon />
                        <span>Меню</span>
                    </MenuButton>
                    <MenuLinks>
                        <MenuLink href={themes.default.href} active={actMode === 'default'} content={<HomeIcon />} />

                        <MenuLink href={themes.diag.href} active={actMode === 'diag'} content='Диагностика' />
                        <MenuLink href={themes.ias.href} active={actMode === 'ias'} content='Тренажеры' />
                        <MenuLink href={themes.fepo.href} active={actMode === 'fepo'} content='ФЭПО ' />
                        <MenuLink
                            href={themes.olymp.href}
                            active={actMode.includes('ol')}
                            content='Олимпиады'
                        />
                        <MenuLink
                            href={themes.fieb.href}
                            active={actMode.includes('fieb')}
                            content='ФИЭБ'
                        />
                        <MenuLink href={themes.fos.href} active={actMode === 'fos'} content='ФОС' />
                    </MenuLinks>
                </MenuContent>
            </Container>
            {isMenuOpen && <SubMenu {...props} actMode={actMode} />}
        </MenuWrapper>
    )
}
