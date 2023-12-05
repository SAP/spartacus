/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpErrorResponse, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { InterceptorUtil, USE_CLIENT_TOKEN, } from '../../../occ/utils/interceptor-util';
import * as i0 from "@angular/core";
import * as i1 from "../services/client-token.service";
import * as i2 from "../services/client-error-handling.service";
import * as i3 from "../../../occ/services/occ-endpoints.service";
/**
 * Interceptor for handling requests with `USE_CLIENT_TOKEN` header.
 * Provides `Authorization` header with client token and handles errors related to client auth.
 */
export class ClientTokenInterceptor {
    constructor(clientTokenService, clientErrorHandlingService, occEndpoints) {
        this.clientTokenService = clientTokenService;
        this.clientErrorHandlingService = clientErrorHandlingService;
        this.occEndpoints = occEndpoints;
    }
    intercept(request, next) {
        const isClientTokenRequest = this.isClientTokenRequest(request);
        if (isClientTokenRequest) {
            request = InterceptorUtil.removeHeader(USE_CLIENT_TOKEN, request);
        }
        return this.getClientToken(isClientTokenRequest).pipe(take(1), switchMap((token) => {
            if (token?.access_token &&
                request.url.includes(this.occEndpoints.getBaseUrl())) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `${token.token_type || 'Bearer'} ${token.access_token}`,
                    },
                });
            }
            return next.handle(request).pipe(catchError((errResponse) => {
                if (errResponse instanceof HttpErrorResponse &&
                    errResponse.status === 401 &&
                    isClientTokenRequest &&
                    this.isExpiredToken(errResponse)) {
                    return this.clientErrorHandlingService.handleExpiredClientToken(request, next);
                }
                return throwError(errResponse);
            }));
        }));
    }
    getClientToken(isClientTokenRequest) {
        if (isClientTokenRequest) {
            return this.clientTokenService.getClientToken();
        }
        return of(undefined);
    }
    isClientTokenRequest(request) {
        const isRequestMapping = InterceptorUtil.getInterceptorParam(USE_CLIENT_TOKEN, request.headers);
        return Boolean(isRequestMapping);
    }
    isExpiredToken(resp) {
        return resp.error?.errors?.[0]?.type === 'InvalidTokenError';
    }
}
ClientTokenInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClientTokenInterceptor, deps: [{ token: i1.ClientTokenService }, { token: i2.ClientErrorHandlingService }, { token: i3.OccEndpointsService }], target: i0.ɵɵFactoryTarget.Injectable });
ClientTokenInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClientTokenInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClientTokenInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.ClientTokenService }, { type: i2.ClientErrorHandlingService }, { type: i3.OccEndpointsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LXRva2VuLmludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvYXV0aC9jbGllbnQtYXV0aC9odHRwLWludGVyY2VwdG9ycy9jbGllbnQtdG9rZW4uaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCxpQkFBaUIsR0FLbEIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxFQUFFLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdELE9BQU8sRUFDTCxlQUFlLEVBQ2YsZ0JBQWdCLEdBQ2pCLE1BQU0scUNBQXFDLENBQUM7Ozs7O0FBSzdDOzs7R0FHRztBQUVILE1BQU0sT0FBTyxzQkFBc0I7SUFDakMsWUFDWSxrQkFBc0MsRUFDdEMsMEJBQXNELEVBQ3RELFlBQWlDO1FBRmpDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsK0JBQTBCLEdBQTFCLDBCQUEwQixDQUE0QjtRQUN0RCxpQkFBWSxHQUFaLFlBQVksQ0FBcUI7SUFDMUMsQ0FBQztJQUVKLFNBQVMsQ0FDUCxPQUF5QixFQUN6QixJQUFpQjtRQUVqQixNQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoRSxJQUFJLG9CQUFvQixFQUFFO1lBQ3hCLE9BQU8sR0FBRyxlQUFlLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ25FO1FBRUQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUNuRCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsU0FBUyxDQUFDLENBQUMsS0FBOEIsRUFBRSxFQUFFO1lBQzNDLElBQ0UsS0FBSyxFQUFFLFlBQVk7Z0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsRUFDcEQ7Z0JBQ0EsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7b0JBQ3RCLFVBQVUsRUFBRTt3QkFDVixhQUFhLEVBQUUsR0FBRyxLQUFLLENBQUMsVUFBVSxJQUFJLFFBQVEsSUFDNUMsS0FBSyxDQUFDLFlBQ1IsRUFBRTtxQkFDSDtpQkFDRixDQUFDLENBQUM7YUFDSjtZQUVELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQzlCLFVBQVUsQ0FBQyxDQUFDLFdBQWdCLEVBQUUsRUFBRTtnQkFDOUIsSUFDRSxXQUFXLFlBQVksaUJBQWlCO29CQUN4QyxXQUFXLENBQUMsTUFBTSxLQUFLLEdBQUc7b0JBQzFCLG9CQUFvQjtvQkFDcEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsRUFDaEM7b0JBQ0EsT0FBTyxJQUFJLENBQUMsMEJBQTBCLENBQUMsd0JBQXdCLENBQzdELE9BQU8sRUFDUCxJQUFJLENBQ0wsQ0FBQztpQkFDSDtnQkFDRCxPQUFPLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNqQyxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFUyxjQUFjLENBQ3RCLG9CQUE2QjtRQUU3QixJQUFJLG9CQUFvQixFQUFFO1lBQ3hCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ2pEO1FBQ0QsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVTLG9CQUFvQixDQUFDLE9BQXlCO1FBQ3RELE1BQU0sZ0JBQWdCLEdBQUcsZUFBZSxDQUFDLG1CQUFtQixDQUMxRCxnQkFBZ0IsRUFDaEIsT0FBTyxDQUFDLE9BQU8sQ0FDaEIsQ0FBQztRQUNGLE9BQU8sT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVTLGNBQWMsQ0FBQyxJQUF1QjtRQUM5QyxPQUFPLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxLQUFLLG1CQUFtQixDQUFDO0lBQy9ELENBQUM7O21IQXZFVSxzQkFBc0I7dUhBQXRCLHNCQUFzQixjQURULE1BQU07MkZBQ25CLHNCQUFzQjtrQkFEbEMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBIdHRwRXJyb3JSZXNwb25zZSxcbiAgSHR0cEV2ZW50LFxuICBIdHRwSGFuZGxlcixcbiAgSHR0cEludGVyY2VwdG9yLFxuICBIdHRwUmVxdWVzdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIHN3aXRjaE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9jY0VuZHBvaW50c1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9vY2Mvc2VydmljZXMvb2NjLWVuZHBvaW50cy5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIEludGVyY2VwdG9yVXRpbCxcbiAgVVNFX0NMSUVOVF9UT0tFTixcbn0gZnJvbSAnLi4vLi4vLi4vb2NjL3V0aWxzL2ludGVyY2VwdG9yLXV0aWwnO1xuaW1wb3J0IHsgQ2xpZW50VG9rZW4gfSBmcm9tICcuLi9tb2RlbHMvY2xpZW50LXRva2VuLm1vZGVsJztcbmltcG9ydCB7IENsaWVudEVycm9ySGFuZGxpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvY2xpZW50LWVycm9yLWhhbmRsaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xpZW50VG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvY2xpZW50LXRva2VuLnNlcnZpY2UnO1xuXG4vKipcbiAqIEludGVyY2VwdG9yIGZvciBoYW5kbGluZyByZXF1ZXN0cyB3aXRoIGBVU0VfQ0xJRU5UX1RPS0VOYCBoZWFkZXIuXG4gKiBQcm92aWRlcyBgQXV0aG9yaXphdGlvbmAgaGVhZGVyIHdpdGggY2xpZW50IHRva2VuIGFuZCBoYW5kbGVzIGVycm9ycyByZWxhdGVkIHRvIGNsaWVudCBhdXRoLlxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIENsaWVudFRva2VuSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY2xpZW50VG9rZW5TZXJ2aWNlOiBDbGllbnRUb2tlblNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNsaWVudEVycm9ySGFuZGxpbmdTZXJ2aWNlOiBDbGllbnRFcnJvckhhbmRsaW5nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgb2NjRW5kcG9pbnRzOiBPY2NFbmRwb2ludHNTZXJ2aWNlXG4gICkge31cblxuICBpbnRlcmNlcHQoXG4gICAgcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcbiAgICBuZXh0OiBIdHRwSGFuZGxlclxuICApOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgY29uc3QgaXNDbGllbnRUb2tlblJlcXVlc3QgPSB0aGlzLmlzQ2xpZW50VG9rZW5SZXF1ZXN0KHJlcXVlc3QpO1xuICAgIGlmIChpc0NsaWVudFRva2VuUmVxdWVzdCkge1xuICAgICAgcmVxdWVzdCA9IEludGVyY2VwdG9yVXRpbC5yZW1vdmVIZWFkZXIoVVNFX0NMSUVOVF9UT0tFTiwgcmVxdWVzdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2xpZW50VG9rZW4oaXNDbGllbnRUb2tlblJlcXVlc3QpLnBpcGUoXG4gICAgICB0YWtlKDEpLFxuICAgICAgc3dpdGNoTWFwKCh0b2tlbjogQ2xpZW50VG9rZW4gfCB1bmRlZmluZWQpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRva2VuPy5hY2Nlc3NfdG9rZW4gJiZcbiAgICAgICAgICByZXF1ZXN0LnVybC5pbmNsdWRlcyh0aGlzLm9jY0VuZHBvaW50cy5nZXRCYXNlVXJsKCkpXG4gICAgICAgICkge1xuICAgICAgICAgIHJlcXVlc3QgPSByZXF1ZXN0LmNsb25lKHtcbiAgICAgICAgICAgIHNldEhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYCR7dG9rZW4udG9rZW5fdHlwZSB8fCAnQmVhcmVyJ30gJHtcbiAgICAgICAgICAgICAgICB0b2tlbi5hY2Nlc3NfdG9rZW5cbiAgICAgICAgICAgICAgfWAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcXVlc3QpLnBpcGUoXG4gICAgICAgICAgY2F0Y2hFcnJvcigoZXJyUmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBlcnJSZXNwb25zZSBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlICYmXG4gICAgICAgICAgICAgIGVyclJlc3BvbnNlLnN0YXR1cyA9PT0gNDAxICYmXG4gICAgICAgICAgICAgIGlzQ2xpZW50VG9rZW5SZXF1ZXN0ICYmXG4gICAgICAgICAgICAgIHRoaXMuaXNFeHBpcmVkVG9rZW4oZXJyUmVzcG9uc2UpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50RXJyb3JIYW5kbGluZ1NlcnZpY2UuaGFuZGxlRXhwaXJlZENsaWVudFRva2VuKFxuICAgICAgICAgICAgICAgIHJlcXVlc3QsXG4gICAgICAgICAgICAgICAgbmV4dFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyUmVzcG9uc2UpO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0Q2xpZW50VG9rZW4oXG4gICAgaXNDbGllbnRUb2tlblJlcXVlc3Q6IGJvb2xlYW5cbiAgKTogT2JzZXJ2YWJsZTxDbGllbnRUb2tlbiB8IHVuZGVmaW5lZD4ge1xuICAgIGlmIChpc0NsaWVudFRva2VuUmVxdWVzdCkge1xuICAgICAgcmV0dXJuIHRoaXMuY2xpZW50VG9rZW5TZXJ2aWNlLmdldENsaWVudFRva2VuKCk7XG4gICAgfVxuICAgIHJldHVybiBvZih1bmRlZmluZWQpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzQ2xpZW50VG9rZW5SZXF1ZXN0KHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4pOiBib29sZWFuIHtcbiAgICBjb25zdCBpc1JlcXVlc3RNYXBwaW5nID0gSW50ZXJjZXB0b3JVdGlsLmdldEludGVyY2VwdG9yUGFyYW0oXG4gICAgICBVU0VfQ0xJRU5UX1RPS0VOLFxuICAgICAgcmVxdWVzdC5oZWFkZXJzXG4gICAgKTtcbiAgICByZXR1cm4gQm9vbGVhbihpc1JlcXVlc3RNYXBwaW5nKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0V4cGlyZWRUb2tlbihyZXNwOiBIdHRwRXJyb3JSZXNwb25zZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiByZXNwLmVycm9yPy5lcnJvcnM/LlswXT8udHlwZSA9PT0gJ0ludmFsaWRUb2tlbkVycm9yJztcbiAgfVxufVxuIl19