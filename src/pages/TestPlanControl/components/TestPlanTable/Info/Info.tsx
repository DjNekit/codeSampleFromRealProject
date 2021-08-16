import React, { FC, useState } from 'react'
import { Loader, Segment } from 'semantic-ui-react'
import { useRequest } from '@/hooks/useRequest'
import ThemedButton from '@/components/Theme/Button'
import { Pim } from './Pim'
import { Fios } from './Fios'

import { InfoWrapper, LoaderWrapper } from './style'
import { Switch } from '@/components/Switch'
import { IFiosDataReq, IPimDataReq, IPimDataRes } from '@/pages/TestPlanControl/types'

interface IProps {
  groupid: string
}

enum InfoMenu {
  pim = 'Структура пимов',
  contingent = 'Список тестируемых'
}

export const Info: FC<IProps> = ({ groupid }) => {
  const [active, setActive] = useState(InfoMenu.pim)

  const [pimData, isPimLoading, pimError] = useRequest<IPimDataReq, IPimDataRes>({
    url: 'example.php',
    body: {
      action: 'getTestStructure',
      groupid
    },
    errMsg: 'Структура пимов не найдена'
  })
  const [contingentData, isContingentLoading, contingentError] = useRequest<IFiosDataReq, string[]>({
    url: 'example.php',
    body: {
      action: 'getFiosList',
      groupid
    },
    errMsg: 'Структура пимов не найдена'
  })

  const handleItemClick = (e, data) => {
    setActive(data.name)
  }

  return (
    <InfoWrapper>
      <ThemedButton basic={active !== InfoMenu.pim} name={InfoMenu.pim} onClick={handleItemClick}>
        {InfoMenu.pim}
      </ThemedButton>
      <ThemedButton basic={active !== InfoMenu.contingent} name={InfoMenu.contingent} onClick={handleItemClick}>
        {InfoMenu.contingent}
      </ThemedButton>

      <Segment basic>

        {isPimLoading || isContingentLoading
          ? <LoaderWrapper>
              <Loader active inline='centered' size='big' />
            </LoaderWrapper>

          : <Switch state={active}>
              {active === InfoMenu.pim
                ? <Pim data={pimData} error={pimError}/> 
                : <Fios data={contingentData} error={contingentError}/>
              }
            </Switch>
        }
      </Segment>
    </InfoWrapper>
  )
}