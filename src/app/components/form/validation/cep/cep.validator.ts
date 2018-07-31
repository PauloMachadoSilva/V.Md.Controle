import { ValidatorFn, AbstractControl } from '@angular/forms';

function cepValidator(abstractControl: AbstractControl): ValidatorFn {

    const _cepRegExp: RegExp = /^([0-9]){5}-?([0-9]{3,4})?$/gm;

    function validator() {
        if (!abstractControl.value) { return; }

        if (typeof abstractControl.value !== 'string') {
            throw new Error('CEP must be a string.');
        }

        if (!_cepRegExp.test(abstractControl.value)) {
            return buildResponse(false);
        } else {
            return buildResponse(true);
        }
    }

    function buildResponse(isValid: boolean): any {
        return isValid ? null : { message: 'CEP inválido.' };
    }

    return validator();
}

export default cepValidator;
