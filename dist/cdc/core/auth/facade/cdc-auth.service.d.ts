import { Store } from '@ngrx/store';
import { CdcAuthFacade } from '@spartacus/cdc/root';
import { AuthRedirectService, AuthStorageService, AuthToken, GlobalMessageService, UserIdService } from '@spartacus/core';
import * as i0 from "@angular/core";
/**
 * Service to support custom CDC OAuth flow.
 */
export declare class CdcAuthService implements CdcAuthFacade {
    protected store: Store;
    protected authStorageService: AuthStorageService;
    protected userIdService: UserIdService;
    protected globalMessageService: GlobalMessageService;
    protected authRedirectService: AuthRedirectService;
    constructor(store: Store, authStorageService: AuthStorageService, userIdService: UserIdService, globalMessageService: GlobalMessageService, authRedirectService: AuthRedirectService);
    /**
     * Loads a new user token using custom oauth flow
     *
     * @param UID
     * @param UIDSignature
     * @param signatureTimestamp
     * @param idToken
     * @param baseSite
     */
    loginWithCustomCdcFlow(UID: string, UIDSignature: string, signatureTimestamp: string, idToken: string, baseSite: string): void;
    /**
     * Utility to differentiate between AuthStorageService and AsmAuthStorageService
     */
    private isAsmAuthStorageService;
    /**
     * Transform and store the token received from custom flow to library format and login user.
     *
     * @param token
     */
    loginWithToken(token: Partial<AuthToken> & {
        expires_in?: number;
    }): void;
    protected setTokenData(token: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdcAuthService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CdcAuthService>;
}
