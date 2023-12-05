/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators, } from '@angular/forms';
import { CustomFormValidators } from '@spartacus/storefront';
import { FormService } from '../../shared/form/form.service';
import * as i0 from "@angular/core";
export class UserChangePasswordFormService extends FormService {
    /**
     * @override
     * Adds the password and confirmPassword field. Also adds the customerId field,
     * so that the customerId can be used during persistent.
     */
    build() {
        const form = new UntypedFormGroup({});
        form.setControl('customerId', new UntypedFormControl(''));
        form.setControl('password', new UntypedFormControl('', [
            Validators.required,
            CustomFormValidators.passwordValidator,
        ]));
        form.setControl('confirmPassword', new UntypedFormControl('', [
            Validators.required,
            CustomFormValidators.passwordValidator,
        ]));
        form.setValidators(CustomFormValidators.passwordsMustMatch('password', 'confirmPassword'));
        this.form = form;
    }
    getForm(item) {
        // we need do cleanup, to avoid have filled form after next open of that
        this.form = null;
        return super.getForm(item);
    }
}
UserChangePasswordFormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserChangePasswordFormService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
UserChangePasswordFormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserChangePasswordFormService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserChangePasswordFormService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1jaGFuZ2UtcGFzc3dvcmQtZm9ybS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VzZXIvY2hhbmdlLXBhc3N3b3JkLWZvcm0vdXNlci1jaGFuZ2UtcGFzc3dvcmQtZm9ybS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFDTCxrQkFBa0IsRUFDbEIsZ0JBQWdCLEVBQ2hCLFVBQVUsR0FDWCxNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7QUFLN0QsTUFBTSxPQUFPLDZCQUE4QixTQUFRLFdBQWdCO0lBQ2pFOzs7O09BSUc7SUFDTyxLQUFLO1FBQ2IsTUFBTSxJQUFJLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxJQUFJLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFVBQVUsQ0FDYixVQUFVLEVBQ1YsSUFBSSxrQkFBa0IsQ0FBQyxFQUFFLEVBQUU7WUFDekIsVUFBVSxDQUFDLFFBQVE7WUFDbkIsb0JBQW9CLENBQUMsaUJBQWlCO1NBQ3ZDLENBQUMsQ0FDSCxDQUFDO1FBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FDYixpQkFBaUIsRUFDakIsSUFBSSxrQkFBa0IsQ0FBQyxFQUFFLEVBQUU7WUFDekIsVUFBVSxDQUFDLFFBQVE7WUFDbkIsb0JBQW9CLENBQUMsaUJBQWlCO1NBQ3ZDLENBQUMsQ0FDSCxDQUFDO1FBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FDaEIsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLGlCQUFpQixDQUFDLENBQ3ZFLENBQUM7UUFDRixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRUQsT0FBTyxDQUFDLElBQVc7UUFDakIsd0VBQXdFO1FBQ3hFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDOzswSEFqQ1UsNkJBQTZCOzhIQUE3Qiw2QkFBNkIsY0FGNUIsTUFBTTsyRkFFUCw2QkFBNkI7a0JBSHpDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgVW50eXBlZEZvcm1Db250cm9sLFxuICBVbnR5cGVkRm9ybUdyb3VwLFxuICBWYWxpZGF0b3JzLFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEN1c3RvbUZvcm1WYWxpZGF0b3JzIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IEZvcm1TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2Zvcm0vZm9ybS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJDaGFuZ2VQYXNzd29yZEZvcm1TZXJ2aWNlIGV4dGVuZHMgRm9ybVNlcnZpY2U8YW55PiB7XG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICogQWRkcyB0aGUgcGFzc3dvcmQgYW5kIGNvbmZpcm1QYXNzd29yZCBmaWVsZC4gQWxzbyBhZGRzIHRoZSBjdXN0b21lcklkIGZpZWxkLFxuICAgKiBzbyB0aGF0IHRoZSBjdXN0b21lcklkIGNhbiBiZSB1c2VkIGR1cmluZyBwZXJzaXN0ZW50LlxuICAgKi9cbiAgcHJvdGVjdGVkIGJ1aWxkKCkge1xuICAgIGNvbnN0IGZvcm0gPSBuZXcgVW50eXBlZEZvcm1Hcm91cCh7fSk7XG4gICAgZm9ybS5zZXRDb250cm9sKCdjdXN0b21lcklkJywgbmV3IFVudHlwZWRGb3JtQ29udHJvbCgnJykpO1xuICAgIGZvcm0uc2V0Q29udHJvbChcbiAgICAgICdwYXNzd29yZCcsXG4gICAgICBuZXcgVW50eXBlZEZvcm1Db250cm9sKCcnLCBbXG4gICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgICAgIEN1c3RvbUZvcm1WYWxpZGF0b3JzLnBhc3N3b3JkVmFsaWRhdG9yLFxuICAgICAgXSlcbiAgICApO1xuICAgIGZvcm0uc2V0Q29udHJvbChcbiAgICAgICdjb25maXJtUGFzc3dvcmQnLFxuICAgICAgbmV3IFVudHlwZWRGb3JtQ29udHJvbCgnJywgW1xuICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgICBDdXN0b21Gb3JtVmFsaWRhdG9ycy5wYXNzd29yZFZhbGlkYXRvcixcbiAgICAgIF0pXG4gICAgKTtcbiAgICBmb3JtLnNldFZhbGlkYXRvcnMoXG4gICAgICBDdXN0b21Gb3JtVmFsaWRhdG9ycy5wYXNzd29yZHNNdXN0TWF0Y2goJ3Bhc3N3b3JkJywgJ2NvbmZpcm1QYXNzd29yZCcpXG4gICAgKTtcbiAgICB0aGlzLmZvcm0gPSBmb3JtO1xuICB9XG5cbiAgZ2V0Rm9ybShpdGVtPzogVXNlcik6IFVudHlwZWRGb3JtR3JvdXAgfCBudWxsIHtcbiAgICAvLyB3ZSBuZWVkIGRvIGNsZWFudXAsIHRvIGF2b2lkIGhhdmUgZmlsbGVkIGZvcm0gYWZ0ZXIgbmV4dCBvcGVuIG9mIHRoYXRcbiAgICB0aGlzLmZvcm0gPSBudWxsO1xuICAgIHJldHVybiBzdXBlci5nZXRGb3JtKGl0ZW0pO1xuICB9XG59XG4iXX0=