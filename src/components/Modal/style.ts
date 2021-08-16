import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1090;
  background: rgba(0, 0, 0, .3);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  user-select: none;
`

export const ModalWrapper = styled.div`
  margin: 0 .5rem;
  position: absolute;
  /* z-index: 1001; */
  border-radius: .28571429rem;
  background: #fff;
  box-shadow: 1px 3px 3px 0 rgb(0 0 0 / 20%), 1px 3px 15px 2px rgb(0 0 0 / 20%);

  @media only screen and (max-width: 768px) {
    min-width: 52.8%;
  }
`

export const Header = styled.div`
  font-size: 1.42857143rem;
  padding: 1.25rem 1.5rem;
  line-height: 1.28571429em;
  font-weight: 700;
  color: rgba(0,0,0,.85);
  border-bottom: 1px solid rgba(34,36,38,.15);
`

export const Content = styled.div`
  max-height: 60vh;
  padding: 1.5rem;
  line-height: 1.4;
  overflow: auto;
`   

export const Footer = styled.div`
  background: #f9fafb;
  padding: 1rem 1rem;
  border-top: 1px solid rgba(34,36,38,.15);
  border-radius: .28571429rem;
  text-align: right;
`