import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RoutingService } from '../../../routing/facade/routing.service';
import { StateWithClientAuth } from '../../client-auth/store/client-auth-state';
import { AuthMultisiteIsolationService } from '../services/auth-multisite-isolation.service';
import { AuthRedirectService } from '../services/auth-redirect.service';
import { AuthStorageService } from '../services/auth-storage.service';
import { OAuthLibWrapperService } from '../services/oauth-lib-wrapper.service';
import { UserIdService } from './user-id.service';
import * as i0 from "@angular/core";
/**
 * Auth service for normal user authentication.
 * Use to check auth status, login/logout with different OAuth flows.
 */
export declare class AuthService {
    protected store: Store<StateWithClientAuth>;
    protected userIdService: UserIdService;
    protected oAuthLibWrapperService: OAuthLibWrapperService;
    protected authStorageService: AuthStorageService;
    protected authRedirectService: AuthRedirectService;
    protected routingService: RoutingService;
    protected authMultisiteIsolationService?: AuthMultisiteIsolationService | undefined;
    /**
     * Indicates whether the access token is being refreshed
     */
    refreshInProgress$: Observable<boolean>;
    /**
     * Indicates whether the logout is being performed
     */
    logoutInProgress$: Observable<boolean>;
    constructor(store: Store<StateWithClientAuth>, userIdService: UserIdService, oAuthLibWrapperService: OAuthLibWrapperService, authStorageService: AuthStorageService, authRedirectService: AuthRedirectService, routingService: RoutingService, authMultisiteIsolationService?: AuthMultisiteIsolationService | undefined);
    /**
     * Check params in url and if there is an code/token then try to login with those.
     */
    checkOAuthParamsInUrl(): Promise<void>;
    /**
     * Initialize Implicit/Authorization Code flow by redirecting to OAuth server.
     */
    loginWithRedirect(): boolean;
    /**
     * Loads a new user token with Resource Owner Password Flow.
     * @param userId
     * @param password
     */
    loginWithCredentials(userId: string, password: string): Promise<void>;
    /**
     * Revokes tokens and clears state for logged user (tokens, userId).
     * To perform logout it is best to use `logout` method. Use this method with caution.
     */
    coreLogout(): Promise<void>;
    /**
     * Returns `true` if the user is logged in; and `false` if the user is anonymous.
     */
    isUserLoggedIn(): Observable<boolean>;
    /**
     * Logout a storefront customer. It will initialize logout procedure by redirecting to the `logout` endpoint.
     */
    logout(): void;
    /**
     * Start or stop the refresh process
     */
    setRefreshProgress(progress: boolean): void;
    /**
     * Start or stop the logout process
     */
    setLogoutProgress(progress: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthService>;
}
