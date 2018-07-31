import { ValidatorFn, AbstractControl } from '@angular/forms';

function emailValidator(abstractControl: AbstractControl): ValidatorFn {

    const _emailRegExp: RegExp = /^[a-zA-Z0-9\._-]{3,}@([a-zA-Z0-9\._-]{2,}\.)[a-zA-Z-0-9]{2,3}/;

    function validator() {
        if (!abstractControl.value) { return; }

        if (typeof abstractControl.value !== 'string') {
            throw new Error('E-mail must be a string.');
        }

        if (!_emailRegExp.test(abstractControl.value)) {
            return buildResponse(false);
        } else {
            return buildResponse(true);
        }
    }

    function buildResponse(isValid: boolean): any {
        return isValid ? null : { message: 'E-mail inválido' };
    }

    return validator();
}

export default emailValidator;
