import ModelBase from '../model-base/model-base.model';

export interface PlanInterface {
    name: string;
    skuCode: string;
    complement: any;
    completeName: string;
    description: any;
    maxDependents: number;
    maxFreeDependents: number;
    price: string;
}

class Plan extends ModelBase implements PlanInterface {
    public name: string;
    public skuCode: string;
    public complement: any;
    public completeName: string;
    public description: any;
    public price: string;
    public maxDependents: number;
    public maxFreeDependents: number;

    constructor(
        json: PlanInterface,
        objectBuilder?: boolean
    ) {
        super(objectBuilder);

        this.name = json.name;
        this.skuCode = json.skuCode;
        this.complement = json.complement;
        this.completeName = json.completeName;
        this.description = json.description;
        this.maxDependents = json.maxDependents;
        this.maxFreeDependents = json.maxFreeDependents;
        this.price = json.price;
    }
}

export default Plan;
