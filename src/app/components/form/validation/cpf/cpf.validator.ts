import { ValidatorFn, AbstractControl } from '@angular/forms';

function cpfValidator(abstractControl: AbstractControl): ValidatorFn {

    function validator() {
        if (!abstractControl.value || abstractControl.value === '') { return buildResponse(false); }

        if (typeof abstractControl.value !== 'string') {
            throw new Error('CPF must be a string.');
        }

        const digits: string = abstractControl.value.replace(/\D+/g, '');
        if (digits.length < 11 ||
            digits === '00000000000' ||
            digits === '11111111111' ||
            digits === '22222222222' ||
            digits === '33333333333' ||
            digits === '44444444444' ||
            digits === '55555555555' ||
            digits === '66666666666' ||
            digits === '77777777777' ||
            digits === '88888888888' ||
            digits === '99999999999' ||
            digits === '') {
                return buildResponse(false);
            } else {
                // const firstDigit: string = getDigit(parseInt(digits.substring(0, 10), 10)).toString();
                // const secondDigit: string = getDigit(parseInt(digits.substring(0, 11), 10), false).toString();
                // const final: string = digits.substring(9);

                // console.log('===> ', final);
                // console.log('aaa> ', firstDigit, secondDigit);

                // if (final === firstDigit + secondDigit) {
                //     return buildResponse(true);
                // } else {
                //     return buildResponse(false);
                // }

                let sum;
                let rest;
                sum = 0;

                if (digits === '00000000000') {
                    return buildResponse(false);
                }

                for (let i = 1; i <= 9; i++) {
                    sum = sum + parseInt(digits.substring(i - 1, i), 10) * (11 - i);
                }
                rest = (sum * 10) % 11;

                if ((rest === 10) || (rest === 11)) {
                    rest = 0;
                }

                if (rest !== parseInt(digits.substring(9, 10), 10) ) {
                    return buildResponse(false);
                }

                sum = 0;
                for (let i = 1; i <= 10; i++) {
                    sum = sum + parseInt(digits.substring(i - 1, i), 10) * (12 - i);
                }
                rest = (sum * 10) % 11;

                if ((rest === 10) || (rest === 11))  {
                    rest = 0;
                }
                if (rest !== parseInt(digits.substring(10, 11), 10) ) {
                    return buildResponse(false);
                }

                return buildResponse(true);
            }
        }

        function getDigit(v: number, isFirstDigit: boolean = true): number {
            const matrix = isFirstDigit ? [10, 9, 8, 7, 6, 5, 4, 3, 2] : [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

            let total = 0;
            const max: number = isFirstDigit ? 9 : 10;
            let i: number;
            for (i = 0; i < max; i++) {
                total += parseInt(v.toString()[i], 10) * matrix[i];
            }

            return ((total % 11) < 2) ? 0 : (11 - (total % 11));
        }

        function buildResponse(isValid: boolean): any {
            return isValid ? null : { message: 'CPF inválido.' };
        }

    return validator();
}

export default cpfValidator;
