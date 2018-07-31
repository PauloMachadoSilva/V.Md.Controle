import ModelBase from '../model-base/model-base.model';

class Address extends ModelBase {

    private _cep: string;
    private _city: string;
    private _neighborhood: string;
    private _number: string;
    private _complement: string;
    private _patio: string;
    private _reference: string;
    private _state: string;
    private _street: string;

    constructor(
        attrs: {
            cep: string,
            city: string,
            neighborhood: string,
            number: string,
            complement: string,
            patio: string,
            reference: string,
            state: string,
            street: string
        },
        objectBuilder?: boolean
    ) {
        super(objectBuilder);

        this.cep = attrs.cep;
        this.city = attrs.city;
        this.neighborhood = attrs.neighborhood;
        this.number = attrs.number;
        this.complement = attrs.complement;
        this.patio = attrs.patio;
        this.reference = attrs.reference;
        this.state = attrs.state;
        this.street = attrs.street;
    }

    public getCompleteAddress(): string {
        return this.street + ' ' + this.number;
    }

    public getFormattedCep(): string {
        // let cep = this.cep;
        // try {
        //     cep = this.cep.substring(0, 2) + '.' + this.cep.substring(2, 5) + '-' + this.cep.substring(5);
        // } catch (error) { return; }

        // return cep;
        return this.cep.substring(0, 2) + '.' + this.cep.substring(2, 5) + '-' + this.cep.substring(5);
    }

    public get cep(): string {
        return this._cep;
    }
    public set cep(v: string) {
        if (v == null) { return; }

        v = v.replace(/\D/g, '');
        this._cep = v;
    }

    public get city(): string {
        return this._city;
    }
    public set city(v: string) {
        this._city = v;
    }

    public get neighborhood(): string {
        return this._neighborhood;
    }
    public set neighborhood(v: string) {
        this._neighborhood = v;
    }

    public get number(): string {
        return this._number;
    }
    public set number(v: string) {
        this._number = v;
    }

    public get complement(): string {
        return this._complement;
    }
    public set complement(v: string) {
        this._complement = v;
    }

    public get patio(): string {
        return this._patio;
    }
    public set patio(v: string) {
        this._patio = v;
    }

    public get reference(): string {
        return this._reference;
    }
    public set reference(v: string) {
        this._reference = v;
    }

    public get state(): string {
        return this._state;
    }
    public set state(v: string) {
        this._state = v;
    }

    public get street(): string {
        return this._street;
    }
    public set street(v: string) {
        this._street = v;
    }
}

export default Address;
