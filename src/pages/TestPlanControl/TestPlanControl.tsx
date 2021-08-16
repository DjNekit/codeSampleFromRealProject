import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { TestPlanControl } from './components/TestPlanControl'
import * as actions from './actions'

export const TestPlanApi = () => {
  const dispatch = useDispatch()
  const { controlMode, testPlan, filterSettings, direction, selectedColumn  } = useSelector(state => state)
  
  return (
    <TestPlanControl
      controlMode={controlMode}
      testPlan={testPlan}
      filterSettings={filterSettings}
      direction={direction}
      selectedColumn={selectedColumn}
      actions={bindActionCreators(actions, dispatch)}
    />
  )
}
