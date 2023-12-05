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
import * as i1 from "@spartacus/storefront";
export class BudgetFormService extends FormService {
    constructor(datePickerService) {
        super();
        this.datePickerService = datePickerService;
    }
    build() {
        const form = new UntypedFormGroup({});
        form.setControl('code', new UntypedFormControl('', [
            Validators.required,
            CustomFormValidators.noSpecialCharacters,
        ]));
        form.setControl('name', new UntypedFormControl('', Validators.required));
        form.setControl('startDate', new UntypedFormControl('', [
            Validators.required,
            CustomFormValidators.patternValidation((date) => this.datePickerService.isValidFormat(date)),
        ]));
        form.setControl('endDate', new UntypedFormControl('', [
            Validators.required,
            CustomFormValidators.patternValidation((date) => this.datePickerService.isValidFormat(date)),
        ]));
        form.setControl('budget', new UntypedFormControl('', [
            Validators.required,
            CustomFormValidators.mustBePositive,
        ]));
        form.setControl('currency', new UntypedFormGroup({
            isocode: new UntypedFormControl(undefined, Validators.required),
        }));
        form.setControl('orgUnit', new UntypedFormGroup({
            uid: new UntypedFormControl(undefined, Validators.required),
        }));
        form.setValidators(CustomFormValidators.dateRange('startDate', 'endDate', (date) => this.datePickerService.getDate(date)));
        this.form = form;
    }
}
BudgetFormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetFormService, deps: [{ token: i1.DatePickerService }], target: i0.ɵɵFactoryTarget.Injectable });
BudgetFormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetFormService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetFormService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.DatePickerService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVkZ2V0LWZvcm0uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy9idWRnZXQvZm9ybS9idWRnZXQtZm9ybS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFDTCxrQkFBa0IsRUFDbEIsZ0JBQWdCLEVBRWhCLFVBQVUsR0FDWCxNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFBRSxvQkFBb0IsRUFBcUIsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7OztBQUs3RCxNQUFNLE9BQU8saUJBQWtCLFNBQVEsV0FBbUI7SUFDeEQsWUFBc0IsaUJBQW9DO1FBQ3hELEtBQUssRUFBRSxDQUFDO1FBRFksc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUUxRCxDQUFDO0lBRVMsS0FBSztRQUNiLE1BQU0sSUFBSSxHQUFHLElBQUksZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FDYixNQUFNLEVBQ04sSUFBSSxrQkFBa0IsQ0FBQyxFQUFFLEVBQUU7WUFDekIsVUFBVSxDQUFDLFFBQVE7WUFDbkIsb0JBQW9CLENBQUMsbUJBQW1CO1NBQ3pDLENBQUMsQ0FDSCxDQUFDO1FBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLFVBQVUsQ0FDYixXQUFXLEVBQ1gsSUFBSSxrQkFBa0IsQ0FBQyxFQUFFLEVBQUU7WUFDekIsVUFBVSxDQUFDLFFBQVE7WUFDbkIsb0JBQW9CLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUM5QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUMzQztTQUNGLENBQUMsQ0FDSCxDQUFDO1FBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FDYixTQUFTLEVBQ1QsSUFBSSxrQkFBa0IsQ0FBQyxFQUFFLEVBQUU7WUFDekIsVUFBVSxDQUFDLFFBQVE7WUFDbkIsb0JBQW9CLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUM5QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUMzQztTQUNGLENBQUMsQ0FDSCxDQUFDO1FBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FDYixRQUFRLEVBQ1IsSUFBSSxrQkFBa0IsQ0FBQyxFQUFFLEVBQUU7WUFDekIsVUFBVSxDQUFDLFFBQVE7WUFDbkIsb0JBQW9CLENBQUMsY0FBYztTQUNwQyxDQUFDLENBQ0gsQ0FBQztRQUVGLElBQUksQ0FBQyxVQUFVLENBQ2IsVUFBVSxFQUNWLElBQUksZ0JBQWdCLENBQUM7WUFDbkIsT0FBTyxFQUFFLElBQUksa0JBQWtCLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7U0FDaEUsQ0FBQyxDQUNILENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxDQUNiLFNBQVMsRUFDVCxJQUFJLGdCQUFnQixDQUFDO1lBQ25CLEdBQUcsRUFBRSxJQUFJLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO1NBQzVELENBQUMsQ0FDSCxDQUFDO1FBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FDaEIsb0JBQW9CLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUM5RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUN0QixDQUNqQixDQUFDO1FBQ0YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQzs7OEdBM0RVLGlCQUFpQjtrSEFBakIsaUJBQWlCLGNBRmhCLE1BQU07MkZBRVAsaUJBQWlCO2tCQUg3QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFVudHlwZWRGb3JtQ29udHJvbCxcbiAgVW50eXBlZEZvcm1Hcm91cCxcbiAgVmFsaWRhdG9yRm4sXG4gIFZhbGlkYXRvcnMsXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJ1ZGdldCB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHsgQ3VzdG9tRm9ybVZhbGlkYXRvcnMsIERhdGVQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IEZvcm1TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2Zvcm0vZm9ybS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEJ1ZGdldEZvcm1TZXJ2aWNlIGV4dGVuZHMgRm9ybVNlcnZpY2U8QnVkZ2V0PiB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBkYXRlUGlja2VyU2VydmljZTogRGF0ZVBpY2tlclNlcnZpY2UpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGJ1aWxkKCkge1xuICAgIGNvbnN0IGZvcm0gPSBuZXcgVW50eXBlZEZvcm1Hcm91cCh7fSk7XG4gICAgZm9ybS5zZXRDb250cm9sKFxuICAgICAgJ2NvZGUnLFxuICAgICAgbmV3IFVudHlwZWRGb3JtQ29udHJvbCgnJywgW1xuICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgICBDdXN0b21Gb3JtVmFsaWRhdG9ycy5ub1NwZWNpYWxDaGFyYWN0ZXJzLFxuICAgICAgXSlcbiAgICApO1xuICAgIGZvcm0uc2V0Q29udHJvbCgnbmFtZScsIG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMucmVxdWlyZWQpKTtcbiAgICBmb3JtLnNldENvbnRyb2woXG4gICAgICAnc3RhcnREYXRlJyxcbiAgICAgIG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woJycsIFtcbiAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcbiAgICAgICAgQ3VzdG9tRm9ybVZhbGlkYXRvcnMucGF0dGVyblZhbGlkYXRpb24oKGRhdGUpID0+XG4gICAgICAgICAgdGhpcy5kYXRlUGlja2VyU2VydmljZS5pc1ZhbGlkRm9ybWF0KGRhdGUpXG4gICAgICAgICksXG4gICAgICBdKVxuICAgICk7XG4gICAgZm9ybS5zZXRDb250cm9sKFxuICAgICAgJ2VuZERhdGUnLFxuICAgICAgbmV3IFVudHlwZWRGb3JtQ29udHJvbCgnJywgW1xuICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgICBDdXN0b21Gb3JtVmFsaWRhdG9ycy5wYXR0ZXJuVmFsaWRhdGlvbigoZGF0ZSkgPT5cbiAgICAgICAgICB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmlzVmFsaWRGb3JtYXQoZGF0ZSlcbiAgICAgICAgKSxcbiAgICAgIF0pXG4gICAgKTtcbiAgICBmb3JtLnNldENvbnRyb2woXG4gICAgICAnYnVkZ2V0JyxcbiAgICAgIG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woJycsIFtcbiAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcbiAgICAgICAgQ3VzdG9tRm9ybVZhbGlkYXRvcnMubXVzdEJlUG9zaXRpdmUsXG4gICAgICBdKVxuICAgICk7XG5cbiAgICBmb3JtLnNldENvbnRyb2woXG4gICAgICAnY3VycmVuY3knLFxuICAgICAgbmV3IFVudHlwZWRGb3JtR3JvdXAoe1xuICAgICAgICBpc29jb2RlOiBuZXcgVW50eXBlZEZvcm1Db250cm9sKHVuZGVmaW5lZCwgVmFsaWRhdG9ycy5yZXF1aXJlZCksXG4gICAgICB9KVxuICAgICk7XG4gICAgZm9ybS5zZXRDb250cm9sKFxuICAgICAgJ29yZ1VuaXQnLFxuICAgICAgbmV3IFVudHlwZWRGb3JtR3JvdXAoe1xuICAgICAgICB1aWQ6IG5ldyBVbnR5cGVkRm9ybUNvbnRyb2wodW5kZWZpbmVkLCBWYWxpZGF0b3JzLnJlcXVpcmVkKSxcbiAgICAgIH0pXG4gICAgKTtcbiAgICBmb3JtLnNldFZhbGlkYXRvcnMoXG4gICAgICBDdXN0b21Gb3JtVmFsaWRhdG9ycy5kYXRlUmFuZ2UoJ3N0YXJ0RGF0ZScsICdlbmREYXRlJywgKGRhdGUpID0+XG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZ2V0RGF0ZShkYXRlKVxuICAgICAgKSBhcyBWYWxpZGF0b3JGblxuICAgICk7XG4gICAgdGhpcy5mb3JtID0gZm9ybTtcbiAgfVxufVxuIl19