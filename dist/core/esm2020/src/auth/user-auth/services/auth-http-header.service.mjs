import { Injectable } from '@angular/core';
import { EMPTY, Subject, Subscription, combineLatest, defer, queueScheduler, using, } from 'rxjs';
import { filter, map, observeOn, pairwise, shareReplay, skipWhile, switchMap, take, tap, withLatestFrom, } from 'rxjs/operators';
import { GlobalMessageType } from '../../../global-message/models/global-message.model';
import * as i0 from "@angular/core";
import * as i1 from "../facade/auth.service";
import * as i2 from "./auth-storage.service";
import * as i3 from "./oauth-lib-wrapper.service";
import * as i4 from "../../../routing/facade/routing.service";
import * as i5 from "../../../occ/services/occ-endpoints.service";
import * as i6 from "../../../global-message/facade/global-message.service";
import * as i7 from "./auth-redirect.service";
/**
 * Extendable service for `AuthInterceptor`.
 */
export class AuthHttpHeaderService {
    constructor(authService, authStorageService, oAuthLibWrapperService, routingService, occEndpoints, globalMessageService, authRedirectService) {
        this.authService = authService;
        this.authStorageService = authStorageService;
        this.oAuthLibWrapperService = oAuthLibWrapperService;
        this.routingService = routingService;
        this.occEndpoints = occEndpoints;
        this.globalMessageService = globalMessageService;
        this.authRedirectService = authRedirectService;
        /**
         * Starts the refresh of the access token
         */
        this.refreshTokenTrigger$ = new Subject();
        /**
         * Internal token streams which reads the latest from the storage.
         * Emits the token or `undefined`
         */
        this.token$ = this.authStorageService
            .getToken()
            .pipe(map((token) => (token?.access_token ? token : undefined)));
        /**
         * Compares the previous and the new token in order to stop the refresh or logout processes
         */
        this.stopProgress$ = this.token$.pipe(
        // Keeps the previous and the new token
        pairwise(), tap(([oldToken, newToken]) => {
            // if we got the new token we know that either the refresh or logout finished
            if (oldToken?.access_token !== newToken?.access_token) {
                this.authService.setLogoutProgress(false);
                this.authService.setRefreshProgress(false);
            }
        }));
        /**
         * Refreshes the token only if currently there's no refresh nor logout in progress.
         * If the refresh token is not present, it triggers the logout process
         */
        this.refreshToken$ = this.refreshTokenTrigger$.pipe(withLatestFrom(this.authService.refreshInProgress$, this.authService.logoutInProgress$), filter(([, refreshInProgress, logoutInProgress]) => !refreshInProgress && !logoutInProgress), tap(([token]) => {
            if (token?.refresh_token) {
                this.oAuthLibWrapperService.refreshToken();
                this.authService.setRefreshProgress(true);
            }
            else {
                this.handleExpiredRefreshToken();
            }
        }));
        /**
         * Kicks of the process by listening to the new token and refresh token processes.
         * This token should be used when retrying the failed http request.
         */
        this.tokenToRetryRequest$ = using(() => this.refreshToken$.subscribe(), () => this.getStableToken()).pipe(shareReplay({ refCount: true, bufferSize: 1 }));
        this.subscriptions = new Subscription();
        // We need to have stopProgress$ stream active for the whole time,
        // so when the logout finishes we finish it's process.
        // It could happen when retryToken$ is not active.
        this.subscriptions.add(this.stopProgress$.subscribe());
    }
    /**
     * Checks if request should be handled by this service (if it's OCC call).
     */
    shouldCatchError(request) {
        return this.isOccUrl(request.url);
    }
    shouldAddAuthorizationHeader(request) {
        const hasAuthorizationHeader = !!this.getAuthorizationHeader(request);
        const isOccUrl = this.isOccUrl(request.url);
        return !hasAuthorizationHeader && isOccUrl;
    }
    /**
     * Adds `Authorization` header for OCC calls.
     */
    alterRequest(request, token) {
        const hasAuthorizationHeader = !!this.getAuthorizationHeader(request);
        const isBaseSitesRequest = this.isBaseSitesRequest(request);
        const isOccUrl = this.isOccUrl(request.url);
        if (!hasAuthorizationHeader && isOccUrl && !isBaseSitesRequest) {
            return request.clone({
                setHeaders: {
                    ...this.createAuthorizationHeader(token),
                },
            });
        }
        return request;
    }
    isOccUrl(url) {
        return url.includes(this.occEndpoints.getBaseUrl());
    }
    isBaseSitesRequest(request) {
        return request.url.includes(this.occEndpoints.getRawEndpointValue('baseSites'));
    }
    getAuthorizationHeader(request) {
        const rawValue = request.headers.get('Authorization');
        return rawValue;
    }
    createAuthorizationHeader(token) {
        if (token?.access_token) {
            return {
                Authorization: `${token.token_type || 'Bearer'} ${token.access_token}`,
            };
        }
        let currentToken;
        this.authStorageService
            .getToken()
            .subscribe((authToken) => (currentToken = authToken))
            .unsubscribe();
        if (currentToken?.access_token) {
            return {
                Authorization: `${currentToken.token_type || 'Bearer'} ${currentToken.access_token}`,
            };
        }
        return {};
    }
    /**
     * Refreshes access_token and then retries the call with the new token.
     */
    handleExpiredAccessToken(request, next, initialToken) {
        return this.getValidToken(initialToken).pipe(switchMap((token) => 
        // we break the stream with EMPTY when we don't have the token. This prevents sending the requests with `Authorization: bearer undefined` header
        token
            ? next.handle(this.createNewRequestWithNewToken(request, token))
            : EMPTY));
    }
    /**
     * Logout user, redirected to login page and informs about expired session.
     */
    handleExpiredRefreshToken() {
        // There might be 2 cases:
        // 1. when user is already on some page (router is stable) and performs an UI action
        // that triggers http call (i.e. button click to save data in backend)
        // 2. when user is navigating to some page and a route guard triggers the http call
        // (i.e. guard loading cms page data)
        //
        // In the second case, we want to remember the anticipated url before we navigate to
        // the login page, so we can redirect back to that URL after user authenticates.
        this.authRedirectService.saveCurrentNavigationUrl();
        // Logout user
        // TODO(#9638): Use logout route when it will support passing redirect url
        this.authService.coreLogout().finally(() => {
            this.routingService.go({ cxRoute: 'login' });
            this.globalMessageService.add({
                key: 'httpHandlers.sessionExpired',
            }, GlobalMessageType.MSG_TYPE_ERROR);
        });
    }
    /**
     * Emits the token or `undefined` only when the refresh or the logout processes are finished.
     */
    getStableToken() {
        return combineLatest([
            this.token$,
            this.authService.refreshInProgress$,
            this.authService.logoutInProgress$,
        ]).pipe(observeOn(queueScheduler), filter(([_, refreshInProgress, logoutInProgress]) => !refreshInProgress && !logoutInProgress), switchMap(() => this.token$));
    }
    /**
     * Returns a valid access token.
     * It will attempt to refresh it if the current one expired; emits after the new one is retrieved.
     */
    getValidToken(requestToken) {
        return defer(() => {
            // flag to only refresh token only on first emission
            let refreshTriggered = false;
            return this.tokenToRetryRequest$.pipe(tap((token) => {
                // we want to refresh the access token only when it is old.
                // this is a guard for the case when there are multiple parallel http calls
                if (token?.access_token === requestToken?.access_token &&
                    !refreshTriggered) {
                    this.refreshTokenTrigger$.next(token); // TODO: CXSPA-3088 Type incongruity
                }
                refreshTriggered = true;
            }), skipWhile((token) => token?.access_token === requestToken?.access_token), take(1));
        });
    }
    createNewRequestWithNewToken(request, token) {
        request = request.clone({
            setHeaders: {
                Authorization: `${token.token_type || 'Bearer'} ${token.access_token}`,
            },
        });
        return request;
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
AuthHttpHeaderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthHttpHeaderService, deps: [{ token: i1.AuthService }, { token: i2.AuthStorageService }, { token: i3.OAuthLibWrapperService }, { token: i4.RoutingService }, { token: i5.OccEndpointsService }, { token: i6.GlobalMessageService }, { token: i7.AuthRedirectService }], target: i0.ɵɵFactoryTarget.Injectable });
AuthHttpHeaderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthHttpHeaderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthHttpHeaderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.AuthService }, { type: i2.AuthStorageService }, { type: i3.OAuthLibWrapperService }, { type: i4.RoutingService }, { type: i5.OccEndpointsService }, { type: i6.GlobalMessageService }, { type: i7.AuthRedirectService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1odHRwLWhlYWRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvYXV0aC91c2VyLWF1dGgvc2VydmljZXMvYXV0aC1odHRwLWhlYWRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUNMLEtBQUssRUFFTCxPQUFPLEVBQ1AsWUFBWSxFQUNaLGFBQWEsRUFDYixLQUFLLEVBQ0wsY0FBYyxFQUNkLEtBQUssR0FDTixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFDTCxNQUFNLEVBQ04sR0FBRyxFQUNILFNBQVMsRUFDVCxRQUFRLEVBQ1IsV0FBVyxFQUNYLFNBQVMsRUFDVCxTQUFTLEVBQ1QsSUFBSSxFQUNKLEdBQUcsRUFDSCxjQUFjLEdBQ2YsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQzs7Ozs7Ozs7O0FBU3hGOztHQUVHO0FBSUgsTUFBTSxPQUFPLHFCQUFxQjtJQStEaEMsWUFDWSxXQUF3QixFQUN4QixrQkFBc0MsRUFDdEMsc0JBQThDLEVBQzlDLGNBQThCLEVBQzlCLFlBQWlDLEVBQ2pDLG9CQUEwQyxFQUMxQyxtQkFBd0M7UUFOeEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQzlDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBckVwRDs7V0FFRztRQUNPLHlCQUFvQixHQUFHLElBQUksT0FBTyxF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QUNQLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsWUFBWSxLQUFLLFlBQVksRUFBRSxZQUFZLENBQzlELEVBQ0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNSLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFUyw0QkFBNEIsQ0FDcEMsT0FBeUIsRUFDekIsS0FBZ0I7UUFFaEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDdEIsVUFBVSxFQUFFO2dCQUNWLGFBQWEsRUFBRSxHQUFHLEtBQUssQ0FBQyxVQUFVLElBQUksUUFBUSxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUU7YUFDdkU7U0FDRixDQUFDLENBQUM7UUFDSCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7a0hBbFFVLHFCQUFxQjtzSEFBckIscUJBQXFCLGNBRnBCLE1BQU07MkZBRVAscUJBQXFCO2tCQUhqQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEh0dHBFdmVudCwgSHR0cEhhbmRsZXIsIEh0dHBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBFTVBUWSxcbiAgT2JzZXJ2YWJsZSxcbiAgU3ViamVjdCxcbiAgU3Vic2NyaXB0aW9uLFxuICBjb21iaW5lTGF0ZXN0LFxuICBkZWZlcixcbiAgcXVldWVTY2hlZHVsZXIsXG4gIHVzaW5nLFxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGZpbHRlcixcbiAgbWFwLFxuICBvYnNlcnZlT24sXG4gIHBhaXJ3aXNlLFxuICBzaGFyZVJlcGxheSxcbiAgc2tpcFdoaWxlLFxuICBzd2l0Y2hNYXAsXG4gIHRha2UsXG4gIHRhcCxcbiAgd2l0aExhdGVzdEZyb20sXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEdsb2JhbE1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vZ2xvYmFsLW1lc3NhZ2UvZmFjYWRlL2dsb2JhbC1tZXNzYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgR2xvYmFsTWVzc2FnZVR5cGUgfSBmcm9tICcuLi8uLi8uLi9nbG9iYWwtbWVzc2FnZS9tb2RlbHMvZ2xvYmFsLW1lc3NhZ2UubW9kZWwnO1xuaW1wb3J0IHsgT2NjRW5kcG9pbnRzU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL29jYy9zZXJ2aWNlcy9vY2MtZW5kcG9pbnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgUm91dGluZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9yb3V0aW5nL2ZhY2FkZS9yb3V0aW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi9mYWNhZGUvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhUb2tlbiB9IGZyb20gJy4uL21vZGVscy9hdXRoLXRva2VuLm1vZGVsJztcbmltcG9ydCB7IEF1dGhSZWRpcmVjdFNlcnZpY2UgfSBmcm9tICcuL2F1dGgtcmVkaXJlY3Quc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL2F1dGgtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IE9BdXRoTGliV3JhcHBlclNlcnZpY2UgfSBmcm9tICcuL29hdXRoLWxpYi13cmFwcGVyLnNlcnZpY2UnO1xuXG4vKipcbiAqIEV4dGVuZGFibGUgc2VydmljZSBmb3IgYEF1dGhJbnRlcmNlcHRvcmAuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBBdXRoSHR0cEhlYWRlclNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogU3RhcnRzIHRoZSByZWZyZXNoIG9mIHRoZSBhY2Nlc3MgdG9rZW5cbiAgICovXG4gIHByb3RlY3RlZCByZWZyZXNoVG9rZW5UcmlnZ2VyJCA9IG5ldyBTdWJqZWN0PEF1dGhUb2tlbj4oKTtcblxuICAvKipcbiAgICogSW50ZXJuYWwgdG9rZW4gc3RyZWFtcyB3aGljaCByZWFkcyB0aGUgbGF0ZXN0IGZyb20gdGhlIHN0b3JhZ2UuXG4gICAqIEVtaXRzIHRoZSB0b2tlbiBvciBgdW5kZWZpbmVkYFxuICAgKi9cbiAgcHJvdGVjdGVkIHRva2VuJDogT2JzZXJ2YWJsZTxBdXRoVG9rZW4gfCB1bmRlZmluZWQ+ID0gdGhpcy5hdXRoU3RvcmFnZVNlcnZpY2VcbiAgICAuZ2V0VG9rZW4oKVxuICAgIC5waXBlKG1hcCgodG9rZW4pID0+ICh0b2tlbj8uYWNjZXNzX3Rva2VuID8gdG9rZW4gOiB1bmRlZmluZWQpKSk7XG5cbiAgLyoqXG4gICAqIENvbXBhcmVzIHRoZSBwcmV2aW91cyBhbmQgdGhlIG5ldyB0b2tlbiBpbiBvcmRlciB0byBzdG9wIHRoZSByZWZyZXNoIG9yIGxvZ291dCBwcm9jZXNzZXNcbiAgICovXG4gIHByb3RlY3RlZCBzdG9wUHJvZ3Jlc3MkID0gdGhpcy50b2tlbiQucGlwZShcbiAgICAvLyBLZWVwcyB0aGUgcHJldmlvdXMgYW5kIHRoZSBuZXcgdG9rZW5cbiAgICBwYWlyd2lzZSgpLFxuICAgIHRhcCgoW29sZFRva2VuLCBuZXdUb2tlbl0pID0+IHtcbiAgICAgIC8vIGlmIHdlIGdvdCB0aGUgbmV3IHRva2VuIHdlIGtub3cgdGhhdCBlaXRoZXIgdGhlIHJlZnJlc2ggb3IgbG9nb3V0IGZpbmlzaGVkXG4gICAgICBpZiAob2xkVG9rZW4/LmFjY2Vzc190b2tlbiAhPT0gbmV3VG9rZW4/LmFjY2Vzc190b2tlbikge1xuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnNldExvZ291dFByb2dyZXNzKGZhbHNlKTtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5zZXRSZWZyZXNoUHJvZ3Jlc3MoZmFsc2UpO1xuICAgICAgfVxuICAgIH0pXG4gICk7XG5cbiAgLyoqXG4gICAqIFJlZnJlc2hlcyB0aGUgdG9rZW4gb25seSBpZiBjdXJyZW50bHkgdGhlcmUncyBubyByZWZyZXNoIG5vciBsb2dvdXQgaW4gcHJvZ3Jlc3MuXG4gICAqIElmIHRoZSByZWZyZXNoIHRva2VuIGlzIG5vdCBwcmVzZW50LCBpdCB0cmlnZ2VycyB0aGUgbG9nb3V0IHByb2Nlc3NcbiAgICovXG4gIHByb3RlY3RlZCByZWZyZXNoVG9rZW4kID0gdGhpcy5yZWZyZXNoVG9rZW5UcmlnZ2VyJC5waXBlKFxuICAgIHdpdGhMYXRlc3RGcm9tKFxuICAgICAgdGhpcy5hdXRoU2VydmljZS5yZWZyZXNoSW5Qcm9ncmVzcyQsXG4gICAgICB0aGlzLmF1dGhTZXJ2aWNlLmxvZ291dEluUHJvZ3Jlc3MkXG4gICAgKSxcbiAgICBmaWx0ZXIoXG4gICAgICAoWywgcmVmcmVzaEluUHJvZ3Jlc3MsIGxvZ291dEluUHJvZ3Jlc3NdKSA9PlxuICAgICAgICAhcmVmcmVzaEluUHJvZ3Jlc3MgJiYgIWxvZ291dEluUHJvZ3Jlc3NcbiAgICApLFxuICAgIHRhcCgoW3Rva2VuXSkgPT4ge1xuICAgICAgaWYgKHRva2VuPy5yZWZyZXNoX3Rva2VuKSB7XG4gICAgICAgIHRoaXMub0F1dGhMaWJXcmFwcGVyU2VydmljZS5yZWZyZXNoVG9rZW4oKTtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5zZXRSZWZyZXNoUHJvZ3Jlc3ModHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmhhbmRsZUV4cGlyZWRSZWZyZXNoVG9rZW4oKTtcbiAgICAgIH1cbiAgICB9KVxuICApO1xuXG4gIC8qKlxuICAgKiBLaWNrcyBvZiB0aGUgcHJvY2VzcyBieSBsaXN0ZW5pbmcgdG8gdGhlIG5ldyB0b2tlbiBhbmQgcmVmcmVzaCB0b2tlbiBwcm9jZXNzZXMuXG4gICAqIFRoaXMgdG9rZW4gc2hvdWxkIGJlIHVzZWQgd2hlbiByZXRyeWluZyB0aGUgZmFpbGVkIGh0dHAgcmVxdWVzdC5cbiAgICovXG4gIHByb3RlY3RlZCB0b2tlblRvUmV0cnlSZXF1ZXN0JCA9IHVzaW5nKFxuICAgICgpID0+IHRoaXMucmVmcmVzaFRva2VuJC5zdWJzY3JpYmUoKSxcbiAgICAoKSA9PiB0aGlzLmdldFN0YWJsZVRva2VuKClcbiAgKS5waXBlKHNoYXJlUmVwbGF5KHsgcmVmQ291bnQ6IHRydWUsIGJ1ZmZlclNpemU6IDEgfSkpO1xuXG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGF1dGhTdG9yYWdlU2VydmljZTogQXV0aFN0b3JhZ2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBvQXV0aExpYldyYXBwZXJTZXJ2aWNlOiBPQXV0aExpYldyYXBwZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIG9jY0VuZHBvaW50czogT2NjRW5kcG9pbnRzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZ2xvYmFsTWVzc2FnZVNlcnZpY2U6IEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhdXRoUmVkaXJlY3RTZXJ2aWNlOiBBdXRoUmVkaXJlY3RTZXJ2aWNlXG4gICkge1xuICAgIC8vIFdlIG5lZWQgdG8gaGF2ZSBzdG9wUHJvZ3Jlc3MkIHN0cmVhbSBhY3RpdmUgZm9yIHRoZSB3aG9sZSB0aW1lLFxuICAgIC8vIHNvIHdoZW4gdGhlIGxvZ291dCBmaW5pc2hlcyB3ZSBmaW5pc2ggaXQncyBwcm9jZXNzLlxuICAgIC8vIEl0IGNvdWxkIGhhcHBlbiB3aGVuIHJldHJ5VG9rZW4kIGlzIG5vdCBhY3RpdmUuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZCh0aGlzLnN0b3BQcm9ncmVzcyQuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiByZXF1ZXN0IHNob3VsZCBiZSBoYW5kbGVkIGJ5IHRoaXMgc2VydmljZSAoaWYgaXQncyBPQ0MgY2FsbCkuXG4gICAqL1xuICBwdWJsaWMgc2hvdWxkQ2F0Y2hFcnJvcihyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNPY2NVcmwocmVxdWVzdC51cmwpO1xuICB9XG5cbiAgcHVibGljIHNob3VsZEFkZEF1dGhvcml6YXRpb25IZWFkZXIocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55Pik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGhhc0F1dGhvcml6YXRpb25IZWFkZXIgPSAhIXRoaXMuZ2V0QXV0aG9yaXphdGlvbkhlYWRlcihyZXF1ZXN0KTtcbiAgICBjb25zdCBpc09jY1VybCA9IHRoaXMuaXNPY2NVcmwocmVxdWVzdC51cmwpO1xuICAgIHJldHVybiAhaGFzQXV0aG9yaXphdGlvbkhlYWRlciAmJiBpc09jY1VybDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGBBdXRob3JpemF0aW9uYCBoZWFkZXIgZm9yIE9DQyBjYWxscy5cbiAgICovXG4gIHB1YmxpYyBhbHRlclJlcXVlc3QoXG4gICAgcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcbiAgICB0b2tlbj86IEF1dGhUb2tlblxuICApOiBIdHRwUmVxdWVzdDxhbnk+IHtcbiAgICBjb25zdCBoYXNBdXRob3JpemF0aW9uSGVhZGVyID0gISF0aGlzLmdldEF1dGhvcml6YXRpb25IZWFkZXIocmVxdWVzdCk7XG4gICAgY29uc3QgaXNCYXNlU2l0ZXNSZXF1ZXN0ID0gdGhpcy5pc0Jhc2VTaXRlc1JlcXVlc3QocmVxdWVzdCk7XG4gICAgY29uc3QgaXNPY2NVcmwgPSB0aGlzLmlzT2NjVXJsKHJlcXVlc3QudXJsKTtcbiAgICBpZiAoIWhhc0F1dGhvcml6YXRpb25IZWFkZXIgJiYgaXNPY2NVcmwgJiYgIWlzQmFzZVNpdGVzUmVxdWVzdCkge1xuICAgICAgcmV0dXJuIHJlcXVlc3QuY2xvbmUoe1xuICAgICAgICBzZXRIZWFkZXJzOiB7XG4gICAgICAgICAgLi4udGhpcy5jcmVhdGVBdXRob3JpemF0aW9uSGVhZGVyKHRva2VuKSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVxdWVzdDtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc09jY1VybCh1cmw6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB1cmwuaW5jbHVkZXModGhpcy5vY2NFbmRwb2ludHMuZ2V0QmFzZVVybCgpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0Jhc2VTaXRlc1JlcXVlc3QocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55Pik6IGJvb2xlYW4ge1xuICAgIHJldHVybiByZXF1ZXN0LnVybC5pbmNsdWRlcyhcbiAgICAgIHRoaXMub2NjRW5kcG9pbnRzLmdldFJhd0VuZHBvaW50VmFsdWUoJ2Jhc2VTaXRlcycpXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRBdXRob3JpemF0aW9uSGVhZGVyKHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4pOiBzdHJpbmcgfCBudWxsIHtcbiAgICBjb25zdCByYXdWYWx1ZSA9IHJlcXVlc3QuaGVhZGVycy5nZXQoJ0F1dGhvcml6YXRpb24nKTtcbiAgICByZXR1cm4gcmF3VmFsdWU7XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlQXV0aG9yaXphdGlvbkhlYWRlcihcbiAgICB0b2tlbj86IEF1dGhUb2tlblxuICApOiB7IEF1dGhvcml6YXRpb246IHN0cmluZyB9IHwge30ge1xuICAgIGlmICh0b2tlbj8uYWNjZXNzX3Rva2VuKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBBdXRob3JpemF0aW9uOiBgJHt0b2tlbi50b2tlbl90eXBlIHx8ICdCZWFyZXInfSAke3Rva2VuLmFjY2Vzc190b2tlbn1gLFxuICAgICAgfTtcbiAgICB9XG4gICAgbGV0IGN1cnJlbnRUb2tlbjogQXV0aFRva2VuIHwgdW5kZWZpbmVkO1xuICAgIHRoaXMuYXV0aFN0b3JhZ2VTZXJ2aWNlXG4gICAgICAuZ2V0VG9rZW4oKVxuICAgICAgLnN1YnNjcmliZSgoYXV0aFRva2VuKSA9PiAoY3VycmVudFRva2VuID0gYXV0aFRva2VuKSlcbiAgICAgIC51bnN1YnNjcmliZSgpO1xuXG4gICAgaWYgKGN1cnJlbnRUb2tlbj8uYWNjZXNzX3Rva2VuKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBBdXRob3JpemF0aW9uOiBgJHtjdXJyZW50VG9rZW4udG9rZW5fdHlwZSB8fCAnQmVhcmVyJ30gJHtcbiAgICAgICAgICBjdXJyZW50VG9rZW4uYWNjZXNzX3Rva2VuXG4gICAgICAgIH1gLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZnJlc2hlcyBhY2Nlc3NfdG9rZW4gYW5kIHRoZW4gcmV0cmllcyB0aGUgY2FsbCB3aXRoIHRoZSBuZXcgdG9rZW4uXG4gICAqL1xuICBwdWJsaWMgaGFuZGxlRXhwaXJlZEFjY2Vzc1Rva2VuKFxuICAgIHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sXG4gICAgbmV4dDogSHR0cEhhbmRsZXIsXG4gICAgaW5pdGlhbFRva2VuOiBBdXRoVG9rZW4gfCB1bmRlZmluZWRcbiAgKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8QXV0aFRva2VuPj4ge1xuICAgIHJldHVybiB0aGlzLmdldFZhbGlkVG9rZW4oaW5pdGlhbFRva2VuKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKCh0b2tlbikgPT5cbiAgICAgICAgLy8gd2UgYnJlYWsgdGhlIHN0cmVhbSB3aXRoIEVNUFRZIHdoZW4gd2UgZG9uJ3QgaGF2ZSB0aGUgdG9rZW4uIFRoaXMgcHJldmVudHMgc2VuZGluZyB0aGUgcmVxdWVzdHMgd2l0aCBgQXV0aG9yaXphdGlvbjogYmVhcmVyIHVuZGVmaW5lZGAgaGVhZGVyXG4gICAgICAgIHRva2VuXG4gICAgICAgICAgPyBuZXh0LmhhbmRsZSh0aGlzLmNyZWF0ZU5ld1JlcXVlc3RXaXRoTmV3VG9rZW4ocmVxdWVzdCwgdG9rZW4pKVxuICAgICAgICAgIDogRU1QVFlcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIExvZ291dCB1c2VyLCByZWRpcmVjdGVkIHRvIGxvZ2luIHBhZ2UgYW5kIGluZm9ybXMgYWJvdXQgZXhwaXJlZCBzZXNzaW9uLlxuICAgKi9cbiAgcHVibGljIGhhbmRsZUV4cGlyZWRSZWZyZXNoVG9rZW4oKTogdm9pZCB7XG4gICAgLy8gVGhlcmUgbWlnaHQgYmUgMiBjYXNlczpcbiAgICAvLyAxLiB3aGVuIHVzZXIgaXMgYWxyZWFkeSBvbiBzb21lIHBhZ2UgKHJvdXRlciBpcyBzdGFibGUpIGFuZCBwZXJmb3JtcyBhbiBVSSBhY3Rpb25cbiAgICAvLyB0aGF0IHRyaWdnZXJzIGh0dHAgY2FsbCAoaS5lLiBidXR0b24gY2xpY2sgdG8gc2F2ZSBkYXRhIGluIGJhY2tlbmQpXG4gICAgLy8gMi4gd2hlbiB1c2VyIGlzIG5hdmlnYXRpbmcgdG8gc29tZSBwYWdlIGFuZCBhIHJvdXRlIGd1YXJkIHRyaWdnZXJzIHRoZSBodHRwIGNhbGxcbiAgICAvLyAoaS5lLiBndWFyZCBsb2FkaW5nIGNtcyBwYWdlIGRhdGEpXG4gICAgLy9cbiAgICAvLyBJbiB0aGUgc2Vjb25kIGNhc2UsIHdlIHdhbnQgdG8gcmVtZW1iZXIgdGhlIGFudGljaXBhdGVkIHVybCBiZWZvcmUgd2UgbmF2aWdhdGUgdG9cbiAgICAvLyB0aGUgbG9naW4gcGFnZSwgc28gd2UgY2FuIHJlZGlyZWN0IGJhY2sgdG8gdGhhdCBVUkwgYWZ0ZXIgdXNlciBhdXRoZW50aWNhdGVzLlxuICAgIHRoaXMuYXV0aFJlZGlyZWN0U2VydmljZS5zYXZlQ3VycmVudE5hdmlnYXRpb25VcmwoKTtcblxuICAgIC8vIExvZ291dCB1c2VyXG4gICAgLy8gVE9ETygjOTYzOCk6IFVzZSBsb2dvdXQgcm91dGUgd2hlbiBpdCB3aWxsIHN1cHBvcnQgcGFzc2luZyByZWRpcmVjdCB1cmxcbiAgICB0aGlzLmF1dGhTZXJ2aWNlLmNvcmVMb2dvdXQoKS5maW5hbGx5KCgpID0+IHtcbiAgICAgIHRoaXMucm91dGluZ1NlcnZpY2UuZ28oeyBjeFJvdXRlOiAnbG9naW4nIH0pO1xuXG4gICAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgICAge1xuICAgICAgICAgIGtleTogJ2h0dHBIYW5kbGVycy5zZXNzaW9uRXhwaXJlZCcsXG4gICAgICAgIH0sXG4gICAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX0VSUk9SXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEVtaXRzIHRoZSB0b2tlbiBvciBgdW5kZWZpbmVkYCBvbmx5IHdoZW4gdGhlIHJlZnJlc2ggb3IgdGhlIGxvZ291dCBwcm9jZXNzZXMgYXJlIGZpbmlzaGVkLlxuICAgKi9cbiAgZ2V0U3RhYmxlVG9rZW4oKTogT2JzZXJ2YWJsZTxBdXRoVG9rZW4gfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLnRva2VuJCxcbiAgICAgIHRoaXMuYXV0aFNlcnZpY2UucmVmcmVzaEluUHJvZ3Jlc3MkLFxuICAgICAgdGhpcy5hdXRoU2VydmljZS5sb2dvdXRJblByb2dyZXNzJCxcbiAgICBdKS5waXBlKFxuICAgICAgb2JzZXJ2ZU9uKHF1ZXVlU2NoZWR1bGVyKSxcbiAgICAgIGZpbHRlcihcbiAgICAgICAgKFtfLCByZWZyZXNoSW5Qcm9ncmVzcywgbG9nb3V0SW5Qcm9ncmVzc10pID0+XG4gICAgICAgICAgIXJlZnJlc2hJblByb2dyZXNzICYmICFsb2dvdXRJblByb2dyZXNzXG4gICAgICApLFxuICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMudG9rZW4kKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHZhbGlkIGFjY2VzcyB0b2tlbi5cbiAgICogSXQgd2lsbCBhdHRlbXB0IHRvIHJlZnJlc2ggaXQgaWYgdGhlIGN1cnJlbnQgb25lIGV4cGlyZWQ7IGVtaXRzIGFmdGVyIHRoZSBuZXcgb25lIGlzIHJldHJpZXZlZC5cbiAgICovXG4gIHByb3RlY3RlZCBnZXRWYWxpZFRva2VuKFxuICAgIHJlcXVlc3RUb2tlbjogQXV0aFRva2VuIHwgdW5kZWZpbmVkXG4gICk6IE9ic2VydmFibGU8QXV0aFRva2VuIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIGRlZmVyKCgpID0+IHtcbiAgICAgIC8vIGZsYWcgdG8gb25seSByZWZyZXNoIHRva2VuIG9ubHkgb24gZmlyc3QgZW1pc3Npb25cbiAgICAgIGxldCByZWZyZXNoVHJpZ2dlcmVkID0gZmFsc2U7XG4gICAgICByZXR1cm4gdGhpcy50b2tlblRvUmV0cnlSZXF1ZXN0JC5waXBlKFxuICAgICAgICB0YXAoKHRva2VuKSA9PiB7XG4gICAgICAgICAgLy8gd2Ugd2FudCB0byByZWZyZXNoIHRoZSBhY2Nlc3MgdG9rZW4gb25seSB3aGVuIGl0IGlzIG9sZC5cbiAgICAgICAgICAvLyB0aGlzIGlzIGEgZ3VhcmQgZm9yIHRoZSBjYXNlIHdoZW4gdGhlcmUgYXJlIG11bHRpcGxlIHBhcmFsbGVsIGh0dHAgY2FsbHNcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0b2tlbj8uYWNjZXNzX3Rva2VuID09PSByZXF1ZXN0VG9rZW4/LmFjY2Vzc190b2tlbiAmJlxuICAgICAgICAgICAgIXJlZnJlc2hUcmlnZ2VyZWRcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFRva2VuVHJpZ2dlciQubmV4dCh0b2tlbiBhcyBBdXRoVG9rZW4pOyAvLyBUT0RPOiBDWFNQQS0zMDg4IFR5cGUgaW5jb25ncnVpdHlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVmcmVzaFRyaWdnZXJlZCA9IHRydWU7XG4gICAgICAgIH0pLFxuICAgICAgICBza2lwV2hpbGUoXG4gICAgICAgICAgKHRva2VuKSA9PiB0b2tlbj8uYWNjZXNzX3Rva2VuID09PSByZXF1ZXN0VG9rZW4/LmFjY2Vzc190b2tlblxuICAgICAgICApLFxuICAgICAgICB0YWtlKDEpXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZU5ld1JlcXVlc3RXaXRoTmV3VG9rZW4oXG4gICAgcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcbiAgICB0b2tlbjogQXV0aFRva2VuXG4gICk6IEh0dHBSZXF1ZXN0PGFueT4ge1xuICAgIHJlcXVlc3QgPSByZXF1ZXN0LmNsb25lKHtcbiAgICAgIHNldEhlYWRlcnM6IHtcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYCR7dG9rZW4udG9rZW5fdHlwZSB8fCAnQmVhcmVyJ30gJHt0b2tlbi5hY2Nlc3NfdG9rZW59YCxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcXVlc3Q7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19