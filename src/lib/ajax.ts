import axios from 'axios';
export default function(baseConfig) {
    const defaultConfig = {
        baseURL: '/',
        transformRequest: [(data) => {
            return data;
        }],
        transformResponse: [(data) => {
            return data;
        }],
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
        timeout: 300000,
        withCredentials: false, // default
        responseType: 'json', // default
        responseEncoding: 'utf8', // default
        maxContentLength: 2000,
        validateStatus: (status) => {
            return status >= 200 && status < 300; // default
        },
        maxRedirects: 15,
        ...baseConfig,
    };
    return function ajax(config) {
        return new Promise((resolve, reject) => {
            axios({
                ...defaultConfig,
                ...config,
            }).then((data) => {
                resolve(data);
            }, (d) => {
                reject(d);
            });
        });
    };
}