import { Injectable } from '@angular/core';

import { ConstantsService } from '../config/constants.service';
import { HttpService } from '../http/http.service';
import { DTOStorageService } from '../dto-storage/dto-storage.service';
import { DTO } from '../../models';
import { ErrorMessageFormatter } from '../../utils';

@Injectable()
export class APIMetricsService {

    private _dto: DTO;

    constructor(
        private _appConstantsService: ConstantsService,
        private _dtoStorageService: DTOStorageService,
        private _httpService: HttpService,
        // private _urlConfigService: UrlConfigService
    ) {
    }

    public async sendUid(analyticsEvent: string, requestEvent: string, view: string): Promise<any> {
        const params = {
            codigoOperadora: this._appConstantsService.client.code,
            eventoLogAnalitico: analyticsEvent,
            eventoRequest: requestEvent,
            uidSession: this._dto.sessionUid,
            utmCampanha: this._dto.analytics.utmCampaign,
            utmConteudo: this._dto.analytics.utmContent,
            utmMidia: this._dto.analytics.utmMedia,
            utmOrigem: this._dto.analytics.utmSource,
            utmParceiro: this._dto.analytics.utmPartner,
            utmTermo: this._dto.analytics.utmTerm,
            view: view
        };

        console.log('====> ', params);
        return null;

        // const response = await this._httpService.post<any>('METRICS_SERVICE_SEND_UID', params);

        // return response;
    }
}
