import { InjectionToken, Provider } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import * as fromNgrxRouter from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { RoutingConfigService } from '../../configurable-routes/routing-config.service';
import { ActivatedRouterStateSnapshot, RouterState, State } from '../routing-state';
import * as i0 from "@angular/core";
export declare const initialState: RouterState;
export declare function getReducers(): ActionReducerMap<State>;
export declare function reducer(state: RouterState | undefined, action: any): RouterState;
export declare const reducerToken: InjectionToken<ActionReducerMap<State>>;
export declare const reducerProvider: Provider;
export declare class CustomSerializer implements fromNgrxRouter.RouterStateSerializer<ActivatedRouterStateSnapshot> {
    private routingConfig;
    serialize(routerState: RouterStateSnapshot): ActivatedRouterStateSnapshot;
    private getPageContext;
    /**
     * Returns the semantic route name for given page label.
     *
     * *NOTE*: It works only for simple static urls that are equal to the page label
     * of cms-driven content page. For example: `/my-account/address-book`.
     *
     * It doesn't work for URLs with dynamic parameters. But such case can be handled
     * by reading the defined `data.cxRoute` from the Angular Routes.
     *
     * @param path path to be found in the routing config
     */
    private lookupSemanticRoute;
    constructor(routingConfig: RoutingConfigService);
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomSerializer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CustomSerializer>;
}
