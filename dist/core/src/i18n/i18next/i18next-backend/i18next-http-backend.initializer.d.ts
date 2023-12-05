import type { i18n, InitOptions } from 'i18next';
import { BackendOptions } from 'i18next-http-backend';
import { WindowRef } from '../../../window/window-ref';
import { I18nConfig } from '../../config/i18n-config';
import { I18nextBackendInitializer } from './i18next-backend.initializer';
import { I18nextHttpBackendClient } from './i18next-http-backend-client';
import * as i0 from "@angular/core";
/**
 * Configures an i18next HTTP backend plugin,
 * to allow for loading translations via HTTP.
 */
export declare class I18nextHttpBackendInitializer implements I18nextBackendInitializer {
    protected i18next: i18n;
    protected i18nextHttpClient: I18nextHttpBackendClient;
    protected config: I18nConfig;
    protected windowRef: WindowRef;
    constructor(i18next: i18n, i18nextHttpClient: I18nextHttpBackendClient, config: I18nConfig, windowRef: WindowRef);
    /**
     * Tells whether this i18next backend is applicable, based on the configuration.
     */
    hasMatch(): boolean;
    /**
     * @override
     * Configures an i18next HTTP backend plugin,
     * to allow for loading translations via HTTP.
     */
    initialize(): InitOptions;
    /**
     * Returns the configuration for the i18next-http-backend plugin.
     */
    protected getBackendConfig(): BackendOptions;
    /**
     * Resolves the relative path to the absolute one in SSR, using the server request's origin.
     * It's needed, because Angular Universal doesn't support relative URLs in HttpClient. See Angular issues:
     * - https://github.com/angular/angular/issues/19224
     * - https://github.com/angular/universal/issues/858
     */
    protected getLoadPath(path: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<I18nextHttpBackendInitializer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<I18nextHttpBackendInitializer>;
}
