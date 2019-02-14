import { AxiosRequestConfig } from "axios";
export type ResponseStatus = 'error' | 'success' | 'empty'

export interface HandleConfig {
    common: Handle
    childrens: Array<HandleItem>
}
export interface ResponseResult {
    success: Boolean
    error: Boolean
    empty: Boolean
    data: any
    originData: any
    ifSuccess(data: any): void
    ifError(data: any): void
    ifEmpty(data: any): void
}
export interface HandleItem extends Handle{
    url: RegExp | String
}
export interface Handle {
    transformRequest?(requestConfig: AxiosRequestConfig): AxiosRequestConfig
    transformResponse?(data: any, responseHelper: any): ResponseResult
}


export function initResuest(config: AxiosRequestConfig): Request

export interface RequestConstructor {
    new (config: HandleConfig): Request
}
export interface Request {
    config: HandleConfig
    get(url: string, params: Object, config: AxiosRequestConfig): Promise<ResponseResult>
    post(url: string, data: Object, config: AxiosRequestConfig): Promise<ResponseResult>
    http(config: AxiosRequestConfig): Promise<ResponseResult>
}