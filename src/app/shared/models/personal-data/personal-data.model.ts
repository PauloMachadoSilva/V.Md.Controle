import ModelBase from '../model-base/model-base.model';
import PhoneNumber from '../phone-number/phone-number.model';

class PersonalData extends ModelBase {

    public name: string;
    public motherName: string;
    public birthdate: Date;
    public cpf: string;
    public phoneNumber: PhoneNumber;
    public email: string;

    constructor(
        attrs: {
            name: string,
            motherName: string,
            birthdate: Date,
            cpf: string,
            phoneNumber: PhoneNumber,
            email: string
        },
        objectBuilder?: boolean
    ) {
        super(objectBuilder);

        this.email = attrs.email;
        this.name = attrs.name;
        this.motherName = attrs.motherName;
        this.birthdate = attrs.birthdate;
        this.cpf = attrs.cpf;
        this.phoneNumber = attrs.phoneNumber;
    }

    public firstName(): string {
        return (!this.name)
                ? this.name
                : this.name.trim().split(' ')[0];
    }

}


export default PersonalData;
