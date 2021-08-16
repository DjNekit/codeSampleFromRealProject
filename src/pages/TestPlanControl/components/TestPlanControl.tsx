import React, { FC, useCallback, useMemo } from 'react'
import { Icon, Checkbox, SemanticICONS } from 'semantic-ui-react'

import { useThrottleCallback } from '@/hooks/useThrottleCallback'
import { useHover } from '@/hooks/useHover'
import { H1, H2 } from '@/components/defaultTags'
import { Flex } from '@/helpers/style'

import { Filter } from '@/components/Filter'
import { TestPlanTable } from './TestPlanTable'
import { ControlType, ITestPlan } from '../types'
import { Wrapper, A } from './style'
import { IActions } from '../actions'
import { TeacherAccess } from './TeacherAccess'

interface IProps {
  controlMode: ControlType
  testPlan: Array<ITestPlan>
  direction: SemanticICONS
  selectedColumn: string | null
  filterSettings: {
    [filter: string]: string
  }
  actions: IActions
}

export const TestPlanControl: FC<IProps> = ({
  controlMode,
  testPlan,
  filterSettings = {},
  direction,
  selectedColumn,
  actions
}) => {
  const [hoverRef, isHovered] = useHover()

  const testPlanData = useMemo(() => {
    const filters = Object.entries(filterSettings)
    if (!filters.length) return testPlan

    return [...testPlan].filter(i => {
      let pass = true

      filters.forEach(([filter, value]) => {
        if (value === 'Ожидание') value = 'a'
        if (value === 'Утверждено') value = 'r'
        if (value === 'Отклонено') value = 'b'

        if (i[filter] !== value && value !== 'Все') pass = false
      })

      return pass ? i : false

    })
  }, [filterSettings, testPlan])

  const teacherNames = useMemo(() => Array.from(new Set(testPlan.map((i: ITestPlan) => i.teacherName))).map((i, idx) => ({
    key: idx,
    value: i,
    text: i
  })), [])

  const chairs = useMemo(() => Array.from(new Set(testPlan.map((i: ITestPlan) => i.chair))).map((i, idx) => ({
    key: idx,
    value: i,
    text: i
  })), [])

  const speckods = useMemo(() => Array.from(new Set(testPlan.map((i: ITestPlan) => i.speckod))).map((i, idx) => ({
    key: idx,
    value: i,
    text: i
  })), [])

  const subjs = useMemo(() => Array.from(new Set(testPlan.map((i: ITestPlan) => i.subj))).map((i, idx) => ({
    key: idx,
    value: i,
    text: i
  })), [])

  const groupNames = useMemo(() => Array.from(new Set(testPlan.map((i: ITestPlan) => i.groupname))).map((i, idx) => ({
    key: idx,
    value: i,
    text: i
  })), [])

  const pg_created = useMemo(() => Array.from(new Set(testPlan.map((i: ITestPlan) => i.pg_created))).map((i, idx) => ({
    key: idx,
    value: i,
    text: i
  })), [])

  const testdates = useMemo(() => Array.from(new Set(testPlan.map((i: ITestPlan) => i.testdate))).map((i, idx) => ({
    key: idx,
    value: i,
    text: i
  })), [])

  const pgmodes = useMemo(() => Array.from(new Set(testPlan.map((i: ITestPlan) => i.pgmode))).map(i => {
    if (i === 'a') return 'Ожидание'
    if (i === 'b') return 'Отклонено'
    return 'Утверждено'
  }).map((i, idx) => ({
    key: idx + 1,
    value: i,
    text: i
  })), [testPlan])

  const filterFields = [
    { name: 'Кафедра:', options: chairs, value: 'chair' },
    { name: 'Группа:', options: groupNames, value: 'groupname' },
    { name: 'Преподаватель:', options: teacherNames, value: 'teacherName' },
    { name: 'Дата добавления:', options: pg_created, value: 'pg_created' },
    { name: 'ООП (НП):', options: speckods, value: 'speckod' },
    { name: 'Дата тестирования:', options: testdates, value: 'testdate' },
    { name: 'Дисциплина:', options: subjs, value: 'subj' },
    { name: 'Статус:', options: pgmodes, value: 'pgmode' },
  ]

  const controlModeChange = useThrottleCallback((controlMode) => {
    actions.controlModeChange(controlMode === 'y' ? 'n' : 'y')
  }, 500)

  const onFieldChange = useCallback((fieldName, value) => {
    actions.setFilter(fieldName, value)
  }, [])

  return (
    <Wrapper>
      <H1 noMargin>Управление планами тестирования преподавателей</H1>
      <TeacherAccess />
      <H2 noMargin>
        <Flex alignItems='center' gap='1rem'>
          <Checkbox toggle checked={controlMode === 'y'} onChange={() => controlModeChange(controlMode)} />
          <div>режим управления</div>
          <A href='http://fepo.i-exam.ru/node/332' ref={hoverRef} target="_blank">
            <Icon name='question circle' title='подробнее о режимах управления' color={isHovered ? 'blue' : 'grey'} />
          </A>
        </Flex>
      </H2>
      <Filter
        fields={filterFields}
        activeFilters={filterSettings}
        onFieldChange={onFieldChange}
      />

      <TestPlanTable
        controlMode={controlMode === 'y'}
        testPlanData={testPlanData}
        direction={direction}
        selectedColumn={selectedColumn}
        actions={actions}
      />

      <H2 noMargin>Условные обозначения:</H2>
      <Flex padding='0 1rem 0 1rem' gap='2rem' wrap={1}>
          <Icon name='list' size='large' color='grey' />– информация о ПИМ
          <Icon name='x' color='red' size='large' />– отклонить позицию плана тестирования
          <Icon name='check' color='olive' size='large' />– утвердить позицию плана тестирования
      </Flex>
    </Wrapper>
  )
}
