import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'

const mock: AxiosInstance = axios.create({
  timeout: 200_000
})

mock.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.status === 200) {
      return res.data
    } else {
      return Promise.reject(res)
    }
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  }
)

export default mock
