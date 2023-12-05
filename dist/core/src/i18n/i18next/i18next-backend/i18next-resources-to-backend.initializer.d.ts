import { i18n, InitOptions } from 'i18next';
import { I18nConfig } from '../../config/i18n-config';
import { I18nextBackendInitializer } from './i18next-backend.initializer';
import * as i0 from "@angular/core";
export declare class I18nextResourcesToBackendInitializer implements I18nextBackendInitializer {
    protected config: I18nConfig;
    protected i18next: i18n;
    constructor(config: I18nConfig, i18next: i18n);
    hasMatch(): boolean;
    initialize(): InitOptions;
    static ɵfac: i0.ɵɵFactoryDeclaration<I18nextResourcesToBackendInitializer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<I18nextResourcesToBackendInitializer>;
}
