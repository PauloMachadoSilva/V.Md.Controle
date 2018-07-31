import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { HttpService } from './http.service';
import { APIConfigService } from '../config/apiConfig.service';
import { ConstantsService } from './../config/constants.service';


@Injectable()
export class HttpAPIService {
    private _headers: HttpHeaders;

    public start = new EventEmitter<string>();
    public finish = new EventEmitter<string>();

    constructor(
        private _constants: ConstantsService,
        private _apiConfig: APIConfigService,
        private _http: HttpService
    ) {
        this._headers = new HttpHeaders(this._apiConfig.getHeaders());
    }

    public async get<TResponse>(key: string, params = {}): Promise<TResponse> {
        return <Promise<TResponse>>this.request(
            key,
            this._http.get(this.url(key), this.params(key, params), this._headers)
        );
    }

    public async post<TResponse>(key: string, params = {}): Promise<TResponse> {
        return <Promise<TResponse>>this.request(
            key,
            this._http.post(this.url(key), this.params(key, params), this._headers)
        );
    }

    public async put<TResponse>(key: string, params = {}): Promise<TResponse> {
        return <Promise<TResponse>>this.request(
            key,
            this._http.put(this.url(key), this.params(key, params), this._headers)
        );
    }

    private request<TResponse>(key: string, request: Observable<Object>): Promise<TResponse> {
        this.start.emit(key);

        const promise: Promise<TResponse> = new Promise<TResponse>((resolve, reject) => {
            const fn = () => {
                request.subscribe((response: TResponse) => {
                    this.finish.emit(key);
                    resolve(response);
                }, (error: any) => {
                    this.finish.emit(key);
                    reject(error);
                });
            };

            if (this._constants.debug.apiTimeoutSimulation) {
                console.warn('USES IT ONLY IN DEV MODE');
                console.warn('debug.json > apiTimeoutSimulation: ', this._constants.debug.apiTimeoutSimulation);
                setTimeout(fn, this._constants.debug.apiTimeoutSimulation);
            } else {
                fn();
            }

        });

        return promise;
    }

    private url(key): string {
        return this._apiConfig.getUrl(key);
    }

    private params(key, params): any {
        return this._apiConfig.getParams(key, params);
    }
}
