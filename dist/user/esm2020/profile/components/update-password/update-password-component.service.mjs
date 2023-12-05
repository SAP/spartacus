/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators, } from '@angular/forms';
import { GlobalMessageType, HttpErrorModel, } from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/user/profile/root";
import * as i2 from "@spartacus/core";
export class UpdatePasswordComponentService {
    constructor(userPasswordService, routingService, globalMessageService, authRedirectService, authService) {
        this.userPasswordService = userPasswordService;
        this.routingService = routingService;
        this.globalMessageService = globalMessageService;
        this.authRedirectService = authRedirectService;
        this.authService = authService;
        this.busy$ = new BehaviorSubject(false);
        this.isUpdating$ = this.busy$.pipe(tap((state) => (state === true ? this.form.disable() : this.form.enable())));
        this.form = new UntypedFormGroup({
            oldPassword: new UntypedFormControl('', Validators.required),
            newPassword: new UntypedFormControl('', [
                Validators.required,
                CustomFormValidators.passwordValidator,
            ]),
            newPasswordConfirm: new UntypedFormControl('', Validators.required),
        }, {
            validators: CustomFormValidators.passwordsMustMatch('newPassword', 'newPasswordConfirm'),
        });
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
        this.userPasswordService.update(oldPassword, newPassword).subscribe({
            next: () => this.onSuccess(),
            error: (error) => this.onError(error),
        });
    }
    onSuccess() {
        this.globalMessageService.add({ key: 'updatePasswordForm.passwordUpdateSuccess' }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        this.busy$.next(false);
        this.form.reset();
        // sets the redirect url after login
        this.authRedirectService?.setRedirectUrl(this.routingService.getUrl({ cxRoute: 'home' }));
        // TODO(#9638): Use logout route when it will support passing redirect url
        this.authService?.coreLogout().then(() => {
            this.routingService.go({ cxRoute: 'login' });
        });
    }
    onError(_error) {
        if (_error instanceof HttpErrorModel &&
            _error.details?.[0].type === 'AccessDeniedError') {
            this.globalMessageService.add({ key: 'updatePasswordForm.accessDeniedError' }, GlobalMessageType.MSG_TYPE_ERROR);
        }
        this.busy$.next(false);
        this.form.reset();
    }
}
UpdatePasswordComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdatePasswordComponentService, deps: [{ token: i1.UserPasswordFacade }, { token: i2.RoutingService }, { token: i2.GlobalMessageService }, { token: i2.AuthRedirectService }, { token: i2.AuthService }], target: i0.ɵɵFactoryTarget.Injectable });
UpdatePasswordComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdatePasswordComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdatePasswordComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserPasswordFacade }, { type: i2.RoutingService }, { type: i2.GlobalMessageService }, { type: i2.AuthRedirectService }, { type: i2.AuthService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXBhc3N3b3JkLWNvbXBvbmVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3VzZXIvcHJvZmlsZS9jb21wb25lbnRzL3VwZGF0ZS1wYXNzd29yZC91cGRhdGUtcGFzc3dvcmQtY29tcG9uZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUNMLGtCQUFrQixFQUNsQixnQkFBZ0IsRUFDaEIsVUFBVSxHQUNYLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUlMLGlCQUFpQixFQUNqQixjQUFjLEdBRWYsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUdyQyxNQUFNLE9BQU8sOEJBQThCO0lBQ3pDLFlBQ1ksbUJBQXVDLEVBQ3ZDLGNBQThCLEVBQzlCLG9CQUEwQyxFQUMxQyxtQkFBeUMsRUFDekMsV0FBeUI7UUFKekIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFvQjtRQUN2QyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXNCO1FBQ3pDLGdCQUFXLEdBQVgsV0FBVyxDQUFjO1FBRzNCLFVBQUssR0FBRyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU3QyxnQkFBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUMzQixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFD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S0FBSyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNwQixDQUFDOzsySEFsRlUsOEJBQThCOytIQUE5Qiw4QkFBOEI7MkZBQTlCLDhCQUE4QjtrQkFEMUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFVudHlwZWRGb3JtQ29udHJvbCxcbiAgVW50eXBlZEZvcm1Hcm91cCxcbiAgVmFsaWRhdG9ycyxcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgQXV0aFJlZGlyZWN0U2VydmljZSxcbiAgQXV0aFNlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlVHlwZSxcbiAgSHR0cEVycm9yTW9kZWwsXG4gIFJvdXRpbmdTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ3VzdG9tRm9ybVZhbGlkYXRvcnMgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgVXNlclBhc3N3b3JkRmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy91c2VyL3Byb2ZpbGUvcm9vdCc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFVwZGF0ZVBhc3N3b3JkQ29tcG9uZW50U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB1c2VyUGFzc3dvcmRTZXJ2aWNlOiBVc2VyUGFzc3dvcmRGYWNhZGUsXG4gICAgcHJvdGVjdGVkIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZ2xvYmFsTWVzc2FnZVNlcnZpY2U6IEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhdXRoUmVkaXJlY3RTZXJ2aWNlPzogQXV0aFJlZGlyZWN0U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYXV0aFNlcnZpY2U/OiBBdXRoU2VydmljZVxuICApIHt9XG5cbiAgcHJvdGVjdGVkIGJ1c3kkID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG5cbiAgaXNVcGRhdGluZyQgPSB0aGlzLmJ1c3kkLnBpcGUoXG4gICAgdGFwKChzdGF0ZSkgPT4gKHN0YXRlID09PSB0cnVlID8gdGhpcy5mb3JtLmRpc2FibGUoKSA6IHRoaXMuZm9ybS5lbmFibGUoKSkpXG4gICk7XG5cbiAgZm9ybTogVW50eXBlZEZvcm1Hcm91cCA9IG5ldyBVbnR5cGVkRm9ybUdyb3VwKFxuICAgIHtcbiAgICAgIG9sZFBhc3N3b3JkOiBuZXcgVW50eXBlZEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLnJlcXVpcmVkKSxcbiAgICAgIG5ld1Bhc3N3b3JkOiBuZXcgVW50eXBlZEZvcm1Db250cm9sKCcnLCBbXG4gICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgICAgIEN1c3RvbUZvcm1WYWxpZGF0b3JzLnBhc3N3b3JkVmFsaWRhdG9yLFxuICAgICAgXSksXG4gICAgICBuZXdQYXNzd29yZENvbmZpcm06IG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMucmVxdWlyZWQpLFxuICAgIH0sXG4gICAge1xuICAgICAgdmFsaWRhdG9yczogQ3VzdG9tRm9ybVZhbGlkYXRvcnMucGFzc3dvcmRzTXVzdE1hdGNoKFxuICAgICAgICAnbmV3UGFzc3dvcmQnLFxuICAgICAgICAnbmV3UGFzc3dvcmRDb25maXJtJ1xuICAgICAgKSxcbiAgICB9XG4gICk7XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHBhc3N3b3JkIGZvciB0aGUgdXNlci5cbiAgICovXG4gIHVwZGF0ZVBhc3N3b3JkKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5mb3JtLnZhbGlkKSB7XG4gICAgICB0aGlzLmZvcm0ubWFya0FsbEFzVG91Y2hlZCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYnVzeSQubmV4dCh0cnVlKTtcblxuICAgIGNvbnN0IG9sZFBhc3N3b3JkID0gdGhpcy5mb3JtLmdldCgnb2xkUGFzc3dvcmQnKT8udmFsdWU7XG4gICAgY29uc3QgbmV3UGFzc3dvcmQgPSB0aGlzLmZvcm0uZ2V0KCduZXdQYXNzd29yZCcpPy52YWx1ZTtcblxuICAgIHRoaXMudXNlclBhc3N3b3JkU2VydmljZS51cGRhdGUob2xkUGFzc3dvcmQsIG5ld1Bhc3N3b3JkKS5zdWJzY3JpYmUoe1xuICAgICAgbmV4dDogKCkgPT4gdGhpcy5vblN1Y2Nlc3MoKSxcbiAgICAgIGVycm9yOiAoZXJyb3I6IEh0dHBFcnJvck1vZGVsIHwgRXJyb3IpID0+IHRoaXMub25FcnJvcihlcnJvciksXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25TdWNjZXNzKCk6IHZvaWQge1xuICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgeyBrZXk6ICd1cGRhdGVQYXNzd29yZEZvcm0ucGFzc3dvcmRVcGRhdGVTdWNjZXNzJyB9LFxuICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfQ09ORklSTUFUSU9OXG4gICAgKTtcbiAgICB0aGlzLmJ1c3kkLm5leHQoZmFsc2UpO1xuICAgIHRoaXMuZm9ybS5yZXNldCgpO1xuXG4gICAgLy8gc2V0cyB0aGUgcmVkaXJlY3QgdXJsIGFmdGVyIGxvZ2luXG4gICAgdGhpcy5hdXRoUmVkaXJlY3RTZXJ2aWNlPy5zZXRSZWRpcmVjdFVybChcbiAgICAgIHRoaXMucm91dGluZ1NlcnZpY2UuZ2V0VXJsKHsgY3hSb3V0ZTogJ2hvbWUnIH0pXG4gICAgKTtcbiAgICAvLyBUT0RPKCM5NjM4KTogVXNlIGxvZ291dCByb3V0ZSB3aGVuIGl0IHdpbGwgc3VwcG9ydCBwYXNzaW5nIHJlZGlyZWN0IHVybFxuICAgIHRoaXMuYXV0aFNlcnZpY2U/LmNvcmVMb2dvdXQoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMucm91dGluZ1NlcnZpY2UuZ28oeyBjeFJvdXRlOiAnbG9naW4nIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIG9uRXJyb3IoX2Vycm9yOiBIdHRwRXJyb3JNb2RlbCB8IEVycm9yKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgX2Vycm9yIGluc3RhbmNlb2YgSHR0cEVycm9yTW9kZWwgJiZcbiAgICAgIF9lcnJvci5kZXRhaWxzPy5bMF0udHlwZSA9PT0gJ0FjY2Vzc0RlbmllZEVycm9yJ1xuICAgICkge1xuICAgICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICAgIHsga2V5OiAndXBkYXRlUGFzc3dvcmRGb3JtLmFjY2Vzc0RlbmllZEVycm9yJyB9LFxuICAgICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9FUlJPUlxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5idXN5JC5uZXh0KGZhbHNlKTtcbiAgICB0aGlzLmZvcm0ucmVzZXQoKTtcbiAgfVxufVxuIl19