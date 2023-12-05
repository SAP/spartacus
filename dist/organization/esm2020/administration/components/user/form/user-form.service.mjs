/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, inject } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators, } from '@angular/forms';
import { B2BUserRole, FeatureConfigService } from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { FormService } from '../../shared/form/form.service';
import * as i0 from "@angular/core";
export class UserFormService extends FormService {
    constructor() {
        super(...arguments);
        this.featureConfigService = inject(FeatureConfigService, {
            optional: true,
        });
    }
    build() {
        const form = new UntypedFormGroup({});
        form.setControl('customerId', new UntypedFormControl(''));
        form.setControl('titleCode', new UntypedFormControl(''));
        form.setControl('firstName', new UntypedFormControl('', Validators.required));
        form.setControl('lastName', new UntypedFormControl('', Validators.required));
        form.setControl('email', new UntypedFormControl('', [
            Validators.required,
            CustomFormValidators.emailValidator,
        ]));
        form.setControl('orgUnit', new UntypedFormGroup({
            uid: new UntypedFormControl(undefined, Validators.required),
        }));
        form.setControl('roles', new UntypedFormArray([]));
        form.setControl('isAssignedToApprovers', new UntypedFormControl(false));
        form.get('roles')?.valueChanges.subscribe((roles) => {
            if (roles.includes(B2BUserRole.APPROVER)) {
                form.get('isAssignedToApprovers')?.enable();
            }
            else {
                form.get('isAssignedToApprovers')?.disable();
                form.get('isAssignedToApprovers')?.reset();
            }
        });
        this.form = form;
    }
    patchData(item) {
        super.patchData(item);
        if (item) {
            const roles = this.form?.get('roles');
            item.roles?.forEach((role) => {
                if (!roles.value.includes(role)) {
                    roles.push(new UntypedFormControl(role));
                }
            });
            if (this.featureConfigService?.isLevel('6.7')) {
                this.form?.get('email')?.setValue(item?.displayUid);
            }
        }
    }
}
UserFormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserFormService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
UserFormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserFormService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserFormService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1mb3JtLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdXNlci9mb3JtL3VzZXItZm9ybS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLGtCQUFrQixFQUNsQixnQkFBZ0IsRUFDaEIsVUFBVSxHQUNYLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFXLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7QUFLN0QsTUFBTSxPQUFPLGVBQWdCLFNBQVEsV0FBb0I7SUFIekQ7O1FBSXFCLHlCQUFvQixHQUFHLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRTtZQUNyRSxRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUMsQ0FBQztLQXlESjtJQXZEVyxLQUFLO1FBQ2IsTUFBTSxJQUFJLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxJQUFJLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxVQUFVLENBQ2IsV0FBVyxFQUNYLElBQUksa0JBQWtCLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FDaEQsQ0FBQztRQUNGLElBQUksQ0FBQyxVQUFVLENBQ2IsVUFBVSxFQUNWLElBQUksa0JBQWtCLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FDaEQsQ0FBQztRQUNGLElBQUksQ0FBQyxVQUFVLENBQ2IsT0FBTyxFQUNQLElBQUksa0JBQWtCLENBQUMsRUFBRSxFQUFFO1lBQ3pCLFVBQVUsQ0FBQyxRQUFRO1lBQ25CLG9CQUFvQixDQUFDLGNBQWM7U0FDcEMsQ0FBQyxDQUNILENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxDQUNiLFNBQVMsRUFDVCxJQUFJLGdCQUFnQixDQUFDO1lBQ25CLEdBQUcsRUFBRSxJQUFJLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO1NBQzVELENBQUMsQ0FDSCxDQUFDO1FBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxVQUFVLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRXhFLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQWUsRUFBRSxFQUFFO1lBQzVELElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQzthQUM3QztpQkFBTTtnQkFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQzthQUM1QztRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVTLFNBQVMsQ0FBQyxJQUFhO1FBQy9CLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsSUFBSSxJQUFJLEVBQUU7WUFDUixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQXFCLENBQUM7WUFDMUQsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDM0IsSUFBSSxDQUFFLEtBQUssQ0FBQyxLQUFrQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDN0MsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQzFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzdDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDckQ7U0FDRjtJQUNILENBQUM7OzRHQTNEVSxlQUFlO2dIQUFmLGVBQWUsY0FGZCxNQUFNOzJGQUVQLGVBQWU7a0JBSDNCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBVbnR5cGVkRm9ybUFycmF5LFxuICBVbnR5cGVkRm9ybUNvbnRyb2wsXG4gIFVudHlwZWRGb3JtR3JvdXAsXG4gIFZhbGlkYXRvcnMsXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEIyQlVzZXIsIEIyQlVzZXJSb2xlLCBGZWF0dXJlQ29uZmlnU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDdXN0b21Gb3JtVmFsaWRhdG9ycyB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBGb3JtU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9mb3JtL2Zvcm0uc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBVc2VyRm9ybVNlcnZpY2UgZXh0ZW5kcyBGb3JtU2VydmljZTxCMkJVc2VyPiB7XG4gIHByb3RlY3RlZCByZWFkb25seSBmZWF0dXJlQ29uZmlnU2VydmljZSA9IGluamVjdChGZWF0dXJlQ29uZmlnU2VydmljZSwge1xuICAgIG9wdGlvbmFsOiB0cnVlLFxuICB9KTtcblxuICBwcm90ZWN0ZWQgYnVpbGQoKSB7XG4gICAgY29uc3QgZm9ybSA9IG5ldyBVbnR5cGVkRm9ybUdyb3VwKHt9KTtcbiAgICBmb3JtLnNldENvbnRyb2woJ2N1c3RvbWVySWQnLCBuZXcgVW50eXBlZEZvcm1Db250cm9sKCcnKSk7XG4gICAgZm9ybS5zZXRDb250cm9sKCd0aXRsZUNvZGUnLCBuZXcgVW50eXBlZEZvcm1Db250cm9sKCcnKSk7XG4gICAgZm9ybS5zZXRDb250cm9sKFxuICAgICAgJ2ZpcnN0TmFtZScsXG4gICAgICBuZXcgVW50eXBlZEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLnJlcXVpcmVkKVxuICAgICk7XG4gICAgZm9ybS5zZXRDb250cm9sKFxuICAgICAgJ2xhc3ROYW1lJyxcbiAgICAgIG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMucmVxdWlyZWQpXG4gICAgKTtcbiAgICBmb3JtLnNldENvbnRyb2woXG4gICAgICAnZW1haWwnLFxuICAgICAgbmV3IFVudHlwZWRGb3JtQ29udHJvbCgnJywgW1xuICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgICBDdXN0b21Gb3JtVmFsaWRhdG9ycy5lbWFpbFZhbGlkYXRvcixcbiAgICAgIF0pXG4gICAgKTtcbiAgICBmb3JtLnNldENvbnRyb2woXG4gICAgICAnb3JnVW5pdCcsXG4gICAgICBuZXcgVW50eXBlZEZvcm1Hcm91cCh7XG4gICAgICAgIHVpZDogbmV3IFVudHlwZWRGb3JtQ29udHJvbCh1bmRlZmluZWQsIFZhbGlkYXRvcnMucmVxdWlyZWQpLFxuICAgICAgfSlcbiAgICApO1xuICAgIGZvcm0uc2V0Q29udHJvbCgncm9sZXMnLCBuZXcgVW50eXBlZEZvcm1BcnJheShbXSkpO1xuICAgIGZvcm0uc2V0Q29udHJvbCgnaXNBc3NpZ25lZFRvQXBwcm92ZXJzJywgbmV3IFVudHlwZWRGb3JtQ29udHJvbChmYWxzZSkpO1xuXG4gICAgZm9ybS5nZXQoJ3JvbGVzJyk/LnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHJvbGVzOiBzdHJpbmdbXSkgPT4ge1xuICAgICAgaWYgKHJvbGVzLmluY2x1ZGVzKEIyQlVzZXJSb2xlLkFQUFJPVkVSKSkge1xuICAgICAgICBmb3JtLmdldCgnaXNBc3NpZ25lZFRvQXBwcm92ZXJzJyk/LmVuYWJsZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9ybS5nZXQoJ2lzQXNzaWduZWRUb0FwcHJvdmVycycpPy5kaXNhYmxlKCk7XG4gICAgICAgIGZvcm0uZ2V0KCdpc0Fzc2lnbmVkVG9BcHByb3ZlcnMnKT8ucmVzZXQoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZm9ybSA9IGZvcm07XG4gIH1cblxuICBwcm90ZWN0ZWQgcGF0Y2hEYXRhKGl0ZW06IEIyQlVzZXIpIHtcbiAgICBzdXBlci5wYXRjaERhdGEoaXRlbSk7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGNvbnN0IHJvbGVzID0gdGhpcy5mb3JtPy5nZXQoJ3JvbGVzJykgYXMgVW50eXBlZEZvcm1BcnJheTtcbiAgICAgIGl0ZW0ucm9sZXM/LmZvckVhY2goKHJvbGUpID0+IHtcbiAgICAgICAgaWYgKCEocm9sZXMudmFsdWUgYXMgc3RyaW5nW10pLmluY2x1ZGVzKHJvbGUpKSB7XG4gICAgICAgICAgcm9sZXMucHVzaChuZXcgVW50eXBlZEZvcm1Db250cm9sKHJvbGUpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGlzLmZlYXR1cmVDb25maWdTZXJ2aWNlPy5pc0xldmVsKCc2LjcnKSkge1xuICAgICAgICB0aGlzLmZvcm0/LmdldCgnZW1haWwnKT8uc2V0VmFsdWUoaXRlbT8uZGlzcGxheVVpZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=