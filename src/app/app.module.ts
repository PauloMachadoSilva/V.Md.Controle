import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';


registerLocaleData(localePt, 'pt-BR');

import { AppRoutingModule } from './app-routing.module';

// import { PipesModule } from './shared/pipes/pipes.module';
import { AppComponent } from './app.component';
import { ServiceModule } from './shared/services/service.module';
import { WzaModule } from './components/wza.module';
import { PageModule } from './pages/page.module';
import { AppAnalyticsModule } from './app.analytics.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        AppAnalyticsModule,

        PageModule,
        ServiceModule,
        WzaModule
    ],
    providers: [
        {
            provide: LOCALE_ID,
            useValue: 'pt-BR'
        }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }