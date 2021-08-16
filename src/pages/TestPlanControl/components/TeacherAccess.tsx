import React, { FC, useEffect, useMemo, useState } from 'react'
import { Checkbox, Dropdown } from 'semantic-ui-react'
import { useRequest } from '@/hooks/useRequest'
import { Accordeon } from '@/components/Accordeon'
import { Flex } from '@/helpers/style'
import { setTeacher, resetTeacherAccess } from '../actions'

interface Teacher {
  id: number
  name: string
}

interface IReq {
  action: 'getTeacherAccessData'
}

interface IRes {
  active: boolean
  chosenTeacherId: string
  teachers: Teacher[]
}

export const TeacherAccess: FC = () => {
  const [data, isLoading] = useRequest<IReq, IRes>({
    url: 'example',
    body: {
      action: 'getTeacherAccessData'
    }
  })

  const teachers = useMemo(() => data?.teachers.map((t: Teacher) => ({
    key: t.id,
    value: t.id,
    text: t.name
  })), [data]) || []

  const [value, setValue] = useState<number | undefined>()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setValue(teachers.find(t => t.value.toString() === data?.chosenTeacherId)?.value)
    setOpen(!!data?.active)
  }, [data])

  const changeHandle = (e, data) => {
    if (value !== data.value) {
      setValue(data.value)
      setTeacher(+data.value)
    }
  }
  const toggleHandle = () => {
    setOpen(prev => !prev)

    if (open) {
      setValue(undefined)
      resetTeacherAccess()
    }
  }

  return (
    <div>
      <Flex alignItems='center' gap='1rem'>
        <Checkbox checked={open} toggle onChange={toggleHandle} disabled={isLoading} />
        <h2>открыть доступ только одному переподавателю</h2>
      </Flex>
      <Accordeon open={open} unmountOnExit style={{ paddingTop: '1rem' }}>
        <Dropdown
          value={value}
          options={teachers}
          onChange={changeHandle}
          placeholder='Нет выбранного преподавателя'
          selection
          style={{ width: 255 }}
        />
      </Accordeon>
    </div>
  )
}