import { AuthStorageService, AuthToken } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Indicates if auth token is for regular user or CS Agent.
 */
export declare enum TokenTarget {
    CSAgent = "CSAgent",
    User = "User"
}
/**
 * With AsmAuthStorageService apart from storing the token we also need to store
 * information for which user is the token (regular user or CS Agent).
 *
 * Overrides `AuthStorageService`.
 */
export declare class AsmAuthStorageService extends AuthStorageService {
    protected _tokenTarget$: Observable<TokenTarget>;
    /**
     * When CS Agent logs in during regular user session we store the regular
     * user token to restore the session after CS Agent logout.
     *
     * This supports in-store use case when CS Agent want's to quickly help
     * customer and then give an option to customer to continue the process.
     */
    protected emulatedUserToken?: AuthToken;
    /**
     * Get target user for current auth token.
     *
     * @return observable with TokenTarget
     */
    getTokenTarget(): Observable<TokenTarget>;
    /**
     * Set new token target.
     *
     * @param tokenTarget
     */
    setTokenTarget(tokenTarget: TokenTarget): void;
    /**
     * Get token for previously user session, when it was interrupted by CS agent login.
     *
     * @return previously logged in user token.
     */
    getEmulatedUserToken(): AuthToken | undefined;
    /**
     * Save user token on CS agent login.
     *
     * @param token
     */
    setEmulatedUserToken(token: AuthToken): void;
    /**
     * Change token target to CS Agent.
     */
    switchTokenTargetToCSAgent(): void;
    /**
     * Change token target to user.
     */
    switchTokenTargetToUser(): void;
    /**
     * When we start emulation from the UI (not by ASM login) we can't restore user session on cs agent logout.
     * Only available solution is to drop session we could restore, to avoid account hijack.
     */
    clearEmulatedUserToken(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmAuthStorageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AsmAuthStorageService>;
}
