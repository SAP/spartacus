import { Injectable } from '@angular/core';
import { GlobalMessageType, HttpErrorHandler, HttpResponseStatus, } from '@spartacus/core';
import * as i0 from "@angular/core";
export class OrganizationBadRequestHandler extends HttpErrorHandler {
    constructor() {
        super(...arguments);
        this.responseStatus = HttpResponseStatus.BAD_REQUEST;
        this.costCenterMask = /ambiguous unique keys \{code\=(.*)\} for model B2BCostCenterModel/;
        this.unitMask = /ambiguous unique keys \{uid\=(.*)\} for model B2BUnitModel/;
        this.permissionMask = /Approval Permission with code\: (.*) already exists\./;
        this.unknownMask = /Model saving error\./;
    }
    hasMatch(errorResponse) {
        return super.hasMatch(errorResponse) && this.matchMask(errorResponse);
    }
    handleError(_request, response) {
        this.getErrors(response).forEach(({ message }) => {
            if (message) {
                // Handle cost center conflict
                this.handleOrganizationConflict(message, this.costCenterMask, 'costCenter');
                // Handle unit conflict
                this.handleOrganizationConflict(message, this.unitMask, 'unit');
                // Handle unit conflict
                this.handleOrganizationConflict(message, this.permissionMask, 'permission');
                // Handle unknown conflict
                this.handleOrganizationConflict(message, this.unknownMask, 'unknown');
            }
        });
    }
    matchMask(response) {
        return this.getErrors(response).some((error) => [
            this.costCenterMask,
            this.unitMask,
            this.permissionMask,
            this.unknownMask,
        ].some((mask) => mask.test(error.message ?? '')));
    }
    handleOrganizationConflict(message, mask, key) {
        const result = message.match(mask);
        const params = { code: result?.[1] };
        if (result) {
            this.globalMessageService.add({ key: `organization.httpHandlers.conflict.${key}`, params }, GlobalMessageType.MSG_TYPE_ERROR);
        }
    }
    getErrors(response) {
        return (response.error?.errors || []).filter((error) => error.type === 'ModelSavingError' || error.type === 'DuplicateUidError');
    }
    getPriority() {
        return 0 /* Priority.NORMAL */;
    }
}
OrganizationBadRequestHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationBadRequestHandler, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
OrganizationBadRequestHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationBadRequestHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationBadRequestHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkLXJlcXVlc3QuaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZS9odHRwLWludGVyY2VwdG9ycy9iYWQtcmVxdWVzdC9iYWQtcmVxdWVzdC5oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUVMLGlCQUFpQixFQUNqQixnQkFBZ0IsRUFDaEIsa0JBQWtCLEdBRW5CLE1BQU0saUJBQWlCLENBQUM7O0FBS3pCLE1BQU0sT0FBTyw2QkFBOEIsU0FBUSxnQkFBZ0I7SUFIbkU7O1FBSUUsbUJBQWMsR0FBRyxrQkFBa0IsQ0FBQyxXQUFXLENBQUM7UUFFdEMsbUJBQWMsR0FDdEIsbUVBQW1FLENBQUM7UUFDNUQsYUFBUSxHQUNoQiw0REFBNEQsQ0FBQztRQUNyRCxtQkFBYyxHQUN0Qix1REFBdUQsQ0FBQztRQUNoRCxnQkFBVyxHQUFHLHNCQUFzQixDQUFDO0tBaUVoRDtJQS9EQyxRQUFRLENBQUMsYUFBZ0M7UUFDdkMsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELFdBQVcsQ0FBQyxRQUEwQixFQUFFLFFBQTJCO1FBQ2pFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQWMsRUFBRSxFQUFFO1lBQzNELElBQUksT0FBTyxFQUFFO2dCQUNYLDhCQUE4QjtnQkFDOUIsSUFBSSxDQUFDLDBCQUEwQixDQUM3QixPQUFPLEVBQ1AsSUFBSSxDQUFDLGNBQWMsRUFDbkIsWUFBWSxDQUNiLENBQUM7Z0JBQ0YsdUJBQXVCO2dCQUN2QixJQUFJLENBQUMsMEJBQTBCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ2hFLHVCQUF1QjtnQkFDdkIsSUFBSSxDQUFDLDBCQUEwQixDQUM3QixPQUFPLEVBQ1AsSUFBSSxDQUFDLGNBQWMsRUFDbkIsWUFBWSxDQUNiLENBQUM7Z0JBQ0YsMEJBQTBCO2dCQUMxQixJQUFJLENBQUMsMEJBQTBCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDdkU7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFUyxTQUFTLENBQUMsUUFBMkI7UUFDN0MsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQzdDO1lBQ0UsSUFBSSxDQUFDLGNBQWM7WUFDbkIsSUFBSSxDQUFDLFFBQVE7WUFDYixJQUFJLENBQUMsY0FBYztZQUNuQixJQUFJLENBQUMsV0FBVztTQUNqQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQ2pELENBQUM7SUFDSixDQUFDO0lBRVMsMEJBQTBCLENBQ2xDLE9BQWUsRUFDZixJQUFZLEVBQ1osR0FBVztRQUVYLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsTUFBTSxNQUFNLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNyQyxJQUFJLE1BQU0sRUFBRTtZQUNWLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQzNCLEVBQUUsR0FBRyxFQUFFLHNDQUFzQyxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFDNUQsaUJBQWlCLENBQUMsY0FBYyxDQUNqQyxDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRVMsU0FBUyxDQUFDLFFBQTJCO1FBQzdDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQzFDLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FDYixLQUFLLENBQUMsSUFBSSxLQUFLLGtCQUFrQixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssbUJBQW1CLENBQzFFLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULCtCQUF1QjtJQUN6QixDQUFDOzswSEF6RVUsNkJBQTZCOzhIQUE3Qiw2QkFBNkIsY0FGNUIsTUFBTTsyRkFFUCw2QkFBNkI7a0JBSHpDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRXJyb3JNb2RlbCxcbiAgR2xvYmFsTWVzc2FnZVR5cGUsXG4gIEh0dHBFcnJvckhhbmRsZXIsXG4gIEh0dHBSZXNwb25zZVN0YXR1cyxcbiAgUHJpb3JpdHksXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBPcmdhbml6YXRpb25CYWRSZXF1ZXN0SGFuZGxlciBleHRlbmRzIEh0dHBFcnJvckhhbmRsZXIge1xuICByZXNwb25zZVN0YXR1cyA9IEh0dHBSZXNwb25zZVN0YXR1cy5CQURfUkVRVUVTVDtcblxuICBwcm90ZWN0ZWQgY29zdENlbnRlck1hc2sgPVxuICAgIC9hbWJpZ3VvdXMgdW5pcXVlIGtleXMgXFx7Y29kZVxcPSguKilcXH0gZm9yIG1vZGVsIEIyQkNvc3RDZW50ZXJNb2RlbC87XG4gIHByb3RlY3RlZCB1bml0TWFzayA9XG4gICAgL2FtYmlndW91cyB1bmlxdWUga2V5cyBcXHt1aWRcXD0oLiopXFx9IGZvciBtb2RlbCBCMkJVbml0TW9kZWwvO1xuICBwcm90ZWN0ZWQgcGVybWlzc2lvbk1hc2sgPVxuICAgIC9BcHByb3ZhbCBQZXJtaXNzaW9uIHdpdGggY29kZVxcOiAoLiopIGFscmVhZHkgZXhpc3RzXFwuLztcbiAgcHJvdGVjdGVkIHVua25vd25NYXNrID0gL01vZGVsIHNhdmluZyBlcnJvclxcLi87XG5cbiAgaGFzTWF0Y2goZXJyb3JSZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2UpOiBib29sZWFuIHtcbiAgICByZXR1cm4gc3VwZXIuaGFzTWF0Y2goZXJyb3JSZXNwb25zZSkgJiYgdGhpcy5tYXRjaE1hc2soZXJyb3JSZXNwb25zZSk7XG4gIH1cblxuICBoYW5kbGVFcnJvcihfcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PiwgcmVzcG9uc2U6IEh0dHBFcnJvclJlc3BvbnNlKTogdm9pZCB7XG4gICAgdGhpcy5nZXRFcnJvcnMocmVzcG9uc2UpLmZvckVhY2goKHsgbWVzc2FnZSB9OiBFcnJvck1vZGVsKSA9PiB7XG4gICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAvLyBIYW5kbGUgY29zdCBjZW50ZXIgY29uZmxpY3RcbiAgICAgICAgdGhpcy5oYW5kbGVPcmdhbml6YXRpb25Db25mbGljdChcbiAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgIHRoaXMuY29zdENlbnRlck1hc2ssXG4gICAgICAgICAgJ2Nvc3RDZW50ZXInXG4gICAgICAgICk7XG4gICAgICAgIC8vIEhhbmRsZSB1bml0IGNvbmZsaWN0XG4gICAgICAgIHRoaXMuaGFuZGxlT3JnYW5pemF0aW9uQ29uZmxpY3QobWVzc2FnZSwgdGhpcy51bml0TWFzaywgJ3VuaXQnKTtcbiAgICAgICAgLy8gSGFuZGxlIHVuaXQgY29uZmxpY3RcbiAgICAgICAgdGhpcy5oYW5kbGVPcmdhbml6YXRpb25Db25mbGljdChcbiAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgIHRoaXMucGVybWlzc2lvbk1hc2ssXG4gICAgICAgICAgJ3Blcm1pc3Npb24nXG4gICAgICAgICk7XG4gICAgICAgIC8vIEhhbmRsZSB1bmtub3duIGNvbmZsaWN0XG4gICAgICAgIHRoaXMuaGFuZGxlT3JnYW5pemF0aW9uQ29uZmxpY3QobWVzc2FnZSwgdGhpcy51bmtub3duTWFzaywgJ3Vua25vd24nKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBtYXRjaE1hc2socmVzcG9uc2U6IEh0dHBFcnJvclJlc3BvbnNlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RXJyb3JzKHJlc3BvbnNlKS5zb21lKChlcnJvcikgPT5cbiAgICAgIFtcbiAgICAgICAgdGhpcy5jb3N0Q2VudGVyTWFzayxcbiAgICAgICAgdGhpcy51bml0TWFzayxcbiAgICAgICAgdGhpcy5wZXJtaXNzaW9uTWFzayxcbiAgICAgICAgdGhpcy51bmtub3duTWFzayxcbiAgICAgIF0uc29tZSgobWFzaykgPT4gbWFzay50ZXN0KGVycm9yLm1lc3NhZ2UgPz8gJycpKVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaGFuZGxlT3JnYW5pemF0aW9uQ29uZmxpY3QoXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIG1hc2s6IFJlZ0V4cCxcbiAgICBrZXk6IHN0cmluZ1xuICApOiB2b2lkIHtcbiAgICBjb25zdCByZXN1bHQgPSBtZXNzYWdlLm1hdGNoKG1hc2spO1xuICAgIGNvbnN0IHBhcmFtcyA9IHsgY29kZTogcmVzdWx0Py5bMV0gfTtcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgICAgeyBrZXk6IGBvcmdhbml6YXRpb24uaHR0cEhhbmRsZXJzLmNvbmZsaWN0LiR7a2V5fWAsIHBhcmFtcyB9LFxuICAgICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9FUlJPUlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RXJyb3JzKHJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZSk6IEVycm9yTW9kZWxbXSB7XG4gICAgcmV0dXJuIChyZXNwb25zZS5lcnJvcj8uZXJyb3JzIHx8IFtdKS5maWx0ZXIoXG4gICAgICAoZXJyb3I6IGFueSkgPT5cbiAgICAgICAgZXJyb3IudHlwZSA9PT0gJ01vZGVsU2F2aW5nRXJyb3InIHx8IGVycm9yLnR5cGUgPT09ICdEdXBsaWNhdGVVaWRFcnJvcidcbiAgICApO1xuICB9XG5cbiAgZ2V0UHJpb3JpdHkoKTogUHJpb3JpdHkge1xuICAgIHJldHVybiBQcmlvcml0eS5OT1JNQUw7XG4gIH1cbn1cbiJdfQ==