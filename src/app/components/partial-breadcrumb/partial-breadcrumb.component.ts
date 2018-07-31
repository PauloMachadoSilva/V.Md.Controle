import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';

import { BreadcrumbInterface } from './partial-breadcrumb.interface';

/**
 * @whatItDoes
 * Generic projeto Partial Breadcrumb Component used to make a Breadcrumb structure
 *
 * @howToUse
 * Use HTML selector: `<partial-breadcrumb>content</partial-breadcrumb>`
 *
 * @example
 * ```html
 * <partial-breadcrumb></partial-breadcrumb>
 * ```
 *
 * NgModule: `{ imports: [ WzaModule ] }`
 */
@Component({
    selector: 'partial-breadcrumb',
    templateUrl: './partial-breadcrumb.component.html',
    styleUrls: ['./partial-breadcrumb.component.sass']
})
export class PartialBreadcrumbComponent implements OnInit, OnDestroy {

    @Input() data: BreadcrumbInterface;
    public enabled: boolean;
    public current: string;
    private _routeSubscription: ISubscription;

    constructor(
        private _router: Router
    ) {
        this._routeSubscription = this._router.events.subscribe((val: RouterEvent) => {
            if (val instanceof NavigationEnd) {
                this.update(val.url.split('?')[0]);
            }
        });
    }

    ngOnInit() { }

    ngOnDestroy() {
        this._routeSubscription.unsubscribe();
    }

    private update(url) {
        this.current = null;
        // this.enabled = true;

        // Check is disabled breadcrumb url
        if (this.data.hideUrls) {
            let isEnabled = true;
            this.data.hideUrls.forEach(item => {
                if (item.indexOf('/*') > -1 && url.indexOf(item.replace('/*', '')) > -1) {
                    isEnabled = false;
                } else if (url === item) {
                    isEnabled = false;
                }
            });

            this.enabled = isEnabled;
            if (!this.enabled) { return; }
        }

        // Check current url is equals current item
        if (this.data.itens) {
            this.data.itens.forEach(item => {
                if (this.current != null) { return; }

                let isItem = false;
                item.urlList.forEach(urlItem => {
                    if (item.isContains) {
                        if (url.indexOf(urlItem) > -1) {
                            this.current = urlItem;
                        }
                    } else if (url === urlItem) {
                        this.current = urlItem;
                        isItem = true;
                    }
                });

                item.completed = !isItem;
            });
        }
    }
}
