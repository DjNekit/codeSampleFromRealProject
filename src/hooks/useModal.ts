import { useDispatch } from 'react-redux'
import { toggleModal, IModal } from '@globalActions'

export const useModal = () => {
  const dispatch = useDispatch()

  const hideModal = () => {
    dispatch(toggleModal())
  }

  const showModal = (options: IModal) => {
    dispatch(toggleModal(options))
  }

  return { showModal, hideModal }
}