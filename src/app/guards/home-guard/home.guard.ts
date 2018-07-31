import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DTO } from '../../shared/models/index';
import { DTOStorageService, APIPlanService } from '../../shared/services';

@Injectable()
export class HomeGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _apiPlan: APIPlanService,
        private _dtoStorage: DTOStorageService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        const dto: DTO = this._dtoStorage.initDTO(route);

        if (this._redirectSKU(route, dto)) {
            return false;
        }

        if (this._redirectResumeFlow(route, dto)) {
            return false;
        }

        return true;
    }

    private _redirectSKU(route: ActivatedRouteSnapshot, dto: DTO): boolean {
        if (dto && dto.projectConfig && dto.projectConfig.uf && dto.projectConfig.ddd && dto.projectConfig.sku) {
            this._setPlan(dto);
            return true;
        }

        return false;
    }

    private _redirectResumeFlow(route: ActivatedRouteSnapshot, dto: DTO): boolean {
        // @todo Implementar o redirecionamento de fluxo...

        // const dto: DTO = this._dtoStorage.initDTO(route);
        // if (dto && dto.projectConfig && dto.projectConfig.uf && dto.projectConfig.ddd && dto.projectConfig.plan) {
        //     this._setPlan(dto);
        //     return true;
        // }

        return false;
    }

    private async _setPlan(dto: DTO) {
        const plan = (dto.projectConfig.sku.length > 7)
                        ? await this._apiPlan.getPlanBySku(dto.projectConfig.sku)
                        : await this._apiPlan.getPlanBySkuUfDdd(
                                dto.projectConfig.sku,
                                dto.projectConfig.uf,
                                String(dto.projectConfig.ddd),
                                '/',
                                dto.sessionUid,
                            );

        if (plan === null) {
            this._router.navigateByUrl('/');
        } else {
            dto.cart.plan = plan;
            this._dtoStorage.setDTO(dto);
            this._router.navigateByUrl('dados-pessoais');
        }
    }
}
