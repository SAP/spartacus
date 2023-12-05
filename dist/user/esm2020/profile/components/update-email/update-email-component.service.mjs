/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators, } from '@angular/forms';
import { GlobalMessageType, } from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/user/profile/root";
import * as i2 from "@spartacus/core";
export class UpdateEmailComponentService {
    constructor(userEmail, routingService, globalMessageService, authService, authRedirectService) {
        this.userEmail = userEmail;
        this.routingService = routingService;
        this.globalMessageService = globalMessageService;
        this.authService = authService;
        this.authRedirectService = authRedirectService;
        this.busy$ = new BehaviorSubject(false);
        this.isUpdating$ = this.busy$.pipe(tap((state) => (state === true ? this.form.disable() : this.form.enable())));
        this.form = new UntypedFormGroup({
            email: new UntypedFormControl('', [
                Validators.required,
                CustomFormValidators.emailValidator,
            ]),
            confirmEmail: new UntypedFormControl('', [Validators.required]),
            password: new UntypedFormControl('', [Validators.required]),
        }, {
            validators: CustomFormValidators.emailsMustMatch('email', 'confirmEmail'),
        });
    }
    save() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy$.next(true);
        const newEmail = this.form.get('confirmEmail')?.value;
        const password = this.form.get('password')?.value;
        this.userEmail.update(password, newEmail).subscribe({
            next: () => this.onSuccess(newEmail),
            error: (error) => this.onError(error),
        });
    }
    /**
     * Handles successful updating of the user email.
     */
    onSuccess(newUid) {
        this.globalMessageService.add({
            key: 'updateEmailForm.emailUpdateSuccess',
            params: { newUid },
        }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        this.busy$.next(false);
        this.form.reset();
        // sets the redirect url after login
        this.authRedirectService.setRedirectUrl(this.routingService.getUrl({ cxRoute: 'home' }));
        // TODO(#9638): Use logout route when it will support passing redirect url
        this.authService.coreLogout().then(() => {
            this.routingService.go({ cxRoute: 'login' }, {
                state: {
                    newUid,
                },
            });
        });
    }
    onError(_error) {
        this.busy$.next(false);
    }
}
UpdateEmailComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdateEmailComponentService, deps: [{ token: i1.UserEmailFacade }, { token: i2.RoutingService }, { token: i2.GlobalMessageService }, { token: i2.AuthService }, { token: i2.AuthRedirectService }], target: i0.ɵɵFactoryTarget.Injectable });
UpdateEmailComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdateEmailComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdateEmailComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserEmailFacade }, { type: i2.RoutingService }, { type: i2.GlobalMessageService }, { type: i2.AuthService }, { type: i2.AuthRedirectService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWVtYWlsLWNvbXBvbmVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3VzZXIvcHJvZmlsZS9jb21wb25lbnRzL3VwZGF0ZS1lbWFpbC91cGRhdGUtZW1haWwtY29tcG9uZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUNMLGtCQUFrQixFQUNsQixnQkFBZ0IsRUFDaEIsVUFBVSxHQUNYLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUlMLGlCQUFpQixHQUVsQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBR3JDLE1BQU0sT0FBTywyQkFBMkI7SUFDdEMsWUFDWSxTQUEwQixFQUMxQixjQUE4QixFQUM5QixvQkFBMEMsRUFDMUMsV0FBd0IsRUFDeEIsbUJBQXdDO1FBSnhDLGNBQVMsR0FBVCxTQUFTLENBQWlCO1FBQzFCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFHMUMsVUFBSyxHQUFHLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTdDLGdCQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQzNCLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFD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cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFVudHlwZWRGb3JtQ29udHJvbCxcbiAgVW50eXBlZEZvcm1Hcm91cCxcbiAgVmFsaWRhdG9ycyxcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgQXV0aFJlZGlyZWN0U2VydmljZSxcbiAgQXV0aFNlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlVHlwZSxcbiAgUm91dGluZ1NlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDdXN0b21Gb3JtVmFsaWRhdG9ycyB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBVc2VyRW1haWxGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL3VzZXIvcHJvZmlsZS9yb290JztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXBkYXRlRW1haWxDb21wb25lbnRTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHVzZXJFbWFpbDogVXNlckVtYWlsRmFjYWRlLFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGdsb2JhbE1lc3NhZ2VTZXJ2aWNlOiBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhdXRoUmVkaXJlY3RTZXJ2aWNlOiBBdXRoUmVkaXJlY3RTZXJ2aWNlXG4gICkge31cblxuICBwcm90ZWN0ZWQgYnVzeSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcblxuICBpc1VwZGF0aW5nJCA9IHRoaXMuYnVzeSQucGlwZShcbiAgICB0YXAoKHN0YXRlKSA9PiAoc3RhdGUgPT09IHRydWUgPyB0aGlzLmZvcm0uZGlzYWJsZSgpIDogdGhpcy5mb3JtLmVuYWJsZSgpKSlcbiAgKTtcblxuICBmb3JtOiBVbnR5cGVkRm9ybUdyb3VwID0gbmV3IFVudHlwZWRGb3JtR3JvdXAoXG4gICAge1xuICAgICAgZW1haWw6IG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woJycsIFtcbiAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcbiAgICAgICAgQ3VzdG9tRm9ybVZhbGlkYXRvcnMuZW1haWxWYWxpZGF0b3IsXG4gICAgICBdKSxcbiAgICAgIGNvbmZpcm1FbWFpbDogbmV3IFVudHlwZWRGb3JtQ29udHJvbCgnJywgW1ZhbGlkYXRvcnMucmVxdWlyZWRdKSxcbiAgICAgIHBhc3N3b3JkOiBuZXcgVW50eXBlZEZvcm1Db250cm9sKCcnLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF0pLFxuICAgIH0sXG4gICAge1xuICAgICAgdmFsaWRhdG9yczogQ3VzdG9tRm9ybVZhbGlkYXRvcnMuZW1haWxzTXVzdE1hdGNoKCdlbWFpbCcsICdjb25maXJtRW1haWwnKSxcbiAgICB9XG4gICk7XG5cbiAgc2F2ZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZm9ybS52YWxpZCkge1xuICAgICAgdGhpcy5mb3JtLm1hcmtBbGxBc1RvdWNoZWQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmJ1c3kkLm5leHQodHJ1ZSk7XG5cbiAgICBjb25zdCBuZXdFbWFpbCA9IHRoaXMuZm9ybS5nZXQoJ2NvbmZpcm1FbWFpbCcpPy52YWx1ZTtcbiAgICBjb25zdCBwYXNzd29yZCA9IHRoaXMuZm9ybS5nZXQoJ3Bhc3N3b3JkJyk/LnZhbHVlO1xuXG4gICAgdGhpcy51c2VyRW1haWwudXBkYXRlKHBhc3N3b3JkLCBuZXdFbWFpbCkuc3Vic2NyaWJlKHtcbiAgICAgIG5leHQ6ICgpID0+IHRoaXMub25TdWNjZXNzKG5ld0VtYWlsKSxcbiAgICAgIGVycm9yOiAoZXJyb3I6IEVycm9yKSA9PiB0aGlzLm9uRXJyb3IoZXJyb3IpLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgc3VjY2Vzc2Z1bCB1cGRhdGluZyBvZiB0aGUgdXNlciBlbWFpbC5cbiAgICovXG4gIHByb3RlY3RlZCBvblN1Y2Nlc3MobmV3VWlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgIHtcbiAgICAgICAga2V5OiAndXBkYXRlRW1haWxGb3JtLmVtYWlsVXBkYXRlU3VjY2VzcycsXG4gICAgICAgIHBhcmFtczogeyBuZXdVaWQgfSxcbiAgICAgIH0sXG4gICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9DT05GSVJNQVRJT05cbiAgICApO1xuICAgIHRoaXMuYnVzeSQubmV4dChmYWxzZSk7XG4gICAgdGhpcy5mb3JtLnJlc2V0KCk7XG4gICAgLy8gc2V0cyB0aGUgcmVkaXJlY3QgdXJsIGFmdGVyIGxvZ2luXG4gICAgdGhpcy5hdXRoUmVkaXJlY3RTZXJ2aWNlLnNldFJlZGlyZWN0VXJsKFxuICAgICAgdGhpcy5yb3V0aW5nU2VydmljZS5nZXRVcmwoeyBjeFJvdXRlOiAnaG9tZScgfSlcbiAgICApO1xuICAgIC8vIFRPRE8oIzk2MzgpOiBVc2UgbG9nb3V0IHJvdXRlIHdoZW4gaXQgd2lsbCBzdXBwb3J0IHBhc3NpbmcgcmVkaXJlY3QgdXJsXG4gICAgdGhpcy5hdXRoU2VydmljZS5jb3JlTG9nb3V0KCkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLnJvdXRpbmdTZXJ2aWNlLmdvKFxuICAgICAgICB7IGN4Um91dGU6ICdsb2dpbicgfSxcbiAgICAgICAge1xuICAgICAgICAgIHN0YXRlOiB7XG4gICAgICAgICAgICBuZXdVaWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbkVycm9yKF9lcnJvcjogRXJyb3IpOiB2b2lkIHtcbiAgICB0aGlzLmJ1c3kkLm5leHQoZmFsc2UpO1xuICB9XG59XG4iXX0=