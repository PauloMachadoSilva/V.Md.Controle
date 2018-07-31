import { NgModule } from '@angular/core';
import {
    APIAddressService,
    APICartService,
    APIConfigService,
    APIMetricsService,
    APIPersonalDataService,
    APIPlanService,
    ConstantsService,
    DebuggerService,
    DTOStorageService,
    HttpAPIService,
    HttpService,
    ParametersService
} from '.';

@NgModule({
    providers: [
        APIAddressService,
        APICartService,
        APIConfigService,
        APIMetricsService,
        APIPersonalDataService,
        APIPlanService,
        ConstantsService,
        DebuggerService,
        DTOStorageService,
        HttpAPIService,
        HttpService,
        ParametersService
    ]
})

export class ServiceModule { }
