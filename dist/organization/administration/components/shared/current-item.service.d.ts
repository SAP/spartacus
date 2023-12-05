import { RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Abstract Base class for all organization entities. This class simplifies
 * the various entity implementation, that only differ by dependencies and
 * data model.
 */
export declare abstract class CurrentItemService<T> {
    protected routingService: RoutingService;
    constructor(routingService: RoutingService);
    /**
     * Observes the key for the active organization item. The active key is observed
     * from the list of route parameters. The full route parameter list is evaluated,
     * including child routes.
     *
     * To allow for specific ("semantic") route parameters, the route parameter _key_ is
     * retrieved from the `getParamKey`.
     */
    readonly key$: Observable<string>;
    /**
     * Observes the active item.
     *
     * The active item is loaded by the active `key$`.
     */
    readonly item$: Observable<T | undefined>;
    /**
     * Observes the b2bUnit based on the unitCode route parameter.
     */
    readonly b2bUnit$: Observable<string>;
    /**
     * Returns the route parameter key for the item. The route parameter key differs
     * per item, so that route parameters are distinguished in the route configuration.
     */
    protected abstract getParamKey(): string;
    /**
     * Emits the current model or undefined, if there is no model available
     */
    protected abstract getItem(...params: any[]): Observable<T | undefined>;
    getRouterParam(paramKey: string): Observable<string>;
    abstract getError(_key: string): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CurrentItemService<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CurrentItemService<any>>;
}
