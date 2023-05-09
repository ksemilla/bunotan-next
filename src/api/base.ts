import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import Cookies from "js-cookie"

const baseApiRoot: string = process.env.NEXT_PUBLIC_API_ROOT ?? ""
const _buildPath = (path: string): string => `${baseApiRoot}/${path}`
const _getAccessToken = Cookies.get("accessToken")

type Request = {
  path: string
  query?: Record<string, any>
}

interface PostRequest<T> extends Request {
  data: T
}

interface PutRequest<T> extends Request {
  data: Partial<T>
}

export class PublicApi {
  static get<T>(data: Request) {
    return axios.get<T>(_buildPath(data.path))
  }
  static post<DT, RT>(data: PostRequest<DT>) {
    return axios.post<DT, AxiosResponse<RT>>(_buildPath(data.path), data.data)
  }
}

const baseConfig: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${_getAccessToken}`,
  },
}

export class PrivateAPI {
  static get<T>(data: Request) {
    return axios.get<T>(_buildPath(data.path), {
      params: data.query,
      ...baseConfig,
    })
  }

  static post<DT, RT>(data: PostRequest<DT>) {
    return axios.post<DT, AxiosResponse<RT>>(
      _buildPath(data.path),
      data.data,
      baseConfig
    )
  }

  static put<DT, RT>(data: PutRequest<DT>) {
    return axios.put<DT, AxiosResponse<RT>>(
      _buildPath(data.path),
      data.data,
      baseConfig
    )
  }

  static delete(data: Request) {
    return axios.delete(_buildPath(data.path), baseConfig)
  }
}
