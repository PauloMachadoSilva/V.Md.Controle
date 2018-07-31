import { WzaFormGroup } from './../../components/form/builder/wza-form-group';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
    Address,
    DTO
} from '../../shared/models';
import {
    WzaValidator,
    WzaValidType,
    WzaFormBuilder
} from './../../components/form';
import {
    APIAddressService,
    APIMetricsService,
    DTOStorageService
} from '../../shared/services';
import {
    Formatter,
    ObjectBuilder
} from '../../shared/utils';

@Component({
    selector: 'app-address-search',
    templateUrl: './address-search.component.html',
    styleUrls: ['./address-search.component.sass']
})
export class AddressSearchComponent implements OnInit {

    public addressSearchForm: WzaFormGroup;
    public addressList: Array<Address>;
    private timeout: any;
    public clientName: string;

    constructor(
        private _router: Router,
        private _formBuilder: WzaFormBuilder,
        private _addressAPI: APIAddressService,
        private _dtoStorage: DTOStorageService,
        private _APImetrics: APIMetricsService
    ) {
        // this._APImetrics.sendUid('analyticsEvent: string', 'requestEvent: string', 'view: string');

        const dto: DTO = this._dtoStorage.getDTO();
        this.clientName = dto.cart.personalData.firstName();
    }

    ngOnInit() {
        this.addressSearchForm = WzaFormBuilder.build([
            { name: 'address', required: true }
        ]);
    }

    onKeyup() {
        if (this.timeout !== undefined) {
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => {
            this.findAddress();
        }, 2000);
    }

    async findAddress() {
        if (this.timeout !== undefined) {
            clearTimeout(this.timeout);
        }

        const query = this.addressSearchForm.controls['address'].value;
        if (query === undefined || query === null || query.trim() === '') {
            return;
        }

        try {
            this.addressList = await this._addressAPI.findAddress(query);
        } catch (error) {
            this.addressSearchForm.setError('address', 'Endereço não encontrado');
        }
    }

    public onSubmit(cep) {
        console.log(cep);
    }

    private nextStep() {
        this._router.navigateByUrl('servicos');
    }
}
