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
export class UserGroupFormService extends FormService {
    build() {
        const form = new UntypedFormGroup({});
        form.setControl('uid', new UntypedFormControl('', [
            Validators.required,
            CustomFormValidators.noSpecialCharacters,
        ]));
        form.setControl('name', new UntypedFormControl('', Validators.required));
        form.setControl('orgUnit', new UntypedFormGroup({
            uid: new UntypedFormControl(undefined, Validators.required),
        }));
        this.form = form;
    }
}
UserGroupFormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupFormService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
UserGroupFormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupFormService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupFormService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1ncm91cC1mb3JtLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdXNlci1ncm91cC9mb3JtL3VzZXItZ3JvdXAtZm9ybS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFDTCxrQkFBa0IsRUFDbEIsZ0JBQWdCLEVBQ2hCLFVBQVUsR0FDWCxNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7QUFLN0QsTUFBTSxPQUFPLG9CQUFxQixTQUFRLFdBQXNCO0lBQ3BELEtBQUs7UUFDYixNQUFNLElBQUksR0FBRyxJQUFJLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLENBQ2IsS0FBSyxFQUNMLElBQUksa0JBQWtCLENBQUMsRUFBRSxFQUFFO1lBQ3pCLFVBQVUsQ0FBQyxRQUFRO1lBQ25CLG9CQUFvQixDQUFDLG1CQUFtQjtTQUN6QyxDQUFDLENBQ0gsQ0FBQztRQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksa0JBQWtCLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxVQUFVLENBQ2IsU0FBUyxFQUNULElBQUksZ0JBQWdCLENBQUM7WUFDbkIsR0FBRyxFQUFFLElBQUksa0JBQWtCLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7U0FDNUQsQ0FBQyxDQUNILENBQUM7UUFDRixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDOztpSEFsQlUsb0JBQW9CO3FIQUFwQixvQkFBb0IsY0FGbkIsTUFBTTsyRkFFUCxvQkFBb0I7a0JBSGhDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgVW50eXBlZEZvcm1Db250cm9sLFxuICBVbnR5cGVkRm9ybUdyb3VwLFxuICBWYWxpZGF0b3JzLFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBVc2VyR3JvdXAgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlJztcbmltcG9ydCB7IEN1c3RvbUZvcm1WYWxpZGF0b3JzIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IEZvcm1TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2Zvcm0vZm9ybS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJHcm91cEZvcm1TZXJ2aWNlIGV4dGVuZHMgRm9ybVNlcnZpY2U8VXNlckdyb3VwPiB7XG4gIHByb3RlY3RlZCBidWlsZCgpIHtcbiAgICBjb25zdCBmb3JtID0gbmV3IFVudHlwZWRGb3JtR3JvdXAoe30pO1xuICAgIGZvcm0uc2V0Q29udHJvbChcbiAgICAgICd1aWQnLFxuICAgICAgbmV3IFVudHlwZWRGb3JtQ29udHJvbCgnJywgW1xuICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgICBDdXN0b21Gb3JtVmFsaWRhdG9ycy5ub1NwZWNpYWxDaGFyYWN0ZXJzLFxuICAgICAgXSlcbiAgICApO1xuICAgIGZvcm0uc2V0Q29udHJvbCgnbmFtZScsIG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMucmVxdWlyZWQpKTtcbiAgICBmb3JtLnNldENvbnRyb2woXG4gICAgICAnb3JnVW5pdCcsXG4gICAgICBuZXcgVW50eXBlZEZvcm1Hcm91cCh7XG4gICAgICAgIHVpZDogbmV3IFVudHlwZWRGb3JtQ29udHJvbCh1bmRlZmluZWQsIFZhbGlkYXRvcnMucmVxdWlyZWQpLFxuICAgICAgfSlcbiAgICApO1xuICAgIHRoaXMuZm9ybSA9IGZvcm07XG4gIH1cbn1cbiJdfQ==