import { ModuleWithProviders } from '@angular/core';
import { ConfigInitializer } from '../config/config-initializer/config-initializer';
import { SiteContextConfigInitializer } from './config/config-loader/site-context-config-initializer';
import { SiteContextConfig } from './config/site-context-config';
import * as i0 from "@angular/core";
import * as i1 from "../state/state.module";
import * as i2 from "./store/site-context-store.module";
import * as i3 from "./events/site-context-event.module";
/**
 * Initializes the site context config
 */
export declare function initSiteContextConfig(configInitializer: SiteContextConfigInitializer, config: SiteContextConfig): ConfigInitializer | null;
export declare class SiteContextModule {
    static forRoot(): ModuleWithProviders<SiteContextModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SiteContextModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<SiteContextModule, never, [typeof i1.StateModule, typeof i2.SiteContextStoreModule, typeof i3.SiteContextEventModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<SiteContextModule>;
}
