import { OAuthEvent, OAuthService, TokenResponse } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { WindowRef } from '../../../window/window-ref';
import { OAuthTryLoginResult } from '../models/oauth-try-login-response';
import { AuthConfigService } from './auth-config.service';
import * as i0 from "@angular/core";
/**
 * Wrapper service on the library OAuthService. Normalizes the lib API for services.
 * Use this service when you want to access low level OAuth library methods.
 */
export declare class OAuthLibWrapperService {
    protected oAuthService: OAuthService;
    protected authConfigService: AuthConfigService;
    protected platformId: Object;
    protected winRef: WindowRef;
    events$: Observable<OAuthEvent>;
    constructor(oAuthService: OAuthService, authConfigService: AuthConfigService, platformId: Object, winRef: WindowRef);
    protected initialize(): void;
    /**
     * Authorize with ResourceOwnerPasswordFlow.
     *
     * @param userId
     * @param password
     *
     * @return token response from the lib
     */
    authorizeWithPasswordFlow(userId: string, password: string): Promise<TokenResponse>;
    /**
     * Refresh access_token.
     */
    refreshToken(): void;
    /**
     * Revoke access tokens and clear tokens in lib state.
     */
    revokeAndLogout(): Promise<void>;
    /**
     * Clear tokens in library state (no revocation).
     */
    logout(): void;
    /**
     * Returns Open Id token. Might be empty, when it was not requested with the `responseType` config.
     *
     * @return id token
     */
    getIdToken(): string;
    /**
     * Initialize Implicit Flow or Authorization Code flows with the redirect to OAuth login url.
     */
    initLoginFlow(): void;
    /**
     * Tries to login user based on `code` or `token` present in the url.
     *
     * @param result The result returned by `OAuthService.tryLogin()`.
     *
     * @param tokenReceived Whether the event 'token_received' is emitted during `OAuthService.tryLogin()`.
     * We can use this identify that we have returned from an external authorization page to Spartacus).
     * In cases where we don't receive this event, the token has been obtained from storage.
     */
    tryLogin(): Promise<OAuthTryLoginResult>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OAuthLibWrapperService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OAuthLibWrapperService>;
}
