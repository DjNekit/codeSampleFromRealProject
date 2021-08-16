import Immutable from 'seamless-immutable'
import sortBy from 'lodash-es/sortBy'

const initialState = Immutable({})


export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'CHANGE_MODE':
      return state.set('controlMode', payload)

    case 'TOGGLE_GROUP_MODE': {
      const newTestPlan = state['testPlan'].map(i => {
        return payload.groupItems.some(item => i.groupid === item.groupid)
          ? {...i, pgmode: payload.pgmode}
          : i
      })

      return state.set('testPlan', newTestPlan)    
    }

    case 'SET_FILTER':
      const filterSettings = state['filterSettings'] || {}
      return state.set('filterSettings', {...filterSettings, ...payload })

    case 'CHANGE_SORT':
      if (state['selectedColumn'] === payload) {
        return state.set('testPlan', [...state['testPlan']].reverse())
                    .set('direction', state['direction'] === 'caret up' ? 'caret down' : 'caret up',)
      }

      return state.set('testPlan', sortBy(state['testPlan'], [payload]))
                  .set('selectedColumn', payload)
                  .set('direction', 'caret up')

    default:
      return state
  }
}

