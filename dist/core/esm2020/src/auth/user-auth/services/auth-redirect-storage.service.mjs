/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Service serves storage role for AuthRedirectService.
 * Used by AuthStatePersistenceService to store redirect url for OAuth flows that rely on redirects.
 */
export class AuthRedirectStorageService {
    constructor() {
        this.redirectUrl$ = new BehaviorSubject(undefined);
        // Intentional empty constructor
    }
    /**
     * Get redirect url after logging in.
     *
     * @returns observable with the redirect url as string
     */
    getRedirectUrl() {
        return this.redirectUrl$;
    }
    /**
     * Set url to redirect to after login.
     *
     * @param redirectUrl
     */
    setRedirectUrl(redirectUrl) {
        this.redirectUrl$.next(redirectUrl);
    }
}
AuthRedirectStorageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthRedirectStorageService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AuthRedirectStorageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthRedirectStorageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthRedirectStorageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1yZWRpcmVjdC1zdG9yYWdlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9hdXRoL3VzZXItYXV0aC9zZXJ2aWNlcy9hdXRoLXJlZGlyZWN0LXN0b3JhZ2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDOztBQUVuRDs7O0dBR0c7QUFJSCxNQUFNLE9BQU8sMEJBQTBCO0lBQ3JDO1FBSVEsaUJBQVksR0FBbUMsSUFBSSxlQUFlLENBRXhFLFNBQVMsQ0FBQyxDQUFDO1FBTFgsZ0NBQWdDO0lBQ2xDLENBQUM7SUFNRDs7OztPQUlHO0lBQ0gsY0FBYztRQUNaLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGNBQWMsQ0FBQyxXQUErQjtRQUMzQyxJQUFJLENBQUMsWUFBb0QsQ0FBQyxJQUFJLENBQzdELFdBQVcsQ0FDWixDQUFDO0lBQ0osQ0FBQzs7dUhBM0JVLDBCQUEwQjsySEFBMUIsMEJBQTBCLGNBRnpCLE1BQU07MkZBRVAsMEJBQTBCO2tCQUh0QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqIFNlcnZpY2Ugc2VydmVzIHN0b3JhZ2Ugcm9sZSBmb3IgQXV0aFJlZGlyZWN0U2VydmljZS5cbiAqIFVzZWQgYnkgQXV0aFN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlIHRvIHN0b3JlIHJlZGlyZWN0IHVybCBmb3IgT0F1dGggZmxvd3MgdGhhdCByZWx5IG9uIHJlZGlyZWN0cy5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEF1dGhSZWRpcmVjdFN0b3JhZ2VTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gSW50ZW50aW9uYWwgZW1wdHkgY29uc3RydWN0b3JcbiAgfVxuXG4gIHByaXZhdGUgcmVkaXJlY3RVcmwkOiBPYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFxuICAgIHN0cmluZyB8IHVuZGVmaW5lZFxuICA+KHVuZGVmaW5lZCk7XG5cbiAgLyoqXG4gICAqIEdldCByZWRpcmVjdCB1cmwgYWZ0ZXIgbG9nZ2luZyBpbi5cbiAgICpcbiAgICogQHJldHVybnMgb2JzZXJ2YWJsZSB3aXRoIHRoZSByZWRpcmVjdCB1cmwgYXMgc3RyaW5nXG4gICAqL1xuICBnZXRSZWRpcmVjdFVybCgpOiBPYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLnJlZGlyZWN0VXJsJDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdXJsIHRvIHJlZGlyZWN0IHRvIGFmdGVyIGxvZ2luLlxuICAgKlxuICAgKiBAcGFyYW0gcmVkaXJlY3RVcmxcbiAgICovXG4gIHNldFJlZGlyZWN0VXJsKHJlZGlyZWN0VXJsOiBzdHJpbmcgfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICAodGhpcy5yZWRpcmVjdFVybCQgYXMgQmVoYXZpb3JTdWJqZWN0PHN0cmluZyB8IHVuZGVmaW5lZD4pLm5leHQoXG4gICAgICByZWRpcmVjdFVybFxuICAgICk7XG4gIH1cbn1cbiJdfQ==