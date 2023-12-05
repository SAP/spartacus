import { OnDestroy } from '@angular/core';
import type { InitOptions, i18n } from 'i18next';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../site-context/facade/language.service';
import { I18nConfig } from '../config/i18n-config';
import { I18nextBackendService } from './i18next-backend/i18next-backend.service';
import * as i0 from "@angular/core";
/**
 * Initializes the i18next instance.
 */
export declare class I18nextInitializer implements OnDestroy {
    protected i18next: i18n;
    protected config: I18nConfig;
    protected languageService: LanguageService;
    protected i18nextBackendService: I18nextBackendService;
    loggerPlugin: import("i18next").LoggerModule;
    constructor(i18next: i18n, config: I18nConfig, languageService: LanguageService, i18nextBackendService: I18nextBackendService);
    /**
     * Initializes the i18next instance.
     *
     * @returns Promise that resolves when the i18next instance is initialized.
     */
    initialize(): Promise<any>;
    /**
     * Returns the configuration for initializing an i18next instance.
     */
    protected getI18nextConfig(): InitOptions;
    /**
     * Populates the i18next instance with the given static translations.
     *
     * @param i18next i18next instance
     * @param resources translation resources
     */
    protected addTranslationResources(): void;
    protected subscription: Subscription;
    /**
     * Ensures that when the site context language changes,
     * the i18next instance is updated with the new language.
     */
    protected synchronizeLanguage(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<I18nextInitializer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<I18nextInitializer>;
}
