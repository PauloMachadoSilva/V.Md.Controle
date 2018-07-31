import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DTO } from '../../shared/models/index';
import { DTOStorageService, APICartService } from '../../shared/services';

@Injectable()
export class ResumeGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _apiCart: APICartService,
        private _dtoStorage: DTOStorageService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        const dto: DTO = this._dtoStorage.initDTO(route);

        if (!dto.crm.uid && dto.crm.uid.length !== 32) {
            return true;
        }

        this._resumeFlux(dto);

        return false;
    }

    private async _resumeFlux(dto: DTO) {
        const newDto = await this._apiCart.resumeCart(dto.crm.uid);

        if (!newDto) {
            this._router.navigateByUrl('/');
        } else {
            this._dtoStorage.setDTO(newDto);
            if (newDto.cart.dueDate) {
                this._router.navigateByUrl('/sms');
            } else {
                // Case personal_data is incomplete, address page detect inconsistence and redirect flux back
                this._router.navigateByUrl('/endereco');
            }
        }
    }
}
