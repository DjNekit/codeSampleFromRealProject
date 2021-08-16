import axios from 'axios'
import { useState , useEffect} from "react"

interface IProps<REQ, RES> {
  url: string,
  body?: REQ,
  method?: 'get' | 'post' | 'put' | 'delete' | 'update'
  errMsg?: string // ? кастомное сообщение об ошибке, если ответ с сервера некорректен
  then?: boolean // ? сюда кладется условие, при котором будет выполняться запрос, по дефолту запрос выполняется всегда
  onSuccess?: (data: RES) => void
}

type UseRequest = <REQ, RES>(props: IProps<REQ, RES>, deps?: any[]) => [RES | null, boolean, string]

const defaultErrMsg = 'Во время запроса произошла ошибка'

export const useRequest: UseRequest = <REQ, RES>(
  // ? Параметры запроса
  {
    url,
    body,
    method,
    onSuccess,
    errMsg = defaultErrMsg,
    then = true
  }: IProps<REQ, RES>,

  deps: any[] = [], // ? зависимости, при которых useEffect с запросом будет будет перезапускаться  
) => {
  const [data, setData] = useState<RES | null>(null)
  const [isLoading, setIsLoading] = useState(then)
  const [error, setError] = useState('')

  const chooseMethod = method || (body ? 'post' : 'get') // ? если параметр method явно не задан, то в зависимости от наличия body будет выбран post или get по дефолту

  useEffect(() => {
    let isMounted = true;
    if (then) {
        void async function() {
          try {
            const { data } = await axios[chooseMethod]<REQ, RES>(url, body)

            if (typeof data === 'string' && isMounted) return setError(errMsg) // ? Если ответ с сервера некорректен, но запрос имеет статус 200, указываю свое сообщение об ошибке

            if (data.result && isMounted) return setError(data.message) // ? Если ответ с сервера корректен, но result !== 0, то вывожу серверное сообщение об ошибке 

            isMounted && setData(data.message)
            isMounted && error && setError('')
            onSuccess && onSuccess(data)

          } catch (e) {
            isMounted && setError(errMsg)
            console.log(e)
          } finally {
            isMounted && setIsLoading(false)
          }
        }()

      return () => {
        isMounted = false
      }
    }
  }, deps)

  return [data, isLoading, error]
}