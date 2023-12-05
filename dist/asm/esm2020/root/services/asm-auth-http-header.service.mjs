import { Injectable } from '@angular/core';
import { AuthHttpHeaderService, GlobalMessageType, InterceptorUtil, USE_CUSTOMER_SUPPORT_AGENT_TOKEN, } from '@spartacus/core';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "./csagent-auth.service";
/**
 * Overrides `AuthHttpHeaderService` to handle asm calls as well (not only OCC)
 * in cases of normal user session and on customer emulation.
 */
export class AsmAuthHttpHeaderService extends AuthHttpHeaderService {
    constructor(authService, authStorageService, csAgentAuthService, oAuthLibWrapperService, routingService, globalMessageService, occEndpointsService, authRedirectService) {
        super(authService, authStorageService, oAuthLibWrapperService, routingService, occEndpointsService, globalMessageService, authRedirectService);
        this.authService = authService;
        this.authStorageService = authStorageService;
        this.csAgentAuthService = csAgentAuthService;
        this.oAuthLibWrapperService = oAuthLibWrapperService;
        this.routingService = routingService;
        this.globalMessageService = globalMessageService;
        this.occEndpointsService = occEndpointsService;
        this.authRedirectService = authRedirectService;
    }
    /**
     * Checks if the authorization header should be added to the request
     *
     *  @override
     */
    shouldAddAuthorizationHeader(request) {
        return (super.shouldAddAuthorizationHeader(request) ||
            this.isCSAgentTokenRequest(request));
    }
    /**
     * @override
     *
     * Checks if particular request should be handled by this service.
     */
    shouldCatchError(request) {
        return (super.shouldCatchError(request) || this.isCSAgentTokenRequest(request));
    }
    /**
     * @override
     *
     * Adds `Authorization` header to occ and CS agent requests.
     * For CS agent requests also removes the `cx-use-csagent-token` header (to avoid problems with CORS).
     */
    alterRequest(request, token) {
        const hasAuthorizationHeader = !!this.getAuthorizationHeader(request);
        const isCSAgentRequest = this.isCSAgentTokenRequest(request);
        let req = super.alterRequest(request, token);
        if (!hasAuthorizationHeader && isCSAgentRequest) {
            req = request.clone({
                setHeaders: {
                    ...this.createAuthorizationHeader(token),
                },
            });
            return InterceptorUtil.removeHeader(USE_CUSTOMER_SUPPORT_AGENT_TOKEN, req);
        }
        return req;
    }
    isCSAgentTokenRequest(request) {
        const isRequestWithCSAgentToken = InterceptorUtil.getInterceptorParam(USE_CUSTOMER_SUPPORT_AGENT_TOKEN, request.headers);
        return Boolean(isRequestWithCSAgentToken);
    }
    /**
     * @override
     *
     * On backend errors indicating expired `refresh_token` we need to logout
     * currently logged in user and CS agent.
     */
    handleExpiredRefreshToken() {
        this.csAgentAuthService
            .isCustomerSupportAgentLoggedIn()
            .pipe(take(1))
            .subscribe((csAgentLoggedIn) => {
            if (csAgentLoggedIn) {
                this.authService.setLogoutProgress(true);
                this.csAgentAuthService.logoutCustomerSupportAgent();
                this.globalMessageService.add({
                    key: 'asm.csagentTokenExpired',
                }, GlobalMessageType.MSG_TYPE_ERROR);
            }
            else {
                super.handleExpiredRefreshToken();
            }
        });
    }
}
AsmAuthHttpHeaderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmAuthHttpHeaderService, deps: [{ token: i1.AuthService }, { token: i1.AuthStorageService }, { token: i2.CsAgentAuthService }, { token: i1.OAuthLibWrapperService }, { token: i1.RoutingService }, { token: i1.GlobalMessageService }, { token: i1.OccEndpointsService }, { token: i1.AuthRedirectService }], target: i0.ɵɵFactoryTarget.Injectable });
AsmAuthHttpHeaderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmAuthHttpHeaderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmAuthHttpHeaderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.AuthService }, { type: i1.AuthStorageService }, { type: i2.CsAgentAuthService }, { type: i1.OAuthLibWrapperService }, { type: i1.RoutingService }, { type: i1.GlobalMessageService }, { type: i1.OccEndpointsService }, { type: i1.AuthRedirectService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWF1dGgtaHR0cC1oZWFkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vcm9vdC9zZXJ2aWNlcy9hc20tYXV0aC1odHRwLWhlYWRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUNMLHFCQUFxQixFQU1yQixpQkFBaUIsRUFDakIsZUFBZSxFQUlmLGdDQUFnQyxHQUNqQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUd0Qzs7O0dBR0c7QUFJSCxNQUFNLE9BQU8sd0JBQXlCLFNBQVEscUJBQXFCO0lBQ2pFLFlBQ1ksV0FBd0IsRUFDeEIsa0JBQXNDLEVBQ3RDLGtCQUFzQyxFQUN0QyxzQkFBOEMsRUFDOUMsY0FBOEIsRUFDOUIsb0JBQTBDLEVBQzFDLG1CQUF3QyxFQUN4QyxtQkFBd0M7UUFFbEQsS0FBSyxDQUNILFdBQVcsRUFDWCxrQkFBa0IsRUFDbEIsc0JBQXNCLEVBQ3RCLGNBQWMsRUFDZCxtQkFBbUIsRUFDbkIsb0JBQW9CLEVBQ3BCLG1CQUFtQixDQUNwQixDQUFDO1FBakJRLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQzlDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtJQVdwRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLDRCQUE0QixDQUFDLE9BQXlCO1FBQzNELE9BQU8sQ0FDTCxLQUFLLENBQUMsNEJBQTRCLENBQUMsT0FBTyxDQUFDO1lBQzNDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FDcEMsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksZ0JBQWdCLENBQUMsT0FBeUI7UUFDL0MsT0FBTyxDQUNMLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQ3ZFLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxZQUFZLENBQ2pCLE9BQXlCLEVBQ3pCLEtBQWlCO1FBRWpCLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0RSxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU3RCxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUU3QyxJQUFJLENBQUMsc0JBQXNCLElBQUksZ0JBQWdCLEVBQUU7WUFDL0MsR0FBRyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ2xCLFVBQVUsRUFBRTtvQkFDVixHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLENBQUM7aUJBQ3pDO2FBQ0YsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxlQUFlLENBQUMsWUFBWSxDQUNqQyxnQ0FBZ0MsRUFDaEMsR0FBRyxDQUNKLENBQUM7U0FDSDtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVTLHFCQUFxQixDQUFDLE9BQXlCO1FBQ3ZELE1BQU0seUJBQXlCLEdBQUcsZUFBZSxDQUFDLG1CQUFtQixDQUNuRSxnQ0FBZ0MsRUFDaEMsT0FBTyxDQUFDLE9BQU8sQ0FDaEIsQ0FBQztRQUNGLE9BQU8sT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0kseUJBQXlCO1FBQzlCLElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsOEJBQThCLEVBQUU7YUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNiLFNBQVMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQzdCLElBQUksZUFBZSxFQUFFO2dCQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztnQkFDckQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FDM0I7b0JBQ0UsR0FBRyxFQUFFLHlCQUF5QjtpQkFDL0IsRUFDRCxpQkFBaUIsQ0FBQyxjQUFjLENBQ2pDLENBQUM7YUFDSDtpQkFBTTtnQkFDTCxLQUFLLENBQUMseUJBQXlCLEVBQUUsQ0FBQzthQUNuQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7cUhBMUdVLHdCQUF3Qjt5SEFBeEIsd0JBQXdCLGNBRnZCLE1BQU07MkZBRVAsd0JBQXdCO2tCQUhwQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEh0dHBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQXV0aEh0dHBIZWFkZXJTZXJ2aWNlLFxuICBBdXRoUmVkaXJlY3RTZXJ2aWNlLFxuICBBdXRoU2VydmljZSxcbiAgQXV0aFN0b3JhZ2VTZXJ2aWNlLFxuICBBdXRoVG9rZW4sXG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlVHlwZSxcbiAgSW50ZXJjZXB0b3JVdGlsLFxuICBPQXV0aExpYldyYXBwZXJTZXJ2aWNlLFxuICBPY2NFbmRwb2ludHNTZXJ2aWNlLFxuICBSb3V0aW5nU2VydmljZSxcbiAgVVNFX0NVU1RPTUVSX1NVUFBPUlRfQUdFTlRfVE9LRU4sXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ3NBZ2VudEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9jc2FnZW50LWF1dGguc2VydmljZSc7XG5cbi8qKlxuICogT3ZlcnJpZGVzIGBBdXRoSHR0cEhlYWRlclNlcnZpY2VgIHRvIGhhbmRsZSBhc20gY2FsbHMgYXMgd2VsbCAobm90IG9ubHkgT0NDKVxuICogaW4gY2FzZXMgb2Ygbm9ybWFsIHVzZXIgc2Vzc2lvbiBhbmQgb24gY3VzdG9tZXIgZW11bGF0aW9uLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQXNtQXV0aEh0dHBIZWFkZXJTZXJ2aWNlIGV4dGVuZHMgQXV0aEh0dHBIZWFkZXJTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYXV0aFN0b3JhZ2VTZXJ2aWNlOiBBdXRoU3RvcmFnZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNzQWdlbnRBdXRoU2VydmljZTogQ3NBZ2VudEF1dGhTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBvQXV0aExpYldyYXBwZXJTZXJ2aWNlOiBPQXV0aExpYldyYXBwZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGdsb2JhbE1lc3NhZ2VTZXJ2aWNlOiBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgb2NjRW5kcG9pbnRzU2VydmljZTogT2NjRW5kcG9pbnRzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYXV0aFJlZGlyZWN0U2VydmljZTogQXV0aFJlZGlyZWN0U2VydmljZVxuICApIHtcbiAgICBzdXBlcihcbiAgICAgIGF1dGhTZXJ2aWNlLFxuICAgICAgYXV0aFN0b3JhZ2VTZXJ2aWNlLFxuICAgICAgb0F1dGhMaWJXcmFwcGVyU2VydmljZSxcbiAgICAgIHJvdXRpbmdTZXJ2aWNlLFxuICAgICAgb2NjRW5kcG9pbnRzU2VydmljZSxcbiAgICAgIGdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICAgICAgYXV0aFJlZGlyZWN0U2VydmljZVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBhdXRob3JpemF0aW9uIGhlYWRlciBzaG91bGQgYmUgYWRkZWQgdG8gdGhlIHJlcXVlc3RcbiAgICpcbiAgICogIEBvdmVycmlkZVxuICAgKi9cbiAgcHVibGljIHNob3VsZEFkZEF1dGhvcml6YXRpb25IZWFkZXIocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55Pik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBzdXBlci5zaG91bGRBZGRBdXRob3JpemF0aW9uSGVhZGVyKHJlcXVlc3QpIHx8XG4gICAgICB0aGlzLmlzQ1NBZ2VudFRva2VuUmVxdWVzdChyZXF1ZXN0KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqXG4gICAqIENoZWNrcyBpZiBwYXJ0aWN1bGFyIHJlcXVlc3Qgc2hvdWxkIGJlIGhhbmRsZWQgYnkgdGhpcyBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIHNob3VsZENhdGNoRXJyb3IocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55Pik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBzdXBlci5zaG91bGRDYXRjaEVycm9yKHJlcXVlc3QpIHx8IHRoaXMuaXNDU0FnZW50VG9rZW5SZXF1ZXN0KHJlcXVlc3QpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICpcbiAgICogQWRkcyBgQXV0aG9yaXphdGlvbmAgaGVhZGVyIHRvIG9jYyBhbmQgQ1MgYWdlbnQgcmVxdWVzdHMuXG4gICAqIEZvciBDUyBhZ2VudCByZXF1ZXN0cyBhbHNvIHJlbW92ZXMgdGhlIGBjeC11c2UtY3NhZ2VudC10b2tlbmAgaGVhZGVyICh0byBhdm9pZCBwcm9ibGVtcyB3aXRoIENPUlMpLlxuICAgKi9cbiAgcHVibGljIGFsdGVyUmVxdWVzdChcbiAgICByZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LFxuICAgIHRva2VuPzogQXV0aFRva2VuXG4gICk6IEh0dHBSZXF1ZXN0PGFueT4ge1xuICAgIGNvbnN0IGhhc0F1dGhvcml6YXRpb25IZWFkZXIgPSAhIXRoaXMuZ2V0QXV0aG9yaXphdGlvbkhlYWRlcihyZXF1ZXN0KTtcbiAgICBjb25zdCBpc0NTQWdlbnRSZXF1ZXN0ID0gdGhpcy5pc0NTQWdlbnRUb2tlblJlcXVlc3QocmVxdWVzdCk7XG5cbiAgICBsZXQgcmVxID0gc3VwZXIuYWx0ZXJSZXF1ZXN0KHJlcXVlc3QsIHRva2VuKTtcblxuICAgIGlmICghaGFzQXV0aG9yaXphdGlvbkhlYWRlciAmJiBpc0NTQWdlbnRSZXF1ZXN0KSB7XG4gICAgICByZXEgPSByZXF1ZXN0LmNsb25lKHtcbiAgICAgICAgc2V0SGVhZGVyczoge1xuICAgICAgICAgIC4uLnRoaXMuY3JlYXRlQXV0aG9yaXphdGlvbkhlYWRlcih0b2tlbiksXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBJbnRlcmNlcHRvclV0aWwucmVtb3ZlSGVhZGVyKFxuICAgICAgICBVU0VfQ1VTVE9NRVJfU1VQUE9SVF9BR0VOVF9UT0tFTixcbiAgICAgICAgcmVxXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gcmVxO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzQ1NBZ2VudFRva2VuUmVxdWVzdChyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+KTogYm9vbGVhbiB7XG4gICAgY29uc3QgaXNSZXF1ZXN0V2l0aENTQWdlbnRUb2tlbiA9IEludGVyY2VwdG9yVXRpbC5nZXRJbnRlcmNlcHRvclBhcmFtKFxuICAgICAgVVNFX0NVU1RPTUVSX1NVUFBPUlRfQUdFTlRfVE9LRU4sXG4gICAgICByZXF1ZXN0LmhlYWRlcnNcbiAgICApO1xuICAgIHJldHVybiBCb29sZWFuKGlzUmVxdWVzdFdpdGhDU0FnZW50VG9rZW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKlxuICAgKiBPbiBiYWNrZW5kIGVycm9ycyBpbmRpY2F0aW5nIGV4cGlyZWQgYHJlZnJlc2hfdG9rZW5gIHdlIG5lZWQgdG8gbG9nb3V0XG4gICAqIGN1cnJlbnRseSBsb2dnZWQgaW4gdXNlciBhbmQgQ1MgYWdlbnQuXG4gICAqL1xuICBwdWJsaWMgaGFuZGxlRXhwaXJlZFJlZnJlc2hUb2tlbigpOiB2b2lkIHtcbiAgICB0aGlzLmNzQWdlbnRBdXRoU2VydmljZVxuICAgICAgLmlzQ3VzdG9tZXJTdXBwb3J0QWdlbnRMb2dnZWRJbigpXG4gICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgoY3NBZ2VudExvZ2dlZEluKSA9PiB7XG4gICAgICAgIGlmIChjc0FnZW50TG9nZ2VkSW4pIHtcbiAgICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnNldExvZ291dFByb2dyZXNzKHRydWUpO1xuICAgICAgICAgIHRoaXMuY3NBZ2VudEF1dGhTZXJ2aWNlLmxvZ291dEN1c3RvbWVyU3VwcG9ydEFnZW50KCk7XG4gICAgICAgICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGtleTogJ2FzbS5jc2FnZW50VG9rZW5FeHBpcmVkJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9FUlJPUlxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwZXIuaGFuZGxlRXhwaXJlZFJlZnJlc2hUb2tlbigpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxufVxuIl19