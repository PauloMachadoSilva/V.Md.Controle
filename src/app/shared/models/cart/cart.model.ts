import ModelBase from '../model-base/model-base.model';
import {
    Address,
    Modality,
    PersonalData,
    Plan
} from '../';

class Cart extends ModelBase {

    address: Address;
    cartUid: string;
    dueDate: string;
    modality: Modality;
    nextStep: number;
    orderCode: string;
    orderDate: string;
    personalData: PersonalData;
    plan: Plan;

    constructor(
        attrs: {
            address: Address,
            cartUid: string,
            dueDate: string,
            modality: Modality,
            nextStep: number,
            orderCode: string,
            orderDate: string,
            personalData: PersonalData,
            plan: Plan
        },
        objectBuilder?: boolean
    ) {
        super(objectBuilder);

        this.dueDate = attrs.dueDate;
        this.address = attrs.address;
        this.cartUid = attrs.cartUid;
        this.modality = attrs.modality;
        this.nextStep = attrs.nextStep;
        this.orderCode = attrs.orderCode;
        this.orderDate = attrs.orderDate;
        this.personalData = attrs.personalData;
        this.plan = attrs.plan;
    }
}


export default Cart;
