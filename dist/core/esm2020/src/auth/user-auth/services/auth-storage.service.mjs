/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Storage service for AuthToken. Used as a storage for angular-oauth2-oidc library.
 */
export class AuthStorageService extends OAuthStorage {
    constructor() {
        super(...arguments);
        this._token$ = new BehaviorSubject({});
    }
    decode(key, value) {
        if (AuthStorageService.nonStringifiedOAuthLibKeys.includes(key)) {
            return value;
        }
        return JSON.stringify(value);
    }
    encode(key, value) {
        if (AuthStorageService.nonStringifiedOAuthLibKeys.includes(key)) {
            return value;
        }
        else {
            try {
                return JSON.parse(value);
            }
            catch {
                return value;
            }
        }
    }
    /* Async API for spartacus use */
    /**
     * Returns complete token (all fields).
     *
     * @return observable emitting AuthToken
     */
    getToken() {
        return this._token$;
    }
    /**
     * Set current value of token.
     *
     * @param token
     */
    setToken(token) {
        this._token$.next(token);
    }
    /* Sync API for OAuth lib use */
    /**
     * Get parameter from the token (eg. access_token)
     *
     * @param key
     */
    getItem(key) {
        let token;
        this.getToken()
            .subscribe((currentToken) => (token = currentToken))
            .unsubscribe();
        return this.decode(key, token?.[key]);
    }
    /**
     * Removes parameter from the token (eg. access_token)
     *
     * @param key
     */
    removeItem(key) {
        const val = { ...this._token$.value };
        delete val[key];
        this._token$.next({
            ...val,
        });
    }
    /**
     * Sets parameter of the token (eg. access_token)
     *
     * @param key
     */
    setItem(key, data) {
        if (key) {
            this._token$.next({
                ...this._token$.value,
                [key]: this.encode(key, data),
            });
        }
    }
}
/**
 * Extracted keys that are not `JSON.stringify` from reading the angular-oauth2-oidc source code
 */
AuthStorageService.nonStringifiedOAuthLibKeys = [
    'PKCE_verifier',
    'access_token',
    'refresh_token',
    'expires_at',
    'access_token_stored_at',
    'id_token',
    'id_token_expires_at',
    'id_token_stored_at',
    'session_state',
    'nonce',
];
AuthStorageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthStorageService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
AuthStorageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthStorageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthStorageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1zdG9yYWdlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9hdXRoL3VzZXItYXV0aC9zZXJ2aWNlcy9hdXRoLXN0b3JhZ2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQzs7QUFHbkQ7O0dBRUc7QUFJSCxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsWUFBWTtJQUhwRDs7UUFvQlksWUFBTyxHQUEwQixJQUFJLGVBQWUsQ0FDNUQsRUFBZSxDQUNoQixDQUFDO0tBa0ZIO0lBaEZXLE1BQU0sQ0FBQyxHQUFXLEVBQUUsS0FBVTtRQUN0QyxJQUFJLGtCQUFrQixDQUFDLDBCQUEwQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMvRCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFUyxNQUFNLENBQUMsR0FBVyxFQUFFLEtBQVU7UUFDdEMsSUFBSSxrQkFBa0IsQ0FBQywwQkFBMEIsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDL0QsT0FBTyxLQUFLLENBQUM7U0FDZDthQUFNO1lBQ0wsSUFBSTtnQkFDRixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDMUI7WUFBQyxNQUFNO2dCQUNOLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7U0FDRjtJQUNILENBQUM7SUFFRCxpQ0FBaUM7SUFFakM7Ozs7T0FJRztJQUNILFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxRQUFRLENBQUMsS0FBZ0I7UUFDdEIsSUFBSSxDQUFDLE9BQXNDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCxnQ0FBZ0M7SUFFaEM7Ozs7T0FJRztJQUNILE9BQU8sQ0FBQyxHQUFXO1FBQ2pCLElBQUksS0FBSyxDQUFDO1FBQ1YsSUFBSSxDQUFDLFFBQVEsRUFBRTthQUNaLFNBQVMsQ0FBQyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLENBQUM7YUFDbkQsV0FBVyxFQUFFLENBQUM7UUFDakIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsVUFBVSxDQUFDLEdBQVc7UUFDcEIsTUFBTSxHQUFHLEdBQVEsRUFBRSxHQUFJLElBQUksQ0FBQyxPQUFzQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNFLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQXNDLENBQUMsSUFBSSxDQUFDO1lBQ2hELEdBQUcsR0FBRztTQUNQLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsT0FBTyxDQUFDLEdBQVcsRUFBRSxJQUFTO1FBQzVCLElBQUksR0FBRyxFQUFFO1lBQ04sSUFBSSxDQUFDLE9BQXNDLENBQUMsSUFBSSxDQUFDO2dCQUNoRCxHQUFJLElBQUksQ0FBQyxPQUFzQyxDQUFDLEtBQUs7Z0JBQ3JELENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDO2FBQzlCLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7QUFuR0Q7O0dBRUc7QUFDdUIsNkNBQTBCLEdBQUc7SUFDckQsZUFBZTtJQUNmLGNBQWM7SUFDZCxlQUFlO0lBQ2YsWUFBWTtJQUNaLHdCQUF3QjtJQUN4QixVQUFVO0lBQ1YscUJBQXFCO0lBQ3JCLG9CQUFvQjtJQUNwQixlQUFlO0lBQ2YsT0FBTztDQUNSLENBQUM7K0dBZlMsa0JBQWtCO21IQUFsQixrQkFBa0IsY0FGakIsTUFBTTsyRkFFUCxrQkFBa0I7a0JBSDlCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT0F1dGhTdG9yYWdlIH0gZnJvbSAnYW5ndWxhci1vYXV0aDItb2lkYyc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEF1dGhUb2tlbiB9IGZyb20gJy4uL21vZGVscy9hdXRoLXRva2VuLm1vZGVsJztcblxuLyoqXG4gKiBTdG9yYWdlIHNlcnZpY2UgZm9yIEF1dGhUb2tlbi4gVXNlZCBhcyBhIHN0b3JhZ2UgZm9yIGFuZ3VsYXItb2F1dGgyLW9pZGMgbGlicmFyeS5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEF1dGhTdG9yYWdlU2VydmljZSBleHRlbmRzIE9BdXRoU3RvcmFnZSB7XG4gIC8qKlxuICAgKiBFeHRyYWN0ZWQga2V5cyB0aGF0IGFyZSBub3QgYEpTT04uc3RyaW5naWZ5YCBmcm9tIHJlYWRpbmcgdGhlIGFuZ3VsYXItb2F1dGgyLW9pZGMgc291cmNlIGNvZGVcbiAgICovXG4gIHByb3RlY3RlZCBzdGF0aWMgcmVhZG9ubHkgbm9uU3RyaW5naWZpZWRPQXV0aExpYktleXMgPSBbXG4gICAgJ1BLQ0VfdmVyaWZpZXInLFxuICAgICdhY2Nlc3NfdG9rZW4nLFxuICAgICdyZWZyZXNoX3Rva2VuJyxcbiAgICAnZXhwaXJlc19hdCcsXG4gICAgJ2FjY2Vzc190b2tlbl9zdG9yZWRfYXQnLFxuICAgICdpZF90b2tlbicsXG4gICAgJ2lkX3Rva2VuX2V4cGlyZXNfYXQnLFxuICAgICdpZF90b2tlbl9zdG9yZWRfYXQnLFxuICAgICdzZXNzaW9uX3N0YXRlJyxcbiAgICAnbm9uY2UnLFxuICBdO1xuXG4gIHByb3RlY3RlZCBfdG9rZW4kOiBPYnNlcnZhYmxlPEF1dGhUb2tlbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEF1dGhUb2tlbj4oXG4gICAge30gYXMgQXV0aFRva2VuXG4gICk7XG5cbiAgcHJvdGVjdGVkIGRlY29kZShrZXk6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIGlmIChBdXRoU3RvcmFnZVNlcnZpY2Uubm9uU3RyaW5naWZpZWRPQXV0aExpYktleXMuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGVuY29kZShrZXk6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIGlmIChBdXRoU3RvcmFnZVNlcnZpY2Uubm9uU3RyaW5naWZpZWRPQXV0aExpYktleXMuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qIEFzeW5jIEFQSSBmb3Igc3BhcnRhY3VzIHVzZSAqL1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGNvbXBsZXRlIHRva2VuIChhbGwgZmllbGRzKS5cbiAgICpcbiAgICogQHJldHVybiBvYnNlcnZhYmxlIGVtaXR0aW5nIEF1dGhUb2tlblxuICAgKi9cbiAgZ2V0VG9rZW4oKTogT2JzZXJ2YWJsZTxBdXRoVG9rZW4+IHtcbiAgICByZXR1cm4gdGhpcy5fdG9rZW4kO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBjdXJyZW50IHZhbHVlIG9mIHRva2VuLlxuICAgKlxuICAgKiBAcGFyYW0gdG9rZW5cbiAgICovXG4gIHNldFRva2VuKHRva2VuOiBBdXRoVG9rZW4pOiB2b2lkIHtcbiAgICAodGhpcy5fdG9rZW4kIGFzIEJlaGF2aW9yU3ViamVjdDxBdXRoVG9rZW4+KS5uZXh0KHRva2VuKTtcbiAgfVxuXG4gIC8qIFN5bmMgQVBJIGZvciBPQXV0aCBsaWIgdXNlICovXG5cbiAgLyoqXG4gICAqIEdldCBwYXJhbWV0ZXIgZnJvbSB0aGUgdG9rZW4gKGVnLiBhY2Nlc3NfdG9rZW4pXG4gICAqXG4gICAqIEBwYXJhbSBrZXlcbiAgICovXG4gIGdldEl0ZW0oa2V5OiBzdHJpbmcpOiBhbnkge1xuICAgIGxldCB0b2tlbjtcbiAgICB0aGlzLmdldFRva2VuKClcbiAgICAgIC5zdWJzY3JpYmUoKGN1cnJlbnRUb2tlbikgPT4gKHRva2VuID0gY3VycmVudFRva2VuKSlcbiAgICAgIC51bnN1YnNjcmliZSgpO1xuICAgIHJldHVybiB0aGlzLmRlY29kZShrZXksIHRva2VuPy5ba2V5XSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBwYXJhbWV0ZXIgZnJvbSB0aGUgdG9rZW4gKGVnLiBhY2Nlc3NfdG9rZW4pXG4gICAqXG4gICAqIEBwYXJhbSBrZXlcbiAgICovXG4gIHJlbW92ZUl0ZW0oa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCB2YWw6IGFueSA9IHsgLi4uKHRoaXMuX3Rva2VuJCBhcyBCZWhhdmlvclN1YmplY3Q8QXV0aFRva2VuPikudmFsdWUgfTtcbiAgICBkZWxldGUgdmFsW2tleV07XG4gICAgKHRoaXMuX3Rva2VuJCBhcyBCZWhhdmlvclN1YmplY3Q8QXV0aFRva2VuPikubmV4dCh7XG4gICAgICAuLi52YWwsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBwYXJhbWV0ZXIgb2YgdGhlIHRva2VuIChlZy4gYWNjZXNzX3Rva2VuKVxuICAgKlxuICAgKiBAcGFyYW0ga2V5XG4gICAqL1xuICBzZXRJdGVtKGtleTogc3RyaW5nLCBkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoa2V5KSB7XG4gICAgICAodGhpcy5fdG9rZW4kIGFzIEJlaGF2aW9yU3ViamVjdDxBdXRoVG9rZW4+KS5uZXh0KHtcbiAgICAgICAgLi4uKHRoaXMuX3Rva2VuJCBhcyBCZWhhdmlvclN1YmplY3Q8QXV0aFRva2VuPikudmFsdWUsXG4gICAgICAgIFtrZXldOiB0aGlzLmVuY29kZShrZXksIGRhdGEpLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=