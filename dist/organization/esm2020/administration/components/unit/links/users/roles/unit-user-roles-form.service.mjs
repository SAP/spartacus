/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { FormService } from '../../../../shared/form/form.service';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/organization/administration/core";
export class UnitUserRolesFormService extends FormService {
    constructor(userService) {
        super();
        this.userService = userService;
        this.availableRoles = this.userService.getAllRoles();
        this.availableRights = this.userService.getAllRights();
    }
    getForm(item) {
        // if form already exist, while switching between users
        // it didn't patchData again, so used force rebuild
        this.form = null;
        return super.getForm(item);
    }
    build() {
        const form = new UntypedFormGroup({});
        this.availableRoles.forEach((role) => form.addControl(role, new UntypedFormControl()));
        this.availableRights.forEach((right) => form.addControl(right, new UntypedFormControl()));
        this.form = form;
    }
    patchData(item) {
        super.patchData(item);
        if (item) {
            item.roles?.forEach((role) => {
                this.form?.get(role)?.setValue(true);
            });
        }
    }
}
UnitUserRolesFormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserRolesFormService, deps: [{ token: i1.B2BUserService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitUserRolesFormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserRolesFormService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserRolesFormService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.B2BUserService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC11c2VyLXJvbGVzLWZvcm0uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91bml0L2xpbmtzL3VzZXJzL3JvbGVzL3VuaXQtdXNlci1yb2xlcy1mb3JtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHdEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNDQUFzQyxDQUFDOzs7QUFLbkUsTUFBTSxPQUFPLHdCQUF5QixTQUFRLFdBQW9CO0lBSWhFLFlBQXNCLFdBQTJCO1FBQy9DLEtBQUssRUFBRSxDQUFDO1FBRFksZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBSGpELG1CQUFjLEdBQWtCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0Qsb0JBQWUsR0FBbUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUlsRSxDQUFDO0lBRUQsT0FBTyxDQUFDLElBQWM7UUFDcEIsdURBQXVEO1FBQ3ZELG1EQUFtRDtRQUNuRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVTLEtBQUs7UUFDYixNQUFNLElBQUksR0FBRyxJQUFJLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBaUIsRUFBRSxFQUFFLENBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksa0JBQWtCLEVBQUUsQ0FBQyxDQUNoRCxDQUFDO1FBQ0YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFtQixFQUFFLEVBQUUsQ0FDbkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxrQkFBa0IsRUFBRSxDQUFDLENBQ2pELENBQUM7UUFDRixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRVMsU0FBUyxDQUFDLElBQWE7UUFDL0IsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixJQUFJLElBQUksRUFBRTtZQUNSLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7cUhBakNVLHdCQUF3Qjt5SEFBeEIsd0JBQXdCLGNBRnZCLE1BQU07MkZBRVAsd0JBQXdCO2tCQUhwQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVudHlwZWRGb3JtQ29udHJvbCwgVW50eXBlZEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEIyQlVzZXIsIEIyQlVzZXJSb2xlLCBCMkJVc2VyUmlnaHQgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQjJCVXNlclNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlJztcbmltcG9ydCB7IEZvcm1TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2Zvcm0vZm9ybS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFVuaXRVc2VyUm9sZXNGb3JtU2VydmljZSBleHRlbmRzIEZvcm1TZXJ2aWNlPEIyQlVzZXI+IHtcbiAgYXZhaWxhYmxlUm9sZXM6IEIyQlVzZXJSb2xlW10gPSB0aGlzLnVzZXJTZXJ2aWNlLmdldEFsbFJvbGVzKCk7XG4gIGF2YWlsYWJsZVJpZ2h0czogQjJCVXNlclJpZ2h0W10gPSB0aGlzLnVzZXJTZXJ2aWNlLmdldEFsbFJpZ2h0cygpO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCB1c2VyU2VydmljZTogQjJCVXNlclNlcnZpY2UpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgZ2V0Rm9ybShpdGVtPzogQjJCVXNlcik6IFVudHlwZWRGb3JtR3JvdXAgfCBudWxsIHtcbiAgICAvLyBpZiBmb3JtIGFscmVhZHkgZXhpc3QsIHdoaWxlIHN3aXRjaGluZyBiZXR3ZWVuIHVzZXJzXG4gICAgLy8gaXQgZGlkbid0IHBhdGNoRGF0YSBhZ2Fpbiwgc28gdXNlZCBmb3JjZSByZWJ1aWxkXG4gICAgdGhpcy5mb3JtID0gbnVsbDtcbiAgICByZXR1cm4gc3VwZXIuZ2V0Rm9ybShpdGVtKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBidWlsZCgpIHtcbiAgICBjb25zdCBmb3JtID0gbmV3IFVudHlwZWRGb3JtR3JvdXAoe30pO1xuICAgIHRoaXMuYXZhaWxhYmxlUm9sZXMuZm9yRWFjaCgocm9sZTogQjJCVXNlclJvbGUpID0+XG4gICAgICBmb3JtLmFkZENvbnRyb2wocm9sZSwgbmV3IFVudHlwZWRGb3JtQ29udHJvbCgpKVxuICAgICk7XG4gICAgdGhpcy5hdmFpbGFibGVSaWdodHMuZm9yRWFjaCgocmlnaHQ6IEIyQlVzZXJSaWdodCkgPT5cbiAgICAgIGZvcm0uYWRkQ29udHJvbChyaWdodCwgbmV3IFVudHlwZWRGb3JtQ29udHJvbCgpKVxuICAgICk7XG4gICAgdGhpcy5mb3JtID0gZm9ybTtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXRjaERhdGEoaXRlbTogQjJCVXNlcikge1xuICAgIHN1cGVyLnBhdGNoRGF0YShpdGVtKTtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgaXRlbS5yb2xlcz8uZm9yRWFjaCgocm9sZSkgPT4ge1xuICAgICAgICB0aGlzLmZvcm0/LmdldChyb2xlKT8uc2V0VmFsdWUodHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==