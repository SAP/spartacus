import type { InitOptions } from 'i18next';
import { I18nextBackendInitializer } from './i18next-backend.initializer';
import * as i0 from "@angular/core";
/**
 * Configures an i18next backend plugin, to allow for loading translations from external resources.
 *
 * By default it configures and uses the `I18nextHttpBackendService`.
 *
 * It's an extension point to allow for providing potentially different i18next backend plugins.
 * See the list of available plugins: https://www.i18next.com/overview/plugins-and-utils#backends
 */
export declare class I18nextBackendService {
    protected backendInitializers: I18nextBackendInitializer[] | null;
    constructor(backendInitializers: I18nextBackendInitializer[] | null);
    /**
     * Configures an i18next backend plugin, to allow for loading translations from external resources.
     *
     * @returns Additional configuration to be used when initializing the i18next instance.
     */
    initialize(): InitOptions;
    static ɵfac: i0.ɵɵFactoryDeclaration<I18nextBackendService, [{ optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<I18nextBackendService>;
}
