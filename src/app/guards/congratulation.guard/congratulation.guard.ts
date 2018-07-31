import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DTOStorageService } from '../../shared/services';
import { DTO } from '../../shared/models';

@Injectable()
export class CongratulationGuard implements CanActivate {

    constructor(
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
        const isValid = this.isValid(dto);

        if (!isValid) {
            console.log('[CONGRATULATION-GUARD] ... Redirecting to /');
            this._router.navigate([ '/' ]);
        }

        return true || isValid;
    }

    private isValid(dto: DTO): boolean {
        return dto
            && dto.cart
            && dto.cart.orderCode !== undefined
            && dto.cart.orderCode !== null;
    }
}
