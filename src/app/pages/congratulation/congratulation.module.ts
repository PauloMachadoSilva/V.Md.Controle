import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CongratulationGuard } from './../../guards/congratulation.guard/congratulation.guard';
import { CongratulationComponent } from './congratulation.component';
import { WzaModule } from '../../components/wza.module';

const routes: Routes = [
    {
        path: 'parabens',
        component: CongratulationComponent,
        canActivate: [ CongratulationGuard ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        WzaModule
    ],
    declarations: [
        CongratulationComponent
    ]
})

export class CongratulationModule { }
