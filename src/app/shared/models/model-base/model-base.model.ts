
abstract class ModelBase {

    private _createdTimestamp: Date;

    constructor(objectBuilder: boolean = false) {
        if (!objectBuilder) {
            this.setCreatedTimestamp();
        }
    }

    private setCreatedTimestamp(): void {
        this._createdTimestamp = new Date();
    }

    public get createdTimestamp(): Date {
        return this._createdTimestamp;
    }
}

export default ModelBase;
