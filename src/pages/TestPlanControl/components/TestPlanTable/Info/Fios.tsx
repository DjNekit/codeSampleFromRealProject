import React, { FC } from 'react'

interface IProps {
  data
  error
}

export const Fios: FC<IProps> = ({ data, error }) => {
  if (!data) {
    return (
      <div>
        {error}
      </div>
    )
  }

  return (
    <div>
      <p>Список тестируемых:</p>
      <ol style={{ paddingLeft: '1.4rem' }}>
        {data.map((i, idx) => <li key={idx}>{i}</li>)}
      </ol>
    </div>
  )
}