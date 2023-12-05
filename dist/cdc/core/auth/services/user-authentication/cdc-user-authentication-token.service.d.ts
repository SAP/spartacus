import { HttpClient } from '@angular/common/http';
import { AuthConfigService, AuthToken } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CdcUserAuthenticationTokenService {
    protected http: HttpClient;
    protected authConfigService: AuthConfigService;
    constructor(http: HttpClient, authConfigService: AuthConfigService);
    /**
     * Load User token using custom oauth flow
     *
     * @param UID - UID received from CDC on login event
     * @param UIDSignature - UIDSignature received from CDC on login event
     * @param signatureTimestamp - signatureTimestamp received from CDC on login event
     * @param idToken - idToken received from CDC on login event
     * @param baseSite - baseSite received from CDC on login event
     */
    loadTokenUsingCustomFlow(UID: string, UIDSignature: string, signatureTimestamp: string, idToken: string, baseSite: string): Observable<Partial<AuthToken> & {
        expires_in?: number;
    }>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdcUserAuthenticationTokenService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CdcUserAuthenticationTokenService>;
}
