import {
    Injectable,
    Inject
} from '@angular/core';
import * as path from './http.url';

@Injectable()

// tslint:disable:variable-name
export class StateService {

    message = '';
    islogin: boolean = false;
    constructor() { }

    getData() {
        return this.message;
    }

    setData(data) {
        this.message = data;
    }

    setIsLogin(value) {
        this.islogin = value;
    }
    getIsLogin(): boolean {
        return this.islogin;
    }

}
