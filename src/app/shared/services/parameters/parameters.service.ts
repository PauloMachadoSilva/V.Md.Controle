import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { Analytics, CRM, BKO, ProjectConfig } from '../../models';

/**
 * QueryString parameters service
 */
@Injectable()
export class ParametersService {
    constructor(private activatedRoute: ActivatedRoute) {
    }

    public analytics(route?: ActivatedRouteSnapshot): Analytics {
        const _queryParams = route ? route.queryParams : this.activatedRoute.snapshot.queryParams;

        return new Analytics({
            crmCampaign: _queryParams.crm_campaign,
            utmCampaign: _queryParams.trk_campaign || _queryParams.utm_campaign,
            utmContent:  _queryParams.trk_content  || _queryParams.utm_content,
            utmMedia:    _queryParams.trk_medium   || _queryParams.utm_medium,
            utmPartner:  _queryParams.trk_parceiro || _queryParams.utm_parceiro,
            utmSource:   _queryParams.trk_source   || _queryParams.utm_source,
            utmTerm:     _queryParams.trk_term     || _queryParams.utm_term
        }, false);
    }

    public bko(route?: ActivatedRouteSnapshot): BKO {
        const _queryParams = route ? route.queryParams : this.activatedRoute.snapshot.queryParams;

        return new BKO({
            bkoAttendantId: _queryParams.u,
            originCode: _queryParams.codigo_origem
        }, false);
    }

    public crm(route?: ActivatedRouteSnapshot): CRM {
        const _queryParams = route ? route.queryParams : this.activatedRoute.snapshot.queryParams;

        return new CRM({
            uid: _queryParams.uid,
            campaign: _queryParams.crm_campaign
        }, false);
    }

    public projectConfig(route?: ActivatedRouteSnapshot): ProjectConfig {
        const _queryParams = route ? route.queryParams : this.activatedRoute.snapshot.queryParams;

        return new ProjectConfig({
            ddd: _queryParams.ddd,
            uf: _queryParams.uf,
            platform: _queryParams.plataforma,
            sku: _queryParams.sku
        }, false);
    }
}
