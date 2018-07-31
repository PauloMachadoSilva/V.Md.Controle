import { Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AbstractControl } from '@angular/forms/src/model';

import { WzaMessage } from '../../../shared/utils';
import { WzaValidType } from './wza-validator.type';

import {
    addressValidator,
    birthdateValidator,
    cepValidator,
    cpfValidator,
    dateValidator,
    dddValidator,
    emailValidator,
    nameValidator,
    noSpecialCharsValidator,
    onlyLettersValidator,
    onlyNumbersValidator,
    phoneValidator,
    cellPhoneValidator
} from '.';

export class WzaValidator {
    public static builder(...validTypeList: Array<WzaValidType>): Array<ValidatorFn | null> {
        let validations = [];
        validTypeList.forEach(
            (validType: WzaValidType) =>
                validations = validations.concat(WzaValidator.getValidation(validType))
        );

        return validations;
    }

    public static getValidation(validType: WzaValidType): Array<ValidationErrors | null> {
        switch (validType) {
            case WzaValidType.REQUIRED:         return [ Validators.required ];
            case WzaValidType.ADDRESS:          return [ addressValidator ];
            case WzaValidType.BIRTH_DATE:       return [ birthdateValidator ];
            case WzaValidType.CELL_PHONE:       return [ cellPhoneValidator ];
            case WzaValidType.CEP:              return [ cepValidator ];
            case WzaValidType.CPF:              return [ cpfValidator ];
            case WzaValidType.DATE:             return [ dateValidator ];
            case WzaValidType.DDD:              return [ dddValidator ];
            case WzaValidType.EMAIL:            return [ emailValidator ];
            case WzaValidType.NAME:             return [ nameValidator ];
            case WzaValidType.NO_SPECIAL_CHARS: return [ noSpecialCharsValidator ];
            case WzaValidType.ONLY_LETTERS:     return [ onlyLettersValidator ];
            case WzaValidType.SMS_TOKEN:         return [ onlyNumbersValidator ];
            case WzaValidType.ONLY_NUMBER:      return [ onlyNumbersValidator ];
            case WzaValidType.PHONE:            return [ phoneValidator ];
        }

        return null;
    }
}
