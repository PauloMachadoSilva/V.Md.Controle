import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ISubscription } from 'rxjs/Subscription';

import {
    APICartService,
    APIMetricsService,
    APIPersonalDataService,
    DTOStorageService
} from '../../shared/services';
import {
    Cart,
    DTO,
    PersonalData,
    PhoneNumber,
    Modality
} from '../../shared/models';
import {
    Formatter,
    ObjectBuilder
} from '../../shared/utils';
import {
    WzaFormControl,
    WzaFormBuilder,
    WzaFormGroup,
    WzaValidator,
    WzaValidType
} from './../../components/form';

@Component({
    selector: 'app-personal-data',
    templateUrl: './personal-data.component.html',
    styleUrls: ['./personal-data.component.sass']
})
export class PersonalDataComponent implements OnInit {
    private urlName = 'dados-pessoais';

    private _analyticsControl = {};
    private _cartId = null;

    private cpfData: PersonalData;
    private cellPhoneLabel;
    private _modalityUpdateSubscription: ISubscription;
    private _currentModality: string;

    public personalDataForm: WzaFormGroup;

    constructor(
        private _router: Router,
        private _personalDataAPI: APIPersonalDataService,
        private _dtoStorage: DTOStorageService,
        private _APImetrics: APIMetricsService,
        private _APICart: APICartService
    ) {
        // this._APImetrics.sendUid('analyticsEvent: string', 'requestEvent: string', 'view: string');
    }

    ngOnInit() {
        const dto: DTO = this._dtoStorage.getDTO();

        const birth = Formatter.date(dto.cart.personalData.birthdate, 'dd/MM/yyyy');
        const required = true;

        const fields = [
            { name: 'email', required, type: WzaValidType.EMAIL, value: dto.cart.personalData.email },
            { name: 'modality', required, value: 'yes' },
            { name: 'cellPhone', required, type: WzaValidType.CELL_PHONE, value: dto.cart.personalData.phoneNumber.mount },
            { name: 'cpf', required, type: WzaValidType.CPF, value: dto.cart.personalData.cpf },
            { name: 'name', required, type: WzaValidType.NAME, value: dto.cart.personalData.name },
            { name: 'motherName', required, type: WzaValidType.NAME, value: dto.cart.personalData.motherName },
            { name: 'birth', required, type: WzaValidType.BIRTH_DATE, value: birth }
        ];

        this.personalDataForm = WzaFormBuilder.build(fields);
        this.personalDataForm.field('name').readonly = true;
        this.personalDataForm.field('motherName').readonly = true;
        this.personalDataForm.field('birth').readonly = true;
    }

    onSubmit() {
        const json = this.personalDataForm.getRawValue();
        const birth = Formatter.strToDate(json.birth);

        const cellPhone = Formatter.removeSpecialChars(json.cellPhone, true);
        const ddd = cellPhone.substr(0, 2);
        const number = cellPhone.substr(2, 9);

        const dto: DTO = this._dtoStorage.getDTO();

        dto.cart.modality = ObjectBuilder.buildModalityObject({
            id: null,
            name: this._currentModality
        });

        dto.cart.personalData = ObjectBuilder.buildPersonalDataObject({
            name: json.name,
            motherName: json.motherName,
            birthdate: birth,
            cpf: json.cpf,
            phoneNumber: { ddd: ddd, number: number },
            email: json.email
        });

        this._dtoStorage.setDTO(dto);

        this.nextStep();
    }

    saveCartFromEmail(isBlur: boolean) {

        if (this._analyticsControl['email'] === undefined) {
            this._analyticsControl['email'] = {};
        }
        const email = this.personalDataForm.field('email');
        if (!email.valid) {
            return;
        }

        const dto: DTO = this._dtoStorage.getDTO();

        if (!dto.cart.cartUid) {
            this.updateTimeout('email', async () => {
                dto.cart = await this._APICart.makeCart(this.urlName, email.value);
                this._dtoStorage.setDTO(dto);

                this._cartId = dto.cart.cartUid;
                this._analyticsControl['email'].value = email.value;
            }, isBlur);
        } else {
            if (this._analyticsControl['email'].value === email.value) {
                clearTimeout(this._analyticsControl['email'].timeout);
                return;
            }

            this.updateTimeout('email', () => {
                this._APICart.email(this.urlName, email.value);
                this._analyticsControl['email'].value = email.value;
            }, isBlur);
        }

        this._cartId = dto.cart.cartUid;

        return;
    }

    updateDataByCPF() {
        if (this._analyticsControl['cpf'] === undefined) {
            this._analyticsControl['cpf'] = {};
        }

        if (this._analyticsControl['cpf'].timeout === undefined) {
            this._analyticsControl['cpf'].timeout = {};
        } else {
            clearTimeout(this._analyticsControl['cpf'].timeout);
        }

        if (this._analyticsControl['cpf'].value === this.personalDataForm.fieldValue('cpf')) {
            return;
        }


        if (this._analyticsControl['cpf'].timeout !== null) {
            clearTimeout(this._analyticsControl['cpf'].timeout);
        }

        this.personalDataForm.field('name').readonly = true;
        this.personalDataForm.field('motherName').readonly = true;
        this.personalDataForm.field('birth').readonly = true;

        if (this.personalDataForm.field('cpf').valid) {
            this._analyticsControl['cpf'].timeout = setTimeout(async () => {
                const cpf = this.personalDataForm.field('cpf').value;

                this.cpfData = await this._personalDataAPI.getDataByCPF(cpf);

                const birth = Formatter.date(this.cpfData.birthdate, 'dd/MM/yyyy');

                this.personalDataForm.field('name').toggleEnabledByValue(this.cpfData.name);
                this.personalDataForm.field('motherName').toggleEnabledByValue(this.cpfData.motherName);
                this.personalDataForm.field('birth').toggleEnabledByValue(birth);
                this.updateAnalytics('cpf');
                this.updateAnalytics('name');
                this.updateAnalytics('motherName');
                this.updateAnalytics('birth');

                this.cpfDataRedirect();
            }, 800);
        }
    }

    cpfDataRedirect() {
        if (this._analyticsControl['redirect'] === undefined) {
            this._analyticsControl['redirect'] = {};
        }

        if (this.personalDataForm.valid
            && this.personalDataForm.field('name').valid
            && this.personalDataForm.field('motherName').valid
            && this.personalDataForm.field('birth').valid) {
            if (this._analyticsControl['redirect'].timeout !== null) {
                clearTimeout(this._analyticsControl['redirect'].timeout);
            }

            this.updateTimeout('redirect', () => this.onSubmit());
        } else {
            if (this.personalDataForm.fieldValue('birth') !== '' && !this.personalDataForm.field('birth').valid) {
                this.personalDataForm.setError('cpf', 'Válido apenas para pessoas acima de 18 anos');
            }
        }
    }

    updateAnalytics(fieldName: string, isBlur = false) {
        if (this._analyticsControl[fieldName] === undefined) {
            this._analyticsControl[fieldName] = {};
        }

        const field = this.personalDataForm.field(fieldName);

        if (!field.valid || field.value === null || this._analyticsControl[fieldName].value === field.value) {
            clearTimeout(this._analyticsControl[fieldName].timeout);
            return;
        }

        const modality = this.personalDataForm.get('modality').value === 'yes'
            ? Modality.UPDATE_PLAIN
            : Modality.NEW_LINE;

        let fn: any;
        switch (fieldName) {
            case 'email':
                fn = () => {
                    if (!field.valid) {
                        return;
                    }
                    this._APICart.email(this.urlName, field.value);
                };
                break;
            case 'cellPhone':
                const cellPhone = Formatter.removeSpecialChars(field.value, true);
                const ddd = cellPhone.substr(0, 2);
                const number = cellPhone.substr(2, 9);
                const phone = ObjectBuilder.buildPhoneNumberObject({ ddd: ddd, number: number });

                fn = async () => {
                    if (!field.valid) {
                        return;
                    }

                    const result = await this._APICart.phone(this.urlName, phone, modality);
                    this._currentModality = result.modality;
                };

                break;
            case 'cpf':
                fn = () => {
                    if (!field.valid) {
                        return;
                    }
                    this._APICart.cpf(this.urlName, field.value);
                };
                break;
            case 'modality':
                fn = () => { };
                const type = (modality === Modality.NEW_LINE)
                    ? WzaValidType.PHONE
                    : WzaValidType.CELL_PHONE;

                this.personalDataForm.field('cellPhone').setValue('');
                this.personalDataForm.field('cellPhone').changeValidType(type);
                break;
            case 'name':
                fn = () => {
                    if (!field.valid) {
                        return;
                    }
                    this._APICart.name(this.urlName, field.value);
                    this.cpfDataRedirect();
                };
                break;
            case 'motherName':
                fn = () => {
                    if (!field.valid) {
                        return;
                    }
                    this._APICart.motherName(this.urlName, field.value);
                    this.cpfDataRedirect();
                };
                break;
            case 'birth':
                fn = () => {
                    if (!field.valid) {
                        return;
                    }
                    this._APICart.birth(this.urlName, field.value);
                    this.cpfDataRedirect();
                };
                break;
            default:
                break;
        }

        this.updateTimeout(fieldName, fn, isBlur);
    }

    private updateTimeout(fieldName: string, fn: any, isBlur = false) {
        if (this._analyticsControl[fieldName] === undefined) {
            this._analyticsControl[fieldName] = {};
        }

        if (this._analyticsControl[fieldName].timeout !== null) {
            clearTimeout(this._analyticsControl[fieldName].timeout);
        }

        const fnn = () => {
            if (fieldName !== 'redirect') {
                this._analyticsControl[fieldName].value = this.personalDataForm.fieldValue(fieldName);
            }

            fn();
        };

        const fnx = (fieldName === 'email' || this._cartId !== null)
            ? fnn
            : () => {
                this.updateTimeout(fieldName, fnn, isBlur);
            };

        if (isBlur) {
            fnx();
        } else {
            this._analyticsControl[fieldName].timeout = setTimeout(fnx, 1500);
        }
    }

    private nextStep() {
        this._router.navigateByUrl('endereco');
    }
}
