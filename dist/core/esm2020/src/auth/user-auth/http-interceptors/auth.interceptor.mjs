import { Injectable } from '@angular/core';
import { EMPTY, of, throwError } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../services/auth-http-header.service";
import * as i2 from "../services/auth-config.service";
/**
 * Responsible for catching auth errors and providing `Authorization` header for API calls.
 * Uses AuthHttpHeaderService for request manipulation and error handling. Interceptor only hooks into request send/received events.
 */
export class AuthInterceptor {
    constructor(authHttpHeaderService, authConfigService) {
        this.authHttpHeaderService = authHttpHeaderService;
        this.authConfigService = authConfigService;
    }
    intercept(httpRequest, next) {
        const shouldCatchError = this.authHttpHeaderService.shouldCatchError(httpRequest);
        const shouldAddAuthorizationHeader = this.authHttpHeaderService.shouldAddAuthorizationHeader(httpRequest);
        const token$ = shouldAddAuthorizationHeader
            ? // emits sync, unless there is refresh or logout in progress, in which case it emits async
                this.authHttpHeaderService.getStableToken().pipe(take(1))
            : of(undefined);
        const requestAndToken$ = token$.pipe(map((token) => ({
            token,
            request: this.authHttpHeaderService.alterRequest(httpRequest, token),
        })));
        return requestAndToken$.pipe(switchMap(({ request, token }) => next.handle(request).pipe(catchError((errResponse) => {
            switch (errResponse.status) {
                case 401: // Unauthorized
                    if (this.isExpiredToken(errResponse) && shouldCatchError) {
                        // request failed because of the expired access token
                        // we should get refresh the token and retry the request, or logout if the refresh is missing / expired
                        return this.authHttpHeaderService.handleExpiredAccessToken(request, next, token);
                    }
                    else if (
                    // Refresh the expired token
                    // Check if the OAuth endpoint was called and the error is because the refresh token expired
                    this.errorIsInvalidToken(errResponse)) {
                        this.authHttpHeaderService.handleExpiredRefreshToken();
                        return EMPTY;
                    }
                    break;
                case 400: // Bad Request
                    if (this.errorIsInvalidGrant(errResponse) &&
                        request.body.get('grant_type') === 'refresh_token') {
                        this.authHttpHeaderService.handleExpiredRefreshToken();
                    }
                    break;
            }
            return throwError(errResponse);
        }))));
    }
    errorIsInvalidToken(errResponse) {
        return ((errResponse.url?.includes(this.authConfigService.getTokenEndpoint()) &&
            errResponse.error.error === 'invalid_token') ??
            false);
    }
    errorIsInvalidGrant(errResponse) {
        return ((errResponse.url?.includes(this.authConfigService.getTokenEndpoint()) &&
            errResponse.error.error === 'invalid_grant') ??
            false);
    }
    isExpiredToken(resp) {
        return resp.error?.errors?.[0]?.type === 'InvalidTokenError';
    }
}
AuthInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthInterceptor, deps: [{ token: i1.AuthHttpHeaderService }, { token: i2.AuthConfigService }], target: i0.ɵɵFactoryTarget.Injectable });
AuthInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.AuthHttpHeaderService }, { type: i2.AuthConfigService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2F1dGgvdXNlci1hdXRoL2h0dHAtaW50ZXJjZXB0b3JzL2F1dGguaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBYUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsS0FBSyxFQUFjLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBSWxFOzs7R0FHRztBQUVILE1BQU0sT0FBTyxlQUFlO0lBQzFCLFlBQ1kscUJBQTRDLEVBQzVDLGlCQUFvQztRQURwQywwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzVDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7SUFDN0MsQ0FBQztJQUVKLFNBQVMsQ0FDUCxXQUE2QixFQUM3QixJQUFpQjtRQUVqQixNQUFNLGdCQUFnQixHQUNwQixJQUFJLENBQUMscUJBQXFCLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0QsTUFBTSw0QkFBNEIsR0FDaEMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLDRCQUE0QixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXZFLE1BQU0sTUFBTSxHQUFHLDRCQUE0QjtZQUN6QyxDQUFDLENBQUMsMEZBQTBGO2dCQUMxRixJQUFJLENBQUMscUJBQXFCLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzRCxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xCLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FDbEMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2QsS0FBSztZQUNMLE9BQU8sRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUM7U0FDckUsQ0FBQyxDQUFDLENBQ0osQ0FBQztRQUVGLE9BQU8sZ0JBQWdCLENBQUMsSUFBSSxDQUMxQixTQUFTLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUN2QixVQUFVLENBQUMsQ0FBQyxXQUFnQixFQUFFLEVBQUU7WUFDOUIsUUFBUSxXQUFXLENBQUMsTUFBTSxFQUFFO2dCQUMxQixLQUFLLEdBQUcsRUFBRSxlQUFlO29CQUN2QixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksZ0JBQWdCLEVBQUU7d0JBQ3hELHFEQUFxRDt3QkFDckQsdUdBQXVHO3dCQUN2RyxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyx3QkFBd0IsQ0FDeEQsT0FBTyxFQUNQLElBQUksRUFDSixLQUFLLENBQ04sQ0FBQztxQkFDSDt5QkFBTTtvQkFDTCw0QkFBNEI7b0JBQzVCLDRGQUE0RjtvQkFDNUYsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxFQUNyQzt3QkFDQSxJQUFJLENBQUMscUJBQXFCLENBQUMseUJBQXlCLEVBQUUsQ0FBQzt3QkFDdkQsT0FBTyxLQUFLLENBQUM7cUJBQ2Q7b0JBQ0QsTUFBTTtnQkFDUixLQUFLLEdBQUcsRUFBRSxjQUFjO29CQUN0QixJQUNFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUM7d0JBQ3JDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLGVBQWUsRUFDbEQ7d0JBQ0EsSUFBSSxDQUFDLHFCQUFxQixDQUFDLHlCQUF5QixFQUFFLENBQUM7cUJBQ3hEO29CQUNELE1BQU07YUFDVDtZQUNELE9BQU8sVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUNILENBQ0YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVTLG1CQUFtQixDQUFDLFdBQThCO1FBQzFELE9BQU8sQ0FDTCxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ25FLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLGVBQWUsQ0FBQztZQUM5QyxLQUFLLENBQ04sQ0FBQztJQUNKLENBQUM7SUFFUyxtQkFBbUIsQ0FBQyxXQUE4QjtRQUMxRCxPQUFPLENBQ0wsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUNuRSxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxlQUFlLENBQUM7WUFDOUMsS0FBSyxDQUNOLENBQUM7SUFDSixDQUFDO0lBRVMsY0FBYyxDQUFDLElBQXVCO1FBQzlDLE9BQU8sSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEtBQUssbUJBQW1CLENBQUM7SUFDL0QsQ0FBQzs7NEdBbkZVLGVBQWU7Z0hBQWYsZUFBZSxjQURGLE1BQU07MkZBQ25CLGVBQWU7a0JBRDNCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgSHR0cEVycm9yUmVzcG9uc2UsXG4gIEh0dHBFdmVudCxcbiAgSHR0cEhhbmRsZXIsXG4gIEh0dHBJbnRlcmNlcHRvcixcbiAgSHR0cFJlcXVlc3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVNUFRZLCBPYnNlcnZhYmxlLCBvZiwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBdXRoQ29uZmlnU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2F1dGgtY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aEh0dHBIZWFkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYXV0aC1odHRwLWhlYWRlci5zZXJ2aWNlJztcblxuLyoqXG4gKiBSZXNwb25zaWJsZSBmb3IgY2F0Y2hpbmcgYXV0aCBlcnJvcnMgYW5kIHByb3ZpZGluZyBgQXV0aG9yaXphdGlvbmAgaGVhZGVyIGZvciBBUEkgY2FsbHMuXG4gKiBVc2VzIEF1dGhIdHRwSGVhZGVyU2VydmljZSBmb3IgcmVxdWVzdCBtYW5pcHVsYXRpb24gYW5kIGVycm9yIGhhbmRsaW5nLiBJbnRlcmNlcHRvciBvbmx5IGhvb2tzIGludG8gcmVxdWVzdCBzZW5kL3JlY2VpdmVkIGV2ZW50cy5cbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBBdXRoSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYXV0aEh0dHBIZWFkZXJTZXJ2aWNlOiBBdXRoSHR0cEhlYWRlclNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGF1dGhDb25maWdTZXJ2aWNlOiBBdXRoQ29uZmlnU2VydmljZVxuICApIHt9XG5cbiAgaW50ZXJjZXB0KFxuICAgIGh0dHBSZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LFxuICAgIG5leHQ6IEh0dHBIYW5kbGVyXG4gICk6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICBjb25zdCBzaG91bGRDYXRjaEVycm9yID1cbiAgICAgIHRoaXMuYXV0aEh0dHBIZWFkZXJTZXJ2aWNlLnNob3VsZENhdGNoRXJyb3IoaHR0cFJlcXVlc3QpO1xuICAgIGNvbnN0IHNob3VsZEFkZEF1dGhvcml6YXRpb25IZWFkZXIgPVxuICAgICAgdGhpcy5hdXRoSHR0cEhlYWRlclNlcnZpY2Uuc2hvdWxkQWRkQXV0aG9yaXphdGlvbkhlYWRlcihodHRwUmVxdWVzdCk7XG5cbiAgICBjb25zdCB0b2tlbiQgPSBzaG91bGRBZGRBdXRob3JpemF0aW9uSGVhZGVyXG4gICAgICA/IC8vIGVtaXRzIHN5bmMsIHVubGVzcyB0aGVyZSBpcyByZWZyZXNoIG9yIGxvZ291dCBpbiBwcm9ncmVzcywgaW4gd2hpY2ggY2FzZSBpdCBlbWl0cyBhc3luY1xuICAgICAgICB0aGlzLmF1dGhIdHRwSGVhZGVyU2VydmljZS5nZXRTdGFibGVUb2tlbigpLnBpcGUodGFrZSgxKSlcbiAgICAgIDogb2YodW5kZWZpbmVkKTtcbiAgICBjb25zdCByZXF1ZXN0QW5kVG9rZW4kID0gdG9rZW4kLnBpcGUoXG4gICAgICBtYXAoKHRva2VuKSA9PiAoe1xuICAgICAgICB0b2tlbixcbiAgICAgICAgcmVxdWVzdDogdGhpcy5hdXRoSHR0cEhlYWRlclNlcnZpY2UuYWx0ZXJSZXF1ZXN0KGh0dHBSZXF1ZXN0LCB0b2tlbiksXG4gICAgICB9KSlcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlcXVlc3RBbmRUb2tlbiQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoeyByZXF1ZXN0LCB0b2tlbiB9KSA9PlxuICAgICAgICBuZXh0LmhhbmRsZShyZXF1ZXN0KS5waXBlKFxuICAgICAgICAgIGNhdGNoRXJyb3IoKGVyclJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXJyUmVzcG9uc2Uuc3RhdHVzKSB7XG4gICAgICAgICAgICAgIGNhc2UgNDAxOiAvLyBVbmF1dGhvcml6ZWRcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0V4cGlyZWRUb2tlbihlcnJSZXNwb25zZSkgJiYgc2hvdWxkQ2F0Y2hFcnJvcikge1xuICAgICAgICAgICAgICAgICAgLy8gcmVxdWVzdCBmYWlsZWQgYmVjYXVzZSBvZiB0aGUgZXhwaXJlZCBhY2Nlc3MgdG9rZW5cbiAgICAgICAgICAgICAgICAgIC8vIHdlIHNob3VsZCBnZXQgcmVmcmVzaCB0aGUgdG9rZW4gYW5kIHJldHJ5IHRoZSByZXF1ZXN0LCBvciBsb2dvdXQgaWYgdGhlIHJlZnJlc2ggaXMgbWlzc2luZyAvIGV4cGlyZWRcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmF1dGhIdHRwSGVhZGVyU2VydmljZS5oYW5kbGVFeHBpcmVkQWNjZXNzVG9rZW4oXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QsXG4gICAgICAgICAgICAgICAgICAgIG5leHQsXG4gICAgICAgICAgICAgICAgICAgIHRva2VuXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAvLyBSZWZyZXNoIHRoZSBleHBpcmVkIHRva2VuXG4gICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgT0F1dGggZW5kcG9pbnQgd2FzIGNhbGxlZCBhbmQgdGhlIGVycm9yIGlzIGJlY2F1c2UgdGhlIHJlZnJlc2ggdG9rZW4gZXhwaXJlZFxuICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvcklzSW52YWxpZFRva2VuKGVyclJlc3BvbnNlKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5hdXRoSHR0cEhlYWRlclNlcnZpY2UuaGFuZGxlRXhwaXJlZFJlZnJlc2hUb2tlbigpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSA0MDA6IC8vIEJhZCBSZXF1ZXN0XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvcklzSW52YWxpZEdyYW50KGVyclJlc3BvbnNlKSAmJlxuICAgICAgICAgICAgICAgICAgcmVxdWVzdC5ib2R5LmdldCgnZ3JhbnRfdHlwZScpID09PSAncmVmcmVzaF90b2tlbidcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuYXV0aEh0dHBIZWFkZXJTZXJ2aWNlLmhhbmRsZUV4cGlyZWRSZWZyZXNoVG9rZW4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJSZXNwb25zZSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZXJyb3JJc0ludmFsaWRUb2tlbihlcnJSZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2UpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgKGVyclJlc3BvbnNlLnVybD8uaW5jbHVkZXModGhpcy5hdXRoQ29uZmlnU2VydmljZS5nZXRUb2tlbkVuZHBvaW50KCkpICYmXG4gICAgICAgIGVyclJlc3BvbnNlLmVycm9yLmVycm9yID09PSAnaW52YWxpZF90b2tlbicpID8/XG4gICAgICBmYWxzZVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZXJyb3JJc0ludmFsaWRHcmFudChlcnJSZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2UpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgKGVyclJlc3BvbnNlLnVybD8uaW5jbHVkZXModGhpcy5hdXRoQ29uZmlnU2VydmljZS5nZXRUb2tlbkVuZHBvaW50KCkpICYmXG4gICAgICAgIGVyclJlc3BvbnNlLmVycm9yLmVycm9yID09PSAnaW52YWxpZF9ncmFudCcpID8/XG4gICAgICBmYWxzZVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNFeHBpcmVkVG9rZW4ocmVzcDogSHR0cEVycm9yUmVzcG9uc2UpOiBib29sZWFuIHtcbiAgICByZXR1cm4gcmVzcC5lcnJvcj8uZXJyb3JzPy5bMF0/LnR5cGUgPT09ICdJbnZhbGlkVG9rZW5FcnJvcic7XG4gIH1cbn1cbiJdfQ==