import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Language } from '../../model/misc.model';
import { SiteContextConfig } from '../config/site-context-config';
import { StateWithSiteContext } from '../store/state';
import { SiteContext } from './site-context.interface';
import * as i0 from "@angular/core";
/**
 * Facade that provides easy access to language state, actions and selectors.
 */
export declare class LanguageService implements SiteContext<Language> {
    protected store: Store<StateWithSiteContext>;
    protected config: SiteContextConfig;
    constructor(store: Store<StateWithSiteContext>, config: SiteContextConfig);
    /**
     * Represents all the languages supported by the current store.
     */
    getAll(): Observable<Language[]>;
    /**
     * Represents the isocode of the active language.
     */
    getActive(): Observable<string>;
    /**
     * Sets the active language.
     */
    setActive(isocode: string): void;
    /**
     * Tells whether the value of the active language has been already initialized
     */
    isInitialized(): boolean;
    /**
     * Tells whether the given iso code is allowed.
     *
     * The list of allowed iso codes can be configured in the `context` config of Spartacus.
     */
    protected isValid(value: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<LanguageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LanguageService>;
}
