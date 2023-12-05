/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { OAuthFlow } from '@spartacus/core';
import { EMPTY, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../../../cms-structure/guards/cms-page.guard";
/**
 * Guards the _login_ route.
 *
 * Takes care of routing the user to a auth server login page (if implicit or code flow is used).
 * In case of Resource Owner Password Flow just renders the page as normal CMS page.
 */
export class LoginGuard {
    constructor(authService, authConfigService, cmsPageGuard) {
        this.authService = authService;
        this.authConfigService = authConfigService;
        this.cmsPageGuard = cmsPageGuard;
    }
    canActivate(route, state) {
        return this.authService.isUserLoggedIn().pipe(take(1), switchMap((isUserLoggedIn) => {
            if (this.authConfigService.getOAuthFlow() ===
                OAuthFlow.ResourceOwnerPasswordFlow ||
                isUserLoggedIn) {
                return this.cmsPageGuard.canActivate(route, state);
            }
            else {
                // This method can trigger redirect to OAuth server that's why we don't return anything in this case
                const redirected = this.authService.loginWithRedirect();
                if (!redirected) {
                    return of(false);
                }
                return EMPTY;
            }
        }));
    }
}
LoginGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginGuard, deps: [{ token: i1.AuthService }, { token: i1.AuthConfigService }, { token: i2.CmsPageGuard }], target: i0.ɵɵFactoryTarget.Injectable });
LoginGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.AuthService }, { type: i1.AuthConfigService }, { type: i2.CmsPageGuard }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uZ3VhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1jb21wb25lbnRzL3VzZXIvbG9naW4tcm91dGUvbG9naW4uZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPM0MsT0FBTyxFQUFrQyxTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsS0FBSyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBR2pEOzs7OztHQUtHO0FBSUgsTUFBTSxPQUFPLFVBQVU7SUFDckIsWUFDWSxXQUF3QixFQUN4QixpQkFBb0MsRUFDcEMsWUFBMEI7UUFGMUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUNuQyxDQUFDO0lBRUosV0FBVyxDQUNULEtBQTZCLEVBQzdCLEtBQTBCO1FBRTFCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQzNDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxTQUFTLENBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBRTtZQUMzQixJQUNFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUU7Z0JBQ25DLFNBQVMsQ0FBQyx5QkFBeUI7Z0JBQ3JDLGNBQWMsRUFDZDtnQkFDQSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNwRDtpQkFBTTtnQkFDTCxvR0FBb0c7Z0JBQ3BHLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztnQkFDeEQsSUFBSSxDQUFDLFVBQVUsRUFBRTtvQkFDZixPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDbEI7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7YUFDZDtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDOzt1R0E5QlUsVUFBVTsyR0FBVixVQUFVLGNBRlQsTUFBTTsyRkFFUCxVQUFVO2tCQUh0QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXG4gIENhbkFjdGl2YXRlLFxuICBSb3V0ZXJTdGF0ZVNuYXBzaG90LFxuICBVcmxUcmVlLFxufSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQXV0aENvbmZpZ1NlcnZpY2UsIEF1dGhTZXJ2aWNlLCBPQXV0aEZsb3cgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgRU1QVFksIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDbXNQYWdlR3VhcmQgfSBmcm9tICcuLi8uLi8uLi9jbXMtc3RydWN0dXJlL2d1YXJkcy9jbXMtcGFnZS5ndWFyZCc7XG5cbi8qKlxuICogR3VhcmRzIHRoZSBfbG9naW5fIHJvdXRlLlxuICpcbiAqIFRha2VzIGNhcmUgb2Ygcm91dGluZyB0aGUgdXNlciB0byBhIGF1dGggc2VydmVyIGxvZ2luIHBhZ2UgKGlmIGltcGxpY2l0IG9yIGNvZGUgZmxvdyBpcyB1c2VkKS5cbiAqIEluIGNhc2Ugb2YgUmVzb3VyY2UgT3duZXIgUGFzc3dvcmQgRmxvdyBqdXN0IHJlbmRlcnMgdGhlIHBhZ2UgYXMgbm9ybWFsIENNUyBwYWdlLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTG9naW5HdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYXV0aENvbmZpZ1NlcnZpY2U6IEF1dGhDb25maWdTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjbXNQYWdlR3VhcmQ6IENtc1BhZ2VHdWFyZFxuICApIHt9XG5cbiAgY2FuQWN0aXZhdGUoXG4gICAgcm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXG4gICAgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3RcbiAgKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgVXJsVHJlZT4ge1xuICAgIHJldHVybiB0aGlzLmF1dGhTZXJ2aWNlLmlzVXNlckxvZ2dlZEluKCkucGlwZShcbiAgICAgIHRha2UoMSksXG4gICAgICBzd2l0Y2hNYXAoKGlzVXNlckxvZ2dlZEluKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLmF1dGhDb25maWdTZXJ2aWNlLmdldE9BdXRoRmxvdygpID09PVxuICAgICAgICAgICAgT0F1dGhGbG93LlJlc291cmNlT3duZXJQYXNzd29yZEZsb3cgfHxcbiAgICAgICAgICBpc1VzZXJMb2dnZWRJblxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jbXNQYWdlR3VhcmQuY2FuQWN0aXZhdGUocm91dGUsIHN0YXRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBUaGlzIG1ldGhvZCBjYW4gdHJpZ2dlciByZWRpcmVjdCB0byBPQXV0aCBzZXJ2ZXIgdGhhdCdzIHdoeSB3ZSBkb24ndCByZXR1cm4gYW55dGhpbmcgaW4gdGhpcyBjYXNlXG4gICAgICAgICAgY29uc3QgcmVkaXJlY3RlZCA9IHRoaXMuYXV0aFNlcnZpY2UubG9naW5XaXRoUmVkaXJlY3QoKTtcbiAgICAgICAgICBpZiAoIXJlZGlyZWN0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBvZihmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBFTVBUWTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=