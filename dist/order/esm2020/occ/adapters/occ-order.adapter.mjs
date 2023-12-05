/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { InterceptorUtil, LoggerService, OCC_USER_ID_ANONYMOUS, USE_CLIENT_TOKEN, backOff, isJaloError, normalizeHttpError, } from '@spartacus/core';
import { ORDER_NORMALIZER } from '@spartacus/order/root';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class OccOrderAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.logger = inject(LoggerService);
    }
    placeOrder(userId, cartId, termsChecked) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        if (userId === OCC_USER_ID_ANONYMOUS) {
            headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
        }
        return this.http
            .post(this.getPlaceOrderEndpoint(userId, cartId, termsChecked.toString()), {}, { headers })
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), backOff({
            shouldRetry: isJaloError,
        }), this.converter.pipeable(ORDER_NORMALIZER));
    }
    getPlaceOrderEndpoint(userId, cartId, termsChecked) {
        return this.occEndpoints.buildUrl('placeOrder', {
            urlParams: { userId },
            queryParams: { cartId, termsChecked },
        });
    }
}
OccOrderAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccOrderAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLW9yZGVyLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvb2NjL2FkYXB0ZXJzL29jYy1vcmRlci5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQWMsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUVMLGVBQWUsRUFDZixhQUFhLEVBQ2IscUJBQXFCLEVBR3JCLGdCQUFnQixFQUNoQixPQUFPLEVBQ1AsV0FBVyxFQUNYLGtCQUFrQixHQUNuQixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBUyxNQUFNLHVCQUF1QixDQUFDO0FBQ2hFLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBRzVDLE1BQU0sT0FBTyxlQUFlO0lBRzFCLFlBQ1ksSUFBZ0IsRUFDaEIsWUFBaUMsRUFDakMsU0FBMkI7UUFGM0IsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFMN0IsV0FBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQU10QyxDQUFDO0lBRUcsVUFBVSxDQUNmLE1BQWMsRUFDZCxNQUFjLEVBQ2QsWUFBcUI7UUFFckIsSUFBSSxPQUFPLEdBQUcsSUFBSSxXQUFXLENBQUM7WUFDNUIsY0FBYyxFQUFFLG1DQUFtQztTQUNwRCxDQUFDLENBQUM7UUFFSCxJQUFJLE1BQU0sS0FBSyxxQkFBcUIsRUFBRTtZQUNwQyxPQUFPLEdBQUcsZUFBZSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDekU7UUFFRCxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsSUFBSSxDQUNILElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUNuRSxFQUFFLEVBQ0YsRUFBRSxPQUFPLEVBQUUsQ0FDWjthQUNBLElBQUksQ0FDSCxVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUNuQixVQUFVLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUNuRCxFQUNELE9BQU8sQ0FBQztZQUNOLFdBQVcsRUFBRSxXQUFXO1NBQ3pCLENBQUMsRUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUMxQyxDQUFDO0lBQ04sQ0FBQztJQUVTLHFCQUFxQixDQUM3QixNQUFjLEVBQ2QsTUFBYyxFQUNkLFlBQW9CO1FBRXBCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFO1lBQzlDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRTtZQUNyQixXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFO1NBQ3RDLENBQUMsQ0FBQztJQUNMLENBQUM7OzRHQWhEVSxlQUFlO2dIQUFmLGVBQWU7MkZBQWYsZUFBZTtrQkFEM0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb252ZXJ0ZXJTZXJ2aWNlLFxuICBJbnRlcmNlcHRvclV0aWwsXG4gIExvZ2dlclNlcnZpY2UsXG4gIE9DQ19VU0VSX0lEX0FOT05ZTU9VUyxcbiAgT2NjLFxuICBPY2NFbmRwb2ludHNTZXJ2aWNlLFxuICBVU0VfQ0xJRU5UX1RPS0VOLFxuICBiYWNrT2ZmLFxuICBpc0phbG9FcnJvcixcbiAgbm9ybWFsaXplSHR0cEVycm9yLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT3JkZXJBZGFwdGVyIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmRlci9jb3JlJztcbmltcG9ydCB7IE9SREVSX05PUk1BTElaRVIsIE9yZGVyIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmRlci9yb290JztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPY2NPcmRlckFkYXB0ZXIgaW1wbGVtZW50cyBPcmRlckFkYXB0ZXIge1xuICBwcm90ZWN0ZWQgbG9nZ2VyID0gaW5qZWN0KExvZ2dlclNlcnZpY2UpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByb3RlY3RlZCBvY2NFbmRwb2ludHM6IE9jY0VuZHBvaW50c1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbnZlcnRlcjogQ29udmVydGVyU2VydmljZVxuICApIHt9XG5cbiAgcHVibGljIHBsYWNlT3JkZXIoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgY2FydElkOiBzdHJpbmcsXG4gICAgdGVybXNDaGVja2VkOiBib29sZWFuXG4gICk6IE9ic2VydmFibGU8T3JkZXI+IHtcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICAgfSk7XG5cbiAgICBpZiAodXNlcklkID09PSBPQ0NfVVNFUl9JRF9BTk9OWU1PVVMpIHtcbiAgICAgIGhlYWRlcnMgPSBJbnRlcmNlcHRvclV0aWwuY3JlYXRlSGVhZGVyKFVTRV9DTElFTlRfVE9LRU4sIHRydWUsIGhlYWRlcnMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5wb3N0PE9jYy5PcmRlcj4oXG4gICAgICAgIHRoaXMuZ2V0UGxhY2VPcmRlckVuZHBvaW50KHVzZXJJZCwgY2FydElkLCB0ZXJtc0NoZWNrZWQudG9TdHJpbmcoKSksXG4gICAgICAgIHt9LFxuICAgICAgICB7IGhlYWRlcnMgfVxuICAgICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PlxuICAgICAgICAgIHRocm93RXJyb3Iobm9ybWFsaXplSHR0cEVycm9yKGVycm9yLCB0aGlzLmxvZ2dlcikpXG4gICAgICAgICksXG4gICAgICAgIGJhY2tPZmYoe1xuICAgICAgICAgIHNob3VsZFJldHJ5OiBpc0phbG9FcnJvcixcbiAgICAgICAgfSksXG4gICAgICAgIHRoaXMuY29udmVydGVyLnBpcGVhYmxlKE9SREVSX05PUk1BTElaRVIpXG4gICAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFBsYWNlT3JkZXJFbmRwb2ludChcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBjYXJ0SWQ6IHN0cmluZyxcbiAgICB0ZXJtc0NoZWNrZWQ6IHN0cmluZ1xuICApOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm9jY0VuZHBvaW50cy5idWlsZFVybCgncGxhY2VPcmRlcicsIHtcbiAgICAgIHVybFBhcmFtczogeyB1c2VySWQgfSxcbiAgICAgIHF1ZXJ5UGFyYW1zOiB7IGNhcnRJZCwgdGVybXNDaGVja2VkIH0sXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==