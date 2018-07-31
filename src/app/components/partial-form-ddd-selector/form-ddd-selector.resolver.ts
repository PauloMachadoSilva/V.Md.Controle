import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { State } from '../../shared/models';
import { APIAddressService } from '../../shared/services';

@Injectable()
export class FormDDDResolve implements Resolve<Array<State>> {
    constructor(
        private _addressAPI: APIAddressService
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<Array<State>> {
        return this._addressAPI.getStateDDDList();
    }
}
