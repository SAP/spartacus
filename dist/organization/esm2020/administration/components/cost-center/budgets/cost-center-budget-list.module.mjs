/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { ListModule } from '../../shared/list/list.module';
import { SubListModule } from '../../shared/sub-list/sub-list.module';
import { CostCenterAssignedBudgetListComponent } from './assigned/cost-center-assigned-budget-list.component';
import { CostCenterBudgetListComponent } from './cost-center-budget-list.component';
import * as i0 from "@angular/core";
export class CostCenterBudgetListModule {
}
CostCenterBudgetListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterBudgetListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CostCenterBudgetListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CostCenterBudgetListModule, declarations: [CostCenterAssignedBudgetListComponent,
        CostCenterBudgetListComponent], imports: [ListModule, I18nModule, RouterModule, SubListModule] });
CostCenterBudgetListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterBudgetListModule, imports: [ListModule, I18nModule, RouterModule, SubListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterBudgetListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ListModule, I18nModule, RouterModule, SubListModule],
                    declarations: [
                        CostCenterAssignedBudgetListComponent,
                        CostCenterBudgetListComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29zdC1jZW50ZXItYnVkZ2V0LWxpc3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL2Nvc3QtY2VudGVyL2J1ZGdldHMvY29zdC1jZW50ZXItYnVkZ2V0LWxpc3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUscUNBQXFDLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUM5RyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7QUFTcEYsTUFBTSxPQUFPLDBCQUEwQjs7dUhBQTFCLDBCQUEwQjt3SEFBMUIsMEJBQTBCLGlCQUpuQyxxQ0FBcUM7UUFDckMsNkJBQTZCLGFBSHJCLFVBQVUsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLGFBQWE7d0hBTWxELDBCQUEwQixZQU4zQixVQUFVLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxhQUFhOzJGQU1sRCwwQkFBMEI7a0JBUHRDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsYUFBYSxDQUFDO29CQUM5RCxZQUFZLEVBQUU7d0JBQ1oscUNBQXFDO3dCQUNyQyw2QkFBNkI7cUJBQzlCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJMThuTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IExpc3RNb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvbGlzdC9saXN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBTdWJMaXN0TW9kdWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3N1Yi1saXN0L3N1Yi1saXN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBDb3N0Q2VudGVyQXNzaWduZWRCdWRnZXRMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9hc3NpZ25lZC9jb3N0LWNlbnRlci1hc3NpZ25lZC1idWRnZXQtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29zdENlbnRlckJ1ZGdldExpc3RDb21wb25lbnQgfSBmcm9tICcuL2Nvc3QtY2VudGVyLWJ1ZGdldC1saXN0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtMaXN0TW9kdWxlLCBJMThuTW9kdWxlLCBSb3V0ZXJNb2R1bGUsIFN1Ykxpc3RNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDb3N0Q2VudGVyQXNzaWduZWRCdWRnZXRMaXN0Q29tcG9uZW50LFxuICAgIENvc3RDZW50ZXJCdWRnZXRMaXN0Q29tcG9uZW50LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDb3N0Q2VudGVyQnVkZ2V0TGlzdE1vZHVsZSB7fVxuIl19