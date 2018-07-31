import { Injectable } from '@angular/core';

import { ConstantsService } from '../config/constants.service';
import { HttpAPIService } from './../http/http.api.service';

@Injectable()
export class DebuggerService {
    private debug: any;

    constructor(private _constants: ConstantsService) {
        this.debug = this._constants.debug.log;
    }

    /**
     * @whatItDoes
     * Output a log in console
     *
     * @HowToUse
     * Accept many parameters
     *
     * @example
     * ```
     * this._debugger.log(123, 'string', function () { }, new Object());
     * ```
     *
     * @param vars
     */
    public log(...vars) {
        // Filter log by first param
        if (!this.enabled(vars[0])) {
            return;
        }

        if (this.debug) {
            console.log.apply(console.log, vars);
        }
    }

    /**
     * Return if a specific debugger is enabled into ConstantsService
     * @param key
     */
    public enabled(key: string): boolean {
        const k = (this.debug[key] !== undefined) ? key : 'global';
        return this.debug[k];
    }
}
