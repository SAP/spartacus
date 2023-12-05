import { inject, Injectable } from '@angular/core';
import { CART_NORMALIZER } from '@spartacus/cart/base/root';
import { backOff, isJaloError, LoggerService, normalizeHttpError, } from '@spartacus/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class OccCheckoutCostCenterAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.logger = inject(LoggerService);
    }
    setCostCenter(userId, cartId, costCenterId) {
        return this.http
            .put(this.getSetCartCostCenterEndpoint(userId, cartId, costCenterId), {})
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), backOff({ shouldRetry: isJaloError }), this.converter.pipeable(CART_NORMALIZER));
    }
    getSetCartCostCenterEndpoint(userId, cartId, costCenterId) {
        return this.occEndpoints.buildUrl('setCartCostCenter', {
            urlParams: { userId, cartId },
            queryParams: { costCenterId },
        });
    }
}
OccCheckoutCostCenterAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCheckoutCostCenterAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCheckoutCostCenterAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCheckoutCostCenterAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCheckoutCostCenterAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNoZWNrb3V0LWNvc3QtY2VudGVyLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYjJiL29jYy9hZGFwdGVycy9vY2MtY2hlY2tvdXQtY29zdC1jZW50ZXIuYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQVEsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFbEUsT0FBTyxFQUNMLE9BQU8sRUFFUCxXQUFXLEVBQ1gsYUFBYSxFQUNiLGtCQUFrQixHQUVuQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBRzVDLE1BQU0sT0FBTyw0QkFBNEI7SUFHdkMsWUFDWSxJQUFnQixFQUNoQixZQUFpQyxFQUNqQyxTQUEyQjtRQUYzQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUNqQyxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUw3QixXQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBTXRDLENBQUM7SUFFSixhQUFhLENBQ1gsTUFBYyxFQUNkLE1BQWMsRUFDZCxZQUFvQjtRQUVwQixPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxFQUFFLEVBQUUsQ0FBQzthQUN4RSxJQUFJLENBQ0gsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDbkIsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FDbkQsRUFDRCxPQUFPLENBQUMsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQ3pDLENBQUM7SUFDTixDQUFDO0lBRVMsNEJBQTRCLENBQ3BDLE1BQWMsRUFDZCxNQUFjLEVBQ2QsWUFBb0I7UUFFcEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRTtZQUNyRCxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFO1lBQzdCLFdBQVcsRUFBRSxFQUFFLFlBQVksRUFBRTtTQUM5QixDQUFDLENBQUM7SUFDTCxDQUFDOzt5SEFsQ1UsNEJBQTRCOzZIQUE1Qiw0QkFBNEI7MkZBQTVCLDRCQUE0QjtrQkFEeEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBpbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhcnQsIENBUlRfTk9STUFMSVpFUiB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgQ2hlY2tvdXRDb3N0Q2VudGVyQWRhcHRlciB9IGZyb20gJ0BzcGFydGFjdXMvY2hlY2tvdXQvYjJiL2NvcmUnO1xuaW1wb3J0IHtcbiAgYmFja09mZixcbiAgQ29udmVydGVyU2VydmljZSxcbiAgaXNKYWxvRXJyb3IsXG4gIExvZ2dlclNlcnZpY2UsXG4gIG5vcm1hbGl6ZUh0dHBFcnJvcixcbiAgT2NjRW5kcG9pbnRzU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPY2NDaGVja291dENvc3RDZW50ZXJBZGFwdGVyIGltcGxlbWVudHMgQ2hlY2tvdXRDb3N0Q2VudGVyQWRhcHRlciB7XG4gIHByb3RlY3RlZCBsb2dnZXIgPSBpbmplY3QoTG9nZ2VyU2VydmljZSk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJvdGVjdGVkIG9jY0VuZHBvaW50czogT2NjRW5kcG9pbnRzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29udmVydGVyOiBDb252ZXJ0ZXJTZXJ2aWNlXG4gICkge31cblxuICBzZXRDb3N0Q2VudGVyKFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIGNhcnRJZDogc3RyaW5nLFxuICAgIGNvc3RDZW50ZXJJZDogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8Q2FydD4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5wdXQodGhpcy5nZXRTZXRDYXJ0Q29zdENlbnRlckVuZHBvaW50KHVzZXJJZCwgY2FydElkLCBjb3N0Q2VudGVySWQpLCB7fSlcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKChlcnJvcikgPT5cbiAgICAgICAgICB0aHJvd0Vycm9yKG5vcm1hbGl6ZUh0dHBFcnJvcihlcnJvciwgdGhpcy5sb2dnZXIpKVxuICAgICAgICApLFxuICAgICAgICBiYWNrT2ZmKHsgc2hvdWxkUmV0cnk6IGlzSmFsb0Vycm9yIH0pLFxuICAgICAgICB0aGlzLmNvbnZlcnRlci5waXBlYWJsZShDQVJUX05PUk1BTElaRVIpXG4gICAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFNldENhcnRDb3N0Q2VudGVyRW5kcG9pbnQoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgY2FydElkOiBzdHJpbmcsXG4gICAgY29zdENlbnRlcklkOiBzdHJpbmdcbiAgKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5vY2NFbmRwb2ludHMuYnVpbGRVcmwoJ3NldENhcnRDb3N0Q2VudGVyJywge1xuICAgICAgdXJsUGFyYW1zOiB7IHVzZXJJZCwgY2FydElkIH0sXG4gICAgICBxdWVyeVBhcmFtczogeyBjb3N0Q2VudGVySWQgfSxcbiAgICB9KTtcbiAgfVxufVxuIl19