import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressGuard } from './address-guard/address.guard';
import { CongratulationGuard } from './congratulation.guard/congratulation.guard';
import { HomeGuard } from './home-guard/home.guard';
import { PersonalDataGuard } from './personal-data/personal-data.guard';
import { PlansGuard } from './plans-guard/plans.guard';
import { ResumeGuard } from './resume-guard/resume.guard';
import { SmsGuard } from './sms.guard/sms.guard';

@NgModule({
    providers: [
        AddressGuard,
        CongratulationGuard,
        HomeGuard,
        PersonalDataGuard,
        PlansGuard,
        ResumeGuard,
        SmsGuard
    ]
})

export class GuardsModule { }

