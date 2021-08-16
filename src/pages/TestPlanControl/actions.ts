import axios from 'axios'
import { ActionCreatorType } from '@globalActions'
import { ControlType } from './types'

type ControlModeChange = (mode: ControlType) => ActionCreatorType
type ToggleGroupsModeAction = (groupItems: any[], method: 'rejectGroups' | 'approveGroups') => ActionCreatorType
type SetFilterAction = (fieldName: string, value: string) => ActionCreatorType
type ChangeSort = (columnName: string) => ActionCreatorType
type SetTeacher = (teacherId: number) => void
type ResetTeacherAccess = () => void

export interface IActions {
  controlModeChange: ControlModeChange
  toggleGroupsMode: ToggleGroupsModeAction
  setFilter: SetFilterAction
  changeSort: ChangeSort
  setTeacher: SetTeacher
  resetTeacherAccess: ResetTeacherAccess
}

export const controlModeChange: ControlModeChange = mode => {
  return async dispatch => {
    dispatch({
      type: 'CHANGE_MODE',
      payload: mode
    })

    axios.post('ajax/ajax_test_plan_control.php', {
      action: 'changeControlMode',
      controlMode: mode

    })
  }
}

export const toggleGroupsMode: ToggleGroupsModeAction = (groupItems, method) => {
  return dispatch => {
    dispatch({
      type: 'TOGGLE_GROUP_MODE',
      payload: {
        groupItems,
        pgmode: method === 'approveGroups' ? 'r' : 'b'
      }
    })

    axios.post('ajax/ajax_test_plan_control.php', {
      action: 'changeGroupsMode',
      method,
      groups: groupItems.map(i => i.groupid)
    })
  }
}

export const setFilter = (fieldName, value) => {
  return dispatch => {
    dispatch({
      type: 'SET_FILTER',
      payload: {
        [fieldName]: value,
      }
    })
  }
}

export const changeSort = columnName => dispatch => dispatch({ type: 'CHANGE_SORT', payload: columnName })

export const setTeacher = teacherId => {
  axios.post('ajax/ajax_test_plan_control.php', {
    action: 'setTeacherAccess',
    teacherId
  })
}

export const resetTeacherAccess = () => {
  axios.post('ajax/ajax_test_plan_control.php', {
    action: 'resetTeacherAccess'
  })
}
