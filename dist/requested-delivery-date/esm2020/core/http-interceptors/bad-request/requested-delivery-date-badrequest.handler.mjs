import { Injectable } from '@angular/core';
import { GlobalMessageType, HttpErrorHandler, HttpResponseStatus, } from '@spartacus/core';
import * as i0 from "@angular/core";
export class RequestedDeliveryDateBadRequestHandler extends HttpErrorHandler {
    constructor() {
        super(...arguments);
        this.responseStatus = HttpResponseStatus.BAD_REQUEST;
    }
    hasMatch(errorResponse) {
        return (super.hasMatch(errorResponse) && this.getErrors(errorResponse)?.length > 0);
    }
    handleError(request, response) {
        if (request && this.getErrors(response)?.length) {
            this.globalMessageService.add({ key: 'requestedDeliveryDate.errorMessage' }, GlobalMessageType.MSG_TYPE_ERROR);
        }
    }
    getErrors(response) {
        return (response.error?.errors).filter((error) => error?.type === 'ValidationError' &&
            error?.message === 'checkout.multi.requestedretrievaldatevalid.error');
    }
    getPriority() {
        return 0 /* Priority.NORMAL */;
    }
}
RequestedDeliveryDateBadRequestHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateBadRequestHandler, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
RequestedDeliveryDateBadRequestHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateBadRequestHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateBadRequestHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdGVkLWRlbGl2ZXJ5LWRhdGUtYmFkcmVxdWVzdC5oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3JlcXVlc3RlZC1kZWxpdmVyeS1kYXRlL2NvcmUvaHR0cC1pbnRlcmNlcHRvcnMvYmFkLXJlcXVlc3QvcmVxdWVzdGVkLWRlbGl2ZXJ5LWRhdGUtYmFkcmVxdWVzdC5oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUVMLGlCQUFpQixFQUNqQixnQkFBZ0IsRUFDaEIsa0JBQWtCLEdBRW5CLE1BQU0saUJBQWlCLENBQUM7O0FBS3pCLE1BQU0sT0FBTyxzQ0FBdUMsU0FBUSxnQkFBZ0I7SUFINUU7O1FBSUUsbUJBQWMsR0FBRyxrQkFBa0IsQ0FBQyxXQUFXLENBQUM7S0E0QmpEO0lBMUJDLFFBQVEsQ0FBQyxhQUFnQztRQUN2QyxPQUFPLENBQ0wsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQzNFLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXlCLEVBQUUsUUFBMkI7UUFDaEUsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxNQUFNLEVBQUU7WUFDL0MsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FDM0IsRUFBRSxHQUFHLEVBQUUsb0NBQW9DLEVBQUUsRUFDN0MsaUJBQWlCLENBQUMsY0FBYyxDQUNqQyxDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRVMsU0FBUyxDQUFDLFFBQTJCO1FBQzdDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FDcEMsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUNiLEtBQUssRUFBRSxJQUFJLEtBQUssaUJBQWlCO1lBQ2pDLEtBQUssRUFBRSxPQUFPLEtBQUssa0RBQWtELENBQ3hFLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULCtCQUF1QjtJQUN6QixDQUFDOzttSUE1QlUsc0NBQXNDO3VJQUF0QyxzQ0FBc0MsY0FGckMsTUFBTTsyRkFFUCxzQ0FBc0M7a0JBSGxELFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRXJyb3JNb2RlbCxcbiAgR2xvYmFsTWVzc2FnZVR5cGUsXG4gIEh0dHBFcnJvckhhbmRsZXIsXG4gIEh0dHBSZXNwb25zZVN0YXR1cyxcbiAgUHJpb3JpdHksXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBSZXF1ZXN0ZWREZWxpdmVyeURhdGVCYWRSZXF1ZXN0SGFuZGxlciBleHRlbmRzIEh0dHBFcnJvckhhbmRsZXIge1xuICByZXNwb25zZVN0YXR1cyA9IEh0dHBSZXNwb25zZVN0YXR1cy5CQURfUkVRVUVTVDtcblxuICBoYXNNYXRjaChlcnJvclJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBzdXBlci5oYXNNYXRjaChlcnJvclJlc3BvbnNlKSAmJiB0aGlzLmdldEVycm9ycyhlcnJvclJlc3BvbnNlKT8ubGVuZ3RoID4gMFxuICAgICk7XG4gIH1cblxuICBoYW5kbGVFcnJvcihyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LCByZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2UpIHtcbiAgICBpZiAocmVxdWVzdCAmJiB0aGlzLmdldEVycm9ycyhyZXNwb25zZSk/Lmxlbmd0aCkge1xuICAgICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICAgIHsga2V5OiAncmVxdWVzdGVkRGVsaXZlcnlEYXRlLmVycm9yTWVzc2FnZScgfSxcbiAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGdldEVycm9ycyhyZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2UpOiBFcnJvck1vZGVsW10ge1xuICAgIHJldHVybiAocmVzcG9uc2UuZXJyb3I/LmVycm9ycykuZmlsdGVyKFxuICAgICAgKGVycm9yOiBhbnkpID0+XG4gICAgICAgIGVycm9yPy50eXBlID09PSAnVmFsaWRhdGlvbkVycm9yJyAmJlxuICAgICAgICBlcnJvcj8ubWVzc2FnZSA9PT0gJ2NoZWNrb3V0Lm11bHRpLnJlcXVlc3RlZHJldHJpZXZhbGRhdGV2YWxpZC5lcnJvcidcbiAgICApO1xuICB9XG5cbiAgZ2V0UHJpb3JpdHkoKTogUHJpb3JpdHkge1xuICAgIHJldHVybiBQcmlvcml0eS5OT1JNQUw7XG4gIH1cbn1cbiJdfQ==