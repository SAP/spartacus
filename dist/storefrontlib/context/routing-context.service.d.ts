import { ActivatedRouteSnapshot } from '@angular/router';
import { ActivatedRoutesService, UnifiedInjector } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ContextToken } from './context.model';
import * as i0 from "@angular/core";
/**
 * Resolves the context for the specific route, based on the property `data.cxContext`
 * defined in the Angular Route.
 */
export declare class RoutingContextService {
    protected activatedRoutesService: ActivatedRoutesService;
    protected injector: UnifiedInjector;
    constructor(activatedRoutesService: ActivatedRoutesService, injector: UnifiedInjector);
    /**
     * Combined context token mapping consisting of all mappings defined in currently
     * Activated Angular Routes.
     *
     * The context token mapping is read from each Route's property `data.cxContext`.
     */
    protected readonly contextTokenMapping$: Observable<Record<ContextToken, any>>;
    /**
     * Returns the merged context token mapping, consisting of mappings
     * defined in all Activated Angular Routes.
     */
    protected getRoutesContextTokenMapping(routes: ActivatedRouteSnapshot[]): Record<ContextToken, any>;
    /**
     * Resolves the specified `contextToken` from `cxContext` data parameter of the activated Angular Routes.
     * @param contextToken
     *
     * @returns instance from the root injector if defined, otherwise `undefined`.
     */
    get<T>(contextToken: ContextToken): Observable<T | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RoutingContextService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RoutingContextService>;
}
