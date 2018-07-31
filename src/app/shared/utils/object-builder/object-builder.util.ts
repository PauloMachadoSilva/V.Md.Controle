import { isNull } from 'util';
import {
    Address,
    Analytics,
    BKO,
    Cart,
    CRM,
    DTO,
    Modality,
    PersonalData,
    PhoneNumber,
    Plan,
    ProjectConfig
} from '../../models';

class ObjectBuilder {

    public static buildMaturityObject(json: any): Array<{ day: number, default: boolean }> {

        const list = new Array<{ day: number, default: boolean }>();

        json.forEach(element => {
            list.push(element);
        });

        return list;
    }

    // // The method bellow must remain the only public
    // // object builder to enforce that all storage
    // // requests go through the 'DTOStorageService'.
    public static buildDTOObject(json: any): DTO {
        json = this._jsonConverter(json) || {
            _analytics: null,
            _bko: null,
            _cart: null,
            _originCode: null,
            _projectConfig: null,
            _sessionUid: null
        };

        return new DTO({
                analytics: this.buildAnalyticsObject(json._analytics),
                bko: this.buildBKOObject(json._bko),
                cart: this.buildCartObject(json._cart),
                originCode: json._originCode,
                crm: this.buildProjectCRMObject(json._crm),
                projectConfig: this.buildProjectConfigObject(json._projectConfig),
                sessionUid: json._sessionUid
            },
            true // objectBuilder?
        );
    }

    public static buildCartObject(json: any): Cart {
        json = this._jsonConverter(json) || {
            _address: null,
            _cartUid: null,
            _dueDate: null,
            _modality: null,
            _nextStep: null,
            _orderCode: null,
            _orderDate: null,
            _personalData: null,
            _plan: null,
        };

        return new Cart({
            address: this.buildAddressObject(json._address),
            cartUid: json._cartUid,
            dueDate: json._dueDate,
            modality: this.buildModalityObject(json._modality),
            nextStep: json._nextStep,
            orderCode: json._orderCode,
            orderDate: json._orderDate,
            personalData: this.buildPersonalDataObject(json._personalData),
            plan: this.buildPlanObject(json._plan),
        }, true);
    }

    public static buildPlanObject(json: any): Plan {
        json = this._jsonConverter(json) || {
            _complement: null,
            _completeName: null,
            _description: null,
            _maxDependents: null,
            _maxFreeDependents: null,
            _name: null,
            _price: null,
            _skuCode: null,
        };
        return new Plan({
            complement: json._complement,
            completeName: json._completeName,
            description: json._description,
            maxDependents: json._maxDependents,
            maxFreeDependents: json._maxFreeDependents,
            name: json._name,
            price: json._price,
            skuCode: json._skuCode,
        }, true);
    }

    public static buildProjectConfigObject(json: any): ProjectConfig {
        json = this._jsonConverter(json) || {
            _ddd: null,
            _uf: null,
            _platform: null,
            _plan: null,
            _sku: null
        };

        return new ProjectConfig({
            ddd: json._ddd,
            uf: json._uf,
            platform: json._platform,
            sku: json._sku,
        }, true);
    }

    public static buildModalityObject(json: any): Modality {
        json = this._jsonConverter(json) || {
            _id: null,
            _name: null
        };

        return new Modality({
            id: json._id,
            name: json._name
        }, true);
    }

    public static buildPersonalDataObject(json: any): PersonalData {
        json = this._jsonConverter(json) || {
            _name: null,
            _motherName: null,
            _birthdate: null,
            _cpf: null,
            _phoneNumber: null,
            _email: null
        };

        return new PersonalData({
            name: json._name,
            motherName: json._motherName,
            birthdate: json._birthdate,
            cpf: json._cpf,
            phoneNumber: this.buildPhoneNumberObject(json._phoneNumber),
            email: json._email,
        }, true);
    }

    public static buildPhoneNumberObject(json: any): PhoneNumber {
        json = this._jsonConverter(json) || {
            _ddd: null,
            _number: null
        };

        return new PhoneNumber({
            ddd: json._ddd,
            number: json._number
        }, true);
    }

    public static buildProjectCRMObject(json: any): CRM {
        json = this._jsonConverter(json) || {
            _uid: null,
            _campaign: null
        };

        return new CRM({
            uid: json._uid,
            campaign: json._campaign
        }, true);
    }

    public static buildAddressObject(json: any): Address {
        json = this._jsonConverter(json) || {
            _cep: null,
            _city: null,
            _neighborhood: null,
            _number: null,
            _complement: null,
            _patio: null,
            _reference: null,
            _state: null,
            _street: null
        };

        return new Address({
            cep: json._cep,
            city: json._city,
            neighborhood: json._neighborhood,
            number: json._number,
            complement: json._complement,
            patio: json._patio,
            reference: json._reference,
            state: json._state,
            street: json._street
        }, true);
    }

    // // Privates

    private static buildAnalyticsObject(json: any): Analytics {
        return (!json) ? null : new Analytics({
            crmCampaign: json._crmCampaign,
            utmCampaign: json._utmCampaing,
            utmContent: json._utmContent,
            utmMedia: json._utmMedia,
            utmPartner: json._utmPartner,
            utmSource: json._utmSource,
            utmTerm: json._utmTerm
        }, true);
    }

    private static buildBKOObject(json: any): BKO {
        return (!json) ? null : new BKO({
                bkoAttendantId: json._bkoAttendantId,
                originCode: json._originCode
            },
            true // objectBuilder?
        );
    }

    private static _jsonConverter(json: any): any {
        if (!json) {
            return null;
        }

        const json2: any = {};

        for (const key of Object.keys(json)) {
            json2[(!key.startsWith('_') ? '_' : '') + key] = json[key];
        }

        return json2;
    }
}

export default ObjectBuilder;
