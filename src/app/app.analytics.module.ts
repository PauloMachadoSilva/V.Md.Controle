import { NgModule, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Angulartics2Module, Angulartics2GoogleTagManager, Angulartics2 } from 'angulartics2';
import { Subscription } from 'rxjs/Subscription';

import { ConstantsService } from './shared/services';

@NgModule({
    imports: [
        Angulartics2Module.forRoot([ Angulartics2GoogleTagManager ])
    ]
})
export class AppAnalyticsModule implements OnDestroy {
    private _event: Subscription;

    constructor(
        private _angulartics2: Angulartics2,
        private _angulartics2GoogleTagManager: Angulartics2GoogleTagManager,
        private _router: Router,
        private _constants: ConstantsService
    ) { }

    ngOnDestroy() {
        this._event.unsubscribe();
    }

    private subscribePageTracker() {
        this._event = this._router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                // this._angulartics2GoogleTagManager.pageTrack(event.url);
                // this._angulartics2GoogleTagManager.eventTrack('example_1', 'example_1_value');
            }
        });
    }
}
