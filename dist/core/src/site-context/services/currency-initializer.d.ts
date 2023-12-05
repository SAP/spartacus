import { OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ConfigInitializerService } from '../../config';
import { SiteContextConfig } from '../config/site-context-config';
import { CurrencyService } from '../facade';
import { CurrencyStatePersistenceService } from './currency-state-persistence.service';
import * as i0 from "@angular/core";
export declare class CurrencyInitializer implements OnDestroy {
    protected currencyService: CurrencyService;
    protected currencyStatePersistenceService: CurrencyStatePersistenceService;
    protected configInit: ConfigInitializerService;
    protected subscription: Subscription;
    constructor(currencyService: CurrencyService, currencyStatePersistenceService: CurrencyStatePersistenceService, configInit: ConfigInitializerService);
    /**
     * Initializes the value of the active currency.
     */
    initialize(): void;
    /**
     * On subscription to the returned observable:
     *
     * Sets the default value taken from config, unless the active currency has been already initialized.
     */
    protected setFallbackValue(): Observable<unknown>;
    /**
     * Sets the active currency value based on the default value from the config,
     * unless the active currency has been already initialized.
     */
    protected setDefaultFromConfig(config: SiteContextConfig): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CurrencyInitializer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CurrencyInitializer>;
}
