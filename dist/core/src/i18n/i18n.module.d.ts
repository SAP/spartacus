import { ModuleWithProviders } from '@angular/core';
import { ConfigInitializer } from '../config/config-initializer/config-initializer';
import { I18nConfig } from './config/i18n-config';
import { I18nConfigInitializer } from './config/i18n-config-initializer';
import * as i0 from "@angular/core";
import * as i1 from "./translate.pipe";
import * as i2 from "./date.pipe";
import * as i3 from "./numeric.pipe";
export declare function initI18nConfig(configInitializer: I18nConfigInitializer, config: I18nConfig): ConfigInitializer | null;
export declare class I18nModule {
    static forRoot(): ModuleWithProviders<I18nModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<I18nModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<I18nModule, [typeof i1.TranslatePipe, typeof i2.CxDatePipe, typeof i3.CxNumericPipe], never, [typeof i1.TranslatePipe, typeof i2.CxDatePipe, typeof i3.CxNumericPipe]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<I18nModule>;
}
