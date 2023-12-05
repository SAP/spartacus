import { Injectable, inject } from '@angular/core';
import { DELIVERY_MODE_NORMALIZER, } from '@spartacus/checkout/base/core';
import { LoggerService, backOff, isJaloError, normalizeHttpError, } from '@spartacus/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class OccCheckoutDeliveryModesAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.logger = inject(LoggerService);
    }
    setMode(userId, cartId, deliveryModeId) {
        return this.http
            .put(this.getSetDeliveryModeEndpoint(userId, cartId, deliveryModeId), {})
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), backOff({
            shouldRetry: isJaloError,
        }));
    }
    getSetDeliveryModeEndpoint(userId, cartId, deliveryModeId) {
        return this.occEndpoints.buildUrl('setDeliveryMode', {
            urlParams: {
                userId,
                cartId,
            },
            queryParams: { deliveryModeId },
        });
    }
    getSupportedModes(userId, cartId) {
        return this.http
            .get(this.getDeliveryModesEndpoint(userId, cartId))
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), backOff({
            shouldRetry: isJaloError,
        }), map((listResponse) => listResponse.deliveryModes), map((modes) => modes ?? []), this.converter.pipeableMany(DELIVERY_MODE_NORMALIZER));
    }
    getDeliveryModesEndpoint(userId, cartId) {
        return this.occEndpoints.buildUrl('deliveryModes', {
            urlParams: { userId, cartId },
        });
    }
    clearCheckoutDeliveryMode(userId, cartId) {
        return this.http
            .delete(this.getClearDeliveryModeEndpoint(userId, cartId))
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), backOff({
            shouldRetry: isJaloError,
        }));
    }
    getClearDeliveryModeEndpoint(userId, cartId) {
        return this.occEndpoints.buildUrl('clearDeliveryMode', {
            urlParams: { userId, cartId },
        });
    }
}
OccCheckoutDeliveryModesAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCheckoutDeliveryModesAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCheckoutDeliveryModesAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCheckoutDeliveryModesAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCheckoutDeliveryModesAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNoZWNrb3V0LWRlbGl2ZXJ5LW1vZGVzLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYmFzZS9vY2MvYWRhcHRlcnMvb2NjLWNoZWNrb3V0LWRlbGl2ZXJ5LW1vZGVzLmFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUVMLHdCQUF3QixHQUN6QixNQUFNLCtCQUErQixDQUFDO0FBQ3ZDLE9BQU8sRUFFTCxhQUFhLEVBR2IsT0FBTyxFQUNQLFdBQVcsRUFDWCxrQkFBa0IsR0FDbkIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFHakQsTUFBTSxPQUFPLCtCQUErQjtJQUsxQyxZQUNZLElBQWdCLEVBQ2hCLFlBQWlDLEVBQ2pDLFNBQTJCO1FBRjNCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ2pDLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBTDdCLFdBQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFNdEMsQ0FBQztJQUVHLE9BQU8sQ0FDWixNQUFjLEVBQ2QsTUFBYyxFQUNkLGNBQXNCO1FBRXRCLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixHQUFHLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsY0FBYyxDQUFDLEVBQUUsRUFBRSxDQUFDO2FBQ3hFLElBQUksQ0FDSCxVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUNuQixVQUFVLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUNuRCxFQUNELE9BQU8sQ0FBQztZQUNOLFdBQVcsRUFBRSxXQUFXO1NBQ3pCLENBQUMsQ0FDSCxDQUFDO0lBQ04sQ0FBQztJQUVTLDBCQUEwQixDQUNsQyxNQUFjLEVBQ2QsTUFBYyxFQUNkLGNBQXVCO1FBRXZCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUU7WUFDbkQsU0FBUyxFQUFFO2dCQUNULE1BQU07Z0JBQ04sTUFBTTthQUNQO1lBQ0QsV0FBVyxFQUFFLEVBQUUsY0FBYyxFQUFFO1NBQ2hDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxpQkFBaUIsQ0FDdEIsTUFBYyxFQUNkLE1BQWM7UUFFZCxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUF1QixJQUFJLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQ3hFLElBQUksQ0FDSCxVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUNuQixVQUFVLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUNuRCxFQUNELE9BQU8sQ0FBQztZQUNOLFdBQVcsRUFBRSxXQUFXO1NBQ3pCLENBQUMsRUFDRixHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsRUFDakQsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLEVBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLHdCQUF3QixDQUFDLENBQ3RELENBQUM7SUFDTixDQUFDO0lBRVMsd0JBQXdCLENBQUMsTUFBYyxFQUFFLE1BQWM7UUFDL0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUU7WUFDakQsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTtTQUM5QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQseUJBQXlCLENBQ3ZCLE1BQWMsRUFDZCxNQUFjO1FBRWQsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLE1BQU0sQ0FBVSxJQUFJLENBQUMsNEJBQTRCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQ2xFLElBQUksQ0FDSCxVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUNuQixVQUFVLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUNuRCxFQUNELE9BQU8sQ0FBQztZQUNOLFdBQVcsRUFBRSxXQUFXO1NBQ3pCLENBQUMsQ0FDSCxDQUFDO0lBQ04sQ0FBQztJQUVTLDRCQUE0QixDQUNwQyxNQUFjLEVBQ2QsTUFBYztRQUVkLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLEVBQUU7WUFDckQsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTtTQUM5QixDQUFDLENBQUM7SUFDTCxDQUFDOzs0SEExRlUsK0JBQStCO2dJQUEvQiwrQkFBK0I7MkZBQS9CLCtCQUErQjtrQkFEM0MsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlbGl2ZXJ5TW9kZSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQ2hlY2tvdXREZWxpdmVyeU1vZGVzQWRhcHRlcixcbiAgREVMSVZFUllfTU9ERV9OT1JNQUxJWkVSLFxufSBmcm9tICdAc3BhcnRhY3VzL2NoZWNrb3V0L2Jhc2UvY29yZSc7XG5pbXBvcnQge1xuICBDb252ZXJ0ZXJTZXJ2aWNlLFxuICBMb2dnZXJTZXJ2aWNlLFxuICBPY2MsXG4gIE9jY0VuZHBvaW50c1NlcnZpY2UsXG4gIGJhY2tPZmYsXG4gIGlzSmFsb0Vycm9yLFxuICBub3JtYWxpemVIdHRwRXJyb3IsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPY2NDaGVja291dERlbGl2ZXJ5TW9kZXNBZGFwdGVyXG4gIGltcGxlbWVudHMgQ2hlY2tvdXREZWxpdmVyeU1vZGVzQWRhcHRlclxue1xuICBwcm90ZWN0ZWQgbG9nZ2VyID0gaW5qZWN0KExvZ2dlclNlcnZpY2UpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByb3RlY3RlZCBvY2NFbmRwb2ludHM6IE9jY0VuZHBvaW50c1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbnZlcnRlcjogQ29udmVydGVyU2VydmljZVxuICApIHt9XG5cbiAgcHVibGljIHNldE1vZGUoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgY2FydElkOiBzdHJpbmcsXG4gICAgZGVsaXZlcnlNb2RlSWQ6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAucHV0KHRoaXMuZ2V0U2V0RGVsaXZlcnlNb2RlRW5kcG9pbnQodXNlcklkLCBjYXJ0SWQsIGRlbGl2ZXJ5TW9kZUlkKSwge30pXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+XG4gICAgICAgICAgdGhyb3dFcnJvcihub3JtYWxpemVIdHRwRXJyb3IoZXJyb3IsIHRoaXMubG9nZ2VyKSlcbiAgICAgICAgKSxcbiAgICAgICAgYmFja09mZih7XG4gICAgICAgICAgc2hvdWxkUmV0cnk6IGlzSmFsb0Vycm9yLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRTZXREZWxpdmVyeU1vZGVFbmRwb2ludChcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBjYXJ0SWQ6IHN0cmluZyxcbiAgICBkZWxpdmVyeU1vZGVJZD86IHN0cmluZ1xuICApOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm9jY0VuZHBvaW50cy5idWlsZFVybCgnc2V0RGVsaXZlcnlNb2RlJywge1xuICAgICAgdXJsUGFyYW1zOiB7XG4gICAgICAgIHVzZXJJZCxcbiAgICAgICAgY2FydElkLFxuICAgICAgfSxcbiAgICAgIHF1ZXJ5UGFyYW1zOiB7IGRlbGl2ZXJ5TW9kZUlkIH0sXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0U3VwcG9ydGVkTW9kZXMoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgY2FydElkOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxEZWxpdmVyeU1vZGVbXT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQ8T2NjLkRlbGl2ZXJ5TW9kZUxpc3Q+KHRoaXMuZ2V0RGVsaXZlcnlNb2Rlc0VuZHBvaW50KHVzZXJJZCwgY2FydElkKSlcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKChlcnJvcikgPT5cbiAgICAgICAgICB0aHJvd0Vycm9yKG5vcm1hbGl6ZUh0dHBFcnJvcihlcnJvciwgdGhpcy5sb2dnZXIpKVxuICAgICAgICApLFxuICAgICAgICBiYWNrT2ZmKHtcbiAgICAgICAgICBzaG91bGRSZXRyeTogaXNKYWxvRXJyb3IsXG4gICAgICAgIH0pLFxuICAgICAgICBtYXAoKGxpc3RSZXNwb25zZSkgPT4gbGlzdFJlc3BvbnNlLmRlbGl2ZXJ5TW9kZXMpLFxuICAgICAgICBtYXAoKG1vZGVzKSA9PiBtb2RlcyA/PyBbXSksXG4gICAgICAgIHRoaXMuY29udmVydGVyLnBpcGVhYmxlTWFueShERUxJVkVSWV9NT0RFX05PUk1BTElaRVIpXG4gICAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldERlbGl2ZXJ5TW9kZXNFbmRwb2ludCh1c2VySWQ6IHN0cmluZywgY2FydElkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm9jY0VuZHBvaW50cy5idWlsZFVybCgnZGVsaXZlcnlNb2RlcycsIHtcbiAgICAgIHVybFBhcmFtczogeyB1c2VySWQsIGNhcnRJZCB9LFxuICAgIH0pO1xuICB9XG5cbiAgY2xlYXJDaGVja291dERlbGl2ZXJ5TW9kZShcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBjYXJ0SWQ6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAuZGVsZXRlPHVua25vd24+KHRoaXMuZ2V0Q2xlYXJEZWxpdmVyeU1vZGVFbmRwb2ludCh1c2VySWQsIGNhcnRJZCkpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+XG4gICAgICAgICAgdGhyb3dFcnJvcihub3JtYWxpemVIdHRwRXJyb3IoZXJyb3IsIHRoaXMubG9nZ2VyKSlcbiAgICAgICAgKSxcbiAgICAgICAgYmFja09mZih7XG4gICAgICAgICAgc2hvdWxkUmV0cnk6IGlzSmFsb0Vycm9yLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRDbGVhckRlbGl2ZXJ5TW9kZUVuZHBvaW50KFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIGNhcnRJZDogc3RyaW5nXG4gICk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMub2NjRW5kcG9pbnRzLmJ1aWxkVXJsKCdjbGVhckRlbGl2ZXJ5TW9kZScsIHtcbiAgICAgIHVybFBhcmFtczogeyB1c2VySWQsIGNhcnRJZCB9LFxuICAgIH0pO1xuICB9XG59XG4iXX0=