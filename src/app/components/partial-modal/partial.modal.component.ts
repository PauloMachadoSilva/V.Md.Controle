import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

import { ConstantsService } from './../../shared/services';
import { BreadcrumbInterface } from '../partial-breadcrumb/partial-breadcrumb.interface';
import { ISubscription } from 'rxjs/Subscription';

/**
 * @whatItDoes
 * Generic projeto Partial Modal Component used to make a modal structure
 *
 * @howToUse
 * Use HTML selector: `<partial-modal></partial-modal>`
 *
 * @example
 * ```html
 * <partial-modal>content</partial-modal>
 * ```
 *
 * NgModule: `{ imports: [ WzaModule ] }`
 */
@Component({
    selector: 'partial-modal',
    templateUrl: './partial.modal.component.html',
    styleUrls: ['./partial.modal.component.sass']
})
export class PartialModalComponent implements OnInit {

    public title: string;
    public hasSidebar: boolean;
    public breadcrumbData: BreadcrumbInterface = {
        hideUrls: [
            '/',
            '/r/*',
            '/planos',
            '/parabens'
        ],
        itens: [{
            text: 'Dados Pessoais',
            urlList: ['/dados-pessoais'],
            style: 'personal-data'
        },
        {
            text: 'Endereço',
            urlList: ['/endereco', '/buscar_endereco'],
            style: 'address'
        },
        {
            text: 'Finalização',
            urlList: ['/sms'],   // sms, finalizacao
            style: 'sms'
        }
        ]
    };

    public sidebarURLs: Array<string> = [
        '/dados-pessoais',
        '/endereco',
        '/sms',
        '/parabens',
        '/buscar_endereco'
    ];

    private _routeSubscription: ISubscription;

    constructor(
        private _router: Router,
        private _constants: ConstantsService
    ) {
        this.title = _constants.client.title;

        this._routeSubscription = this._router.events.subscribe((val: RouterEvent) => {
            if (val instanceof NavigationEnd) {
                this.update();
            }
        });
    }

    ngOnInit() {

    }

    update() {
        let show = false;
        this.sidebarURLs.forEach(item => {           
            if (this._router.url.indexOf(item) > -1) {
                show = true;
            }
        });       
        this.hasSidebar = show;
    }
    /**
     * Destroy Modal on close button click
     */
    closeModal() {
        top.postMessage('click!', '*');
    }
}
