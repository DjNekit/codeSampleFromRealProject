import React, { FC, useState, useEffect } from 'react'
import { IModal } from '@globalActions'
import { Button } from 'semantic-ui-react'
import ThemedButton from '../Theme/Button'
import { useModal } from '@/hooks/useModal'
import { Transition } from '../Transition'
import { Wrapper, ModalWrapper, Header, Content, Footer } from './style'

export const Modal: FC<IModal> = ({ message, header = 'Внимание!', onAgree }) => {
  const { hideModal } = useModal()
  const [show, setShow] = useState(!!message)

  useEffect(() => {
    message && !show && setShow(true)
  }, [message])

  const hideModalHandle = () => setShow(prev => !prev)

  const handleClick = () => {
    onAgree && onAgree()
    setShow(false)
  }

  return (
    <Transition show={show} animation='fade' unmountOnExit onExited={hideModal}>
        <Wrapper>
          <ModalWrapper>
            <Header>{header}</Header>
            <Content>{message}</Content>
            <Footer>
              {onAgree
                ? <>
                  <Button onClick={handleClick} color='green'>Ок</Button>
                  <Button onClick={hideModalHandle} color='red'>Отмена</Button>
                </>

                : <ThemedButton onClick={hideModalHandle}>Ок</ThemedButton>
              }
            </Footer>
          </ModalWrapper>
        </Wrapper>
    </Transition>
  )
}