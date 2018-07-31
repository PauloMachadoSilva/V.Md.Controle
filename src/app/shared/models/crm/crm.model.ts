import ModelBase from '../model-base/model-base.model';

class CRM extends ModelBase {

    private _uid: string;
    private _campaign: string;

    constructor(attrs: { uid: string, campaign: string }, objectBuilder?: boolean) {
        super(objectBuilder);

        this.uid = attrs.uid;
        this.campaign = attrs.campaign;
    }

    public get uid(): string {
        return this._uid;
    }
    public set uid(v: string) {
        this._uid = v;
    }

    public get campaign(): string {
        return this._campaign;
    }
    public set campaign(v: string) {
        this._campaign = v;
    }

}

export default CRM;
