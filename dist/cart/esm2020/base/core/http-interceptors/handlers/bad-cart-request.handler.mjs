import { Injectable } from '@angular/core';
import { GlobalMessageType, HttpErrorHandler, HttpResponseStatus, } from '@spartacus/core';
import { isCartError, isCartNotFoundError } from '../../utils/utils';
import * as i0 from "@angular/core";
export class BadCartRequestHandler extends HttpErrorHandler {
    constructor() {
        super(...arguments);
        this.responseStatus = HttpResponseStatus.BAD_REQUEST;
    }
    getPriority() {
        return 0 /* Priority.NORMAL */;
    }
    hasMatch(errorResponse) {
        return (super.hasMatch(errorResponse) &&
            this.getErrors(errorResponse).some(isCartError));
    }
    handleError(request, response) {
        this.handleCartNotFoundError(request, response);
        this.handleOtherCartErrors(request, response);
    }
    handleCartNotFoundError(_request, response) {
        this.getErrors(response)
            .filter((e) => isCartNotFoundError(e))
            .forEach(() => {
            this.globalMessageService.add({ key: 'httpHandlers.cartNotFound' }, GlobalMessageType.MSG_TYPE_ERROR);
        });
    }
    handleOtherCartErrors(_request, response) {
        this.getErrors(response)
            .filter((e) => e.reason !== 'notFound' || e.subjectType !== 'cart')
            .forEach((error) => {
            this.globalMessageService.add(error.message
                ? error.message
                : { key: 'httpHandlers.otherCartErrors' }, GlobalMessageType.MSG_TYPE_ERROR);
        });
    }
    getErrors(response) {
        return (response.error?.errors || []).filter((error) => error.type !== 'JaloObjectNoLongerValidError');
    }
}
BadCartRequestHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BadCartRequestHandler, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
BadCartRequestHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BadCartRequestHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BadCartRequestHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkLWNhcnQtcmVxdWVzdC5oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9jb3JlL2h0dHAtaW50ZXJjZXB0b3JzL2hhbmRsZXJzL2JhZC1jYXJ0LXJlcXVlc3QuaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFFTCxpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLGtCQUFrQixHQUVuQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFLckUsTUFBTSxPQUFPLHFCQUFzQixTQUFRLGdCQUFnQjtJQUgzRDs7UUFJRSxtQkFBYyxHQUFHLGtCQUFrQixDQUFDLFdBQVcsQ0FBQztLQXFEakQ7SUFuREMsV0FBVztRQUNULCtCQUF1QjtJQUN6QixDQUFDO0lBRUQsUUFBUSxDQUFDLGFBQWdDO1FBQ3ZDLE9BQU8sQ0FDTCxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztZQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FDaEQsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBeUIsRUFBRSxRQUEyQjtRQUNoRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVTLHVCQUF1QixDQUMvQixRQUEwQixFQUMxQixRQUEyQjtRQUUzQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQzthQUNyQixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3JDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUMzQixFQUFFLEdBQUcsRUFBRSwyQkFBMkIsRUFBRSxFQUNwQyxpQkFBaUIsQ0FBQyxjQUFjLENBQ2pDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFUyxxQkFBcUIsQ0FDN0IsUUFBMEIsRUFDMUIsUUFBMkI7UUFFM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7YUFDckIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLFVBQVUsSUFBSSxDQUFDLENBQUMsV0FBVyxLQUFLLE1BQU0sQ0FBQzthQUNsRSxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNqQixJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUMzQixLQUFLLENBQUMsT0FBTztnQkFDWCxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU87Z0JBQ2YsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLDhCQUE4QixFQUFFLEVBQzNDLGlCQUFpQixDQUFDLGNBQWMsQ0FDakMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVTLFNBQVMsQ0FBQyxRQUEyQjtRQUM3QyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxNQUFNLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUMxQyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyw4QkFBOEIsQ0FDOUQsQ0FBQztJQUNKLENBQUM7O2tIQXJEVSxxQkFBcUI7c0hBQXJCLHFCQUFxQixjQUZwQixNQUFNOzJGQUVQLHFCQUFxQjtrQkFIakMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBFcnJvck1vZGVsLFxuICBHbG9iYWxNZXNzYWdlVHlwZSxcbiAgSHR0cEVycm9ySGFuZGxlcixcbiAgSHR0cFJlc3BvbnNlU3RhdHVzLFxuICBQcmlvcml0eSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGlzQ2FydEVycm9yLCBpc0NhcnROb3RGb3VuZEVycm9yIH0gZnJvbSAnLi4vLi4vdXRpbHMvdXRpbHMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQmFkQ2FydFJlcXVlc3RIYW5kbGVyIGV4dGVuZHMgSHR0cEVycm9ySGFuZGxlciB7XG4gIHJlc3BvbnNlU3RhdHVzID0gSHR0cFJlc3BvbnNlU3RhdHVzLkJBRF9SRVFVRVNUO1xuXG4gIGdldFByaW9yaXR5KCk6IFByaW9yaXR5IHtcbiAgICByZXR1cm4gUHJpb3JpdHkuTk9STUFMO1xuICB9XG5cbiAgaGFzTWF0Y2goZXJyb3JSZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2UpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgc3VwZXIuaGFzTWF0Y2goZXJyb3JSZXNwb25zZSkgJiZcbiAgICAgIHRoaXMuZ2V0RXJyb3JzKGVycm9yUmVzcG9uc2UpLnNvbWUoaXNDYXJ0RXJyb3IpXG4gICAgKTtcbiAgfVxuXG4gIGhhbmRsZUVycm9yKHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sIHJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZSk6IHZvaWQge1xuICAgIHRoaXMuaGFuZGxlQ2FydE5vdEZvdW5kRXJyb3IocmVxdWVzdCwgcmVzcG9uc2UpO1xuICAgIHRoaXMuaGFuZGxlT3RoZXJDYXJ0RXJyb3JzKHJlcXVlc3QsIHJlc3BvbnNlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBoYW5kbGVDYXJ0Tm90Rm91bmRFcnJvcihcbiAgICBfcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcbiAgICByZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2VcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5nZXRFcnJvcnMocmVzcG9uc2UpXG4gICAgICAuZmlsdGVyKChlKSA9PiBpc0NhcnROb3RGb3VuZEVycm9yKGUpKVxuICAgICAgLmZvckVhY2goKCkgPT4ge1xuICAgICAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgICAgICB7IGtleTogJ2h0dHBIYW5kbGVycy5jYXJ0Tm90Rm91bmQnIH0sXG4gICAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGhhbmRsZU90aGVyQ2FydEVycm9ycyhcbiAgICBfcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcbiAgICByZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2VcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5nZXRFcnJvcnMocmVzcG9uc2UpXG4gICAgICAuZmlsdGVyKChlKSA9PiBlLnJlYXNvbiAhPT0gJ25vdEZvdW5kJyB8fCBlLnN1YmplY3RUeXBlICE9PSAnY2FydCcpXG4gICAgICAuZm9yRWFjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICAgICAgZXJyb3IubWVzc2FnZVxuICAgICAgICAgICAgPyBlcnJvci5tZXNzYWdlXG4gICAgICAgICAgICA6IHsga2V5OiAnaHR0cEhhbmRsZXJzLm90aGVyQ2FydEVycm9ycycgfSxcbiAgICAgICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9FUlJPUlxuICAgICAgICApO1xuICAgICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RXJyb3JzKHJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZSk6IEVycm9yTW9kZWxbXSB7XG4gICAgcmV0dXJuIChyZXNwb25zZS5lcnJvcj8uZXJyb3JzIHx8IFtdKS5maWx0ZXIoXG4gICAgICAoZXJyb3I6IGFueSkgPT4gZXJyb3IudHlwZSAhPT0gJ0phbG9PYmplY3ROb0xvbmdlclZhbGlkRXJyb3InXG4gICAgKTtcbiAgfVxufVxuIl19