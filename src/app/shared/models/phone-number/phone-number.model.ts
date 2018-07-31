import ModelBase from '../model-base/model-base.model';

import { WzaMask } from './../../../components/form/mask/wza-mask';
import { WzaValidType } from './../../../components/form/validation/wza-validator.type';

class PhoneNumber extends ModelBase {

    private _ddd: string;
    private _number: string;

    constructor(attrs: { ddd: string, number: string }, objectBuilder?: boolean) {
        super(objectBuilder);

        this.ddd = attrs.ddd;
        this.number = attrs.number;
    }

    public get ddd(): string {
        return this._ddd;
    }
    public set ddd(v: string) {
        this._ddd = v;
    }

    public get number(): string {
        return this._number;
    }
    public set number(v: string) {
        this._number = v;
    }

    public get mount(): string {
        if (this._ddd == null || this._number == null) {
            return '';
        }

        return '(' + this._ddd + ') ' + this._number;
        // return WzaMask.format(this._ddd + this._number, WzaValidType.CELL_PHONE);
    }
}

export default PhoneNumber;
