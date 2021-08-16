import React, { FC } from 'react'
import { PimContent } from './style'
import { Grid } from '@/helpers/style'

interface IProps {
  data
  error
}

export const Pim: FC<IProps> = ({ data, error }) => {

  if (!data) {
    return (
      <div>
        {error}
      </div>
    )
  }

  const { labelforselectively, label } = data
  const topicsBlock = data[1]
  const modulesBlock = data[2]
  const casesBlock = data[3]

  const casesItems = casesBlock.items.reduce((memo, c) => {
    memo[c.dename]
      ? memo[c.dename].push(c)
      : memo[c.dename] = [c]
    return memo
  }, {})

  return (
    <div>
      <p>Трудоемкость: {labelforselectively
        ? labelforselectively + ' (с конструированием)'
        : label + ' (без конструирования)'
      }
      </p>
      <b>{topicsBlock.header}</b>
      <PimContent>
        {topicsBlock.items.map(i => (
          <Grid key={i.setid} columns='auto 1fr' gap='.5rem'>
            <div>{i.label}.</div>
            <div>{i.title}</div>
          </Grid>
        ))}
      </PimContent>
      <b>{modulesBlock.header}</b>
      <PimContent>
        {Object.values(modulesBlock.modules).map((i: any, idx) => (
          <Grid key={idx} columns='auto 1fr' gap='.5rem'>
            <div>{i.label}.</div>
            <div>{i.title}</div>
          </Grid>
        ))}
      </PimContent>
      <b>{casesBlock.header}</b>
      <PimContent>
        {Object.keys(casesItems).map((i, idx) => (
          <div key={i}>
            {i}
            <PimContent>
              {casesItems[i].map(c => (
                <Grid key={c.setid} columns='auto 1fr' gap='.5rem'>
                  <div>{c.label}.</div>
                  <div>{c.title}</div>
                </Grid>
              ))}
            </PimContent>
          </div>
        ))}
      </PimContent>
    </div>
  )
}