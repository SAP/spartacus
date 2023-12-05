/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { GlobalMessageType, HttpErrorHandler, HttpResponseStatus, } from '@spartacus/core';
import { ResponseError } from './bad-cost-center-request.model';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class BadCostCenterRequestHandler extends HttpErrorHandler {
    constructor(globalMessageService) {
        super(globalMessageService);
        this.globalMessageService = globalMessageService;
        this.responseStatus = HttpResponseStatus.BAD_REQUEST;
    }
    getPriority() {
        return 0 /* Priority.NORMAL */;
    }
    hasMatch(errorResponse) {
        return (super.hasMatch(errorResponse) &&
            this.getErrors(errorResponse).some(this.isEntityValidationError) &&
            this.isCostCenterRequest(errorResponse));
    }
    handleError(_request, response) {
        if (this.getErrors(response).some((e) => this.isEntityValidationError(e))) {
            this.globalMessageService.add({ key: 'checkoutB2B.invalidCostCenter' }, GlobalMessageType.MSG_TYPE_ERROR);
        }
    }
    getErrors(response) {
        return (response.error?.errors || []).filter((error) => error.type !== ResponseError.NO_LONGER_VALID);
    }
    isCostCenterRequest(errorResponse) {
        if (errorResponse?.url) {
            const url = new URL(errorResponse.url);
            return (url.pathname.endsWith('costcenter') &&
                new URLSearchParams(url.search).has('costCenterId'));
        }
        return false;
    }
    isEntityValidationError(error) {
        return error.type === ResponseError.INVALID_ENTITY;
    }
}
BadCostCenterRequestHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BadCostCenterRequestHandler, deps: [{ token: i1.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
BadCostCenterRequestHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BadCostCenterRequestHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BadCostCenterRequestHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.GlobalMessageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkLWNvc3QtY2VudGVyLXJlcXVlc3QuaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jaGVja291dC9iMmIvY29yZS9odHRwLWludGVyY2VwdG9ycy9iYWQtcmVxdWVzdC9iYWQtY29zdC1jZW50ZXItcmVxdWVzdC5oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFFTCxpQkFBaUIsRUFFakIsZ0JBQWdCLEVBQ2hCLGtCQUFrQixHQUVuQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7O0FBS2hFLE1BQU0sT0FBTywyQkFBNEIsU0FBUSxnQkFBZ0I7SUFHL0QsWUFBc0Isb0JBQTBDO1FBQzlELEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRFIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUZoRSxtQkFBYyxHQUFHLGtCQUFrQixDQUFDLFdBQVcsQ0FBQztJQUloRCxDQUFDO0lBRUQsV0FBVztRQUNULCtCQUF1QjtJQUN6QixDQUFDO0lBRUQsUUFBUSxDQUFDLGFBQWdDO1FBQ3ZDLE9BQU8sQ0FDTCxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztZQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUM7WUFDaEUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxDQUN4QyxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVcsQ0FBQyxRQUEwQixFQUFFLFFBQTJCO1FBQ2pFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3pFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQzNCLEVBQUUsR0FBRyxFQUFFLCtCQUErQixFQUFFLEVBQ3hDLGlCQUFpQixDQUFDLGNBQWMsQ0FDakMsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVTLFNBQVMsQ0FBQyxRQUEyQjtRQUM3QyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxNQUFNLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUMxQyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxhQUFhLENBQUMsZUFBZSxDQUM3RCxDQUFDO0lBQ0osQ0FBQztJQUVTLG1CQUFtQixDQUFDLGFBQWdDO1FBQzVELElBQUksYUFBYSxFQUFFLEdBQUcsRUFBRTtZQUN0QixNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkMsT0FBTyxDQUNMLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQztnQkFDbkMsSUFBSSxlQUFlLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FDcEQsQ0FBQztTQUNIO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRVMsdUJBQXVCLENBQUMsS0FBaUI7UUFDakQsT0FBTyxLQUFLLENBQUMsSUFBSSxLQUFLLGFBQWEsQ0FBQyxjQUFjLENBQUM7SUFDckQsQ0FBQzs7d0hBaERVLDJCQUEyQjs0SEFBM0IsMkJBQTJCLGNBRjFCLE1BQU07MkZBRVAsMkJBQTJCO2tCQUh2QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7XG4gIEVycm9yTW9kZWwsXG4gIEdsb2JhbE1lc3NhZ2VUeXBlLFxuICBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgSHR0cEVycm9ySGFuZGxlcixcbiAgSHR0cFJlc3BvbnNlU3RhdHVzLFxuICBQcmlvcml0eSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFJlc3BvbnNlRXJyb3IgfSBmcm9tICcuL2JhZC1jb3N0LWNlbnRlci1yZXF1ZXN0Lm1vZGVsJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEJhZENvc3RDZW50ZXJSZXF1ZXN0SGFuZGxlciBleHRlbmRzIEh0dHBFcnJvckhhbmRsZXIge1xuICByZXNwb25zZVN0YXR1cyA9IEh0dHBSZXNwb25zZVN0YXR1cy5CQURfUkVRVUVTVDtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZ2xvYmFsTWVzc2FnZVNlcnZpY2U6IEdsb2JhbE1lc3NhZ2VTZXJ2aWNlKSB7XG4gICAgc3VwZXIoZ2xvYmFsTWVzc2FnZVNlcnZpY2UpO1xuICB9XG5cbiAgZ2V0UHJpb3JpdHkoKTogUHJpb3JpdHkge1xuICAgIHJldHVybiBQcmlvcml0eS5OT1JNQUw7XG4gIH1cblxuICBoYXNNYXRjaChlcnJvclJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBzdXBlci5oYXNNYXRjaChlcnJvclJlc3BvbnNlKSAmJlxuICAgICAgdGhpcy5nZXRFcnJvcnMoZXJyb3JSZXNwb25zZSkuc29tZSh0aGlzLmlzRW50aXR5VmFsaWRhdGlvbkVycm9yKSAmJlxuICAgICAgdGhpcy5pc0Nvc3RDZW50ZXJSZXF1ZXN0KGVycm9yUmVzcG9uc2UpXG4gICAgKTtcbiAgfVxuXG4gIGhhbmRsZUVycm9yKF9yZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LCByZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2UpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5nZXRFcnJvcnMocmVzcG9uc2UpLnNvbWUoKGUpID0+IHRoaXMuaXNFbnRpdHlWYWxpZGF0aW9uRXJyb3IoZSkpKSB7XG4gICAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgICAgeyBrZXk6ICdjaGVja291dEIyQi5pbnZhbGlkQ29zdENlbnRlcicgfSxcbiAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGdldEVycm9ycyhyZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2UpOiBFcnJvck1vZGVsW10ge1xuICAgIHJldHVybiAocmVzcG9uc2UuZXJyb3I/LmVycm9ycyB8fCBbXSkuZmlsdGVyKFxuICAgICAgKGVycm9yOiBhbnkpID0+IGVycm9yLnR5cGUgIT09IFJlc3BvbnNlRXJyb3IuTk9fTE9OR0VSX1ZBTElEXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0Nvc3RDZW50ZXJSZXF1ZXN0KGVycm9yUmVzcG9uc2U6IEh0dHBFcnJvclJlc3BvbnNlKTogYm9vbGVhbiB7XG4gICAgaWYgKGVycm9yUmVzcG9uc2U/LnVybCkge1xuICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChlcnJvclJlc3BvbnNlLnVybCk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICB1cmwucGF0aG5hbWUuZW5kc1dpdGgoJ2Nvc3RjZW50ZXInKSAmJlxuICAgICAgICBuZXcgVVJMU2VhcmNoUGFyYW1zKHVybC5zZWFyY2gpLmhhcygnY29zdENlbnRlcklkJylcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzRW50aXR5VmFsaWRhdGlvbkVycm9yKGVycm9yOiBFcnJvck1vZGVsKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGVycm9yLnR5cGUgPT09IFJlc3BvbnNlRXJyb3IuSU5WQUxJRF9FTlRJVFk7XG4gIH1cbn1cbiJdfQ==