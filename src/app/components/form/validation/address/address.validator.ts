import { ValidatorFn, AbstractControl } from '@angular/forms';

function addressValidator(abstractControl: AbstractControl): ValidatorFn {
    const _accentRegExp: RegExp = /[^\sa-záàâãéèêíïóôõöúçñA-ZÁÀÂÃÉÈÊÍÏÓÒÖÚÇÑ0-9\,]/gi;

    function validator(): any {
        if (!abstractControl.value) { return; }

        if (typeof abstractControl.value !== 'string') {
            throw new Error('Input value must be a string.');
        }

        if (_accentRegExp.test(abstractControl.value)) {
            return buildResponse(false);
        } else {
            return buildResponse(true);
        }
    }

    function buildResponse(isValid: boolean): any {
        return isValid ? null : { message: 'Endereço inválido.' };
    }

    return validator();
}

export default addressValidator;
