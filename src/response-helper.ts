import Result from './result';

const getResponseHelper = (promise: Promise<any>, result: Result) => {
    return {
        success(data): Result {
            result._setSuccess(data);
            return result;
        },
        empty(data): Result {
            result._setEmpty(data);
            return result;
        },
        error(data): Result {
            result._setError(data);
            return result;
        },
        reject(pmi) {
            Promise.reject(pmi);
        },
    };
};
export default getResponseHelper;