import { CmsConfig, Config, ConfigInitializerService } from '@spartacus/core';
import { CdcJsService } from './service/cdc-js.service';
import * as i0 from "@angular/core";
import * as i1 from "./consent-management/cdc-consent.module";
export declare function cdcJsFactory(cdcJsService: CdcJsService, configInit: ConfigInitializerService): () => Promise<Config>;
export declare function defaultCdcComponentsConfig(): CmsConfig;
export declare class CdcRootModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<CdcRootModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CdcRootModule, never, [typeof i1.CdcConsentManagementModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CdcRootModule>;
}
