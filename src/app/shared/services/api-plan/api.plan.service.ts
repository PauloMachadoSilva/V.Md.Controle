import { Injectable } from '@angular/core';

import { APIConfigService } from '../config/apiConfig.service';
import { HttpService } from './../http/http.service';
import { HttpAPIService } from './../http/http.api.service';

import { PlanData, PlansResponse, PlanResponse } from './api.plan.service.interfaces';
import { ErrorMessageFormatter, JsonParser } from '../../utils';
import { Address, Plan } from '../../models';

@Injectable()
export class APIPlanService {
    constructor(
        private _urlConfigService: APIConfigService,
        private _httpService: HttpAPIService
    ) { }

    public async getPlanByDDDList(ddd: number, productId: number, typeMode: number): Promise<Array<Plan>> {

        const params = {
            DDD: ddd,
            IdProduto: productId,
            ModalidadeTipo: typeMode
        };

        const response = await this._httpService.get<PlansResponse>('PLANS_SERVICE_PLAN_BY_DDD_LIST', params);

        const planList = new Array<Plan>();
        response.Skus.forEach(element => {
            planList.push(this.planByPlanData(element));
        });

        return planList.reverse();
    }

    public async getPlanBySku(sku: string): Promise<Plan> {
        const params = {
            CodigoSku: sku
        };

        const response = await this._httpService.get<PlanResponse>('PLANS_SERVICE_PLAN_BY_SKU', params);

        return (!response.Sku) ? null : this.planByPlanData(response.Sku);
    }

    public async getPlanBySkuUfDdd(sku: string, uf: string, ddd: string, view: string, idSession: string): Promise<Plan> {
        const params = {
            Sku: sku,
            ddd,
            Uf: uf,
            view: view,
            uidSession: idSession
        };

        const response = await this._httpService.get<PlanResponse>('PLANS_SERVICE_PLAN_BY_SKU_UF_DDD', params);

        return (!response.retorno) ? null : this.planByPlanData(response.retorno);
    }

    private planByPlanData(element: PlanData): Plan {
        const complement = (typeof element.Complemento === 'string')
                                ? element.Complemento
                                : JsonParser.toString(element.Complemento);
        const plan = new Plan({
            complement: this.makeJson(complement),
            completeName: element.NomeCompleto,
            description: this.makeJson(element.Descricao),
            maxDependents: element.MaximoDependentes,
            maxFreeDependents: element.MaximoDependentesGratis,
            name: element.Nome,
            price: element.Valor,
            skuCode: element.CodigoSku
        }, false);

        plan.complement.internetDetail = 'de internet 4G';

        return plan;
    }

    public makeJson(element: string): any {
        const translate = [
            ['ligacoes', 'calls'],
            ['titulo', 'title'],
            ['Titulo', 'title'],
            ['descricao', 'description'],
            ['Descricao', 'description'],
            ['dados_valor', 'internetValue'],
            ['ddd_descricao', 'dddDescription'],
            ['ddd_valor', 'dddValue'],
            ['minutos_offnet_descricao', 'minuteOfflineDescription'],
            ['minutos_offnet_valor', 'minuteOfflineValue'],
            ['minutos_onnet_descricao', 'minuteOnlineDescription'],
            ['minutos_onnet_valor', 'minuteOnlineValue'],
            ['sms_descricao', 'smsDescription'],
            ['sms_valor', 'smsValue']
        ];

        translate.forEach( item => element = element.replace(new RegExp('"' + item[0] + '":', 'g'), '"' + item[1] + '":') );
        return JsonParser.fromString(element);
    }
}
