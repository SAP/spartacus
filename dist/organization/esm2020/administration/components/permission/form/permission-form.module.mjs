/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { ItemActiveModule } from '../../shared/item-active.module';
import { FormModule } from '../../shared/form/form.module';
import { PermissionFormComponent } from './permission-form.component';
import * as i0 from "@angular/core";
export class PermissionFormModule {
}
PermissionFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PermissionFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PermissionFormModule, declarations: [PermissionFormComponent], imports: [CommonModule,
        RouterModule,
        NgSelectModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule,
        FormModule,
        ItemActiveModule], exports: [PermissionFormComponent] });
PermissionFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionFormModule, imports: [CommonModule,
        RouterModule,
        NgSelectModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule,
        FormModule,
        ItemActiveModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        NgSelectModule,
                        UrlModule,
                        I18nModule,
                        ReactiveFormsModule,
                        FormErrorsModule,
                        FormModule,
                        ItemActiveModule,
                    ],
                    declarations: [PermissionFormComponent],
                    exports: [PermissionFormComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbi1mb3JtLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy9wZXJtaXNzaW9uL2Zvcm0vcGVybWlzc2lvbi1mb3JtLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7QUFpQnRFLE1BQU0sT0FBTyxvQkFBb0I7O2lIQUFwQixvQkFBb0I7a0hBQXBCLG9CQUFvQixpQkFIaEIsdUJBQXVCLGFBVnBDLFlBQVk7UUFDWixZQUFZO1FBQ1osY0FBYztRQUNkLFNBQVM7UUFDVCxVQUFVO1FBQ1YsbUJBQW1CO1FBQ25CLGdCQUFnQjtRQUNoQixVQUFVO1FBQ1YsZ0JBQWdCLGFBR1IsdUJBQXVCO2tIQUV0QixvQkFBb0IsWUFiN0IsWUFBWTtRQUNaLFlBQVk7UUFDWixjQUFjO1FBQ2QsU0FBUztRQUNULFVBQVU7UUFDVixtQkFBbUI7UUFDbkIsZ0JBQWdCO1FBQ2hCLFVBQVU7UUFDVixnQkFBZ0I7MkZBS1Asb0JBQW9CO2tCQWZoQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFlBQVk7d0JBQ1osY0FBYzt3QkFDZCxTQUFTO3dCQUNULFVBQVU7d0JBQ1YsbUJBQW1CO3dCQUNuQixnQkFBZ0I7d0JBQ2hCLFVBQVU7d0JBQ1YsZ0JBQWdCO3FCQUNqQjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztvQkFDdkMsT0FBTyxFQUFFLENBQUMsdUJBQXVCLENBQUM7aUJBQ25DIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE5nU2VsZWN0TW9kdWxlIH0gZnJvbSAnQG5nLXNlbGVjdC9uZy1zZWxlY3QnO1xuaW1wb3J0IHsgSTE4bk1vZHVsZSwgVXJsTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEZvcm1FcnJvcnNNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgSXRlbUFjdGl2ZU1vZHVsZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pdGVtLWFjdGl2ZS5tb2R1bGUnO1xuaW1wb3J0IHsgRm9ybU1vZHVsZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9mb3JtL2Zvcm0ubW9kdWxlJztcbmltcG9ydCB7IFBlcm1pc3Npb25Gb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9wZXJtaXNzaW9uLWZvcm0uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgTmdTZWxlY3RNb2R1bGUsXG4gICAgVXJsTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBGb3JtRXJyb3JzTW9kdWxlLFxuICAgIEZvcm1Nb2R1bGUsXG4gICAgSXRlbUFjdGl2ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUGVybWlzc2lvbkZvcm1Db21wb25lbnRdLFxuICBleHBvcnRzOiBbUGVybWlzc2lvbkZvcm1Db21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBQZXJtaXNzaW9uRm9ybU1vZHVsZSB7fVxuIl19