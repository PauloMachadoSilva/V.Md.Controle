import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Modality, Plan, DTO } from '../../shared/models';
import { DTOStorageService } from '../../shared/services';
import { EventEmitter } from 'events';

/**
 * @whatItDoes
 * Generic projeto Partial Plan Details Component used to make a Plan Details structure
 *
 * @howToUse
 * Use HTML selector: `<partial-sidebar>content</partial-sidebar>`
 *
 * @example
 * ```html
 * <partial-sidebar></partial-sidebar>
 * ```
 *
 * NgModule: `{ imports: [ WzaModule ] }`
 */
@Component({
    selector: 'partial-sidebar',
    templateUrl: './partial-sidebar.component.html',
    styleUrls: ['./partial-sidebar.component.sass']
})
export class PartialSidebarComponent implements OnInit, OnDestroy {

    public plan: Plan;
    public phoneNumber: string;
    public detailList: Array<string>;
    public modalityName: string;

    private _event: Subscription;

    constructor(
        private _DTOStorage: DTOStorageService,
        private _router: Router
    ) { }

    ngOnInit() {
        this._event = this._router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.update();
            }
        });

        this.update();
    }

    ngOnDestroy() {
        this._event.unsubscribe();
    }

    update() {
        const dto: DTO = this._DTOStorage.getDTO();

        this.plan = dto.cart.plan;

        this.detailList = [];

        if (this.plan.description === null || undefined) {
            return;
        } else {
            Object.keys(this.plan.description).forEach(key => {
                if (key !== 'sva') {
                    this.detailList.push(this.plan.description[key].title + ' ' + this.plan.description[key].description);
                }
            });
        }

        switch (dto.cart.modality.name) {
            case Modality.NEW_LINE:
                this.modalityName = 'Nova Linha';
                break;
            case Modality.UPDATE_PLAIN:
                this.modalityName = 'Portabilidade da linha ' + dto.cart.personalData.phoneNumber.mount;
                break;
            case Modality.MIGRATE:
                this.modalityName = 'Migração da linha ' + dto.cart.personalData.phoneNumber.mount;
                break;
            case Modality.UPGRADE:
                this.modalityName = 'Melhoria da linha ' + dto.cart.personalData.phoneNumber.mount;
                break;
            default:
                break;
        }
    }
    openSidebar() {
        const element = document.getElementsByClassName('sidebar-content');
        const sidebar = element[0].classList;

        if (sidebar.length > 1) {
            element[0].className = 'sidebar-content';
        } else {
            element[0].classList.add('-active');
        }
    }
}
