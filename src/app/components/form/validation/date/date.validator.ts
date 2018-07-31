import { ValidatorFn, AbstractControl } from '@angular/forms';

function dateValidator(abstractControl: AbstractControl): ValidatorFn {

    const _dateRegExp: RegExp = /^(0[1-9]|[12]\d|3[01]).(0[1-9]|1[0-2]).(19|20)\d{2}$/gm;

    function validator() {

        if (!abstractControl.value) { return; }

        if (typeof abstractControl.value !== 'string') {
            throw new Error('Birthdate must be a string.');
        }

        if (!_dateRegExp.test(abstractControl.value)) {
            return buildResponse(false);
        } else {
            return buildResponse(true);
        }

    }

    function buildResponse(isValid: boolean): any {
        return isValid ? null : { message: 'Data inválida.' };
    }

    return validator();
}

export default dateValidator;
