import styled from 'styled-components'

type MWProps = {
    isScrollUp: boolean
}
export const MenuWrapper = styled.div<MWProps>`
    display: flex;
    flex-direction: column;
    background: rgba(17, 17, 17, 0.7);
    position: sticky;
    top: ${props => props.isScrollUp ? '0' : '-50px'};
    z-index: 1080;
    font-size: 1.2rem;
    transition: .2s top;
`

export const MenuContent = styled.div`
    height: 45px;
    display: flex;
    justify-content: space-between;
    color: #fff;

    a {
        color: #fff;
    }
`

export const MenuButton = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    grid-gap: 13px;
    transition: opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
    cursor: pointer;

    span {
        position: relative;
        top: 1px;
    }
`

export const MenuLinks = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    grid-gap: 6vw;
    transition: opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
    cursor: pointer;
    
    @media(min-width: 1438px) {
        grid-gap: 84px;
    }
    @media(max-width: 992px) {
        display: none;
    }
`

type LinkProps = {
    active: boolean
}
export const Link = styled.a<LinkProps>`
    opacity: ${props => props.active ? '.5' : '1'};

    &:hover {
        opacity: .5;
    }
`
