import { InitOptions } from 'i18next';
import { Applicable } from '../../../util';
import * as i0 from "@angular/core";
/**
 * Configures a specific i18next backend plugin, to allow for loading translations from external resources.
 */
export declare abstract class I18nextBackendInitializer implements Applicable {
    /**
     * Configures an i18next backend plugin, to allow for loading translations from external resources.
     *
     * @returns Additional configuration to be used when initializing the i18next instance.
     */
    abstract initialize(): InitOptions;
    /**
     * Returns `true` if the backend is applicable.
     */
    hasMatch?(...params: any[]): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<I18nextBackendInitializer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<I18nextBackendInitializer>;
}
