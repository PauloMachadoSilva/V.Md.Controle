import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DTOStorageService, APIMetricsService, APICartService } from '../../shared/services';
import { WzaFormGroup, WzaFormBuilder, WzaValidType } from './../../components/form';
import { DTO } from '../../shared/models';

@Component({
    selector: 'app-sms',
    templateUrl: './sms.component.html',
    styleUrls: ['./sms.component.sass']
})
export class SmsComponent implements OnInit {

    public smsForm: WzaFormGroup;
    public clientName: string;
    public phoneNumber: string;
    public attempResendAmount = 0;
    public counterTimeout = 0;
    public sending = false;

    private _interval = null;
    private _dto: DTO;
    private _urlName = 'sms';

    constructor(
        private _router: Router,
        private _formBuilder: WzaFormBuilder,
        private _dtoStorage: DTOStorageService,
        private _APIMetrics: APIMetricsService,
        private _APICart: APICartService
    ) {
        // this._APImetrics.sendUid('analyticsEvent: string', 'requestEvent: string', 'view: string');

        const dto = this._dtoStorage.getDTO();
        this.clientName = dto.cart.personalData.firstName();
        this.phoneNumber = dto.cart.personalData.phoneNumber.mount;
    }

    ngOnInit() {
        this.smsForm = WzaFormBuilder.build([
            { name: 'sms', required: true, type: WzaValidType.SMS_TOKEN, error: 'Código inválido.' }
        ]);

        this.startCounter();
    }

    public async onSubmit() {
        this.sending = true;

        const sms = this.smsForm.field('sms').value;

        const dto = this._dtoStorage.getDTO();
        const cartId = dto.cart.cartUid;

        let result = false;
        try {
            result = await this._APICart.confirmSMS(sms, cartId, dto.sessionUid, 'sms');
        } catch (error) {
            if (error.status === 422) {
                result = false;
            } else {
                throw error;
            }
        }

        this.sending = false;

        if (result) {
            const resultFinish = await this._APICart.finishCart(this._urlName);

            dto.cart.orderCode = resultFinish.orderCode;
            this._dtoStorage.setDTO(dto);

            this.nextStep();
        } else {
            this.smsForm.setError('sms', 'SMS não confere');
        }
    }


    public sendSmsAgain() {

        const dto = this._dtoStorage.getDTO();

        if (this.attempResendAmount === 3) {
            return;
        }

        this.attempResendAmount++;

        if (this.counterTimeout > 0) {
            return;
        }

        this.startCounter();

        this._APICart.reSendSMS(dto.cart.cartUid, dto.sessionUid, 'sms');
    }

    public startCounter() {

        this.counterTimeout = 60;

        if (this._interval != null) {
            clearInterval(this._interval);
        }

        this._interval = setInterval(() => {
            this.counterTimeout--;
            if (this.counterTimeout === 0) {
                clearInterval(this._interval);
            }
        }, 1000);

    }

    private nextStep() {
        this._router.navigateByUrl('parabens');
    }
}
