/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfigService } from '@spartacus/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class CdcUserAuthenticationTokenService {
    constructor(http, authConfigService) {
        this.http = http;
        this.authConfigService = authConfigService;
    }
    /**
     * Load User token using custom oauth flow
     *
     * @param UID - UID received from CDC on login event
     * @param UIDSignature - UIDSignature received from CDC on login event
     * @param signatureTimestamp - signatureTimestamp received from CDC on login event
     * @param idToken - idToken received from CDC on login event
     * @param baseSite - baseSite received from CDC on login event
     */
    loadTokenUsingCustomFlow(UID, UIDSignature, signatureTimestamp, idToken, baseSite) {
        const url = this.authConfigService.getTokenEndpoint();
        const params = new HttpParams()
            .set('client_id', this.authConfigService.getClientId())
            .set('client_secret', this.authConfigService.getClientSecret())
            .set('grant_type', 'custom')
            .set('UID', encodeURIComponent(UID))
            .set('UIDSignature', encodeURIComponent(UIDSignature))
            .set('signatureTimestamp', encodeURIComponent(signatureTimestamp))
            .set('id_token', encodeURIComponent(idToken))
            .set('baseSite', encodeURIComponent(baseSite));
        return this.http
            .post(url, params)
            .pipe(catchError((error) => throwError(error)));
    }
}
CdcUserAuthenticationTokenService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcUserAuthenticationTokenService, deps: [{ token: i1.HttpClient }, { token: i2.AuthConfigService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcUserAuthenticationTokenService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcUserAuthenticationTokenService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcUserAuthenticationTokenService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.AuthConfigService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLXVzZXItYXV0aGVudGljYXRpb24tdG9rZW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvY2RjL2NvcmUvYXV0aC9zZXJ2aWNlcy91c2VyLWF1dGhlbnRpY2F0aW9uL2NkYy11c2VyLWF1dGhlbnRpY2F0aW9uLXRva2VuLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQWEsTUFBTSxpQkFBaUIsQ0FBQztBQUMvRCxPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUc1QyxNQUFNLE9BQU8saUNBQWlDO0lBQzVDLFlBQ1ksSUFBZ0IsRUFDaEIsaUJBQW9DO1FBRHBDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUM3QyxDQUFDO0lBRUo7Ozs7Ozs7O09BUUc7SUFDSCx3QkFBd0IsQ0FDdEIsR0FBVyxFQUNYLFlBQW9CLEVBQ3BCLGtCQUEwQixFQUMxQixPQUFlLEVBQ2YsUUFBZ0I7UUFFaEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDdEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUU7YUFDNUIsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDdEQsR0FBRyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxFQUFFLENBQUM7YUFDOUQsR0FBRyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUM7YUFDM0IsR0FBRyxDQUFDLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNuQyxHQUFHLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3JELEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2FBQ2pFLEdBQUcsQ0FBQyxVQUFVLEVBQUUsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDNUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBRWpELE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixJQUFJLENBQStDLEdBQUcsRUFBRSxNQUFNLENBQUM7YUFDL0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDOzs4SEFwQ1UsaUNBQWlDO2tJQUFqQyxpQ0FBaUM7MkZBQWpDLGlDQUFpQztrQkFEN0MsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBdXRoQ29uZmlnU2VydmljZSwgQXV0aFRva2VuIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDZGNVc2VyQXV0aGVudGljYXRpb25Ub2tlblNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcm90ZWN0ZWQgYXV0aENvbmZpZ1NlcnZpY2U6IEF1dGhDb25maWdTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogTG9hZCBVc2VyIHRva2VuIHVzaW5nIGN1c3RvbSBvYXV0aCBmbG93XG4gICAqXG4gICAqIEBwYXJhbSBVSUQgLSBVSUQgcmVjZWl2ZWQgZnJvbSBDREMgb24gbG9naW4gZXZlbnRcbiAgICogQHBhcmFtIFVJRFNpZ25hdHVyZSAtIFVJRFNpZ25hdHVyZSByZWNlaXZlZCBmcm9tIENEQyBvbiBsb2dpbiBldmVudFxuICAgKiBAcGFyYW0gc2lnbmF0dXJlVGltZXN0YW1wIC0gc2lnbmF0dXJlVGltZXN0YW1wIHJlY2VpdmVkIGZyb20gQ0RDIG9uIGxvZ2luIGV2ZW50XG4gICAqIEBwYXJhbSBpZFRva2VuIC0gaWRUb2tlbiByZWNlaXZlZCBmcm9tIENEQyBvbiBsb2dpbiBldmVudFxuICAgKiBAcGFyYW0gYmFzZVNpdGUgLSBiYXNlU2l0ZSByZWNlaXZlZCBmcm9tIENEQyBvbiBsb2dpbiBldmVudFxuICAgKi9cbiAgbG9hZFRva2VuVXNpbmdDdXN0b21GbG93KFxuICAgIFVJRDogc3RyaW5nLFxuICAgIFVJRFNpZ25hdHVyZTogc3RyaW5nLFxuICAgIHNpZ25hdHVyZVRpbWVzdGFtcDogc3RyaW5nLFxuICAgIGlkVG9rZW46IHN0cmluZyxcbiAgICBiYXNlU2l0ZTogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8UGFydGlhbDxBdXRoVG9rZW4+ICYgeyBleHBpcmVzX2luPzogbnVtYmVyIH0+IHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmF1dGhDb25maWdTZXJ2aWNlLmdldFRva2VuRW5kcG9pbnQoKTtcbiAgICBjb25zdCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpXG4gICAgICAuc2V0KCdjbGllbnRfaWQnLCB0aGlzLmF1dGhDb25maWdTZXJ2aWNlLmdldENsaWVudElkKCkpXG4gICAgICAuc2V0KCdjbGllbnRfc2VjcmV0JywgdGhpcy5hdXRoQ29uZmlnU2VydmljZS5nZXRDbGllbnRTZWNyZXQoKSlcbiAgICAgIC5zZXQoJ2dyYW50X3R5cGUnLCAnY3VzdG9tJylcbiAgICAgIC5zZXQoJ1VJRCcsIGVuY29kZVVSSUNvbXBvbmVudChVSUQpKVxuICAgICAgLnNldCgnVUlEU2lnbmF0dXJlJywgZW5jb2RlVVJJQ29tcG9uZW50KFVJRFNpZ25hdHVyZSkpXG4gICAgICAuc2V0KCdzaWduYXR1cmVUaW1lc3RhbXAnLCBlbmNvZGVVUklDb21wb25lbnQoc2lnbmF0dXJlVGltZXN0YW1wKSlcbiAgICAgIC5zZXQoJ2lkX3Rva2VuJywgZW5jb2RlVVJJQ29tcG9uZW50KGlkVG9rZW4pKVxuICAgICAgLnNldCgnYmFzZVNpdGUnLCBlbmNvZGVVUklDb21wb25lbnQoYmFzZVNpdGUpKTtcblxuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5wb3N0PFBhcnRpYWw8QXV0aFRva2VuPiAmIHsgZXhwaXJlc19pbj86IG51bWJlciB9Pih1cmwsIHBhcmFtcylcbiAgICAgIC5waXBlKGNhdGNoRXJyb3IoKGVycm9yOiBhbnkpID0+IHRocm93RXJyb3IoZXJyb3IpKSk7XG4gIH1cbn1cbiJdfQ==