/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpErrorResponse, HttpEventType, } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { NEVER, TimeoutError, of } from 'rxjs';
import { catchError, startWith, switchMap, timeout } from 'rxjs/operators';
import { LoggerService } from '../../logger';
import { HTTP_TIMEOUT_CONFIG } from './http-timeout.config';
import * as i0 from "@angular/core";
import * as i1 from "../../window/window-ref";
import * as i2 from "../../occ/config/occ-config";
/**
 * It throws an error when a request takes longer than the specified time.
 */
export class HttpTimeoutInterceptor {
    constructor(windowRef, config) {
        this.windowRef = windowRef;
        this.config = config;
        this.logger = inject(LoggerService);
    }
    /**
     * It throws an error when a request takes longer than the specified time.
     *
     * It starts counting time for timeout only after the request is sent.
     */
    intercept(request, next) {
        const timeoutValue = this.getTimeoutValue(request);
        if (typeof timeoutValue === 'undefined') {
            return next.handle(request);
        }
        return next.handle(request).pipe(switchMap((event) => {
            // When event `HttpEventType.Sent` happens, let's start counting time for timeout.
            // But when event `HttpEventType.Response` is received, `switchMap` will unsubscribe from the following timeout observable.
            if (event.type === HttpEventType.Sent) {
                return NEVER.pipe(startWith(event), timeout(timeoutValue));
            }
            return of(event);
        }), catchError((error) => {
            throw this.convertTimeoutToHttpErrorResponse({
                error,
                request,
                timeoutValue,
            });
        }));
    }
    /**
     * Returns the configured timeout value for the given request.
     *
     * The timeout can be configured specifically for a certain request
     * via HttpContextToken `HTTP_TIMEOUT_CONFIG`. When it's not available,
     * the value is taken from the global config `config.backend.timeout`.
     *
     * Depending on the platform (browser or server), the configured timeout value can be different.
     */
    getTimeoutValue(request) {
        const localTimeoutConfig = request.context.get(HTTP_TIMEOUT_CONFIG);
        const globalTimeoutConfig = this.config?.backend?.timeout;
        const timeoutConfig = localTimeoutConfig ?? globalTimeoutConfig ?? {};
        return this.windowRef.isBrowser()
            ? timeoutConfig?.browser
            : timeoutConfig?.server;
    }
    /**
     * It converts an RxJs `TimeoutError` (caused by the `timeout()` operator),
     * to a manually crafted `HttpErrorResponse` object.
     *
     * If the error is not an RxJs `TimeoutError`, it just returns the original error.
     */
    convertTimeoutToHttpErrorResponse({ error, request, timeoutValue, }) {
        if (error instanceof TimeoutError) {
            // create a new Error here, to record the current stacktrace (which is not present in RxJs TimeoutError)
            const cxHttpTimeoutError = this.buildError(request, timeoutValue);
            return new HttpErrorResponse({
                url: request.url,
                error: cxHttpTimeoutError,
            });
        }
        return error;
    }
    buildError(request, timeoutValue) {
        const message = `Request to URL '${request.url}' exceeded expected time of ${timeoutValue}ms and was aborted.`;
        // If an HTTP call times out, it is considered an unexpected error.
        // To assist with troubleshooting, the error is logged to the console.
        this.logger.warn(message);
        return new Error(message);
    }
}
HttpTimeoutInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: HttpTimeoutInterceptor, deps: [{ token: i1.WindowRef }, { token: i2.OccConfig }], target: i0.ɵɵFactoryTarget.Injectable });
HttpTimeoutInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: HttpTimeoutInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: HttpTimeoutInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.WindowRef }, { type: i2.OccConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC10aW1lb3V0LmludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvaHR0cC9odHRwLXRpbWVvdXQvaHR0cC10aW1lb3V0LmludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsaUJBQWlCLEVBRWpCLGFBQWEsR0FJZCxNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxLQUFLLEVBQWMsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUc3QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7OztBQUU1RDs7R0FFRztBQUVILE1BQU0sT0FBTyxzQkFBc0I7SUFHakMsWUFBc0IsU0FBb0IsRUFBWSxNQUFpQjtRQUFqRCxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQVksV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUY3RCxXQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRWlDLENBQUM7SUFFM0U7Ozs7T0FJRztJQUNILFNBQVMsQ0FDUCxPQUE2QixFQUM3QixJQUFpQjtRQUVqQixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25ELElBQUksT0FBTyxZQUFZLEtBQUssV0FBVyxFQUFFO1lBQ3ZDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM3QjtRQUVELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQzlCLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2xCLGtGQUFrRjtZQUNsRiwySEFBMkg7WUFDM0gsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLGFBQWEsQ0FBQyxJQUFJLEVBQUU7Z0JBQ3JDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7YUFDNUQ7WUFDRCxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsRUFDRixVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNuQixNQUFNLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQztnQkFDM0MsS0FBSztnQkFDTCxPQUFPO2dCQUNQLFlBQVk7YUFDYixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ08sZUFBZSxDQUFDLE9BQTZCO1FBQ3JELE1BQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNwRSxNQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQztRQUMxRCxNQUFNLGFBQWEsR0FBRyxrQkFBa0IsSUFBSSxtQkFBbUIsSUFBSSxFQUFFLENBQUM7UUFDdEUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRTtZQUMvQixDQUFDLENBQUMsYUFBYSxFQUFFLE9BQU87WUFDeEIsQ0FBQyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ08saUNBQWlDLENBQUMsRUFDMUMsS0FBSyxFQUNMLE9BQU8sRUFDUCxZQUFZLEdBS2I7UUFDQyxJQUFJLEtBQUssWUFBWSxZQUFZLEVBQUU7WUFDakMsd0dBQXdHO1lBQ3hHLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFFbEUsT0FBTyxJQUFJLGlCQUFpQixDQUFDO2dCQUMzQixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUc7Z0JBQ2hCLEtBQUssRUFBRSxrQkFBa0I7YUFDMUIsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFUyxVQUFVLENBQ2xCLE9BQTZCLEVBQzdCLFlBQW9CO1FBRXBCLE1BQU0sT0FBTyxHQUFHLG1CQUFtQixPQUFPLENBQUMsR0FBRywrQkFBK0IsWUFBWSxxQkFBcUIsQ0FBQztRQUUvRyxtRUFBbUU7UUFDbkUsc0VBQXNFO1FBQ3RFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTFCLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7bUhBOUZVLHNCQUFzQjt1SEFBdEIsc0JBQXNCLGNBRFQsTUFBTTsyRkFDbkIsc0JBQXNCO2tCQURsQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIEh0dHBFcnJvclJlc3BvbnNlLFxuICBIdHRwRXZlbnQsXG4gIEh0dHBFdmVudFR5cGUsXG4gIEh0dHBIYW5kbGVyLFxuICBIdHRwSW50ZXJjZXB0b3IsXG4gIEh0dHBSZXF1ZXN0LFxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5FVkVSLCBPYnNlcnZhYmxlLCBUaW1lb3V0RXJyb3IsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGltZW91dCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExvZ2dlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9sb2dnZXInO1xuaW1wb3J0IHsgT2NjQ29uZmlnIH0gZnJvbSAnLi4vLi4vb2NjL2NvbmZpZy9vY2MtY29uZmlnJztcbmltcG9ydCB7IFdpbmRvd1JlZiB9IGZyb20gJy4uLy4uL3dpbmRvdy93aW5kb3ctcmVmJztcbmltcG9ydCB7IEhUVFBfVElNRU9VVF9DT05GSUcgfSBmcm9tICcuL2h0dHAtdGltZW91dC5jb25maWcnO1xuXG4vKipcbiAqIEl0IHRocm93cyBhbiBlcnJvciB3aGVuIGEgcmVxdWVzdCB0YWtlcyBsb25nZXIgdGhhbiB0aGUgc3BlY2lmaWVkIHRpbWUuXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgSHR0cFRpbWVvdXRJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG4gIHByb3RlY3RlZCBsb2dnZXIgPSBpbmplY3QoTG9nZ2VyU2VydmljZSk7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHdpbmRvd1JlZjogV2luZG93UmVmLCBwcm90ZWN0ZWQgY29uZmlnOiBPY2NDb25maWcpIHt9XG5cbiAgLyoqXG4gICAqIEl0IHRocm93cyBhbiBlcnJvciB3aGVuIGEgcmVxdWVzdCB0YWtlcyBsb25nZXIgdGhhbiB0aGUgc3BlY2lmaWVkIHRpbWUuXG4gICAqXG4gICAqIEl0IHN0YXJ0cyBjb3VudGluZyB0aW1lIGZvciB0aW1lb3V0IG9ubHkgYWZ0ZXIgdGhlIHJlcXVlc3QgaXMgc2VudC5cbiAgICovXG4gIGludGVyY2VwdChcbiAgICByZXF1ZXN0OiBIdHRwUmVxdWVzdDx1bmtub3duPixcbiAgICBuZXh0OiBIdHRwSGFuZGxlclxuICApOiBPYnNlcnZhYmxlPEh0dHBFdmVudDx1bmtub3duPj4ge1xuICAgIGNvbnN0IHRpbWVvdXRWYWx1ZSA9IHRoaXMuZ2V0VGltZW91dFZhbHVlKHJlcXVlc3QpO1xuICAgIGlmICh0eXBlb2YgdGltZW91dFZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcXVlc3QpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXF1ZXN0KS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChldmVudCkgPT4ge1xuICAgICAgICAvLyBXaGVuIGV2ZW50IGBIdHRwRXZlbnRUeXBlLlNlbnRgIGhhcHBlbnMsIGxldCdzIHN0YXJ0IGNvdW50aW5nIHRpbWUgZm9yIHRpbWVvdXQuXG4gICAgICAgIC8vIEJ1dCB3aGVuIGV2ZW50IGBIdHRwRXZlbnRUeXBlLlJlc3BvbnNlYCBpcyByZWNlaXZlZCwgYHN3aXRjaE1hcGAgd2lsbCB1bnN1YnNjcmliZSBmcm9tIHRoZSBmb2xsb3dpbmcgdGltZW91dCBvYnNlcnZhYmxlLlxuICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gSHR0cEV2ZW50VHlwZS5TZW50KSB7XG4gICAgICAgICAgcmV0dXJuIE5FVkVSLnBpcGUoc3RhcnRXaXRoKGV2ZW50KSwgdGltZW91dCh0aW1lb3V0VmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2YoZXZlbnQpO1xuICAgICAgfSksXG4gICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4ge1xuICAgICAgICB0aHJvdyB0aGlzLmNvbnZlcnRUaW1lb3V0VG9IdHRwRXJyb3JSZXNwb25zZSh7XG4gICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgICB0aW1lb3V0VmFsdWUsXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNvbmZpZ3VyZWQgdGltZW91dCB2YWx1ZSBmb3IgdGhlIGdpdmVuIHJlcXVlc3QuXG4gICAqXG4gICAqIFRoZSB0aW1lb3V0IGNhbiBiZSBjb25maWd1cmVkIHNwZWNpZmljYWxseSBmb3IgYSBjZXJ0YWluIHJlcXVlc3RcbiAgICogdmlhIEh0dHBDb250ZXh0VG9rZW4gYEhUVFBfVElNRU9VVF9DT05GSUdgLiBXaGVuIGl0J3Mgbm90IGF2YWlsYWJsZSxcbiAgICogdGhlIHZhbHVlIGlzIHRha2VuIGZyb20gdGhlIGdsb2JhbCBjb25maWcgYGNvbmZpZy5iYWNrZW5kLnRpbWVvdXRgLlxuICAgKlxuICAgKiBEZXBlbmRpbmcgb24gdGhlIHBsYXRmb3JtIChicm93c2VyIG9yIHNlcnZlciksIHRoZSBjb25maWd1cmVkIHRpbWVvdXQgdmFsdWUgY2FuIGJlIGRpZmZlcmVudC5cbiAgICovXG4gIHByb3RlY3RlZCBnZXRUaW1lb3V0VmFsdWUocmVxdWVzdDogSHR0cFJlcXVlc3Q8dW5rbm93bj4pOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGxvY2FsVGltZW91dENvbmZpZyA9IHJlcXVlc3QuY29udGV4dC5nZXQoSFRUUF9USU1FT1VUX0NPTkZJRyk7XG4gICAgY29uc3QgZ2xvYmFsVGltZW91dENvbmZpZyA9IHRoaXMuY29uZmlnPy5iYWNrZW5kPy50aW1lb3V0O1xuICAgIGNvbnN0IHRpbWVvdXRDb25maWcgPSBsb2NhbFRpbWVvdXRDb25maWcgPz8gZ2xvYmFsVGltZW91dENvbmZpZyA/PyB7fTtcbiAgICByZXR1cm4gdGhpcy53aW5kb3dSZWYuaXNCcm93c2VyKClcbiAgICAgID8gdGltZW91dENvbmZpZz8uYnJvd3NlclxuICAgICAgOiB0aW1lb3V0Q29uZmlnPy5zZXJ2ZXI7XG4gIH1cblxuICAvKipcbiAgICogSXQgY29udmVydHMgYW4gUnhKcyBgVGltZW91dEVycm9yYCAoY2F1c2VkIGJ5IHRoZSBgdGltZW91dCgpYCBvcGVyYXRvciksXG4gICAqIHRvIGEgbWFudWFsbHkgY3JhZnRlZCBgSHR0cEVycm9yUmVzcG9uc2VgIG9iamVjdC5cbiAgICpcbiAgICogSWYgdGhlIGVycm9yIGlzIG5vdCBhbiBSeEpzIGBUaW1lb3V0RXJyb3JgLCBpdCBqdXN0IHJldHVybnMgdGhlIG9yaWdpbmFsIGVycm9yLlxuICAgKi9cbiAgcHJvdGVjdGVkIGNvbnZlcnRUaW1lb3V0VG9IdHRwRXJyb3JSZXNwb25zZSh7XG4gICAgZXJyb3IsXG4gICAgcmVxdWVzdCxcbiAgICB0aW1lb3V0VmFsdWUsXG4gIH06IHtcbiAgICBlcnJvcjogdW5rbm93bjtcbiAgICByZXF1ZXN0OiBIdHRwUmVxdWVzdDx1bmtub3duPjtcbiAgICB0aW1lb3V0VmFsdWU6IG51bWJlcjtcbiAgfSk6IHVua25vd24gfCBIdHRwRXJyb3JSZXNwb25zZSB7XG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2YgVGltZW91dEVycm9yKSB7XG4gICAgICAvLyBjcmVhdGUgYSBuZXcgRXJyb3IgaGVyZSwgdG8gcmVjb3JkIHRoZSBjdXJyZW50IHN0YWNrdHJhY2UgKHdoaWNoIGlzIG5vdCBwcmVzZW50IGluIFJ4SnMgVGltZW91dEVycm9yKVxuICAgICAgY29uc3QgY3hIdHRwVGltZW91dEVycm9yID0gdGhpcy5idWlsZEVycm9yKHJlcXVlc3QsIHRpbWVvdXRWYWx1ZSk7XG5cbiAgICAgIHJldHVybiBuZXcgSHR0cEVycm9yUmVzcG9uc2Uoe1xuICAgICAgICB1cmw6IHJlcXVlc3QudXJsLFxuICAgICAgICBlcnJvcjogY3hIdHRwVGltZW91dEVycm9yLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBlcnJvcjtcbiAgfVxuXG4gIHByb3RlY3RlZCBidWlsZEVycm9yKFxuICAgIHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PHVua25vd24+LFxuICAgIHRpbWVvdXRWYWx1ZTogbnVtYmVyXG4gICk6IEVycm9yIHtcbiAgICBjb25zdCBtZXNzYWdlID0gYFJlcXVlc3QgdG8gVVJMICcke3JlcXVlc3QudXJsfScgZXhjZWVkZWQgZXhwZWN0ZWQgdGltZSBvZiAke3RpbWVvdXRWYWx1ZX1tcyBhbmQgd2FzIGFib3J0ZWQuYDtcblxuICAgIC8vIElmIGFuIEhUVFAgY2FsbCB0aW1lcyBvdXQsIGl0IGlzIGNvbnNpZGVyZWQgYW4gdW5leHBlY3RlZCBlcnJvci5cbiAgICAvLyBUbyBhc3Npc3Qgd2l0aCB0cm91Ymxlc2hvb3RpbmcsIHRoZSBlcnJvciBpcyBsb2dnZWQgdG8gdGhlIGNvbnNvbGUuXG4gICAgdGhpcy5sb2dnZXIud2FybihtZXNzYWdlKTtcblxuICAgIHJldHVybiBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIH1cbn1cbiJdfQ==