import ModelBase from '../model-base/model-base.model';
import Analytics from '../analytics/analytics.model';
import BKO from '../bko/bko.model';
import Cart from '../cart/cart.model';
import CRM from '../crm/crm.model';
import ProjectConfig from '../project-config/project-config.model';

class DTO extends ModelBase {
    public analytics: Analytics;
    public bko: BKO;
    public cart: Cart;
    public originCode: string;
    public projectConfig: ProjectConfig;
    public crm: CRM;
    public sessionUid: string;

    constructor(
        attrs: {
            analytics: Analytics,
            bko: BKO,
            cart: Cart,
            originCode: string,
            projectConfig: ProjectConfig,
            crm: CRM,
            sessionUid: string
        },
        objectBuilder?: boolean) {

        super(objectBuilder);

        this.analytics = attrs.analytics;
        this.bko = attrs.bko;
        this.cart = attrs.cart;
        this.originCode = attrs.originCode;
        this.projectConfig = attrs.projectConfig;
        this.crm = attrs.crm;
        this.sessionUid = attrs.sessionUid;
    }
}

export default DTO;
