/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators, } from '@angular/forms';
import { CustomFormValidators } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { FormService } from '../../shared/form/form.service';
import * as i0 from "@angular/core";
export var PermissionType;
(function (PermissionType) {
    PermissionType["ORDER"] = "B2BOrderThresholdPermission";
    PermissionType["TIME_SPAN"] = "B2BOrderThresholdTimespanPermission";
    PermissionType["EXCEEDED"] = "B2BBudgetExceededPermission";
})(PermissionType || (PermissionType = {}));
export class PermissionFormService extends FormService {
    constructor() {
        super(...arguments);
        this.subscription = new Subscription();
    }
    /**
     * @override
     * Builds a generic sub form for permissions and amends the form
     * based on the for approval permission type.
     */
    build() {
        const form = new UntypedFormGroup({});
        form.setControl('code', new UntypedFormControl('', [
            Validators.required,
            CustomFormValidators.noSpecialCharacters,
        ]));
        form.setControl('orgUnit', new UntypedFormGroup({
            uid: new UntypedFormControl(undefined, Validators.required),
        }));
        form.setControl('orderApprovalPermissionType', new UntypedFormGroup({
            code: new UntypedFormControl(undefined, Validators.required),
        }));
        // subscribe to permission type changes and amend accordingly.
        this.subscription.add(form
            .get('orderApprovalPermissionType')
            ?.get('code')
            ?.valueChanges.pipe(distinctUntilChanged(), filter((code) => !!code))
            .subscribe((code) => this.amend(form, code)));
        this.form = form;
    }
    /**
     * @override
     * The form is using  `B2BBudgetExceededPermission` by default.
     */
    get defaultValue() {
        return {
            orderApprovalPermissionType: {
                code: PermissionType.EXCEEDED,
            },
        };
    }
    /**
     * Amends the form structure based on the `PermissionType`.
     */
    amend(form, code) {
        if (code === PermissionType.EXCEEDED) {
            form.removeControl('periodRange');
            form.removeControl('currency');
            form.removeControl('threshold');
        }
        if (code === PermissionType.TIME_SPAN || code === PermissionType.ORDER) {
            if (!form.get('currency')) {
                form.setControl('currency', new UntypedFormGroup({
                    isocode: new UntypedFormControl(undefined, Validators.required),
                }));
            }
            if (!form.get('threshold')) {
                form.setControl('threshold', new UntypedFormControl('', Validators.required));
            }
        }
        if (code === PermissionType.ORDER) {
            form.removeControl('periodRange');
        }
        if (code === PermissionType.TIME_SPAN) {
            if (!form.get('periodRange')) {
                form.setControl('periodRange', new UntypedFormControl('', Validators.required));
            }
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    patchData(item) {
        super.patchData(item);
        if (item?.code !== undefined) {
            this.form?.get('orderApprovalPermissionType')?.disable();
        }
    }
}
PermissionFormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionFormService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
PermissionFormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionFormService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionFormService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbi1mb3JtLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvcGVybWlzc2lvbi9mb3JtL3Blcm1pc3Npb24tZm9ybS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFDTCxrQkFBa0IsRUFDbEIsZ0JBQWdCLEVBQ2hCLFVBQVUsR0FDWCxNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7QUFFN0QsTUFBTSxDQUFOLElBQVksY0FJWDtBQUpELFdBQVksY0FBYztJQUN4Qix1REFBcUMsQ0FBQTtJQUNyQyxtRUFBaUQsQ0FBQTtJQUNqRCwwREFBd0MsQ0FBQTtBQUMxQyxDQUFDLEVBSlcsY0FBYyxLQUFkLGNBQWMsUUFJekI7QUFJRCxNQUFNLE9BQU8scUJBQ1gsU0FBUSxXQUF1QjtJQUpqQzs7UUFPWSxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7S0E0RzdDO0lBMUdDOzs7O09BSUc7SUFDTyxLQUFLO1FBQ2IsTUFBTSxJQUFJLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsVUFBVSxDQUNiLE1BQU0sRUFDTixJQUFJLGtCQUFrQixDQUFDLEVBQUUsRUFBRTtZQUN6QixVQUFVLENBQUMsUUFBUTtZ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SUFBaUI7UUFDbkMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixJQUFJLElBQUksRUFBRSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQzVCLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLDZCQUE2QixDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUM7U0FDMUQ7SUFDSCxDQUFDOztrSEEvR1UscUJBQXFCO3NIQUFyQixxQkFBcUIsY0FGcEIsTUFBTTsyRkFFUCxxQkFBcUI7a0JBSGpDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBVbnR5cGVkRm9ybUNvbnRyb2wsXG4gIFVudHlwZWRGb3JtR3JvdXAsXG4gIFZhbGlkYXRvcnMsXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFBlcm1pc3Npb24gfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlJztcbmltcG9ydCB7IEN1c3RvbUZvcm1WYWxpZGF0b3JzIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEZvcm1TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2Zvcm0vZm9ybS5zZXJ2aWNlJztcblxuZXhwb3J0IGVudW0gUGVybWlzc2lvblR5cGUge1xuICBPUkRFUiA9ICdCMkJPcmRlclRocmVzaG9sZFBlcm1pc3Npb24nLFxuICBUSU1FX1NQQU4gPSAnQjJCT3JkZXJUaHJlc2hvbGRUaW1lc3BhblBlcm1pc3Npb24nLFxuICBFWENFRURFRCA9ICdCMkJCdWRnZXRFeGNlZWRlZFBlcm1pc3Npb24nLFxufVxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFBlcm1pc3Npb25Gb3JtU2VydmljZVxuICBleHRlbmRzIEZvcm1TZXJ2aWNlPFBlcm1pc3Npb24+XG4gIGltcGxlbWVudHMgT25EZXN0cm95XG57XG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKiBCdWlsZHMgYSBnZW5lcmljIHN1YiBmb3JtIGZvciBwZXJtaXNzaW9ucyBhbmQgYW1lbmRzIHRoZSBmb3JtXG4gICAqIGJhc2VkIG9uIHRoZSBmb3IgYXBwcm92YWwgcGVybWlzc2lvbiB0eXBlLlxuICAgKi9cbiAgcHJvdGVjdGVkIGJ1aWxkKCkge1xuICAgIGNvbnN0IGZvcm0gPSBuZXcgVW50eXBlZEZvcm1Hcm91cCh7fSk7XG4gICAgZm9ybS5zZXRDb250cm9sKFxuICAgICAgJ2NvZGUnLFxuICAgICAgbmV3IFVudHlwZWRGb3JtQ29udHJvbCgnJywgW1xuICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgICBDdXN0b21Gb3JtVmFsaWRhdG9ycy5ub1NwZWNpYWxDaGFyYWN0ZXJzLFxuICAgICAgXSlcbiAgICApO1xuICAgIGZvcm0uc2V0Q29udHJvbChcbiAgICAgICdvcmdVbml0JyxcbiAgICAgIG5ldyBVbnR5cGVkRm9ybUdyb3VwKHtcbiAgICAgICAgdWlkOiBuZXcgVW50eXBlZEZvcm1Db250cm9sKHVuZGVmaW5lZCwgVmFsaWRhdG9ycy5yZXF1aXJlZCksXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBmb3JtLnNldENvbnRyb2woXG4gICAgICAnb3JkZXJBcHByb3ZhbFBlcm1pc3Npb25UeXBlJyxcbiAgICAgIG5ldyBVbnR5cGVkRm9ybUdyb3VwKHtcbiAgICAgICAgY29kZTogbmV3IFVudHlwZWRGb3JtQ29udHJvbCh1bmRlZmluZWQsIFZhbGlkYXRvcnMucmVxdWlyZWQpLFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgLy8gc3Vic2NyaWJlIHRvIHBlcm1pc3Npb24gdHlwZSBjaGFuZ2VzIGFuZCBhbWVuZCBhY2NvcmRpbmdseS5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXG4gICAgICBmb3JtXG4gICAgICAgIC5nZXQoJ29yZGVyQXBwcm92YWxQZXJtaXNzaW9uVHlwZScpXG4gICAgICAgID8uZ2V0KCdjb2RlJylcbiAgICAgICAgPy52YWx1ZUNoYW5nZXMucGlwZShcbiAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICAgIGZpbHRlcigoY29kZSkgPT4gISFjb2RlKVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKGNvZGU6IFBlcm1pc3Npb25UeXBlKSA9PiB0aGlzLmFtZW5kKGZvcm0sIGNvZGUpKVxuICAgICk7XG5cbiAgICB0aGlzLmZvcm0gPSBmb3JtO1xuICB9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKiBUaGUgZm9ybSBpcyB1c2luZyAgYEIyQkJ1ZGdldEV4Y2VlZGVkUGVybWlzc2lvbmAgYnkgZGVmYXVsdC5cbiAgICovXG4gIGdldCBkZWZhdWx0VmFsdWUoKTogUGVybWlzc2lvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9yZGVyQXBwcm92YWxQZXJtaXNzaW9uVHlwZToge1xuICAgICAgICBjb2RlOiBQZXJtaXNzaW9uVHlwZS5FWENFRURFRCxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbWVuZHMgdGhlIGZvcm0gc3RydWN0dXJlIGJhc2VkIG9uIHRoZSBgUGVybWlzc2lvblR5cGVgLlxuICAgKi9cbiAgcHJvdGVjdGVkIGFtZW5kKGZvcm06IFVudHlwZWRGb3JtR3JvdXAsIGNvZGU6IFBlcm1pc3Npb25UeXBlKSB7XG4gICAgaWYgKGNvZGUgPT09IFBlcm1pc3Npb25UeXBlLkVYQ0VFREVEKSB7XG4gICAgICBmb3JtLnJlbW92ZUNvbnRyb2woJ3BlcmlvZFJhbmdlJyk7XG4gICAgICBmb3JtLnJlbW92ZUNvbnRyb2woJ2N1cnJlbmN5Jyk7XG4gICAgICBmb3JtLnJlbW92ZUNvbnRyb2woJ3RocmVzaG9sZCcpO1xuICAgIH1cblxuICAgIGlmIChjb2RlID09PSBQZXJtaXNzaW9uVHlwZS5USU1FX1NQQU4gfHwgY29kZSA9PT0gUGVybWlzc2lvblR5cGUuT1JERVIpIHtcbiAgICAgIGlmICghZm9ybS5nZXQoJ2N1cnJlbmN5JykpIHtcbiAgICAgICAgZm9ybS5zZXRDb250cm9sKFxuICAgICAgICAgICdjdXJyZW5jeScsXG4gICAgICAgICAgbmV3IFVudHlwZWRGb3JtR3JvdXAoe1xuICAgICAgICAgICAgaXNvY29kZTogbmV3IFVudHlwZWRGb3JtQ29udHJvbCh1bmRlZmluZWQsIFZhbGlkYXRvcnMucmVxdWlyZWQpLFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoIWZvcm0uZ2V0KCd0aHJlc2hvbGQnKSkge1xuICAgICAgICBmb3JtLnNldENvbnRyb2woXG4gICAgICAgICAgJ3RocmVzaG9sZCcsXG4gICAgICAgICAgbmV3IFVudHlwZWRGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5yZXF1aXJlZClcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZSA9PT0gUGVybWlzc2lvblR5cGUuT1JERVIpIHtcbiAgICAgIGZvcm0ucmVtb3ZlQ29udHJvbCgncGVyaW9kUmFuZ2UnKTtcbiAgICB9XG5cbiAgICBpZiAoY29kZSA9PT0gUGVybWlzc2lvblR5cGUuVElNRV9TUEFOKSB7XG4gICAgICBpZiAoIWZvcm0uZ2V0KCdwZXJpb2RSYW5nZScpKSB7XG4gICAgICAgIGZvcm0uc2V0Q29udHJvbChcbiAgICAgICAgICAncGVyaW9kUmFuZ2UnLFxuICAgICAgICAgIG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMucmVxdWlyZWQpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXRjaERhdGEoaXRlbT86IFBlcm1pc3Npb24pIHtcbiAgICBzdXBlci5wYXRjaERhdGEoaXRlbSk7XG4gICAgaWYgKGl0ZW0/LmNvZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5mb3JtPy5nZXQoJ29yZGVyQXBwcm92YWxQZXJtaXNzaW9uVHlwZScpPy5kaXNhYmxlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=