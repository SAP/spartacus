import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { GlobalMessageService } from '../../../global-message/facade/global-message.service';
import { OccEndpointsService } from '../../../occ/services/occ-endpoints.service';
import { RoutingService } from '../../../routing/facade/routing.service';
import { AuthService } from '../facade/auth.service';
import { AuthToken } from '../models/auth-token.model';
import { AuthRedirectService } from './auth-redirect.service';
import { AuthStorageService } from './auth-storage.service';
import { OAuthLibWrapperService } from './oauth-lib-wrapper.service';
import * as i0 from "@angular/core";
/**
 * Extendable service for `AuthInterceptor`.
 */
export declare class AuthHttpHeaderService implements OnDestroy {
    protected authService: AuthService;
    protected authStorageService: AuthStorageService;
    protected oAuthLibWrapperService: OAuthLibWrapperService;
    protected routingService: RoutingService;
    protected occEndpoints: OccEndpointsService;
    protected globalMessageService: GlobalMessageService;
    protected authRedirectService: AuthRedirectService;
    /**
     * Starts the refresh of the access token
     */
    protected refreshTokenTrigger$: Subject<AuthToken>;
    /**
     * Internal token streams which reads the latest from the storage.
     * Emits the token or `undefined`
     */
    protected token$: Observable<AuthToken | undefined>;
    /**
     * Compares the previous and the new token in order to stop the refresh or logout processes
     */
    protected stopProgress$: Observable<[AuthToken | undefined, AuthToken | undefined]>;
    /**
     * Refreshes the token only if currently there's no refresh nor logout in progress.
     * If the refresh token is not present, it triggers the logout process
     */
    protected refreshToken$: Observable<[AuthToken, boolean, boolean]>;
    /**
     * Kicks of the process by listening to the new token and refresh token processes.
     * This token should be used when retrying the failed http request.
     */
    protected tokenToRetryRequest$: Observable<AuthToken | undefined>;
    protected subscriptions: Subscription;
    constructor(authService: AuthService, authStorageService: AuthStorageService, oAuthLibWrapperService: OAuthLibWrapperService, routingService: RoutingService, occEndpoints: OccEndpointsService, globalMessageService: GlobalMessageService, authRedirectService: AuthRedirectService);
    /**
     * Checks if request should be handled by this service (if it's OCC call).
     */
    shouldCatchError(request: HttpRequest<any>): boolean;
    shouldAddAuthorizationHeader(request: HttpRequest<any>): boolean;
    /**
     * Adds `Authorization` header for OCC calls.
     */
    alterRequest(request: HttpRequest<any>, token?: AuthToken): HttpRequest<any>;
    protected isOccUrl(url: string): boolean;
    protected isBaseSitesRequest(request: HttpRequest<any>): boolean;
    protected getAuthorizationHeader(request: HttpRequest<any>): string | null;
    protected createAuthorizationHeader(token?: AuthToken): {
        Authorization: string;
    } | {};
    /**
     * Refreshes access_token and then retries the call with the new token.
     */
    handleExpiredAccessToken(request: HttpRequest<any>, next: HttpHandler, initialToken: AuthToken | undefined): Observable<HttpEvent<AuthToken>>;
    /**
     * Logout user, redirected to login page and informs about expired session.
     */
    handleExpiredRefreshToken(): void;
    /**
     * Emits the token or `undefined` only when the refresh or the logout processes are finished.
     */
    getStableToken(): Observable<AuthToken | undefined>;
    /**
     * Returns a valid access token.
     * It will attempt to refresh it if the current one expired; emits after the new one is retrieved.
     */
    protected getValidToken(requestToken: AuthToken | undefined): Observable<AuthToken | undefined>;
    protected createNewRequestWithNewToken(request: HttpRequest<any>, token: AuthToken): HttpRequest<any>;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthHttpHeaderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthHttpHeaderService>;
}
