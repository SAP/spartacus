import { Injectable } from '@angular/core';
import { GlobalMessageType, HttpErrorHandler, HttpResponseStatus, } from '@spartacus/core';
import { isVoucherError, voucherExceededError, voucherInvalidError, } from '../../utils/utils';
import * as i0 from "@angular/core";
export class BadVoucherRequestHandler extends HttpErrorHandler {
    constructor() {
        super(...arguments);
        this.responseStatus = HttpResponseStatus.BAD_REQUEST;
    }
    getPriority() {
        return 0 /* Priority.NORMAL */;
    }
    hasMatch(errorResponse) {
        return (super.hasMatch(errorResponse) &&
            this.getErrors(errorResponse).some(isVoucherError));
    }
    handleError(request, response) {
        this.handleVoucherExceededError(request, response);
        this.handleVoucherInvalidError(request, response);
    }
    handleVoucherExceededError(_request, response) {
        this.getErrors(response)
            .filter((e) => voucherExceededError(e))
            .forEach(() => {
            this.globalMessageService.add({ key: 'httpHandlers.voucherExceeded' }, GlobalMessageType.MSG_TYPE_ERROR);
        });
    }
    handleVoucherInvalidError(_request, response) {
        this.getErrors(response)
            .filter((e) => voucherInvalidError(e))
            .forEach(() => {
            this.globalMessageService.add({ key: 'httpHandlers.invalidCodeProvided' }, GlobalMessageType.MSG_TYPE_ERROR);
        });
    }
    getErrors(response) {
        return (response.error?.errors || []).filter((error) => error.type !== 'JaloObjectNoLongerValidError');
    }
}
BadVoucherRequestHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BadVoucherRequestHandler, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
BadVoucherRequestHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BadVoucherRequestHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BadVoucherRequestHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkLXZvdWNoZXItcmVxdWVzdC5oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9jb3JlL2h0dHAtaW50ZXJjZXB0b3JzL2hhbmRsZXJzL2JhZC12b3VjaGVyLXJlcXVlc3QuaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFFTCxpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLGtCQUFrQixHQUVuQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFDTCxjQUFjLEVBQ2Qsb0JBQW9CLEVBQ3BCLG1CQUFtQixHQUNwQixNQUFNLG1CQUFtQixDQUFDOztBQUszQixNQUFNLE9BQU8sd0JBQXlCLFNBQVEsZ0JBQWdCO0lBSDlEOztRQUlFLG1CQUFjLEdBQUcsa0JBQWtCLENBQUMsV0FBVyxDQUFDO0tBbURqRDtJQWpEQyxXQUFXO1FBQ1QsK0JBQXVCO0lBQ3pCLENBQUM7SUFFRCxRQUFRLENBQUMsYUFBZ0M7UUFDdkMsT0FBTyxDQUNMLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO1lBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUNuRCxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUF5QixFQUFFLFFBQTJCO1FBQ2hFLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLHlCQUF5QixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRVMsMEJBQTBCLENBQ2xDLFFBQTBCLEVBQzFCLFFBQTJCO1FBRTNCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO2FBQ3JCLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdEMsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQzNCLEVBQUUsR0FBRyxFQUFFLDhCQUE4QixFQUFFLEVBQ3ZDLGlCQUFpQixDQUFDLGNBQWMsQ0FDakMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVTLHlCQUF5QixDQUNqQyxRQUEwQixFQUMxQixRQUEyQjtRQUUzQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQzthQUNyQixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3JDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUMzQixFQUFFLEdBQUcsRUFBRSxrQ0FBa0MsRUFBRSxFQUMzQyxpQkFBaUIsQ0FBQyxjQUFjLENBQ2pDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFUyxTQUFTLENBQUMsUUFBMkI7UUFDN0MsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FDMUMsQ0FBQyxLQUFpQixFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLDhCQUE4QixDQUNyRSxDQUFDO0lBQ0osQ0FBQzs7cUhBbkRVLHdCQUF3Qjt5SEFBeEIsd0JBQXdCLGNBRnZCLE1BQU07MkZBRVAsd0JBQXdCO2tCQUhwQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEVycm9yTW9kZWwsXG4gIEdsb2JhbE1lc3NhZ2VUeXBlLFxuICBIdHRwRXJyb3JIYW5kbGVyLFxuICBIdHRwUmVzcG9uc2VTdGF0dXMsXG4gIFByaW9yaXR5LFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgaXNWb3VjaGVyRXJyb3IsXG4gIHZvdWNoZXJFeGNlZWRlZEVycm9yLFxuICB2b3VjaGVySW52YWxpZEVycm9yLFxufSBmcm9tICcuLi8uLi91dGlscy91dGlscyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBCYWRWb3VjaGVyUmVxdWVzdEhhbmRsZXIgZXh0ZW5kcyBIdHRwRXJyb3JIYW5kbGVyIHtcbiAgcmVzcG9uc2VTdGF0dXMgPSBIdHRwUmVzcG9uc2VTdGF0dXMuQkFEX1JFUVVFU1Q7XG5cbiAgZ2V0UHJpb3JpdHkoKTogUHJpb3JpdHkge1xuICAgIHJldHVybiBQcmlvcml0eS5OT1JNQUw7XG4gIH1cblxuICBoYXNNYXRjaChlcnJvclJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBzdXBlci5oYXNNYXRjaChlcnJvclJlc3BvbnNlKSAmJlxuICAgICAgdGhpcy5nZXRFcnJvcnMoZXJyb3JSZXNwb25zZSkuc29tZShpc1ZvdWNoZXJFcnJvcilcbiAgICApO1xuICB9XG5cbiAgaGFuZGxlRXJyb3IocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PiwgcmVzcG9uc2U6IEh0dHBFcnJvclJlc3BvbnNlKTogdm9pZCB7XG4gICAgdGhpcy5oYW5kbGVWb3VjaGVyRXhjZWVkZWRFcnJvcihyZXF1ZXN0LCByZXNwb25zZSk7XG4gICAgdGhpcy5oYW5kbGVWb3VjaGVySW52YWxpZEVycm9yKHJlcXVlc3QsIHJlc3BvbnNlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBoYW5kbGVWb3VjaGVyRXhjZWVkZWRFcnJvcihcbiAgICBfcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcbiAgICByZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2VcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5nZXRFcnJvcnMocmVzcG9uc2UpXG4gICAgICAuZmlsdGVyKChlKSA9PiB2b3VjaGVyRXhjZWVkZWRFcnJvcihlKSlcbiAgICAgIC5mb3JFYWNoKCgpID0+IHtcbiAgICAgICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICAgICAgeyBrZXk6ICdodHRwSGFuZGxlcnMudm91Y2hlckV4Y2VlZGVkJyB9LFxuICAgICAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX0VSUk9SXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBoYW5kbGVWb3VjaGVySW52YWxpZEVycm9yKFxuICAgIF9yZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LFxuICAgIHJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZVxuICApOiB2b2lkIHtcbiAgICB0aGlzLmdldEVycm9ycyhyZXNwb25zZSlcbiAgICAgIC5maWx0ZXIoKGUpID0+IHZvdWNoZXJJbnZhbGlkRXJyb3IoZSkpXG4gICAgICAuZm9yRWFjaCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgICAgIHsga2V5OiAnaHR0cEhhbmRsZXJzLmludmFsaWRDb2RlUHJvdmlkZWQnIH0sXG4gICAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEVycm9ycyhyZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2UpOiBFcnJvck1vZGVsW10ge1xuICAgIHJldHVybiAocmVzcG9uc2UuZXJyb3I/LmVycm9ycyB8fCBbXSkuZmlsdGVyKFxuICAgICAgKGVycm9yOiBFcnJvck1vZGVsKSA9PiBlcnJvci50eXBlICE9PSAnSmFsb09iamVjdE5vTG9uZ2VyVmFsaWRFcnJvcidcbiAgICApO1xuICB9XG59XG4iXX0=