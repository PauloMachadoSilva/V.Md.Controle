import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

    transform(value: string | number, hasDDD: boolean = true): string | never {
        value = typeof value === 'string' ? value : value.toString();

        if ((value.length < 10 && hasDDD) || (value.length < 8 && !hasDDD)) {
            throw new Error('Invalid phone number.');
        }

        let splitterPosition: number;
        if (!hasDDD) {
            splitterPosition = value.length < 9 ? 4 : 5;
            value = value.substring(0, splitterPosition) + '-' +
                    value.substring(splitterPosition);
        } else {
            splitterPosition = value.length < 11 ? 6 : 7;
            value = '(' + value.substring(0, 2) + ') ' +
                    value.substring(2, splitterPosition) + '-' +
                    value.substring(splitterPosition);
        }

        return value;
    }
}
