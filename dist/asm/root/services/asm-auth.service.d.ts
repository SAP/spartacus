import { Store } from '@ngrx/store';
import { AuthMultisiteIsolationService, AuthRedirectService, AuthService, GlobalMessageService, OAuthLibWrapperService, RoutingService, StateWithClientAuth, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { AsmAuthStorageService } from './asm-auth-storage.service';
import * as i0 from "@angular/core";
/**
 * Version of AuthService that is working for both user na CS agent.
 * Overrides AuthService when ASM module is enabled.
 */
export declare class AsmAuthService extends AuthService {
    protected store: Store<StateWithClientAuth>;
    protected userIdService: UserIdService;
    protected oAuthLibWrapperService: OAuthLibWrapperService;
    protected authStorageService: AsmAuthStorageService;
    protected authRedirectService: AuthRedirectService;
    protected globalMessageService: GlobalMessageService;
    protected routingService: RoutingService;
    protected authMultisiteIsolationService?: AuthMultisiteIsolationService | undefined;
    constructor(store: Store<StateWithClientAuth>, userIdService: UserIdService, oAuthLibWrapperService: OAuthLibWrapperService, authStorageService: AsmAuthStorageService, authRedirectService: AuthRedirectService, globalMessageService: GlobalMessageService, routingService: RoutingService, authMultisiteIsolationService?: AuthMultisiteIsolationService | undefined);
    protected canUserLogin(): boolean;
    protected warnAboutLoggedCSAgent(): void;
    /**
     * Loads a new user token with Resource Owner Password Flow when CS agent is not logged in.
     * @param userId
     * @param password
     */
    loginWithCredentials(userId: string, password: string): Promise<void>;
    /**
     * Initialize Implicit/Authorization Code flow by redirecting to OAuth server when CS agent is not logged in.
     */
    loginWithRedirect(): boolean;
    /**
     * Revokes tokens and clears state for logged user (tokens, userId).
     * To perform logout it is best to use `logout` method. Use this method with caution.
     */
    coreLogout(): Promise<any>;
    /**
     * Returns `true` if user is logged in or being emulated.
     */
    isUserLoggedIn(): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmAuthService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AsmAuthService>;
}
