import InitRequest from './request';
export default function initRequest(responseConfig, requestConfig)  {
    const request = new InitRequest(responseConfig, requestConfig);
    return {
        get: request.get.bind(request),
        post: request.post.bind(request),
        http: request.http.bind(request),
    };
}