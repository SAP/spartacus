/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DynamicTemplate } from '../utils/dynamic-template';
import * as i0 from "@angular/core";
import * as i1 from "../config/cds-config";
export class CdsEndpointsService {
    constructor(cdsConfig) {
        this.cdsConfig = cdsConfig;
    }
    getUrl(endpoint, urlParams = {}, queryParams) {
        if (this.cdsConfig?.cds?.endpoints[endpoint]) {
            endpoint = this.cdsConfig.cds.endpoints[endpoint];
        }
        if (!urlParams['tenant']) {
            urlParams['tenant'] = this.cdsConfig.cds.tenant;
        }
        Object.keys(urlParams).forEach((key) => {
            urlParams[key] = encodeURIComponent(urlParams[key]);
        });
        endpoint = DynamicTemplate.resolve(endpoint, urlParams);
        if (queryParams) {
            let httpParamsOptions;
            if (endpoint.includes('?')) {
                let queryParamsFromEndpoint;
                [endpoint, queryParamsFromEndpoint] = endpoint.split('?');
                httpParamsOptions = { fromString: queryParamsFromEndpoint };
            }
            let httpParams = new HttpParams(httpParamsOptions);
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
            const params = httpParams.toString();
            if (params.length) {
                endpoint += '?' + params;
            }
        }
        return this.getEndpoint(endpoint);
    }
    getEndpoint(endpoint) {
        /*
         * If the endpoint to get the url for already has the configured base url appended,
         * do not try and append it again
         */
        if (endpoint.startsWith(this.getBaseEndpoint())) {
            return endpoint;
        }
        if (!endpoint.startsWith('/')) {
            endpoint = '/' + endpoint;
        }
        return `${this.getBaseEndpoint()}${endpoint}`;
    }
    getBaseEndpoint() {
        if (!this.cdsConfig || !this.cdsConfig.cds || !this.cdsConfig.cds.baseUrl) {
            return '';
        }
        return this.cdsConfig.cds.baseUrl;
    }
}
CdsEndpointsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsEndpointsService, deps: [{ token: i1.CdsConfig }], target: i0.ɵɵFactoryTarget.Injectable });
CdsEndpointsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsEndpointsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsEndpointsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CdsConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RzLWVuZHBvaW50cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9jZHMvc3JjL3NlcnZpY2VzL2Nkcy1lbmRwb2ludHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7QUFLNUQsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixZQUFvQixTQUFvQjtRQUFwQixjQUFTLEdBQVQsU0FBUyxDQUFXO0lBQUcsQ0FBQztJQUU1QyxNQUFNLENBQ0osUUFBZ0IsRUFDaEIsWUFBb0IsRUFBRSxFQUN0QixXQUFvQjtRQUVwQixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM1QyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ25EO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN4QixTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO1NBQ2pEO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNyQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsa0JBQWtCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxRQUFRLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFeEQsSUFBSSxXQUFXLEVBQUU7WUFDZixJQUFJLGlCQUFpQixDQUFDO1lBRXRCLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDMUIsSUFBSSx1QkFBdUIsQ0FBQztnQkFDNUIsQ0FBQyxRQUFRLEVBQUUsdUJBQXVCLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUUxRCxpQkFBaUIsR0FBRyxFQUFFLFVBQVUsRUFBRSx1QkFBdUIsRUFBRSxDQUFDO2FBQzdEO1lBRUQsSUFBSSxVQUFVLEdBQUcsSUFBSSxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUN2QyxNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQy9CLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtvQkFDdkIsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO3dCQUNsQixVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDckM7eUJBQU07d0JBQ0wsVUFBVSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO3FCQUN6QztpQkFDRjtZQUNILENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3JDLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDakIsUUFBUSxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUM7YUFDMUI7U0FDRjtRQUVELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRU8sV0FBVyxDQUFDLFFBQWdCO1FBQ2xDOzs7V0FHRztRQUNILElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsRUFBRTtZQUMvQyxPQUFPLFFBQVEsQ0FBQztTQUNqQjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzdCLFFBQVEsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDO1NBQzNCO1FBRUQsT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsR0FBRyxRQUFRLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRU8sZUFBZTtRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQ3pFLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFFRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUNwQyxDQUFDOztnSEExRVUsbUJBQW1CO29IQUFuQixtQkFBbUIsY0FGbEIsTUFBTTsyRkFFUCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENkc0NvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy9jZHMtY29uZmlnJztcbmltcG9ydCB7IER5bmFtaWNUZW1wbGF0ZSB9IGZyb20gJy4uL3V0aWxzL2R5bmFtaWMtdGVtcGxhdGUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2RzRW5kcG9pbnRzU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RzQ29uZmlnOiBDZHNDb25maWcpIHt9XG5cbiAgZ2V0VXJsKFxuICAgIGVuZHBvaW50OiBzdHJpbmcsXG4gICAgdXJsUGFyYW1zOiBvYmplY3QgPSB7fSxcbiAgICBxdWVyeVBhcmFtcz86IG9iamVjdFxuICApOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmNkc0NvbmZpZz8uY2RzPy5lbmRwb2ludHNbZW5kcG9pbnRdKSB7XG4gICAgICBlbmRwb2ludCA9IHRoaXMuY2RzQ29uZmlnLmNkcy5lbmRwb2ludHNbZW5kcG9pbnRdO1xuICAgIH1cblxuICAgIGlmICghdXJsUGFyYW1zWyd0ZW5hbnQnXSkge1xuICAgICAgdXJsUGFyYW1zWyd0ZW5hbnQnXSA9IHRoaXMuY2RzQ29uZmlnLmNkcy50ZW5hbnQ7XG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXModXJsUGFyYW1zKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHVybFBhcmFtc1trZXldID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybFBhcmFtc1trZXldKTtcbiAgICB9KTtcbiAgICBlbmRwb2ludCA9IER5bmFtaWNUZW1wbGF0ZS5yZXNvbHZlKGVuZHBvaW50LCB1cmxQYXJhbXMpO1xuXG4gICAgaWYgKHF1ZXJ5UGFyYW1zKSB7XG4gICAgICBsZXQgaHR0cFBhcmFtc09wdGlvbnM7XG5cbiAgICAgIGlmIChlbmRwb2ludC5pbmNsdWRlcygnPycpKSB7XG4gICAgICAgIGxldCBxdWVyeVBhcmFtc0Zyb21FbmRwb2ludDtcbiAgICAgICAgW2VuZHBvaW50LCBxdWVyeVBhcmFtc0Zyb21FbmRwb2ludF0gPSBlbmRwb2ludC5zcGxpdCgnPycpO1xuXG4gICAgICAgIGh0dHBQYXJhbXNPcHRpb25zID0geyBmcm9tU3RyaW5nOiBxdWVyeVBhcmFtc0Zyb21FbmRwb2ludCB9O1xuICAgICAgfVxuXG4gICAgICBsZXQgaHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKGh0dHBQYXJhbXNPcHRpb25zKTtcbiAgICAgIE9iamVjdC5rZXlzKHF1ZXJ5UGFyYW1zKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBxdWVyeVBhcmFtc1trZXldO1xuICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuZGVsZXRlKGtleSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBwYXJhbXMgPSBodHRwUGFyYW1zLnRvU3RyaW5nKCk7XG4gICAgICBpZiAocGFyYW1zLmxlbmd0aCkge1xuICAgICAgICBlbmRwb2ludCArPSAnPycgKyBwYXJhbXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZ2V0RW5kcG9pbnQoZW5kcG9pbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRFbmRwb2ludChlbmRwb2ludDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAvKlxuICAgICAqIElmIHRoZSBlbmRwb2ludCB0byBnZXQgdGhlIHVybCBmb3IgYWxyZWFkeSBoYXMgdGhlIGNvbmZpZ3VyZWQgYmFzZSB1cmwgYXBwZW5kZWQsXG4gICAgICogZG8gbm90IHRyeSBhbmQgYXBwZW5kIGl0IGFnYWluXG4gICAgICovXG4gICAgaWYgKGVuZHBvaW50LnN0YXJ0c1dpdGgodGhpcy5nZXRCYXNlRW5kcG9pbnQoKSkpIHtcbiAgICAgIHJldHVybiBlbmRwb2ludDtcbiAgICB9XG5cbiAgICBpZiAoIWVuZHBvaW50LnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgZW5kcG9pbnQgPSAnLycgKyBlbmRwb2ludDtcbiAgICB9XG5cbiAgICByZXR1cm4gYCR7dGhpcy5nZXRCYXNlRW5kcG9pbnQoKX0ke2VuZHBvaW50fWA7XG4gIH1cblxuICBwcml2YXRlIGdldEJhc2VFbmRwb2ludCgpOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy5jZHNDb25maWcgfHwgIXRoaXMuY2RzQ29uZmlnLmNkcyB8fCAhdGhpcy5jZHNDb25maWcuY2RzLmJhc2VVcmwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jZHNDb25maWcuY2RzLmJhc2VVcmw7XG4gIH1cbn1cbiJdfQ==