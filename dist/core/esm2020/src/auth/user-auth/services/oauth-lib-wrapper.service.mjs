/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { filter, take } from 'rxjs/operators';
import { OAUTH_REDIRECT_FLOW_KEY } from '../utils/index';
import * as i0 from "@angular/core";
import * as i1 from "angular-oauth2-oidc";
import * as i2 from "./auth-config.service";
import * as i3 from "../../../window/window-ref";
/**
 * Wrapper service on the library OAuthService. Normalizes the lib API for services.
 * Use this service when you want to access low level OAuth library methods.
 */
export class OAuthLibWrapperService {
    // TODO: Remove platformId dependency in 4.0
    constructor(oAuthService, authConfigService, platformId, winRef) {
        this.oAuthService = oAuthService;
        this.authConfigService = authConfigService;
        this.platformId = platformId;
        this.winRef = winRef;
        this.events$ = this.oAuthService.events;
        this.initialize();
    }
    initialize() {
        const isSSR = !this.winRef.isBrowser();
        this.oAuthService.configure({
            tokenEndpoint: this.authConfigService.getTokenEndpoint(),
            loginUrl: this.authConfigService.getLoginUrl(),
            clientId: this.authConfigService.getClientId(),
            dummyClientSecret: this.authConfigService.getClientSecret(),
            revocationEndpoint: this.authConfigService.getRevokeEndpoint(),
            logoutUrl: this.authConfigService.getLogoutUrl(),
            userinfoEndpoint: this.authConfigService.getUserinfoEndpoint(),
            issuer: this.authConfigService.getOAuthLibConfig()?.issuer ??
                this.authConfigService.getBaseUrl(),
            redirectUri: this.authConfigService.getOAuthLibConfig()?.redirectUri ??
                (!isSSR
                    ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        this.winRef.nativeWindow.location.origin
                    : ''),
            ...this.authConfigService.getOAuthLibConfig(),
        });
    }
    /**
     * Authorize with ResourceOwnerPasswordFlow.
     *
     * @param userId
     * @param password
     *
     * @return token response from the lib
     */
    authorizeWithPasswordFlow(userId, password) {
        return this.oAuthService.fetchTokenUsingPasswordFlow(userId, password);
    }
    /**
     * Refresh access_token.
     */
    refreshToken() {
        this.oAuthService.refreshToken();
    }
    /**
     * Revoke access tokens and clear tokens in lib state.
     */
    revokeAndLogout() {
        return new Promise((resolve) => {
            this.oAuthService
                .revokeTokenAndLogout(true)
                .catch(() => {
                // when there would be some kind of error during revocation we can't do anything else, so at least we logout user.
                this.oAuthService.logOut(true);
            })
                .finally(() => {
                resolve();
            });
        });
    }
    /**
     * Clear tokens in library state (no revocation).
     */
    logout() {
        this.oAuthService.logOut(true);
    }
    /**
     * Returns Open Id token. Might be empty, when it was not requested with the `responseType` config.
     *
     * @return id token
     */
    getIdToken() {
        return this.oAuthService.getIdToken();
    }
    /**
     * Initialize Implicit Flow or Authorization Code flows with the redirect to OAuth login url.
     */
    initLoginFlow() {
        if (this.winRef.localStorage) {
            this.winRef.localStorage?.setItem(OAUTH_REDIRECT_FLOW_KEY, 'true');
        }
        return this.oAuthService.initLoginFlow();
    }
    /**
     * Tries to login user based on `code` or `token` present in the url.
     *
     * @param result The result returned by `OAuthService.tryLogin()`.
     *
     * @param tokenReceived Whether the event 'token_received' is emitted during `OAuthService.tryLogin()`.
     * We can use this identify that we have returned from an external authorization page to Spartacus).
     * In cases where we don't receive this event, the token has been obtained from storage.
     */
    tryLogin() {
        return new Promise((resolve) => {
            // We use the 'token_received' event to check if we have returned
            // from the auth server.
            let tokenReceivedEvent;
            const subscription = this.events$
                .pipe(filter((event) => event.type === 'token_received'), take(1))
                .subscribe((event) => (tokenReceivedEvent = event));
            this.oAuthService
                .tryLogin({
                // We don't load discovery document, because it doesn't contain revoke endpoint information
                disableOAuth2StateCheck: true,
            })
                .then((result) => {
                resolve({
                    result: result,
                    tokenReceived: !!tokenReceivedEvent,
                });
            })
                .finally(() => {
                subscription.unsubscribe();
            });
        });
    }
}
OAuthLibWrapperService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OAuthLibWrapperService, deps: [{ token: i1.OAuthService }, { token: i2.AuthConfigService }, { token: PLATFORM_ID }, { token: i3.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
OAuthLibWrapperService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OAuthLibWrapperService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OAuthLibWrapperService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.OAuthService }, { type: i2.AuthConfigService }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i3.WindowRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGgtbGliLXdyYXBwZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2F1dGgvdXNlci1hdXRoL3NlcnZpY2VzL29hdXRoLWxpYi13cmFwcGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdoRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzlDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7OztBQUd6RDs7O0dBR0c7QUFJSCxNQUFNLE9BQU8sc0JBQXNCO0lBR2pDLDRDQUE0QztJQUM1QyxZQUNZLFlBQTBCLEVBQzFCLGlCQUFvQyxFQUNmLFVBQWtCLEVBQ3ZDLE1BQWlCO1FBSGpCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDZixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ3ZDLFdBQU0sR0FBTixNQUFNLENBQVc7UUFQN0IsWUFBTyxHQUEyQixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztRQVN6RCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVTLFVBQVU7UUFDbEIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDO1lBQzFCLGFBQWEsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLEVBQUU7WUFDeEQsUUFBUSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUU7WUFDOUMsUUFBUSxFQUFFLElBQUksQ0FB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QyxDQUFDO1lBRXRELElBQUksQ0FBQyxZQUFZO2lCQUNkLFFBQVEsQ0FBQztnQkFDUiwyRkFBMkY7Z0JBQzNGLHVCQUF1QixFQUFFLElBQUk7YUFDOUIsQ0FBQztpQkFDRCxJQUFJLENBQUMsQ0FBQyxNQUFlLEVBQUUsRUFBRTtnQkFDeEIsT0FBTyxDQUFDO29CQUNOLE1BQU0sRUFBRSxNQUFNO29CQUNkLGFBQWEsRUFBRSxDQUFDLENBQUMsa0JBQWtCO2lCQUNwQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUM7aUJBQ0QsT0FBTyxDQUFDLEdBQUcsRUFBRTtnQkFDWixZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O21IQTFJVSxzQkFBc0IsK0VBT3ZCLFdBQVc7dUhBUFYsc0JBQXNCLGNBRnJCLE1BQU07MkZBRVAsc0JBQXNCO2tCQUhsQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBUUksTUFBTTsyQkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT0F1dGhFdmVudCwgT0F1dGhTZXJ2aWNlLCBUb2tlblJlc3BvbnNlIH0gZnJvbSAnYW5ndWxhci1vYXV0aDItb2lkYyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBXaW5kb3dSZWYgfSBmcm9tICcuLi8uLi8uLi93aW5kb3cvd2luZG93LXJlZic7XG5pbXBvcnQgeyBPQXV0aFRyeUxvZ2luUmVzdWx0IH0gZnJvbSAnLi4vbW9kZWxzL29hdXRoLXRyeS1sb2dpbi1yZXNwb25zZSc7XG5pbXBvcnQgeyBPQVVUSF9SRURJUkVDVF9GTE9XX0tFWSB9IGZyb20gJy4uL3V0aWxzL2luZGV4JztcbmltcG9ydCB7IEF1dGhDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoLWNvbmZpZy5zZXJ2aWNlJztcblxuLyoqXG4gKiBXcmFwcGVyIHNlcnZpY2Ugb24gdGhlIGxpYnJhcnkgT0F1dGhTZXJ2aWNlLiBOb3JtYWxpemVzIHRoZSBsaWIgQVBJIGZvciBzZXJ2aWNlcy5cbiAqIFVzZSB0aGlzIHNlcnZpY2Ugd2hlbiB5b3Ugd2FudCB0byBhY2Nlc3MgbG93IGxldmVsIE9BdXRoIGxpYnJhcnkgbWV0aG9kcy5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE9BdXRoTGliV3JhcHBlclNlcnZpY2Uge1xuICBldmVudHMkOiBPYnNlcnZhYmxlPE9BdXRoRXZlbnQ+ID0gdGhpcy5vQXV0aFNlcnZpY2UuZXZlbnRzO1xuXG4gIC8vIFRPRE86IFJlbW92ZSBwbGF0Zm9ybUlkIGRlcGVuZGVuY3kgaW4gNC4wXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBvQXV0aFNlcnZpY2U6IE9BdXRoU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYXV0aENvbmZpZ1NlcnZpY2U6IEF1dGhDb25maWdTZXJ2aWNlLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByb3RlY3RlZCBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgcHJvdGVjdGVkIHdpblJlZjogV2luZG93UmVmXG4gICkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGluaXRpYWxpemUoKSB7XG4gICAgY29uc3QgaXNTU1IgPSAhdGhpcy53aW5SZWYuaXNCcm93c2VyKCk7XG4gICAgdGhpcy5vQXV0aFNlcnZpY2UuY29uZmlndXJlKHtcbiAgICAgIHRva2VuRW5kcG9pbnQ6IHRoaXMuYXV0aENvbmZpZ1NlcnZpY2UuZ2V0VG9rZW5FbmRwb2ludCgpLFxuICAgICAgbG9naW5Vcmw6IHRoaXMuYXV0aENvbmZpZ1NlcnZpY2UuZ2V0TG9naW5VcmwoKSxcbiAgICAgIGNsaWVudElkOiB0aGlzLmF1dGhDb25maWdTZXJ2aWNlLmdldENsaWVudElkKCksXG4gICAgICBkdW1teUNsaWVudFNlY3JldDogdGhpcy5hdXRoQ29uZmlnU2VydmljZS5nZXRDbGllbnRTZWNyZXQoKSxcbiAgICAgIHJldm9jYXRpb25FbmRwb2ludDogdGhpcy5hdXRoQ29uZmlnU2VydmljZS5nZXRSZXZva2VFbmRwb2ludCgpLFxuICAgICAgbG9nb3V0VXJsOiB0aGlzLmF1dGhDb25maWdTZXJ2aWNlLmdldExvZ291dFVybCgpLFxuICAgICAgdXNlcmluZm9FbmRwb2ludDogdGhpcy5hdXRoQ29uZmlnU2VydmljZS5nZXRVc2VyaW5mb0VuZHBvaW50KCksXG4gICAgICBpc3N1ZXI6XG4gICAgICAgIHRoaXMuYXV0aENvbmZpZ1NlcnZpY2UuZ2V0T0F1dGhMaWJDb25maWcoKT8uaXNzdWVyID8/XG4gICAgICAgIHRoaXMuYXV0aENvbmZpZ1NlcnZpY2UuZ2V0QmFzZVVybCgpLFxuICAgICAgcmVkaXJlY3RVcmk6XG4gICAgICAgIHRoaXMuYXV0aENvbmZpZ1NlcnZpY2UuZ2V0T0F1dGhMaWJDb25maWcoKT8ucmVkaXJlY3RVcmkgPz9cbiAgICAgICAgKCFpc1NTUlxuICAgICAgICAgID8gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgIHRoaXMud2luUmVmLm5hdGl2ZVdpbmRvdyEubG9jYXRpb24ub3JpZ2luXG4gICAgICAgICAgOiAnJyksXG4gICAgICAuLi50aGlzLmF1dGhDb25maWdTZXJ2aWNlLmdldE9BdXRoTGliQ29uZmlnKCksXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQXV0aG9yaXplIHdpdGggUmVzb3VyY2VPd25lclBhc3N3b3JkRmxvdy5cbiAgICpcbiAgICogQHBhcmFtIHVzZXJJZFxuICAgKiBAcGFyYW0gcGFzc3dvcmRcbiAgICpcbiAgICogQHJldHVybiB0b2tlbiByZXNwb25zZSBmcm9tIHRoZSBsaWJcbiAgICovXG4gIGF1dGhvcml6ZVdpdGhQYXNzd29yZEZsb3coXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgcGFzc3dvcmQ6IHN0cmluZ1xuICApOiBQcm9taXNlPFRva2VuUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5vQXV0aFNlcnZpY2UuZmV0Y2hUb2tlblVzaW5nUGFzc3dvcmRGbG93KHVzZXJJZCwgcGFzc3dvcmQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZnJlc2ggYWNjZXNzX3Rva2VuLlxuICAgKi9cbiAgcmVmcmVzaFRva2VuKCk6IHZvaWQge1xuICAgIHRoaXMub0F1dGhTZXJ2aWNlLnJlZnJlc2hUb2tlbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldm9rZSBhY2Nlc3MgdG9rZW5zIGFuZCBjbGVhciB0b2tlbnMgaW4gbGliIHN0YXRlLlxuICAgKi9cbiAgcmV2b2tlQW5kTG9nb3V0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5vQXV0aFNlcnZpY2VcbiAgICAgICAgLnJldm9rZVRva2VuQW5kTG9nb3V0KHRydWUpXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgLy8gd2hlbiB0aGVyZSB3b3VsZCBiZSBzb21lIGtpbmQgb2YgZXJyb3IgZHVyaW5nIHJldm9jYXRpb24gd2UgY2FuJ3QgZG8gYW55dGhpbmcgZWxzZSwgc28gYXQgbGVhc3Qgd2UgbG9nb3V0IHVzZXIuXG4gICAgICAgICAgdGhpcy5vQXV0aFNlcnZpY2UubG9nT3V0KHRydWUpO1xuICAgICAgICB9KVxuICAgICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciB0b2tlbnMgaW4gbGlicmFyeSBzdGF0ZSAobm8gcmV2b2NhdGlvbikuXG4gICAqL1xuICBsb2dvdXQoKTogdm9pZCB7XG4gICAgdGhpcy5vQXV0aFNlcnZpY2UubG9nT3V0KHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgT3BlbiBJZCB0b2tlbi4gTWlnaHQgYmUgZW1wdHksIHdoZW4gaXQgd2FzIG5vdCByZXF1ZXN0ZWQgd2l0aCB0aGUgYHJlc3BvbnNlVHlwZWAgY29uZmlnLlxuICAgKlxuICAgKiBAcmV0dXJuIGlkIHRva2VuXG4gICAqL1xuICBnZXRJZFRva2VuKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMub0F1dGhTZXJ2aWNlLmdldElkVG9rZW4oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIEltcGxpY2l0IEZsb3cgb3IgQXV0aG9yaXphdGlvbiBDb2RlIGZsb3dzIHdpdGggdGhlIHJlZGlyZWN0IHRvIE9BdXRoIGxvZ2luIHVybC5cbiAgICovXG4gIGluaXRMb2dpbkZsb3coKSB7XG4gICAgaWYgKHRoaXMud2luUmVmLmxvY2FsU3RvcmFnZSkge1xuICAgICAgdGhpcy53aW5SZWYubG9jYWxTdG9yYWdlPy5zZXRJdGVtKE9BVVRIX1JFRElSRUNUX0ZMT1dfS0VZLCAndHJ1ZScpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm9BdXRoU2VydmljZS5pbml0TG9naW5GbG93KCk7XG4gIH1cblxuICAvKipcbiAgICogVHJpZXMgdG8gbG9naW4gdXNlciBiYXNlZCBvbiBgY29kZWAgb3IgYHRva2VuYCBwcmVzZW50IGluIHRoZSB1cmwuXG4gICAqXG4gICAqIEBwYXJhbSByZXN1bHQgVGhlIHJlc3VsdCByZXR1cm5lZCBieSBgT0F1dGhTZXJ2aWNlLnRyeUxvZ2luKClgLlxuICAgKlxuICAgKiBAcGFyYW0gdG9rZW5SZWNlaXZlZCBXaGV0aGVyIHRoZSBldmVudCAndG9rZW5fcmVjZWl2ZWQnIGlzIGVtaXR0ZWQgZHVyaW5nIGBPQXV0aFNlcnZpY2UudHJ5TG9naW4oKWAuXG4gICAqIFdlIGNhbiB1c2UgdGhpcyBpZGVudGlmeSB0aGF0IHdlIGhhdmUgcmV0dXJuZWQgZnJvbSBhbiBleHRlcm5hbCBhdXRob3JpemF0aW9uIHBhZ2UgdG8gU3BhcnRhY3VzKS5cbiAgICogSW4gY2FzZXMgd2hlcmUgd2UgZG9uJ3QgcmVjZWl2ZSB0aGlzIGV2ZW50LCB0aGUgdG9rZW4gaGFzIGJlZW4gb2J0YWluZWQgZnJvbSBzdG9yYWdlLlxuICAgKi9cbiAgdHJ5TG9naW4oKTogUHJvbWlzZTxPQXV0aFRyeUxvZ2luUmVzdWx0PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAvLyBXZSB1c2UgdGhlICd0b2tlbl9yZWNlaXZlZCcgZXZlbnQgdG8gY2hlY2sgaWYgd2UgaGF2ZSByZXR1cm5lZFxuICAgICAgLy8gZnJvbSB0aGUgYXV0aCBzZXJ2ZXIuXG4gICAgICBsZXQgdG9rZW5SZWNlaXZlZEV2ZW50OiBPQXV0aEV2ZW50IHwgdW5kZWZpbmVkO1xuICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gdGhpcy5ldmVudHMkXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcigoZXZlbnQpID0+IGV2ZW50LnR5cGUgPT09ICd0b2tlbl9yZWNlaXZlZCcpLFxuICAgICAgICAgIHRha2UoMSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4gKHRva2VuUmVjZWl2ZWRFdmVudCA9IGV2ZW50KSk7XG5cbiAgICAgIHRoaXMub0F1dGhTZXJ2aWNlXG4gICAgICAgIC50cnlMb2dpbih7XG4gICAgICAgICAgLy8gV2UgZG9uJ3QgbG9hZCBkaXNjb3ZlcnkgZG9jdW1lbnQsIGJlY2F1c2UgaXQgZG9lc24ndCBjb250YWluIHJldm9rZSBlbmRwb2ludCBpbmZvcm1hdGlvblxuICAgICAgICAgIGRpc2FibGVPQXV0aDJTdGF0ZUNoZWNrOiB0cnVlLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocmVzdWx0OiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICByZXN1bHQ6IHJlc3VsdCxcbiAgICAgICAgICAgIHRva2VuUmVjZWl2ZWQ6ICEhdG9rZW5SZWNlaXZlZEV2ZW50LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=