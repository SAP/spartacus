/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpParams } from '@angular/common/http';
import { Injectable, Optional, inject, isDevMode } from '@angular/core';
import { StringTemplate } from '../../config/utils/string-template';
import { LoggerService } from '../../logger';
import { getContextParameterDefault } from '../../site-context/config/context-config-utils';
import { BASE_SITE_CONTEXT_ID } from '../../site-context/providers/context-ids';
import { HttpParamsURIEncoder } from '../../util/http-params-uri.encoder';
import { DEFAULT_SCOPE } from '../occ-models/occ-endpoints.model';
import { urlPathJoin } from '../utils/occ-url-util';
import * as i0 from "@angular/core";
import * as i1 from "../config/occ-config";
import * as i2 from "../../site-context/facade/base-site.service";
export class OccEndpointsService {
    get activeBaseSite() {
        return (this._activeBaseSite ??
            getContextParameterDefault(this.config, BASE_SITE_CONTEXT_ID));
    }
    constructor(config, baseSiteService) {
        this.config = config;
        this.baseSiteService = baseSiteService;
        this.logger = inject(LoggerService);
        if (this.baseSiteService) {
            this.baseSiteService
                .getActive()
                .subscribe((value) => (this._activeBaseSite = value));
        }
    }
    /**
     * Returns the value configured for a specific endpoint
     *
     * @param endpointKey the configuration key for the endpoint to return
     * @param scope endpoint configuration scope
     */
    getRawEndpointValue(endpoint, scope) {
        const endpointValue = this.getEndpointForScope(endpoint, scope);
        return endpointValue;
    }
    /**
     * Returns true when the endpoint is configured
     *
     * @param endpointKey the configuration key for the endpoint to return
     * @param scope endpoint configuration scope
     */
    isConfigured(endpoint, scope) {
        return !(typeof this.getEndpointFromConfig(endpoint, scope) === 'undefined');
    }
    /**
     * Returns base OCC endpoint (baseUrl + prefix + baseSite) base on provided values
     *
     * @param baseUrlProperties Specify properties to not add to the url (baseUrl, prefix, baseSite)
     */
    getBaseUrl(baseUrlProperties = {
        baseUrl: true,
        prefix: true,
        baseSite: true,
    }) {
        const baseUrl = baseUrlProperties.baseUrl === false
            ? ''
            : this.config?.backend?.occ?.baseUrl ?? '';
        const prefix = baseUrlProperties.prefix === false ? '' : this.getPrefix();
        const baseSite = baseUrlProperties.baseSite === false ? '' : this.activeBaseSite;
        return urlPathJoin(baseUrl, prefix, baseSite);
    }
    /**
     * Returns a fully qualified OCC Url
     *
     * @param endpoint Name of the OCC endpoint key
     * @param attributes Dynamic attributes used to build the url
     * @param propertiesToOmit Specify properties to not add to the url (baseUrl, prefix, baseSite)
     */
    buildUrl(endpoint, attributes, propertiesToOmit) {
        let url = this.getEndpointForScope(endpoint, attributes?.scope);
        if (attributes) {
            const { urlParams, queryParams } = attributes;
            if (urlParams) {
                url = StringTemplate.resolve(url, urlParams, true);
            }
            if (queryParams) {
                let httpParamsOptions = { encoder: new HttpParamsURIEncoder() };
                if (url.includes('?')) {
                    let queryParamsFromEndpoint;
                    [url, queryParamsFromEndpoint] = url.split('?');
                    httpParamsOptions = {
                        ...httpParamsOptions,
                        ...{ fromString: queryParamsFromEndpoint },
                    };
                }
                const httpParams = this.getHttpParamsFromQueryParams(queryParams, httpParamsOptions);
                const params = httpParams.toString();
                if (params.length) {
                    url += '?' + params;
                }
            }
        }
        return this.buildUrlFromEndpointString(url, propertiesToOmit);
    }
    getHttpParamsFromQueryParams(queryParams, options) {
        let httpParams = new HttpParams(options);
        Object.keys(queryParams).forEach((key) => {
            const value = queryParams[key];
            if (value !== undefined) {
                if (value === null) {
                    httpParams = httpParams.delete(key);
                }
                else {
                    httpParams = httpParams.set(key, value);
                }
            }
        });
        return httpParams;
    }
    getEndpointFromConfig(endpoint, scope) {
        const endpointsConfig = this.config.backend?.occ?.endpoints;
        if (!endpointsConfig) {
            return undefined;
        }
        const endpointConfig = endpointsConfig[endpoint];
        if (scope) {
            if (scope === DEFAULT_SCOPE && typeof endpointConfig === 'string') {
                return endpointConfig;
            }
            return endpointConfig?.[scope];
        }
        return typeof endpointConfig === 'string'
            ? endpointConfig
            : endpointConfig?.[DEFAULT_SCOPE];
    }
    // TODO: Can we reuse getEndpointFromConfig in this method? Should we change behavior of this function?
    getEndpointForScope(endpoint, scope) {
        const endpointsConfig = this.config.backend?.occ?.endpoints;
        if (!endpointsConfig) {
            return '';
        }
        const endpointConfig = endpointsConfig[endpoint];
        if (scope) {
            if (endpointConfig?.[scope]) {
                return endpointConfig?.[scope];
            }
            if (scope === DEFAULT_SCOPE && typeof endpointConfig === 'string') {
                return endpointConfig;
            }
            if (isDevMode()) {
                this.logger.warn(`${endpoint} endpoint configuration missing for scope "${scope}"`);
            }
        }
        return ((typeof endpointConfig === 'string'
            ? endpointConfig
            : endpointConfig?.[DEFAULT_SCOPE]) || endpoint);
    }
    /**
     * Add the base OCC url properties to the specified endpoint string
     *
     * @param endpointString String value for the url endpoint
     * @param propertiesToOmit Specify properties to not add to the url (baseUrl, prefix, baseSite)
     */
    buildUrlFromEndpointString(endpointString, propertiesToOmit) {
        return urlPathJoin(this.getBaseUrl(propertiesToOmit), endpointString);
    }
    getPrefix() {
        if (this.config?.backend?.occ?.prefix &&
            !this.config.backend.occ.prefix.startsWith('/')) {
            return '/' + this.config.backend.occ.prefix;
        }
        return this.config?.backend?.occ?.prefix ?? '';
    }
}
OccEndpointsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccEndpointsService, deps: [{ token: i1.OccConfig }, { token: i2.BaseSiteService, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
OccEndpointsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccEndpointsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccEndpointsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.OccConfig }, { type: i2.BaseSiteService, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWVuZHBvaW50cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvb2NjL3NlcnZpY2VzL29jYy1lbmRwb2ludHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBcUIsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzdDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBRTVGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRTFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7QUFpQnBELE1BQU0sT0FBTyxtQkFBbUI7SUFHOUIsSUFBWSxjQUFjO1FBQ3hCLE9BQU8sQ0FDTCxJQUFJLENBQUMsZUFBZTtZQUNwQiwwQkFBMEIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLG9CQUFvQixDQUFDLENBQzlELENBQUM7SUFDSixDQUFDO0lBSUQsWUFDVSxNQUFpQixFQUNMLGVBQWdDO1FBRDVDLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDTCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFKNUMsV0FBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQU12QyxJQUFJLElBQUksQ0FBQyxlQUFlLEVB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QUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTTtZQUNqQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUMvQztZQUNBLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7U0FDN0M7UUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLElBQUksRUFBRSxDQUFDO0lBQ2pELENBQUM7O2dIQXROVSxtQkFBbUI7b0hBQW5CLG1CQUFtQixjQUZsQixNQUFNOzJGQUVQLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQWVJLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwUGFyYW1zLCBIdHRwUGFyYW1zT3B0aW9ucyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsLCBpbmplY3QsIGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RyaW5nVGVtcGxhdGUgfSBmcm9tICcuLi8uLi9jb25maWcvdXRpbHMvc3RyaW5nLXRlbXBsYXRlJztcbmltcG9ydCB7IExvZ2dlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9sb2dnZXInO1xuaW1wb3J0IHsgZ2V0Q29udGV4dFBhcmFtZXRlckRlZmF1bHQgfSBmcm9tICcuLi8uLi9zaXRlLWNvbnRleHQvY29uZmlnL2NvbnRleHQtY29uZmlnLXV0aWxzJztcbmltcG9ydCB7IEJhc2VTaXRlU2VydmljZSB9IGZyb20gJy4uLy4uL3NpdGUtY29udGV4dC9mYWNhZGUvYmFzZS1zaXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQkFTRV9TSVRFX0NPTlRFWFRfSUQgfSBmcm9tICcuLi8uLi9zaXRlLWNvbnRleHQvcHJvdmlkZXJzL2NvbnRleHQtaWRzJztcbmltcG9ydCB7IEh0dHBQYXJhbXNVUklFbmNvZGVyIH0gZnJvbSAnLi4vLi4vdXRpbC9odHRwLXBhcmFtcy11cmkuZW5jb2Rlcic7XG5pbXBvcnQgeyBPY2NDb25maWcgfSBmcm9tICcuLi9jb25maWcvb2NjLWNvbmZpZyc7XG5pbXBvcnQgeyBERUZBVUxUX1NDT1BFIH0gZnJvbSAnLi4vb2NjLW1vZGVscy9vY2MtZW5kcG9pbnRzLm1vZGVsJztcbmltcG9ydCB7IHVybFBhdGhKb2luIH0gZnJvbSAnLi4vdXRpbHMvb2NjLXVybC11dGlsJztcblxuZXhwb3J0IGludGVyZmFjZSBCYXNlT2NjVXJsUHJvcGVydGllcyB7XG4gIGJhc2VVcmw/OiBib29sZWFuO1xuICBwcmVmaXg/OiBib29sZWFuO1xuICBiYXNlU2l0ZT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRHluYW1pY0F0dHJpYnV0ZXMge1xuICB1cmxQYXJhbXM/OiBvYmplY3Q7XG4gIHF1ZXJ5UGFyYW1zPzogb2JqZWN0O1xuICBzY29wZT86IHN0cmluZztcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE9jY0VuZHBvaW50c1NlcnZpY2Uge1xuICBwcml2YXRlIF9hY3RpdmVCYXNlU2l0ZTogc3RyaW5nO1xuXG4gIHByaXZhdGUgZ2V0IGFjdGl2ZUJhc2VTaXRlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuX2FjdGl2ZUJhc2VTaXRlID8/XG4gICAgICBnZXRDb250ZXh0UGFyYW1ldGVyRGVmYXVsdCh0aGlzLmNvbmZpZywgQkFTRV9TSVRFX0NPTlRFWFRfSUQpXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBsb2dnZXIgPSBpbmplY3QoTG9nZ2VyU2VydmljZSk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25maWc6IE9jY0NvbmZpZyxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGJhc2VTaXRlU2VydmljZTogQmFzZVNpdGVTZXJ2aWNlXG4gICkge1xuICAgIGlmICh0aGlzLmJhc2VTaXRlU2VydmljZSkge1xuICAgICAgdGhpcy5iYXNlU2l0ZVNlcnZpY2VcbiAgICAgICAgLmdldEFjdGl2ZSgpXG4gICAgICAgIC5zdWJzY3JpYmUoKHZhbHVlKSA9PiAodGhpcy5fYWN0aXZlQmFzZVNpdGUgPSB2YWx1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBjb25maWd1cmVkIGZvciBhIHNwZWNpZmljIGVuZHBvaW50XG4gICAqXG4gICAqIEBwYXJhbSBlbmRwb2ludEtleSB0aGUgY29uZmlndXJhdGlvbiBrZXkgZm9yIHRoZSBlbmRwb2ludCB0byByZXR1cm5cbiAgICogQHBhcmFtIHNjb3BlIGVuZHBvaW50IGNvbmZpZ3VyYXRpb24gc2NvcGVcbiAgICovXG4gIGdldFJhd0VuZHBvaW50VmFsdWUoZW5kcG9pbnQ6IHN0cmluZywgc2NvcGU/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IGVuZHBvaW50VmFsdWUgPSB0aGlzLmdldEVuZHBvaW50Rm9yU2NvcGUoZW5kcG9pbnQsIHNjb3BlKTtcblxuICAgIHJldHVybiBlbmRwb2ludFZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSB3aGVuIHRoZSBlbmRwb2ludCBpcyBjb25maWd1cmVkXG4gICAqXG4gICAqIEBwYXJhbSBlbmRwb2ludEtleSB0aGUgY29uZmlndXJhdGlvbiBrZXkgZm9yIHRoZSBlbmRwb2ludCB0byByZXR1cm5cbiAgICogQHBhcmFtIHNjb3BlIGVuZHBvaW50IGNvbmZpZ3VyYXRpb24gc2NvcGVcbiAgICovXG4gIGlzQ29uZmlndXJlZChlbmRwb2ludDogc3RyaW5nLCBzY29wZT86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhKFxuICAgICAgdHlwZW9mIHRoaXMuZ2V0RW5kcG9pbnRGcm9tQ29uZmlnKGVuZHBvaW50LCBzY29wZSkgPT09ICd1bmRlZmluZWQnXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGJhc2UgT0NDIGVuZHBvaW50IChiYXNlVXJsICsgcHJlZml4ICsgYmFzZVNpdGUpIGJhc2Ugb24gcHJvdmlkZWQgdmFsdWVzXG4gICAqXG4gICAqIEBwYXJhbSBiYXNlVXJsUHJvcGVydGllcyBTcGVjaWZ5IHByb3BlcnRpZXMgdG8gbm90IGFkZCB0byB0aGUgdXJsIChiYXNlVXJsLCBwcmVmaXgsIGJhc2VTaXRlKVxuICAgKi9cbiAgZ2V0QmFzZVVybChcbiAgICBiYXNlVXJsUHJvcGVydGllczogQmFzZU9jY1VybFByb3BlcnRpZXMgPSB7XG4gICAgICBiYXNlVXJsOiB0cnVlLFxuICAgICAgcHJlZml4OiB0cnVlLFxuICAgICAgYmFzZVNpdGU6IHRydWUsXG4gICAgfVxuICApOiBzdHJpbmcge1xuICAgIGNvbnN0IGJhc2VVcmwgPVxuICAgICAgYmFzZVVybFByb3BlcnRpZXMuYmFzZVVybCA9PT0gZmFsc2VcbiAgICAgICAgPyAnJ1xuICAgICAgICA6IHRoaXMuY29uZmlnPy5iYWNrZW5kPy5vY2M/LmJhc2VVcmwgPz8gJyc7XG4gICAgY29uc3QgcHJlZml4ID0gYmFzZVVybFByb3BlcnRpZXMucHJlZml4ID09PSBmYWxzZSA/ICcnIDogdGhpcy5nZXRQcmVmaXgoKTtcbiAgICBjb25zdCBiYXNlU2l0ZSA9XG4gICAgICBiYXNlVXJsUHJvcGVydGllcy5iYXNlU2l0ZSA9PT0gZmFsc2UgPyAnJyA6IHRoaXMuYWN0aXZlQmFzZVNpdGU7XG5cbiAgICByZXR1cm4gdXJsUGF0aEpvaW4oYmFzZVVybCwgcHJlZml4LCBiYXNlU2l0ZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGZ1bGx5IHF1YWxpZmllZCBPQ0MgVXJsXG4gICAqXG4gICAqIEBwYXJhbSBlbmRwb2ludCBOYW1lIG9mIHRoZSBPQ0MgZW5kcG9pbnQga2V5XG4gICAqIEBwYXJhbSBhdHRyaWJ1dGVzIER5bmFtaWMgYXR0cmlidXRlcyB1c2VkIHRvIGJ1aWxkIHRoZSB1cmxcbiAgICogQHBhcmFtIHByb3BlcnRpZXNUb09taXQgU3BlY2lmeSBwcm9wZXJ0aWVzIHRvIG5vdCBhZGQgdG8gdGhlIHVybCAoYmFzZVVybCwgcHJlZml4LCBiYXNlU2l0ZSlcbiAgICovXG4gIGJ1aWxkVXJsKFxuICAgIGVuZHBvaW50OiBzdHJpbmcsXG4gICAgYXR0cmlidXRlcz86IER5bmFtaWNBdHRyaWJ1dGVzLFxuICAgIHByb3BlcnRpZXNUb09taXQ/OiBCYXNlT2NjVXJsUHJvcGVydGllc1xuICApOiBzdHJpbmcge1xuICAgIGxldCB1cmwgPSB0aGlzLmdldEVuZHBvaW50Rm9yU2NvcGUoZW5kcG9pbnQsIGF0dHJpYnV0ZXM/LnNjb3BlKTtcblxuICAgIGlmIChhdHRyaWJ1dGVzKSB7XG4gICAgICBjb25zdCB7IHVybFBhcmFtcywgcXVlcnlQYXJhbXMgfSA9IGF0dHJpYnV0ZXM7XG5cbiAgICAgIGlmICh1cmxQYXJhbXMpIHtcbiAgICAgICAgdXJsID0gU3RyaW5nVGVtcGxhdGUucmVzb2x2ZSh1cmwsIHVybFBhcmFtcywgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChxdWVyeVBhcmFtcykge1xuICAgICAgICBsZXQgaHR0cFBhcmFtc09wdGlvbnMgPSB7IGVuY29kZXI6IG5ldyBIdHRwUGFyYW1zVVJJRW5jb2RlcigpIH07XG5cbiAgICAgICAgaWYgKHVybC5pbmNsdWRlcygnPycpKSB7XG4gICAgICAgICAgbGV0IHF1ZXJ5UGFyYW1zRnJvbUVuZHBvaW50OiBzdHJpbmc7XG4gICAgICAgICAgW3VybCwgcXVlcnlQYXJhbXNGcm9tRW5kcG9pbnRdID0gdXJsLnNwbGl0KCc/Jyk7XG4gICAgICAgICAgaHR0cFBhcmFtc09wdGlvbnMgPSB7XG4gICAgICAgICAgICAuLi5odHRwUGFyYW1zT3B0aW9ucyxcbiAgICAgICAgICAgIC4uLnsgZnJvbVN0cmluZzogcXVlcnlQYXJhbXNGcm9tRW5kcG9pbnQgfSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaHR0cFBhcmFtcyA9IHRoaXMuZ2V0SHR0cFBhcmFtc0Zyb21RdWVyeVBhcmFtcyhcbiAgICAgICAgICBxdWVyeVBhcmFtcyxcbiAgICAgICAgICBodHRwUGFyYW1zT3B0aW9uc1xuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IGh0dHBQYXJhbXMudG9TdHJpbmcoKTtcbiAgICAgICAgaWYgKHBhcmFtcy5sZW5ndGgpIHtcbiAgICAgICAgICB1cmwgKz0gJz8nICsgcGFyYW1zO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYnVpbGRVcmxGcm9tRW5kcG9pbnRTdHJpbmcodXJsLCBwcm9wZXJ0aWVzVG9PbWl0KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRIdHRwUGFyYW1zRnJvbVF1ZXJ5UGFyYW1zKFxuICAgIHF1ZXJ5UGFyYW1zOiBhbnksXG4gICAgb3B0aW9uczogSHR0cFBhcmFtc09wdGlvbnNcbiAgKSB7XG4gICAgbGV0IGh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcyhvcHRpb25zKTtcbiAgICBPYmplY3Qua2V5cyhxdWVyeVBhcmFtcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHF1ZXJ5UGFyYW1zW2tleSBhcyBrZXlvZiBvYmplY3RdO1xuICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuZGVsZXRlKGtleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGh0dHBQYXJhbXM7XG4gIH1cblxuICBwcml2YXRlIGdldEVuZHBvaW50RnJvbUNvbmZpZyhcbiAgICBlbmRwb2ludDogc3RyaW5nLFxuICAgIHNjb3BlPzogc3RyaW5nXG4gICk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgZW5kcG9pbnRzQ29uZmlnID0gdGhpcy5jb25maWcuYmFja2VuZD8ub2NjPy5lbmRwb2ludHM7XG5cbiAgICBpZiAoIWVuZHBvaW50c0NvbmZpZykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBlbmRwb2ludENvbmZpZzogYW55ID1cbiAgICAgIGVuZHBvaW50c0NvbmZpZ1tlbmRwb2ludCBhcyBrZXlvZiB0eXBlb2YgZW5kcG9pbnRzQ29uZmlnXTtcblxuICAgIGlmIChzY29wZSkge1xuICAgICAgaWYgKHNjb3BlID09PSBERUZBVUxUX1NDT1BFICYmIHR5cGVvZiBlbmRwb2ludENvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGVuZHBvaW50Q29uZmlnO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGVuZHBvaW50Q29uZmlnPy5bc2NvcGVdO1xuICAgIH1cblxuICAgIHJldHVybiB0eXBlb2YgZW5kcG9pbnRDb25maWcgPT09ICdzdHJpbmcnXG4gICAgICA/IGVuZHBvaW50Q29uZmlnXG4gICAgICA6IGVuZHBvaW50Q29uZmlnPy5bREVGQVVMVF9TQ09QRV07XG4gIH1cblxuICAvLyBUT0RPOiBDYW4gd2UgcmV1c2UgZ2V0RW5kcG9pbnRGcm9tQ29uZmlnIGluIHRoaXMgbWV0aG9kPyBTaG91bGQgd2UgY2hhbmdlIGJlaGF2aW9yIG9mIHRoaXMgZnVuY3Rpb24/XG4gIHByaXZhdGUgZ2V0RW5kcG9pbnRGb3JTY29wZShlbmRwb2ludDogc3RyaW5nLCBzY29wZT86IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgZW5kcG9pbnRzQ29uZmlnID0gdGhpcy5jb25maWcuYmFja2VuZD8ub2NjPy5lbmRwb2ludHM7XG5cbiAgICBpZiAoIWVuZHBvaW50c0NvbmZpZykge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGNvbnN0IGVuZHBvaW50Q29uZmlnOiBhbnkgPVxuICAgICAgZW5kcG9pbnRzQ29uZmlnW2VuZHBvaW50IGFzIGtleW9mIHR5cGVvZiBlbmRwb2ludHNDb25maWddO1xuXG4gICAgaWYgKHNjb3BlKSB7XG4gICAgICBpZiAoZW5kcG9pbnRDb25maWc/LltzY29wZV0pIHtcbiAgICAgICAgcmV0dXJuIGVuZHBvaW50Q29uZmlnPy5bc2NvcGVdO1xuICAgICAgfVxuICAgICAgaWYgKHNjb3BlID09PSBERUZBVUxUX1NDT1BFICYmIHR5cGVvZiBlbmRwb2ludENvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGVuZHBvaW50Q29uZmlnO1xuICAgICAgfVxuICAgICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oXG4gICAgICAgICAgYCR7ZW5kcG9pbnR9IGVuZHBvaW50IGNvbmZpZ3VyYXRpb24gbWlzc2luZyBmb3Igc2NvcGUgXCIke3Njb3BlfVwiYFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAodHlwZW9mIGVuZHBvaW50Q29uZmlnID09PSAnc3RyaW5nJ1xuICAgICAgICA/IGVuZHBvaW50Q29uZmlnXG4gICAgICAgIDogZW5kcG9pbnRDb25maWc/LltERUZBVUxUX1NDT1BFXSkgfHwgZW5kcG9pbnRcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCB0aGUgYmFzZSBPQ0MgdXJsIHByb3BlcnRpZXMgdG8gdGhlIHNwZWNpZmllZCBlbmRwb2ludCBzdHJpbmdcbiAgICpcbiAgICogQHBhcmFtIGVuZHBvaW50U3RyaW5nIFN0cmluZyB2YWx1ZSBmb3IgdGhlIHVybCBlbmRwb2ludFxuICAgKiBAcGFyYW0gcHJvcGVydGllc1RvT21pdCBTcGVjaWZ5IHByb3BlcnRpZXMgdG8gbm90IGFkZCB0byB0aGUgdXJsIChiYXNlVXJsLCBwcmVmaXgsIGJhc2VTaXRlKVxuICAgKi9cbiAgcHJpdmF0ZSBidWlsZFVybEZyb21FbmRwb2ludFN0cmluZyhcbiAgICBlbmRwb2ludFN0cmluZzogc3RyaW5nLFxuICAgIHByb3BlcnRpZXNUb09taXQ/OiBCYXNlT2NjVXJsUHJvcGVydGllc1xuICApOiBzdHJpbmcge1xuICAgIHJldHVybiB1cmxQYXRoSm9pbih0aGlzLmdldEJhc2VVcmwocHJvcGVydGllc1RvT21pdCksIGVuZHBvaW50U3RyaW5nKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UHJlZml4KCk6IHN0cmluZyB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5jb25maWc/LmJhY2tlbmQ/Lm9jYz8ucHJlZml4ICYmXG4gICAgICAhdGhpcy5jb25maWcuYmFja2VuZC5vY2MucHJlZml4LnN0YXJ0c1dpdGgoJy8nKVxuICAgICkge1xuICAgICAgcmV0dXJuICcvJyArIHRoaXMuY29uZmlnLmJhY2tlbmQub2NjLnByZWZpeDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnPy5iYWNrZW5kPy5vY2M/LnByZWZpeCA/PyAnJztcbiAgfVxufVxuXG4vLyBDSEVDSyBTT05BUlxuIl19