import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AddressGuard } from './../../guards/address-guard/address.guard';
import { AddressComponent } from './address.component';
import { WzaModule } from '../../components/wza.module';

const routes: Routes = [
    {
        path: 'endereco',
        component: AddressComponent,
        canActivate: [ AddressGuard ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        WzaModule
    ],
    declarations: [
        AddressComponent
    ]
})

export class AddressModule { }
