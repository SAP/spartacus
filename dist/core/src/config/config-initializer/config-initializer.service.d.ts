import { BehaviorSubject, Observable } from 'rxjs';
import { LoggerService } from '../../logger';
import { Config } from '../config-tokens';
import * as i0 from "@angular/core";
/**
 * Provides support for CONFIG_INITIALIZERS
 */
export declare class ConfigInitializerService {
    protected config: Config;
    protected initializerGuard: any;
    protected rootConfig: Config;
    protected logger: LoggerService;
    constructor(config: Config, initializerGuard: any, rootConfig: Config);
    protected ongoingScopes$: BehaviorSubject<string[] | undefined>;
    /**
     * Returns true if config is stable, i.e. all CONFIG_INITIALIZERS resolved correctly
     */
    get isStable(): boolean;
    /**
     * Recommended way to get config for code that can run before app will finish
     * initialization (APP_INITIALIZERS, selected service constructors)
     *
     * Used without parameters waits for the whole config to become stable
     *
     * Parameters allow to describe which part of the config should be stable using
     * string describing config part, e.g.:
     * 'siteContext', 'siteContext.language', etc.
     *
     * @param scopes String describing parts of the config we want to be sure are stable
     */
    getStable(...scopes: string[]): Observable<Config>;
    /**
     * Removes provided scopes from currently ongoingScopes
     *
     * @param scopes
     */
    protected finishScopes(scopes: string[]): void;
    /**
     * Return true if provided scopes are not part of ongoingScopes
     *
     * @param scopes
     * @param ongoingScopes
     */
    protected areReady(scopes: string[], ongoingScopes: string[]): boolean;
    /**
     * Check if two scopes overlap.
     *
     * Example of scopes that overlap:
     * 'test' and 'test', 'test.a' and 'test', 'test' and 'test.a'
     *
     * Example of scopes that do not overlap:
     * 'test' and 'testA', 'test.a' and 'test.b', 'test.nested' and 'test.nest'
     *
     * @param a ScopeA
     * @param b ScopeB
     */
    protected scopesOverlap(a: string, b: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfigInitializerService, [null, { optional: true; }, null]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfigInitializerService>;
}
