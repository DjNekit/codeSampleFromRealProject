import React, { useState } from 'react'

import { Container } from '@/components/Container'
import { ActLinksMenu } from '@/components/ActLinksMenu'
import { MenuItem } from './MenuItem'
import { themes } from '@context'
import { SubMenuWrapper, SubMenuContent, Divider } from './style'


export const SubMenu = props => {
    const [activeActMode, setActiveActMode] = useState(props.actMode)

    const handleItemClick = e => {
        const actMode = e.target.id
        activeActMode !== actMode && setActiveActMode(actMode)
    }

    return (
        <SubMenuWrapper>
            <Container maxWidth='1160px'>
                <SubMenuContent>
                    <div>
                        <MenuItem color={themes.default.primaryColor} handleClick={handleItemClick} active={activeActMode === 'default'} id='default' content='Главная страница' />
                        <Divider />
                        <MenuItem color={themes.diag.primaryColor} handleClick={handleItemClick} active={activeActMode === 'diag'} id='diag' content='Диагностика' />
                        <MenuItem color={themes.ias.primaryColor} handleClick={handleItemClick} active={activeActMode === 'ias'} id='ias' content='Тренажеры' />
                        <MenuItem color={themes.fepo.primaryColor} handleClick={handleItemClick} active={activeActMode === 'fepo'} id='fepo' content='ФЭПО' />
                        <MenuItem
                            color={themes.olymp.primaryColor}
                            handleClick={handleItemClick}
                            active={activeActMode === 'olymp' || activeActMode === 'ols' || activeActMode === 'olps'}
                            id='olymp'
                            content='Олимпиады'
                        />
                        <MenuItem
                            color={themes.fieb_tren.primaryColor}
                            handleClick={handleItemClick}
                            active={activeActMode === 'bklr' || activeActMode.includes('fieb')}
                            id='fieb'
                            content='ФИЭБ'
                        />
                        <MenuItem color={themes.fos.primaryColor} handleClick={handleItemClick} active={activeActMode === 'fos'} id='fos' content='ФОС' />
                    </div>
                    <ActLinksMenu {...props} actMode={activeActMode} />
                </SubMenuContent>
            </Container>
        </SubMenuWrapper>
    )
}