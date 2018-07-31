import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cpf'
})
export class CPFPipe implements PipeTransform {

    transform(value: string | number): string | never {

        value = typeof value === 'string' ? value : value.toString();

        if (value.length !== 11) {
            throw new Error('Invalid CPF format.');
        }

        value = value.replace(/\D/g, '');
        value = value.substring(0, 3) + '.' +
                value.substring(3, 6) + '.' +
                value.substring(6, 9) + '-' +
                value.substring(9, 11);

        return value;
    }
}
