import ModelBase from '../model-base/model-base.model';

class State extends ModelBase {
    private _abbr: string;
    private _description: string;
    private _dddList: Array<string>;
    private _isSelected: boolean;

    constructor(
        attrs: {
            abbr: string;
            description: string;
            dddList: Array<string>;
            isSelected: boolean;
        },
        objectBuilder?: boolean
    ) {
        super(objectBuilder);

        this._abbr = attrs.abbr;
        this._description = attrs.description;
        this._dddList = attrs.dddList;
        this._isSelected = attrs.isSelected;
    }

    public get abbr(): string {
        return this._abbr;
    }

    public set abbr(v: string) {
        this._abbr = v;
    }

    public get description(): string {
        return this._description;
    }

    public set description(v: string) {
        this._description = v;
    }

    public get dddList(): Array<string> {
        return this._dddList;
    }

    public set dddList(v: Array<string>) {
        this._dddList = v;
    }

    public set addDdd(v: string) {
        this._dddList.push(v);
    }

    public get isSelected(): boolean {
        return this._isSelected;
    }

    public set isSelected(v: boolean) {
        this._isSelected = v;
    }
}

export default State;
