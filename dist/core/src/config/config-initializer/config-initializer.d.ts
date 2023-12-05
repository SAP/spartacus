import { InjectionToken } from '@angular/core';
import { Config } from '../config-tokens';
export declare const CONFIG_INITIALIZER: InjectionToken<unknown>;
/**
 * Used to provide asynchronous config during app initialization
 */
export interface ConfigInitializer {
    /**
     * List of config parts that are resolved by configFactory, e.g.:
     * 'context.baseSite', 'context.language'
     */
    scopes: string[];
    /**
     * Promise that returns config chunk
     */
    configFactory: () => Promise<Config>;
}
export declare const CONFIG_INITIALIZER_FORROOT_GUARD: InjectionToken<void>;
