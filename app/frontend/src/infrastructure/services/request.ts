import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'

declare type Method = AxiosRequestConfig['method']
export const ERROR_CONN = 500
export const UNAUTH_CODE = 400

export class RequestError extends Error {
  code: number
  data?: any
  constructor(code: number, message: string, data?: any) {
    super(message)
    this.code = code
    this.data = data
  }
}
export type RequestConfig = AxiosRequestConfig

export default class Request {
  client: AxiosInstance
  constructor(cfg?: RequestConfig) {
    this.client = axios.create(cfg)
  }
  private async call(method: Method, path: string, body: any, cfg?: RequestConfig) {
    cfg = cfg ?? {}
    try {
      const { data } = await this.client.request({
        ...cfg,
        method,
        url: path,
        data: body
      })

      return data
    } catch (e: any) {
      throw e.response
        ? new RequestError(e.response.status, e.message, e.response.data)
        : new RequestError(ERROR_CONN, 'Connection Error', e)
    }
  }
  get<T = any>(path: string, cfg?: RequestConfig): Promise<T> {
    return this.call('GET', path, null, cfg)
  }
  post<T = any>(path: string, data?: any, cfg?: RequestConfig): Promise<T> {
    return this.call('POST', path, data, cfg)
  }
  put<T = any>(path: string, data?: any, cfg?: RequestConfig): Promise<T> {
    return this.call('PUT', path, data, cfg)
  }
  patch<T = any>(path: string, data?: any, cfg?: RequestConfig): Promise<T> {
    return this.call('PATCH', path, data, cfg)
  }
  delete<T = any>(path: string, cfg?: RequestConfig): Promise<T> {
    return this.call('DELETE', path, null, cfg)
  }
}
