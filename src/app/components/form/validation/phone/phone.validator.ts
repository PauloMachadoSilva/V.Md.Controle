import { ValidatorFn, AbstractControl } from '@angular/forms';
import { Formatter } from '../../../../shared/utils';

function phoneValidator(abstractControl: AbstractControl): ValidatorFn {

    const _numberRegExp: RegExp = /^([6-9]{1}[0-9]{8}|[2-5]{1}[0-9]{7})$/mg;
    const _dddRegExp: RegExp = new RegExp(
        '^(11|12|13|14|15|16|17|18|19|22|21|24|' +
        '27|28|31|32|33|34|35|37|38|41|42|43|44' +
        '|45|46|47|48|49|51|53|54|55|61|62|63|6' +
        '4|65|66|67|68|69|71|73|74|75|77|79|81|' +
        '82|83|84|85|86|87|88|89|91|92|93|94|95' +
        '|96|97|98|99)$', 'mg');

    function validator() {
        let value = abstractControl.value;
        if (!value) { return; }

        if (typeof value !== 'string') {
            throw new Error('Cell phone must be a string.');
        }

        value = Formatter.removeSpecialChars(abstractControl.value, true);

        const ddd: string = value.substring(0, 2);
        const number: string = value.substring(2, value.length);

        if (!_dddRegExp.test(ddd) || !_numberRegExp.test(number)) {
            return buildResponse(false);
        } else {
            return buildResponse(true);
        }
    }

    function buildResponse(isValid: boolean): any {
        return isValid ? null : { message: 'Telefone Inválido' };
    }

    return validator();
}

export default phoneValidator;
