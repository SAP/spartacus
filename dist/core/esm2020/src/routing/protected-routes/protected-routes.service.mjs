/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../configurable-routes/config/routing-config";
import * as i2 from "../configurable-routes/url-translation/url-parsing.service";
export class ProtectedRoutesService {
    get routingConfig() {
        return this.config && this.config.routing;
    }
    /**
     * Returns 'protected' property (boolean) from routing config
     *
     * @returns boolean
     */
    get shouldProtect() {
        return !!this.routingConfig?.protected;
    }
    constructor(config, urlParsingService) {
        this.config = config;
        this.urlParsingService = urlParsingService;
        this.nonProtectedPaths = []; // arrays of paths' segments list
        if (this.shouldProtect) {
            // pre-process config for performance:
            this.nonProtectedPaths = this.getNonProtectedPaths().map((path) => this.getSegments(path));
        }
    }
    /**
     * Tells if the url is protected
     */
    isUrlProtected(urlSegments) {
        return (this.shouldProtect &&
            !this.matchAnyPath(urlSegments, this.nonProtectedPaths));
    }
    /**
     * Tells whether the url matches at least one of the paths
     */
    matchAnyPath(urlSegments, pathsSegments) {
        return pathsSegments.some((pathSegments) => this.matchPath(urlSegments, pathSegments));
    }
    /**
     * Tells whether the url matches the path
     */
    matchPath(urlSegments, pathSegments) {
        return this.urlParsingService.matchPath(urlSegments, pathSegments);
    }
    /**
     * Returns a list of paths that are not protected
     */
    getNonProtectedPaths() {
        return Object.values(this.routingConfig?.routes ?? {}).reduce((acc, routeConfig) => routeConfig.protected === false && // must be explicitly false, ignore undefined
            routeConfig.paths &&
            routeConfig.paths.length
            ? acc.concat(routeConfig?.paths ?? [])
            : acc, []);
    }
    /**
     * Splits the url by slashes
     */
    getSegments(url) {
        return (url || '').split('/');
    }
}
ProtectedRoutesService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProtectedRoutesService, deps: [{ token: i1.RoutingConfig }, { token: i2.UrlParsingService }], target: i0.ɵɵFactoryTarget.Injectable });
ProtectedRoutesService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProtectedRoutesService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProtectedRoutesService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.RoutingConfig }, { type: i2.UrlParsingService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdGVjdGVkLXJvdXRlcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvcm91dGluZy9wcm90ZWN0ZWQtcm91dGVzL3Byb3RlY3RlZC1yb3V0ZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUszQyxNQUFNLE9BQU8sc0JBQXNCO0lBR2pDLElBQWMsYUFBYTtRQUN6QixPQUFPLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDNUMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxJQUFXLGFBQWE7UUFDdEIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUM7SUFDekMsQ0FBQztJQUVELFlBQ1ksTUFBcUIsRUFDckIsaUJBQW9DO1FBRHBDLFdBQU0sR0FBTixNQUFNLENBQWU7UUFDckIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQWpCeEMsc0JBQWlCLEdBQWUsRUFBRSxDQUFDLENBQUMsaUNBQWlDO1FBbUIzRSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsc0NBQXNDO1lBQ3RDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUNoRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUN2QixDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxjQUFjLENBQUMsV0FBcUI7UUFDbEMsT0FBTyxDQUNMLElBQUksQ0FBQyxhQUFhO1lBQ2xCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQ3hELENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDTyxZQUFZLENBQ3BCLFdBQXFCLEVBQ3JCLGFBQXlCO1FBRXpCLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQ3pDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUMxQyxDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ08sU0FBUyxDQUFDLFdBQXFCLEVBQUUsWUFBc0I7UUFDL0QsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQ7O09BRUc7SUFDTyxvQkFBb0I7UUFDNUIsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FDM0QsQ0FBQyxHQUFHLEVBQUUsV0FBVyxFQUFFLEVBQUUsQ0FDbkIsV0FBVyxDQUFDLFNBQVMsS0FBSyxLQUFLLElBQUksNkNBQTZDO1lBQ2hGLFdBQVcsQ0FBQyxLQUFLO1lBQ2pCLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUN0QixDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUN0QyxDQUFDLENBQUMsR0FBRyxFQUNULEVBQUUsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ08sV0FBVyxDQUFDLEdBQVc7UUFDL0IsT0FBTyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7bUhBN0VVLHNCQUFzQjt1SEFBdEIsc0JBQXNCLGNBRFQsTUFBTTsyRkFDbkIsc0JBQXNCO2tCQURsQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRpbmdDb25maWcgfSBmcm9tICcuLi9jb25maWd1cmFibGUtcm91dGVzL2NvbmZpZy9yb3V0aW5nLWNvbmZpZyc7XG5pbXBvcnQgeyBVcmxQYXJzaW5nU2VydmljZSB9IGZyb20gJy4uL2NvbmZpZ3VyYWJsZS1yb3V0ZXMvdXJsLXRyYW5zbGF0aW9uL3VybC1wYXJzaW5nLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFByb3RlY3RlZFJvdXRlc1NlcnZpY2Uge1xuICBwcml2YXRlIG5vblByb3RlY3RlZFBhdGhzOiBzdHJpbmdbXVtdID0gW107IC8vIGFycmF5cyBvZiBwYXRocycgc2VnbWVudHMgbGlzdFxuXG4gIHByb3RlY3RlZCBnZXQgcm91dGluZ0NvbmZpZygpOiBSb3V0aW5nQ29uZmlnWydyb3V0aW5nJ10ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZyAmJiB0aGlzLmNvbmZpZy5yb3V0aW5nO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgJ3Byb3RlY3RlZCcgcHJvcGVydHkgKGJvb2xlYW4pIGZyb20gcm91dGluZyBjb25maWdcbiAgICpcbiAgICogQHJldHVybnMgYm9vbGVhblxuICAgKi9cbiAgcHVibGljIGdldCBzaG91bGRQcm90ZWN0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMucm91dGluZ0NvbmZpZz8ucHJvdGVjdGVkO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNvbmZpZzogUm91dGluZ0NvbmZpZyxcbiAgICBwcm90ZWN0ZWQgdXJsUGFyc2luZ1NlcnZpY2U6IFVybFBhcnNpbmdTZXJ2aWNlXG4gICkge1xuICAgIGlmICh0aGlzLnNob3VsZFByb3RlY3QpIHtcbiAgICAgIC8vIHByZS1wcm9jZXNzIGNvbmZpZyBmb3IgcGVyZm9ybWFuY2U6XG4gICAgICB0aGlzLm5vblByb3RlY3RlZFBhdGhzID0gdGhpcy5nZXROb25Qcm90ZWN0ZWRQYXRocygpLm1hcCgocGF0aCkgPT5cbiAgICAgICAgdGhpcy5nZXRTZWdtZW50cyhwYXRoKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGVsbHMgaWYgdGhlIHVybCBpcyBwcm90ZWN0ZWRcbiAgICovXG4gIGlzVXJsUHJvdGVjdGVkKHVybFNlZ21lbnRzOiBzdHJpbmdbXSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnNob3VsZFByb3RlY3QgJiZcbiAgICAgICF0aGlzLm1hdGNoQW55UGF0aCh1cmxTZWdtZW50cywgdGhpcy5ub25Qcm90ZWN0ZWRQYXRocylcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRlbGxzIHdoZXRoZXIgdGhlIHVybCBtYXRjaGVzIGF0IGxlYXN0IG9uZSBvZiB0aGUgcGF0aHNcbiAgICovXG4gIHByb3RlY3RlZCBtYXRjaEFueVBhdGgoXG4gICAgdXJsU2VnbWVudHM6IHN0cmluZ1tdLFxuICAgIHBhdGhzU2VnbWVudHM6IHN0cmluZ1tdW11cbiAgKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHBhdGhzU2VnbWVudHMuc29tZSgocGF0aFNlZ21lbnRzKSA9PlxuICAgICAgdGhpcy5tYXRjaFBhdGgodXJsU2VnbWVudHMsIHBhdGhTZWdtZW50cylcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRlbGxzIHdoZXRoZXIgdGhlIHVybCBtYXRjaGVzIHRoZSBwYXRoXG4gICAqL1xuICBwcm90ZWN0ZWQgbWF0Y2hQYXRoKHVybFNlZ21lbnRzOiBzdHJpbmdbXSwgcGF0aFNlZ21lbnRzOiBzdHJpbmdbXSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnVybFBhcnNpbmdTZXJ2aWNlLm1hdGNoUGF0aCh1cmxTZWdtZW50cywgcGF0aFNlZ21lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBwYXRocyB0aGF0IGFyZSBub3QgcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0Tm9uUHJvdGVjdGVkUGF0aHMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBPYmplY3QudmFsdWVzKHRoaXMucm91dGluZ0NvbmZpZz8ucm91dGVzID8/IHt9KS5yZWR1Y2U8c3RyaW5nW10+KFxuICAgICAgKGFjYywgcm91dGVDb25maWcpID0+XG4gICAgICAgIHJvdXRlQ29uZmlnLnByb3RlY3RlZCA9PT0gZmFsc2UgJiYgLy8gbXVzdCBiZSBleHBsaWNpdGx5IGZhbHNlLCBpZ25vcmUgdW5kZWZpbmVkXG4gICAgICAgIHJvdXRlQ29uZmlnLnBhdGhzICYmXG4gICAgICAgIHJvdXRlQ29uZmlnLnBhdGhzLmxlbmd0aFxuICAgICAgICAgID8gYWNjLmNvbmNhdChyb3V0ZUNvbmZpZz8ucGF0aHMgPz8gW10pXG4gICAgICAgICAgOiBhY2MsXG4gICAgICBbXVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogU3BsaXRzIHRoZSB1cmwgYnkgc2xhc2hlc1xuICAgKi9cbiAgcHJvdGVjdGVkIGdldFNlZ21lbnRzKHVybDogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgIHJldHVybiAodXJsIHx8ICcnKS5zcGxpdCgnLycpO1xuICB9XG59XG4iXX0=