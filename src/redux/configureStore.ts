import Immutable from 'seamless-immutable'
import thunk from 'redux-thunk'
import { batchDispatchMiddleware } from 'redux-batched-actions'
import { createStore, compose, applyMiddleware } from 'redux'
import { createReducer } from './createReducer'

export const configureStore = (initialState, injectedReducers) => {
    const middlewares = [
        batchDispatchMiddleware,
        thunk
    ]
    
    const enhancers = [
        applyMiddleware(...middlewares),
    ]

    const composeEnhancers =
        typeof window === 'object' &&
        window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
            ? window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({
                shouldHotReload: false,
            })
            : compose;

    return createStore(
        createReducer(injectedReducers),
        Immutable(initialState),
        composeEnhancers(...enhancers)
    )
}