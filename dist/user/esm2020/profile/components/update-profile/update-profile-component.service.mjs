/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators, } from '@angular/forms';
import { GlobalMessageType } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/user/profile/root";
import * as i2 from "@spartacus/core";
export class UpdateProfileComponentService {
    constructor(userProfile, globalMessageService) {
        this.userProfile = userProfile;
        this.globalMessageService = globalMessageService;
        this.user$ = this.userProfile
            .get()
            .pipe(filter((user) => Boolean(user)));
        this.busy$ = new BehaviorSubject(false);
        this.isUpdating$ = this.user$.pipe(tap((user) => this.form.patchValue(user)), switchMap((_user) => this.busy$), tap((state) => (state === true ? this.form.disable() : this.form.enable())));
        this.titles$ = this.userProfile.getTitles();
        this.form = new UntypedFormGroup({
            customerId: new UntypedFormControl(''),
            titleCode: new UntypedFormControl(''),
            firstName: new UntypedFormControl('', Validators.required),
            lastName: new UntypedFormControl('', Validators.required),
        });
    }
    /**
     * Updates the user's details and handles the UI.
     */
    updateProfile() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy$.next(true);
        this.userProfile.update(this.form.value).subscribe({
            next: () => this.onSuccess(),
            error: (error) => this.onError(error),
        });
    }
    onSuccess() {
        this.globalMessageService.add({
            key: 'updateProfileForm.profileUpdateSuccess',
        }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        this.busy$.next(false);
        this.form.reset();
    }
    onError(_error) {
        this.busy$.next(false);
    }
}
UpdateProfileComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdateProfileComponentService, deps: [{ token: i1.UserProfileFacade }, { token: i2.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
UpdateProfileComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdateProfileComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdateProfileComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserProfileFacade }, { type: i2.GlobalMessageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXByb2ZpbGUtY29tcG9uZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvdXNlci9wcm9maWxlL2NvbXBvbmVudHMvdXBkYXRlLXByb2ZpbGUvdXBkYXRlLXByb2ZpbGUtY29tcG9uZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUNMLGtCQUFrQixFQUNsQixnQkFBZ0IsRUFDaEIsVUFBVSxHQUNYLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRzFFLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFHeEQsTUFBTSxPQUFPLDZCQUE2QjtJQUN4QyxZQUNZLFdBQThCLEVBQzlCLG9CQUEwQztRQUQxQyxnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFDOUIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUc1QyxVQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVc7YUFDL0IsR0FBRyxFQUFFO2FBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBZ0IsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFN0MsVUFBSyxHQUFHLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTdDLGdCQUFXLEdBQXdCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUNoRCxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQ3pDLFNBQVMsQ0FBQyxDQUFDLEtBQVcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUN0QyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQzVFLENBQUM7UUFFRixZQUFPLEdBQXdCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFNUQsU0FBSSxHQUFxQixJQUFJLGdCQUFnQixDQUFDO1lBQzVDLFVBQVUsRUFBRSxJQUFJLGtCQUFrQixDQUFDLEVBQUUsQ0FBQztZQUN0QyxTQUFTLEVBQUUsSUFBSSxrQkFBa0IsQ0FBQyxFQUFFLENBQUM7WUFDckMsU0FBUyxFQUFFLElBQUksa0JBQWtCLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDMUQsUUFBUSxFQUFFLElBQUksa0JBQWtCLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7U0FDMUQsQ0FBQyxDQUFDO0lBckJBLENBQUM7SUF1Qko7O09BRUc7SUFDSCxhQUFhO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUM3QixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV0QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUNqRCxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUM1QixLQUFLLEVBQUUsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1NBQzdDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFUyxTQUFTO1FBQ2pCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQzNCO1lBQ0UsR0FBRyxFQUFFLHdDQUF3QztTQUM5QyxFQUNELGlCQUFpQixDQUFDLHFCQUFxQixDQUN4QyxDQUFDO1FBRUYsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRVMsT0FBTyxDQUFDLE1BQWE7UUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekIsQ0FBQzs7MEhBMURVLDZCQUE2Qjs4SEFBN0IsNkJBQTZCOzJGQUE3Qiw2QkFBNkI7a0JBRHpDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBVbnR5cGVkRm9ybUNvbnRyb2wsXG4gIFVudHlwZWRGb3JtR3JvdXAsXG4gIFZhbGlkYXRvcnMsXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLCBHbG9iYWxNZXNzYWdlVHlwZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnQHNwYXJ0YWN1cy91c2VyL2FjY291bnQvcm9vdCc7XG5pbXBvcnQgeyBUaXRsZSwgVXNlclByb2ZpbGVGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL3VzZXIvcHJvZmlsZS9yb290JztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFVwZGF0ZVByb2ZpbGVDb21wb25lbnRTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHVzZXJQcm9maWxlOiBVc2VyUHJvZmlsZUZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgZ2xvYmFsTWVzc2FnZVNlcnZpY2U6IEdsb2JhbE1lc3NhZ2VTZXJ2aWNlXG4gICkge31cblxuICBwcm90ZWN0ZWQgdXNlciQgPSB0aGlzLnVzZXJQcm9maWxlXG4gICAgLmdldCgpXG4gICAgLnBpcGUoZmlsdGVyKCh1c2VyKTogdXNlciBpcyBVc2VyID0+IEJvb2xlYW4odXNlcikpKTtcblxuICBwcm90ZWN0ZWQgYnVzeSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcblxuICBpc1VwZGF0aW5nJDogT2JzZXJ2YWJsZTxib29sZWFuPiA9IHRoaXMudXNlciQucGlwZShcbiAgICB0YXAoKHVzZXIpID0+IHRoaXMuZm9ybS5wYXRjaFZhbHVlKHVzZXIpKSxcbiAgICBzd2l0Y2hNYXAoKF91c2VyOiBVc2VyKSA9PiB0aGlzLmJ1c3kkKSxcbiAgICB0YXAoKHN0YXRlKSA9PiAoc3RhdGUgPT09IHRydWUgPyB0aGlzLmZvcm0uZGlzYWJsZSgpIDogdGhpcy5mb3JtLmVuYWJsZSgpKSlcbiAgKTtcblxuICB0aXRsZXMkOiBPYnNlcnZhYmxlPFRpdGxlW10+ID0gdGhpcy51c2VyUHJvZmlsZS5nZXRUaXRsZXMoKTtcblxuICBmb3JtOiBVbnR5cGVkRm9ybUdyb3VwID0gbmV3IFVudHlwZWRGb3JtR3JvdXAoe1xuICAgIGN1c3RvbWVySWQ6IG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woJycpLFxuICAgIHRpdGxlQ29kZTogbmV3IFVudHlwZWRGb3JtQ29udHJvbCgnJyksXG4gICAgZmlyc3ROYW1lOiBuZXcgVW50eXBlZEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLnJlcXVpcmVkKSxcbiAgICBsYXN0TmFtZTogbmV3IFVudHlwZWRGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5yZXF1aXJlZCksXG4gIH0pO1xuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSB1c2VyJ3MgZGV0YWlscyBhbmQgaGFuZGxlcyB0aGUgVUkuXG4gICAqL1xuICB1cGRhdGVQcm9maWxlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5mb3JtLnZhbGlkKSB7XG4gICAgICB0aGlzLmZvcm0ubWFya0FsbEFzVG91Y2hlZCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYnVzeSQubmV4dCh0cnVlKTtcblxuICAgIHRoaXMudXNlclByb2ZpbGUudXBkYXRlKHRoaXMuZm9ybS52YWx1ZSkuc3Vic2NyaWJlKHtcbiAgICAgIG5leHQ6ICgpID0+IHRoaXMub25TdWNjZXNzKCksXG4gICAgICBlcnJvcjogKGVycm9yOiBFcnJvcikgPT4gdGhpcy5vbkVycm9yKGVycm9yKSxcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvblN1Y2Nlc3MoKTogdm9pZCB7XG4gICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICB7XG4gICAgICAgIGtleTogJ3VwZGF0ZVByb2ZpbGVGb3JtLnByb2ZpbGVVcGRhdGVTdWNjZXNzJyxcbiAgICAgIH0sXG4gICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9DT05GSVJNQVRJT05cbiAgICApO1xuXG4gICAgdGhpcy5idXN5JC5uZXh0KGZhbHNlKTtcbiAgICB0aGlzLmZvcm0ucmVzZXQoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbkVycm9yKF9lcnJvcjogRXJyb3IpOiB2b2lkIHtcbiAgICB0aGlzLmJ1c3kkLm5leHQoZmFsc2UpO1xuICB9XG59XG4iXX0=