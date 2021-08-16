export type ActionCreatorType = (dispatch, getState?) => Promise<void> | void

type ModalContent = string | React.ReactNode
type ModalType = 'success' | 'info' | 'warning' | 'danger'

export interface IModal {
  message: ModalContent
  header?: ModalContent
  variant?: ModalType
  onAgree?: () => void
}
export interface IAction {
  type: string
  payload: any
}

export const showGlobalError = (message, options?) => ({ type: 'SET_GLOBAL_ERROR', payload: { ...options, message } })
export const deleteGlobalError = () => ({ type: 'DELETE_GLOBAL_ERROR' })

export const toggleModal = (options?: IModal) => {
  const action: IAction = {
    type: 'TOGGLE_MODAL',
    payload: null
  }
  if (options) action.payload = options
  return action
}


export const setGridParams = (gridName, params) => {
  return {
    type: 'SET_GRID_PARAMS',
    payload: { gridName, params }
  }
}

