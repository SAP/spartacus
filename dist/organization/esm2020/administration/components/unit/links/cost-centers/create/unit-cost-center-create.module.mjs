/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CostCenterFormModule } from '../../../../cost-center/form/cost-center-form.module';
import { UnitCostCenterCreateComponent } from './unit-cost-center-create.component';
import * as i0 from "@angular/core";
export class UnitCostCenterCreateModule {
}
UnitCostCenterCreateModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterCreateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitCostCenterCreateModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterCreateModule, declarations: [UnitCostCenterCreateComponent], imports: [CommonModule, CostCenterFormModule] });
UnitCostCenterCreateModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterCreateModule, imports: [CommonModule, CostCenterFormModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterCreateModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, CostCenterFormModule],
                    declarations: [UnitCostCenterCreateComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1jb3N0LWNlbnRlci1jcmVhdGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VuaXQvbGlua3MvY29zdC1jZW50ZXJzL2NyZWF0ZS91bml0LWNvc3QtY2VudGVyLWNyZWF0ZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQzVGLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOztBQU1wRixNQUFNLE9BQU8sMEJBQTBCOzt1SEFBMUIsMEJBQTBCO3dIQUExQiwwQkFBMEIsaUJBRnRCLDZCQUE2QixhQURsQyxZQUFZLEVBQUUsb0JBQW9CO3dIQUdqQywwQkFBMEIsWUFIM0IsWUFBWSxFQUFFLG9CQUFvQjsyRkFHakMsMEJBQTBCO2tCQUp0QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxvQkFBb0IsQ0FBQztvQkFDN0MsWUFBWSxFQUFFLENBQUMsNkJBQTZCLENBQUM7aUJBQzlDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3N0Q2VudGVyRm9ybU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uLy4uL2Nvc3QtY2VudGVyL2Zvcm0vY29zdC1jZW50ZXItZm9ybS5tb2R1bGUnO1xuaW1wb3J0IHsgVW5pdENvc3RDZW50ZXJDcmVhdGVDb21wb25lbnQgfSBmcm9tICcuL3VuaXQtY29zdC1jZW50ZXItY3JlYXRlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIENvc3RDZW50ZXJGb3JtTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbVW5pdENvc3RDZW50ZXJDcmVhdGVDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBVbml0Q29zdENlbnRlckNyZWF0ZU1vZHVsZSB7fVxuIl19