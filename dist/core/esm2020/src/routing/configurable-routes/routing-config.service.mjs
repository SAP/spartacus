/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, inject, isDevMode } from '@angular/core';
import { LoggerService } from '../../logger';
import * as i0 from "@angular/core";
import * as i1 from "./config/routing-config";
export class RoutingConfigService {
    constructor(config) {
        this.config = config;
        this.logger = inject(LoggerService);
    }
    /**
     * Returns the route config for the given route name.
     */
    getRouteConfig(routeName) {
        const routeConfig = this.config?.routing?.routes;
        const result = routeConfig && routeConfig[routeName];
        if (!routeConfig || result === undefined) {
            this.warn(`No path was configured for the named route '${routeName}'!`);
        }
        return result;
    }
    warn(...args) {
        if (isDevMode()) {
            this.logger.warn(...args);
        }
    }
    /**
     * Returns the configured route loading strategy.
     */
    getLoadStrategy() {
        return this.config?.routing?.loadStrategy ?? "always" /* RouteLoadStrategy.ALWAYS */;
    }
    /**
     * Returns the route name of the configured path.
     *
     * For example, when the config is:
     * ```
     * routing: {
     *   routes: {
     *      addressBook: { paths: ['my-account/address-book'] }
     *   }
     * }
     * ```
     *
     * the `getRouteName('my-account/address-book')` returns `'addressBook'`.
     */
    getRouteName(path) {
        if (!this.routeNamesByPath) {
            this.initRouteNamesByPath();
        }
        return this.routeNamesByPath[path];
    }
    /**
     * Initializes the property `routeNamesByPath`.
     *
     * The original config allows for reading configured path by the route name.
     * But this method builds up a structure with a 'reversed config'
     * to read quickly the route name by the path.
     */
    initRouteNamesByPath() {
        this.routeNamesByPath = {};
        for (const [routeName, routeConfig] of Object.entries(this.config?.routing?.routes ?? {})) {
            routeConfig?.paths?.forEach((path) => {
                if (isDevMode() && this.routeNamesByPath[path]) {
                    this.logger.error(`The same path '${path}' is configured for two different route names: '${this.routeNamesByPath[path]}' and '${routeName}`);
                }
                this.routeNamesByPath[path] = routeName;
            });
        }
    }
}
RoutingConfigService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RoutingConfigService, deps: [{ token: i1.RoutingConfig }], target: i0.ɵɵFactoryTarget.Injectable });
RoutingConfigService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RoutingConfigService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RoutingConfigService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.RoutingConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy1jb25maWcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3JvdXRpbmcvY29uZmlndXJhYmxlLXJvdXRlcy9yb3V0aW5nLWNvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7O0FBSzdDLE1BQU0sT0FBTyxvQkFBb0I7SUFRL0IsWUFBc0IsTUFBcUI7UUFBckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUZqQyxXQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRUssQ0FBQztJQUUvQzs7T0FFRztJQUNILGNBQWMsQ0FBQyxTQUFpQjtRQUM5QixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUM7UUFFakQsTUFBTSxNQUFNLEdBQUcsV0FBVyxJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsV0FBVyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQywrQ0FBK0MsU0FBUyxJQUFJLENBQUMsQ0FBQztTQUN6RTtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFTyxJQUFJLENBQUMsR0FBRyxJQUFjO1FBQzVCLElBQUksU0FBUyxFQUFFLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZUFBZTtRQUNiLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsWUFBWSwyQ0FBNEIsQ0FBQztJQUN4RSxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILFlBQVksQ0FBQyxJQUFZO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7U0FDN0I7UUFDRCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ08sb0JBQW9CO1FBQzVCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFFM0IsS0FBSyxNQUFNLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQ25ELElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sSUFBSSxFQUFFLENBQ25DLEVBQUU7WUFDRCxXQUFXLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNuQyxJQUFJLFNBQVMsRUFBRSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQ2Ysa0JBQWtCLElBQUksbURBQW1ELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxTQUFTLEVBQUUsQ0FDMUgsQ0FBQztpQkFDSDtnQkFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOztpSEEvRVUsb0JBQW9CO3FIQUFwQixvQkFBb0IsY0FEUCxNQUFNOzJGQUNuQixvQkFBb0I7a0JBRGhDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgaW5qZWN0LCBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvZ2dlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9sb2dnZXInO1xuaW1wb3J0IHsgUm91dGVMb2FkU3RyYXRlZ3ksIFJvdXRpbmdDb25maWcgfSBmcm9tICcuL2NvbmZpZy9yb3V0aW5nLWNvbmZpZyc7XG5pbXBvcnQgeyBSb3V0ZUNvbmZpZyB9IGZyb20gJy4vcm91dGVzLWNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgUm91dGluZ0NvbmZpZ1NlcnZpY2Uge1xuICAvKipcbiAgICogUmV2ZXJzZWQgcm91dGluZyBjb25maWcgZm9yIHF1aWNrIGxvb2t1cCBvZiB0aGUgcm91dGUgbmFtZSBieSB0aGUgY29uZmlndXJlZCBwYXRoLlxuICAgKi9cbiAgcHJvdGVjdGVkIHJvdXRlTmFtZXNCeVBhdGg6IHsgW3BhdGg6IHN0cmluZ106IHN0cmluZyB9O1xuXG4gIHByb3RlY3RlZCBsb2dnZXIgPSBpbmplY3QoTG9nZ2VyU2VydmljZSk7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNvbmZpZzogUm91dGluZ0NvbmZpZykge31cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm91dGUgY29uZmlnIGZvciB0aGUgZ2l2ZW4gcm91dGUgbmFtZS5cbiAgICovXG4gIGdldFJvdXRlQ29uZmlnKHJvdXRlTmFtZTogc3RyaW5nKTogUm91dGVDb25maWcgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHJvdXRlQ29uZmlnID0gdGhpcy5jb25maWc/LnJvdXRpbmc/LnJvdXRlcztcblxuICAgIGNvbnN0IHJlc3VsdCA9IHJvdXRlQ29uZmlnICYmIHJvdXRlQ29uZmlnW3JvdXRlTmFtZV07XG4gICAgaWYgKCFyb3V0ZUNvbmZpZyB8fCByZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy53YXJuKGBObyBwYXRoIHdhcyBjb25maWd1cmVkIGZvciB0aGUgbmFtZWQgcm91dGUgJyR7cm91dGVOYW1lfSchYCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHdhcm4oLi4uYXJnczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4oLi4uYXJncyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNvbmZpZ3VyZWQgcm91dGUgbG9hZGluZyBzdHJhdGVneS5cbiAgICovXG4gIGdldExvYWRTdHJhdGVneSgpOiBSb3V0ZUxvYWRTdHJhdGVneSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnPy5yb3V0aW5nPy5sb2FkU3RyYXRlZ3kgPz8gUm91dGVMb2FkU3RyYXRlZ3kuQUxXQVlTO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvdXRlIG5hbWUgb2YgdGhlIGNvbmZpZ3VyZWQgcGF0aC5cbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIHdoZW4gdGhlIGNvbmZpZyBpczpcbiAgICogYGBgXG4gICAqIHJvdXRpbmc6IHtcbiAgICogICByb3V0ZXM6IHtcbiAgICogICAgICBhZGRyZXNzQm9vazogeyBwYXRoczogWydteS1hY2NvdW50L2FkZHJlc3MtYm9vayddIH1cbiAgICogICB9XG4gICAqIH1cbiAgICogYGBgXG4gICAqXG4gICAqIHRoZSBgZ2V0Um91dGVOYW1lKCdteS1hY2NvdW50L2FkZHJlc3MtYm9vaycpYCByZXR1cm5zIGAnYWRkcmVzc0Jvb2snYC5cbiAgICovXG4gIGdldFJvdXRlTmFtZShwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy5yb3V0ZU5hbWVzQnlQYXRoKSB7XG4gICAgICB0aGlzLmluaXRSb3V0ZU5hbWVzQnlQYXRoKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJvdXRlTmFtZXNCeVBhdGhbcGF0aF07XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIHByb3BlcnR5IGByb3V0ZU5hbWVzQnlQYXRoYC5cbiAgICpcbiAgICogVGhlIG9yaWdpbmFsIGNvbmZpZyBhbGxvd3MgZm9yIHJlYWRpbmcgY29uZmlndXJlZCBwYXRoIGJ5IHRoZSByb3V0ZSBuYW1lLlxuICAgKiBCdXQgdGhpcyBtZXRob2QgYnVpbGRzIHVwIGEgc3RydWN0dXJlIHdpdGggYSAncmV2ZXJzZWQgY29uZmlnJ1xuICAgKiB0byByZWFkIHF1aWNrbHkgdGhlIHJvdXRlIG5hbWUgYnkgdGhlIHBhdGguXG4gICAqL1xuICBwcm90ZWN0ZWQgaW5pdFJvdXRlTmFtZXNCeVBhdGgoKTogdm9pZCB7XG4gICAgdGhpcy5yb3V0ZU5hbWVzQnlQYXRoID0ge307XG5cbiAgICBmb3IgKGNvbnN0IFtyb3V0ZU5hbWUsIHJvdXRlQ29uZmlnXSBvZiBPYmplY3QuZW50cmllcyhcbiAgICAgIHRoaXMuY29uZmlnPy5yb3V0aW5nPy5yb3V0ZXMgPz8ge31cbiAgICApKSB7XG4gICAgICByb3V0ZUNvbmZpZz8ucGF0aHM/LmZvckVhY2goKHBhdGgpID0+IHtcbiAgICAgICAgaWYgKGlzRGV2TW9kZSgpICYmIHRoaXMucm91dGVOYW1lc0J5UGF0aFtwYXRoXSkge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKFxuICAgICAgICAgICAgYFRoZSBzYW1lIHBhdGggJyR7cGF0aH0nIGlzIGNvbmZpZ3VyZWQgZm9yIHR3byBkaWZmZXJlbnQgcm91dGUgbmFtZXM6ICcke3RoaXMucm91dGVOYW1lc0J5UGF0aFtwYXRoXX0nIGFuZCAnJHtyb3V0ZU5hbWV9YFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yb3V0ZU5hbWVzQnlQYXRoW3BhdGhdID0gcm91dGVOYW1lO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=