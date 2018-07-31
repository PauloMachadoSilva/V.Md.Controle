import ModelBase from '../model-base/model-base.model';

class BKO extends ModelBase {

    private _bkoAttendantId: string;
    private _originCode: string;

    constructor(attrs: { bkoAttendantId: string, originCode: string }, objectBuilder?: boolean) {
        super(objectBuilder);

        this.bkoAttendantId = attrs.bkoAttendantId;
        this.originCode = attrs.originCode;
    }

    public get bkoAttendantId(): string {
        return this._bkoAttendantId;
    }
    public set bkoAttendantId(v: string) {
        this._bkoAttendantId = v;
    }

    public get originCode(): string {
        return this._originCode;
    }
    public set originCode(v: string) {
        this._originCode = v;
    }

}

export default BKO;
