import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService {

    constructor(private _httpClient: HttpClient) { }

    public get<TResponse>(url: string, params = {}, headers = new HttpHeaders()): Observable<Object> {
            return this._httpClient.get(this.makeQueryString(url, params), { headers });
    }

    public post<TResponse>(url: string, params = {}, headers = new HttpHeaders()): Observable<Object> {
        return this._httpClient.post(url, params, { headers });
    }

    public put<TResponse>(url: string, params = {}, headers = new HttpHeaders()): Observable<Object> {
        return this._httpClient.put(url, params, { headers });
    }

    private makeQueryString(url: string, params: any): string {
        if (params) {
            const getParams = [];
            for (const key in params) {
                if (params.hasOwnProperty(key)) {
                    getParams.push(key + '=' + params[key]);
                }
            }

            return url.concat('?').concat(getParams.join('&'));
        }

        return url;
    }
}
