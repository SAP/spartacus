import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Currency } from '../../model/misc.model';
import { SiteContextConfig } from '../config/site-context-config';
import { StateWithSiteContext } from '../store/state';
import { SiteContext } from './site-context.interface';
import * as i0 from "@angular/core";
/**
 * Facade that provides easy access to currency state, actions and selectors.
 */
export declare class CurrencyService implements SiteContext<Currency> {
    protected store: Store<StateWithSiteContext>;
    protected config: SiteContextConfig;
    constructor(store: Store<StateWithSiteContext>, config: SiteContextConfig);
    /**
     * Represents all the currencies supported by the current store.
     */
    getAll(): Observable<Currency[]>;
    /**
     * Represents the isocode of the active currency.
     */
    getActive(): Observable<string>;
    /**
     * Sets the active language.
     */
    setActive(isocode: string): void;
    /**
     * Tells whether the value of the active currency has been already initialized
     */
    isInitialized(): boolean;
    /**
     * Tells whether the given iso code is allowed.
     *
     * The list of allowed iso codes can be configured in the `context` config of Spartacus.
     */
    protected isValid(value: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CurrencyService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CurrencyService>;
}
