import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ReturnsClientComponent } from './returns-client.component';

const routes: Routes = [
    {
        path: 'r',
        component: ReturnsClientComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ],
    declarations: [
        ReturnsClientComponent
    ]
})

export class ReturnsClientModule { }
