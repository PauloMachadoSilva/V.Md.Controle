import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AddressSearchComponent } from './address-search.component';
import { WzaModule } from '../../components/wza.module';

const routes: Routes = [
    { path: 'buscar_endereco', component: AddressSearchComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        WzaModule
    ],
    declarations: [
        AddressSearchComponent
    ]
})

export class AddressSearchModule { }
