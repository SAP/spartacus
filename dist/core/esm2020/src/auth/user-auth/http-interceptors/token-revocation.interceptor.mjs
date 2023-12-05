import { Injectable } from '@angular/core';
import { switchMap, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../services/auth-storage.service";
import * as i2 from "../services/auth-config.service";
/**
 * This interceptor is dedicated for Hybris OAuth server which requires `Authorization` header for revoke token calls.
 */
export class TokenRevocationInterceptor {
    constructor(authStorageService, authConfigService) {
        this.authStorageService = authStorageService;
        this.authConfigService = authConfigService;
    }
    intercept(request, next) {
        const isTokenRevocationRequest = this.isTokenRevocationRequest(request);
        return this.authStorageService.getToken().pipe(take(1), switchMap((token) => {
            if (isTokenRevocationRequest) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `${token.token_type || 'Bearer'} ${token.access_token}`,
                    },
                });
            }
            return next.handle(request);
        }));
    }
    isTokenRevocationRequest(request) {
        return request.url === this.authConfigService.getRevokeEndpoint();
    }
}
TokenRevocationInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TokenRevocationInterceptor, deps: [{ token: i1.AuthStorageService }, { token: i2.AuthConfigService }], target: i0.ɵɵFactoryTarget.Injectable });
TokenRevocationInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TokenRevocationInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TokenRevocationInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.AuthStorageService }, { type: i2.AuthConfigService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4tcmV2b2NhdGlvbi5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2F1dGgvdXNlci1hdXRoL2h0dHAtaW50ZXJjZXB0b3JzL3Rva2VuLXJldm9jYXRpb24uaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBWUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBSWpEOztHQUVHO0FBRUgsTUFBTSxPQUFPLDBCQUEwQjtJQUNyQyxZQUNZLGtCQUFzQyxFQUN0QyxpQkFBb0M7UUFEcEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO0lBQzdDLENBQUM7SUFFSixTQUFTLENBQ1AsT0FBeUIsRUFDekIsSUFBaUI7UUFFakIsTUFBTSx3QkFBd0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEUsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUM1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDbEIsSUFBSSx3QkFBd0IsRUFBRTtnQkFDNUIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7b0JBQ3RCLFVBQVUsRUFBRTt3QkFDVixhQUFhLEVBQUUsR0FBRyxLQUFLLENBQUMsVUFBVSxJQUFJLFFBQVEsSUFDNUMsS0FBSyxDQUFDLFlBQ1IsRUFBRTtxQkFDSDtpQkFDRixDQUFDLENBQUM7YUFDSjtZQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVTLHdCQUF3QixDQUFDLE9BQXlCO1FBQzFELE9BQU8sT0FBTyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUNwRSxDQUFDOzt1SEE5QlUsMEJBQTBCOzJIQUExQiwwQkFBMEIsY0FEYixNQUFNOzJGQUNuQiwwQkFBMEI7a0JBRHRDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgSHR0cEV2ZW50LFxuICBIdHRwSGFuZGxlcixcbiAgSHR0cEludGVyY2VwdG9yLFxuICBIdHRwUmVxdWVzdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQXV0aENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRoLWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2F1dGgtc3RvcmFnZS5zZXJ2aWNlJztcblxuLyoqXG4gKiBUaGlzIGludGVyY2VwdG9yIGlzIGRlZGljYXRlZCBmb3IgSHlicmlzIE9BdXRoIHNlcnZlciB3aGljaCByZXF1aXJlcyBgQXV0aG9yaXphdGlvbmAgaGVhZGVyIGZvciByZXZva2UgdG9rZW4gY2FsbHMuXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgVG9rZW5SZXZvY2F0aW9uSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYXV0aFN0b3JhZ2VTZXJ2aWNlOiBBdXRoU3RvcmFnZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGF1dGhDb25maWdTZXJ2aWNlOiBBdXRoQ29uZmlnU2VydmljZVxuICApIHt9XG5cbiAgaW50ZXJjZXB0KFxuICAgIHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sXG4gICAgbmV4dDogSHR0cEhhbmRsZXJcbiAgKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIGNvbnN0IGlzVG9rZW5SZXZvY2F0aW9uUmVxdWVzdCA9IHRoaXMuaXNUb2tlblJldm9jYXRpb25SZXF1ZXN0KHJlcXVlc3QpO1xuICAgIHJldHVybiB0aGlzLmF1dGhTdG9yYWdlU2VydmljZS5nZXRUb2tlbigpLnBpcGUoXG4gICAgICB0YWtlKDEpLFxuICAgICAgc3dpdGNoTWFwKCh0b2tlbikgPT4ge1xuICAgICAgICBpZiAoaXNUb2tlblJldm9jYXRpb25SZXF1ZXN0KSB7XG4gICAgICAgICAgcmVxdWVzdCA9IHJlcXVlc3QuY2xvbmUoe1xuICAgICAgICAgICAgc2V0SGVhZGVyczoge1xuICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgJHt0b2tlbi50b2tlbl90eXBlIHx8ICdCZWFyZXInfSAke1xuICAgICAgICAgICAgICAgIHRva2VuLmFjY2Vzc190b2tlblxuICAgICAgICAgICAgICB9YCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcXVlc3QpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzVG9rZW5SZXZvY2F0aW9uUmVxdWVzdChyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHJlcXVlc3QudXJsID09PSB0aGlzLmF1dGhDb25maWdTZXJ2aWNlLmdldFJldm9rZUVuZHBvaW50KCk7XG4gIH1cbn1cbiJdfQ==