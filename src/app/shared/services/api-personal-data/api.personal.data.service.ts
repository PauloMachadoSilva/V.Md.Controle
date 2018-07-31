import { Injectable } from '@angular/core';

import { APIConfigService } from '../config/apiConfig.service';
import { HttpAPIService } from '../http/http.api.service';
import { PersonalDataResponse } from './api.personal.data.service.interfaces';
import { ErrorMessageFormatter, Formatter } from '../../utils';
import { PersonalData } from '../../models';


@Injectable()
export class APIPersonalDataService {

    constructor(private _urlConfigService: APIConfigService, private _httpService: HttpAPIService) { }

    public async getDataByCPF(cpf: string): Promise<PersonalData> {

        const params = {
            Cpf: Formatter.removeSpecialChars(cpf)
        };

        const response = await this._httpService.get<PersonalDataResponse>('PERSONAL_DATA_GET_DATA_BY_CPF', params);

        return new PersonalData({
            name: response.Nome,
            motherName: response.NomeMae,
            birthdate: Formatter.strToDate(response.DataNascimento),
            cpf: response.CPF,
            phoneNumber: null,
            email: null
        });
    }
}
