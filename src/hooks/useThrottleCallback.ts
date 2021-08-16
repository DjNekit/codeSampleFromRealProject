import { useMemo } from 'react'
import throttle from 'lodash-es/throttle'

type Props = (callback, delay?: number, deps?: any[]) => any

export const useThrottleCallback: Props = (callback, delay=300, deps=[]) => {
  return useMemo(() => throttle(callback, delay), deps)
}
