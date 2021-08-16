import styled from 'styled-components'
import { Dropdown } from 'semantic-ui-react'

export const Wrapper = styled.div`
    height: 68px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.05);
    font-family: 'Open Sans', sans-serif;
    font-size: 1.2rem;
    color: #444444;

    @media (max-width: 474px) {
        transition: .3s all ease;
        font-size: 1rem;
        height: auto;
        padding: 10px 0;
    }
`

export const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    grid-gap: 5px;
`

export const LogoWrapper = styled.div`
    display: flex;
    grid-gap: 15px;
    align-items: center;
`

type ImgProps = {
    isDefault: boolean
}
export const Img = styled.img<ImgProps>`
    display: block;
    width: ${props => props.isDefault ? '30px' : ''};
`

export const Div = styled.div`
    display: grid;
    grid-gap: 5px;
`

type UserMenuWrapperProps = {
    show: boolean
}
export const UserMenuWrapper = styled.div<UserMenuWrapperProps>`
    display: ${props => props.show ? 'flex' : 'none'};
`

export const DropdownMenu = styled(Dropdown.Menu)`
    z-index: 1090 !important;
`