import { ValidatorFn, AbstractControl } from '@angular/forms';

function onlyNumbersValidator(abstractControl: AbstractControl): ValidatorFn {
    const _numbersRegExp: RegExp = /^[0-9]/g;

    function validator(): any {
        if (!abstractControl.value) { return; }

        if (typeof abstractControl.value !== 'string') {
            throw new Error('Input value must be a string.');
        }

        return buildResponse(_numbersRegExp.test(abstractControl.value));
    }

    function buildResponse(isValid: boolean): any {
        return isValid ? null : { message: 'Digite apenas números.' };
    }

    return validator();
}

export default onlyNumbersValidator;
