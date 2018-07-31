import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Address, DTO, Modality } from '../../shared/models';

import {
    WzaValidator,
    WzaValidType,
    WzaFormBuilder,
    WzaFormGroup
} from './../../components/form';

import {
    APIAddressService,
    APIMetricsService,
    DTOStorageService,
    ConstantsService,
    APICartService
} from '../../shared/services';

import {
    Formatter,
    ObjectBuilder,
    StorageAccessor
} from '../../shared/utils';

@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.sass']
})
export class AddressComponent implements OnInit {
    public addressForm: WzaFormGroup;
    public clientName: string;
    public maturityList: Array<{ day: number, default: boolean }>;
    public cepLoaded = false;
    public isCompleteAddress = false;

    private _urlName = 'endereco';

    private _analyticsControl = {};

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _APIAddress: APIAddressService,
        private _APImetrics: APIMetricsService,
        private _APICart: APICartService,
        private _dtoStorage: DTOStorageService,
        private _constants: ConstantsService
    ) {
        const dto = this._dtoStorage.getDTO();
        // this._APImetrics.sendUid('analyticsEvent: string', 'requestEvent: string', 'view: string');

        this.maturityList = ObjectBuilder.buildMaturityObject(StorageAccessor.get('maturityList'));
        this.clientName = dto.cart.personalData.firstName();
    }

    ngOnInit() {
        const dto = this._dtoStorage.getDTO();
        let cep: string;
        this._route.queryParams.subscribe(json => { cep = json.cep; });

        const isnewCep = (cep && cep !== dto.cart.address.cep);

        const required  = true;

        let maturityDefault: number;
        this.maturityList.forEach(element => {
            if (element.default) {
                maturityDefault = element.day;
            }
        });

        if (!maturityDefault && this.maturityList.length > 0) {
            maturityDefault = this.maturityList[0].day;
        }

        this.addressForm = WzaFormBuilder.build([
            { name: 'cep',          value: cep || dto.cart.address.cep,                required, type: WzaValidType.CEP          },
            { name: 'city',         value: dto.cart.address.city,                      required                                  },
            { name: 'neighborhood', value: dto.cart.address.neighborhood,              required, type: WzaValidType.ONLY_LETTERS },
            { name: 'state',        value: dto.cart.address.state,                     required                                  },
            { name: 'street',       value: dto.cart.address.street,                    required, type: WzaValidType.ONLY_LETTERS },
            { name: 'patio',        value: dto.cart.address.patio,                     required                                  },
            { name: 'number',       value: isnewCep ? '' : dto.cart.address.number,    required, type: WzaValidType.ONLY_NUMBER  },
            { name: 'complement',   value: isnewCep ? '' : dto.cart.address.reference                                            },
            { name: 'maturity',     value: '' + maturityDefault,                       required,                                 },
            { name: 'accountType',  value: 'digital',                                  required,                                 },
            { name: 'agreement',    value: 'yes',                                      required,                                 },
            { name: 'agreementDigital', value: 'yes',                                  required,                                 }
        ]);

        this.updateAddressByCEP();
    }

    onKeyupCep(isBlur: boolean) {
        if (this._analyticsControl['cep'] === undefined) {
            this._analyticsControl['cep'] = {};
        } else if (this._analyticsControl['cep'].value === this.addressForm.fieldValue('cep')) {
            return;
        } else {
            clearTimeout(this._analyticsControl['cep'].timeout);
        }

        this.cepLoaded = false;

        this.addressForm.field('city').setValue('');
        this.addressForm.field('neighborhood').setValue('');
        this.addressForm.field('patio').setValue('');
        this.addressForm.field('street').setValue('');
        this.addressForm.field('complement').setValue('');
        this.addressForm.field('state').setValue('');
        this.addressForm.field('number').setValue('');

        if (isBlur) {
            this.updateAddressByCEP();
        } else {
            this._analyticsControl['cep'].timeout = setTimeout(() => {
                this.updateAddressByCEP();
            }, 2000);
        }
    }

    public async updateAddressByCEP() {
        this.cepLoaded = false;
        if (this.addressForm.field('cep').valid) {
            const cep = this.addressForm.fieldValue('cep');

            const addressData = await this._APIAddress.getAddressByCEP(cep);

            if (addressData == null) {
                this.addressForm.setError('cep', 'CEP não encontrado');
                return;
            }

            if (!this._analyticsControl['cep']) {
                this._analyticsControl['cep'] = {};
            }
            this._analyticsControl['cep'].value = cep;

            this.isCompleteAddress = addressData.street !== addressData.city;

            this.addressForm.field('city').setValue(addressData.city);
            this.addressForm.field('neighborhood').setValue((!this.isCompleteAddress) ? '' : addressData.neighborhood);
            this.addressForm.field('patio').setValue(addressData.patio);
            this.addressForm.field('street').setValue((!this.isCompleteAddress) ? '' : addressData.street);
            this.addressForm.field('complement').setValue(addressData.reference);
            this.addressForm.field('state').setValue(addressData.state);

            this.cepLoaded = true;

            this._APICart.cep(this._urlName, cep);
        }
    }

    updateAnalytics(fieldName: string, isBlur = false) {
        if (this._analyticsControl[fieldName] === undefined) {
            this._analyticsControl[fieldName] = {};
        }

        const field = this.addressForm.field(fieldName);

        if (!field.valid || field.value === null || this._analyticsControl[fieldName].value === field.value) {
            if (!isBlur) {
                clearTimeout(this._analyticsControl[fieldName].timeout);
            }
            return;
        }

        let fn: any;
        switch (fieldName) {
            case 'number':
                fn = () => this._APICart.number(this._urlName, field.value);
            break;
            case 'street':
                const patio = this.addressForm.field('patio').value;
                fn = () => this._APICart.street(this._urlName, patio, field.value);
            break;
            case 'accountType':
                const accountType = this.addressForm.field('accountType').value;
                fn = () => this._APICart.accountType(this._urlName, accountType);
            break;
            case 'neighborhood':
                fn = () => this._APICart.neighborhood(this._urlName, field.value);
            break;
            case 'complement':
                fn = () => this._APICart.complement(this._urlName, field.value);
            break;
            default:
                break;
        }

        this.updateTimeout(fieldName, fn, isBlur);
    }

    private updateTimeout(field: string, fn: any, isBlur = false) {
        if (this._analyticsControl[field].timeout !== null) {
            clearTimeout(this._analyticsControl[field].timeout);
        }

        const fnx = () => {
            this._analyticsControl[field].value = this.addressForm.fieldValue(field);
            fn();
        };

        if (isBlur) {
            fnx();
        } else {
            this._analyticsControl[field].timeout = setTimeout(fnx, 1500);
        }
    }

    public onSubmit() {
        const dto = this._dtoStorage.getDTO();
        const json = this.addressForm.getRawValue();

        dto.cart.address = ObjectBuilder.buildAddressObject({
            cep: json.cep,
            city: json.city,
            neighborhood: json.neighborhood,
            number: json.number,
            patio: json.patio,
            reference: json.complement,
            state: json.state,
            street: json.street
        });
        dto.cart.dueDate = json.maturity;

        this._dtoStorage.setDTO(dto);
        this.nextStep();
    }

    private async nextStep() {
        const dto = this._dtoStorage.getDTO();

        const accept = ['yes', 'true'].indexOf(this.addressForm.fieldValue('agreement')) > -1;

        this.updateAnalytics('accountType', true);

        const result = await this._APICart.maturity(this._urlName, this.addressForm.fieldValue('maturity'), accept);

        let redirect: string;
        if (dto.cart.modality.name === Modality.NEW_LINE) {
            const resultFinish = await this._APICart.finishCart(this._urlName);

            dto.cart.orderCode = resultFinish.orderCode;
            this._dtoStorage.setDTO(dto);
            redirect = 'parabens';
        } else {
            redirect = 'sms';
        }

        this._router.navigateByUrl(redirect);
    }
}
