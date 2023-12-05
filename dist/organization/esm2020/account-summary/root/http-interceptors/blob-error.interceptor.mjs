/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpErrorResponse, } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FileReaderService } from '@spartacus/storefront';
import { WindowRef } from '@spartacus/core';
import { throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class BlobErrorInterceptor {
    constructor() {
        this.fileReaderService = inject(FileReaderService);
        this.windowRef = inject(WindowRef);
    }
    intercept(request, next) {
        return next.handle(request).pipe(catchError((errResponse) => {
            if (this.windowRef.isBrowser() &&
                errResponse instanceof HttpErrorResponse &&
                errResponse.error instanceof Blob &&
                errResponse.error.type === 'application/json') {
                return this.fileReaderService
                    .loadTextFile(errResponse.error)
                    .pipe(switchMap((errorString) => {
                    const error = JSON.parse(errorString);
                    return throwError(new HttpErrorResponse({
                        ...errResponse,
                        error,
                        url: errResponse.url ?? undefined,
                    }));
                }));
            }
            else {
                return throwError(errResponse);
            }
        }));
    }
}
BlobErrorInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BlobErrorInterceptor, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
BlobErrorInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BlobErrorInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BlobErrorInterceptor, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvYi1lcnJvci5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWNjb3VudC1zdW1tYXJ5L3Jvb3QvaHR0cC1pbnRlcmNlcHRvcnMvYmxvYi1lcnJvci5pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLGlCQUFpQixHQUtsQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBS3ZELE1BQU0sT0FBTyxvQkFBb0I7SUFIakM7UUFJcUIsc0JBQWlCLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDOUMsY0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztLQWtDbEQ7SUFoQ0MsU0FBUyxDQUNQLE9BQXlCLEVBQ3pCLElBQWlCO1FBRWpCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQzlCLFVBQVUsQ0FBQyxDQUFDLFdBQWdCLEVBQUUsRUFBRTtZQUM5QixJQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFO2dCQUMxQixXQUFXLFlBQVksaUJBQWlCO2dCQUN4QyxXQUFXLENBQUMsS0FBSyxZQUFZLElBQUk7Z0JBQ2pDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLGtCQUFrQixFQUM3QztnQkFDQSxPQUFPLElBQUksQ0FBQyxpQkFBaUI7cUJBQzFCLFlBQVksQ0FBQyxXQUFXLENBQUMsS0FBYSxDQUFDO3FCQUN2QyxJQUFJLENBQ0gsU0FBUyxDQUFDLENBQUMsV0FBZ0IsRUFBRSxFQUFFO29CQUM3QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUN0QyxPQUFPLFVBQVUsQ0FDZixJQUFJLGlCQUFpQixDQUFDO3dCQUNwQixHQUFHLFdBQVc7d0JBQ2QsS0FBSzt3QkFDTCxHQUFHLEVBQUUsV0FBVyxDQUFDLEdBQUcsSUFBSSxTQUFTO3FCQUNsQyxDQUFDLENBQ0gsQ0FBQztnQkFDSixDQUFDLENBQUMsQ0FDSCxDQUFDO2FBQ0w7aUJBQU07Z0JBQ0wsT0FBTyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDaEM7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7aUhBbkNVLG9CQUFvQjtxSEFBcEIsb0JBQW9CLGNBRm5CLE1BQU07MkZBRVAsb0JBQW9CO2tCQUhoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIEh0dHBFcnJvclJlc3BvbnNlLFxuICBIdHRwRXZlbnQsXG4gIEh0dHBIYW5kbGVyLFxuICBIdHRwSW50ZXJjZXB0b3IsXG4gIEh0dHBSZXF1ZXN0LFxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBpbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpbGVSZWFkZXJTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IFdpbmRvd1JlZiB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBCbG9iRXJyb3JJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG4gIHByb3RlY3RlZCByZWFkb25seSBmaWxlUmVhZGVyU2VydmljZSA9IGluamVjdChGaWxlUmVhZGVyU2VydmljZSk7XG4gIHByb3RlY3RlZCByZWFkb25seSB3aW5kb3dSZWYgPSBpbmplY3QoV2luZG93UmVmKTtcblxuICBpbnRlcmNlcHQoXG4gICAgcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcbiAgICBuZXh0OiBIdHRwSGFuZGxlclxuICApOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcXVlc3QpLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKChlcnJSZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLndpbmRvd1JlZi5pc0Jyb3dzZXIoKSAmJlxuICAgICAgICAgIGVyclJlc3BvbnNlIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UgJiZcbiAgICAgICAgICBlcnJSZXNwb25zZS5lcnJvciBpbnN0YW5jZW9mIEJsb2IgJiZcbiAgICAgICAgICBlcnJSZXNwb25zZS5lcnJvci50eXBlID09PSAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZmlsZVJlYWRlclNlcnZpY2VcbiAgICAgICAgICAgIC5sb2FkVGV4dEZpbGUoZXJyUmVzcG9uc2UuZXJyb3IgYXMgRmlsZSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBzd2l0Y2hNYXAoKGVycm9yU3RyaW5nOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IEpTT04ucGFyc2UoZXJyb3JTdHJpbmcpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKFxuICAgICAgICAgICAgICAgICAgbmV3IEh0dHBFcnJvclJlc3BvbnNlKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uZXJyUmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IGVyclJlc3BvbnNlLnVybCA/PyB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVyclJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=