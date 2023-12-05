/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { OAuthFlow } from '../models/oauth-flow';
import * as i0 from "@angular/core";
import * as i1 from "../config/auth-config";
import * as i2 from "../../../occ/config/occ-config";
/**
 * Utility service on top of the authorization config.
 * Provides handy defaults, when not everything is set in the configuration.
 * Use this service instead of direct configuration.
 */
export class AuthConfigService {
    constructor(authConfig, occConfig) {
        this.authConfig = authConfig;
        this.occConfig = occConfig;
    }
    /**
     * Utility to make access to authentication config easier.
     */
    get config() {
        return this.authConfig?.authentication ?? {};
    }
    /**
     * Get client_id
     *
     * @return client_id
     */
    getClientId() {
        return this.config?.client_id ?? '';
    }
    /**
     * Get client_secret. OAuth server shouldn't require it from web apps (but Hybris OAuth server requires).
     *
     * @return client_secret
     */
    getClientSecret() {
        return this.config?.client_secret ?? '';
    }
    /**
     * Returns base url of the authorization server
     */
    getBaseUrl() {
        return (this.config?.baseUrl ??
            (this.occConfig?.backend?.occ?.baseUrl ?? '') + '/authorizationserver');
    }
    /**
     * Returns endpoint for getting the auth token
     */
    getTokenEndpoint() {
        const tokenEndpoint = this.config?.tokenEndpoint ?? '';
        return this.prefixEndpoint(tokenEndpoint);
    }
    /**
     * Returns url for redirect to the authorization server to get token/code
     */
    getLoginUrl() {
        const loginUrl = this.config?.loginUrl ?? '';
        return this.prefixEndpoint(loginUrl);
    }
    /**
     * Returns endpoint for token revocation (both access and refresh token).
     */
    getRevokeEndpoint() {
        const revokeEndpoint = this.config?.revokeEndpoint ?? '';
        return this.prefixEndpoint(revokeEndpoint);
    }
    /**
     * Returns logout url to redirect to on logout.
     */
    getLogoutUrl() {
        const logoutUrl = this.config?.logoutUrl ?? '';
        return this.prefixEndpoint(logoutUrl);
    }
    /**
     * Returns userinfo endpoint of the OAuth server.
     */
    getUserinfoEndpoint() {
        const userinfoEndpoint = this.config?.userinfoEndpoint ?? '';
        return this.prefixEndpoint(userinfoEndpoint);
    }
    /**
     * Returns configuration specific for the angular-oauth2-oidc library.
     */
    getOAuthLibConfig() {
        return this.config?.OAuthLibConfig ?? {};
    }
    prefixEndpoint(endpoint) {
        let url = endpoint;
        if (!url.startsWith('/')) {
            url = '/' + url;
        }
        return `${this.getBaseUrl()}${url}`;
    }
    /**
     * Returns the type of the OAuth flow based on auth config.
     * Use when you have to perform particular action only in some of the OAuth flow scenarios.
     */
    getOAuthFlow() {
        const responseType = this.config?.OAuthLibConfig?.responseType;
        if (responseType) {
            const types = responseType.split(' ');
            if (types.includes('code')) {
                return OAuthFlow.AuthorizationCode;
            }
            else if (types.includes('token')) {
                return OAuthFlow.ImplicitFlow;
            }
            else {
                return OAuthFlow.ResourceOwnerPasswordFlow;
            }
        }
        return OAuthFlow.ResourceOwnerPasswordFlow;
    }
}
AuthConfigService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthConfigService, deps: [{ token: i1.AuthConfig }, { token: i2.OccConfig }], target: i0.ɵɵFactoryTarget.Injectable });
AuthConfigService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthConfigService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthConfigService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.AuthConfig }, { type: i2.OccConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1jb25maWcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2F1dGgvdXNlci1hdXRoL3NlcnZpY2VzL2F1dGgtY29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7O0FBRWpEOzs7O0dBSUc7QUFJSCxNQUFNLE9BQU8saUJBQWlCO0lBQzVCLFlBQ1ksVUFBc0IsRUFDdEIsU0FBb0I7UUFEcEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixjQUFTLEdBQVQsU0FBUyxDQUFXO0lBQzdCLENBQUM7SUFFSjs7T0FFRztJQUNILElBQVksTUFBTTtRQUNoQixPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsY0FBYyxJQUFJLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFdBQVc7UUFDaEIsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsSUFBSSxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxlQUFlO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxhQUFhLElBQUksRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRDs7T0FFRztJQUNJLFVBQVU7UUFDZixPQUFPLENBQ0wsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPO1lBQ3BCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQUMsR0FBRyxzQkFBc0IsQ0FDdkUsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNJLGdCQUFnQjtRQUNyQixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLGFBQWEsSUFBSSxFQUFFLENBQUM7UUFDdkQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRDs7T0FFRztJQUNJLFdBQVc7UUFDaEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLElBQUksRUFBRSxDQUFDO1FBQzdDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxpQkFBaUI7UUFDdEIsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxjQUFjLElBQUksRUFBRSxDQUFDO1FBQ3pELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxZQUFZO1FBQ2pCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUMvQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksbUJBQW1CO1FBQ3hCLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsSUFBSSxFQUFFLENBQUM7UUFDN0QsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVEOztPQUVHO0lBQ0ksaUJBQWlCO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxjQUFjLElBQUksRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFUyxjQUFjLENBQUMsUUFBZ0I7UUFDdkMsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDO1FBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3hCLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1NBQ2pCO1FBQ0QsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksWUFBWTtRQUNqQixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLGNBQWMsRUFBRSxZQUFZLENBQUM7UUFDL0QsSUFBSSxZQUFZLEVBQUU7WUFDaEIsTUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQzFCLE9BQU8sU0FBUyxDQUFDLGlCQUFpQixDQUFDO2FBQ3BDO2lCQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDbEMsT0FBTyxTQUFTLENBQUMsWUFBWSxDQUFDO2FBQy9CO2lCQUFNO2dCQUNMLE9BQU8sU0FBUyxDQUFDLHlCQUF5QixDQUFDO2FBQzVDO1NBQ0Y7UUFDRCxPQUFPLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQztJQUM3QyxDQUFDOzs4R0FqSFUsaUJBQWlCO2tIQUFqQixpQkFBaUIsY0FGaEIsTUFBTTsyRkFFUCxpQkFBaUI7a0JBSDdCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2NjQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vb2NjL2NvbmZpZy9vY2MtY29uZmlnJztcbmltcG9ydCB7IEF1dGhDb25maWcsIEF1dGhMaWJDb25maWcgfSBmcm9tICcuLi9jb25maWcvYXV0aC1jb25maWcnO1xuaW1wb3J0IHsgT0F1dGhGbG93IH0gZnJvbSAnLi4vbW9kZWxzL29hdXRoLWZsb3cnO1xuXG4vKipcbiAqIFV0aWxpdHkgc2VydmljZSBvbiB0b3Agb2YgdGhlIGF1dGhvcml6YXRpb24gY29uZmlnLlxuICogUHJvdmlkZXMgaGFuZHkgZGVmYXVsdHMsIHdoZW4gbm90IGV2ZXJ5dGhpbmcgaXMgc2V0IGluIHRoZSBjb25maWd1cmF0aW9uLlxuICogVXNlIHRoaXMgc2VydmljZSBpbnN0ZWFkIG9mIGRpcmVjdCBjb25maWd1cmF0aW9uLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQXV0aENvbmZpZ1NlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYXV0aENvbmZpZzogQXV0aENvbmZpZyxcbiAgICBwcm90ZWN0ZWQgb2NjQ29uZmlnOiBPY2NDb25maWdcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBVdGlsaXR5IHRvIG1ha2UgYWNjZXNzIHRvIGF1dGhlbnRpY2F0aW9uIGNvbmZpZyBlYXNpZXIuXG4gICAqL1xuICBwcml2YXRlIGdldCBjb25maWcoKTogQXV0aENvbmZpZ1snYXV0aGVudGljYXRpb24nXSB7XG4gICAgcmV0dXJuIHRoaXMuYXV0aENvbmZpZz8uYXV0aGVudGljYXRpb24gPz8ge307XG4gIH1cblxuICAvKipcbiAgICogR2V0IGNsaWVudF9pZFxuICAgKlxuICAgKiBAcmV0dXJuIGNsaWVudF9pZFxuICAgKi9cbiAgcHVibGljIGdldENsaWVudElkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnPy5jbGllbnRfaWQgPz8gJyc7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGNsaWVudF9zZWNyZXQuIE9BdXRoIHNlcnZlciBzaG91bGRuJ3QgcmVxdWlyZSBpdCBmcm9tIHdlYiBhcHBzIChidXQgSHlicmlzIE9BdXRoIHNlcnZlciByZXF1aXJlcykuXG4gICAqXG4gICAqIEByZXR1cm4gY2xpZW50X3NlY3JldFxuICAgKi9cbiAgcHVibGljIGdldENsaWVudFNlY3JldCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZz8uY2xpZW50X3NlY3JldCA/PyAnJztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGJhc2UgdXJsIG9mIHRoZSBhdXRob3JpemF0aW9uIHNlcnZlclxuICAgKi9cbiAgcHVibGljIGdldEJhc2VVcmwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5jb25maWc/LmJhc2VVcmwgPz9cbiAgICAgICh0aGlzLm9jY0NvbmZpZz8uYmFja2VuZD8ub2NjPy5iYXNlVXJsID8/ICcnKSArICcvYXV0aG9yaXphdGlvbnNlcnZlcidcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgZW5kcG9pbnQgZm9yIGdldHRpbmcgdGhlIGF1dGggdG9rZW5cbiAgICovXG4gIHB1YmxpYyBnZXRUb2tlbkVuZHBvaW50KCk6IHN0cmluZyB7XG4gICAgY29uc3QgdG9rZW5FbmRwb2ludCA9IHRoaXMuY29uZmlnPy50b2tlbkVuZHBvaW50ID8/ICcnO1xuICAgIHJldHVybiB0aGlzLnByZWZpeEVuZHBvaW50KHRva2VuRW5kcG9pbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdXJsIGZvciByZWRpcmVjdCB0byB0aGUgYXV0aG9yaXphdGlvbiBzZXJ2ZXIgdG8gZ2V0IHRva2VuL2NvZGVcbiAgICovXG4gIHB1YmxpYyBnZXRMb2dpblVybCgpOiBzdHJpbmcge1xuICAgIGNvbnN0IGxvZ2luVXJsID0gdGhpcy5jb25maWc/LmxvZ2luVXJsID8/ICcnO1xuICAgIHJldHVybiB0aGlzLnByZWZpeEVuZHBvaW50KGxvZ2luVXJsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGVuZHBvaW50IGZvciB0b2tlbiByZXZvY2F0aW9uIChib3RoIGFjY2VzcyBhbmQgcmVmcmVzaCB0b2tlbikuXG4gICAqL1xuICBwdWJsaWMgZ2V0UmV2b2tlRW5kcG9pbnQoKTogc3RyaW5nIHtcbiAgICBjb25zdCByZXZva2VFbmRwb2ludCA9IHRoaXMuY29uZmlnPy5yZXZva2VFbmRwb2ludCA/PyAnJztcbiAgICByZXR1cm4gdGhpcy5wcmVmaXhFbmRwb2ludChyZXZva2VFbmRwb2ludCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBsb2dvdXQgdXJsIHRvIHJlZGlyZWN0IHRvIG9uIGxvZ291dC5cbiAgICovXG4gIHB1YmxpYyBnZXRMb2dvdXRVcmwoKTogc3RyaW5nIHtcbiAgICBjb25zdCBsb2dvdXRVcmwgPSB0aGlzLmNvbmZpZz8ubG9nb3V0VXJsID8/ICcnO1xuICAgIHJldHVybiB0aGlzLnByZWZpeEVuZHBvaW50KGxvZ291dFVybCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB1c2VyaW5mbyBlbmRwb2ludCBvZiB0aGUgT0F1dGggc2VydmVyLlxuICAgKi9cbiAgcHVibGljIGdldFVzZXJpbmZvRW5kcG9pbnQoKTogc3RyaW5nIHtcbiAgICBjb25zdCB1c2VyaW5mb0VuZHBvaW50ID0gdGhpcy5jb25maWc/LnVzZXJpbmZvRW5kcG9pbnQgPz8gJyc7XG4gICAgcmV0dXJuIHRoaXMucHJlZml4RW5kcG9pbnQodXNlcmluZm9FbmRwb2ludCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBjb25maWd1cmF0aW9uIHNwZWNpZmljIGZvciB0aGUgYW5ndWxhci1vYXV0aDItb2lkYyBsaWJyYXJ5LlxuICAgKi9cbiAgcHVibGljIGdldE9BdXRoTGliQ29uZmlnKCk6IEF1dGhMaWJDb25maWcge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZz8uT0F1dGhMaWJDb25maWcgPz8ge307XG4gIH1cblxuICBwcm90ZWN0ZWQgcHJlZml4RW5kcG9pbnQoZW5kcG9pbnQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IHVybCA9IGVuZHBvaW50O1xuICAgIGlmICghdXJsLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgdXJsID0gJy8nICsgdXJsO1xuICAgIH1cbiAgICByZXR1cm4gYCR7dGhpcy5nZXRCYXNlVXJsKCl9JHt1cmx9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB0eXBlIG9mIHRoZSBPQXV0aCBmbG93IGJhc2VkIG9uIGF1dGggY29uZmlnLlxuICAgKiBVc2Ugd2hlbiB5b3UgaGF2ZSB0byBwZXJmb3JtIHBhcnRpY3VsYXIgYWN0aW9uIG9ubHkgaW4gc29tZSBvZiB0aGUgT0F1dGggZmxvdyBzY2VuYXJpb3MuXG4gICAqL1xuICBwdWJsaWMgZ2V0T0F1dGhGbG93KCk6IE9BdXRoRmxvdyB7XG4gICAgY29uc3QgcmVzcG9uc2VUeXBlID0gdGhpcy5jb25maWc/Lk9BdXRoTGliQ29uZmlnPy5yZXNwb25zZVR5cGU7XG4gICAgaWYgKHJlc3BvbnNlVHlwZSkge1xuICAgICAgY29uc3QgdHlwZXMgPSByZXNwb25zZVR5cGUuc3BsaXQoJyAnKTtcbiAgICAgIGlmICh0eXBlcy5pbmNsdWRlcygnY29kZScpKSB7XG4gICAgICAgIHJldHVybiBPQXV0aEZsb3cuQXV0aG9yaXphdGlvbkNvZGU7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVzLmluY2x1ZGVzKCd0b2tlbicpKSB7XG4gICAgICAgIHJldHVybiBPQXV0aEZsb3cuSW1wbGljaXRGbG93O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE9BdXRoRmxvdy5SZXNvdXJjZU93bmVyUGFzc3dvcmRGbG93O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gT0F1dGhGbG93LlJlc291cmNlT3duZXJQYXNzd29yZEZsb3c7XG4gIH1cbn1cbiJdfQ==