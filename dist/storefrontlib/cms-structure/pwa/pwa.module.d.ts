import { SwRegistrationOptions } from '@angular/service-worker';
import { PWAModuleConfig } from './pwa.module-config';
import { AddToHomeScreenService } from './services/add-to-home-screen.service';
import * as i0 from "@angular/core";
import * as i1 from "./components/add-to-home-screen-btn/add-to-home-screen-btn.component";
import * as i2 from "./components/add-to-home-screen-banner/add-to-home-screen-banner.component";
import * as i3 from "@angular/common";
import * as i4 from "@angular/service-worker";
import * as i5 from "@spartacus/core";
export declare function pwaConfigurationFactory(pwaConfig: PWAModuleConfig): SwRegistrationOptions;
export declare function pwaFactory(addToHomeScreenService: AddToHomeScreenService): any;
export declare class PwaModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<PwaModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<PwaModule, [typeof i1.AddToHomeScreenBtnComponent, typeof i2.AddToHomeScreenBannerComponent], [typeof i3.CommonModule, typeof i4.ServiceWorkerModule, typeof i5.I18nModule], [typeof i1.AddToHomeScreenBtnComponent, typeof i2.AddToHomeScreenBannerComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<PwaModule>;
}
