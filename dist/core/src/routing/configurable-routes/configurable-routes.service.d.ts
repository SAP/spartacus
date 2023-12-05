import { InjectionToken, Injector } from '@angular/core';
import { Route, Routes, UrlMatcher } from '@angular/router';
import { LoggerService } from '../../logger';
import { UrlMatcherService } from '../services/url-matcher.service';
import { UrlMatcherFactory } from '../url-matcher/url-matcher-factory';
import { RouteConfig } from './routes-config';
import { RoutingConfigService } from './routing-config.service';
import * as i0 from "@angular/core";
export declare class ConfigurableRoutesService {
    protected injector: Injector;
    protected routingConfigService: RoutingConfigService;
    protected urlMatcherService: UrlMatcherService;
    protected logger: LoggerService;
    constructor(injector: Injector, routingConfigService: RoutingConfigService, urlMatcherService: UrlMatcherService);
    protected initCalled: boolean;
    /**
     * Enhances existing Angular routes using the routing config of Spartacus.
     * Can be called only once.
     */
    init(): void;
    /**
     * Enhances existing Angular routes using the routing config of Spartacus.
     */
    protected configure(): void;
    /**
     * Sets the property `path` or `matcher` for the given routes, based on the Spartacus' routing configuration.
     *
     * @param routes list of Angular `Route` objects
     */
    protected configureRoutes(routes: Routes): Routes;
    /**
     * Sets the property `path` or `matcher` of the `Route`, based on the Spartacus' routing configuration.
     * Uses the property `data.cxRoute` to determine the name of the route.
     * It's the same name used as a key in the routing configuration: `routing.routes[ROUTE NAME]`.
     *
     * @param route Angular `Route` object
     */
    protected configureRoute(route: Route): Route;
    /**
     * Creates a single `UrlMatcher` based on given matchers and factories of matchers.
     *
     * @param route Route object
     * @param matchersOrFactories `UrlMatcher`s or injection tokens with a factory functions
     *  that create UrlMatchers based on the given route.
     */
    protected resolveUrlMatchers(route: Route, matchersOrFactories: RouteConfig['matchers']): UrlMatcher;
    /**
     * Creates an `UrlMatcher` based on the given route, using the factory function coming from the given injection token.
     *
     * @param route Route object
     * @param factoryToken injection token with a factory function that will create an UrlMatcher using given route
     */
    protected resolveUrlMatcherFactory(route: Route, factoryToken: InjectionToken<UrlMatcherFactory>): UrlMatcher;
    /**
     * Returns the name of the Route stored in its property `data.cxRoute`
     * @param route
     */
    protected getRouteName(route: Route): string;
    protected validateRouteConfig(routeConfig: RouteConfig | null | undefined, routeName: string, route: Route): void;
    private warn;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfigurableRoutesService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfigurableRoutesService>;
}
