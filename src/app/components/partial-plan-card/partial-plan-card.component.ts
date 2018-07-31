import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

import { Plan } from '../../shared/models';

/**
 * @whatItDoes
 * Generic projeto Partial Plan Details Component used to make a Plan Details structure
 *
 * @howToUse
 * Use HTML selector: `<partial-plan-details>content</partial-plan-details>`
 *
 * @example
 * ```html
 * <partial-plan-details></partial-plan-details>
 * ```
 *
 * NgModule: `{ imports: [ WzaModule ] }`
 */
@Component({
    selector: 'partial-plan-card',
    templateUrl: './partial-plan-card.component.html',
    styleUrls: ['./partial-plan-card.component.sass']
})
export class PartialPlanCardComponent implements OnInit {

    @Input() public plan: Plan;
    @Input() public item: number;
    @Output() public send = new EventEmitter<string>();

    public hideme1: boolean;
    public hideme2: boolean;
    public hideme3: boolean;
    public hideme4: boolean;
    public appContentList: Array<string>;
    public detailList: Array<string>;
    public showDetails = false;


    constructor() {
    }

    ngOnInit() {

        this.appContentList = this.plan.description.sva.description.split(' + ');

        this.detailList = [];
        Object.keys(this.plan.description).forEach(key => {
            if (key !== 'sva') {
                this.detailList.push(this.plan.description[key].title + ' ' + this.plan.description[key].description);
            }
        });
    }

    onSubmit(skuCode: string) {
        this.send.emit(skuCode);
    }
}
