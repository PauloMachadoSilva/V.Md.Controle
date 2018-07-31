import { PlansGuard } from './../../guards/plans-guard/plans.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NgxCarouselModule } from 'ngx-carousel';

import { PlansComponent } from './plans.component';
import { WzaModule } from '../../components/wza.module';

const routes: Routes = [
    {
        path: 'planos',
        component: PlansComponent,
        canActivate: [ PlansGuard ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        NgxCarouselModule,

        CommonModule,
        WzaModule
    ],
    declarations: [
        PlansComponent
    ]
})

export class PlansModule { }
