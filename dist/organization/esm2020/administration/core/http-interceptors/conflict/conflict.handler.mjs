import { Injectable } from '@angular/core';
import { GlobalMessageType, HttpErrorHandler, HttpResponseStatus, } from '@spartacus/core';
import * as i0 from "@angular/core";
export class OrganizationConflictHandler extends HttpErrorHandler {
    constructor() {
        super(...arguments);
        this.responseStatus = HttpResponseStatus.CONFLICT;
        this.budgetMask = /Budget with code \[(.*)\] already exists/;
        this.userMask = /User already exists/;
        this.userGroupMask = /Member Permission with the same id already exists/;
        this.unitMask = /Organizational unit with uid \[(.*)\] already exists/;
    }
    hasMatch(errorResponse) {
        return super.hasMatch(errorResponse) && this.matchMask(errorResponse);
    }
    handleError(request, response) {
        return this.getErrors(response).forEach(({ message }) => {
            if (message) {
                // Handle budget conflict
                this.handleConflict(message, this.budgetMask, 'budget');
                // Handle user email conflict
                this.handleConflict(message, this.userMask, 'user', request?.body?.email);
                // Handle user group conflict
                this.handleConflict(message, this.userGroupMask, 'userGroup', request?.body?.uid);
                // Handle unit conflict
                this.handleConflict(message, this.unitMask, 'unit');
            }
        });
    }
    matchMask(response) {
        return this.getErrors(response).some((error) => [this.budgetMask, this.userMask, this.userGroupMask, this.unitMask].some((mask) => mask.test(error.message ?? '')));
    }
    handleConflict(message, mask, key, code) {
        const result = message.match(mask);
        const params = { code: result?.[1] ?? code };
        if (result) {
            this.globalMessageService.add({ key: `organization.httpHandlers.conflict.${key}`, params }, GlobalMessageType.MSG_TYPE_ERROR);
        }
    }
    getErrors(response) {
        return (response.error?.errors || []).filter((error) => error.type === 'AlreadyExistsError');
    }
    getPriority() {
        return 0 /* Priority.NORMAL */;
    }
}
OrganizationConflictHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationConflictHandler, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
OrganizationConflictHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationConflictHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationConflictHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmxpY3QuaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZS9odHRwLWludGVyY2VwdG9ycy9jb25mbGljdC9jb25mbGljdC5oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUVMLGlCQUFpQixFQUNqQixnQkFBZ0IsRUFDaEIsa0JBQWtCLEdBRW5CLE1BQU0saUJBQWlCLENBQUM7O0FBS3pCLE1BQU0sT0FBTywyQkFBNEIsU0FBUSxnQkFBZ0I7SUFIakU7O1FBSUUsbUJBQWMsR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLENBQUM7UUFFbkMsZUFBVSxHQUFHLDBDQUEwQyxDQUFDO1FBQ3hELGFBQVEsR0FBRyxxQkFBcUIsQ0FBQztRQUNqQyxrQkFBYSxHQUFHLG1EQUFtRCxDQUFDO1FBQ3BFLGFBQVEsR0FBRyxzREFBc0QsQ0FBQztLQWdFN0U7SUE5REMsUUFBUSxDQUFDLGFBQWdDO1FBQ3ZDLE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBeUIsRUFBRSxRQUEyQjtRQUNoRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQWMsRUFBRSxFQUFFO1lBQ2xFLElBQUksT0FBTyxFQUFFO2dCQUNYLHlCQUF5QjtnQkFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDeEQsNkJBQTZCO2dCQUM3QixJQUFJLENBQUMsY0FBYyxDQUNqQixPQUFPLEVBQ1AsSUFBSSxDQUFDLFFBQVEsRUFDYixNQUFNLEVBQ04sT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLENBQ3JCLENBQUM7Z0JBQ0YsNkJBQTZCO2dCQUM3QixJQUFJLENBQUMsY0FBYyxDQUNqQixPQUFPLEVBQ1AsSUFBSSxDQUFDLGFBQWEsRUFDbEIsV0FBVyxFQUNYLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUNuQixDQUFDO2dCQUNGLHVCQUF1QjtnQkFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUNyRDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVTLFNBQVMsQ0FBQyxRQUEyQjtRQUM3QyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDN0MsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUN0RSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUN6QyxDQUNGLENBQUM7SUFDSixDQUFDO0lBRVMsY0FBYyxDQUN0QixPQUFlLEVBQ2YsSUFBWSxFQUNaLEdBQVcsRUFDWCxJQUFhO1FBRWIsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxNQUFNLE1BQU0sR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUM3QyxJQUFJLE1BQU0sRUFBRTtZQUNWLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQzNCLEVBQUUsR0FBRyxFQUFFLHNDQUFzQyxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFDNUQsaUJBQWlCLENBQUMsY0FBYyxDQUNqQyxDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRVMsU0FBUyxDQUFDLFFBQTJCO1FBQzdDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQzFDLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLG9CQUFvQixDQUNwRCxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVc7UUFDVCwrQkFBdUI7SUFDekIsQ0FBQzs7d0hBckVVLDJCQUEyQjs0SEFBM0IsMkJBQTJCLGNBRjFCLE1BQU07MkZBRVAsMkJBQTJCO2tCQUh2QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEVycm9yTW9kZWwsXG4gIEdsb2JhbE1lc3NhZ2VUeXBlLFxuICBIdHRwRXJyb3JIYW5kbGVyLFxuICBIdHRwUmVzcG9uc2VTdGF0dXMsXG4gIFByaW9yaXR5LFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgT3JnYW5pemF0aW9uQ29uZmxpY3RIYW5kbGVyIGV4dGVuZHMgSHR0cEVycm9ySGFuZGxlciB7XG4gIHJlc3BvbnNlU3RhdHVzID0gSHR0cFJlc3BvbnNlU3RhdHVzLkNPTkZMSUNUO1xuXG4gIHByb3RlY3RlZCBidWRnZXRNYXNrID0gL0J1ZGdldCB3aXRoIGNvZGUgXFxbKC4qKVxcXSBhbHJlYWR5IGV4aXN0cy87XG4gIHByb3RlY3RlZCB1c2VyTWFzayA9IC9Vc2VyIGFscmVhZHkgZXhpc3RzLztcbiAgcHJvdGVjdGVkIHVzZXJHcm91cE1hc2sgPSAvTWVtYmVyIFBlcm1pc3Npb24gd2l0aCB0aGUgc2FtZSBpZCBhbHJlYWR5IGV4aXN0cy87XG4gIHByb3RlY3RlZCB1bml0TWFzayA9IC9Pcmdhbml6YXRpb25hbCB1bml0IHdpdGggdWlkIFxcWyguKilcXF0gYWxyZWFkeSBleGlzdHMvO1xuXG4gIGhhc01hdGNoKGVycm9yUmVzcG9uc2U6IEh0dHBFcnJvclJlc3BvbnNlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHN1cGVyLmhhc01hdGNoKGVycm9yUmVzcG9uc2UpICYmIHRoaXMubWF0Y2hNYXNrKGVycm9yUmVzcG9uc2UpO1xuICB9XG5cbiAgaGFuZGxlRXJyb3IocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PiwgcmVzcG9uc2U6IEh0dHBFcnJvclJlc3BvbnNlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RXJyb3JzKHJlc3BvbnNlKS5mb3JFYWNoKCh7IG1lc3NhZ2UgfTogRXJyb3JNb2RlbCkgPT4ge1xuICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgLy8gSGFuZGxlIGJ1ZGdldCBjb25mbGljdFxuICAgICAgICB0aGlzLmhhbmRsZUNvbmZsaWN0KG1lc3NhZ2UsIHRoaXMuYnVkZ2V0TWFzaywgJ2J1ZGdldCcpO1xuICAgICAgICAvLyBIYW5kbGUgdXNlciBlbWFpbCBjb25mbGljdFxuICAgICAgICB0aGlzLmhhbmRsZUNvbmZsaWN0KFxuICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgdGhpcy51c2VyTWFzayxcbiAgICAgICAgICAndXNlcicsXG4gICAgICAgICAgcmVxdWVzdD8uYm9keT8uZW1haWxcbiAgICAgICAgKTtcbiAgICAgICAgLy8gSGFuZGxlIHVzZXIgZ3JvdXAgY29uZmxpY3RcbiAgICAgICAgdGhpcy5oYW5kbGVDb25mbGljdChcbiAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgIHRoaXMudXNlckdyb3VwTWFzayxcbiAgICAgICAgICAndXNlckdyb3VwJyxcbiAgICAgICAgICByZXF1ZXN0Py5ib2R5Py51aWRcbiAgICAgICAgKTtcbiAgICAgICAgLy8gSGFuZGxlIHVuaXQgY29uZmxpY3RcbiAgICAgICAgdGhpcy5oYW5kbGVDb25mbGljdChtZXNzYWdlLCB0aGlzLnVuaXRNYXNrLCAndW5pdCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIG1hdGNoTWFzayhyZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2UpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFcnJvcnMocmVzcG9uc2UpLnNvbWUoKGVycm9yKSA9PlxuICAgICAgW3RoaXMuYnVkZ2V0TWFzaywgdGhpcy51c2VyTWFzaywgdGhpcy51c2VyR3JvdXBNYXNrLCB0aGlzLnVuaXRNYXNrXS5zb21lKFxuICAgICAgICAobWFzaykgPT4gbWFzay50ZXN0KGVycm9yLm1lc3NhZ2UgPz8gJycpXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBoYW5kbGVDb25mbGljdChcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgbWFzazogUmVnRXhwLFxuICAgIGtleTogc3RyaW5nLFxuICAgIGNvZGU/OiBzdHJpbmdcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgcmVzdWx0ID0gbWVzc2FnZS5tYXRjaChtYXNrKTtcbiAgICBjb25zdCBwYXJhbXMgPSB7IGNvZGU6IHJlc3VsdD8uWzFdID8/IGNvZGUgfTtcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgICAgeyBrZXk6IGBvcmdhbml6YXRpb24uaHR0cEhhbmRsZXJzLmNvbmZsaWN0LiR7a2V5fWAsIHBhcmFtcyB9LFxuICAgICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9FUlJPUlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RXJyb3JzKHJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZSk6IEVycm9yTW9kZWxbXSB7XG4gICAgcmV0dXJuIChyZXNwb25zZS5lcnJvcj8uZXJyb3JzIHx8IFtdKS5maWx0ZXIoXG4gICAgICAoZXJyb3I6IGFueSkgPT4gZXJyb3IudHlwZSA9PT0gJ0FscmVhZHlFeGlzdHNFcnJvcidcbiAgICApO1xuICB9XG5cbiAgZ2V0UHJpb3JpdHkoKTogUHJpb3JpdHkge1xuICAgIHJldHVybiBQcmlvcml0eS5OT1JNQUw7XG4gIH1cbn1cbiJdfQ==