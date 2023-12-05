import { AuthToken } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare abstract class CdcAuthFacade {
    abstract loginWithCustomCdcFlow(UID: string, UIDSignature: string, signatureTimestamp: string, idToken: string, baseSite: string): void;
    abstract loginWithToken(token: Partial<AuthToken> & {
        expires_in?: number;
    }): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdcAuthFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CdcAuthFacade>;
}
