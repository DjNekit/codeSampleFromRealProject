import styled from 'styled-components'

export const SubMenuWrapper = styled.div`
    width: 100%;
    position: absolute;
    top: 45px;
    padding: 15px 0;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
`

export const SubMenuContent = styled.div`
    display: grid;
    grid-template-columns: 2fr 10fr;
    grid-gap: calc(1rem + 20px);

    @media (max-width: 992px) {
        grid-template-columns: 1fr 3fr;
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`

type CMIProps = {
    active: boolean
    color: string
}
export const CustomMenuItem = styled.div<CMIProps>`
    padding: 5px 10px;
    line-height: 26px;
    color: ${props => props.active ? '#fff' : '#111'};
    background-color: ${props => props.active ? props.color : '#fff'};
    border: 1px solid ${props => props.active ? props.color : 'transparent'};
    cursor: pointer;

    &:hover {
        border: 1px solid ${props => props.color ?? 'transparent'};
    }
`

export const Divider = styled.div`
    margin: 5px 0;
    border-top: 1px solid #eee;

    @media (max-width: 767px) {
        display: none;
    }
`