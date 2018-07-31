import { WzaValidType } from './../validation/wza-validator.type';

export interface WzaFormBuilderInterface {
    name: string;
    value?: string;
    type?: WzaValidType;
    required?: boolean;
    error?: string;
}
