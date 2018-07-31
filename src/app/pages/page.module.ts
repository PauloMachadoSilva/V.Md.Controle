import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressModule } from './address/address.module';
import { AddressSearchModule } from './address-search/address-search.module';
import { CongratulationModule } from './congratulation/congratulation.module';
import { GuardsModule } from './../guards/guards.module';
import { HomePageModule } from './home-page/home-page.module';
import { PersonalDataModule } from './personal-data/personal-data.module';
import { PlansModule } from './plans/plans.module';
import { ReturnsClientModule } from './returns-client/returns-client.module';
import { SmsModule } from './sms/sms.module';
import { GlobalErrorHandler } from '../shared/error-handler/GlobalErrorHandler';

@NgModule({
    imports: [
        CommonModule,
        GuardsModule
    ],
    exports: [
        AddressModule,
        AddressSearchModule,
        CongratulationModule,
        GuardsModule,
        HomePageModule,
        PersonalDataModule,
        PlansModule,
        ReturnsClientModule,
        SmsModule
    ],
    providers: [
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        }
    ]
})

export class PageModule { }

