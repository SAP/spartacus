import { Injectable, inject, isDevMode } from '@angular/core';
import { LoggerService } from '../../../../logger';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { HttpErrorHandler } from '../http-error.handler';
import * as i0 from "@angular/core";
/**
 * Unknown Error Handler works as an fallback, to handle errors that were
 * not handled by any other error handlers
 */
export class UnknownErrorHandler extends HttpErrorHandler {
    constructor() {
        super(...arguments);
        this.responseStatus = HttpResponseStatus.UNKNOWN;
        this.logger = inject(LoggerService);
    }
    /**
     * hasMatch always returns true, to mach all errors
     */
    hasMatch(_errorResponse) {
        return true;
    }
    handleError(_request, errorResponse) {
        if (isDevMode() || this.isSsr()) {
            this.logger.warn(`An unknown http error occurred\n`, errorResponse.message);
        }
    }
    /**
     * Fallback priority assures that the handler is used as a last resort
     */
    getPriority() {
        return -50 /* Priority.FALLBACK */;
    }
}
UnknownErrorHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnknownErrorHandler, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
UnknownErrorHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnknownErrorHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnknownErrorHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5rbm93bi1lcnJvci5oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvZ2xvYmFsLW1lc3NhZ2UvaHR0cC1pbnRlcmNlcHRvcnMvaGFuZGxlcnMvdW5rbm93bi1lcnJvci91bmtub3duLWVycm9yLmhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTlELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVuRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7QUFFekQ7OztHQUdHO0FBSUgsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGdCQUFnQjtJQUh6RDs7UUFJRSxtQkFBYyxHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQztRQUVsQyxXQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0tBd0IxQztJQXRCQzs7T0FFRztJQUNILFFBQVEsQ0FBQyxjQUFpQztRQUN4QyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxXQUFXLENBQUMsUUFBMEIsRUFBRSxhQUFnQztRQUN0RSxJQUFJLFNBQVMsRUFBRSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDZCxrQ0FBa0MsRUFDbEMsYUFBYSxDQUFDLE9BQU8sQ0FDdEIsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVztRQUNULG1DQUF5QjtJQUMzQixDQUFDOztnSEExQlUsbUJBQW1CO29IQUFuQixtQkFBbUIsY0FGbEIsTUFBTTsyRkFFUCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgaW5qZWN0LCBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTG9nZ2VyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL2xvZ2dlcic7XG5pbXBvcnQgeyBQcmlvcml0eSB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWwvYXBwbGljYWJsZSc7XG5pbXBvcnQgeyBIdHRwUmVzcG9uc2VTdGF0dXMgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMvcmVzcG9uc2Utc3RhdHVzLm1vZGVsJztcbmltcG9ydCB7IEh0dHBFcnJvckhhbmRsZXIgfSBmcm9tICcuLi9odHRwLWVycm9yLmhhbmRsZXInO1xuXG4vKipcbiAqIFVua25vd24gRXJyb3IgSGFuZGxlciB3b3JrcyBhcyBhbiBmYWxsYmFjaywgdG8gaGFuZGxlIGVycm9ycyB0aGF0IHdlcmVcbiAqIG5vdCBoYW5kbGVkIGJ5IGFueSBvdGhlciBlcnJvciBoYW5kbGVyc1xuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVW5rbm93bkVycm9ySGFuZGxlciBleHRlbmRzIEh0dHBFcnJvckhhbmRsZXIge1xuICByZXNwb25zZVN0YXR1cyA9IEh0dHBSZXNwb25zZVN0YXR1cy5VTktOT1dOO1xuXG4gIHByb3RlY3RlZCBsb2dnZXIgPSBpbmplY3QoTG9nZ2VyU2VydmljZSk7XG5cbiAgLyoqXG4gICAqIGhhc01hdGNoIGFsd2F5cyByZXR1cm5zIHRydWUsIHRvIG1hY2ggYWxsIGVycm9yc1xuICAgKi9cbiAgaGFzTWF0Y2goX2Vycm9yUmVzcG9uc2U6IEh0dHBFcnJvclJlc3BvbnNlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBoYW5kbGVFcnJvcihfcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PiwgZXJyb3JSZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2UpIHtcbiAgICBpZiAoaXNEZXZNb2RlKCkgfHwgdGhpcy5pc1NzcigpKSB7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKFxuICAgICAgICBgQW4gdW5rbm93biBodHRwIGVycm9yIG9jY3VycmVkXFxuYCxcbiAgICAgICAgZXJyb3JSZXNwb25zZS5tZXNzYWdlXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGYWxsYmFjayBwcmlvcml0eSBhc3N1cmVzIHRoYXQgdGhlIGhhbmRsZXIgaXMgdXNlZCBhcyBhIGxhc3QgcmVzb3J0XG4gICAqL1xuICBnZXRQcmlvcml0eSgpIHtcbiAgICByZXR1cm4gUHJpb3JpdHkuRkFMTEJBQ0s7XG4gIH1cbn1cbiJdfQ==