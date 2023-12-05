import { Observable } from 'rxjs';
import { ConfigInitializer } from '../../config/config-initializer/config-initializer';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { I18nConfig } from './i18n-config';
import * as i0 from "@angular/core";
export declare class I18nConfigInitializer implements ConfigInitializer {
    protected configInit: ConfigInitializerService;
    readonly scopes: string[];
    readonly configFactory: () => Promise<I18nConfig>;
    constructor(configInit: ConfigInitializerService);
    /**
     * Resolves the `fallbackLang` based on the default language from config `context.language` .
     */
    protected resolveConfig(): Observable<I18nConfig>;
    static ɵfac: i0.ɵɵFactoryDeclaration<I18nConfigInitializer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<I18nConfigInitializer>;
}
