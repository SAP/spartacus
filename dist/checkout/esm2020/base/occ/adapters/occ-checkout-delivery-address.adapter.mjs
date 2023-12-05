/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ADDRESS_NORMALIZER, ADDRESS_SERIALIZER, LoggerService, backOff, isJaloError, normalizeHttpError, } from '@spartacus/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class OccCheckoutDeliveryAddressAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.logger = inject(LoggerService);
    }
    createAddress(userId, cartId, address) {
        address = this.converter.convert(address, ADDRESS_SERIALIZER);
        return this.http
            .post(this.getCreateDeliveryAddressEndpoint(userId, cartId), address, {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        })
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), backOff({
            shouldRetry: isJaloError,
        }), this.converter.pipeable(ADDRESS_NORMALIZER));
    }
    getCreateDeliveryAddressEndpoint(userId, cartId) {
        return this.occEndpoints.buildUrl('createDeliveryAddress', {
            urlParams: {
                userId,
                cartId,
            },
        });
    }
    setAddress(userId, cartId, addressId) {
        return this.http
            .put(this.getSetDeliveryAddressEndpoint(userId, cartId, addressId), {})
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), backOff({
            shouldRetry: isJaloError,
        }));
    }
    getSetDeliveryAddressEndpoint(userId, cartId, addressId) {
        return this.occEndpoints.buildUrl('setDeliveryAddress', {
            urlParams: { userId, cartId },
            queryParams: { addressId },
        });
    }
    clearCheckoutDeliveryAddress(userId, cartId) {
        return this.http
            .delete(this.getRemoveDeliveryAddressEndpoint(userId, cartId))
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), backOff({
            shouldRetry: isJaloError,
        }));
    }
    getRemoveDeliveryAddressEndpoint(userId, cartId) {
        return this.occEndpoints.buildUrl('removeDeliveryAddress', {
            urlParams: {
                userId,
                cartId,
            },
        });
    }
}
OccCheckoutDeliveryAddressAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCheckoutDeliveryAddressAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCheckoutDeliveryAddressAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCheckoutDeliveryAddressAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCheckoutDeliveryAddressAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNoZWNrb3V0LWRlbGl2ZXJ5LWFkZHJlc3MuYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jaGVja291dC9iYXNlL29jYy9hZGFwdGVycy9vY2MtY2hlY2tvdXQtZGVsaXZlcnktYWRkcmVzcy5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQWMsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUNMLGtCQUFrQixFQUNsQixrQkFBa0IsRUFHbEIsYUFBYSxFQUdiLE9BQU8sRUFDUCxXQUFXLEVBQ1gsa0JBQWtCLEdBQ25CLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFHNUMsTUFBTSxPQUFPLGlDQUFpQztJQUs1QyxZQUNZLElBQWdCLEVBQ2hCLFlBQWlDLEVBQ2pDLFNBQTJCO1FBRjNCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ2pDLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBTDdCLFdBQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFNdEMsQ0FBQztJQUVHLGFBQWEsQ0FDbEIsTUFBYyxFQUNkLE1BQWMsRUFDZCxPQUFnQjtRQUVoQixPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFOUQsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLElBQUksQ0FDSCxJQUFJLENBQUMsZ0NBQWdDLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUNyRCxPQUFPLEVBQ1A7WUFDRSxPQUFPLEVBQUUsSUFBSSxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDO1NBQ25FLENBQ0Y7YUFDQSxJQUFJLENBQ0gsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDbkIsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FDbkQsRUFDRCxPQUFPLENBQUM7WUFDTixXQUFXLEVBQUUsV0FBVztTQUN6QixDQUFDLEVBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FDNUMsQ0FBQztJQUNOLENBQUM7SUFFUyxnQ0FBZ0MsQ0FDeEMsTUFBYyxFQUNkLE1BQWM7UUFFZCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLHVCQUF1QixFQUFFO1lBQ3pELFNBQVMsRUFBRTtnQkFDVCxNQUFNO2dCQUNOLE1BQU07YUFDUDtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxVQUFVLENBQ2YsTUFBYyxFQUNkLE1BQWMsRUFDZCxTQUFpQjtRQUVqQixPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUNGLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxFQUM3RCxFQUFFLENBQ0g7YUFDQSxJQUFJLENBQ0gsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDbkIsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FDbkQsRUFDRCxPQUFPLENBQUM7WUFDTixXQUFXLEVBQUUsV0FBVztTQUN6QixDQUFDLENBQ0gsQ0FBQztJQUNOLENBQUM7SUFFUyw2QkFBNkIsQ0FDckMsTUFBYyxFQUNkLE1BQWMsRUFDZCxTQUFrQjtRQUVsQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLG9CQUFvQixFQUFFO1lBQ3RELFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUU7WUFDN0IsV0FBVyxFQUFFLEVBQUUsU0FBUyxFQUFFO1NBQzNCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw0QkFBNEIsQ0FDMUIsTUFBYyxFQUNkLE1BQWM7UUFFZCxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsTUFBTSxDQUFVLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDdEUsSUFBSSxDQUNILFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQ25CLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQ25ELEVBQ0QsT0FBTyxDQUFDO1lBQ04sV0FBVyxFQUFFLFdBQVc7U0FDekIsQ0FBQyxDQUNILENBQUM7SUFDTixDQUFDO0lBRVMsZ0NBQWdDLENBQ3hDLE1BQWMsRUFDZCxNQUFjO1FBRWQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRTtZQUN6RCxTQUFTLEVBQUU7Z0JBQ1QsTUFBTTtnQkFDTixNQUFNO2FBQ1A7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDOzs4SEExR1UsaUNBQWlDO2tJQUFqQyxpQ0FBaUM7MkZBQWpDLGlDQUFpQztrQkFEN0MsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDaGVja291dERlbGl2ZXJ5QWRkcmVzc0FkYXB0ZXIgfSBmcm9tICdAc3BhcnRhY3VzL2NoZWNrb3V0L2Jhc2UvY29yZSc7XG5pbXBvcnQge1xuICBBRERSRVNTX05PUk1BTElaRVIsXG4gIEFERFJFU1NfU0VSSUFMSVpFUixcbiAgQWRkcmVzcyxcbiAgQ29udmVydGVyU2VydmljZSxcbiAgTG9nZ2VyU2VydmljZSxcbiAgT2NjLFxuICBPY2NFbmRwb2ludHNTZXJ2aWNlLFxuICBiYWNrT2ZmLFxuICBpc0phbG9FcnJvcixcbiAgbm9ybWFsaXplSHR0cEVycm9yLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9jY0NoZWNrb3V0RGVsaXZlcnlBZGRyZXNzQWRhcHRlclxuICBpbXBsZW1lbnRzIENoZWNrb3V0RGVsaXZlcnlBZGRyZXNzQWRhcHRlclxue1xuICBwcm90ZWN0ZWQgbG9nZ2VyID0gaW5qZWN0KExvZ2dlclNlcnZpY2UpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByb3RlY3RlZCBvY2NFbmRwb2ludHM6IE9jY0VuZHBvaW50c1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbnZlcnRlcjogQ29udmVydGVyU2VydmljZVxuICApIHt9XG5cbiAgcHVibGljIGNyZWF0ZUFkZHJlc3MoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgY2FydElkOiBzdHJpbmcsXG4gICAgYWRkcmVzczogQWRkcmVzc1xuICApOiBPYnNlcnZhYmxlPEFkZHJlc3M+IHtcbiAgICBhZGRyZXNzID0gdGhpcy5jb252ZXJ0ZXIuY29udmVydChhZGRyZXNzLCBBRERSRVNTX1NFUklBTElaRVIpO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLnBvc3Q8T2NjLkFkZHJlc3M+KFxuICAgICAgICB0aGlzLmdldENyZWF0ZURlbGl2ZXJ5QWRkcmVzc0VuZHBvaW50KHVzZXJJZCwgY2FydElkKSxcbiAgICAgICAgYWRkcmVzcyxcbiAgICAgICAge1xuICAgICAgICAgIGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycygpLnNldCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKSxcbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PlxuICAgICAgICAgIHRocm93RXJyb3Iobm9ybWFsaXplSHR0cEVycm9yKGVycm9yLCB0aGlzLmxvZ2dlcikpXG4gICAgICAgICksXG4gICAgICAgIGJhY2tPZmYoe1xuICAgICAgICAgIHNob3VsZFJldHJ5OiBpc0phbG9FcnJvcixcbiAgICAgICAgfSksXG4gICAgICAgIHRoaXMuY29udmVydGVyLnBpcGVhYmxlKEFERFJFU1NfTk9STUFMSVpFUilcbiAgICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0Q3JlYXRlRGVsaXZlcnlBZGRyZXNzRW5kcG9pbnQoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgY2FydElkOiBzdHJpbmdcbiAgKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5vY2NFbmRwb2ludHMuYnVpbGRVcmwoJ2NyZWF0ZURlbGl2ZXJ5QWRkcmVzcycsIHtcbiAgICAgIHVybFBhcmFtczoge1xuICAgICAgICB1c2VySWQsXG4gICAgICAgIGNhcnRJZCxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc2V0QWRkcmVzcyhcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBjYXJ0SWQ6IHN0cmluZyxcbiAgICBhZGRyZXNzSWQ6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAucHV0PHVua25vd24+KFxuICAgICAgICB0aGlzLmdldFNldERlbGl2ZXJ5QWRkcmVzc0VuZHBvaW50KHVzZXJJZCwgY2FydElkLCBhZGRyZXNzSWQpLFxuICAgICAgICB7fVxuICAgICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PlxuICAgICAgICAgIHRocm93RXJyb3Iobm9ybWFsaXplSHR0cEVycm9yKGVycm9yLCB0aGlzLmxvZ2dlcikpXG4gICAgICAgICksXG4gICAgICAgIGJhY2tPZmYoe1xuICAgICAgICAgIHNob3VsZFJldHJ5OiBpc0phbG9FcnJvcixcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0U2V0RGVsaXZlcnlBZGRyZXNzRW5kcG9pbnQoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgY2FydElkOiBzdHJpbmcsXG4gICAgYWRkcmVzc0lkPzogc3RyaW5nXG4gICk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMub2NjRW5kcG9pbnRzLmJ1aWxkVXJsKCdzZXREZWxpdmVyeUFkZHJlc3MnLCB7XG4gICAgICB1cmxQYXJhbXM6IHsgdXNlcklkLCBjYXJ0SWQgfSxcbiAgICAgIHF1ZXJ5UGFyYW1zOiB7IGFkZHJlc3NJZCB9LFxuICAgIH0pO1xuICB9XG5cbiAgY2xlYXJDaGVja291dERlbGl2ZXJ5QWRkcmVzcyhcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBjYXJ0SWQ6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAuZGVsZXRlPHVua25vd24+KHRoaXMuZ2V0UmVtb3ZlRGVsaXZlcnlBZGRyZXNzRW5kcG9pbnQodXNlcklkLCBjYXJ0SWQpKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PlxuICAgICAgICAgIHRocm93RXJyb3Iobm9ybWFsaXplSHR0cEVycm9yKGVycm9yLCB0aGlzLmxvZ2dlcikpXG4gICAgICAgICksXG4gICAgICAgIGJhY2tPZmYoe1xuICAgICAgICAgIHNob3VsZFJldHJ5OiBpc0phbG9FcnJvcixcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0UmVtb3ZlRGVsaXZlcnlBZGRyZXNzRW5kcG9pbnQoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgY2FydElkOiBzdHJpbmdcbiAgKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5vY2NFbmRwb2ludHMuYnVpbGRVcmwoJ3JlbW92ZURlbGl2ZXJ5QWRkcmVzcycsIHtcbiAgICAgIHVybFBhcmFtczoge1xuICAgICAgICB1c2VySWQsXG4gICAgICAgIGNhcnRJZCxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==