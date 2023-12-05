import { Location } from '@angular/common';
import { NavigationBehaviorOptions, NavigationExtras, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WindowRef } from '../../window/window-ref';
import { SemanticPathService } from '../configurable-routes/url-translation/semantic-path.service';
import { UrlCommands } from '../configurable-routes/url-translation/url-command';
import { PageContext } from '../models/page-context.model';
import { RouterState } from '../store/routing-state';
import { RoutingParamsService } from './routing-params.service';
import * as i0 from "@angular/core";
export declare class RoutingService {
    protected store: Store<RouterState>;
    protected winRef: WindowRef;
    protected semanticPathService: SemanticPathService;
    protected routingParamsService: RoutingParamsService;
    protected router: Router;
    protected location: Location;
    constructor(store: Store<RouterState>, winRef: WindowRef, semanticPathService: SemanticPathService, routingParamsService: RoutingParamsService, router: Router, location: Location);
    /**
     * Get the list of all parameters of the full route. This includes
     * active child routes.
     */
    getParams(): Observable<{
        [key: string]: string;
    }>;
    /**
     * Get the current router state
     */
    getRouterState(): Observable<RouterState>;
    /**
     * Get the `PageContext` from the state
     */
    getPageContext(): Observable<PageContext>;
    /**
     * Get the next `PageContext` from the state
     */
    getNextPageContext(): Observable<PageContext | undefined>;
    /**
     * Allow to change next page context for the ongoing navigation
     *
     * @param pageContext
     */
    changeNextPageContext(pageContext: PageContext): void;
    /**
     * Get the `isNavigating` info from the state
     */
    isNavigating(): Observable<boolean>;
    /**
     * Navigation with a new state into history
     * @param commands: url commands
     * @param extras: Represents the extra options used during navigation.
     *
     * @returns Promise that resolves to `true` when navigation succeeds,
     *          to `false` when navigation fails, or is rejected on error.
     */
    go(commands: UrlCommands, extras?: NavigationExtras): Promise<boolean>;
    /**
     * Resolves the relative url for the given `UrlCommands` and `NavigationExtras`.
     *
     * The absolute url can be resolved using `getFullUrl()`.
     */
    getUrl(commands: UrlCommands, extras?: NavigationExtras): string;
    /**
     * Returns the absolute url for the given `UrlCommands` and `NavigationExtras`.
     *
     * The absolute url uses the origin of the current location.
     */
    getFullUrl(commands: UrlCommands, extras?: NavigationExtras): string;
    /**
     * Navigation using absolute route path
     * @param url
     * @param extras: Represents the extra options used during navigation.
     *
     * @returns Promise that resolves to `true` when navigation succeeds,
     *          to `false` when navigation fails, or is rejected on error.
     */
    goByUrl(url: string, extras?: NavigationBehaviorOptions): Promise<boolean>;
    /**
     * Navigating back
     */
    back(): void;
    /**
     * Navigating forward
     */
    forward(): void;
    /**
     * Navigation with a new state into history
     * @param path
     * @param extras: Represents the extra options used during navigation.
     *
     * @returns Promise that resolves to `true` when navigation succeeds,
     *          to `false` when navigation fails, or is rejected on error.
     */
    protected navigate(path: any[], extras?: NavigationExtras): Promise<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RoutingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RoutingService>;
}
