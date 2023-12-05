/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import { AuthRedirectService, AuthService, GlobalMessageService, GlobalMessageType, RoutingService, } from '@spartacus/core';
import { UpdatePasswordComponentService } from '@spartacus/user/profile/components';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/user/profile/root";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/cdc/root";
export class CDCUpdatePasswordComponentService extends UpdatePasswordComponentService {
    constructor(userPasswordService, routingService, globalMessageService, authRedirectService, authService, cdcJsService) {
        super(userPasswordService, routingService, globalMessageService, authRedirectService, authService);
        this.userPasswordService = userPasswordService;
        this.routingService = routingService;
        this.globalMessageService = globalMessageService;
        this.authRedirectService = authRedirectService;
        this.authService = authService;
        this.cdcJsService = cdcJsService;
    }
    /**
     * Updates the password for the user.
     */
    updatePassword() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy$.next(true);
        const oldPassword = this.form.get('oldPassword')?.value;
        const newPassword = this.form.get('newPassword')?.value;
        this.cdcJsService
            .updateUserPasswordWithoutScreenSet(oldPassword, newPassword)
            .subscribe({
            next: () => this.onSuccess(),
            error: (error) => this.onError(error),
        });
    }
    onError(_error) {
        const errorMessage = _error?.errorDetails || ' ';
        this.globalMessageService.add(errorMessage, GlobalMessageType.MSG_TYPE_ERROR);
        this.busy$.next(false);
    }
}
CDCUpdatePasswordComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdatePasswordComponentService, deps: [{ token: i1.UserPasswordFacade }, { token: i2.RoutingService }, { token: i2.GlobalMessageService }, { token: i2.AuthRedirectService }, { token: i2.AuthService }, { token: i3.CdcJsService }], target: i0.ɵɵFactoryTarget.Injectable });
CDCUpdatePasswordComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdatePasswordComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdatePasswordComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserPasswordFacade }, { type: i2.RoutingService }, { type: i2.GlobalMessageService }, { type: i2.AuthRedirectService }, { type: i2.AuthService }, { type: i3.CdcJsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLXVwZGF0ZS1wYXNzd29yZC1jb21wb25lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvY2RjL3VzZXItcHJvZmlsZS91cGRhdGUtcGFzc3dvcmQvY2RjLXVwZGF0ZS1wYXNzd29yZC1jb21wb25lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUNMLG1CQUFtQixFQUNuQixXQUFXLEVBQ1gsb0JBQW9CLEVBQ3BCLGlCQUFpQixFQUNqQixjQUFjLEdBQ2YsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNwRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7Ozs7QUFHbEUsTUFBTSxPQUFPLGlDQUFrQyxTQUFRLDhCQUE4QjtJQUNuRixZQUNZLG1CQUF1QyxFQUN2QyxjQUE4QixFQUM5QixvQkFBMEMsRUFDMUMsbUJBQXdDLEVBQ3hDLFdBQXdCLEVBQ3hCLFlBQTBCO1FBRXBDLEtBQUssQ0FDSCxtQkFBbUIsRUFDbkIsY0FBYyxFQUNkLG9CQUFvQixFQUNwQixtQkFBbUIsRUFDbkIsV0FBVyxDQUNaLENBQUM7UUFiUSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW9CO1FBQ3ZDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsaUJBQVksR0FBWixZQUFZLENBQWM7SUFTdEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsY0FBYztRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDN0IsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEVBQUUsS0FBSyxDQUFDO1FBQ3hELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxFQUFFLEtBQUssQ0FBQztRQUV4RCxJQUFJLENBQUMsWUFBWTthQUNkLGtDQUFrQyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUM7YUFDNUQsU0FBUyxDQUFDO1lBQ1QsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDNUIsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztTQUN0QyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVMsT0FBTyxDQUFDLE1BQVc7UUFDM0IsTUFBTSxZQUFZLEdBQUcsTUFBTSxFQUFFLFlBQVksSUFBSSxHQUFHLENBQUM7UUFDakQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FDM0IsWUFBWSxFQUNaLGlCQUFpQixDQUFDLGNBQWMsQ0FDakMsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pCLENBQUM7OzhIQS9DVSxpQ0FBaUM7a0lBQWpDLGlDQUFpQzsyRkFBakMsaUNBQWlDO2tCQUQ3QyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2RjSnNTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jZGMvcm9vdCc7XG5pbXBvcnQge1xuICBBdXRoUmVkaXJlY3RTZXJ2aWNlLFxuICBBdXRoU2VydmljZSxcbiAgR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VUeXBlLFxuICBSb3V0aW5nU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFVwZGF0ZVBhc3N3b3JkQ29tcG9uZW50U2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvdXNlci9wcm9maWxlL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgVXNlclBhc3N3b3JkRmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy91c2VyL3Byb2ZpbGUvcm9vdCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDRENVcGRhdGVQYXNzd29yZENvbXBvbmVudFNlcnZpY2UgZXh0ZW5kcyBVcGRhdGVQYXNzd29yZENvbXBvbmVudFNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdXNlclBhc3N3b3JkU2VydmljZTogVXNlclBhc3N3b3JkRmFjYWRlLFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGdsb2JhbE1lc3NhZ2VTZXJ2aWNlOiBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYXV0aFJlZGlyZWN0U2VydmljZTogQXV0aFJlZGlyZWN0U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjZGNKc1NlcnZpY2U6IENkY0pzU2VydmljZVxuICApIHtcbiAgICBzdXBlcihcbiAgICAgIHVzZXJQYXNzd29yZFNlcnZpY2UsXG4gICAgICByb3V0aW5nU2VydmljZSxcbiAgICAgIGdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICAgICAgYXV0aFJlZGlyZWN0U2VydmljZSxcbiAgICAgIGF1dGhTZXJ2aWNlXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBwYXNzd29yZCBmb3IgdGhlIHVzZXIuXG4gICAqL1xuICB1cGRhdGVQYXNzd29yZCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZm9ybS52YWxpZCkge1xuICAgICAgdGhpcy5mb3JtLm1hcmtBbGxBc1RvdWNoZWQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmJ1c3kkLm5leHQodHJ1ZSk7XG5cbiAgICBjb25zdCBvbGRQYXNzd29yZCA9IHRoaXMuZm9ybS5nZXQoJ29sZFBhc3N3b3JkJyk/LnZhbHVlO1xuICAgIGNvbnN0IG5ld1Bhc3N3b3JkID0gdGhpcy5mb3JtLmdldCgnbmV3UGFzc3dvcmQnKT8udmFsdWU7XG5cbiAgICB0aGlzLmNkY0pzU2VydmljZVxuICAgICAgLnVwZGF0ZVVzZXJQYXNzd29yZFdpdGhvdXRTY3JlZW5TZXQob2xkUGFzc3dvcmQsIG5ld1Bhc3N3b3JkKVxuICAgICAgLnN1YnNjcmliZSh7XG4gICAgICAgIG5leHQ6ICgpID0+IHRoaXMub25TdWNjZXNzKCksXG4gICAgICAgIGVycm9yOiAoZXJyb3IpID0+IHRoaXMub25FcnJvcihlcnJvciksXG4gICAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbkVycm9yKF9lcnJvcjogYW55KTogdm9pZCB7XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gX2Vycm9yPy5lcnJvckRldGFpbHMgfHwgJyAnO1xuICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgZXJyb3JNZXNzYWdlLFxuICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICApO1xuICAgIHRoaXMuYnVzeSQubmV4dChmYWxzZSk7XG4gIH1cbn1cbiJdfQ==