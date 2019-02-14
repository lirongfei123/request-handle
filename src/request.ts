import qs from 'qs';
import getAjax from './lib/ajax';
import getResponseHelper from './response-helper';
import { AxiosRequestConfig } from 'axios';
import { HandleConfig, ResponseResult } from '../main';
import Result from './result';

export default class InitRequest {
    config: HandleConfig;
    requestConfig: AxiosRequestConfig;
    ajax: (config: any) => Promise<any>;
    constructor(config: HandleConfig, requestConfig) {
        this.config = config;
        this.requestConfig = requestConfig;
        this.ajax = getAjax(requestConfig);
    }
    get(url: string, params: object, config: AxiosRequestConfig) {
        return this.http({
            url,
            method: 'get',
            params,
            ...config,
        });
    }
    post(url: string, data: object, config: AxiosRequestConfig) {
        return this.http({
            url,
            method: 'post',
            data: qs.stringify(data),
            ...config,
        });
    }
    http(config: AxiosRequestConfig) {
        const requestPromise = new Promise((resolve) => {
            const result = new Result();
            const responseHelper = getResponseHelper(requestPromise, result);
            this.ajax(config).then((data) => {
                this.config.common.transformResponse(data, responseHelper);
                if (result.success && this.config.childrens && this.config.childrens.length > 0) {
                    // 如果成功, 再经过子过滤器过滤一遍
                    for (let i = 0, len = this.config.childrens.length; i < len; i++) {
                        const filter = this.config.childrens[i];
                        if (Object.prototype.toString.call(filter.url) === '[object RegExp]') {
                            if ((filter.url as RegExp).test(config.url)) {
                                filter.transformResponse(result.data, responseHelper);
                                resolve(result);
                                return;
                            } else {
                                // 不作处理
                            }
                        } else if (filter.url === config.url) {
                            filter.transformResponse.call(result.data, responseHelper);
                            resolve(result);
                            return;
                        } else {
                            // 不作处理
                        }
                    }
                    resolve(result);
                } else {
                    // 如果出错, 就直接跳转到处理程序
                    resolve(result);
                }
            }).catch((e) => {
                responseHelper.error(e);
                resolve(result);
            });
        });
        return requestPromise;
    }
}