/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../routing/configurable-routes/config/routing-config";
import * as i2 from "../../../routing/configurable-routes/url-translation/url-parsing.service";
export class AuthFlowRoutesService {
    constructor(config, urlParsingService) {
        this.config = config;
        this.urlParsingService = urlParsingService;
    }
    /**
     * List of paths that are part user auth flow
     */
    get authFlowPaths() {
        if (!this._authFlowPaths) {
            // extract from the routing config the paths that are part of the user auth flow
            this._authFlowPaths = Object.values(this.config?.routing?.routes || {}).reduce((acc, routeConfig) => routeConfig.authFlow === true && routeConfig.paths?.length
                ? acc.concat(routeConfig?.paths)
                : acc, []);
        }
        return this._authFlowPaths;
    }
    /**
     * Tells whether the given URL is a part of the user auth flow
     */
    isAuthFlow(url) {
        return this.authFlowPaths.some((path) => this.urlParsingService.matchPath(url, path));
    }
}
AuthFlowRoutesService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthFlowRoutesService, deps: [{ token: i1.RoutingConfig }, { token: i2.UrlParsingService }], target: i0.ɵɵFactoryTarget.Injectable });
AuthFlowRoutesService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthFlowRoutesService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthFlowRoutesService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.RoutingConfig }, { type: i2.UrlParsingService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1mbG93LXJvdXRlcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvYXV0aC91c2VyLWF1dGgvc2VydmljZXMvYXV0aC1mbG93LXJvdXRlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBSzNDLE1BQU0sT0FBTyxxQkFBcUI7SUFDaEMsWUFDWSxNQUFxQixFQUNyQixpQkFBb0M7UUFEcEMsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNyQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO0lBQzdDLENBQUM7SUFJSjs7T0FFRztJQUNILElBQWMsYUFBYTtRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN4QixnRkFBZ0Y7WUFDaEYsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUNqQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLElBQUksRUFBRSxDQUNuQyxDQUFDLE1BQU0sQ0FDTixDQUFDLEdBQUcsRUFBRSxXQUFXLEVBQUUsRUFBRSxDQUNuQixXQUFXLENBQUMsUUFBUSxLQUFLLElBQUksSUFBSSxXQUFXLENBQUMsS0FBSyxFQUFFLE1BQU07Z0JBQ3hELENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUM7Z0JBQ2hDLENBQUMsQ0FBQyxHQUFHLEVBQ1QsRUFBYyxDQUNmLENBQUM7U0FDSDtRQUNELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM3QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxVQUFVLENBQUMsR0FBVztRQUNwQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FDdEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQzVDLENBQUM7SUFDSixDQUFDOztrSEFsQ1UscUJBQXFCO3NIQUFyQixxQkFBcUIsY0FEUixNQUFNOzJGQUNuQixxQkFBcUI7a0JBRGpDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGluZ0NvbmZpZyB9IGZyb20gJy4uLy4uLy4uL3JvdXRpbmcvY29uZmlndXJhYmxlLXJvdXRlcy9jb25maWcvcm91dGluZy1jb25maWcnO1xuaW1wb3J0IHsgVXJsUGFyc2luZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9yb3V0aW5nL2NvbmZpZ3VyYWJsZS1yb3V0ZXMvdXJsLXRyYW5zbGF0aW9uL3VybC1wYXJzaW5nLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEF1dGhGbG93Um91dGVzU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjb25maWc6IFJvdXRpbmdDb25maWcsXG4gICAgcHJvdGVjdGVkIHVybFBhcnNpbmdTZXJ2aWNlOiBVcmxQYXJzaW5nU2VydmljZVxuICApIHt9XG5cbiAgcHJvdGVjdGVkIF9hdXRoRmxvd1BhdGhzOiBzdHJpbmdbXTtcblxuICAvKipcbiAgICogTGlzdCBvZiBwYXRocyB0aGF0IGFyZSBwYXJ0IHVzZXIgYXV0aCBmbG93XG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0IGF1dGhGbG93UGF0aHMoKTogc3RyaW5nW10ge1xuICAgIGlmICghdGhpcy5fYXV0aEZsb3dQYXRocykge1xuICAgICAgLy8gZXh0cmFjdCBmcm9tIHRoZSByb3V0aW5nIGNvbmZpZyB0aGUgcGF0aHMgdGhhdCBhcmUgcGFydCBvZiB0aGUgdXNlciBhdXRoIGZsb3dcbiAgICAgIHRoaXMuX2F1dGhGbG93UGF0aHMgPSBPYmplY3QudmFsdWVzKFxuICAgICAgICB0aGlzLmNvbmZpZz8ucm91dGluZz8ucm91dGVzIHx8IHt9XG4gICAgICApLnJlZHVjZShcbiAgICAgICAgKGFjYywgcm91dGVDb25maWcpID0+XG4gICAgICAgICAgcm91dGVDb25maWcuYXV0aEZsb3cgPT09IHRydWUgJiYgcm91dGVDb25maWcucGF0aHM/Lmxlbmd0aFxuICAgICAgICAgICAgPyBhY2MuY29uY2F0KHJvdXRlQ29uZmlnPy5wYXRocylcbiAgICAgICAgICAgIDogYWNjLFxuICAgICAgICBbXSBhcyBzdHJpbmdbXVxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2F1dGhGbG93UGF0aHM7XG4gIH1cblxuICAvKipcbiAgICogVGVsbHMgd2hldGhlciB0aGUgZ2l2ZW4gVVJMIGlzIGEgcGFydCBvZiB0aGUgdXNlciBhdXRoIGZsb3dcbiAgICovXG4gIGlzQXV0aEZsb3codXJsOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5hdXRoRmxvd1BhdGhzLnNvbWUoKHBhdGgpID0+XG4gICAgICB0aGlzLnVybFBhcnNpbmdTZXJ2aWNlLm1hdGNoUGF0aCh1cmwsIHBhdGgpXG4gICAgKTtcbiAgfVxufVxuIl19