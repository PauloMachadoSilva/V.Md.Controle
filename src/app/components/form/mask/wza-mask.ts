import { WzaValidType } from './../validation/wza-validator.type';

export class WzaMask {
    public static get(validType: WzaValidType): string {
        let maskRule: string = null;

        switch (validType) {
            case WzaValidType.SMS_TOKEN:
                maskRule = '0000';
            break;

            case WzaValidType.CEP:
                maskRule = '00000-000';
            break;

            case WzaValidType.CPF:
                maskRule = '000.000.000-00';
            break;

            case WzaValidType.DATE:
            case WzaValidType.BIRTH_DATE:
                maskRule = '00/00/0000';
            break;

            case WzaValidType.PHONE:
                maskRule = '(00) 00000-00009';
            break;

            case WzaValidType.CELL_PHONE:
                maskRule = '(00) 00000-0000';
                break;
        }

        // return (maskRule !== null) ? { mask: maskRule } : maskRule;
        return maskRule;
    }

    // public static format(value: string, validType: WzaValidType): string {
    //     return conformToMask(value, WzaMask.get(WzaValidType.CELL_PHONE).mask, { guide: false }).conformedValue;
    // }
}
