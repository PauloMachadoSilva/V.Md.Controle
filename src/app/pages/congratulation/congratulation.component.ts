import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CONGRATULATION } from '../../app.config';
import { DTOStorageService, APIMetricsService } from '../../shared/services';
import { WzaFormBuilder, WzaValidType } from './../../components/form';
import { DTO, Modality } from '../../shared/models';
import { Formatter } from '../../shared/utils';
import { Element } from '@angular/compiler';

@Component({
    selector: 'app-congratulation',
    templateUrl: './congratulation.component.html',
    styleUrls: ['./congratulation.component.sass']
})
export class CongratulationComponent implements OnInit {

    public congratulationForm: FormGroup;
    public _congratulation: any;

    private _timeout: any;
    private _dto: DTO;

    private congratulationTemplateType: number;

    public congratulationData: {
        title: string,
        text1: string,
        text2: string,
        image: string,
        dateList: Array<string>,
        code: string,
        nameClient: string,
        planName: string,
        cpfClient: string,
        planValue: string,
        dueDate: string

    };

    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _dtoStorage: DTOStorageService,
        private _APIMetrics: APIMetricsService
    ) {
        // @todo this._APImetrics.sendUid('analyticsEvent: string', 'requestEvent: string', 'view: string');
        this._congratulation = CONGRATULATION;
        this._dto = this._dtoStorage.getDTO();

        let key: string;

        // @obs mock de teste
        // this._dto.cart.modality.name = Modality.NEW_LINE;
        // this._dto.cart.modality.name = Modality.UPDATE_PLAIN;
        // this._dto.cart.modality.name = Modality.MIGRATE;

        switch (this._dto.cart.modality.name) {
            case Modality.NEW_LINE:
                this.congratulationTemplateType = 3;
                key = 'new_line';
                break;
            case Modality.UPDATE_PLAIN:
                this.congratulationTemplateType = 2;
                key = 'transfer';
                break;
            case Modality.MIGRATE:
            case Modality.UPGRADE:
                this.congratulationTemplateType = 1;
                key = 'migrate';
                break;
            default:
                break;
        }

        const d = new Date();

        const title = this._congratulation[key].title.replace('{NET_SIZE}', this._dto.cart.plan.complement.internetValue);
        const text1 = this._congratulation[key].text1.replace('{PHONE_NUMBER}', this._dto.cart.personalData.phoneNumber.mount);
        const text2 = this._congratulation[key].text2.replace('{PHONE_NUMBER}', this._dto.cart.personalData.phoneNumber.mount);
        const image = this._congratulation[key].image;
        const dateList = [];

        for (let i = 0; i < this._congratulation[key].dateList.length; i++) {
            const content = [];
            const element = this._congratulation[key].dateList[i];

            const currentDate = new Date(d.setDate(d.getDate() + element));

            content.push(i > 0 ? 'Até<br>' : '');
            content.push(Formatter.date(currentDate, 'dd/MM/yyyy'));
            content.push(i === 0 ? '<br>' + Formatter.date(currentDate, ' HH:mm:ss') : '');
            dateList.push(content.join(''));
        }

        this.congratulationData = {
            title,
            text1,
            text2,
            image,
            dateList,
            code: this._dto.cart.orderCode,
            nameClient: this._dto.cart.personalData.name,
            planName: this._dto.cart.plan.name,
            cpfClient: this._dto.cart.personalData.cpf,
            planValue: this._dto.cart.plan.price,
            dueDate: this._dto.cart.dueDate
        };
    }

    ngOnInit() {
        this.congratulationForm = WzaFormBuilder.build([
            { name: 'congratulation', required: true, type: WzaValidType.SMS_TOKEN, error: 'Código inválido.' }
        ]);

        this._dtoStorage.delDTO();
    }

    private nextStep() {
        this._router.navigateByUrl('servicos');
    }


    closeModal() {
        top.postMessage('click!', '*');
    }
}
