import { ValidatorFn, AbstractControl } from '@angular/forms';

function noSpecialCharsValidator(abstractControl: AbstractControl): ValidatorFn {

    const _specialCharsRegExp: RegExp = /[^\w\s]/gi;

    function validator() {
        if (!abstractControl.value) { return; }

        if (typeof abstractControl.value !== 'string') {
            throw new Error('Input value must be a string.');
        }

        if (_specialCharsRegExp.test(abstractControl.value)) {
            return buildResponse(false);
        } else {
            return buildResponse(true);
        }
    }

    function buildResponse(isValid: boolean): any {
        return isValid ? null : {message: 'Não é permitido caracteres especiais.' };
    }

    return validator();
}

export default noSpecialCharsValidator;
