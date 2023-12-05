import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BaseSite } from '../../model/misc.model';
import { SiteContextConfig } from '../config/site-context-config';
import { StateWithSiteContext } from '../store/state';
import { SiteContext } from './site-context.interface';
import * as i0 from "@angular/core";
export declare class BaseSiteService implements SiteContext<BaseSite> {
    protected store: Store<StateWithSiteContext>;
    protected config: SiteContextConfig;
    constructor(store: Store<StateWithSiteContext>, config: SiteContextConfig);
    /**
     * Represents the current baseSite uid.
     */
    getActive(): Observable<string>;
    /**
     * Get all base sites data
     */
    getAll(): Observable<BaseSite[]>;
    /**
     * Get base site data based on site uid
     */
    get(siteUid?: string): Observable<BaseSite | undefined>;
    setActive(baseSite: string): void;
    /**
     * Tells whether the value of the base site has been already initialized
     */
    isInitialized(): boolean;
    /**
     * Tells whether the given iso code is allowed.
     *
     * The list of allowed iso codes can be configured in the `context` config of Spartacus.
     */
    protected isValid(value: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<BaseSiteService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BaseSiteService>;
}
