import Immutable from 'seamless-immutable'


const initialState = Immutable({
  GLOBAL_ERROR: {
    priority: false,
    message: []
  },
  MODAL: {}
})

const rootReducer = injectedReducers => {
  return (state = initialState, action) => {
    switch (action.type) {
      case 'SET_GLOBAL_ERROR':
        if (state.GLOBAL_ERROR && state.GLOBAL_ERROR.priority && !action.payload.priority)
          return state
        return state.set('GLOBAL_ERROR', { ...state.GLOBAL_ERROR, ...action.payload })

      case 'DELETE_GLOBAL_ERROR':
        state = state.without('GLOBAL_ERROR')
        return state

      case 'TOGGLE_MODAL':
        return action.payload
          ? state.set('MODAL', action.payload)
          : state.without('MODAL')

      default:
        return injectedReducers ? injectedReducers(state, action) : state
    }
  }
}

export const createReducer = injectedReducers => rootReducer(injectedReducers)
