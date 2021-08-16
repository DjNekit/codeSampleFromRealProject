import React, { FC, useState } from 'react'
import { Segment, Label, Icon } from 'semantic-ui-react'
import { useThrottleCallback } from '@/hooks/useThrottleCallback'

import { H2 } from '@/components/defaultTags'
import { Accordeon } from '@/components/Accordeon'
import { Field } from './Field'
import { FilterWrapper, A } from './style'
import { Flex } from '@/helpers/style'

interface IField {
  name: string
  value: string
  options: Array<{
    key: string | number
    value: string | number
    text: string | number
  }>
}

interface IProps {
  fields: Array<IField>
  activeFilters: {
    [filter: string]: string
  }
  onFieldChange
}

export const Filter: FC<IProps> = ({ fields = [], activeFilters={}, onFieldChange }) => {
  const [openFilter, setOpenFilter] = useState(false)
  const [filteredFields, setFilteredFields] = useState<string[]>([])

  const sortedFilters = Object.entries(activeFilters).reduce((memo: Array<{ filter, value }>, [filter, value]) => {
    if (value !== 'Все') {
      return [...memo, {filter, value}]
    }
    return memo
  }, [])

  const onChange = (fieldName, value) => {
    setFilteredFields([...filteredFields, fieldName])
    onFieldChange(fieldName, value)
  }

  const onReset = (filter) => {
    setFilteredFields(prev => [...prev].filter(i => i !== filter))
    onFieldChange(filter, 'Все')
  }

  const changeIsFilterHandle = useThrottleCallback(() => setOpenFilter(prev => !prev), 500)

  return (
    <div>
      <H2 noMargin>
        <Flex gap='1rem'>
          <A onClick={changeIsFilterHandle} style={{height: 26}}>Фильтр</A>
          <Flex wrap={1} gap='1rem 0'>
            {sortedFilters.map(({ filter, value }) => 
              <Label 
                key={filter} 
                color='blue' 
                circular 
                basic 
                onClick={() => onReset(filter)}
                style={{ cursor: 'pointer' }}
                size='large'
              >
                {value}
                <Icon name='close'/>
              </Label>
            )}
          </Flex>
        </Flex>
      </H2>
      <Accordeon open={openFilter}>
          <Segment style={{ marginTop: '1rem' }}>
            <FilterWrapper>
              {fields.map(({name, value, options}, idx) => 
                <Field 
                  key={idx} 
                  name={name}
                  isFiltered={filteredFields.includes(value)} 
                  value={value} 
                  options={options} 
                  onChange={onChange}
                />
              )}
            </FilterWrapper>
          </Segment>
      </Accordeon>
    </div>
  )
}