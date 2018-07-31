import { PersonalDataGuard } from './../../guards/personal-data/personal-data.guard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonalDataComponent } from './personal-data.component';
import { WzaModule } from '../../components/wza.module';

const routes: Routes = [
    {
        path: 'dados-pessoais',
        component: PersonalDataComponent,
        canActivate: [ PersonalDataGuard ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        WzaModule
    ],
    declarations: [
        PersonalDataComponent
    ]
})

export class PersonalDataModule { }
