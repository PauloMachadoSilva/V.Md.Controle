
import { Component, OnInit, OnDestroy } from '@angular/core';

import { ISubscription } from 'rxjs/Subscription';

import { APIConfigService, ConstantsService, DebuggerService, HttpAPIService } from '../../shared/services';
import { NgxSpinnerService } from 'ngx-spinner';

/**
 * @whatItDoes
 * Generic projeto Partial Spinner Component used to make a loader spinner into page
 * Spinner Component must subscribe for all 'emitters' events
 *
 * @howToUse
 * Use HTML selector: `<partial-spinner></partial-spinner>`
 *
 * @example
 * ```html
 * <partial-spinner></partial-spinner>
 * ```
 *
 * NgModule: `{ imports: [ WzaModule ] }`
 */
@Component({
    selector: 'partial-spinner',
    templateUrl: './partial-spinner.component.html',
    styleUrls: ['./partial-spinner.component.sass']
})
export class PartialSpinnerComponent implements OnInit, OnDestroy {

    public isDebug: boolean;

    private _subscriptionStart: ISubscription;
    private _subscriptionFinish: ISubscription;


    constructor(
        private _debugger: DebuggerService,
        private _apiConfig: APIConfigService,
        private _httpService: HttpAPIService,
        private spinner: NgxSpinnerService
    ) {
        // const a = Spinner
        this.isDebug = _debugger.enabled('spinner');
    }

    ngOnInit() {
        this._subscriptionStart = this._httpService.start.subscribe((key) => this.play(key));
        this._subscriptionFinish = this._httpService.finish.subscribe((key) => this.stop(key));
    }

    ngOnDestroy() {
        this._subscriptionStart.unsubscribe();
        this._subscriptionFinish.unsubscribe();
    }

    public testSpinner(key: string) {
        this.play(key);
        setTimeout(() => this.stop(key), 3000);
    }

    private play(key: string) {
        const container = this._apiConfig.getSpinner(key);

        if (container !== 'all') {
            if (container.id) {
                const element = document.getElementById(container.id);
                if (element != null) {
                    document.getElementById(container.id).classList.add('spinner');
                } else {
                    console.warn('[spinner] The element ', container.id, ' is null.');
                }
            }
        } else {
            this.spinner.show();
        }
    }

    private stop(key) {
        const container = this._apiConfig.getSpinner(key);

        if (container !== 'all') {
            if (container.id) {
                const element = document.getElementById(container.id);
                if (element != null) {
                    document.getElementById(container.id).classList.remove('spinner');
                } else {
                    console.warn('[spinner] The element ', container.id, ' is null.');
                }
            }
        } else {
            this.spinner.hide();
        }
    }
}
