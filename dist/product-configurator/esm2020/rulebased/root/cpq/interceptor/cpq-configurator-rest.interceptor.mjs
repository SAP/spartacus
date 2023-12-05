/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpErrorResponse, HttpHeaders, HttpResponse, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./cpq-access-storage.service";
/**
 * This header attribute shall be used to mark any request made to the CPQ System.
 * The presence of it enables this interceptor to actually intercept
 * this request and to decorate it with the authentication related attributes.
 */
export const MARKER_HEADER_CPQ_CONFIGURATOR = 'x-cpq-configurator';
export class CpqConfiguratorRestInterceptor {
    constructor(cpqAccessStorageService) {
        this.cpqAccessStorageService = cpqAccessStorageService;
        this.HEADER_ATTR_CPQ_SESSION_ID = 'x-cpq-session-id';
        this.HEADER_ATTR_CPQ_NO_COOKIES = 'x-cpq-disable-cookies';
        /**
         * Although CPQ API is stateless and can work without session id, it's recommended to always append the CPQ session id to any request.
         * It enables CPQ load balancer to redirect the request always to the same node, so that configuration related data is already in memory
         * and does not need to be reloaded from DB. This can have a significant impact on performance nd reduce load in the CPQ system.
         */
        this.cpqSessionId = null;
    }
    intercept(request, next) {
        if (!request.headers.has(MARKER_HEADER_CPQ_CONFIGURATOR)) {
            return next.handle(request);
        }
        return this.cpqAccessStorageService.getCpqAccessData().pipe(take(1), // avoid request being re-executed when token expires
        switchMap((cpqData) => {
            return next.handle(this.enrichHeaders(request, cpqData)).pipe(catchError((errorResponse) => {
                return this.handleError(errorResponse, next, request);
            }), tap((response) => this.extractCpqSessionId(response)));
        }));
    }
    handleError(errorResponse, next, request) {
        if (errorResponse instanceof HttpErrorResponse) {
            if (errorResponse.status === 403) {
                this.cpqSessionId = null;
                this.cpqAccessStorageService.renewCpqAccessData();
                return this.cpqAccessStorageService.getCpqAccessData().pipe(take(1), switchMap((newCpqData) => {
                    return next
                        .handle(this.enrichHeaders(request, newCpqData))
                        .pipe(tap((response) => this.extractCpqSessionId(response)));
                }));
            }
        }
        return throwError(errorResponse); //propagate error
    }
    extractCpqSessionId(response) {
        if (response instanceof HttpResponse ||
            response instanceof HttpErrorResponse) {
            if (response.headers.has(this.HEADER_ATTR_CPQ_SESSION_ID)) {
                this.cpqSessionId = response.headers.get(this.HEADER_ATTR_CPQ_SESSION_ID);
            }
        }
    }
    enrichHeaders(request, cpqData) {
        let newRequest = request.clone({
            url: cpqData.endpoint + request.url,
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + cpqData.accessToken,
                [this.HEADER_ATTR_CPQ_NO_COOKIES]: 'true',
            }),
        });
        if (this.cpqSessionId) {
            newRequest = newRequest.clone({
                setHeaders: {
                    [this.HEADER_ATTR_CPQ_SESSION_ID]: this.cpqSessionId,
                },
            });
        }
        return newRequest;
    }
}
CpqConfiguratorRestInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRestInterceptor, deps: [{ token: i1.CpqAccessStorageService }], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorRestInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRestInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRestInterceptor, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CpqAccessStorageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3BxLWNvbmZpZ3VyYXRvci1yZXN0LmludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9yb290L2NwcS9pbnRlcmNlcHRvci9jcHEtY29uZmlndXJhdG9yLXJlc3QuaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCxpQkFBaUIsRUFHakIsV0FBVyxFQUdYLFlBQVksR0FDYixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUlsRTs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sOEJBQThCLEdBQUcsb0JBQW9CLENBQUM7QUFLbkUsTUFBTSxPQUFPLDhCQUE4QjtJQVd6QyxZQUFzQix1QkFBZ0Q7UUFBaEQsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQVZuRCwrQkFBMEIsR0FBRyxrQkFBa0IsQ0FBQztRQUNoRCwrQkFBMEIsR0FBRyx1QkFBdUIsQ0FBQztRQUV4RTs7OztXQUlHO1FBQ08saUJBQVksR0FBa0IsSUFBSSxDQUFDO0lBRTRCLENBQUM7SUFFMUUsU0FBUyxDQUNQLE9BQXlCLEVBQ3pCLElBQWlCO1FBRWpCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxFQUFFO1lBQ3hELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM3QjtRQUNELE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFDLGdCQUFn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Q1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgSHR0cEVycm9yUmVzcG9uc2UsXG4gIEh0dHBFdmVudCxcbiAgSHR0cEhhbmRsZXIsXG4gIEh0dHBIZWFkZXJzLFxuICBIdHRwSW50ZXJjZXB0b3IsXG4gIEh0dHBSZXF1ZXN0LFxuICBIdHRwUmVzcG9uc2UsXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIHN3aXRjaE1hcCwgdGFrZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ3BxQWNjZXNzRGF0YSB9IGZyb20gJy4vY3BxLWFjY2Vzcy1kYXRhLm1vZGVscyc7XG5pbXBvcnQgeyBDcHFBY2Nlc3NTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vY3BxLWFjY2Vzcy1zdG9yYWdlLnNlcnZpY2UnO1xuXG4vKipcbiAqIFRoaXMgaGVhZGVyIGF0dHJpYnV0ZSBzaGFsbCBiZSB1c2VkIHRvIG1hcmsgYW55IHJlcXVlc3QgbWFkZSB0byB0aGUgQ1BRIFN5c3RlbS5cbiAqIFRoZSBwcmVzZW5jZSBvZiBpdCBlbmFibGVzIHRoaXMgaW50ZXJjZXB0b3IgdG8gYWN0dWFsbHkgaW50ZXJjZXB0XG4gKiB0aGlzIHJlcXVlc3QgYW5kIHRvIGRlY29yYXRlIGl0IHdpdGggdGhlIGF1dGhlbnRpY2F0aW9uIHJlbGF0ZWQgYXR0cmlidXRlcy5cbiAqL1xuZXhwb3J0IGNvbnN0IE1BUktFUl9IRUFERVJfQ1BRX0NPTkZJR1VSQVRPUiA9ICd4LWNwcS1jb25maWd1cmF0b3InO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ3BxQ29uZmlndXJhdG9yUmVzdEludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IEhFQURFUl9BVFRSX0NQUV9TRVNTSU9OX0lEID0gJ3gtY3BxLXNlc3Npb24taWQnO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgSEVBREVSX0FUVFJfQ1BRX05PX0NPT0tJRVMgPSAneC1jcHEtZGlzYWJsZS1jb29raWVzJztcblxuICAvKipcbiAgICogQWx0aG91Z2ggQ1BRIEFQSSBpcyBzdGF0ZWxlc3MgYW5kIGNhbiB3b3JrIHdpdGhvdXQgc2Vzc2lvbiBpZCwgaXQncyByZWNvbW1lbmRlZCB0byBhbHdheXMgYXBwZW5kIHRoZSBDUFEgc2Vzc2lvbiBpZCB0byBhbnkgcmVxdWVzdC5cbiAgICogSXQgZW5hYmxlcyBDUFEgbG9hZCBiYWxhbmNlciB0byByZWRpcmVjdCB0aGUgcmVxdWVzdCBhbHdheXMgdG8gdGhlIHNhbWUgbm9kZSwgc28gdGhhdCBjb25maWd1cmF0aW9uIHJlbGF0ZWQgZGF0YSBpcyBhbHJlYWR5IGluIG1lbW9yeVxuICAgKiBhbmQgZG9lcyBub3QgbmVlZCB0byBiZSByZWxvYWRlZCBmcm9tIERCLiBUaGlzIGNhbiBoYXZlIGEgc2lnbmlmaWNhbnQgaW1wYWN0IG9uIHBlcmZvcm1hbmNlIG5kIHJlZHVjZSBsb2FkIGluIHRoZSBDUFEgc3lzdGVtLlxuICAgKi9cbiAgcHJvdGVjdGVkIGNwcVNlc3Npb25JZDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNwcUFjY2Vzc1N0b3JhZ2VTZXJ2aWNlOiBDcHFBY2Nlc3NTdG9yYWdlU2VydmljZSkge31cblxuICBpbnRlcmNlcHQoXG4gICAgcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcbiAgICBuZXh0OiBIdHRwSGFuZGxlclxuICApOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgaWYgKCFyZXF1ZXN0LmhlYWRlcnMuaGFzKE1BUktFUl9IRUFERVJfQ1BRX0NPTkZJR1VSQVRPUikpIHtcbiAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXF1ZXN0KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY3BxQWNjZXNzU3RvcmFnZVNlcnZpY2UuZ2V0Q3BxQWNjZXNzRGF0YSgpLnBpcGUoXG4gICAgICB0YWtlKDEpLCAvLyBhdm9pZCByZXF1ZXN0IGJlaW5nIHJlLWV4ZWN1dGVkIHdoZW4gdG9rZW4gZXhwaXJlc1xuICAgICAgc3dpdGNoTWFwKChjcHFEYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXh0LmhhbmRsZSh0aGlzLmVucmljaEhlYWRlcnMocmVxdWVzdCwgY3BxRGF0YSkpLnBpcGUoXG4gICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3JSZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVFcnJvcihlcnJvclJlc3BvbnNlLCBuZXh0LCByZXF1ZXN0KTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICB0YXAoKHJlc3BvbnNlKSA9PiB0aGlzLmV4dHJhY3RDcHFTZXNzaW9uSWQocmVzcG9uc2UpKVxuICAgICAgICApO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGhhbmRsZUVycm9yKFxuICAgIGVycm9yUmVzcG9uc2U6IGFueSxcbiAgICBuZXh0OiBIdHRwSGFuZGxlcixcbiAgICByZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+XG4gICk6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICBpZiAoZXJyb3JSZXNwb25zZSBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlKSB7XG4gICAgICBpZiAoZXJyb3JSZXNwb25zZS5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICB0aGlzLmNwcVNlc3Npb25JZCA9IG51bGw7XG4gICAgICAgIHRoaXMuY3BxQWNjZXNzU3RvcmFnZVNlcnZpY2UucmVuZXdDcHFBY2Nlc3NEYXRhKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmNwcUFjY2Vzc1N0b3JhZ2VTZXJ2aWNlLmdldENwcUFjY2Vzc0RhdGEoKS5waXBlKFxuICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgc3dpdGNoTWFwKChuZXdDcHFEYXRhKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmV4dFxuICAgICAgICAgICAgICAuaGFuZGxlKHRoaXMuZW5yaWNoSGVhZGVycyhyZXF1ZXN0LCBuZXdDcHFEYXRhKSlcbiAgICAgICAgICAgICAgLnBpcGUodGFwKChyZXNwb25zZSkgPT4gdGhpcy5leHRyYWN0Q3BxU2Vzc2lvbklkKHJlc3BvbnNlKSkpO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yUmVzcG9uc2UpOyAvL3Byb3BhZ2F0ZSBlcnJvclxuICB9XG5cbiAgcHJvdGVjdGVkIGV4dHJhY3RDcHFTZXNzaW9uSWQocmVzcG9uc2U6IEh0dHBFdmVudDxhbnk+KSB7XG4gICAgaWYgKFxuICAgICAgcmVzcG9uc2UgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UgfHxcbiAgICAgIHJlc3BvbnNlIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2VcbiAgICApIHtcbiAgICAgIGlmIChyZXNwb25zZS5oZWFkZXJzLmhhcyh0aGlzLkhFQURFUl9BVFRSX0NQUV9TRVNTSU9OX0lEKSkge1xuICAgICAgICB0aGlzLmNwcVNlc3Npb25JZCA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFxuICAgICAgICAgIHRoaXMuSEVBREVSX0FUVFJfQ1BRX1NFU1NJT05fSURcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZW5yaWNoSGVhZGVycyhcbiAgICByZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LFxuICAgIGNwcURhdGE6IENwcUFjY2Vzc0RhdGFcbiAgKTogSHR0cFJlcXVlc3Q8YW55PiB7XG4gICAgbGV0IG5ld1JlcXVlc3QgPSByZXF1ZXN0LmNsb25lKHtcbiAgICAgIHVybDogY3BxRGF0YS5lbmRwb2ludCArIHJlcXVlc3QudXJsLFxuICAgICAgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgQXV0aG9yaXphdGlvbjogJ0JlYXJlciAnICsgY3BxRGF0YS5hY2Nlc3NUb2tlbixcbiAgICAgICAgW3RoaXMuSEVBREVSX0FUVFJfQ1BRX05PX0NPT0tJRVNdOiAndHJ1ZScsXG4gICAgICB9KSxcbiAgICB9KTtcbiAgICBpZiAodGhpcy5jcHFTZXNzaW9uSWQpIHtcbiAgICAgIG5ld1JlcXVlc3QgPSBuZXdSZXF1ZXN0LmNsb25lKHtcbiAgICAgICAgc2V0SGVhZGVyczoge1xuICAgICAgICAgIFt0aGlzLkhFQURFUl9BVFRSX0NQUV9TRVNTSU9OX0lEXTogdGhpcy5jcHFTZXNzaW9uSWQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld1JlcXVlc3Q7XG4gIH1cbn1cbiJdfQ==