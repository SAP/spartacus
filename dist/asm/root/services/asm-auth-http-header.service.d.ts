import { HttpRequest } from '@angular/common/http';
import { AuthHttpHeaderService, AuthRedirectService, AuthService, AuthStorageService, AuthToken, GlobalMessageService, OAuthLibWrapperService, OccEndpointsService, RoutingService } from '@spartacus/core';
import { CsAgentAuthService } from './csagent-auth.service';
import * as i0 from "@angular/core";
/**
 * Overrides `AuthHttpHeaderService` to handle asm calls as well (not only OCC)
 * in cases of normal user session and on customer emulation.
 */
export declare class AsmAuthHttpHeaderService extends AuthHttpHeaderService {
    protected authService: AuthService;
    protected authStorageService: AuthStorageService;
    protected csAgentAuthService: CsAgentAuthService;
    protected oAuthLibWrapperService: OAuthLibWrapperService;
    protected routingService: RoutingService;
    protected globalMessageService: GlobalMessageService;
    protected occEndpointsService: OccEndpointsService;
    protected authRedirectService: AuthRedirectService;
    constructor(authService: AuthService, authStorageService: AuthStorageService, csAgentAuthService: CsAgentAuthService, oAuthLibWrapperService: OAuthLibWrapperService, routingService: RoutingService, globalMessageService: GlobalMessageService, occEndpointsService: OccEndpointsService, authRedirectService: AuthRedirectService);
    /**
     * Checks if the authorization header should be added to the request
     *
     *  @override
     */
    shouldAddAuthorizationHeader(request: HttpRequest<any>): boolean;
    /**
     * @override
     *
     * Checks if particular request should be handled by this service.
     */
    shouldCatchError(request: HttpRequest<any>): boolean;
    /**
     * @override
     *
     * Adds `Authorization` header to occ and CS agent requests.
     * For CS agent requests also removes the `cx-use-csagent-token` header (to avoid problems with CORS).
     */
    alterRequest(request: HttpRequest<any>, token?: AuthToken): HttpRequest<any>;
    protected isCSAgentTokenRequest(request: HttpRequest<any>): boolean;
    /**
     * @override
     *
     * On backend errors indicating expired `refresh_token` we need to logout
     * currently logged in user and CS agent.
     */
    handleExpiredRefreshToken(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmAuthHttpHeaderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AsmAuthHttpHeaderService>;
}
