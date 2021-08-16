import React, { FC, useState, useEffect } from 'react'
import { Button, Card, Icon } from 'semantic-ui-react'
import { useMediaQuery } from 'react-responsive'
import { useModal } from '@/hooks/useModal'
import { Transition } from '@/components/Transition'
import { Flex, Grid } from '@/helpers/style'
import { Info } from './Info'
import { Span } from './style'
import { ITestPlan } from '../../types'

interface IProps {
  data
  controlMode,
  headerCells
  customFooter
  actions
}

export const TableMobile: FC<IProps> = ({ data, controlMode, headerCells, customFooter, actions }) => {
  const { showModal } = useModal()
  const [showControl, setShowControl] = useState(controlMode)

  const isMobile = useMediaQuery({ query: '(max-width: 619px)' })

  useEffect(() => {
    controlMode && !showControl && setShowControl(true)
  }, [controlMode])

  const showInfo = (groupid) => {
    showModal({
      header: 'Дополнительно',
      message: <Info groupid={groupid} />
    })
  }

  const onDisableClick = (e, data) => {
    e.stopPropagation()

    data.pgmode !== 'b' && actions.toggleGroupsMode([data], 'rejectGroups')
  }

  const onAgreeClick = (e, data) => {
    e.stopPropagation()
    data.pgmode !== 'r' && actions.toggleGroupsMode([data], 'approveGroups')
  }

  return (
    <Grid gap='1rem'>
      <Card.Group>
        {data.map((i: ITestPlan) => (

          <Card fluid={isMobile} key={i.groupid}>
            <Card.Content>
              <Card.Description>
                <Grid gap='.5rem'>
                  {headerCells.map(c => (
                    <div key={c.columnName}>
                      <Grid key={c.columnName} gap='1rem' columns={`${isMobile ? '150px' : '1fr'} 1fr`} alignItems='center'>
                        <div style={{ fontWeight: 'bold' }}>{c.name}:</div>
                        <div>
                          {c.columnName !== 'pgmode'
                            ? i[c.columnName] || '-'
                            : i[c.columnName] === 'a'
                              ? <Span color='orange'>Ожидание</Span>
                              : i[c.columnName] === 'b'
                                ? <Span color='red'>Отклонено</Span>
                                : <Span color='green'>Утверждено</Span>
                          }
                        </div>
                      </Grid>
                    </div>
                  ))}
                </Grid>
              </Card.Description>
            </Card.Content>
            <Card.Content extra >
              <hr />
              <Flex alignItems='center' justifyContent='space-evenly'>
                <Button icon inverted>
                  <Icon
                    name='list'
                    color='grey'
                    title='Дополнительная информация'
                    size='big'
                    onClick={() => showInfo(i.groupid)}
                    link
                  />
                </Button>
                {showControl &&
                  <Transition show={controlMode} animation='fade' unmountOnExit>
                    <Icon
                      name={i.pgmode !== 'r' ? 'check' : 'x'}
                      color={i.pgmode !== 'r' ? 'olive' : 'red'}
                      title={i.pgmode !== 'r' ? 'Утвердить' : 'Отклонить'}
                      size='big'
                      onClick={(e) => i.pgmode !== 'r' ? onAgreeClick(e, i) : onDisableClick(e, i)}
                      link
                    />
                  </Transition>
                }
              </Flex>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
      <Grid gap='1rem' justifyContent='center' justifyItems='center'>
        {customFooter}
      </Grid>
    </Grid>
  )
}