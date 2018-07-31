import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';

import { DTO } from '../../shared/models';
import { APIMetricsService, ConstantsService, DTOStorageService } from '../../shared/services';
import { ObjectBuilder } from '../../shared/utils';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit {
/**
 * TODO
 * - Revisar layout
 * - Desabilitar botão no casso de inatividade do serviço
 * - Implementar spinner
 */
    public defaultState: string;
    public defaultDdd: number;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _constants: ConstantsService,
        private _dtoStorage: DTOStorageService,
        private _APImetrics: APIMetricsService
    ) {
        // this._APImetrics.sendUid('analyticsEvent: string', 'requestEvent: string', 'view: string');

        const dto: DTO = this._dtoStorage.getDTO();

        if (dto && dto.projectConfig && dto.projectConfig.uf) {
            this.defaultState = dto.projectConfig.uf;
            if (dto.projectConfig.ddd) {
                this.defaultDdd = dto.projectConfig.ddd;
            }
        } else {
            this.defaultState = this._constants.client.defaultState;
        }
    }

    ngOnInit() {
    }

    public onSend(data: any) {
        const dto: DTO = this._dtoStorage.getDTO();

        const json = {
            uf: data.uf,
            ddd: data.dddUf,
            platform: null,
            plan: null,
            sku: null
        };

        dto.projectConfig = ObjectBuilder.buildProjectConfigObject(json);
        this._dtoStorage.setDTO(dto);

        this.nextStep();
    }

    private nextStep() {
        this._router.navigateByUrl('planos');
    }

}
