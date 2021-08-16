import React, { FC } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { connect, Provider } from 'react-redux'
import { bindActionCreators } from 'redux'
import { configureStore } from '../redux/configureStore'

interface IRender extends RenderOptions {
  Ui
  initialState,                  
  reducer,
  actions,
  mapStateToProps: (state) => any 
  // ? Функция позволяет редьюсеру работать корректно на основе стейта, но при этом возвращает обьект кастомных пропсов компоненту 
}

const renderWithState = ({ Ui, initialState, actions, reducer, mapStateToProps }: IRender) => {
  const mapDispatchToProps = dispatch => {
    
    return { 
      actions: bindActionCreators(actions, dispatch) 
    }
  }

  const ConnectedUi = connect(
    mapStateToProps, 
    mapDispatchToProps
  )(Ui)
  
  const Component: FC = () => {
    const store = configureStore(initialState, reducer)
    return (
      <Provider store={store}>
        <ConnectedUi />
      </Provider>
    )
  }
  
  return render(<Component />)
}

export * from '@testing-library/react'
export { renderWithState }