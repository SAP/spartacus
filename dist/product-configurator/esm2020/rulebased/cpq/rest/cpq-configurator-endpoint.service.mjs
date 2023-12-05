/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoggerService, StringTemplate } from '@spartacus/core';
import { MARKER_HEADER_CPQ_CONFIGURATOR } from '@spartacus/product-configurator/rulebased/root';
import * as i0 from "@angular/core";
import * as i1 from "./cpq-configurator-endpoint.config";
export class CpqConfiguratorEndpointService {
    constructor(config) {
        this.config = config;
        this.logger = inject(LoggerService);
        /**
         * header attribute to a mark cpq related requests, so that they can be picked up by the {@link CpqConfiguratorRestInterceptor}
         */
        this.CPQ_MARKER_HEADER = {
            headers: new HttpHeaders({
                [MARKER_HEADER_CPQ_CONFIGURATOR]: 'x',
            }),
        };
    }
    buildUrl(endpointName, urlParams, queryParams) {
        const endpoints = this.config.backend?.cpq?.endpoints;
        let endpoint;
        switch (endpointName) {
            case 'configurationInit':
                endpoint = endpoints?.configurationInit;
                break;
            case 'configurationDisplay':
                endpoint = endpoints?.configurationDisplay;
                break;
            case 'attributeUpdate':
                endpoint = endpoints?.attributeUpdate;
                break;
            case 'valueUpdate':
                endpoint = endpoints?.valueUpdate;
        }
        if (!endpoint) {
            endpoint = 'configurations';
            this.logger.warn(`${endpointName} endpoint configuration missing for cpq backend, please provide it via key: "backend.cpq.endpoints.${endpointName}"`);
        }
        let url = this.config.backend?.cpq?.prefix + endpoint;
        url = urlParams ? StringTemplate.resolve(url, urlParams) : url;
        url = queryParams ? this.appendQueryParameters(url, queryParams) : url;
        return url;
    }
    appendQueryParameters(url, parameters) {
        let urlWithParameters = url + '?';
        parameters.forEach((param, idx) => {
            urlWithParameters = idx > 0 ? urlWithParameters + '&' : urlWithParameters;
            urlWithParameters = `${urlWithParameters}${param.name}=${param.value}`;
        });
        return urlWithParameters;
    }
}
CpqConfiguratorEndpointService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorEndpointService, deps: [{ token: i1.CpqConfiguratorEndpointConfig }], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorEndpointService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorEndpointService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorEndpointService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.CpqConfiguratorEndpointConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3BxLWNvbmZpZ3VyYXRvci1lbmRwb2ludC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jcHEvcmVzdC9jcHEtY29uZmlndXJhdG9yLWVuZHBvaW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLGdEQUFnRCxDQUFDOzs7QUFJaEcsTUFBTSxPQUFPLDhCQUE4QjtJQUd6QyxZQUFzQixNQUFxQztRQUFyQyxXQUFNLEdBQU4sTUFBTSxDQUErQjtRQUZqRCxXQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBSXpDOztXQUVHO1FBQ00sc0JBQWlCLEdBQUc7WUFDM0IsT0FBTyxFQUFFLElBQUksV0FBVyxDQUFDO2dCQUN2QixDQUFDLDhCQUE4QixDQUFDLEVBQUUsR0FBRzthQUN0QyxDQUFDO1NBQ0gsQ0FBQztJQVQ0RCxDQUFDO0lBVy9ELFFBQVEsQ0FDTixZQUFvQixFQUNwQixTQUFrQixFQUNsQixXQUErQztRQUUvQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDO1FBQ3RELElBQUksUUFBUSxDQUFDO1FBQ2IsUUFBUSxZQUFZLEVBQUU7WUFDcEIsS0FBSyxtQkFBbUI7Z0JBQ3RCLFFBQVEsR0FBRyxTQUFTLEVBQUUsaUJBQWlCLENBQUM7Z0JBQ3hDLE1BQU07WUFDUixLQUFLLHNCQUFzQjtnQkFDekIsUUFBUSxHQUFHLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQztnQkFDM0MsTUFBTTtZQUNSLEtBQUssaUJBQWlCO2dCQUNwQixRQUFRLEdBQUcsU0FBUyxFQUFFLGVBQWUsQ0FBQztnQkFDdEMsTUFBTTtZQUNSLEtBQUssYUFBYTtnQkFDaEIsUUFBUSxHQUFHLFNBQVMsRUFBRSxXQUFXLENBQUM7U0FDckM7UUFFRCxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsUUFBUSxHQUFHLGdCQUFnQixDQUFDO1lBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUNkLEdBQUcsWUFBWSxzR0FBc0csWUFBWSxHQUFHLENBQ3JJLENBQUM7U0FDSDtRQUNELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEdBQUcsUUFBUSxDQUFDO1FBQ3RELEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDL0QsR0FBRyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3ZFLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVTLHFCQUFxQixDQUM3QixHQUFXLEVBQ1gsVUFBNkM7UUFFN0MsSUFBSSxpQkFBaUIsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBVyxFQUFFLEVBQUU7WUFDeEMsaUJBQWlCLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztZQUMxRSxpQkFBaUIsR0FBRyxHQUFHLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3pFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxpQkFBaUIsQ0FBQztJQUMzQixDQUFDOzsySEF6RFUsOEJBQThCOytIQUE5Qiw4QkFBOEIsY0FEakIsTUFBTTsyRkFDbkIsOEJBQThCO2tCQUQxQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMb2dnZXJTZXJ2aWNlLCBTdHJpbmdUZW1wbGF0ZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBNQVJLRVJfSEVBREVSX0NQUV9DT05GSUdVUkFUT1IgfSBmcm9tICdAc3BhcnRhY3VzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9yb290JztcbmltcG9ydCB7IENwcUNvbmZpZ3VyYXRvckVuZHBvaW50Q29uZmlnIH0gZnJvbSAnLi9jcHEtY29uZmlndXJhdG9yLWVuZHBvaW50LmNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQ3BxQ29uZmlndXJhdG9yRW5kcG9pbnRTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIGxvZ2dlciA9IGluamVjdChMb2dnZXJTZXJ2aWNlKTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgY29uZmlnOiBDcHFDb25maWd1cmF0b3JFbmRwb2ludENvbmZpZykge31cblxuICAvKipcbiAgICogaGVhZGVyIGF0dHJpYnV0ZSB0byBhIG1hcmsgY3BxIHJlbGF0ZWQgcmVxdWVzdHMsIHNvIHRoYXQgdGhleSBjYW4gYmUgcGlja2VkIHVwIGJ5IHRoZSB7QGxpbmsgQ3BxQ29uZmlndXJhdG9yUmVzdEludGVyY2VwdG9yfVxuICAgKi9cbiAgcmVhZG9ubHkgQ1BRX01BUktFUl9IRUFERVIgPSB7XG4gICAgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgIFtNQVJLRVJfSEVBREVSX0NQUV9DT05GSUdVUkFUT1JdOiAneCcsXG4gICAgfSksXG4gIH07XG5cbiAgYnVpbGRVcmwoXG4gICAgZW5kcG9pbnROYW1lOiBzdHJpbmcsXG4gICAgdXJsUGFyYW1zPzogT2JqZWN0LFxuICAgIHF1ZXJ5UGFyYW1zPzogW3sgbmFtZTogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH1dXG4gICk6IHN0cmluZyB7XG4gICAgY29uc3QgZW5kcG9pbnRzID0gdGhpcy5jb25maWcuYmFja2VuZD8uY3BxPy5lbmRwb2ludHM7XG4gICAgbGV0IGVuZHBvaW50O1xuICAgIHN3aXRjaCAoZW5kcG9pbnROYW1lKSB7XG4gICAgICBjYXNlICdjb25maWd1cmF0aW9uSW5pdCc6XG4gICAgICAgIGVuZHBvaW50ID0gZW5kcG9pbnRzPy5jb25maWd1cmF0aW9uSW5pdDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjb25maWd1cmF0aW9uRGlzcGxheSc6XG4gICAgICAgIGVuZHBvaW50ID0gZW5kcG9pbnRzPy5jb25maWd1cmF0aW9uRGlzcGxheTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdhdHRyaWJ1dGVVcGRhdGUnOlxuICAgICAgICBlbmRwb2ludCA9IGVuZHBvaW50cz8uYXR0cmlidXRlVXBkYXRlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3ZhbHVlVXBkYXRlJzpcbiAgICAgICAgZW5kcG9pbnQgPSBlbmRwb2ludHM/LnZhbHVlVXBkYXRlO1xuICAgIH1cblxuICAgIGlmICghZW5kcG9pbnQpIHtcbiAgICAgIGVuZHBvaW50ID0gJ2NvbmZpZ3VyYXRpb25zJztcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4oXG4gICAgICAgIGAke2VuZHBvaW50TmFtZX0gZW5kcG9pbnQgY29uZmlndXJhdGlvbiBtaXNzaW5nIGZvciBjcHEgYmFja2VuZCwgcGxlYXNlIHByb3ZpZGUgaXQgdmlhIGtleTogXCJiYWNrZW5kLmNwcS5lbmRwb2ludHMuJHtlbmRwb2ludE5hbWV9XCJgXG4gICAgICApO1xuICAgIH1cbiAgICBsZXQgdXJsID0gdGhpcy5jb25maWcuYmFja2VuZD8uY3BxPy5wcmVmaXggKyBlbmRwb2ludDtcbiAgICB1cmwgPSB1cmxQYXJhbXMgPyBTdHJpbmdUZW1wbGF0ZS5yZXNvbHZlKHVybCwgdXJsUGFyYW1zKSA6IHVybDtcbiAgICB1cmwgPSBxdWVyeVBhcmFtcyA/IHRoaXMuYXBwZW5kUXVlcnlQYXJhbWV0ZXJzKHVybCwgcXVlcnlQYXJhbXMpIDogdXJsO1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXBwZW5kUXVlcnlQYXJhbWV0ZXJzKFxuICAgIHVybDogc3RyaW5nLFxuICAgIHBhcmFtZXRlcnM6IFt7IG5hbWU6IHN0cmluZzsgdmFsdWU6IHN0cmluZyB9XVxuICApOiBzdHJpbmcge1xuICAgIGxldCB1cmxXaXRoUGFyYW1ldGVycyA9IHVybCArICc/JztcbiAgICBwYXJhbWV0ZXJzLmZvckVhY2goKHBhcmFtLCBpZHg6IG51bWJlcikgPT4ge1xuICAgICAgdXJsV2l0aFBhcmFtZXRlcnMgPSBpZHggPiAwID8gdXJsV2l0aFBhcmFtZXRlcnMgKyAnJicgOiB1cmxXaXRoUGFyYW1ldGVycztcbiAgICAgIHVybFdpdGhQYXJhbWV0ZXJzID0gYCR7dXJsV2l0aFBhcmFtZXRlcnN9JHtwYXJhbS5uYW1lfT0ke3BhcmFtLnZhbHVlfWA7XG4gICAgfSk7XG4gICAgcmV0dXJuIHVybFdpdGhQYXJhbWV0ZXJzO1xuICB9XG59XG4iXX0=