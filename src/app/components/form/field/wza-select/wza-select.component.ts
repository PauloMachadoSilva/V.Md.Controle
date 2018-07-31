import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { WzaFormControl } from './../../builder/wza-form-control';
import { WzaOptionInterface } from './wza-options.interfaces';

/**
 * @whatItDoes
 * Generic projeto form select field component
 *
 * @howToUse
 * Use HTML selector: `<wza-select></wza-select>`
 *
 * @example
 * ```html
 * <wza-select
 *      field="WzaFormControl"
 *      id="string"
 *      label="string"
 *      class="string"
 *      error="string"
 *      hasIcon="boolean"
 *      formControlName
 *></wza-select>
 * ```
 *
 * NgModule: `{ imports: [ WzaModule ] }`
 *
 * @todo Check for more implementations that may be needed. Ex.: events, properties, etc
 */
@Component({
    selector: 'wza-select',
    templateUrl: './wza-select.component.html',
    styleUrls: ['./wza-select.component.sass']
})
export class WzaSelectComponent implements OnInit {

    public type = 'select';

    @Input() public field: WzaFormControl;
    @Input() public id: string;
    @Input() public label: string;
    @Input() public class: string;
    @Input() public error: string;
    @Input() public hasIcon: boolean;

    constructor() { }

    ngOnInit() { }
}
