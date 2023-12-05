/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { InterceptorUtil, LoggerService, USE_CLIENT_TOKEN, normalizeHttpError, } from '@spartacus/core';
import { ORGANIZATION_USER_REGISTRATION_SERIALIZER, } from '@spartacus/organization/user-registration/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class OccUserRegistrationAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.logger = inject(LoggerService);
    }
    registerUser(userData) {
        const url = this.getOrganizationUserRegistrationEndpoint();
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
        userData = this.converter.convert(userData, ORGANIZATION_USER_REGISTRATION_SERIALIZER);
        return this.http
            .post(url, userData, { headers })
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))));
    }
    getOrganizationUserRegistrationEndpoint() {
        return this.occEndpoints.buildUrl('organizationUserRegistration');
    }
}
OccUserRegistrationAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserRegistrationAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccUserRegistrationAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserRegistrationAdapter, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserRegistrationAdapter, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXVzZXItcmVnaXN0cmF0aW9uLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL3VzZXItcmVnaXN0cmF0aW9uL29jYy9hZGFwdGVycy9vY2MtdXNlci1yZWdpc3RyYXRpb24uYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFjLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFFTCxlQUFlLEVBQ2YsYUFBYSxFQUViLGdCQUFnQixFQUNoQixrQkFBa0IsR0FDbkIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQ0wseUNBQXlDLEdBRTFDLE1BQU0sZ0RBQWdELENBQUM7QUFFeEQsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFLNUMsTUFBTSxPQUFPLDBCQUEwQjtJQUdyQyxZQUNZLElBQWdCLEVBQ2hCLFlBQWlDLEVBQ2pDLFNBQTJCO1FBRjNCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ2pDLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBTDdCLFdBQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFNdEMsQ0FBQztJQUVKLFlBQVksQ0FDVixRQUFzQztRQUV0QyxNQUFNLEdBQUcsR0FBVyxJQUFJLENBQUMsdUNBQXVDLEVBQUUsQ0FBQztRQUNuRSxJQUFJLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQztZQUM1QixjQUFjLEVBQUUsa0JBQWtCO1NBQ25DLENBQUMsQ0FBQztRQUNILE9BQU8sR0FBRyxlQUFlLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN4RSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQy9CLFFBQVEsRUFDUix5Q0FBeUMsQ0FDMUMsQ0FBQztRQUVGLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixJQUFJLENBQStCLEdBQUcsRUFBRSxRQUFRLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUM5RCxJQUFJLENBQ0gsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDbkIsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FDbkQsQ0FDRixDQUFDO0lBQ04sQ0FBQztJQUVTLHVDQUF1QztRQUMvQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFDcEUsQ0FBQzs7dUhBakNVLDBCQUEwQjsySEFBMUIsMEJBQTBCLGNBRnpCLE1BQU07MkZBRVAsMEJBQTBCO2tCQUh0QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb252ZXJ0ZXJTZXJ2aWNlLFxuICBJbnRlcmNlcHRvclV0aWwsXG4gIExvZ2dlclNlcnZpY2UsXG4gIE9jY0VuZHBvaW50c1NlcnZpY2UsXG4gIFVTRV9DTElFTlRfVE9LRU4sXG4gIG5vcm1hbGl6ZUh0dHBFcnJvcixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIE9SR0FOSVpBVElPTl9VU0VSX1JFR0lTVFJBVElPTl9TRVJJQUxJWkVSLFxuICBVc2VyUmVnaXN0cmF0aW9uQWRhcHRlcixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vdXNlci1yZWdpc3RyYXRpb24vY29yZSc7XG5pbXBvcnQgeyBPcmdhbml6YXRpb25Vc2VyUmVnaXN0cmF0aW9uIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vdXNlci1yZWdpc3RyYXRpb24vcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgT2NjVXNlclJlZ2lzdHJhdGlvbkFkYXB0ZXIgaW1wbGVtZW50cyBVc2VyUmVnaXN0cmF0aW9uQWRhcHRlciB7XG4gIHByb3RlY3RlZCBsb2dnZXIgPSBpbmplY3QoTG9nZ2VyU2VydmljZSk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJvdGVjdGVkIG9jY0VuZHBvaW50czogT2NjRW5kcG9pbnRzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29udmVydGVyOiBDb252ZXJ0ZXJTZXJ2aWNlXG4gICkge31cblxuICByZWdpc3RlclVzZXIoXG4gICAgdXNlckRhdGE6IE9yZ2FuaXphdGlvblVzZXJSZWdpc3RyYXRpb25cbiAgKTogT2JzZXJ2YWJsZTxPcmdhbml6YXRpb25Vc2VyUmVnaXN0cmF0aW9uPiB7XG4gICAgY29uc3QgdXJsOiBzdHJpbmcgPSB0aGlzLmdldE9yZ2FuaXphdGlvblVzZXJSZWdpc3RyYXRpb25FbmRwb2ludCgpO1xuICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgfSk7XG4gICAgaGVhZGVycyA9IEludGVyY2VwdG9yVXRpbC5jcmVhdGVIZWFkZXIoVVNFX0NMSUVOVF9UT0tFTiwgdHJ1ZSwgaGVhZGVycyk7XG4gICAgdXNlckRhdGEgPSB0aGlzLmNvbnZlcnRlci5jb252ZXJ0KFxuICAgICAgdXNlckRhdGEsXG4gICAgICBPUkdBTklaQVRJT05fVVNFUl9SRUdJU1RSQVRJT05fU0VSSUFMSVpFUlxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAucG9zdDxPcmdhbml6YXRpb25Vc2VyUmVnaXN0cmF0aW9uPih1cmwsIHVzZXJEYXRhLCB7IGhlYWRlcnMgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKChlcnJvcikgPT5cbiAgICAgICAgICB0aHJvd0Vycm9yKG5vcm1hbGl6ZUh0dHBFcnJvcihlcnJvciwgdGhpcy5sb2dnZXIpKVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldE9yZ2FuaXphdGlvblVzZXJSZWdpc3RyYXRpb25FbmRwb2ludCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm9jY0VuZHBvaW50cy5idWlsZFVybCgnb3JnYW5pemF0aW9uVXNlclJlZ2lzdHJhdGlvbicpO1xuICB9XG59XG4iXX0=