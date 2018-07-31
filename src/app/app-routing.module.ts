import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

const ROUTES: Routes = [
    // {
    //     path: '',
    //     component: HomePageComponent
    // }
    // ,
    // {
    //     path: 'planos',
    //     loadChildren: './pages/plans/plans.page.module#PlansPageModule'
    // }
    // ,
    // {
    //     path: 'endereco',
    //     loadChildren: './pages/address/address.page.module#AddressPageModule'
    // },
    // {
    //     path: 'dados-pessoais',
    //     loadChildren: './pages/personal-data/personal-data.page.module#PersonalDataPageModule'
    // },
    // {
    //     path: 'sms',
    //     loadChildren: './pages/sms/sms.page.module#SmsPageModule'
    // },
    // {
    //     path: 'parabens',
    //     loadChildren: './pages/congratulations/congratulations.page.module#CongratulationsPageModule'
    // }
];

const useLazyLoading = true;

const PRELOAD_STRATEGY = {
    preloadingStrategy: useLazyLoading ? null : PreloadAllModules
};

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES, PRELOAD_STRATEGY)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
