/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CostCenterItemService } from '../../../../cost-center/services/cost-center-item.service';
import { UnitCostCenterItemService } from './unit-cost-center-item.service';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/current-unit.service";
import * as i2 from "../../../../cost-center/form/cost-center-form.component";
import * as i3 from "@angular/common";
export class UnitCostCenterCreateComponent {
    constructor(unitService) {
        this.unitService = unitService;
        this.unitKey$ = this.unitService.key$;
    }
}
UnitCostCenterCreateComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterCreateComponent, deps: [{ token: i1.CurrentUnitService }], target: i0.ɵɵFactoryTarget.Component });
UnitCostCenterCreateComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitCostCenterCreateComponent, selector: "cx-org-unit-cost-center-create", host: { classAttribute: "content-wrapper" }, providers: [
        // we provide a specific version of the `CostCenterItemService` to
        // let the form component work with unit cost centers.
        {
            provide: CostCenterItemService,
            useExisting: UnitCostCenterItemService,
        },
    ], ngImport: i0, template: "<cx-org-cost-center-form [unitKey]=\"unitKey$ | async\"></cx-org-cost-center-form>\n", dependencies: [{ kind: "component", type: i2.CostCenterFormComponent, selector: "cx-org-cost-center-form", inputs: ["unitKey"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterCreateComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-unit-cost-center-create', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        // we provide a specific version of the `CostCenterItemService` to
                        // let the form component work with unit cost centers.
                        {
                            provide: CostCenterItemService,
                            useExisting: UnitCostCenterItemService,
                        },
                    ], template: "<cx-org-cost-center-form [unitKey]=\"unitKey$ | async\"></cx-org-cost-center-form>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CurrentUnitService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1jb3N0LWNlbnRlci1jcmVhdGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VuaXQvbGlua3MvY29zdC1jZW50ZXJzL2NyZWF0ZS91bml0LWNvc3QtY2VudGVyLWNyZWF0ZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdW5pdC9saW5rcy9jb3N0LWNlbnRlcnMvY3JlYXRlL3VuaXQtY29zdC1jZW50ZXItY3JlYXRlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5FLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJEQUEyRCxDQUFDO0FBRWxHLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7OztBQWdCNUUsTUFBTSxPQUFPLDZCQUE2QjtJQUV4QyxZQUFzQixXQUErQjtRQUEvQixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFEckQsYUFBUSxHQUF1QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztJQUNHLENBQUM7OzBIQUY5Qyw2QkFBNkI7OEdBQTdCLDZCQUE2QixzR0FUN0I7UUFDVCxrRUFBa0U7UUFDbEUsc0RBQXNEO1FBQ3REO1lBQ0UsT0FBTyxFQUFFLHFCQUFxQjtZQUM5QixXQUFXLEVBQUUseUJBQXlCO1NBQ3ZDO0tBQ0YsMEJDeEJILHNGQUNBOzJGRHlCYSw2QkFBNkI7a0JBZHpDLFNBQVM7K0JBQ0UsZ0NBQWdDLG1CQUV6Qix1QkFBdUIsQ0FBQyxNQUFNLFFBQ3pDLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLGFBQ3ZCO3dCQUNULGtFQUFrRTt3QkFDbEUsc0RBQXNEO3dCQUN0RDs0QkFDRSxPQUFPLEVBQUUscUJBQXFCOzRCQUM5QixXQUFXLEVBQUUseUJBQXlCO3lCQUN2QztxQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvc3RDZW50ZXJJdGVtU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL2Nvc3QtY2VudGVyL3NlcnZpY2VzL2Nvc3QtY2VudGVyLWl0ZW0uc2VydmljZSc7XG5pbXBvcnQgeyBDdXJyZW50VW5pdFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9jdXJyZW50LXVuaXQuc2VydmljZSc7XG5pbXBvcnQgeyBVbml0Q29zdENlbnRlckl0ZW1TZXJ2aWNlIH0gZnJvbSAnLi91bml0LWNvc3QtY2VudGVyLWl0ZW0uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LW9yZy11bml0LWNvc3QtY2VudGVyLWNyZWF0ZScsXG4gIHRlbXBsYXRlVXJsOiAnLi91bml0LWNvc3QtY2VudGVyLWNyZWF0ZS5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7IGNsYXNzOiAnY29udGVudC13cmFwcGVyJyB9LFxuICBwcm92aWRlcnM6IFtcbiAgICAvLyB3ZSBwcm92aWRlIGEgc3BlY2lmaWMgdmVyc2lvbiBvZiB0aGUgYENvc3RDZW50ZXJJdGVtU2VydmljZWAgdG9cbiAgICAvLyBsZXQgdGhlIGZvcm0gY29tcG9uZW50IHdvcmsgd2l0aCB1bml0IGNvc3QgY2VudGVycy5cbiAgICB7XG4gICAgICBwcm92aWRlOiBDb3N0Q2VudGVySXRlbVNlcnZpY2UsXG4gICAgICB1c2VFeGlzdGluZzogVW5pdENvc3RDZW50ZXJJdGVtU2VydmljZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBVbml0Q29zdENlbnRlckNyZWF0ZUNvbXBvbmVudCB7XG4gIHVuaXRLZXkkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLnVuaXRTZXJ2aWNlLmtleSQ7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCB1bml0U2VydmljZTogQ3VycmVudFVuaXRTZXJ2aWNlKSB7fVxufVxuIiwiPGN4LW9yZy1jb3N0LWNlbnRlci1mb3JtIFt1bml0S2V5XT1cInVuaXRLZXkkIHwgYXN5bmNcIj48L2N4LW9yZy1jb3N0LWNlbnRlci1mb3JtPlxuIl19