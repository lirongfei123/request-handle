import { ResponseStatus } from 'main';

export default class Result {
    private status: ResponseStatus;
    get success() {
        return this.status === 'success';
    }
    get error() {
        return this.status === 'error';
    }
    get empty() {
        return this.status === 'empty';
    }
    data: any;
    originData: any;
    _setSuccess(data) {
        this.status = 'success';
        this.data = data;
    }
    _setError(data) {
        this.status = 'error';
        this.data = data;
    }
    _setEmpty(data) {
        this.status = 'empty';
        this.data = data;
    }
    ifSuccess(callback: (data: any) => void) {
        if (this.success) {
            callback(this.data);
        }
    }
    ifError(callback: (data: any) => void) {
        if (this.error) {
            callback(this.data);
        }
    }
    ifEmpty(callback: (data: any) => void) {
        if (this.empty) {
            callback(this.data);
        }
    }
}