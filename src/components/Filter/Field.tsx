import React, { FC, useState, useEffect } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { H2 } from '@/components/defaultTags'
import { FieldWrapper } from './style'

interface IOption {
  key: string | number
  value: string | number
  text: string | number
}

interface IProps {
  name: string
  value: string
  onChange
  isFiltered: boolean
  options: Array<IOption>
}

export const Field: FC<IProps> = ({ value, name, options, isFiltered, onChange }) => {
  const dropdownOptions = [
    { key: 'Все', value: 'Все', text: 'Все' },
    ...options.reduce((memo: Array<IOption>, o: IOption) => {
      if (!o.text || !o.value) return memo
      return [...memo, o]
    }, [])
  ]

  const firstElementValue = dropdownOptions[0]!.value
  const [defaultValue, setDefaultValue] = useState(firstElementValue)

  useEffect(() => {
    !isFiltered
      && firstElementValue !== defaultValue
      && setDefaultValue(dropdownOptions[0]!.value)

  }, [isFiltered])

  const onChangeHandle = (e, data) => {
    if (defaultValue !== data.value) {
      setDefaultValue(data.value)
      onChange(value, data.value)
    }
  }

  return (
    <FieldWrapper>
      <H2 noMargin>{name}</H2>
      <Dropdown selection value={defaultValue} options={dropdownOptions} onChange={onChangeHandle} />
    </FieldWrapper>
  )
}