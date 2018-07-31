import ModelBase from '../model-base/model-base.model';

class Modality extends ModelBase {
    public static NEW_LINE = 'novaLinha';
    public static UPDATE_PLAIN = 'portabilidade';
    public static MIGRATE = 'migracao';
    public static UPGRADE = 'upgrade';

    private _id: number;
    private _name: string;

    constructor(attrs: { id: number, name: string }, objectBuilder?: boolean) {
        super(objectBuilder);

        this.id = attrs.id;
        this.name = attrs.name;
    }

    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }

    public get name(): string {
        return this._name;
    }
    public set name(v: string) {
        this._name = v;
    }
}

export default Modality;
