import React, { FC, useState } from 'react'
import { Table, Icon, Checkbox } from 'semantic-ui-react'

import { Accordeon } from '@/components/Accordeon'
import { Transition } from '@/components/Transition'

import { Info } from './Info'

import { Flex } from '@/helpers/style'

import { TableCell, Span, counterSlide, iconSlide } from './style'
import { ITestPlan } from '../../types'
import { IActions } from '../../actions'
import { useThrottleCallback } from '@/hooks/useThrottleCallback'

interface IProps {
  data: ITestPlan
  count: number
  editable: boolean
  checked: boolean
  setChecked: (id: string) => void
  actions: IActions
}

export const TableRow: FC<IProps> = ({ data, count, editable, checked, setChecked, actions }) => {
  const { chair, groupid, groupname, pg_created, subj, testdate, teacherName, speckod, pgmode } = data

  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<'pim' | 'fios'>('pim')

  const onInfoClick = (e, open, name: 'fios' | 'pim') => {
    e.stopPropagation()

    if (open) {
      return mode !== name
        ? setMode(name)
        : setOpen(false)
    } else {
      mode !== name && setMode(name)
      setOpen(true)
    }
  }

  const onDisableClick = (e) => {
    e.stopPropagation()

    pgmode !== 'b' && actions.toggleGroupsMode([data], 'rejectGroups')
  }

  const onAgreeClick = e => {
    e.stopPropagation()
    pgmode !== 'r' && actions.toggleGroupsMode([data], 'approveGroups')
  }

  return (
    <>
      <Table.Row onClick={() => setChecked(groupid)}>
        <Table.Cell style={{ paddingRight: 0 }}>
          <Flex alignItems='center'>
            <Transition show={editable} animation='fade'>
              <Flex alignItems='center'>
                <Checkbox checked={checked} />
              </Flex>
            </Transition>
            <Transition show={editable} customAnimation={counterSlide}>
              <span>{count}</span>
            </Transition>
          </Flex>
        </Table.Cell>
        <Table.Cell>{chair}</Table.Cell>
        <Table.Cell>{teacherName}</Table.Cell>
        <Table.Cell>{speckod}</Table.Cell>
        <Table.Cell>{subj}</Table.Cell>
        <Table.Cell>{groupname}</Table.Cell>
        <Table.Cell>{pg_created}</Table.Cell>
        <Table.Cell>{testdate}</Table.Cell>
        <Table.Cell style={{ width: '112px' }}>
          {pgmode === 'a'
            ? <Span color='orange'>Ожидание</Span>
            : pgmode === 'b'
              ? <Span color='red'>Отклонено</Span>
              : <Span color='green'>Утверждено</Span>
          }
        </Table.Cell>
        <Table.Cell>
          <Flex wrap={0}>
            <Transition show={editable} customAnimation={iconSlide}>
              <Icon
                name='list'
                color='grey'
                title='Дополнительная информация'
                onClick={e => onInfoClick(e, open, 'pim')}
                size='large'
                link
              />
            </Transition>
            <Transition show={editable} animation='fade' timeout={150} delay={{ onEnter: 150 }}>
              <Icon 
                name={pgmode !== 'r' ? 'check' : 'x'} 
                color={pgmode !== 'r' ? 'olive' : 'red'} 
                onClick={pgmode !== 'r' ? onAgreeClick : onDisableClick} 
                title={pgmode !== 'r' ? 'Утвердить' : 'Отклонить'} 
                size='large' 
                link 
              />
            </Transition>
          </Flex>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <TableCell colSpan='11'>
          <Accordeon open={open} timeout={500} mountOnEnter>
            <Info groupid={groupid} />
          </Accordeon>
        </TableCell>
      </Table.Row>
    </>
  )
}