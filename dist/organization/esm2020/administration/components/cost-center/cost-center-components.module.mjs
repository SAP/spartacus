/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig, provideDefaultConfigFactory, } from '@spartacus/core';
import { BudgetDetailsCellModule } from '../budget/details-cell/budget-details-cell.module';
import { SharedOrganizationModule } from '../shared/shared-organization.module';
import { CostCenterBudgetListModule } from './budgets/cost-center-budget-list.module';
import { costCenterCmsConfig, costCenterTableConfigFactory, } from './cost-center.config';
import { CostCenterDetailsModule } from './details/cost-center-details.module';
import { CostCenterFormModule } from './form/cost-center-form.module';
import * as i0 from "@angular/core";
export class CostCenterComponentsModule {
}
CostCenterComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CostCenterComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CostCenterComponentsModule, imports: [SharedOrganizationModule,
        CostCenterDetailsModule,
        CostCenterFormModule,
        CostCenterBudgetListModule,
        BudgetDetailsCellModule] });
CostCenterComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterComponentsModule, providers: [
        provideDefaultConfig(costCenterCmsConfig),
        provideDefaultConfigFactory(costCenterTableConfigFactory),
    ], imports: [SharedOrganizationModule,
        CostCenterDetailsModule,
        CostCenterFormModule,
        CostCenterBudgetListModule,
        BudgetDetailsCellModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        SharedOrganizationModule,
                        CostCenterDetailsModule,
                        CostCenterFormModule,
                        CostCenterBudgetListModule,
                        BudgetDetailsCellModule,
                    ],
                    providers: [
                        provideDefaultConfig(costCenterCmsConfig),
                        provideDefaultConfigFactory(costCenterTableConfigFactory),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29zdC1jZW50ZXItY29tcG9uZW50cy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvY29zdC1jZW50ZXIvY29zdC1jZW50ZXItY29tcG9uZW50cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUNMLG9CQUFvQixFQUNwQiwyQkFBMkIsR0FDNUIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUM1RixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUN0RixPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLDRCQUE0QixHQUM3QixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOztBQWV0RSxNQUFNLE9BQU8sMEJBQTBCOzt1SEFBMUIsMEJBQTBCO3dIQUExQiwwQkFBMEIsWUFYbkMsd0JBQXdCO1FBQ3hCLHVCQUF1QjtRQUN2QixvQkFBb0I7UUFDcEIsMEJBQTBCO1FBQzFCLHVCQUF1Qjt3SEFPZCwwQkFBMEIsYUFMMUI7UUFDVCxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQztRQUN6QywyQkFBMkIsQ0FBQyw0QkFBNEIsQ0FBQztLQUMxRCxZQVRDLHdCQUF3QjtRQUN4Qix1QkFBdUI7UUFDdkIsb0JBQW9CO1FBQ3BCLDBCQUEwQjtRQUMxQix1QkFBdUI7MkZBT2QsMEJBQTBCO2tCQWJ0QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCx3QkFBd0I7d0JBQ3hCLHVCQUF1Qjt3QkFDdkIsb0JBQW9CO3dCQUNwQiwwQkFBMEI7d0JBQzFCLHVCQUF1QjtxQkFDeEI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFDLG1CQUFtQixDQUFDO3dCQUN6QywyQkFBMkIsQ0FBQyw0QkFBNEIsQ0FBQztxQkFDMUQ7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEJ1ZGdldERldGFpbHNDZWxsTW9kdWxlIH0gZnJvbSAnLi4vYnVkZ2V0L2RldGFpbHMtY2VsbC9idWRnZXQtZGV0YWlscy1jZWxsLm1vZHVsZSc7XG5pbXBvcnQgeyBTaGFyZWRPcmdhbml6YXRpb25Nb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvc2hhcmVkLW9yZ2FuaXphdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgQ29zdENlbnRlckJ1ZGdldExpc3RNb2R1bGUgfSBmcm9tICcuL2J1ZGdldHMvY29zdC1jZW50ZXItYnVkZ2V0LWxpc3QubW9kdWxlJztcbmltcG9ydCB7XG4gIGNvc3RDZW50ZXJDbXNDb25maWcsXG4gIGNvc3RDZW50ZXJUYWJsZUNvbmZpZ0ZhY3RvcnksXG59IGZyb20gJy4vY29zdC1jZW50ZXIuY29uZmlnJztcbmltcG9ydCB7IENvc3RDZW50ZXJEZXRhaWxzTW9kdWxlIH0gZnJvbSAnLi9kZXRhaWxzL2Nvc3QtY2VudGVyLWRldGFpbHMubW9kdWxlJztcbmltcG9ydCB7IENvc3RDZW50ZXJGb3JtTW9kdWxlIH0gZnJvbSAnLi9mb3JtL2Nvc3QtY2VudGVyLWZvcm0ubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFNoYXJlZE9yZ2FuaXphdGlvbk1vZHVsZSxcbiAgICBDb3N0Q2VudGVyRGV0YWlsc01vZHVsZSxcbiAgICBDb3N0Q2VudGVyRm9ybU1vZHVsZSxcbiAgICBDb3N0Q2VudGVyQnVkZ2V0TGlzdE1vZHVsZSxcbiAgICBCdWRnZXREZXRhaWxzQ2VsbE1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoY29zdENlbnRlckNtc0NvbmZpZyksXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5KGNvc3RDZW50ZXJUYWJsZUNvbmZpZ0ZhY3RvcnkpLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDb3N0Q2VudGVyQ29tcG9uZW50c01vZHVsZSB7fVxuIl19