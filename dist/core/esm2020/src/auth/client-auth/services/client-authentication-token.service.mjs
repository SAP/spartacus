/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../user-auth/services/auth-config.service";
/**
 * Responsible for requesting from OAuth server `ClientToken` for a particular
 * auth client.
 */
export class ClientAuthenticationTokenService {
    constructor(http, authConfigService) {
        this.http = http;
        this.authConfigService = authConfigService;
    }
    /**
     * Loads token with client authentication flow.
     *
     * @returns observable with ClientToken
     */
    loadClientAuthenticationToken() {
        const url = this.authConfigService.getTokenEndpoint();
        const params = new HttpParams()
            .set('client_id', encodeURIComponent(this.authConfigService.getClientId()))
            .set('client_secret', encodeURIComponent(this.authConfigService.getClientSecret()))
            .set('grant_type', 'client_credentials');
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return this.http.post(url, params, { headers });
    }
}
ClientAuthenticationTokenService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClientAuthenticationTokenService, deps: [{ token: i1.HttpClient }, { token: i2.AuthConfigService }], target: i0.ɵɵFactoryTarget.Injectable });
ClientAuthenticationTokenService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClientAuthenticationTokenService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClientAuthenticationTokenService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.AuthConfigService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LWF1dGhlbnRpY2F0aW9uLXRva2VuLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9hdXRoL2NsaWVudC1hdXRoL3NlcnZpY2VzL2NsaWVudC1hdXRoZW50aWNhdGlvbi10b2tlbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQWMsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzNFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFLM0M7OztHQUdHO0FBSUgsTUFBTSxPQUFPLGdDQUFnQztJQUMzQyxZQUNZLElBQWdCLEVBQ2hCLGlCQUFvQztRQURwQyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7SUFDN0MsQ0FBQztJQUVKOzs7O09BSUc7SUFDSCw2QkFBNkI7UUFDM0IsTUFBTSxHQUFHLEdBQVcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDOUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUU7YUFDNUIsR0FBRyxDQUNGLFdBQVcsRUFDWCxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FDekQ7YUFDQSxHQUFHLENBQ0YsZUFBZSxFQUNmLGtCQUFrQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUM3RDthQUNBLEdBQUcsQ0FBQyxZQUFZLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUUzQyxNQUFNLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQztZQUM5QixjQUFjLEVBQUUsbUNBQW1DO1NBQ3BELENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQWMsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDL0QsQ0FBQzs7NkhBNUJVLGdDQUFnQztpSUFBaEMsZ0NBQWdDLGNBRi9CLE1BQU07MkZBRVAsZ0NBQWdDO2tCQUg1QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQXV0aENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi91c2VyLWF1dGgvc2VydmljZXMvYXV0aC1jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBDbGllbnRUb2tlbiB9IGZyb20gJy4uL21vZGVscy9jbGllbnQtdG9rZW4ubW9kZWwnO1xuXG4vKipcbiAqIFJlc3BvbnNpYmxlIGZvciByZXF1ZXN0aW5nIGZyb20gT0F1dGggc2VydmVyIGBDbGllbnRUb2tlbmAgZm9yIGEgcGFydGljdWxhclxuICogYXV0aCBjbGllbnQuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDbGllbnRBdXRoZW50aWNhdGlvblRva2VuU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByb3RlY3RlZCBhdXRoQ29uZmlnU2VydmljZTogQXV0aENvbmZpZ1NlcnZpY2VcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBMb2FkcyB0b2tlbiB3aXRoIGNsaWVudCBhdXRoZW50aWNhdGlvbiBmbG93LlxuICAgKlxuICAgKiBAcmV0dXJucyBvYnNlcnZhYmxlIHdpdGggQ2xpZW50VG9rZW5cbiAgICovXG4gIGxvYWRDbGllbnRBdXRoZW50aWNhdGlvblRva2VuKCk6IE9ic2VydmFibGU8Q2xpZW50VG9rZW4+IHtcbiAgICBjb25zdCB1cmw6IHN0cmluZyA9IHRoaXMuYXV0aENvbmZpZ1NlcnZpY2UuZ2V0VG9rZW5FbmRwb2ludCgpO1xuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKClcbiAgICAgIC5zZXQoXG4gICAgICAgICdjbGllbnRfaWQnLFxuICAgICAgICBlbmNvZGVVUklDb21wb25lbnQodGhpcy5hdXRoQ29uZmlnU2VydmljZS5nZXRDbGllbnRJZCgpKVxuICAgICAgKVxuICAgICAgLnNldChcbiAgICAgICAgJ2NsaWVudF9zZWNyZXQnLFxuICAgICAgICBlbmNvZGVVUklDb21wb25lbnQodGhpcy5hdXRoQ29uZmlnU2VydmljZS5nZXRDbGllbnRTZWNyZXQoKSlcbiAgICAgIClcbiAgICAgIC5zZXQoJ2dyYW50X3R5cGUnLCAnY2xpZW50X2NyZWRlbnRpYWxzJyk7XG5cbiAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8Q2xpZW50VG9rZW4+KHVybCwgcGFyYW1zLCB7IGhlYWRlcnMgfSk7XG4gIH1cbn1cbiJdfQ==