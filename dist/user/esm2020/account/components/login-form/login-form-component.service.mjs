/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators, } from '@angular/forms';
import { GlobalMessageType, } from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { BehaviorSubject, from } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class LoginFormComponentService {
    constructor(auth, globalMessage, winRef) {
        this.auth = auth;
        this.globalMessage = globalMessage;
        this.winRef = winRef;
        this.busy$ = new BehaviorSubject(false);
        this.isUpdating$ = this.busy$.pipe(tap((state) => {
            const userId = this.winRef.nativeWindow?.history?.state?.['newUid'];
            if (userId) {
                this.form.patchValue({ userId });
            }
            state === true ? this.form.disable() : this.form.enable();
        }));
        this.form = new UntypedFormGroup({
            userId: new UntypedFormControl('', [
                Validators.required,
                CustomFormValidators.emailValidator,
            ]),
            password: new UntypedFormControl('', Validators.required),
        });
    }
    login() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy$.next(true);
        from(this.auth.loginWithCredentials(
        // TODO: consider dropping toLowerCase as this should not be part of the UI,
        // as it's too opinionated and doesn't work with other AUTH services
        this.form.value.userId.toLowerCase(), this.form.value.password))
            .pipe(withLatestFrom(this.auth.isUserLoggedIn()), tap(([_, isLoggedIn]) => this.onSuccess(isLoggedIn)))
            .subscribe();
    }
    onSuccess(isLoggedIn) {
        if (isLoggedIn) {
            // We want to remove error messages on successful login (primary the bad
            // username/password combination)
            this.globalMessage.remove(GlobalMessageType.MSG_TYPE_ERROR);
            this.form.reset();
        }
        this.busy$.next(false);
    }
}
LoginFormComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginFormComponentService, deps: [{ token: i1.AuthService }, { token: i1.GlobalMessageService }, { token: i1.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
LoginFormComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginFormComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginFormComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.AuthService }, { type: i1.GlobalMessageService }, { type: i1.WindowRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tZm9ybS1jb21wb25lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy91c2VyL2FjY291bnQvY29tcG9uZW50cy9sb2dpbi1mb3JtL2xvZ2luLWZvcm0tY29tcG9uZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUNMLGtCQUFrQixFQUNsQixnQkFBZ0IsRUFDaEIsVUFBVSxHQUNYLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUdMLGlCQUFpQixHQUVsQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUdyRCxNQUFNLE9BQU8seUJBQXlCO0lBQ3BDLFlBQ1ksSUFBaUIsRUFDakIsYUFBbUMsRUFDbkMsTUFBaUI7UUFGakIsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUNqQixrQkFBYSxHQUFiLGFBQWEsQ0FBc0I7UUFDbkMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUduQixVQUFLLEdBQUcsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFN0MsZ0JBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDM0IsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDWixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEUsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO2FBQ2xDO1lBQ0QsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM1RCxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBRUYsU0FBSSxHQUFxQixJQUFJLGdCQUFnQixDQUFDO1lBQzVDLE1BQU0sRUFBRSxJQUFJLGtCQUFrQixDQUFDLEVBQUUsRUFBRTtnQkFDakMsVUFBVSxDQUFDLFFBQVE7Z0JBQ25CLG9CQUFvQixDQUFDLGNBQWM7YUFDcEMsQ0FBQztZQUNGLFFBQVEsRUFBRSxJQUFJLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO1NBQzFELENBQUMsQ0FBQztJQXBCQSxDQUFDO0lBc0JKLEtBQUs7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzdCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRCLElBQUksQ0FDRixJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQjtRQUM1Qiw0RUFBNEU7UUFDNUUsb0VBQW9FO1FBQ3BFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsRUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUN6QixDQUNGO2FBQ0UsSUFBSSxDQUNILGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQzFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQ3JEO2FBQ0EsU0FBUyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVTLFNBQVMsQ0FBQyxVQUFtQjtRQUNyQyxJQUFJLFVBQVUsRUFBRTtZQUNkLHdFQUF3RTtZQUN4RSxpQ0FBaUM7WUFDakMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNuQjtRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pCLENBQUM7O3NIQTNEVSx5QkFBeUI7MEhBQXpCLHlCQUF5QjsyRkFBekIseUJBQXlCO2tCQURyQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgVW50eXBlZEZvcm1Db250cm9sLFxuICBVbnR5cGVkRm9ybUdyb3VwLFxuICBWYWxpZGF0b3JzLFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBBdXRoU2VydmljZSxcbiAgR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VUeXBlLFxuICBXaW5kb3dSZWYsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDdXN0b21Gb3JtVmFsaWRhdG9ycyB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGZyb20gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCwgd2l0aExhdGVzdEZyb20gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2dpbkZvcm1Db21wb25lbnRTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGF1dGg6IEF1dGhTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBnbG9iYWxNZXNzYWdlOiBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgd2luUmVmOiBXaW5kb3dSZWZcbiAgKSB7fVxuXG4gIHByb3RlY3RlZCBidXN5JCA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xuXG4gIGlzVXBkYXRpbmckID0gdGhpcy5idXN5JC5waXBlKFxuICAgIHRhcCgoc3RhdGUpID0+IHtcbiAgICAgIGNvbnN0IHVzZXJJZCA9IHRoaXMud2luUmVmLm5hdGl2ZVdpbmRvdz8uaGlzdG9yeT8uc3RhdGU/LlsnbmV3VWlkJ107XG4gICAgICBpZiAodXNlcklkKSB7XG4gICAgICAgIHRoaXMuZm9ybS5wYXRjaFZhbHVlKHsgdXNlcklkIH0pO1xuICAgICAgfVxuICAgICAgc3RhdGUgPT09IHRydWUgPyB0aGlzLmZvcm0uZGlzYWJsZSgpIDogdGhpcy5mb3JtLmVuYWJsZSgpO1xuICAgIH0pXG4gICk7XG5cbiAgZm9ybTogVW50eXBlZEZvcm1Hcm91cCA9IG5ldyBVbnR5cGVkRm9ybUdyb3VwKHtcbiAgICB1c2VySWQ6IG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woJycsIFtcbiAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgICBDdXN0b21Gb3JtVmFsaWRhdG9ycy5lbWFpbFZhbGlkYXRvcixcbiAgICBdKSxcbiAgICBwYXNzd29yZDogbmV3IFVudHlwZWRGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5yZXF1aXJlZCksXG4gIH0pO1xuXG4gIGxvZ2luKCkge1xuICAgIGlmICghdGhpcy5mb3JtLnZhbGlkKSB7XG4gICAgICB0aGlzLmZvcm0ubWFya0FsbEFzVG91Y2hlZCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYnVzeSQubmV4dCh0cnVlKTtcblxuICAgIGZyb20oXG4gICAgICB0aGlzLmF1dGgubG9naW5XaXRoQ3JlZGVudGlhbHMoXG4gICAgICAgIC8vIFRPRE86IGNvbnNpZGVyIGRyb3BwaW5nIHRvTG93ZXJDYXNlIGFzIHRoaXMgc2hvdWxkIG5vdCBiZSBwYXJ0IG9mIHRoZSBVSSxcbiAgICAgICAgLy8gYXMgaXQncyB0b28gb3BpbmlvbmF0ZWQgYW5kIGRvZXNuJ3Qgd29yayB3aXRoIG90aGVyIEFVVEggc2VydmljZXNcbiAgICAgICAgdGhpcy5mb3JtLnZhbHVlLnVzZXJJZC50b0xvd2VyQ2FzZSgpLFxuICAgICAgICB0aGlzLmZvcm0udmFsdWUucGFzc3dvcmRcbiAgICAgIClcbiAgICApXG4gICAgICAucGlwZShcbiAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5hdXRoLmlzVXNlckxvZ2dlZEluKCkpLFxuICAgICAgICB0YXAoKFtfLCBpc0xvZ2dlZEluXSkgPT4gdGhpcy5vblN1Y2Nlc3MoaXNMb2dnZWRJbikpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25TdWNjZXNzKGlzTG9nZ2VkSW46IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoaXNMb2dnZWRJbikge1xuICAgICAgLy8gV2Ugd2FudCB0byByZW1vdmUgZXJyb3IgbWVzc2FnZXMgb24gc3VjY2Vzc2Z1bCBsb2dpbiAocHJpbWFyeSB0aGUgYmFkXG4gICAgICAvLyB1c2VybmFtZS9wYXNzd29yZCBjb21iaW5hdGlvbilcbiAgICAgIHRoaXMuZ2xvYmFsTWVzc2FnZS5yZW1vdmUoR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1IpO1xuICAgICAgdGhpcy5mb3JtLnJlc2V0KCk7XG4gICAgfVxuXG4gICAgdGhpcy5idXN5JC5uZXh0KGZhbHNlKTtcbiAgfVxufVxuIl19