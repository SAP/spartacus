/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { getParamName, isParam } from './path-utils';
import * as i0 from "@angular/core";
import * as i1 from "../routing-config.service";
import * as i2 from "./url-parsing.service";
export class SemanticPathService {
    constructor(routingConfigService, urlParser) {
        this.routingConfigService = routingConfigService;
        this.urlParser = urlParser;
        this.ROOT_URL = ['/'];
    }
    /**
     * Returns the first path alias configured for a given route name. It adds `/` at the beginning.
     */
    get(routeName) {
        const routeConfig = this.routingConfigService.getRouteConfig(routeName);
        return routeConfig && Array.isArray(routeConfig.paths)
            ? '/' + routeConfig.paths[0]
            : undefined;
    }
    /**
     * Transforms the array of url commands. Each command can be:
     * a) string - will be left untouched
     * b) object { cxRoute: <route name> } - will be replaced with semantic path
     * c) object { cxRoute: <route name>, params: { ... } } - same as above, but with passed params
     *
     * If the first command is the object with the `cxRoute` property, returns an absolute url (with the first element of the array `'/'`)
     */
    transform(commands) {
        if (!Array.isArray(commands)) {
            commands = [commands];
        }
        const result = [];
        for (const command of commands) {
            if (!this.isRouteCommand(command)) {
                // don't modify segment that is not route command:
                result.push(command);
            }
            else {
                // generate array with url segments for given route command:
                const partialResult = this.generateUrlPart(command);
                if (partialResult === null) {
                    return this.ROOT_URL;
                }
                result.push(...partialResult);
            }
        }
        if (this.shouldOutputAbsolute(commands)) {
            result.unshift('/');
        }
        return result;
    }
    isRouteCommand(command) {
        return command && Boolean(command.cxRoute);
    }
    shouldOutputAbsolute(commands) {
        return this.isRouteCommand(commands[0]);
    }
    generateUrlPart(command) {
        this.standarizeRouteCommand(command);
        if (!command.cxRoute) {
            return null;
        }
        const routeConfig = this.routingConfigService.getRouteConfig(command.cxRoute);
        // if no route translation was configured, return null:
        if (!routeConfig || !routeConfig.paths) {
            return null;
        }
        // find first path that can satisfy it's parameters with given parameters
        const path = this.findPathWithFillableParams(routeConfig, command.params);
        // if there is no configured path that can be satisfied with given params, return null
        if (!path) {
            return null;
        }
        const result = this.provideParamsValues(path, command.params, routeConfig.paramsMapping);
        return result;
    }
    standarizeRouteCommand(command) {
        command.params = command.params || {};
    }
    provideParamsValues(path, params, paramsMapping) {
        return this.urlParser.getPrimarySegments(path).map((segment) => {
            if (isParam(segment)) {
                const paramName = getParamName(segment);
                const mappedParamName = this.getMappedParamName(paramName, paramsMapping);
                return params?.[mappedParamName];
            }
            return segment;
        });
    }
    findPathWithFillableParams(routeConfig, params) {
        const foundPath = routeConfig.paths?.find((path) => this.getParams(path).every((paramName) => {
            const mappedParamName = this.getMappedParamName(paramName, routeConfig.paramsMapping);
            return params?.[mappedParamName] !== undefined;
        }));
        if (foundPath === undefined || foundPath === null) {
            return null;
        }
        return foundPath;
    }
    getParams(path) {
        return this.urlParser
            .getPrimarySegments(path)
            .filter(isParam)
            .map(getParamName);
    }
    getMappedParamName(paramName, paramsMapping) {
        if (paramsMapping) {
            return paramsMapping[paramName] || paramName;
        }
        return paramName;
    }
}
SemanticPathService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SemanticPathService, deps: [{ token: i1.RoutingConfigService }, { token: i2.UrlParsingService }], target: i0.ɵɵFactoryTarget.Injectable });
SemanticPathService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SemanticPathService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SemanticPathService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.RoutingConfigService }, { type: i2.UrlParsingService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtYW50aWMtcGF0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvcm91dGluZy9jb25maWd1cmFibGUtcm91dGVzL3VybC10cmFuc2xhdGlvbi9zZW1hbnRpYy1wYXRoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7Ozs7QUFLckQsTUFBTSxPQUFPLG1CQUFtQjtJQUc5QixZQUNZLG9CQUEwQyxFQUMxQyxTQUE0QjtRQUQ1Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLGNBQVMsR0FBVCxTQUFTLENBQW1CO1FBSi9CLGFBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBS3ZCLENBQUM7SUFFSjs7T0FFRztJQUNILEdBQUcsQ0FBQyxTQUFpQjtRQUNuQixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hFLE9BQU8sV0FBVyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUNwRCxDQUFDLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzVCLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxTQUFTLENBQUMsUUFBcUI7UUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDNUIsUUFBUSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdkI7UUFFRCxNQUFNLE1BQU0sR0FBMkIsRUFBRSxDQUFDO1FBQzFDLEtBQUss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QUUsRUFBRSxDQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ3ZDLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FDN0MsU0FBUyxFQUNULFdBQVcsQ0FBQyxhQUFhLENBQzFCLENBQUM7WUFFRixPQUFPLE1BQU0sRUFBRSxDQUFDLGVBQStCLENBQUMsS0FBSyxTQUFTLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVGLElBQUksU0FBUyxLQUFLLFNBQVMsSUFBSSxTQUFTLEtBQUssSUFBSSxFQUFFO1lBQ2pELE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRU8sU0FBUyxDQUFDLElBQVk7UUFDNUIsT0FBTyxJQUFJLENBQUMsU0FBUzthQUNsQixrQkFBa0IsQ0FBQyxJQUFJLENBQUM7YUFDeEIsTUFBTSxDQUFDLE9BQU8sQ0FBQzthQUNmLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRU8sa0JBQWtCLENBQ3hCLFNBQWlCLEVBQ2pCLGFBQXNCO1FBRXRCLElBQUksYUFBYSxFQUFFO1lBQ2pCLE9BQU8sYUFBYSxDQUFDLFNBQXlCLENBQUMsSUFBSSxTQUFTLENBQUM7U0FDOUQ7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDOztnSEE1SlUsbUJBQW1CO29IQUFuQixtQkFBbUIsY0FETixNQUFNOzJGQUNuQixtQkFBbUI7a0JBRC9CLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFyYW1zTWFwcGluZywgUm91dGVDb25maWcgfSBmcm9tICcuLi9yb3V0ZXMtY29uZmlnJztcbmltcG9ydCB7IFJvdXRpbmdDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vcm91dGluZy1jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBnZXRQYXJhbU5hbWUsIGlzUGFyYW0gfSBmcm9tICcuL3BhdGgtdXRpbHMnO1xuaW1wb3J0IHsgVXJsQ29tbWFuZCwgVXJsQ29tbWFuZFJvdXRlLCBVcmxDb21tYW5kcyB9IGZyb20gJy4vdXJsLWNvbW1hbmQnO1xuaW1wb3J0IHsgVXJsUGFyc2luZ1NlcnZpY2UgfSBmcm9tICcuL3VybC1wYXJzaW5nLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFNlbWFudGljUGF0aFNlcnZpY2Uge1xuICByZWFkb25seSBST09UX1VSTCA9IFsnLyddO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCByb3V0aW5nQ29uZmlnU2VydmljZTogUm91dGluZ0NvbmZpZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHVybFBhcnNlcjogVXJsUGFyc2luZ1NlcnZpY2VcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBmaXJzdCBwYXRoIGFsaWFzIGNvbmZpZ3VyZWQgZm9yIGEgZ2l2ZW4gcm91dGUgbmFtZS4gSXQgYWRkcyBgL2AgYXQgdGhlIGJlZ2lubmluZy5cbiAgICovXG4gIGdldChyb3V0ZU5hbWU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3Qgcm91dGVDb25maWcgPSB0aGlzLnJvdXRpbmdDb25maWdTZXJ2aWNlLmdldFJvdXRlQ29uZmlnKHJvdXRlTmFtZSk7XG4gICAgcmV0dXJuIHJvdXRlQ29uZmlnICYmIEFycmF5LmlzQXJyYXkocm91dGVDb25maWcucGF0aHMpXG4gICAgICA/ICcvJyArIHJvdXRlQ29uZmlnLnBhdGhzWzBdXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm1zIHRoZSBhcnJheSBvZiB1cmwgY29tbWFuZHMuIEVhY2ggY29tbWFuZCBjYW4gYmU6XG4gICAqIGEpIHN0cmluZyAtIHdpbGwgYmUgbGVmdCB1bnRvdWNoZWRcbiAgICogYikgb2JqZWN0IHsgY3hSb3V0ZTogPHJvdXRlIG5hbWU+IH0gLSB3aWxsIGJlIHJlcGxhY2VkIHdpdGggc2VtYW50aWMgcGF0aFxuICAgKiBjKSBvYmplY3QgeyBjeFJvdXRlOiA8cm91dGUgbmFtZT4sIHBhcmFtczogeyAuLi4gfSB9IC0gc2FtZSBhcyBhYm92ZSwgYnV0IHdpdGggcGFzc2VkIHBhcmFtc1xuICAgKlxuICAgKiBJZiB0aGUgZmlyc3QgY29tbWFuZCBpcyB0aGUgb2JqZWN0IHdpdGggdGhlIGBjeFJvdXRlYCBwcm9wZXJ0eSwgcmV0dXJucyBhbiBhYnNvbHV0ZSB1cmwgKHdpdGggdGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhlIGFycmF5IGAnLydgKVxuICAgKi9cbiAgdHJhbnNmb3JtKGNvbW1hbmRzOiBVcmxDb21tYW5kcyk6IGFueVtdIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29tbWFuZHMpKSB7XG4gICAgICBjb21tYW5kcyA9IFtjb21tYW5kc107XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0OiAoc3RyaW5nIHwgdW5kZWZpbmVkKVtdID0gW107XG4gICAgZm9yIChjb25zdCBjb21tYW5kIG9mIGNvbW1hbmRzKSB7XG4gICAgICBpZiAoIXRoaXMuaXNSb3V0ZUNvbW1hbmQoY29tbWFuZCkpIHtcbiAgICAgICAgLy8gZG9uJ3QgbW9kaWZ5IHNlZ21lbnQgdGhhdCBpcyBub3Qgcm91dGUgY29tbWFuZDpcbiAgICAgICAgcmVzdWx0LnB1c2goY29tbWFuZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBnZW5lcmF0ZSBhcnJheSB3aXRoIHVybCBzZWdtZW50cyBmb3IgZ2l2ZW4gcm91dGUgY29tbWFuZDpcbiAgICAgICAgY29uc3QgcGFydGlhbFJlc3VsdCA9IHRoaXMuZ2VuZXJhdGVVcmxQYXJ0KGNvbW1hbmQpO1xuXG4gICAgICAgIGlmIChwYXJ0aWFsUmVzdWx0ID09PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuUk9PVF9VUkw7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQucHVzaCguLi5wYXJ0aWFsUmVzdWx0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5zaG91bGRPdXRwdXRBYnNvbHV0ZShjb21tYW5kcykpIHtcbiAgICAgIHJlc3VsdC51bnNoaWZ0KCcvJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgaXNSb3V0ZUNvbW1hbmQoY29tbWFuZDogVXJsQ29tbWFuZCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBjb21tYW5kICYmIEJvb2xlYW4oY29tbWFuZC5jeFJvdXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgc2hvdWxkT3V0cHV0QWJzb2x1dGUoY29tbWFuZHM6IFVybENvbW1hbmRzKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNSb3V0ZUNvbW1hbmQoY29tbWFuZHNbMF0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZW5lcmF0ZVVybFBhcnQoXG4gICAgY29tbWFuZDogVXJsQ29tbWFuZFJvdXRlXG4gICk6IChzdHJpbmcgfCB1bmRlZmluZWQpW10gfCBudWxsIHtcbiAgICB0aGlzLnN0YW5kYXJpemVSb3V0ZUNvbW1hbmQoY29tbWFuZCk7XG5cbiAgICBpZiAoIWNvbW1hbmQuY3hSb3V0ZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgcm91dGVDb25maWcgPSB0aGlzLnJvdXRpbmdDb25maWdTZXJ2aWNlLmdldFJvdXRlQ29uZmlnKFxuICAgICAgY29tbWFuZC5jeFJvdXRlXG4gICAgKTtcblxuICAgIC8vIGlmIG5vIHJvdXRlIHRyYW5zbGF0aW9uIHdhcyBjb25maWd1cmVkLCByZXR1cm4gbnVsbDpcbiAgICBpZiAoIXJvdXRlQ29uZmlnIHx8ICFyb3V0ZUNvbmZpZy5wYXRocykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gZmluZCBmaXJzdCBwYXRoIHRoYXQgY2FuIHNhdGlzZnkgaXQncyBwYXJhbWV0ZXJzIHdpdGggZ2l2ZW4gcGFyYW1ldGVyc1xuICAgIGNvbnN0IHBhdGggPSB0aGlzLmZpbmRQYXRoV2l0aEZpbGxhYmxlUGFyYW1zKHJvdXRlQ29uZmlnLCBjb21tYW5kLnBhcmFtcyk7XG5cbiAgICAvLyBpZiB0aGVyZSBpcyBubyBjb25maWd1cmVkIHBhdGggdGhhdCBjYW4gYmUgc2F0aXNmaWVkIHdpdGggZ2l2ZW4gcGFyYW1zLCByZXR1cm4gbnVsbFxuICAgIGlmICghcGF0aCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5wcm92aWRlUGFyYW1zVmFsdWVzKFxuICAgICAgcGF0aCxcbiAgICAgIGNvbW1hbmQucGFyYW1zLFxuICAgICAgcm91dGVDb25maWcucGFyYW1zTWFwcGluZ1xuICAgICk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBzdGFuZGFyaXplUm91dGVDb21tYW5kKGNvbW1hbmQ6IFVybENvbW1hbmRSb3V0ZSk6IHZvaWQge1xuICAgIGNvbW1hbmQucGFyYW1zID0gY29tbWFuZC5wYXJhbXMgfHwge307XG4gIH1cblxuICBwcml2YXRlIHByb3ZpZGVQYXJhbXNWYWx1ZXMoXG4gICAgcGF0aDogc3RyaW5nLFxuICAgIHBhcmFtcz86IG9iamVjdCxcbiAgICBwYXJhbXNNYXBwaW5nPzogUGFyYW1zTWFwcGluZ1xuICApOiAoc3RyaW5nIHwgdW5kZWZpbmVkKVtdIHtcbiAgICByZXR1cm4gdGhpcy51cmxQYXJzZXIuZ2V0UHJpbWFyeVNlZ21lbnRzKHBhdGgpLm1hcCgoc2VnbWVudCkgPT4ge1xuICAgICAgaWYgKGlzUGFyYW0oc2VnbWVudCkpIHtcbiAgICAgICAgY29uc3QgcGFyYW1OYW1lID0gZ2V0UGFyYW1OYW1lKHNlZ21lbnQpO1xuICAgICAgICBjb25zdCBtYXBwZWRQYXJhbU5hbWUgPSB0aGlzLmdldE1hcHBlZFBhcmFtTmFtZShcbiAgICAgICAgICBwYXJhbU5hbWUsXG4gICAgICAgICAgcGFyYW1zTWFwcGluZ1xuICAgICAgICApO1xuICAgICAgICByZXR1cm4gcGFyYW1zPy5bbWFwcGVkUGFyYW1OYW1lIGFzIGtleW9mIG9iamVjdF07XG4gICAgICB9XG4gICAgICByZXR1cm4gc2VnbWVudDtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZmluZFBhdGhXaXRoRmlsbGFibGVQYXJhbXMoXG4gICAgcm91dGVDb25maWc6IFJvdXRlQ29uZmlnLFxuICAgIHBhcmFtcz86IG9iamVjdFxuICApOiBzdHJpbmcgfCBudWxsIHtcbiAgICBjb25zdCBmb3VuZFBhdGggPSByb3V0ZUNvbmZpZy5wYXRocz8uZmluZCgocGF0aCkgPT5cbiAgICAgIHRoaXMuZ2V0UGFyYW1zKHBhdGgpLmV2ZXJ5KChwYXJhbU5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgbWFwcGVkUGFyYW1OYW1lID0gdGhpcy5nZXRNYXBwZWRQYXJhbU5hbWUoXG4gICAgICAgICAgcGFyYW1OYW1lLFxuICAgICAgICAgIHJvdXRlQ29uZmlnLnBhcmFtc01hcHBpbmdcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gcGFyYW1zPy5bbWFwcGVkUGFyYW1OYW1lIGFzIGtleW9mIG9iamVjdF0gIT09IHVuZGVmaW5lZDtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGlmIChmb3VuZFBhdGggPT09IHVuZGVmaW5lZCB8fCBmb3VuZFBhdGggPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gZm91bmRQYXRoO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQYXJhbXMocGF0aDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMudXJsUGFyc2VyXG4gICAgICAuZ2V0UHJpbWFyeVNlZ21lbnRzKHBhdGgpXG4gICAgICAuZmlsdGVyKGlzUGFyYW0pXG4gICAgICAubWFwKGdldFBhcmFtTmFtZSk7XG4gIH1cblxuICBwcml2YXRlIGdldE1hcHBlZFBhcmFtTmFtZShcbiAgICBwYXJhbU5hbWU6IHN0cmluZyxcbiAgICBwYXJhbXNNYXBwaW5nPzogb2JqZWN0XG4gICk6IHN0cmluZyB7XG4gICAgaWYgKHBhcmFtc01hcHBpbmcpIHtcbiAgICAgIHJldHVybiBwYXJhbXNNYXBwaW5nW3BhcmFtTmFtZSBhcyBrZXlvZiBvYmplY3RdIHx8IHBhcmFtTmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcmFtTmFtZTtcbiAgfVxufVxuIl19