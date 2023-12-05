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
export class CostCenterFormService extends FormService {
    build() {
        const form = new UntypedFormGroup({});
        form.setControl('code', new UntypedFormControl('', [
            Validators.required,
            CustomFormValidators.noSpecialCharacters,
        ]));
        form.setControl('name', new UntypedFormControl('', Validators.required));
        form.setControl('currency', new UntypedFormGroup({
            isocode: new UntypedFormControl(undefined, Validators.required),
        }));
        form.setControl('unit', new UntypedFormGroup({
            uid: new UntypedFormControl(undefined, Validators.required),
        }));
        this.form = form;
    }
}
CostCenterFormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterFormService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
CostCenterFormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterFormService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterFormService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29zdC1jZW50ZXItZm9ybS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL2Nvc3QtY2VudGVyL2Zvcm0vY29zdC1jZW50ZXItZm9ybS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFDTCxrQkFBa0IsRUFDbEIsZ0JBQWdCLEVBQ2hCLFVBQVUsR0FDWCxNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7QUFLN0QsTUFBTSxPQUFPLHFCQUFzQixTQUFRLFdBQXVCO0lBQ3RELEtBQUs7UUFDYixNQUFNLElBQUksR0FBRyxJQUFJLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLENBQ2IsTUFBTSxFQUNOLElBQUksa0JBQWtCLENBQUMsRUFBRSxFQUFFO1lBQ3pCLFVBQVUsQ0FBQyxRQUFRO1lBQ25CLG9CQUFvQixDQUFDLG1CQUFtQjtTQUN6QyxDQUFDLENBQ0gsQ0FBQztRQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksa0JBQWtCLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBRXpFLElBQUksQ0FBQyxVQUFVLENBQ2IsVUFBVSxFQUNWLElBQUksZ0JBQWdCLENBQUM7WUFDbkIsT0FBTyxFQUFFLElBQUksa0JBQWtCLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7U0FDaEUsQ0FBQyxDQUNILENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxDQUNiLE1BQU0sRUFDTixJQUFJLGdCQUFnQixDQUFDO1lBQ25CLEdBQUcsRUFBRSxJQUFJLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO1NBQzVELENBQUMsQ0FDSCxDQUFDO1FBQ0YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQzs7a0hBekJVLHFCQUFxQjtzSEFBckIscUJBQXFCLGNBRnBCLE1BQU07MkZBRVAscUJBQXFCO2tCQUhqQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFVudHlwZWRGb3JtQ29udHJvbCxcbiAgVW50eXBlZEZvcm1Hcm91cCxcbiAgVmFsaWRhdG9ycyxcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29zdENlbnRlciB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDdXN0b21Gb3JtVmFsaWRhdG9ycyB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBGb3JtU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9mb3JtL2Zvcm0uc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDb3N0Q2VudGVyRm9ybVNlcnZpY2UgZXh0ZW5kcyBGb3JtU2VydmljZTxDb3N0Q2VudGVyPiB7XG4gIHByb3RlY3RlZCBidWlsZCgpIHtcbiAgICBjb25zdCBmb3JtID0gbmV3IFVudHlwZWRGb3JtR3JvdXAoe30pO1xuICAgIGZvcm0uc2V0Q29udHJvbChcbiAgICAgICdjb2RlJyxcbiAgICAgIG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woJycsIFtcbiAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcbiAgICAgICAgQ3VzdG9tRm9ybVZhbGlkYXRvcnMubm9TcGVjaWFsQ2hhcmFjdGVycyxcbiAgICAgIF0pXG4gICAgKTtcbiAgICBmb3JtLnNldENvbnRyb2woJ25hbWUnLCBuZXcgVW50eXBlZEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLnJlcXVpcmVkKSk7XG5cbiAgICBmb3JtLnNldENvbnRyb2woXG4gICAgICAnY3VycmVuY3knLFxuICAgICAgbmV3IFVudHlwZWRGb3JtR3JvdXAoe1xuICAgICAgICBpc29jb2RlOiBuZXcgVW50eXBlZEZvcm1Db250cm9sKHVuZGVmaW5lZCwgVmFsaWRhdG9ycy5yZXF1aXJlZCksXG4gICAgICB9KVxuICAgICk7XG4gICAgZm9ybS5zZXRDb250cm9sKFxuICAgICAgJ3VuaXQnLFxuICAgICAgbmV3IFVudHlwZWRGb3JtR3JvdXAoe1xuICAgICAgICB1aWQ6IG5ldyBVbnR5cGVkRm9ybUNvbnRyb2wodW5kZWZpbmVkLCBWYWxpZGF0b3JzLnJlcXVpcmVkKSxcbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLmZvcm0gPSBmb3JtO1xuICB9XG59XG4iXX0=