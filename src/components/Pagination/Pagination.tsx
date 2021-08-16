import React, { FC, useState, useEffect } from 'react'
import { Button, Input, Dropdown } from 'semantic-ui-react'

import { Wrapper } from './style'

interface IProps {
  activePage: number
  totalPages: number
  setActivePage
  showPageSizeOptions?: boolean
  pageSizeOptions?: number[]
  pageSize?: number
  setPageSize?: (size: number) => void
}
export const Pagination: FC<IProps> = ({
  activePage,
  totalPages,
  showPageSizeOptions = true,
  pageSizeOptions = [5, 10, 20, 25, 50, 100],
  pageSize,
  setActivePage,
  setPageSize,
}) => {
  const [inputPageNumber, setInputPageNumber] = useState(activePage)

  useEffect(() => {
    inputPageNumber !== activePage && setInputPageNumber(activePage)
  }, [activePage])

  const onInputChange = ({ target: value }) => {
    if (isNaN(+value)) return
    setInputPageNumber(+value)
  }

  const onInputBlur = () => {
    inputPageNumber >= 1 && inputPageNumber <= totalPages
      ? setActivePage(inputPageNumber)
      : setInputPageNumber(activePage)
  }

  const onEnter = (e) => {
    if (e.which === 13 || e.keyCode === 13) {
      inputPageNumber >= 1 && inputPageNumber <= totalPages
        ? setActivePage(inputPageNumber)
        : setInputPageNumber(activePage)
    }
  }

  return (
    <Wrapper> 
      <Button.Group basic size='small' style={{ backgroundColor: '#fff' }}>
        <Button
          icon='angle double left'
          disabled={activePage === 1}
          onClick={() => setActivePage(1)}
        />
        <Button
          icon='angle left'
          disabled={activePage === 1}
          onClick={() => setActivePage(prev => prev - 1)}
        />
        <Button compact>
          Стр.
          <Input
            transparent
            value={inputPageNumber}
            onChange={onInputChange}
            onBlur={onInputBlur}
            onKeyPress={onEnter}
            style={{ width: 11 * `${inputPageNumber}`.length }}
          />
          из {totalPages}
        </Button>
        <Button
          icon='angle right'
          disabled={activePage === totalPages}
          onClick={() => setActivePage(prev => prev + 1)}
        />
        <Button
          icon='angle double right'
          disabled={activePage === totalPages}
          onClick={() => setActivePage(totalPages)}
        />
      </Button.Group>
      {showPageSizeOptions && (
        <Dropdown
          selection
          size='tiny'
          onChange={(e, { value }) => setPageSize && setPageSize(+value!)}
          value={pageSize}
          style={{
            minWidth: 65,
            minHeight: '2.52900em',
            padding: '.642857143em 2.1em .642857143em 1em',
          }}
          options={pageSizeOptions.map((option) => ({
            value: option,
            text: option,
          }))}
        />
      )}
    </Wrapper>
  )
}
