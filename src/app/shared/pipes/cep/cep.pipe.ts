import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cep'
})
export class CEPPipe implements PipeTransform {

    transform(value: string | number): string | never {

        value = typeof value === 'string' ? value : value.toString();

        if (value.length < 5) {
            throw new Error('Invalid CEP.');
        }

        value = value.replace(/\D/g, '');
        value = value.substring(0, 2) + '.' +
                value.substring(2, 5) + '-' +
                value.substring(5);

        return value;
    }

}
