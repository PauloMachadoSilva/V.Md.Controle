import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { PersonalDataGuard } from './../personal-data/personal-data.guard';
import { DTOStorageService } from '../../shared/services';
import { DTO } from '../../shared/models';
import { StorageAccessor } from '../../shared/utils';

@Injectable()
export class AddressGuard implements CanActivate {

    constructor(
        private _personalDataGuard: PersonalDataGuard,
        private _router: Router,
        private _dtoStorage: DTOStorageService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.redirect(this._dtoStorage.getDTO());
    }

    redirect(dto: DTO): boolean {
        if (!this._personalDataGuard.redirect(dto)) {
            console.log('[ADDRESS-GUARD] dto incompleted');
            return false;
        }

        const isValid = this.isValid(this._dtoStorage.getDTO());

        if (!isValid) {
            console.log('[ADDRESS-GUARD] maturityList is not defined... Redirecting to /dados-pessoais');
            this._router.navigate([ '/dados-pessoais' ]);
        }

        return isValid;
    }

    private isValid(dto: DTO): boolean {
        return StorageAccessor.get('maturityList') != null && dto.cart.personalData.cpf != null;
    }
}
