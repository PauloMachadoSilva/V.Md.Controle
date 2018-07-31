import { Injectable } from '@angular/core';

import { ConstantsService } from '../config/constants.service';
import { DTOStorageService } from '../dto-storage/dto-storage.service';
import { HttpAPIService } from '../http/http.api.service';
import { APIPlanService } from '../api-plan/api.plan.service';
import { CartDataResponse, CartUpdateResponse, CartResumeResponse } from './api.cart.service.interfaces';
import { ErrorMessageFormatter, Formatter, ObjectBuilder, StorageAccessor } from '../../utils';
import { DTO, Cart, PhoneNumber, Modality } from '../../models';

@Injectable()
export class APICartService {
    constructor(
        private _constants: ConstantsService,
        private _httpAPIService: HttpAPIService,
        private _apiPlanService: APIPlanService,
        private _dtoStorageService: DTOStorageService
    ) {
    }

    public async makeCart(view: string, email: string): Promise<Cart> {
        const dto = this._dtoStorageService.getDTO();

        const params = {
            CodigoOrigem: dto.originCode,
            CodigoSku: dto.cart.plan.skuCode,
            VendedorUsuario: this._constants.client.seller,
            DddServico: dto.projectConfig.ddd,
            Email: email,
            UidSession: dto.sessionUid,
            View: view,
            Utm: this.buildUtmObject(dto)
        };

        const response = await this._httpAPIService.post<CartDataResponse>('CART_MAKE_A_CART', params);

        const cart: Cart = dto.cart;
        cart.cartUid = response.retorno.uid;

        const maturityList = new Array<{ day: number, default: boolean }>();
        response.retorno.diasVencimento.forEach(item => {
            maturityList.push({ day: item.diaVencimento, default: item.diaPadrao });
        });

        StorageAccessor.set('maturityList', maturityList);

        return cart;
    }

    public async resumeCart(uid: string): Promise<DTO> {
        const params = {
            CodigoOrigem: this._dtoStorageService.getDTO().originCode,
            uid: uid
        };

        const dto: DTO = this._dtoStorageService.getDTO();

        const response = await this._httpAPIService.get<CartResumeResponse>('CART_ANALYTICS_RESUME', params);

        dto.projectConfig = ObjectBuilder.buildProjectConfigObject({
            uf: response.retorno.Uf,
            ddd: response.retorno.DddServico,
            platform: null,
            plan: null,
            sku: response.retorno.CodigoSku
        });

        const address = response.retorno.Endereco ? {
            cep: response.retorno.Endereco.Cep,
            city: response.retorno.Endereco.Cidade,
            neighborhood: response.retorno.Endereco.Bairro,
            number: '',
            complement: '',
            patio: response.retorno.Endereco.Logradouro,
            reference: response.retorno.Endereco.TODO_CHECK_PARAM,
            state: response.retorno.Endereco.Uf,
            street: response.retorno.Endereco.Endereco
        } : null;

        dto.cart = ObjectBuilder.buildCartObject({
            address,
            cartUid: response.retorno.Uid,
            dueDate: response.retorno.DiaVencimentoEscolhido,
            modality: {
                id: response.retorno.CodigoModalidade,
                name: response.retorno.ModalidadeDescricao
            },
            // nextStep: null,
            // orderCode: null,
            // orderDate: null,
            personalData: {
                name: response.retorno.DadosPessoais.Nome,
                motherName: response.retorno.DadosPessoais.NomeMae,
                birthdate: response.retorno.DadosPessoais.Nascimento,
                cpf: response.retorno.DadosPessoais.Cpf,
                phoneNumber: {
                    ddd: response.retorno.DddContato || response.retorno.DddServico,
                    number: response.retorno.LinhaContato || response.retorno.LinhaServico
                },
                email: response.retorno.DadosPessoais.Email
            },
            plan: {
                complement: response.retorno.Complemento,
                completeName: response.retorno.NomeCompleto,
                description: this._apiPlanService.makeJson(response.retorno.Descricao),
                maxDependents: response.retorno.MaximoDependentes,
                maxFreeDependents: response.retorno.MaximoDependentesGratis,
                name: response.retorno.Nome,
                price: response.retorno.Valor,
                skuCode: response.retorno.CodigoSku
            }
        });

        const maturityList = new Array<{ day: number, default: boolean }>();
        if (response.retorno.DiasVencimento) {
            response.retorno.DiasVencimento.forEach(item => {
                maturityList.push({ day: item.DiaVencimento, default: item.DiaPadrao });
            });
            StorageAccessor.set('maturityList', maturityList);
        }

        return dto;
    }

    public async confirmSMS(
        token: string,
        idCart: string,
        idSession: string,
        view: string
    ): Promise<boolean> {
        const params = {
            Token: token,
            Uid: idCart,
            UidSession: idSession,
            View: view
        };

        const response = await this._httpAPIService.post<CartUpdateResponse>('SMS_SERVICE_CONFIRMATION', params);

        return response.mensagem === 'Sucesso.';
    }

    public async reSendSMS(
        idCart: string,
        idSession: string,
        view: string
    ): Promise<boolean> {
        const params = {
            UidCarrinho: idCart,
            UidSession: idSession,
            View: view
        };

        const response = await this._httpAPIService.post<any>('SMS_SERVICE_RESEND', params);

        return response.mensagem === 'Sucesso.';
    }

    public async finishCart(view: string): Promise<any> {
        return this._updateCart('CART_FINISH', view, {});
    }

    public email(view: string, email: string): void {
        this._updateCart('CART_ANALYTICS_EMAIL', view, { email });
    }

    public cpf(view: string, cpf: string): void {
        this._updateCart('CART_ANALYTICS_CPF', view, { cpf: Formatter.removeSpecialChars(cpf) });
    }

    public async phone(view: string, phone: PhoneNumber, modality: string): Promise<any> {
        const json = (modality === Modality.UPDATE_PLAIN)
                        ? { dddServico: phone.ddd, linhaServico: phone.number }
                        : { dddContato: phone.ddd, linhaContato: phone.number };

        return await this._updateCart('CART_ANALYTICS_PHONE', view, json);

    }

    public birth(view: string, birth: string): void {
        if (!this.validField(birth)) {
            return;
        }
        this._updateCart('CART_ANALYTICS_BIRTHDATE', view, { nascimento: birth });
    }

    public motherName(view: string, motherName: string): void {
        if (!this.validField(motherName)) {
            return;
        }
        this._updateCart('CART_ANALYTICS_MOTHER_NAME', view, { nomeMae: motherName });
    }

    public name(view: string, name: string): void {
        if (!this.validField(name)) {
            return;
        }
        this._updateCart('CART_ANALYTICS_NAME', view, { nome: name });
    }

    public cep(view: string, cep: string): void {
        if (!this.validField(cep)) {
            return;
        }
        this._updateCart('CART_ANALYTICS_CEP', view, { cep: Formatter.removeSpecialChars(cep) });
    }

    public number(view: string, number: string): void {
        if (!this.validField(number)) {
            return;
        }
        this._updateCart('CART_ANALYTICS_NUMBER', view, { numero: number });
    }

    public complement(view: string, complement: string): void {
        this._updateCart('CART_ANALYTICS_COMPLEMENT', view, { complemento: complement });
    }

    public neighborhood(view: string, neighborhood: string): void {
        if (!this.validField(neighborhood)) {
            return;
        }
        this._updateCart('CART_ANALYTICS_NEIGHBORHOOD', view, { bairro: neighborhood });
    }

    public street(view: string, patio: string, street: string): void {
        if (!this.validField(street)) {
            return;
        }
        this._updateCart('CART_ANALYTICS_STREET', view, { endereco: street, logradouro: patio });
    }

    public accountType(view: string, accountType: string): void {
        this._updateCart('CART_ANALYTICS_ACCOUNT_TYPE', view, { tipoConta: accountType });
    }

    public async maturity(view: string, maturity: string, term: boolean): Promise<any> {
        if (!this.validField(maturity)) {
            return;
        }

        return this._updateCart('CART_ANALYTICS_MATURITY', view, { vencimento: maturity, termoAcordo: term });
    }

    private validField(value: string) {
        return (value && value !== null && value.trim() !== '');
    }

    private async _updateCart(key: string, view: string, paramData: any): Promise<any> {

        const dto: DTO = this._dtoStorageService.getDTO();

        const params = {
            uid: dto.cart.cartUid,
            uidSession: dto.sessionUid,
            view,
            utm: this.buildUtmObject(dto),
            ...paramData
        };

        const response = await this._httpAPIService.put<CartUpdateResponse>(key, params);

        const result: any = {};
        result.success = (response.mensagem === 'Sucesso.');

        if (key === 'CART_FINISH') {
            result.orderCode = response.retorno.codigoPedido;
        } else if (key === 'CART_ANALYTICS_PHONE') {
            switch (response.retorno.modalidade) {
                case 1:
                    result.modality = Modality.MIGRATE;
                    break;
                case 2:
                    result.modality = Modality.UPDATE_PLAIN;
                    break;
                case 3:
                    result.modality = Modality.NEW_LINE;
                    break;
            }
        }

        return result;
    }

    private buildUtmObject(dto: DTO): any {
        return {
            utmOrigem: dto.analytics ? dto.analytics.utmSource : '',
            utmMidia: dto.analytics ? dto.analytics.utmMedia : '',
            utmTermo: dto.analytics ? dto.analytics.utmTerm : '',
            utmCampanha: dto.analytics ? dto.analytics.utmCampaign : '',
            utmParceiro: dto.analytics ? dto.analytics.utmPartner : '',
            utmConteudo: dto.analytics ? dto.analytics.utmContent : ''
        };
    }
}


