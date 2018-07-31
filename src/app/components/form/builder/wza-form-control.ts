import { FormControl, ValidatorFn,  } from '@angular/forms';
import { AbstractControlOptions } from '@angular/forms/src/model';

import { WzaOptionInterface } from '../field/wza-select/wza-options.interfaces';
import { WzaValidType } from '../validation/wza-validator.type';
import { WzaValidator } from '../validation/wza-validator';
import { WzaMask } from '../mask/wza-mask';

export class WzaFormControl extends FormControl {
    public mask: any;
    public name: string;
    public itens: Array<WzaOptionInterface>;
    public errorMessage: string;
    public readonly: boolean;
    public focus: boolean;
    public enableCssError: boolean;

    constructor(name: string, value: any, required: boolean, type: WzaValidType) {
        const valid = [];
        if (type) {
            valid.push(type);
        }

        if (required) {
            valid.push(WzaValidType.REQUIRED);
        }

        super(value, WzaValidator.builder.apply(null, valid));

        this.enableCssError = false;
        this.focus = false;

        this.name = name;
        this.mask = WzaMask.get(type);
    }

    toggleEnabledByValue(value: string) {
        this.setValue(value);
        this.readonly = (value && value.trim() !== '');
    }

    changeValidType(type: WzaValidType) {
        const valid = [];
        if (type) {
            valid.push(type);
        }

        this.mask = WzaMask.get(type);
        this.setValidators(WzaValidator.builder.apply(null, valid));
    }
}
