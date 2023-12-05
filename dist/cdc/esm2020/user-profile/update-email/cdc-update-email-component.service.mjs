/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import { AuthRedirectService, AuthService, GlobalMessageService, GlobalMessageType, RoutingService, } from '@spartacus/core';
import { UpdateEmailComponentService } from '@spartacus/user/profile/components';
import { UserEmailFacade } from '@spartacus/user/profile/root';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/user/profile/root";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/cdc/root";
export class CDCUpdateEmailComponentService extends UpdateEmailComponentService {
    constructor(userEmail, routingService, globalMessageService, authService, authRedirectService, cdcJsService) {
        super(userEmail, routingService, globalMessageService, authService, authRedirectService);
        this.userEmail = userEmail;
        this.routingService = routingService;
        this.globalMessageService = globalMessageService;
        this.authService = authService;
        this.authRedirectService = authRedirectService;
        this.cdcJsService = cdcJsService;
    }
    save() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy$.next(true);
        const newEmail = this.form.get('confirmEmail')?.value;
        const password = this.form.get('password')?.value;
        this.cdcJsService
            .updateUserEmailWithoutScreenSet(password, newEmail)
            .subscribe({
            next: () => this.onSuccess(newEmail),
            error: (error) => this.onError(error),
        });
    }
    onError(_error) {
        this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
        this.globalMessageService.add({ key: 'httpHandlers.validationErrors.invalid.password' }, GlobalMessageType.MSG_TYPE_ERROR);
        this.busy$.next(false);
    }
}
CDCUpdateEmailComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdateEmailComponentService, deps: [{ token: i1.UserEmailFacade }, { token: i2.RoutingService }, { token: i2.GlobalMessageService }, { token: i2.AuthService }, { token: i2.AuthRedirectService }, { token: i3.CdcJsService }], target: i0.ɵɵFactoryTarget.Injectable });
CDCUpdateEmailComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdateEmailComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdateEmailComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserEmailFacade }, { type: i2.RoutingService }, { type: i2.GlobalMessageService }, { type: i2.AuthService }, { type: i2.AuthRedirectService }, { type: i3.CdcJsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLXVwZGF0ZS1lbWFpbC1jb21wb25lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvY2RjL3VzZXItcHJvZmlsZS91cGRhdGUtZW1haWwvY2RjLXVwZGF0ZS1lbWFpbC1jb21wb25lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUNMLG1CQUFtQixFQUNuQixXQUFXLEVBQ1gsb0JBQW9CLEVBQ3BCLGlCQUFpQixFQUNqQixjQUFjLEdBQ2YsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNqRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7Ozs7O0FBRy9ELE1BQU0sT0FBTyw4QkFBK0IsU0FBUSwyQkFBMkI7SUFDN0UsWUFDWSxTQUEwQixFQUMxQixjQUE4QixFQUM5QixvQkFBMEMsRUFDMUMsV0FBd0IsRUFDeEIsbUJBQXdDLEVBQ3hDLFlBQTBCO1FBRXBDLEtBQUssQ0FDSCxTQUFTLEVBQ1QsY0FBYyxFQUNkLG9CQUFvQixFQUNwQixXQUFXLEVBQ1gsbUJBQW1CLENBQ3BCLENBQUM7UUFiUSxjQUFTLEdBQVQsU0FBUyxDQUFpQjtRQUMxQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBU3RDLENBQUM7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUM3QixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV0QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBRSxLQUFLLENBQUM7UUFDdEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsS0FBSyxDQUFDO1FBRWxELElBQUksQ0FBQyxZQUFZO2FBQ2QsK0JBQStCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQzthQUNuRCxTQUFTLENBQUM7WUFDVCxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDcEMsS0FBSyxFQUFFLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztTQUM3QyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVMsT0FBTyxDQUFDLE1BQWE7UUFDN0IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUMzQixFQUFFLEdBQUcsRUFBRSxnREFBZ0QsRUFBRSxFQUN6RCxpQkFBaUIsQ0FBQyxjQUFjLENBQ2pDLENBQUM7UUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QixDQUFDOzsySEE1Q1UsOEJBQThCOytIQUE5Qiw4QkFBOEI7MkZBQTlCLDhCQUE4QjtrQkFEMUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENkY0pzU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY2RjL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQXV0aFJlZGlyZWN0U2VydmljZSxcbiAgQXV0aFNlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlVHlwZSxcbiAgUm91dGluZ1NlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBVcGRhdGVFbWFpbENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL3VzZXIvcHJvZmlsZS9jb21wb25lbnRzJztcbmltcG9ydCB7IFVzZXJFbWFpbEZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvdXNlci9wcm9maWxlL3Jvb3QnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ0RDVXBkYXRlRW1haWxDb21wb25lbnRTZXJ2aWNlIGV4dGVuZHMgVXBkYXRlRW1haWxDb21wb25lbnRTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHVzZXJFbWFpbDogVXNlckVtYWlsRmFjYWRlLFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGdsb2JhbE1lc3NhZ2VTZXJ2aWNlOiBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhdXRoUmVkaXJlY3RTZXJ2aWNlOiBBdXRoUmVkaXJlY3RTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjZGNKc1NlcnZpY2U6IENkY0pzU2VydmljZVxuICApIHtcbiAgICBzdXBlcihcbiAgICAgIHVzZXJFbWFpbCxcbiAgICAgIHJvdXRpbmdTZXJ2aWNlLFxuICAgICAgZ2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gICAgICBhdXRoU2VydmljZSxcbiAgICAgIGF1dGhSZWRpcmVjdFNlcnZpY2VcbiAgICApO1xuICB9XG5cbiAgc2F2ZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZm9ybS52YWxpZCkge1xuICAgICAgdGhpcy5mb3JtLm1hcmtBbGxBc1RvdWNoZWQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmJ1c3kkLm5leHQodHJ1ZSk7XG5cbiAgICBjb25zdCBuZXdFbWFpbCA9IHRoaXMuZm9ybS5nZXQoJ2NvbmZpcm1FbWFpbCcpPy52YWx1ZTtcbiAgICBjb25zdCBwYXNzd29yZCA9IHRoaXMuZm9ybS5nZXQoJ3Bhc3N3b3JkJyk/LnZhbHVlO1xuXG4gICAgdGhpcy5jZGNKc1NlcnZpY2VcbiAgICAgIC51cGRhdGVVc2VyRW1haWxXaXRob3V0U2NyZWVuU2V0KHBhc3N3b3JkLCBuZXdFbWFpbClcbiAgICAgIC5zdWJzY3JpYmUoe1xuICAgICAgICBuZXh0OiAoKSA9PiB0aGlzLm9uU3VjY2VzcyhuZXdFbWFpbCksXG4gICAgICAgIGVycm9yOiAoZXJyb3I6IEVycm9yKSA9PiB0aGlzLm9uRXJyb3IoZXJyb3IpLFxuICAgICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25FcnJvcihfZXJyb3I6IEVycm9yKTogdm9pZCB7XG4gICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5yZW1vdmUoR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1IpO1xuICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgeyBrZXk6ICdodHRwSGFuZGxlcnMudmFsaWRhdGlvbkVycm9ycy5pbnZhbGlkLnBhc3N3b3JkJyB9LFxuICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICApO1xuICAgIHRoaXMuYnVzeSQubmV4dChmYWxzZSk7XG4gIH1cbn1cbiJdfQ==