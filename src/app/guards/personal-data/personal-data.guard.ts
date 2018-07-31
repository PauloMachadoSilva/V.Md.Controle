import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { PlansGuard } from './../plans-guard/plans.guard';
import { DTOStorageService } from '../../shared/services';
import { DTO } from '../../shared/models';

@Injectable()
export class PersonalDataGuard implements CanActivate {

    constructor(
        private _plansGuard: PlansGuard,
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
        if (!this._plansGuard.redirect(dto)) {
            console.log('[PERSONAL-GUARD] dto incompleted');
            return false;
        }

        const isValid = this.isValid(this._dtoStorage.getDTO());

        if (!isValid) {
            console.log('[PERSONAL-GUARD] dto.cart.plan is not defined... Redirecting to /planos');
            this._router.navigate([ '/planos' ]);
        }

        return isValid;
    }

    private isValid(dto: DTO): boolean {
        return dto
            && dto.cart
            && dto.cart.plan
            && dto.cart.plan.skuCode != null;
    }
}
