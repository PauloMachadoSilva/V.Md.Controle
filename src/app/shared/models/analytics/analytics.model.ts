import ModelBase from '../model-base/model-base.model';

class Analytics extends ModelBase {

    private _crmCampaign: string;
    private _utmCampaign: string;
    private _utmContent: string;
    private _utmMedia: string;
    private _utmPartner: string;
    private _utmSource: string;
    private _utmTerm: string;

    constructor(
        attrs: {
            crmCampaign: string,
            utmCampaign: string,
            utmContent: string,
            utmMedia: string,
            utmPartner: string,
            utmSource: string,
            utmTerm: string
        },
        objectBuilder?: boolean
    ) {
        super(objectBuilder);

        this.crmCampaign = attrs.crmCampaign;
        this.utmCampaign = attrs.utmCampaign;
        this.utmContent = attrs.utmContent;
        this.utmMedia = attrs.utmMedia;
        this.utmPartner = attrs.utmPartner;
        this.utmSource = attrs.utmSource;
        this.utmTerm = attrs.utmTerm;

    }

    public toQueryParams(): string {
        return 'crm_campaign=' + this.crmCampaign +
               '&utm_campaign=' + this.utmCampaign +
               '&utm_content=' + this.utmContent +
               '&utm_medium=' + this.utmMedia +
               '&utm_parceiro=' + this.utmPartner + // This one is in pt-br.
               '&utm_source=' + this.utmSource +
               '&utm_term=' + this.utmTerm;
    }

    // Getters and setters.
    public get crmCampaign(): string {
        return this._crmCampaign;
    }
    public set crmCampaign(v: string) {
        this._crmCampaign = v;
    }

    public get utmCampaign(): string {
        return this._utmCampaign;
    }
    public set utmCampaign(v: string) {
        this._utmCampaign = v;
    }

    public get utmContent(): string {
        return this._utmContent;
    }
    public set utmContent(v: string) {
        this._utmContent = v;
    }

    public get utmMedia(): string {
        return this._utmMedia;
    }
    public set utmMedia(v: string) {
        this._utmMedia = v;
    }

    public get utmPartner(): string {
        return this._utmPartner;
    }
    public set utmPartner(v: string) {
        this._utmPartner = v;
    }

    public get utmSource(): string {
        return this._utmSource;
    }
    public set utmSource(v: string) {
        this._utmSource = v;
    }

    public get utmTerm(): string {
        return this._utmTerm;
    }
    public set utmTerm(v: string) {
        this._utmTerm = v;
    }

}

export default Analytics;
