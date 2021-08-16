import { useState, useEffect, useMemo, useCallback } from 'react'

type UsePagination = <T>(arr: Array<T>, countOfElements: number) => [Array<T>, number, number, (numberOfPage: number) => void, number, (countElems: number) => void]

export const usePagination: UsePagination = (arr, countOfElementsInPagination) => {
  const [activePage, setActivePage] = useState(1)
  const [pageSize, setCountOfElements] = useState(countOfElementsInPagination)

  const countPaginationPages = Math.ceil(arr.length / pageSize)

  const separateData = () => {
    const paginatedData = {}

    for (let i = 0; i < countPaginationPages; i++) {
      const start = i * pageSize
      const end = i * pageSize + pageSize
      paginatedData[i+1] = arr.slice(start, end)
    }

    return paginatedData
  }

  const paginatedData = useMemo(() => separateData(), [arr, pageSize])
  const totalPages = Object.keys(paginatedData).length

  useEffect(() => {
    if (activePage > totalPages) setActivePage(1)
  }, [totalPages])

  const changePageHandler = useCallback(num => setActivePage(num), [])
  const setPageSize = useCallback(num => setCountOfElements(num), [])


  return [paginatedData[activePage] || [], totalPages, totalPages === 0 ? 0 : activePage, changePageHandler, pageSize, setPageSize]
}