import { Component, OnInit, Input } from '@angular/core';

import { DebuggerService } from '../../../shared/services';

/**
 * @whatItDoes
 * Generic projeto Form Debug Component
 * Form Debug Component must subscribe for all 'emitters' events
 *
 * @howToUse
 * Use HTML selector: `<form-debug [element]="element"></form-debug>`
 *
 * @example
 * ```html
 * <form-debug [element]="form"></form-debug>
 * ```
 *
 * NgModule: `{ imports: [ WzaModule ] }`
 */
@Component({
    selector: 'form-debug',
    templateUrl: './form-debug.component.html',
    styleUrls: ['./form-debug.component.sass']
})
export class FormDebugComponent implements OnInit {

    @Input() type: string;
    @Input() element;
    @Input() isDebug;

    constructor(private _debugger: DebuggerService) {
        this.isDebug = this._debugger.enabled('form');
    }

    ngOnInit() {
    }

}
