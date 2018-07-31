import ModelBase from '../model-base/model-base.model';

class ProjectConfig extends ModelBase {

    private _ddd: number;
    private _uf: string;
    private _platform: string;
    private _sku: string;

    constructor(
        attrs: {
            ddd: number,
            uf: string,
            platform: string,
            sku: string
        },
        objectBuilder?: boolean) {
        super(objectBuilder);

        this._ddd = attrs.ddd;
        this._uf = attrs.uf;
        this._platform = attrs.platform;
        this._sku = attrs.sku;
    }

    public get ddd(): number {
        return this._ddd;
    }
    public set ddd(v: number) {
        this._ddd = v;
    }

    public get uf(): string {
        return this._uf;
    }
    public set uf(v: string) {
        this._uf = v;
    }

    public get platform(): string {
        return this._platform;
    }
    public set platform(v: string) {
        this._platform = v;
    }

    public get sku(): string {
        return this._sku;
    }
    public set sku(v: string) {
        this._sku = v;
    }
}

export default ProjectConfig;
