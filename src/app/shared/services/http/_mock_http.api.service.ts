import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import * as STATE_SERVICE_GET_STATES from './../../../../app-config/mock/STATE_SERVICE_GET_STATES.json';
import * as PLANS_SERVICE_PLAN_BY_SKU from './../../../../app-config/mock/PLANS_SERVICE_PLAN_BY_SKU.json';
import * as PLANS_SERVICE_PLAN_BY_DDD_LIST from './../../../../app-config/mock/PLANS_SERVICE_PLAN_BY_DDD_LIST.json';
import * as PLANS_SERVICE_PLAN_BY_SKU_UF_DDD from './../../../../app-config/mock/PLANS_SERVICE_PLAN_BY_SKU_UF_DDD.json';
import * as SMS_SERVICE_CONFIRMATION from './../../../../app-config/mock/SMS_SERVICE_CONFIRMATION.json';

import { HttpService } from './http.service';
import { APIConfigService } from './../config/apiConfig.service';

@Injectable()
export class HttpAPIService {
    private _headers: HttpHeaders;

    public _mockList: any;

    constructor(
        private _apiConfig: APIConfigService,
        private _http: HttpService
    ) {
        this._mockList = {
            STATE_SERVICE_GET_STATES,
            PLANS_SERVICE_PLAN_BY_SKU,
            PLANS_SERVICE_PLAN_BY_DDD_LIST,
            PLANS_SERVICE_PLAN_BY_SKU_UF_DDD,
            SMS_SERVICE_CONFIRMATION
        };
    }

    public async get<TResponse>(key: string, params = {}): Promise<TResponse> {
        return <Promise<TResponse>>this.request(key);
    }

    public async post<TResponse>(key: string, params = {}): Promise<TResponse> {
        return <Promise<TResponse>>this.request(key);
    }

    public async put<TResponse>(key: string, params = {}): Promise<TResponse> {
        return <Promise<TResponse>>this.request(key);
    }

    private async request<TResponse>(key: string): Promise<TResponse> {
        return new Promise<TResponse>((resolve, reject) => {
            console.log('......... DADOS MOCKADOS .........', key, this._mockList[key]);
            resolve(this._mockList[key]);
        });
    }
}
