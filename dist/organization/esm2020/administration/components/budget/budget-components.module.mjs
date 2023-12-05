/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig, provideDefaultConfigFactory, } from '@spartacus/core';
import { SharedOrganizationModule } from '../shared/shared-organization.module';
import { budgetCmsConfig, budgetTableConfigFactory } from './budget.config';
import { BudgetCostCenterListModule } from './cost-centers/budget-cost-center-list.module';
import { BudgetDetailsModule } from './details/budget-details.module';
import { BudgetFormModule } from './form/budget-form.module';
import * as i0 from "@angular/core";
export class BudgetComponentsModule {
}
BudgetComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BudgetComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: BudgetComponentsModule, imports: [SharedOrganizationModule,
        BudgetDetailsModule,
        BudgetFormModule,
        BudgetCostCenterListModule] });
BudgetComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetComponentsModule, providers: [
        provideDefaultConfig(budgetCmsConfig),
        provideDefaultConfigFactory(budgetTableConfigFactory),
    ], imports: [SharedOrganizationModule,
        BudgetDetailsModule,
        BudgetFormModule,
        BudgetCostCenterListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        SharedOrganizationModule,
                        BudgetDetailsModule,
                        BudgetFormModule,
                        BudgetCostCenterListModule,
                    ],
                    providers: [
                        provideDefaultConfig(budgetCmsConfig),
                        provideDefaultConfigFactory(budgetTableConfigFactory),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVkZ2V0LWNvbXBvbmVudHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL2J1ZGdldC9idWRnZXQtY29tcG9uZW50cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUNMLG9CQUFvQixFQUNwQiwyQkFBMkIsR0FDNUIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsZUFBZSxFQUFFLHdCQUF3QixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDNUUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDM0YsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0FBYzdELE1BQU0sT0FBTyxzQkFBc0I7O21IQUF0QixzQkFBc0I7b0hBQXRCLHNCQUFzQixZQVYvQix3QkFBd0I7UUFDeEIsbUJBQW1CO1FBQ25CLGdCQUFnQjtRQUNoQiwwQkFBMEI7b0hBT2pCLHNCQUFzQixhQUx0QjtRQUNULG9CQUFvQixDQUFDLGVBQWUsQ0FBQztRQUNyQywyQkFBMkIsQ0FBQyx3QkFBd0IsQ0FBQztLQUN0RCxZQVJDLHdCQUF3QjtRQUN4QixtQkFBbUI7UUFDbkIsZ0JBQWdCO1FBQ2hCLDBCQUEwQjsyRkFPakIsc0JBQXNCO2tCQVpsQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCx3QkFBd0I7d0JBQ3hCLG1CQUFtQjt3QkFDbkIsZ0JBQWdCO3dCQUNoQiwwQkFBMEI7cUJBQzNCO29CQUNELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBQyxlQUFlLENBQUM7d0JBQ3JDLDJCQUEyQixDQUFDLHdCQUF3QixDQUFDO3FCQUN0RDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5LFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgU2hhcmVkT3JnYW5pemF0aW9uTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL3NoYXJlZC1vcmdhbml6YXRpb24ubW9kdWxlJztcbmltcG9ydCB7IGJ1ZGdldENtc0NvbmZpZywgYnVkZ2V0VGFibGVDb25maWdGYWN0b3J5IH0gZnJvbSAnLi9idWRnZXQuY29uZmlnJztcbmltcG9ydCB7IEJ1ZGdldENvc3RDZW50ZXJMaXN0TW9kdWxlIH0gZnJvbSAnLi9jb3N0LWNlbnRlcnMvYnVkZ2V0LWNvc3QtY2VudGVyLWxpc3QubW9kdWxlJztcbmltcG9ydCB7IEJ1ZGdldERldGFpbHNNb2R1bGUgfSBmcm9tICcuL2RldGFpbHMvYnVkZ2V0LWRldGFpbHMubW9kdWxlJztcbmltcG9ydCB7IEJ1ZGdldEZvcm1Nb2R1bGUgfSBmcm9tICcuL2Zvcm0vYnVkZ2V0LWZvcm0ubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFNoYXJlZE9yZ2FuaXphdGlvbk1vZHVsZSxcbiAgICBCdWRnZXREZXRhaWxzTW9kdWxlLFxuICAgIEJ1ZGdldEZvcm1Nb2R1bGUsXG4gICAgQnVkZ2V0Q29zdENlbnRlckxpc3RNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGJ1ZGdldENtc0NvbmZpZyksXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5KGJ1ZGdldFRhYmxlQ29uZmlnRmFjdG9yeSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEJ1ZGdldENvbXBvbmVudHNNb2R1bGUge31cbiJdfQ==