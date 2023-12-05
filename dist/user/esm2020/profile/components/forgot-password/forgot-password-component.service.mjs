/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators, } from '@angular/forms';
import { GlobalMessageType, OAuthFlow, } from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/user/profile/root";
import * as i2 from "@spartacus/core";
export class ForgotPasswordComponentService {
    constructor(userPasswordService, routingService, authConfigService, globalMessage) {
        this.userPasswordService = userPasswordService;
        this.routingService = routingService;
        this.authConfigService = authConfigService;
        this.globalMessage = globalMessage;
        this.busy$ = new BehaviorSubject(false);
        this.isUpdating$ = this.busy$.pipe(tap((state) => (state === true ? this.form.disable() : this.form.enable())));
        this.form = new UntypedFormGroup({
            userEmail: new UntypedFormControl('', [
                Validators.required,
                CustomFormValidators.emailValidator,
            ]),
        });
    }
    /**
     * Sends an email to the user to reset the password.
     *
     * When the `ResourceOwnerPasswordFlow` is used, the user is routed
     * to the login page.
     */
    requestEmail() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy$.next(true);
        this.userPasswordService
            .requestForgotPasswordEmail(this.form.value.userEmail)
            .subscribe({
            next: () => this.onSuccess(),
            error: (error) => this.onError(error),
        });
    }
    onSuccess() {
        this.globalMessage.add({ key: 'forgottenPassword.passwordResetEmailSent' }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        this.busy$.next(false);
        this.form.reset();
        this.redirect();
    }
    onError(_error) {
        this.busy$.next(false);
    }
    /**
     * Redirects the user back to the login page.
     *
     * This only happens in case of the `ResourceOwnerPasswordFlow` OAuth flow.
     */
    redirect() {
        if (this.authConfigService.getOAuthFlow() ===
            OAuthFlow.ResourceOwnerPasswordFlow) {
            this.routingService.go({ cxRoute: 'login' });
        }
    }
}
ForgotPasswordComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ForgotPasswordComponentService, deps: [{ token: i1.UserPasswordFacade }, { token: i2.RoutingService }, { token: i2.AuthConfigService }, { token: i2.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
ForgotPasswordComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ForgotPasswordComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ForgotPasswordComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserPasswordFacade }, { type: i2.RoutingService }, { type: i2.AuthConfigService }, { type: i2.GlobalMessageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZ290LXBhc3N3b3JkLWNvbXBvbmVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3VzZXIvcHJvZmlsZS9jb21wb25lbnRzL2ZvcmdvdC1wYXNzd29yZC9mb3Jnb3QtcGFzc3dvcmQtY29tcG9uZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUNMLGtCQUFrQixFQUNsQixnQkFBZ0IsRUFDaEIsVUFBVSxHQUNYLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUdMLGlCQUFpQixFQUNqQixTQUFTLEdBRVYsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUdyQyxNQUFNLE9BQU8sOEJBQThCO0lBQ3pDLFlBQ1ksbUJBQXVDLEVBQ3ZDLGNBQThCLEVBQzlCLGlCQUFvQyxFQUNwQyxhQUFtQztRQUhuQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW9CO1FBQ3ZDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGtCQUFhLEdBQWIsYUFBYSxDQUFzQjtRQUdyQyxVQUFLLEdBQUcsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFN0MsZ0JBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDM0IsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUM1RSxDQUFDO1FBRUYsU0FBSSxHQUFxQixJQUFJLGdCQUFnQixDQUFDO1lBQzVDLFNBQVMsRUFBRSxJQUFJLGtCQUFrQixDQUFDLEVBQUUsRUFBRTtnQkFDcEMsVUFBVSxDQUFDLFFBQVE7Z0JBQ25CLG9CQUFvQixDQUFDLGNBQWM7YUFDcEMsQ0FBQztTQUNILENBQUMsQ0FBQztJQWJBLENBQUM7SUFlSjs7Ozs7T0FLRztJQUNILFlBQVk7UUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzdCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRCLElBQUksQ0FBQyxtQkFBbUI7YUFDckIsMEJBQTBCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO2FBQ3JELFNBQVMsQ0FBQztZQUNULElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQzVCLEtBQUssRUFBRSxDQUFDLEtBQVksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7U0FDN0MsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVTLFNBQVM7UUFDakIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLEVBQUUsR0FBRyxFQUFFLDBDQUEwQyxFQUFFLEVBQ25ELGlCQUFpQixDQUFDLHFCQUFxQixDQUN4QyxDQUFDO1FBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVTLE9BQU8sQ0FBQyxNQUFhO1FBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7OztPQUlHO0lBQ08sUUFBUTtRQUNoQixJQUNFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUU7WUFDckMsU0FBUyxDQUFDLHlCQUF5QixFQUNuQztZQUNBLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDOUM7SUFDSCxDQUFDOzsySEFyRVUsOEJBQThCOytIQUE5Qiw4QkFBOEI7MkZBQTlCLDhCQUE4QjtrQkFEMUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFVudHlwZWRGb3JtQ29udHJvbCxcbiAgVW50eXBlZEZvcm1Hcm91cCxcbiAgVmFsaWRhdG9ycyxcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgQXV0aENvbmZpZ1NlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlVHlwZSxcbiAgT0F1dGhGbG93LFxuICBSb3V0aW5nU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEN1c3RvbUZvcm1WYWxpZGF0b3JzIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IFVzZXJQYXNzd29yZEZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvdXNlci9wcm9maWxlL3Jvb3QnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGb3Jnb3RQYXNzd29yZENvbXBvbmVudFNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdXNlclBhc3N3b3JkU2VydmljZTogVXNlclBhc3N3b3JkRmFjYWRlLFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGF1dGhDb25maWdTZXJ2aWNlOiBBdXRoQ29uZmlnU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZ2xvYmFsTWVzc2FnZTogR2xvYmFsTWVzc2FnZVNlcnZpY2VcbiAgKSB7fVxuXG4gIHByb3RlY3RlZCBidXN5JCA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xuXG4gIGlzVXBkYXRpbmckID0gdGhpcy5idXN5JC5waXBlKFxuICAgIHRhcCgoc3RhdGUpID0+IChzdGF0ZSA9PT0gdHJ1ZSA/IHRoaXMuZm9ybS5kaXNhYmxlKCkgOiB0aGlzLmZvcm0uZW5hYmxlKCkpKVxuICApO1xuXG4gIGZvcm06IFVudHlwZWRGb3JtR3JvdXAgPSBuZXcgVW50eXBlZEZvcm1Hcm91cCh7XG4gICAgdXNlckVtYWlsOiBuZXcgVW50eXBlZEZvcm1Db250cm9sKCcnLCBbXG4gICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgQ3VzdG9tRm9ybVZhbGlkYXRvcnMuZW1haWxWYWxpZGF0b3IsXG4gICAgXSksXG4gIH0pO1xuXG4gIC8qKlxuICAgKiBTZW5kcyBhbiBlbWFpbCB0byB0aGUgdXNlciB0byByZXNldCB0aGUgcGFzc3dvcmQuXG4gICAqXG4gICAqIFdoZW4gdGhlIGBSZXNvdXJjZU93bmVyUGFzc3dvcmRGbG93YCBpcyB1c2VkLCB0aGUgdXNlciBpcyByb3V0ZWRcbiAgICogdG8gdGhlIGxvZ2luIHBhZ2UuXG4gICAqL1xuICByZXF1ZXN0RW1haWwoKSB7XG4gICAgaWYgKCF0aGlzLmZvcm0udmFsaWQpIHtcbiAgICAgIHRoaXMuZm9ybS5tYXJrQWxsQXNUb3VjaGVkKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5idXN5JC5uZXh0KHRydWUpO1xuXG4gICAgdGhpcy51c2VyUGFzc3dvcmRTZXJ2aWNlXG4gICAgICAucmVxdWVzdEZvcmdvdFBhc3N3b3JkRW1haWwodGhpcy5mb3JtLnZhbHVlLnVzZXJFbWFpbClcbiAgICAgIC5zdWJzY3JpYmUoe1xuICAgICAgICBuZXh0OiAoKSA9PiB0aGlzLm9uU3VjY2VzcygpLFxuICAgICAgICBlcnJvcjogKGVycm9yOiBFcnJvcikgPT4gdGhpcy5vbkVycm9yKGVycm9yKSxcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIG9uU3VjY2VzcygpOiB2b2lkIHtcbiAgICB0aGlzLmdsb2JhbE1lc3NhZ2UuYWRkKFxuICAgICAgeyBrZXk6ICdmb3Jnb3R0ZW5QYXNzd29yZC5wYXNzd29yZFJlc2V0RW1haWxTZW50JyB9LFxuICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfQ09ORklSTUFUSU9OXG4gICAgKTtcbiAgICB0aGlzLmJ1c3kkLm5leHQoZmFsc2UpO1xuICAgIHRoaXMuZm9ybS5yZXNldCgpO1xuICAgIHRoaXMucmVkaXJlY3QoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbkVycm9yKF9lcnJvcjogRXJyb3IpOiB2b2lkIHtcbiAgICB0aGlzLmJ1c3kkLm5leHQoZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZGlyZWN0cyB0aGUgdXNlciBiYWNrIHRvIHRoZSBsb2dpbiBwYWdlLlxuICAgKlxuICAgKiBUaGlzIG9ubHkgaGFwcGVucyBpbiBjYXNlIG9mIHRoZSBgUmVzb3VyY2VPd25lclBhc3N3b3JkRmxvd2AgT0F1dGggZmxvdy5cbiAgICovXG4gIHByb3RlY3RlZCByZWRpcmVjdCgpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmF1dGhDb25maWdTZXJ2aWNlLmdldE9BdXRoRmxvdygpID09PVxuICAgICAgT0F1dGhGbG93LlJlc291cmNlT3duZXJQYXNzd29yZEZsb3dcbiAgICApIHtcbiAgICAgIHRoaXMucm91dGluZ1NlcnZpY2UuZ28oeyBjeFJvdXRlOiAnbG9naW4nIH0pO1xuICAgIH1cbiAgfVxufVxuIl19