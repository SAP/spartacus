/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import { AuthConfigService, GlobalMessageService, GlobalMessageType, RoutingService, } from '@spartacus/core';
import { ForgotPasswordComponentService } from '@spartacus/user/profile/components';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/user/profile/root";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/cdc/root";
export class CDCForgotPasswordComponentService extends ForgotPasswordComponentService {
    constructor(userPasswordService, routingService, authConfigService, globalMessage, cdcJsService) {
        super(userPasswordService, routingService, authConfigService, globalMessage);
        this.userPasswordService = userPasswordService;
        this.routingService = routingService;
        this.authConfigService = authConfigService;
        this.globalMessage = globalMessage;
        this.cdcJsService = cdcJsService;
        this.subscription = new Subscription();
    }
    /**
     * Sends an email to through CDC SDK to reset the password.
     */
    requestEmail() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy$.next(true);
        this.subscription.add(this.cdcJsService.didLoad().subscribe((cdcLoaded) => {
            if (cdcLoaded) {
                // Reset password using CDC Gigya SDK
                this.cdcJsService
                    .resetPasswordWithoutScreenSet(this.form.value.userEmail)
                    .subscribe({
                    next: (response) => {
                        this.busy$.next(false);
                        if (response.status === 'OK') {
                            this.onSuccess();
                        }
                    },
                    error: () => this.busy$.next(false),
                });
            }
            else {
                this.busy$.next(false);
                // CDC Gigya SDK not loaded, show error to the user
                this.globalMessage.add({
                    key: 'errorHandlers.scriptFailedToLoad',
                }, GlobalMessageType.MSG_TYPE_ERROR);
            }
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
CDCForgotPasswordComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCForgotPasswordComponentService, deps: [{ token: i1.UserPasswordFacade }, { token: i2.RoutingService }, { token: i2.AuthConfigService }, { token: i2.GlobalMessageService }, { token: i3.CdcJsService }], target: i0.ɵɵFactoryTarget.Injectable });
CDCForgotPasswordComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCForgotPasswordComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCForgotPasswordComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserPasswordFacade }, { type: i2.RoutingService }, { type: i2.AuthConfigService }, { type: i2.GlobalMessageService }, { type: i3.CdcJsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLWZvcmdvdC1wYXNzd29yZC1jb21wb25lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvY2RjL3VzZXItcHJvZmlsZS9mb3Jnb3QtcGFzc3dvcmQvY2RjLWZvcmdvdC1wYXNzd29yZC1jb21wb25lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixvQkFBb0IsRUFDcEIsaUJBQWlCLEVBQ2pCLGNBQWMsR0FDZixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7O0FBR3BDLE1BQU0sT0FBTyxpQ0FDWCxTQUFRLDhCQUE4QjtJQUt0QyxZQUNZLG1CQUF1QyxFQUN2QyxjQUE4QixFQUM5QixpQkFBb0MsRUFDcEMsYUFBbUMsRUFDbkMsWUFBMEI7UUFFcEMsS0FBSyxDQUNILG1CQUFtQixFQUNuQixjQUFjLEVBQ2QsaUJBQWlCLEVBQ2pCLGFBQWEsQ0FDZCxDQUFDO1FBWFEsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFvQjtRQUN2QyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxrQkFBYSxHQUFiLGFBQWEsQ0FBc0I7UUFDbkMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFQNUIsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBZTVDLENBQUM7SUFFRDs7T0FFRztJQUNILFlBQVk7UUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzdCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ2xELElBQUksU0FBUyxFQUFFO2dCQUNiLHFDQUFxQztnQkFDckMsSUFBSSxDQUFDLFlBQVk7cUJBQ2QsNkJBQTZCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO3FCQUN4RCxTQUFTLENBQUM7b0JBQ1QsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUU7d0JBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUN2QixJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFOzRCQUM1QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7eUJBQ2xCO29CQUNILENBQUM7b0JBQ0QsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztpQkFDcEMsQ0FBQyxDQUFDO2FBQ047aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZCLG1EQUFtRDtnQkFDbkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCO29CQUNFLEdBQUcsRUFBRSxrQ0FBa0M7aUJBQ3hDLEVBQ0QsaUJBQWlCLENBQUMsY0FBYyxDQUNqQyxDQUFDO2FBQ0g7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7OzhIQS9EVSxpQ0FBaUM7a0lBQWpDLGlDQUFpQzsyRkFBakMsaUNBQWlDO2tCQUQ3QyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGNKc1NlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NkYy9yb290JztcbmltcG9ydCB7XG4gIEF1dGhDb25maWdTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgR2xvYmFsTWVzc2FnZVR5cGUsXG4gIFJvdXRpbmdTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgRm9yZ290UGFzc3dvcmRDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy91c2VyL3Byb2ZpbGUvY29tcG9uZW50cyc7XG5pbXBvcnQgeyBVc2VyUGFzc3dvcmRGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL3VzZXIvcHJvZmlsZS9yb290JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ0RDRm9yZ290UGFzc3dvcmRDb21wb25lbnRTZXJ2aWNlXG4gIGV4dGVuZHMgRm9yZ290UGFzc3dvcmRDb21wb25lbnRTZXJ2aWNlXG4gIGltcGxlbWVudHMgT25EZXN0cm95XG57XG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHVzZXJQYXNzd29yZFNlcnZpY2U6IFVzZXJQYXNzd29yZEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhdXRoQ29uZmlnU2VydmljZTogQXV0aENvbmZpZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGdsb2JhbE1lc3NhZ2U6IEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjZGNKc1NlcnZpY2U6IENkY0pzU2VydmljZVxuICApIHtcbiAgICBzdXBlcihcbiAgICAgIHVzZXJQYXNzd29yZFNlcnZpY2UsXG4gICAgICByb3V0aW5nU2VydmljZSxcbiAgICAgIGF1dGhDb25maWdTZXJ2aWNlLFxuICAgICAgZ2xvYmFsTWVzc2FnZVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogU2VuZHMgYW4gZW1haWwgdG8gdGhyb3VnaCBDREMgU0RLIHRvIHJlc2V0IHRoZSBwYXNzd29yZC5cbiAgICovXG4gIHJlcXVlc3RFbWFpbCgpIHtcbiAgICBpZiAoIXRoaXMuZm9ybS52YWxpZCkge1xuICAgICAgdGhpcy5mb3JtLm1hcmtBbGxBc1RvdWNoZWQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmJ1c3kkLm5leHQodHJ1ZSk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXG4gICAgICB0aGlzLmNkY0pzU2VydmljZS5kaWRMb2FkKCkuc3Vic2NyaWJlKChjZGNMb2FkZWQpID0+IHtcbiAgICAgICAgaWYgKGNkY0xvYWRlZCkge1xuICAgICAgICAgIC8vIFJlc2V0IHBhc3N3b3JkIHVzaW5nIENEQyBHaWd5YSBTREtcbiAgICAgICAgICB0aGlzLmNkY0pzU2VydmljZVxuICAgICAgICAgICAgLnJlc2V0UGFzc3dvcmRXaXRob3V0U2NyZWVuU2V0KHRoaXMuZm9ybS52YWx1ZS51c2VyRW1haWwpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgICAgbmV4dDogKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5idXN5JC5uZXh0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAnT0snKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLm9uU3VjY2VzcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZXJyb3I6ICgpID0+IHRoaXMuYnVzeSQubmV4dChmYWxzZSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmJ1c3kkLm5leHQoZmFsc2UpO1xuICAgICAgICAgIC8vIENEQyBHaWd5YSBTREsgbm90IGxvYWRlZCwgc2hvdyBlcnJvciB0byB0aGUgdXNlclxuICAgICAgICAgIHRoaXMuZ2xvYmFsTWVzc2FnZS5hZGQoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGtleTogJ2Vycm9ySGFuZGxlcnMuc2NyaXB0RmFpbGVkVG9Mb2FkJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9FUlJPUlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==