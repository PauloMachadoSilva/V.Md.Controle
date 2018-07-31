import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { WzaFormControl } from '../../builder/wza-form-control';

/**
 * @whatItDoes
 * Generic projeto form field label
 *
 * @howToUse
 * Use HTML selector: `<wza-label></wza-label>`
 *
 * @example
 * ```html
 * <wza-label
 *      field="WzaFormControl"
 *      type="string"
 *      id="string"
 *      label="string"
 *      placeholder="string"
 *      class="string"
 *      groupClass="string"
 *      hasIcon="boolean"
 * >content</wza-label>
 * ```
 *
 * NgModule: `{ imports: [ WzaModule ] }`
 *
 * @todo Check for more implementations that may be needed. Ex.: properties, HTML tags, etc
 */
@Component({
    selector: 'wza-label',
    templateUrl: './wza-label.component.html',
    styleUrls: ['./wza-label.component.sass']
})
export class WzaLabelComponent implements OnInit {

    @Input() public field: WzaFormControl;
    @Input() public type: string;
    @Input() public id: string;
    @Input() public label: string;
    @Input() public placeholder: string;
    @Input() public class: string;
    @Input() public groupClass: string;
    @Input() public hasIcon: boolean;

    constructor() { }

    ngOnInit() { }
}
