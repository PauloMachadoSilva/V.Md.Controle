import { Injectable } from '@angular/core';

import {
    CLIENT,
    DEBUG,
    ENVIRONMENT
} from '../../../app.config';

/**
 * ConstantsService, configurations and debug definitions
 */
@Injectable()
export class ConstantsService {
    private _env: string;
    private _client: any;
    private _debug: any;
    private _environment: any;
    private _api: any;

    constructor() {
        this._env = this.getEnv();
        this._client = CLIENT;
        this._debug = DEBUG;
        this._environment = ENVIRONMENT;
    }

    public get client(): {
        name: string,
        title: string,
        seller: string,
        code: string,
        defaultState: string,
        plans: {
            productId: number,
            modality: number
        },
        google: {
            gtm: string
        }
    } {
        return this._client;
    }

    public get debug(): {
        log: Array<{ key: boolean }>;
        apiMockMode: boolean,
        apiTimeoutSimulation: number
    } {
        return this._debug;
    }

    public get environment(): {
        domain: string,
        origin: string,
        auth: string,
        temporarily_replace: any
    } {
        return this._environment.temporarily_replace[this._env] || this._environment[this._env];
    }

    /**
     * Detect host origin and define ENV configuration
     * @returns The host env configuration
     */
    private getEnv(): string {
        const host: string = location.host;

        return ((host.match('dev') || host.match('localhost')))
            ? 'dev'
            : (host.match('hmg'))
                ? 'hmg'
                : 'prd';
    }
}
