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
import { map, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/user/profile/root";
import * as i2 from "@spartacus/core";
export class ResetPasswordComponentService {
    constructor(userPasswordService, routingService, globalMessage) {
        this.userPasswordService = userPasswordService;
        this.routingService = routingService;
        this.globalMessage = globalMessage;
        this.busy$ = new BehaviorSubject(false);
        this.isUpdating$ = this.busy$.pipe(tap((state) => (state === true ? this.form.disable() : this.form.enable())));
        this.resetToken$ = this.routingService
            .getRouterState()
            .pipe(map((routerState) => routerState.state.queryParams['token']));
        this.form = new UntypedFormGroup({
            password: new UntypedFormControl('', [
                Validators.required,
                CustomFormValidators.passwordValidator,
            ]),
            passwordConfirm: new UntypedFormControl('', Validators.required),
        }, {
            validators: CustomFormValidators.passwordsMustMatch('password', 'passwordConfirm'),
        });
    }
    /**
     * Resets the password by the given token.
     *
     * The token has been provided during the request password flow.
     * The token is not validated on the client.
     */
    resetPassword(token) {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy$.next(true);
        const password = this.form.get('password').value;
        this.userPasswordService.reset(token, password).subscribe({
            next: () => this.onSuccess(),
            error: (error) => this.onError(error),
        });
    }
    onSuccess() {
        this.globalMessage.add({ key: 'forgottenPassword.passwordResetSuccess' }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        this.busy$.next(false);
        this.form.reset();
        this.redirect();
    }
    onError(error) {
        this.busy$.next(false);
        if (error instanceof HttpErrorModel) {
            (error.details ?? []).forEach((err) => {
                if (err.message) {
                    this.globalMessage.add({ raw: err.message }, GlobalMessageType.MSG_TYPE_ERROR);
                }
            });
        }
    }
    /**
     * Redirects the user to the login page.
     */
    redirect() {
        this.routingService.go({ cxRoute: 'login' });
    }
}
ResetPasswordComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ResetPasswordComponentService, deps: [{ token: i1.UserPasswordFacade }, { token: i2.RoutingService }, { token: i2.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
ResetPasswordComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ResetPasswordComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ResetPasswordComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserPasswordFacade }, { type: i2.RoutingService }, { type: i2.GlobalMessageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXQtcGFzc3dvcmQtY29tcG9uZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvdXNlci9wcm9maWxlL2NvbXBvbmVudHMvcmVzZXQtcGFzc3dvcmQvcmVzZXQtcGFzc3dvcmQtY29tcG9uZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUNMLGtCQUFrQixFQUNsQixnQkFBZ0IsRUFDaEIsVUFBVSxHQUNYLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUVMLGlCQUFpQixFQUNqQixjQUFjLEdBR2YsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU3RCxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFHMUMsTUFBTSxPQUFPLDZCQUE2QjtJQUN4QyxZQUNZLG1CQUF1QyxFQUN2QyxjQUE4QixFQUM5QixhQUFtQztRQUZuQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW9CO1FBQ3ZDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixrQkFBYSxHQUFiLGFBQWEsQ0FBc0I7UUFHckMsVUFBSyxHQUFHLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTdDLGdCQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQzNCLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxJ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MjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBVbnR5cGVkRm9ybUNvbnRyb2wsXG4gIFVudHlwZWRGb3JtR3JvdXAsXG4gIFZhbGlkYXRvcnMsXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlVHlwZSxcbiAgSHR0cEVycm9yTW9kZWwsXG4gIFJvdXRlclN0YXRlLFxuICBSb3V0aW5nU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEN1c3RvbUZvcm1WYWxpZGF0b3JzIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IFVzZXJQYXNzd29yZEZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvdXNlci9wcm9maWxlL3Jvb3QnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlc2V0UGFzc3dvcmRDb21wb25lbnRTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHVzZXJQYXNzd29yZFNlcnZpY2U6IFVzZXJQYXNzd29yZEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBnbG9iYWxNZXNzYWdlOiBHbG9iYWxNZXNzYWdlU2VydmljZVxuICApIHt9XG5cbiAgcHJvdGVjdGVkIGJ1c3kkID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG5cbiAgaXNVcGRhdGluZyQgPSB0aGlzLmJ1c3kkLnBpcGUoXG4gICAgdGFwKChzdGF0ZSkgPT4gKHN0YXRlID09PSB0cnVlID8gdGhpcy5mb3JtLmRpc2FibGUoKSA6IHRoaXMuZm9ybS5lbmFibGUoKSkpXG4gICk7XG5cbiAgcmVzZXRUb2tlbiQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMucm91dGluZ1NlcnZpY2VcbiAgICAuZ2V0Um91dGVyU3RhdGUoKVxuICAgIC5waXBlKFxuICAgICAgbWFwKChyb3V0ZXJTdGF0ZTogUm91dGVyU3RhdGUpID0+IHJvdXRlclN0YXRlLnN0YXRlLnF1ZXJ5UGFyYW1zWyd0b2tlbiddKVxuICAgICk7XG5cbiAgZm9ybTogVW50eXBlZEZvcm1Hcm91cCA9IG5ldyBVbnR5cGVkRm9ybUdyb3VwKFxuICAgIHtcbiAgICAgIHBhc3N3b3JkOiBuZXcgVW50eXBlZEZvcm1Db250cm9sKCcnLCBbXG4gICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgICAgIEN1c3RvbUZvcm1WYWxpZGF0b3JzLnBhc3N3b3JkVmFsaWRhdG9yLFxuICAgICAgXSksXG4gICAgICBwYXNzd29yZENvbmZpcm06IG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMucmVxdWlyZWQpLFxuICAgIH0sXG4gICAge1xuICAgICAgdmFsaWRhdG9yczogQ3VzdG9tRm9ybVZhbGlkYXRvcnMucGFzc3dvcmRzTXVzdE1hdGNoKFxuICAgICAgICAncGFzc3dvcmQnLFxuICAgICAgICAncGFzc3dvcmRDb25maXJtJ1xuICAgICAgKSxcbiAgICB9XG4gICk7XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgcGFzc3dvcmQgYnkgdGhlIGdpdmVuIHRva2VuLlxuICAgKlxuICAgKiBUaGUgdG9rZW4gaGFzIGJlZW4gcHJvdmlkZWQgZHVyaW5nIHRoZSByZXF1ZXN0IHBhc3N3b3JkIGZsb3cuXG4gICAqIFRoZSB0b2tlbiBpcyBub3QgdmFsaWRhdGVkIG9uIHRoZSBjbGllbnQuXG4gICAqL1xuICByZXNldFBhc3N3b3JkKHRva2VuOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZm9ybS52YWxpZCkge1xuICAgICAgdGhpcy5mb3JtLm1hcmtBbGxBc1RvdWNoZWQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmJ1c3kkLm5leHQodHJ1ZSk7XG5cbiAgICBjb25zdCBwYXNzd29yZCA9ICh0aGlzLmZvcm0uZ2V0KCdwYXNzd29yZCcpIGFzIFVudHlwZWRGb3JtQ29udHJvbCkudmFsdWU7XG5cbiAgICB0aGlzLnVzZXJQYXNzd29yZFNlcnZpY2UucmVzZXQodG9rZW4sIHBhc3N3b3JkKS5zdWJzY3JpYmUoe1xuICAgICAgbmV4dDogKCkgPT4gdGhpcy5vblN1Y2Nlc3MoKSxcbiAgICAgIGVycm9yOiAoZXJyb3I6IHVua25vd24pID0+IHRoaXMub25FcnJvcihlcnJvciksXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25TdWNjZXNzKCk6IHZvaWQge1xuICAgIHRoaXMuZ2xvYmFsTWVzc2FnZS5hZGQoXG4gICAgICB7IGtleTogJ2ZvcmdvdHRlblBhc3N3b3JkLnBhc3N3b3JkUmVzZXRTdWNjZXNzJyB9LFxuICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfQ09ORklSTUFUSU9OXG4gICAgKTtcbiAgICB0aGlzLmJ1c3kkLm5leHQoZmFsc2UpO1xuICAgIHRoaXMuZm9ybS5yZXNldCgpO1xuICAgIHRoaXMucmVkaXJlY3QoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbkVycm9yKGVycm9yOiB1bmtub3duKTogdm9pZCB7XG4gICAgdGhpcy5idXN5JC5uZXh0KGZhbHNlKTtcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3JNb2RlbCkge1xuICAgICAgKGVycm9yLmRldGFpbHMgPz8gW10pLmZvckVhY2goKGVycikgPT4ge1xuICAgICAgICBpZiAoZXJyLm1lc3NhZ2UpIHtcbiAgICAgICAgICB0aGlzLmdsb2JhbE1lc3NhZ2UuYWRkKFxuICAgICAgICAgICAgeyByYXc6IGVyci5tZXNzYWdlIH0sXG4gICAgICAgICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9FUlJPUlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWRpcmVjdHMgdGhlIHVzZXIgdG8gdGhlIGxvZ2luIHBhZ2UuXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVkaXJlY3QoKSB7XG4gICAgdGhpcy5yb3V0aW5nU2VydmljZS5nbyh7IGN4Um91dGU6ICdsb2dpbicgfSk7XG4gIH1cbn1cbiJdfQ==