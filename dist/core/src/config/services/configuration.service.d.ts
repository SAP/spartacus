import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { UnifiedInjector } from '../../lazy-loading/unified-injector';
import { Config } from '../config-tokens';
import * as i0 from "@angular/core";
export declare class ConfigurationService implements OnDestroy {
    protected rootConfig: Config;
    protected defaultConfig: Config;
    protected unifiedInjector: UnifiedInjector;
    /**
     * Will emit unified configuration when some ambient configuration will appear
     *
     * Ambient configuration can appear when we lazy load module with configuration
     */
    readonly unifiedConfig$: Observable<Config>;
    /**
     * Global application configuration
     */
    readonly config: Config;
    private readonly ambientDefaultConfig;
    private readonly ambientConfig;
    private subscription;
    constructor(rootConfig: Config, defaultConfig: Config, unifiedInjector: UnifiedInjector, config: Config);
    private feedUnifiedConfig;
    private processConfig;
    private emitUnifiedConfig;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfigurationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfigurationService>;
}
