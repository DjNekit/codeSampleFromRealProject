import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import { configureStore } from '../redux/configureStore'
import { getStoreData } from '@/helpers/index'

export const render = (PageComponent, pageReducer?) => {
  const store = configureStore(getStoreData(), pageReducer)

  ReactDOM.render(
    <Provider store={store}>
      <App>
        <PageComponent />
      </App>
    </Provider>,
    document.getElementById('app')
  )
}