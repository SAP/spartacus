import { OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { SiteContextConfig } from '../config/site-context-config';
import { BaseSiteService } from '../facade/base-site.service';
import * as i0 from "@angular/core";
export declare class BaseSiteInitializer implements OnDestroy {
    protected baseSiteService: BaseSiteService;
    protected configInit: ConfigInitializerService;
    constructor(baseSiteService: BaseSiteService, configInit: ConfigInitializerService);
    protected subscription: Subscription;
    /**
     * Initializes the value of the base site
     */
    initialize(): void;
    /**
     * On subscription to the returned observable:
     *
     * Sets the default value taken from config, unless the active base site has been already initialized.
     */
    protected setFallbackValue(): Observable<unknown>;
    /**
     * Sets the active base site value based on the default value from the config,
     * unless the active base site has been already initialized.
     */
    protected setDefaultFromConfig(config: SiteContextConfig): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BaseSiteInitializer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BaseSiteInitializer>;
}
