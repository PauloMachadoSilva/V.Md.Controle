import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgxCarousel } from 'ngx-carousel';

import { Plan, DTO } from '../../shared/models';
import { ObjectBuilder } from '../../shared/utils';
import { ConstantsService, APIPlanService, DTOStorageService } from '../../shared/services';

@Component({
    selector: 'app-plans',
    templateUrl: './plans.component.html',
    styleUrls: ['./plans.component.sass']
})
export class PlansComponent implements OnInit {

    public planList: Array<Plan>;

    public carouselOne: NgxCarousel;

    constructor(
        private _constants: ConstantsService,
        private _router: Router,
        private _planAPI: APIPlanService,
        private _dtoStorage: DTOStorageService
    ) { }

    ngOnInit() {
        this.setPlanList();

        this.carouselOne = {
            grid: { xs: 1, sm: 2, md: 4, lg: 4, all: 190 },
            slide: 1,
            speed: 400,
            interval: 4000,
            point: {
                visible: true
            },
            load: 2,
            touch: true,
            loop: false,
            custom: 'banner'
        };
    }

    private async setPlanList() {
        const dto: DTO = this._dtoStorage.getDTO();
        this.planList = await this._planAPI.getPlanByDDDList(
                                                dto.projectConfig.ddd,
                                                this._constants.client.plans.productId,
                                                this._constants.client.plans.modality
                                            );
    }

    onSubmit(sku: string) {
        const plan = this.planList.find(x => x.skuCode === sku);

        const dto: DTO = this._dtoStorage.getDTO();
        dto.projectConfig.sku = plan.skuCode;

        if (dto.cart === undefined) {
            dto.cart = ObjectBuilder.buildCartObject({
                address: null,
                cartUid: null,
                dueDate: null,
                modality: null,
                nextStep: null,
                orderCode: null,
                orderDate: null,
                personalData: null,
                plan: plan
            });
        } else {
            dto.cart.plan = plan;
        }

        this._dtoStorage.setDTO(dto);

        this.nextStep();
    }

    private nextStep() {
        this._router.navigateByUrl('dados-pessoais');
    }
}
