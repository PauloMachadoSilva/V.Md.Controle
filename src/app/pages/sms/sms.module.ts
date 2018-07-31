import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SmsGuard } from './../../guards/sms.guard/sms.guard';
import { SmsComponent } from './sms.component';
import { WzaModule } from '../../components/wza.module';

const routes: Routes = [
    {
        path: 'sms',
        component: SmsComponent,
        canActivate: [ SmsGuard ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        WzaModule
    ],
    declarations: [
        SmsComponent
    ]
})

export class SmsModule { }
