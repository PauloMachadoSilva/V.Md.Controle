import { Injectable } from '@angular/core';

import { HttpAPIService } from './../http/http.api.service';
import {
    AddressServiceGetAddressByCEPResponse,
    AddressServiceGetStateDDDList,
    AddressServiceFindAddressResponse
} from './api.address.service.interfaces';
import { Address, State } from '../../models';
import { ErrorMessageFormatter, Formatter } from '../../utils';

@Injectable()
export class APIAddressService {

    constructor(
        private _httpService: HttpAPIService
    ) { }

    public async getStateDDDList(): Promise<Array<State>> {
        const response = await this._httpService.get<AddressServiceGetStateDDDList>('STATE_SERVICE_GET_STATES', {});

        const stateList = new Array<State>();
        response.UFs.forEach(element => {
            stateList.push(new State({
                    abbr: element.Uf,
                    description: element.DescricaoUf,
                    dddList: element.Ddds,
                    isSelected: element.Selecionado
                }));
        });

        return stateList;
    }

    public async getAddressByCEP(cep: string): Promise<Address> {
        const params = { Cep: Formatter.removeSpecialChars(cep) };

        const response = await this._httpService.get<AddressServiceGetAddressByCEPResponse>('ADDRESS_SERVICE_GET_ADDRESS_BY_CEP', params);

        return (response.EnderecoCompleto === null)
            ? null
            : new Address({
                cep: response.EnderecoCompleto.Cep,
                city: response.EnderecoCompleto.Cidade,
                neighborhood: response.EnderecoCompleto.Bairro,
                number: null,
                complement: null,
                patio: response.EnderecoCompleto.Logradouro,
                reference: null,
                state: response.EnderecoCompleto.Uf,
                street: response.EnderecoCompleto.Endereco
            }, false);
    }

    public async findAddress(query: string): Promise<Array<Address>> {
        const params = { Endereco: query };

        const response = await this._httpService.get<AddressServiceFindAddressResponse>('ADDRESS_SERVICE_FIND_ADDRESS', params);

        const addressList = Array<Address>();

        response.EnderecosCompleto.forEach(EnderecoCompleto => {
            addressList.push(new Address({
                cep: EnderecoCompleto.Cep,
                city: EnderecoCompleto.Cidade,
                neighborhood: EnderecoCompleto.Bairro,
                number: null,
                complement: null,
                patio: EnderecoCompleto.Logradouro,
                reference: null,
                state: EnderecoCompleto.Uf,
                street: EnderecoCompleto.Endereco
            }, false));
        });

        return addressList;
    }
}
