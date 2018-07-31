import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { WzaFormControl } from '../../builder/wza-form-control';

/**
 * @whatItDoes
 * Generic projeto form input field component
 *
 * @howToUse
 * Use HTML selector: `<wza-input></wza-input>`
 *
 * @example
 * ```html
 * <wza-input
 *      field="WzaFormControl"
 *      type="string"
 *      id="string"
 *      label="string"
 *      class="string"
 *      groupClass="string"
 *      placeholder="string"
 *      hasIcon="boolean"
 *      maxLength="number"
 *      minLength="number"
 *      (blur)="function($event)"
 *></wza-input>
 * ```
 *
 * NgModule: `{ imports: [ WzaFormModule ] }`
 *
 * @todo Check for more implementations that may be needed. Ex.: events, properties, etc
 */
@Component({
    selector: 'wza-input',
    templateUrl: './wza-input.component.html',
    styleUrls: ['./wza-input.component.sass']
})
export class WzaInputComponent implements OnInit {

    @Input() public field: WzaFormControl;
    @Input() public type = 'text';
    @Input() public id: string;
    @Input() public label: string;
    @Input() public class: string;
    @Input() public groupClass: string;
    @Input() public placeholder = '';
    @Input() public hasIcon: boolean;
    @Input() public maxLength: number;
    @Input() public minLength: number;

    @Output() public blur = new EventEmitter<string>();

    // @Input() public accesskey: any;
    // @Input() public autocomplete: any;
    // @Input() public autofocus: any;
    // @Input() public directives: any;
    // @Input() public disabled: any;
    // @Input() public error: any;
    // @Input() public hasIcon = false;
    // @Input() public idInput: any;
    // @Input() public label: string;
    // @Input() public mask: any;
    // @Input() public maxlength: any;
    // @Input() public minlength: any;
    // @Input() public model: any;
    // @Input() public nameInput: any;
    // @Input() public onblurEvent: any;
    // @Input() public onfocusEvent: any;
    // @Input() public onkeyupEvent: any;
    // @Input() public placeholder: any;
    // @Input() public required: any;
    // @Input() public success: any;
    // @Input() public tabIndex: any;

    constructor(
    ) {
    }

    ngOnInit() {
        this.field.enableCssError = (this.field.value !== null && this.field.value !== '');
        // this._renderer.setAttribute(this.input.element.nativeElement, 'maxlength', '2');
    }

    onBlur(event) {
        this.blur.emit(event);
    }
}
