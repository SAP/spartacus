/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, inject, isDevMode, } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from '../../logger';
import * as i0 from "@angular/core";
import * as i1 from "./routing-config.service";
import * as i2 from "../services/url-matcher.service";
export class ConfigurableRoutesService {
    constructor(injector, routingConfigService, urlMatcherService) {
        this.injector = injector;
        this.routingConfigService = routingConfigService;
        this.urlMatcherService = urlMatcherService;
        this.logger = inject(LoggerService);
        this.initCalled = false; // guard not to call init() more than once
    }
    /**
     * Enhances existing Angular routes using the routing config of Spartacus.
     * Can be called only once.
     */
    init() {
        if (!this.initCalled) {
            this.initCalled = true;
            this.configure();
        }
    }
    /**
     * Enhances existing Angular routes using the routing config of Spartacus.
     */
    configure() {
        // Router could not be injected in constructor due to cyclic dependency with APP_INITIALIZER:
        const router = this.injector.get(Router);
        router.resetConfig(this.configureRoutes(router.config));
    }
    /**
     * Sets the property `path` or `matcher` for the given routes, based on the Spartacus' routing configuration.
     *
     * @param routes list of Angular `Route` objects
     */
    configureRoutes(routes) {
        return routes.map((route) => {
            const configuredRoute = this.configureRoute(route);
            if (route.children && route.children.length) {
                configuredRoute.children = this.configureRoutes(route.children);
            }
            return configuredRoute;
        });
    }
    /**
     * Sets the property `path` or `matcher` of the `Route`, based on the Spartacus' routing configuration.
     * Uses the property `data.cxRoute` to determine the name of the route.
     * It's the same name used as a key in the routing configuration: `routing.routes[ROUTE NAME]`.
     *
     * @param route Angular `Route` object
     */
    configureRoute(route) {
        const routeName = this.getRouteName(route);
        if (routeName) {
            const routeConfig = this.routingConfigService.getRouteConfig(routeName);
            this.validateRouteConfig(routeConfig, routeName, route);
            if (routeConfig?.disabled) {
                delete route.path;
                return {
                    ...route,
                    matcher: this.urlMatcherService.getFalsy(),
                };
            }
            else if (routeConfig?.matchers) {
                delete route.path;
                return {
                    ...route,
                    matcher: this.resolveUrlMatchers(route, routeConfig?.matchers),
                };
            }
            else if (routeConfig?.paths?.length === 1) {
                delete route.matcher;
                return { ...route, path: routeConfig?.paths[0] };
            }
            else {
                delete route.path;
                return {
                    ...route,
                    matcher: this.urlMatcherService.getFromPaths(routeConfig?.paths || []),
                };
            }
        }
        return route; // if route doesn't have a name, just pass the original route
    }
    /**
     * Creates a single `UrlMatcher` based on given matchers and factories of matchers.
     *
     * @param route Route object
     * @param matchersOrFactories `UrlMatcher`s or injection tokens with a factory functions
     *  that create UrlMatchers based on the given route.
     */
    resolveUrlMatchers(route, matchersOrFactories) {
        const matchers = matchersOrFactories?.map((matcherOrFactory) => {
            return typeof matcherOrFactory === 'function'
                ? matcherOrFactory // matcher
                : this.resolveUrlMatcherFactory(route, matcherOrFactory); // factory injection token
        }) ?? [];
        return this.urlMatcherService.getCombined(matchers);
    }
    /**
     * Creates an `UrlMatcher` based on the given route, using the factory function coming from the given injection token.
     *
     * @param route Route object
     * @param factoryToken injection token with a factory function that will create an UrlMatcher using given route
     */
    resolveUrlMatcherFactory(route, factoryToken) {
        const factory = this.injector.get(factoryToken);
        return factory(route);
    }
    /**
     * Returns the name of the Route stored in its property `data.cxRoute`
     * @param route
     */
    getRouteName(route) {
        return route.data && route.data.cxRoute;
    }
    validateRouteConfig(routeConfig, routeName, route) {
        if (isDevMode()) {
            // - null value of routeConfig or routeConfig.paths means explicit switching off the route - it's valid config
            // - routeConfig with defined `matchers` is valid, even if `paths` are undefined
            if (routeConfig === null ||
                routeConfig?.paths === null ||
                routeConfig?.matchers) {
                return;
            }
            // undefined value of routeConfig or routeConfig.paths is a misconfiguration
            if (!routeConfig?.paths) {
                this.warn(`Could not configure the named route '${routeName}'`, route, `due to undefined config or undefined 'paths' property for this route`);
                return;
            }
        }
    }
    warn(...args) {
        if (isDevMode()) {
            this.logger.warn(...args);
        }
    }
}
ConfigurableRoutesService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigurableRoutesService, deps: [{ token: i0.Injector }, { token: i1.RoutingConfigService }, { token: i2.UrlMatcherService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfigurableRoutesService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigurableRoutesService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigurableRoutesService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.RoutingConfigService }, { type: i2.UrlMatcherService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhYmxlLXJvdXRlcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvcm91dGluZy9jb25maWd1cmFibGUtcm91dGVzL2NvbmZpZ3VyYWJsZS1yb3V0ZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLFVBQVUsRUFHVixNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBUyxNQUFNLEVBQXNCLE1BQU0saUJBQWlCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7OztBQU83QyxNQUFNLE9BQU8seUJBQXlCO0lBR3BDLFlBQ1ksUUFBa0IsRUFDbEIsb0JBQTBDLEVBQzFDLGlCQUFvQztRQUZwQyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUx0QyxXQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBUS9CLGVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQywwQ0FBMEM7SUFGckUsQ0FBQztJQUlKOzs7T0FHRztJQUNILElBQUk7UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUV2QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDbEI7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDTyxTQUFTO1FBQ2pCLDZGQUE2RjtRQUM3RixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVEOzs7O09BSUc7SUFDTyxlQUFlLENBQUMsTUFBYztRQUN0QyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUMxQixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRW5ELElBQUksS0FBSyxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtnQkFDM0MsZUFBZSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNqRTtZQUNELE9BQU8sZUFBZSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNPLGNBQWMsQ0FBQyxLQUFZO1FBQ25DLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsSUFBSSxTQUFTLEVBQUU7WUFDYixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRXhELElBQUksV0FBVyxFQUFFLFFBQVEsRUFBRTtnQkFDekIsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNsQixPQUFPO29CQUNMLEdBQUcsS0FBSztvQkFDUixPQUFPLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRTtpQkFDM0MsQ0FBQzthQUNIO2lCQUFNLElBQUksV0FBVyxFQUFFLFFBQVEsRUFBRTtnQkFDaEMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNsQixPQUFPO29CQUNMLEdBQUcsS0FBSztvQkFDUixPQUFPLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDO2lCQUMvRCxDQUFDO2FBQ0g7aUJBQU0sSUFBSSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQzNDLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQztnQkFDckIsT0FBTyxFQUFFLEdBQUcsS0FBSyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7YUFDbEQ7aUJBQU07Z0JBQ0wsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNsQixPQUFPO29CQUNMLEdBQUcsS0FBSztvQkFDUixPQUFPLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FDMUMsV0FBVyxFQUFFLEtBQUssSUFBSSxFQUFFLENBQ3pCO2lCQUNGLENBQUM7YUFDSDtTQUNGO1FBQ0QsT0FBTyxLQUFLLENBQUMsQ0FBQyw2REFBNkQ7SUFDN0UsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNPLGtCQUFrQixDQUMxQixLQUFZLEVBQ1osbUJBQTRDO1FBRTVDLE1BQU0sUUFBUSxHQUNaLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLEVBQUU7WUFDNUMsT0FBTyxPQUFPLGdCQUFnQixLQUFLLFVBQVU7Z0JBQzNDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVO2dCQUM3QixDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsMEJBQTBCO1FBQ3hGLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNYLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDTyx3QkFBd0IsQ0FDaEMsS0FBWSxFQUNaLFlBQStDO1FBRS9DLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hELE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7O09BR0c7SUFDTyxZQUFZLENBQUMsS0FBWTtRQUNqQyxPQUFPLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDMUMsQ0FBQztJQUVTLG1CQUFtQixDQUMzQixXQUEyQyxFQUMzQyxTQUFpQixFQUNqQixLQUFZO1FBRVosSUFBSSxTQUFTLEVBQUUsRUFBRTtZQUNmLDhHQUE4RztZQUM5RyxnRkFBZ0Y7WUFDaEYsSUFDRSxXQUFXLEtBQUssSUFBSTtnQkFDcEIsV0FBVyxFQUFFLEtBQUssS0FBSyxJQUFJO2dCQUMzQixXQUFXLEVBQUUsUUFBUSxFQUNyQjtnQkFDQSxPQUFPO2FBQ1I7WUFFRCw0RUFBNEU7WUFDNUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQ1Asd0NBQXdDLFNBQVMsR0FBRyxFQUNwRCxLQUFLLEVBQ0wsc0VBQXNFLENBQ3ZFLENBQUM7Z0JBQ0YsT0FBTzthQUNSO1NBQ0Y7SUFDSCxDQUFDO0lBRU8sSUFBSSxDQUFDLEdBQUcsSUFBVztRQUN6QixJQUFJLFNBQVMsRUFBRSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUMzQjtJQUNILENBQUM7O3NIQW5LVSx5QkFBeUI7MEhBQXpCLHlCQUF5QixjQURaLE1BQU07MkZBQ25CLHlCQUF5QjtrQkFEckMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBJbmplY3RhYmxlLFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSW5qZWN0b3IsXG4gIGluamVjdCxcbiAgaXNEZXZNb2RlLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlLCBSb3V0ZXIsIFJvdXRlcywgVXJsTWF0Y2hlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBMb2dnZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbG9nZ2VyJztcbmltcG9ydCB7IFVybE1hdGNoZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvdXJsLW1hdGNoZXIuc2VydmljZSc7XG5pbXBvcnQgeyBVcmxNYXRjaGVyRmFjdG9yeSB9IGZyb20gJy4uL3VybC1tYXRjaGVyL3VybC1tYXRjaGVyLWZhY3RvcnknO1xuaW1wb3J0IHsgUm91dGVDb25maWcgfSBmcm9tICcuL3JvdXRlcy1jb25maWcnO1xuaW1wb3J0IHsgUm91dGluZ0NvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL3JvdXRpbmctY29uZmlnLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYWJsZVJvdXRlc1NlcnZpY2Uge1xuICBwcm90ZWN0ZWQgbG9nZ2VyID0gaW5qZWN0KExvZ2dlclNlcnZpY2UpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJvdGVjdGVkIHJvdXRpbmdDb25maWdTZXJ2aWNlOiBSb3V0aW5nQ29uZmlnU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdXJsTWF0Y2hlclNlcnZpY2U6IFVybE1hdGNoZXJTZXJ2aWNlXG4gICkge31cblxuICBwcm90ZWN0ZWQgaW5pdENhbGxlZCA9IGZhbHNlOyAvLyBndWFyZCBub3QgdG8gY2FsbCBpbml0KCkgbW9yZSB0aGFuIG9uY2VcblxuICAvKipcbiAgICogRW5oYW5jZXMgZXhpc3RpbmcgQW5ndWxhciByb3V0ZXMgdXNpbmcgdGhlIHJvdXRpbmcgY29uZmlnIG9mIFNwYXJ0YWN1cy5cbiAgICogQ2FuIGJlIGNhbGxlZCBvbmx5IG9uY2UuXG4gICAqL1xuICBpbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pbml0Q2FsbGVkKSB7XG4gICAgICB0aGlzLmluaXRDYWxsZWQgPSB0cnVlO1xuXG4gICAgICB0aGlzLmNvbmZpZ3VyZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbmhhbmNlcyBleGlzdGluZyBBbmd1bGFyIHJvdXRlcyB1c2luZyB0aGUgcm91dGluZyBjb25maWcgb2YgU3BhcnRhY3VzLlxuICAgKi9cbiAgcHJvdGVjdGVkIGNvbmZpZ3VyZSgpOiB2b2lkIHtcbiAgICAvLyBSb3V0ZXIgY291bGQgbm90IGJlIGluamVjdGVkIGluIGNvbnN0cnVjdG9yIGR1ZSB0byBjeWNsaWMgZGVwZW5kZW5jeSB3aXRoIEFQUF9JTklUSUFMSVpFUjpcbiAgICBjb25zdCByb3V0ZXIgPSB0aGlzLmluamVjdG9yLmdldChSb3V0ZXIpO1xuICAgIHJvdXRlci5yZXNldENvbmZpZyh0aGlzLmNvbmZpZ3VyZVJvdXRlcyhyb3V0ZXIuY29uZmlnKSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgcHJvcGVydHkgYHBhdGhgIG9yIGBtYXRjaGVyYCBmb3IgdGhlIGdpdmVuIHJvdXRlcywgYmFzZWQgb24gdGhlIFNwYXJ0YWN1cycgcm91dGluZyBjb25maWd1cmF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gcm91dGVzIGxpc3Qgb2YgQW5ndWxhciBgUm91dGVgIG9iamVjdHNcbiAgICovXG4gIHByb3RlY3RlZCBjb25maWd1cmVSb3V0ZXMocm91dGVzOiBSb3V0ZXMpOiBSb3V0ZXMge1xuICAgIHJldHVybiByb3V0ZXMubWFwKChyb3V0ZSkgPT4ge1xuICAgICAgY29uc3QgY29uZmlndXJlZFJvdXRlID0gdGhpcy5jb25maWd1cmVSb3V0ZShyb3V0ZSk7XG5cbiAgICAgIGlmIChyb3V0ZS5jaGlsZHJlbiAmJiByb3V0ZS5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgY29uZmlndXJlZFJvdXRlLmNoaWxkcmVuID0gdGhpcy5jb25maWd1cmVSb3V0ZXMocm91dGUuY2hpbGRyZW4pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbmZpZ3VyZWRSb3V0ZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBwcm9wZXJ0eSBgcGF0aGAgb3IgYG1hdGNoZXJgIG9mIHRoZSBgUm91dGVgLCBiYXNlZCBvbiB0aGUgU3BhcnRhY3VzJyByb3V0aW5nIGNvbmZpZ3VyYXRpb24uXG4gICAqIFVzZXMgdGhlIHByb3BlcnR5IGBkYXRhLmN4Um91dGVgIHRvIGRldGVybWluZSB0aGUgbmFtZSBvZiB0aGUgcm91dGUuXG4gICAqIEl0J3MgdGhlIHNhbWUgbmFtZSB1c2VkIGFzIGEga2V5IGluIHRoZSByb3V0aW5nIGNvbmZpZ3VyYXRpb246IGByb3V0aW5nLnJvdXRlc1tST1VURSBOQU1FXWAuXG4gICAqXG4gICAqIEBwYXJhbSByb3V0ZSBBbmd1bGFyIGBSb3V0ZWAgb2JqZWN0XG4gICAqL1xuICBwcm90ZWN0ZWQgY29uZmlndXJlUm91dGUocm91dGU6IFJvdXRlKTogUm91dGUge1xuICAgIGNvbnN0IHJvdXRlTmFtZSA9IHRoaXMuZ2V0Um91dGVOYW1lKHJvdXRlKTtcbiAgICBpZiAocm91dGVOYW1lKSB7XG4gICAgICBjb25zdCByb3V0ZUNvbmZpZyA9IHRoaXMucm91dGluZ0NvbmZpZ1NlcnZpY2UuZ2V0Um91dGVDb25maWcocm91dGVOYW1lKTtcbiAgICAgIHRoaXMudmFsaWRhdGVSb3V0ZUNvbmZpZyhyb3V0ZUNvbmZpZywgcm91dGVOYW1lLCByb3V0ZSk7XG5cbiAgICAgIGlmIChyb3V0ZUNvbmZpZz8uZGlzYWJsZWQpIHtcbiAgICAgICAgZGVsZXRlIHJvdXRlLnBhdGg7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4ucm91dGUsXG4gICAgICAgICAgbWF0Y2hlcjogdGhpcy51cmxNYXRjaGVyU2VydmljZS5nZXRGYWxzeSgpLFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChyb3V0ZUNvbmZpZz8ubWF0Y2hlcnMpIHtcbiAgICAgICAgZGVsZXRlIHJvdXRlLnBhdGg7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4ucm91dGUsXG4gICAgICAgICAgbWF0Y2hlcjogdGhpcy5yZXNvbHZlVXJsTWF0Y2hlcnMocm91dGUsIHJvdXRlQ29uZmlnPy5tYXRjaGVycyksXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKHJvdXRlQ29uZmlnPy5wYXRocz8ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGRlbGV0ZSByb3V0ZS5tYXRjaGVyO1xuICAgICAgICByZXR1cm4geyAuLi5yb3V0ZSwgcGF0aDogcm91dGVDb25maWc/LnBhdGhzWzBdIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgcm91dGUucGF0aDtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5yb3V0ZSxcbiAgICAgICAgICBtYXRjaGVyOiB0aGlzLnVybE1hdGNoZXJTZXJ2aWNlLmdldEZyb21QYXRocyhcbiAgICAgICAgICAgIHJvdXRlQ29uZmlnPy5wYXRocyB8fCBbXVxuICAgICAgICAgICksXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByb3V0ZTsgLy8gaWYgcm91dGUgZG9lc24ndCBoYXZlIGEgbmFtZSwganVzdCBwYXNzIHRoZSBvcmlnaW5hbCByb3V0ZVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBzaW5nbGUgYFVybE1hdGNoZXJgIGJhc2VkIG9uIGdpdmVuIG1hdGNoZXJzIGFuZCBmYWN0b3JpZXMgb2YgbWF0Y2hlcnMuXG4gICAqXG4gICAqIEBwYXJhbSByb3V0ZSBSb3V0ZSBvYmplY3RcbiAgICogQHBhcmFtIG1hdGNoZXJzT3JGYWN0b3JpZXMgYFVybE1hdGNoZXJgcyBvciBpbmplY3Rpb24gdG9rZW5zIHdpdGggYSBmYWN0b3J5IGZ1bmN0aW9uc1xuICAgKiAgdGhhdCBjcmVhdGUgVXJsTWF0Y2hlcnMgYmFzZWQgb24gdGhlIGdpdmVuIHJvdXRlLlxuICAgKi9cbiAgcHJvdGVjdGVkIHJlc29sdmVVcmxNYXRjaGVycyhcbiAgICByb3V0ZTogUm91dGUsXG4gICAgbWF0Y2hlcnNPckZhY3RvcmllczogUm91dGVDb25maWdbJ21hdGNoZXJzJ11cbiAgKTogVXJsTWF0Y2hlciB7XG4gICAgY29uc3QgbWF0Y2hlcnM6IFVybE1hdGNoZXJbXSA9XG4gICAgICBtYXRjaGVyc09yRmFjdG9yaWVzPy5tYXAoKG1hdGNoZXJPckZhY3RvcnkpID0+IHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBtYXRjaGVyT3JGYWN0b3J5ID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgPyBtYXRjaGVyT3JGYWN0b3J5IC8vIG1hdGNoZXJcbiAgICAgICAgICA6IHRoaXMucmVzb2x2ZVVybE1hdGNoZXJGYWN0b3J5KHJvdXRlLCBtYXRjaGVyT3JGYWN0b3J5KTsgLy8gZmFjdG9yeSBpbmplY3Rpb24gdG9rZW5cbiAgICAgIH0pID8/IFtdO1xuICAgIHJldHVybiB0aGlzLnVybE1hdGNoZXJTZXJ2aWNlLmdldENvbWJpbmVkKG1hdGNoZXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGBVcmxNYXRjaGVyYCBiYXNlZCBvbiB0aGUgZ2l2ZW4gcm91dGUsIHVzaW5nIHRoZSBmYWN0b3J5IGZ1bmN0aW9uIGNvbWluZyBmcm9tIHRoZSBnaXZlbiBpbmplY3Rpb24gdG9rZW4uXG4gICAqXG4gICAqIEBwYXJhbSByb3V0ZSBSb3V0ZSBvYmplY3RcbiAgICogQHBhcmFtIGZhY3RvcnlUb2tlbiBpbmplY3Rpb24gdG9rZW4gd2l0aCBhIGZhY3RvcnkgZnVuY3Rpb24gdGhhdCB3aWxsIGNyZWF0ZSBhbiBVcmxNYXRjaGVyIHVzaW5nIGdpdmVuIHJvdXRlXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVzb2x2ZVVybE1hdGNoZXJGYWN0b3J5KFxuICAgIHJvdXRlOiBSb3V0ZSxcbiAgICBmYWN0b3J5VG9rZW46IEluamVjdGlvblRva2VuPFVybE1hdGNoZXJGYWN0b3J5PlxuICApOiBVcmxNYXRjaGVyIHtcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5pbmplY3Rvci5nZXQoZmFjdG9yeVRva2VuKTtcbiAgICByZXR1cm4gZmFjdG9yeShyb3V0ZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgUm91dGUgc3RvcmVkIGluIGl0cyBwcm9wZXJ0eSBgZGF0YS5jeFJvdXRlYFxuICAgKiBAcGFyYW0gcm91dGVcbiAgICovXG4gIHByb3RlY3RlZCBnZXRSb3V0ZU5hbWUocm91dGU6IFJvdXRlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gcm91dGUuZGF0YSAmJiByb3V0ZS5kYXRhLmN4Um91dGU7XG4gIH1cblxuICBwcm90ZWN0ZWQgdmFsaWRhdGVSb3V0ZUNvbmZpZyhcbiAgICByb3V0ZUNvbmZpZzogUm91dGVDb25maWcgfCBudWxsIHwgdW5kZWZpbmVkLFxuICAgIHJvdXRlTmFtZTogc3RyaW5nLFxuICAgIHJvdXRlOiBSb3V0ZVxuICApIHtcbiAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgIC8vIC0gbnVsbCB2YWx1ZSBvZiByb3V0ZUNvbmZpZyBvciByb3V0ZUNvbmZpZy5wYXRocyBtZWFucyBleHBsaWNpdCBzd2l0Y2hpbmcgb2ZmIHRoZSByb3V0ZSAtIGl0J3MgdmFsaWQgY29uZmlnXG4gICAgICAvLyAtIHJvdXRlQ29uZmlnIHdpdGggZGVmaW5lZCBgbWF0Y2hlcnNgIGlzIHZhbGlkLCBldmVuIGlmIGBwYXRoc2AgYXJlIHVuZGVmaW5lZFxuICAgICAgaWYgKFxuICAgICAgICByb3V0ZUNvbmZpZyA9PT0gbnVsbCB8fFxuICAgICAgICByb3V0ZUNvbmZpZz8ucGF0aHMgPT09IG51bGwgfHxcbiAgICAgICAgcm91dGVDb25maWc/Lm1hdGNoZXJzXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyB1bmRlZmluZWQgdmFsdWUgb2Ygcm91dGVDb25maWcgb3Igcm91dGVDb25maWcucGF0aHMgaXMgYSBtaXNjb25maWd1cmF0aW9uXG4gICAgICBpZiAoIXJvdXRlQ29uZmlnPy5wYXRocykge1xuICAgICAgICB0aGlzLndhcm4oXG4gICAgICAgICAgYENvdWxkIG5vdCBjb25maWd1cmUgdGhlIG5hbWVkIHJvdXRlICcke3JvdXRlTmFtZX0nYCxcbiAgICAgICAgICByb3V0ZSxcbiAgICAgICAgICBgZHVlIHRvIHVuZGVmaW5lZCBjb25maWcgb3IgdW5kZWZpbmVkICdwYXRocycgcHJvcGVydHkgZm9yIHRoaXMgcm91dGVgXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHdhcm4oLi4uYXJnczogYW55W10pIHtcbiAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4oLi4uYXJncyk7XG4gICAgfVxuICB9XG59XG4iXX0=