import { CdsEndpoints } from '../cds-models/cds-endpoints.model';
import { MerchandisingConfig } from './merchandising.config';
import { ProfileTagConfig } from './profile-tag.config';
import * as i0 from "@angular/core";
export declare abstract class CdsConfig {
    cds?: {
        site?: string;
        tenant?: string;
        baseUrl?: string;
        consentTemplateId?: string;
        endpoints?: CdsEndpoints;
        merchandising?: MerchandisingConfig;
        profileTag?: ProfileTagConfig;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<CdsConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CdsConfig>;
}
declare module '@spartacus/core' {
    interface Config extends CdsConfig {
    }
}
