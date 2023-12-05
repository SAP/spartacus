import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { GlobalMessageType, HttpErrorHandler, HttpResponseStatus, getLastValueSync, } from '@spartacus/core';
import { isNotFoundError } from '../../utils/utils';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class NotFoundTicketRequestHandler extends HttpErrorHandler {
    constructor(globalMessageService, routingService, platformId) {
        super(globalMessageService, platformId);
        this.globalMessageService = globalMessageService;
        this.routingService = routingService;
        this.platformId = platformId;
        this.responseStatus = HttpResponseStatus.NOT_FOUND;
    }
    getPriority() {
        return 0 /* Priority.NORMAL */;
    }
    hasMatch(errorResponse) {
        return (super.hasMatch(errorResponse) &&
            this.isCustomerTicketingDetailsRoute() &&
            this.getErrors(errorResponse).some(isNotFoundError));
    }
    handleError(request, response) {
        this.handleTicketNotFoundError(request, response);
    }
    isCustomerTicketingDetailsRoute() {
        return (getLastValueSync(this.routingService.getRouterState())?.state
            ?.semanticRoute === 'supportTicketDetails');
    }
    handleTicketNotFoundError(_request, response) {
        this.getErrors(response)
            .filter((e) => isNotFoundError(e))
            .forEach(() => {
            this.routingService.go({ cxRoute: 'supportTickets' });
            this.globalMessageService.add({ key: 'customerTicketingDetails.ticketNotFound' }, GlobalMessageType.MSG_TYPE_ERROR);
        });
    }
    getErrors(response) {
        return response.error?.errors || [];
    }
}
NotFoundTicketRequestHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NotFoundTicketRequestHandler, deps: [{ token: i1.GlobalMessageService }, { token: i1.RoutingService }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Injectable });
NotFoundTicketRequestHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NotFoundTicketRequestHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NotFoundTicketRequestHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.GlobalMessageService }, { type: i1.RoutingService }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90LWZvdW5kLXRpY2tldC1yZXF1ZXN0LmhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY3VzdG9tZXItdGlja2V0aW5nL2NvcmUvaHR0cC1pbnRlcmNlcHRvcnMvaGFuZGxlcnMvbm90LWZvdW5kLXRpY2tldC1yZXF1ZXN0LmhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFFTCxpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLGtCQUFrQixFQUlsQixnQkFBZ0IsR0FDakIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7OztBQUlwRCxNQUFNLE9BQU8sNEJBQTZCLFNBQVEsZ0JBQWdCO0lBR2hFLFlBQ1ksb0JBQTBDLEVBQzFDLGNBQThCLEVBQ1QsVUFBbUI7UUFFbEQsS0FBSyxDQUFDLG9CQUFvQixFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBSjlCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ1QsZUFBVSxHQUFWLFVBQVUsQ0FBUztRQUxwRCxtQkFBYyxHQUFHLGtCQUFrQixDQUFDLFNBQVMsQ0FBQztJQVE5QyxDQUFDO0lBRUQsV0FBVztRQUNULCtCQUF1QjtJQUN6QixDQUFDO0lBRUQsUUFBUSxDQUFDLGFBQWdDO1FBQ3ZDLE9BQU8sQ0FDTCxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztZQUM3QixJQUFJLENBQUMsK0JBQStCLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ3BELENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXlCLEVBQUUsUUFBMkI7UUFDaEUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRVMsK0JBQStCO1FBQ3ZDLE9BQU8sQ0FDTCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsS0FBSztZQUMzRCxFQUFFLGFBQWEsS0FBSyxzQkFBc0IsQ0FDN0MsQ0FBQztJQUNKLENBQUM7SUFFUyx5QkFBeUIsQ0FDakMsUUFBMEIsRUFDMUIsUUFBMkI7UUFFM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7YUFDckIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDakMsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUMzQixFQUFFLEdBQUcsRUFBRSx5Q0FBeUMsRUFBRSxFQUNsRCxpQkFBaUIsQ0FBQyxjQUFjLENBQ2pDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFUyxTQUFTLENBQUMsUUFBMkI7UUFDN0MsT0FBTyxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFDdEMsQ0FBQzs7eUhBbkRVLDRCQUE0QixvRkFNN0IsV0FBVzs2SEFOViw0QkFBNEIsY0FGM0IsTUFBTTsyRkFFUCw0QkFBNEI7a0JBSHhDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzswQkFPSSxNQUFNOzJCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBFcnJvck1vZGVsLFxuICBHbG9iYWxNZXNzYWdlVHlwZSxcbiAgSHR0cEVycm9ySGFuZGxlcixcbiAgSHR0cFJlc3BvbnNlU3RhdHVzLFxuICBQcmlvcml0eSxcbiAgUm91dGluZ1NlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBnZXRMYXN0VmFsdWVTeW5jLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgaXNOb3RGb3VuZEVycm9yIH0gZnJvbSAnLi4vLi4vdXRpbHMvdXRpbHMnO1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE5vdEZvdW5kVGlja2V0UmVxdWVzdEhhbmRsZXIgZXh0ZW5kcyBIdHRwRXJyb3JIYW5kbGVyIHtcbiAgcmVzcG9uc2VTdGF0dXMgPSBIdHRwUmVzcG9uc2VTdGF0dXMuTk9UX0ZPVU5EO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBnbG9iYWxNZXNzYWdlU2VydmljZTogR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcm90ZWN0ZWQgcGxhdGZvcm1JZD86IE9iamVjdFxuICApIHtcbiAgICBzdXBlcihnbG9iYWxNZXNzYWdlU2VydmljZSwgcGxhdGZvcm1JZCk7XG4gIH1cblxuICBnZXRQcmlvcml0eSgpOiBQcmlvcml0eSB7XG4gICAgcmV0dXJuIFByaW9yaXR5Lk5PUk1BTDtcbiAgfVxuXG4gIGhhc01hdGNoKGVycm9yUmVzcG9uc2U6IEh0dHBFcnJvclJlc3BvbnNlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHN1cGVyLmhhc01hdGNoKGVycm9yUmVzcG9uc2UpICYmXG4gICAgICB0aGlzLmlzQ3VzdG9tZXJUaWNrZXRpbmdEZXRhaWxzUm91dGUoKSAmJlxuICAgICAgdGhpcy5nZXRFcnJvcnMoZXJyb3JSZXNwb25zZSkuc29tZShpc05vdEZvdW5kRXJyb3IpXG4gICAgKTtcbiAgfVxuXG4gIGhhbmRsZUVycm9yKHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sIHJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZSk6IHZvaWQge1xuICAgIHRoaXMuaGFuZGxlVGlja2V0Tm90Rm91bmRFcnJvcihyZXF1ZXN0LCByZXNwb25zZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNDdXN0b21lclRpY2tldGluZ0RldGFpbHNSb3V0ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgZ2V0TGFzdFZhbHVlU3luYyh0aGlzLnJvdXRpbmdTZXJ2aWNlLmdldFJvdXRlclN0YXRlKCkpPy5zdGF0ZVxuICAgICAgICA/LnNlbWFudGljUm91dGUgPT09ICdzdXBwb3J0VGlja2V0RGV0YWlscydcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGhhbmRsZVRpY2tldE5vdEZvdW5kRXJyb3IoXG4gICAgX3JlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sXG4gICAgcmVzcG9uc2U6IEh0dHBFcnJvclJlc3BvbnNlXG4gICk6IHZvaWQge1xuICAgIHRoaXMuZ2V0RXJyb3JzKHJlc3BvbnNlKVxuICAgICAgLmZpbHRlcigoZSkgPT4gaXNOb3RGb3VuZEVycm9yKGUpKVxuICAgICAgLmZvckVhY2goKCkgPT4ge1xuICAgICAgICB0aGlzLnJvdXRpbmdTZXJ2aWNlLmdvKHsgY3hSb3V0ZTogJ3N1cHBvcnRUaWNrZXRzJyB9KTtcbiAgICAgICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICAgICAgeyBrZXk6ICdjdXN0b21lclRpY2tldGluZ0RldGFpbHMudGlja2V0Tm90Rm91bmQnIH0sXG4gICAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEVycm9ycyhyZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2UpOiBFcnJvck1vZGVsW10ge1xuICAgIHJldHVybiByZXNwb25zZS5lcnJvcj8uZXJyb3JzIHx8IFtdO1xuICB9XG59XG4iXX0=