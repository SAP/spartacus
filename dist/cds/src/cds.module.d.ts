import { ModuleWithProviders } from '@angular/core';
import { CdsConfig } from './config';
import * as i0 from "@angular/core";
import * as i1 from "./profiletag/profile-tag.module";
import * as i2 from "./profiletag/tracking/tracking.module";
import * as i3 from "./merchandising/merchandising.module";
export declare class CdsModule {
    static forRoot(config?: CdsConfig): ModuleWithProviders<CdsModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdsModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CdsModule, never, [typeof i1.ProfileTagModule, typeof i2.TrackingModule, typeof i3.MerchandisingModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CdsModule>;
}
