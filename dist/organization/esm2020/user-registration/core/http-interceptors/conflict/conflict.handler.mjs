/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { HttpErrorHandler, HttpResponseStatus, GlobalMessageType, } from '@spartacus/core';
import * as i0 from "@angular/core";
export class OrganizationUserRegistrationConflictHandler extends HttpErrorHandler {
    constructor() {
        super(...arguments);
        this.responseStatus = HttpResponseStatus.CONFLICT;
    }
    handleError(request, response) {
        if (request && this.getErrors(response)?.length) {
            this.globalMessageService.add({ key: 'userRegistrationForm.httpHandlers.conflict' }, GlobalMessageType.MSG_TYPE_ERROR);
        }
    }
    getErrors(response) {
        return (response.error?.errors).filter((error) => error?.type === 'AlreadyExistsError');
    }
    getPriority() {
        return 0 /* Priority.NORMAL */;
    }
}
OrganizationUserRegistrationConflictHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationUserRegistrationConflictHandler, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
OrganizationUserRegistrationConflictHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationUserRegistrationConflictHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationUserRegistrationConflictHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmxpY3QuaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vdXNlci1yZWdpc3RyYXRpb24vY29yZS9odHRwLWludGVyY2VwdG9ycy9jb25mbGljdC9jb25mbGljdC5oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFFTCxnQkFBZ0IsRUFFaEIsa0JBQWtCLEVBQ2xCLGlCQUFpQixHQUNsQixNQUFNLGlCQUFpQixDQUFDOztBQUt6QixNQUFNLE9BQU8sMkNBQTRDLFNBQVEsZ0JBQWdCO0lBSGpGOztRQUlFLG1CQUFjLEdBQUcsa0JBQWtCLENBQUMsUUFBUSxDQUFDO0tBb0I5QztJQWxCQyxXQUFXLENBQUMsT0FBeUIsRUFBRSxRQUEyQjtRQUNoRSxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLE1BQU0sRUFBRTtZQUMvQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUMzQixFQUFFLEdBQUcsRUFBRSw0Q0FBNEMsRUFBRSxFQUNyRCxpQkFBaUIsQ0FBQyxjQUFjLENBQ2pDLENBQUM7U0FDSDtJQUNILENBQUM7SUFFUyxTQUFTLENBQUMsUUFBMkI7UUFDN0MsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUNwQyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksS0FBSyxvQkFBb0IsQ0FDckQsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXO1FBQ1QsK0JBQXVCO0lBQ3pCLENBQUM7O3dJQXBCVSwyQ0FBMkM7NElBQTNDLDJDQUEyQyxjQUYxQyxNQUFNOzJGQUVQLDJDQUEyQztrQkFIdkQsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge1xuICBFcnJvck1vZGVsLFxuICBIdHRwRXJyb3JIYW5kbGVyLFxuICBQcmlvcml0eSxcbiAgSHR0cFJlc3BvbnNlU3RhdHVzLFxuICBHbG9iYWxNZXNzYWdlVHlwZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE9yZ2FuaXphdGlvblVzZXJSZWdpc3RyYXRpb25Db25mbGljdEhhbmRsZXIgZXh0ZW5kcyBIdHRwRXJyb3JIYW5kbGVyIHtcbiAgcmVzcG9uc2VTdGF0dXMgPSBIdHRwUmVzcG9uc2VTdGF0dXMuQ09ORkxJQ1Q7XG5cbiAgaGFuZGxlRXJyb3IocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PiwgcmVzcG9uc2U6IEh0dHBFcnJvclJlc3BvbnNlKSB7XG4gICAgaWYgKHJlcXVlc3QgJiYgdGhpcy5nZXRFcnJvcnMocmVzcG9uc2UpPy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgICB7IGtleTogJ3VzZXJSZWdpc3RyYXRpb25Gb3JtLmh0dHBIYW5kbGVycy5jb25mbGljdCcgfSxcbiAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGdldEVycm9ycyhyZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2UpOiBFcnJvck1vZGVsW10ge1xuICAgIHJldHVybiAocmVzcG9uc2UuZXJyb3I/LmVycm9ycykuZmlsdGVyKFxuICAgICAgKGVycm9yOiBhbnkpID0+IGVycm9yPy50eXBlID09PSAnQWxyZWFkeUV4aXN0c0Vycm9yJ1xuICAgICk7XG4gIH1cblxuICBnZXRQcmlvcml0eSgpOiBQcmlvcml0eSB7XG4gICAgcmV0dXJuIFByaW9yaXR5Lk5PUk1BTDtcbiAgfVxufVxuIl19