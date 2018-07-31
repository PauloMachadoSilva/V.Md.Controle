import { ValidatorFn, AbstractControl } from '@angular/forms';

function birthdateValidator(abstractControl: AbstractControl): ValidatorFn {

    function validator() {
        if (!abstractControl.value) { return; }

        if (typeof abstractControl.value !== 'string') {
            throw new Error('Birthdate must be a string.');
        }

        const splitted: Array<string> = abstractControl.value.split('/');
        const date: Date = new Date(parseInt(splitted[2], 10), parseInt(splitted[1], 10) - 1, parseInt(splitted[0], 10));
        const today: Date = new Date();
        const age: number = today.getFullYear() - date.getFullYear();

        if (age < 18 ||
            parseInt(splitted[2], 10) < 1900 ||
            parseInt(splitted[1], 10) > 12 ||
            parseInt(splitted[0], 10) > 31 ||
            abstractControl.value.length !== 10
        ) {
            return buildResponse(false);
        } else {
            return buildResponse(true);
        }

    }

    function buildResponse(isValid: boolean): any {
        return isValid ? null : { message: 'Data de aniversário inválida.' };
    }

    return validator();
}

export default birthdateValidator;
