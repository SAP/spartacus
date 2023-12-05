/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { OCC_USER_ID_CURRENT } from '../../../occ/utils/occ-constants';
import { AuthActions } from '../store/actions/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "./user-id.service";
import * as i3 from "../services/oauth-lib-wrapper.service";
import * as i4 from "../services/auth-storage.service";
import * as i5 from "../services/auth-redirect.service";
import * as i6 from "../../../routing/facade/routing.service";
import * as i7 from "../services/auth-multisite-isolation.service";
/**
 * Auth service for normal user authentication.
 * Use to check auth status, login/logout with different OAuth flows.
 */
export class AuthService {
    constructor(store, userIdService, oAuthLibWrapperService, authStorageService, authRedirectService, routingService, authMultisiteIsolationService) {
        this.store = store;
        this.userIdService = userIdService;
        this.oAuthLibWrapperService = oAuthLibWrapperService;
        this.authStorageService = authStorageService;
        this.authRedirectService = authRedirectService;
        this.routingService = routingService;
        this.authMultisiteIsolationService = authMultisiteIsolationService;
        /**
         * Indicates whether the access token is being refreshed
         */
        this.refreshInProgress$ = new BehaviorSubject(false);
        /**
         * Indicates whether the logout is being performed
         */
        this.logoutInProgress$ = new BehaviorSubject(false);
    }
    /**
     * Check params in url and if there is an code/token then try to login with those.
     */
    async checkOAuthParamsInUrl() {
        try {
            const loginResult = await this.oAuthLibWrapperService.tryLogin();
            const token = this.authStorageService.getItem('access_token');
            // We get the value `true` of `result` in the _code flow_ even if we did not log in successfully
            // (see source code https://github.com/manfredsteyer/angular-oauth2-oidc/blob/d95d7da788e2c1390346c66de62dc31f10d2b852/projects/lib/src/oauth-service.ts#L1711),
            // that why we also need to check if we have access_token
            if (loginResult.result && token) {
                this.userIdService.setUserId(OCC_USER_ID_CURRENT);
                this.store.dispatch(new AuthActions.Login());
                // We check if the token was received during the `tryLogin()` attempt.
                // If so, we will redirect as we can deduce we are returning from the authentication server.
                // Redirection should not be done in cases we get the token from storage (eg. refreshing the page).
                if (loginResult.tokenReceived) {
                    this.authRedirectService.redirect();
                }
            }
        }
        catch { }
    }
    /**
     * Initialize Implicit/Authorization Code flow by redirecting to OAuth server.
     */
    loginWithRedirect() {
        this.oAuthLibWrapperService.initLoginFlow();
        return true;
    }
    /**
     * Loads a new user token with Resource Owner Password Flow.
     * @param userId
     * @param password
     */
    async loginWithCredentials(userId, password) {
        let uid = userId;
        if (this.authMultisiteIsolationService) {
            uid = await this.authMultisiteIsolationService
                .decorateUserId(uid)
                .toPromise();
        }
        try {
            await this.oAuthLibWrapperService.authorizeWithPasswordFlow(uid, password);
            // OCC specific user id handling. Customize when implementing different backend
            this.userIdService.setUserId(OCC_USER_ID_CURRENT);
            this.store.dispatch(new AuthActions.Login());
            this.authRedirectService.redirect();
        }
        catch { }
    }
    /**
     * Revokes tokens and clears state for logged user (tokens, userId).
     * To perform logout it is best to use `logout` method. Use this method with caution.
     */
    coreLogout() {
        this.setLogoutProgress(true);
        this.userIdService.clearUserId();
        return new Promise((resolve) => {
            this.oAuthLibWrapperService.revokeAndLogout().finally(() => {
                this.store.dispatch(new AuthActions.Logout());
                this.setLogoutProgress(false);
                resolve();
            });
        });
    }
    /**
     * Returns `true` if the user is logged in; and `false` if the user is anonymous.
     */
    isUserLoggedIn() {
        return this.authStorageService.getToken().pipe(map((userToken) => Boolean(userToken?.access_token)), distinctUntilChanged());
    }
    /**
     * Logout a storefront customer. It will initialize logout procedure by redirecting to the `logout` endpoint.
     */
    logout() {
        this.routingService.go({ cxRoute: 'logout' });
    }
    /**
     * Start or stop the refresh process
     */
    setRefreshProgress(progress) {
        this.refreshInProgress$.next(progress);
    }
    /**
     * Start or stop the logout process
     */
    setLogoutProgress(progress) {
        this.logoutInProgress$.next(progress);
    }
}
AuthService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthService, deps: [{ token: i1.Store }, { token: i2.UserIdService }, { token: i3.OAuthLibWrapperService }, { token: i4.AuthStorageService }, { token: i5.AuthRedirectService }, { token: i6.RoutingService }, { token: i7.AuthMultisiteIsolationService }], target: i0.ɵɵFactoryTarget.Injectable });
AuthService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.UserIdService }, { type: i3.OAuthLibWrapperService }, { type: i4.AuthStorageService }, { type: i5.AuthRedirectService }, { type: i6.RoutingService }, { type: i7.AuthMultisiteIsolationService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvYXV0aC91c2VyLWF1dGgvZmFjYWRlL2F1dGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQVF2RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7Ozs7OztBQUdyRDs7O0dBR0c7QUFJSCxNQUFNLE9BQU8sV0FBVztJQVd0QixZQUNZLEtBQWlDLEVBQ2pDLGFBQTRCLEVBQzVCLHNCQUE4QyxFQUM5QyxrQkFBc0MsRUFDdEMsbUJBQXdDLEVBQ3hDLGNBQThCLEVBQzlCLDZCQUE2RDtRQU43RCxVQUFLLEdBQUwsS0FBSyxDQUE0QjtRQUNqQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQzlDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsa0NBQTZCLEdBQTdCLDZCQUE2QixDQUFnQztRQWpCekU7O1dBRUc7UUFDSCx1QkFBa0IsR0FBd0IsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7UUFFOUU7O1dBRUc7UUFDSCxzQkFBaUIsR0FBd0IsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFVMUUsQ0FBQztJQUVKOztPQUVHO0lBQ0gsS0FB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O0lBQ2hELENBQUM7SUFFRDs7T0FFRztJQUNILGtCQUFrQixDQUFDLFFBQWlCO1FBQ2pDLElBQUksQ0FBQyxrQkFBK0MsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVEOztPQUVHO0lBQ0gsaUJBQWlCLENBQUMsUUFBaUI7UUFDaEMsSUFBSSxDQUFDLGlCQUE4QyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0RSxDQUFDOzt3R0FsSVUsV0FBVzs0R0FBWCxXQUFXLGNBRlYsTUFBTTsyRkFFUCxXQUFXO2tCQUh2QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT0NDX1VTRVJfSURfQ1VSUkVOVCB9IGZyb20gJy4uLy4uLy4uL29jYy91dGlscy9vY2MtY29uc3RhbnRzJztcbmltcG9ydCB7IFJvdXRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vcm91dGluZy9mYWNhZGUvcm91dGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IFN0YXRlV2l0aENsaWVudEF1dGggfSBmcm9tICcuLi8uLi9jbGllbnQtYXV0aC9zdG9yZS9jbGllbnQtYXV0aC1zdGF0ZSc7XG5pbXBvcnQgeyBPQXV0aFRyeUxvZ2luUmVzdWx0IH0gZnJvbSAnLi4vbW9kZWxzL29hdXRoLXRyeS1sb2dpbi1yZXNwb25zZSc7XG5pbXBvcnQgeyBBdXRoTXVsdGlzaXRlSXNvbGF0aW9uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2F1dGgtbXVsdGlzaXRlLWlzb2xhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhSZWRpcmVjdFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRoLXJlZGlyZWN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYXV0aC1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgT0F1dGhMaWJXcmFwcGVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL29hdXRoLWxpYi13cmFwcGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aEFjdGlvbnMgfSBmcm9tICcuLi9zdG9yZS9hY3Rpb25zL2luZGV4JztcbmltcG9ydCB7IFVzZXJJZFNlcnZpY2UgfSBmcm9tICcuL3VzZXItaWQuc2VydmljZSc7XG5cbi8qKlxuICogQXV0aCBzZXJ2aWNlIGZvciBub3JtYWwgdXNlciBhdXRoZW50aWNhdGlvbi5cbiAqIFVzZSB0byBjaGVjayBhdXRoIHN0YXR1cywgbG9naW4vbG9nb3V0IHdpdGggZGlmZmVyZW50IE9BdXRoIGZsb3dzLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGFjY2VzcyB0b2tlbiBpcyBiZWluZyByZWZyZXNoZWRcbiAgICovXG4gIHJlZnJlc2hJblByb2dyZXNzJDogT2JzZXJ2YWJsZTxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgbG9nb3V0IGlzIGJlaW5nIHBlcmZvcm1lZFxuICAgKi9cbiAgbG9nb3V0SW5Qcm9ncmVzcyQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc3RvcmU6IFN0b3JlPFN0YXRlV2l0aENsaWVudEF1dGg+LFxuICAgIHByb3RlY3RlZCB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBvQXV0aExpYldyYXBwZXJTZXJ2aWNlOiBPQXV0aExpYldyYXBwZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhdXRoU3RvcmFnZVNlcnZpY2U6IEF1dGhTdG9yYWdlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYXV0aFJlZGlyZWN0U2VydmljZTogQXV0aFJlZGlyZWN0U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhdXRoTXVsdGlzaXRlSXNvbGF0aW9uU2VydmljZT86IEF1dGhNdWx0aXNpdGVJc29sYXRpb25TZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogQ2hlY2sgcGFyYW1zIGluIHVybCBhbmQgaWYgdGhlcmUgaXMgYW4gY29kZS90b2tlbiB0aGVuIHRyeSB0byBsb2dpbiB3aXRoIHRob3NlLlxuICAgKi9cbiAgYXN5bmMgY2hlY2tPQXV0aFBhcmFtc0luVXJsKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBsb2dpblJlc3VsdDogT0F1dGhUcnlMb2dpblJlc3VsdCA9XG4gICAgICAgIGF3YWl0IHRoaXMub0F1dGhMaWJXcmFwcGVyU2VydmljZS50cnlMb2dpbigpO1xuXG4gICAgICBjb25zdCB0b2tlbiA9IHRoaXMuYXV0aFN0b3JhZ2VTZXJ2aWNlLmdldEl0ZW0oJ2FjY2Vzc190b2tlbicpO1xuXG4gICAgICAvLyBXZSBnZXQgdGhlIHZhbHVlIGB0cnVlYCBvZiBgcmVzdWx0YCBpbiB0aGUgX2NvZGUgZmxvd18gZXZlbiBpZiB3ZSBkaWQgbm90IGxvZyBpbiBzdWNjZXNzZnVsbHlcbiAgICAgIC8vIChzZWUgc291cmNlIGNvZGUgaHR0cHM6Ly9naXRodWIuY29tL21hbmZyZWRzdGV5ZXIvYW5ndWxhci1vYXV0aDItb2lkYy9ibG9iL2Q5NWQ3ZGE3ODhlMmMxMzkwMzQ2YzY2ZGU2MmRjMzFmMTBkMmI4NTIvcHJvamVjdHMvbGliL3NyYy9vYXV0aC1zZXJ2aWNlLnRzI0wxNzExKSxcbiAgICAgIC8vIHRoYXQgd2h5IHdlIGFsc28gbmVlZCB0byBjaGVjayBpZiB3ZSBoYXZlIGFjY2Vzc190b2tlblxuICAgICAgaWYgKGxvZ2luUmVzdWx0LnJlc3VsdCAmJiB0b2tlbikge1xuICAgICAgICB0aGlzLnVzZXJJZFNlcnZpY2Uuc2V0VXNlcklkKE9DQ19VU0VSX0lEX0NVUlJFTlQpO1xuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBdXRoQWN0aW9ucy5Mb2dpbigpKTtcblxuICAgICAgICAvLyBXZSBjaGVjayBpZiB0aGUgdG9rZW4gd2FzIHJlY2VpdmVkIGR1cmluZyB0aGUgYHRyeUxvZ2luKClgIGF0dGVtcHQuXG4gICAgICAgIC8vIElmIHNvLCB3ZSB3aWxsIHJlZGlyZWN0IGFzIHdlIGNhbiBkZWR1Y2Ugd2UgYXJlIHJldHVybmluZyBmcm9tIHRoZSBhdXRoZW50aWNhdGlvbiBzZXJ2ZXIuXG4gICAgICAgIC8vIFJlZGlyZWN0aW9uIHNob3VsZCBub3QgYmUgZG9uZSBpbiBjYXNlcyB3ZSBnZXQgdGhlIHRva2VuIGZyb20gc3RvcmFnZSAoZWcuIHJlZnJlc2hpbmcgdGhlIHBhZ2UpLlxuICAgICAgICBpZiAobG9naW5SZXN1bHQudG9rZW5SZWNlaXZlZCkge1xuICAgICAgICAgIHRoaXMuYXV0aFJlZGlyZWN0U2VydmljZS5yZWRpcmVjdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCB7fVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgSW1wbGljaXQvQXV0aG9yaXphdGlvbiBDb2RlIGZsb3cgYnkgcmVkaXJlY3RpbmcgdG8gT0F1dGggc2VydmVyLlxuICAgKi9cbiAgbG9naW5XaXRoUmVkaXJlY3QoKTogYm9vbGVhbiB7XG4gICAgdGhpcy5vQXV0aExpYldyYXBwZXJTZXJ2aWNlLmluaXRMb2dpbkZsb3coKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyBhIG5ldyB1c2VyIHRva2VuIHdpdGggUmVzb3VyY2UgT3duZXIgUGFzc3dvcmQgRmxvdy5cbiAgICogQHBhcmFtIHVzZXJJZFxuICAgKiBAcGFyYW0gcGFzc3dvcmRcbiAgICovXG4gIGFzeW5jIGxvZ2luV2l0aENyZWRlbnRpYWxzKHVzZXJJZDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHVpZCA9IHVzZXJJZDtcblxuICAgIGlmICh0aGlzLmF1dGhNdWx0aXNpdGVJc29sYXRpb25TZXJ2aWNlKSB7XG4gICAgICB1aWQgPSBhd2FpdCB0aGlzLmF1dGhNdWx0aXNpdGVJc29sYXRpb25TZXJ2aWNlXG4gICAgICAgIC5kZWNvcmF0ZVVzZXJJZCh1aWQpXG4gICAgICAgIC50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5vQXV0aExpYldyYXBwZXJTZXJ2aWNlLmF1dGhvcml6ZVdpdGhQYXNzd29yZEZsb3coXG4gICAgICAgIHVpZCxcbiAgICAgICAgcGFzc3dvcmRcbiAgICAgICk7XG5cbiAgICAgIC8vIE9DQyBzcGVjaWZpYyB1c2VyIGlkIGhhbmRsaW5nLiBDdXN0b21pemUgd2hlbiBpbXBsZW1lbnRpbmcgZGlmZmVyZW50IGJhY2tlbmRcbiAgICAgIHRoaXMudXNlcklkU2VydmljZS5zZXRVc2VySWQoT0NDX1VTRVJfSURfQ1VSUkVOVCk7XG5cbiAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEF1dGhBY3Rpb25zLkxvZ2luKCkpO1xuXG4gICAgICB0aGlzLmF1dGhSZWRpcmVjdFNlcnZpY2UucmVkaXJlY3QoKTtcbiAgICB9IGNhdGNoIHt9XG4gIH1cblxuICAvKipcbiAgICogUmV2b2tlcyB0b2tlbnMgYW5kIGNsZWFycyBzdGF0ZSBmb3IgbG9nZ2VkIHVzZXIgKHRva2VucywgdXNlcklkKS5cbiAgICogVG8gcGVyZm9ybSBsb2dvdXQgaXQgaXMgYmVzdCB0byB1c2UgYGxvZ291dGAgbWV0aG9kLiBVc2UgdGhpcyBtZXRob2Qgd2l0aCBjYXV0aW9uLlxuICAgKi9cbiAgY29yZUxvZ291dCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLnNldExvZ291dFByb2dyZXNzKHRydWUpO1xuICAgIHRoaXMudXNlcklkU2VydmljZS5jbGVhclVzZXJJZCgpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5vQXV0aExpYldyYXBwZXJTZXJ2aWNlLnJldm9rZUFuZExvZ291dCgpLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBdXRoQWN0aW9ucy5Mb2dvdXQoKSk7XG4gICAgICAgIHRoaXMuc2V0TG9nb3V0UHJvZ3Jlc3MoZmFsc2UpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdXNlciBpcyBsb2dnZWQgaW47IGFuZCBgZmFsc2VgIGlmIHRoZSB1c2VyIGlzIGFub255bW91cy5cbiAgICovXG4gIGlzVXNlckxvZ2dlZEluKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmF1dGhTdG9yYWdlU2VydmljZS5nZXRUb2tlbigpLnBpcGUoXG4gICAgICBtYXAoKHVzZXJUb2tlbikgPT4gQm9vbGVhbih1c2VyVG9rZW4/LmFjY2Vzc190b2tlbikpLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogTG9nb3V0IGEgc3RvcmVmcm9udCBjdXN0b21lci4gSXQgd2lsbCBpbml0aWFsaXplIGxvZ291dCBwcm9jZWR1cmUgYnkgcmVkaXJlY3RpbmcgdG8gdGhlIGBsb2dvdXRgIGVuZHBvaW50LlxuICAgKi9cbiAgbG9nb3V0KCk6IHZvaWQge1xuICAgIHRoaXMucm91dGluZ1NlcnZpY2UuZ28oeyBjeFJvdXRlOiAnbG9nb3V0JyB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydCBvciBzdG9wIHRoZSByZWZyZXNoIHByb2Nlc3NcbiAgICovXG4gIHNldFJlZnJlc2hQcm9ncmVzcyhwcm9ncmVzczogYm9vbGVhbik6IHZvaWQge1xuICAgICh0aGlzLnJlZnJlc2hJblByb2dyZXNzJCBhcyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4pLm5leHQocHJvZ3Jlc3MpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0IG9yIHN0b3AgdGhlIGxvZ291dCBwcm9jZXNzXG4gICAqL1xuICBzZXRMb2dvdXRQcm9ncmVzcyhwcm9ncmVzczogYm9vbGVhbik6IHZvaWQge1xuICAgICh0aGlzLmxvZ291dEluUHJvZ3Jlc3MkIGFzIEJlaGF2aW9yU3ViamVjdDxib29sZWFuPikubmV4dChwcm9ncmVzcyk7XG4gIH1cbn1cbiJdfQ==