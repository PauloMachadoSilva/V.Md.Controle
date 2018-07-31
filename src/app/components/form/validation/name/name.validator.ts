import { ValidatorFn, AbstractControl } from '@angular/forms';

function nameValidator(abstractControl: AbstractControl): ValidatorFn {

    const _nameRegExp: RegExp = /[-'a-zA-Z\u00C0-\u017F]{2,}[\s]{1,}[a-zA-Z\u00C0-\u017F]{2,}.*/;

    function validator() {
        if (!abstractControl.value) { return; }

        if (typeof abstractControl.value !== 'string') {
            throw new Error('Name must be a string.');
        }

        if (!_nameRegExp.test(abstractControl.value)) {
            return buildResponse(false);
        } else {
            return buildResponse(true);
        }
    }

    function buildResponse(isValid: boolean): any {
        return isValid ? null : { message: 'Nome inválido.' };
    }

    return validator();
}

export default nameValidator;
