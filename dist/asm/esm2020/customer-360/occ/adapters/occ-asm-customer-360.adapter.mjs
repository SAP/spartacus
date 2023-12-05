/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ASM_CUSTOMER_360_NORMALIZER, } from '@spartacus/asm/customer-360/core';
import { InterceptorUtil, normalizeHttpError, USE_CUSTOMER_SUPPORT_AGENT_TOKEN, } from '@spartacus/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class OccAsmCustomer360Adapter {
    constructor(http, occEndpointsService, converterService, baseSiteService) {
        this.http = http;
        this.occEndpointsService = occEndpointsService;
        this.converterService = converterService;
        this.baseSiteService = baseSiteService;
        this.baseSiteService
            .getActive()
            .subscribe((value) => (this.activeBaseSite = value));
    }
    getHeaders() {
        return InterceptorUtil.createHeader(USE_CUSTOMER_SUPPORT_AGENT_TOKEN, true, new HttpHeaders());
    }
    getAsmCustomer360Data(request) {
        const headers = InterceptorUtil.createHeader(USE_CUSTOMER_SUPPORT_AGENT_TOKEN, true, new HttpHeaders());
        const url = this.occEndpointsService.buildUrl('asmCustomer360', {
            urlParams: {
                baseSiteId: this.activeBaseSite,
                userId: request.options.userId ?? '',
            },
        }, {
            baseSite: false,
            prefix: false,
        });
        const requestBody = {
            customer360Queries: request.queries,
        };
        return this.http
            .post(url, requestBody, { headers })
            .pipe(catchError((error) => throwError(normalizeHttpError(error))), this.converterService.pipeable(ASM_CUSTOMER_360_NORMALIZER));
    }
}
OccAsmCustomer360Adapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccAsmCustomer360Adapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }, { token: i2.BaseSiteService }], target: i0.ɵɵFactoryTarget.Injectable });
OccAsmCustomer360Adapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccAsmCustomer360Adapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccAsmCustomer360Adapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }, { type: i2.BaseSiteService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWFzbS1jdXN0b21lci0zNjAuYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vY3VzdG9tZXItMzYwL29jYy9hZGFwdGVycy9vY2MtYXNtLWN1c3RvbWVyLTM2MC5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQWMsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBRUwsMkJBQTJCLEdBQzVCLE1BQU0sa0NBQWtDLENBQUM7QUFLMUMsT0FBTyxFQUdMLGVBQWUsRUFDZixrQkFBa0IsRUFFbEIsZ0NBQWdDLEdBQ2pDLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFHNUMsTUFBTSxPQUFPLHdCQUF3QjtJQUduQyxZQUNZLElBQWdCLEVBQ2hCLG1CQUF3QyxFQUN4QyxnQkFBa0MsRUFDbEMsZUFBZ0M7UUFIaEMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBRTFDLElBQUksQ0FBQyxlQUFlO2FBQ2pCLFNBQVMsRUFBRTthQUNYLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVTLFVBQVU7UUFDbEIsT0FBTyxlQUFlLENBQUMsWUFBWSxDQUNqQyxnQ0FBZ0MsRUFDaEMsSUFBSSxFQUNKLElBQUksV0FBVyxFQUFFLENBQ2xCLENBQUM7SUFDSixDQUFDO0lBRUQscUJBQXFCLENBQ25CLE9BQThCO1FBRTlCLE1BQU0sT0FBTyxHQUFHLGVBQWUsQ0FBQyxZQUFZLENBQzFDLGdDQUFnQyxFQUNoQyxJQUFJLEVBQ0osSUFBSSxXQUFXLEVBQUUsQ0FDbEIsQ0FBQztRQUVGLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQzNDLGdCQUFnQixFQUNoQjtZQUNFLFNBQVMsRUFBRTtnQkFDVCxVQUFVLEVBQUUsSUFBSSxDQUFDLGNBQWM7Z0JBQy9CLE1BQU0sRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxFQUFFO2FBQ3JDO1NBQ0YsRUFDRDtZQUNFLFFBQVEsRUFBRSxLQUFLO1lBQ2YsTUFBTSxFQUFFLEtBQUs7U0FDZCxDQUNGLENBQUM7UUFFRixNQUFNLFdBQVcsR0FBRztZQUNsQixrQkFBa0IsRUFBRSxPQUFPLENBQUMsT0FBTztTQUNwQyxDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLElBQUksQ0FBeUIsR0FBRyxFQUFFLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQzNELElBQUksQ0FDSCxVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQzVELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsMkJBQTJCLENBQUMsQ0FDNUQsQ0FBQztJQUNOLENBQUM7O3FIQXZEVSx3QkFBd0I7eUhBQXhCLHdCQUF3QjsyRkFBeEIsd0JBQXdCO2tCQURwQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBBc21DdXN0b21lcjM2MEFkYXB0ZXIsXG4gIEFTTV9DVVNUT01FUl8zNjBfTk9STUFMSVpFUixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9hc20vY3VzdG9tZXItMzYwL2NvcmUnO1xuaW1wb3J0IHtcbiAgQXNtQ3VzdG9tZXIzNjBSZXF1ZXN0LFxuICBBc21DdXN0b21lcjM2MFJlc3BvbnNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2FzbS9jdXN0b21lci0zNjAvcm9vdCc7XG5pbXBvcnQge1xuICBCYXNlU2l0ZVNlcnZpY2UsXG4gIENvbnZlcnRlclNlcnZpY2UsXG4gIEludGVyY2VwdG9yVXRpbCxcbiAgbm9ybWFsaXplSHR0cEVycm9yLFxuICBPY2NFbmRwb2ludHNTZXJ2aWNlLFxuICBVU0VfQ1VTVE9NRVJfU1VQUE9SVF9BR0VOVF9UT0tFTixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPY2NBc21DdXN0b21lcjM2MEFkYXB0ZXIgaW1wbGVtZW50cyBBc21DdXN0b21lcjM2MEFkYXB0ZXIge1xuICBwcml2YXRlIGFjdGl2ZUJhc2VTaXRlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJvdGVjdGVkIG9jY0VuZHBvaW50c1NlcnZpY2U6IE9jY0VuZHBvaW50c1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbnZlcnRlclNlcnZpY2U6IENvbnZlcnRlclNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGJhc2VTaXRlU2VydmljZTogQmFzZVNpdGVTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuYmFzZVNpdGVTZXJ2aWNlXG4gICAgICAuZ2V0QWN0aXZlKClcbiAgICAgIC5zdWJzY3JpYmUoKHZhbHVlKSA9PiAodGhpcy5hY3RpdmVCYXNlU2l0ZSA9IHZhbHVlKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0SGVhZGVycygpOiBIdHRwSGVhZGVycyB7XG4gICAgcmV0dXJuIEludGVyY2VwdG9yVXRpbC5jcmVhdGVIZWFkZXIoXG4gICAgICBVU0VfQ1VTVE9NRVJfU1VQUE9SVF9BR0VOVF9UT0tFTixcbiAgICAgIHRydWUsXG4gICAgICBuZXcgSHR0cEhlYWRlcnMoKVxuICAgICk7XG4gIH1cblxuICBnZXRBc21DdXN0b21lcjM2MERhdGEoXG4gICAgcmVxdWVzdDogQXNtQ3VzdG9tZXIzNjBSZXF1ZXN0XG4gICk6IE9ic2VydmFibGU8QXNtQ3VzdG9tZXIzNjBSZXNwb25zZT4ge1xuICAgIGNvbnN0IGhlYWRlcnMgPSBJbnRlcmNlcHRvclV0aWwuY3JlYXRlSGVhZGVyKFxuICAgICAgVVNFX0NVU1RPTUVSX1NVUFBPUlRfQUdFTlRfVE9LRU4sXG4gICAgICB0cnVlLFxuICAgICAgbmV3IEh0dHBIZWFkZXJzKClcbiAgICApO1xuXG4gICAgY29uc3QgdXJsID0gdGhpcy5vY2NFbmRwb2ludHNTZXJ2aWNlLmJ1aWxkVXJsKFxuICAgICAgJ2FzbUN1c3RvbWVyMzYwJyxcbiAgICAgIHtcbiAgICAgICAgdXJsUGFyYW1zOiB7XG4gICAgICAgICAgYmFzZVNpdGVJZDogdGhpcy5hY3RpdmVCYXNlU2l0ZSxcbiAgICAgICAgICB1c2VySWQ6IHJlcXVlc3Qub3B0aW9ucy51c2VySWQgPz8gJycsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBiYXNlU2l0ZTogZmFsc2UsXG4gICAgICAgIHByZWZpeDogZmFsc2UsXG4gICAgICB9XG4gICAgKTtcblxuICAgIGNvbnN0IHJlcXVlc3RCb2R5ID0ge1xuICAgICAgY3VzdG9tZXIzNjBRdWVyaWVzOiByZXF1ZXN0LnF1ZXJpZXMsXG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5wb3N0PEFzbUN1c3RvbWVyMzYwUmVzcG9uc2U+KHVybCwgcmVxdWVzdEJvZHksIHsgaGVhZGVycyB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB0aHJvd0Vycm9yKG5vcm1hbGl6ZUh0dHBFcnJvcihlcnJvcikpKSxcbiAgICAgICAgdGhpcy5jb252ZXJ0ZXJTZXJ2aWNlLnBpcGVhYmxlKEFTTV9DVVNUT01FUl8zNjBfTk9STUFMSVpFUilcbiAgICAgICk7XG4gIH1cbn1cbiJdfQ==