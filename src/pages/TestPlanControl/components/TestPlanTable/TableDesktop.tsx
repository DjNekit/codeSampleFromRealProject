import React, { FC } from 'react'
import { useState, useEffect, useCallback } from 'react'
import { Button, Checkbox, CheckboxProps, Icon, Table } from 'semantic-ui-react'

import { useModal } from '@/hooks/useModal'

import { Transition } from '@/components/Transition'
import { Accordeon } from '@/components/Accordeon'
import { Flex, Grid } from '@/helpers/style'

import { TableRow } from './TableRow'

import { TableHeaderCell } from './style'
import { ITestPlan } from '../../types'

interface IProps {
  data
  headerCells
  activePage
  controlMode
  selectedColumn
  direction
  customFooter
  actions
}

export const TableDesktop: FC<IProps> = ({ data, headerCells, activePage, controlMode, selectedColumn, direction, customFooter, actions }) => {
  const [checked, setChecked] = useState<Array<ITestPlan>>([])
  const { showModal } = useModal()

  useEffect(() => {
    checked.length && setChecked([])
  }, [activePage])

  const onAllCheckHandle = (e, { checked }: CheckboxProps) => {
    checked
      ? setChecked(data)
      : setChecked([])
  }

  const onRowClickHandle = useCallback((id: string) => {
    const tableItem = data.find(i => i.groupid === id)

    if (tableItem) {
      checked.find(i => i.groupid === id)
        ? setChecked(prev => [...prev].filter(i => i.groupid !== id))
        : setChecked(prev => [...prev, tableItem])
    }
  }, [checked])

  const acceptAllPositions = () => {
    checked.length && actions.toggleGroupsMode(checked, 'approveGroups')
  }

  const rejectAllPositions = () => {
    checked.length &&
      showModal({
        message: <>
          <div>В числе выбранных есть группы, для которых уже сгенерированы логины/пароли:</div>
          <ul>
            {checked.map((i, idx) => (
              <li key={idx}>{i.groupname}</li>
            ))}
          </ul>
        </>,
        onAgree: () => actions.toggleGroupsMode(checked, 'rejectGroups')
      })
  }

  return (
    <>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ paddingRight: 0 }}>
              <Transition show={controlMode} animation='fade' unmountOnExit>
                <Flex>
                  <Checkbox onChange={onAllCheckHandle} checked={checked.length !== 0 && data.length === checked.length} />
                </Flex>
              </Transition>
            </Table.HeaderCell>
            {headerCells.map(({ name, columnName, width }) => (
              <TableHeaderCell
                key={columnName}
                active={selectedColumn === columnName}
                onClick={() => actions.changeSort(columnName)}
              >
                <Flex alignItems='center' justifyContent='space-between' style={{ width }}>
                  <span>{name}</span>
                  <Icon name={selectedColumn === columnName ? direction : undefined} />
                </Flex>
              </TableHeaderCell>
            ))}
            <Table.HeaderCell>Действия</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {!data.length &&
            <Table.Row>
              <Table.Cell colSpan={10}>
                Планы тестирования отсутствуют
              </Table.Cell>
            </Table.Row>
          }
          {data.map((i: ITestPlan, idx) => (
            <TableRow
              key={i.groupid}
              data={i}
              count={idx + 1 + (activePage - 1) * data.length}
              editable={controlMode}
              checked={!!checked.find(c => c.groupid === i.groupid)}
              setChecked={onRowClickHandle}
              actions={actions}
            />
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='10'>
              <Grid columns='1fr auto 1fr' justifyContent='space-between' justifyItems='end' alignItems='center'>
                <div></div>
                {customFooter}
              </Grid>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      <Accordeon open={controlMode} mountOnEnter>
        <Flex gap='.5rem' alignItems='center' padding='0 0 0 .7rem'>
          <Icon name='share' style={{ transform: 'rotate(-90deg)' }} size='big' />
          <Button color='olive' onClick={acceptAllPositions}>Утвердить выбранные позиции</Button>
          <Button color='red' onClick={rejectAllPositions}>Отклонить выбранные позиции</Button>
        </Flex>
      </Accordeon>
    </>
  )
}