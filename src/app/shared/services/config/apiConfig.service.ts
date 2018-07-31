import { Injectable } from '@angular/core';

import { URL_API } from './../../../app.config';
import { ConstantsService } from './constants.service';

@Injectable()
export class APIConfigService {
    private _apiUrl: any;

    constructor(private _constants: ConstantsService) {
        this._apiUrl = URL_API;
    }

    public getUrl(urlName: string): string {
        return this._constants.environment.domain + this._apiUrl[urlName].url;
    }

    public getSpinner(urlKey: string): any {
        return this._apiUrl[urlKey].spinner;
    }

    public get(urlKey: string): string {
        return this._apiUrl[urlKey].spinner;
    }

    public getParams(urlKey: string, params: any): { CodigoOrigem: string } {
        if (this._apiUrl[urlKey].hasOrigin) {
            params = Object.assign(params, { CodigoOrigem: this._constants.environment.origin });
        }

        return params;
    }

    public getHeaders(): any {
        return {
            'Authorization': this._constants.environment.auth,
            'CodigoOperadora': this._constants.client.code,
            'Content-Type': 'application/json'
        };
    }
}
