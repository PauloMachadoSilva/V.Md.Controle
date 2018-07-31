import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomePageComponent } from './home-page.component';
import { WzaModule } from '../../components/wza.module';
import { FormDDDResolve } from '../../components/partial-form-ddd-selector/form-ddd-selector.resolver';
import { HomeGuard } from '../../guards/home-guard/home.guard';
import { ResumeGuard } from '../../guards/resume-guard/resume.guard';

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        resolve: { response: FormDDDResolve },
        canActivate: [ HomeGuard ],
        pathMatch: 'full'
    },
    {
        path: 'r',
        component: HomePageComponent,
        canActivate: [ ResumeGuard ]
    }
    // ,
    // {
    //     path: '**',
    //     redirectTo: ''
    // }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        WzaModule
    ],
    declarations: [
        HomePageComponent
    ]
})

export class HomePageModule { }

