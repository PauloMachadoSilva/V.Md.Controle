import { ValidatorFn, AbstractControl } from '@angular/forms';

function onlyLettersValidator(abstractControl: AbstractControl): ValidatorFn {
    const _lettersRegExp: RegExp = /[^-'a-zA-Z\u00C0-\u017F\s]/gi;

    function validator(): any {
        if (!abstractControl.value) { return; }

        if (typeof abstractControl.value !== 'string') {
            throw new Error('Input value must be a string.');
        }

        if (_lettersRegExp.test(abstractControl.value)) {
            return buildResponse(false);
        } else {
            return buildResponse(true);
        }
    }


    function buildResponse(isValid: boolean): any {
        return isValid ? null : { message: 'Digite apenas letras.' };
    }

    return validator();
}

export default onlyLettersValidator;
