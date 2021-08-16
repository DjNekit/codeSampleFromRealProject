import React, { FC } from 'react'
import { SemanticICONS } from 'semantic-ui-react'
import { useMediaQuery } from 'react-responsive'

import { usePagination } from '@/hooks/usePagination'
import { Pagination } from '@/components/Pagination'

import { TableDesktop } from './TableDesktop'
import { TableMobile } from './TableMobile'

import { IActions } from '../../actions'
import { ITestPlan } from '../../types'

interface IProps {
  controlMode: boolean
  testPlanData: Array<ITestPlan>
  selectedColumn: string | null
  direction: SemanticICONS
  actions: IActions
}

export const TestPlanTable: FC<IProps> = ({ controlMode, testPlanData, selectedColumn, direction, actions }) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1100px)' })

  const [
    data,
    totalPages,
    activePage,
    setActivePage,
    pageSize,
    setPageSize
  ] = usePagination<ITestPlan>(testPlanData, 5)

  const headerCells = [
    { name: 'Кафедра', columnName: 'chair' },
    { name: 'ФИО преподавателя', columnName: 'teacherName' },
    { name: 'ООП (НП)', columnName: 'speckod' },
    { name: 'Дисциплина', columnName: 'subj', width: '125px' },
    { name: 'Группа', columnName: 'groupname' },
    { name: 'Дата\nдобавления', columnName: 'pg_created' },
    { name: 'Дата\nтестирования', columnName: 'testdate' },
    { name: 'Статус', columnName: 'pgmode' },
  ]

  const customFooter = <>
    <Pagination
      activePage={activePage}
      totalPages={totalPages}
      pageSize={pageSize}
      setActivePage={setActivePage}
      setPageSize={setPageSize}
    />
    <div>просмотр {(data.length ? 1 : 0) + (activePage - 1) * data.length} - {data.length + (activePage - 1) * data.length} из {testPlanData.length}</div>
  </>

  return (
    <div>
      {isDesktop
        ? 
        <TableDesktop
          data={data}
          headerCells={headerCells}
          activePage={activePage}
          controlMode={controlMode}
          selectedColumn={selectedColumn}
          direction={direction}
          customFooter={customFooter}
          actions={actions}
        />

        : 
        <TableMobile
          data={data}
          controlMode={controlMode}
          headerCells={headerCells}
          customFooter={customFooter}
          actions={actions}
        />
      }
    </div>
  )
}