/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { AccountSummaryCoreModule } from '@spartacus/organization/account-summary/core';
import { AccountSummaryOccModule } from '@spartacus/organization/account-summary/occ';
import { AccountSummaryComponentsModule } from '@spartacus/organization/account-summary/components';
import { AdministrationModule } from '@spartacus/organization/administration';
import * as i0 from "@angular/core";
export class AccountSummaryModule {
}
AccountSummaryModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AccountSummaryModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryModule, imports: [AccountSummaryCoreModule,
        AccountSummaryOccModule,
        AccountSummaryComponentsModule,
        AdministrationModule] });
AccountSummaryModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryModule, imports: [AccountSummaryCoreModule,
        AccountSummaryOccModule,
        AccountSummaryComponentsModule,
        AdministrationModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AccountSummaryCoreModule,
                        AccountSummaryOccModule,
                        AccountSummaryComponentsModule,
                        AdministrationModule,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC1zdW1tYXJ5Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWNjb3VudC1zdW1tYXJ5L2FjY291bnQtc3VtbWFyeS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDeEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDdEYsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDcEcsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7O0FBVTlFLE1BQU0sT0FBTyxvQkFBb0I7O2lIQUFwQixvQkFBb0I7a0hBQXBCLG9CQUFvQixZQU43Qix3QkFBd0I7UUFDeEIsdUJBQXVCO1FBQ3ZCLDhCQUE4QjtRQUM5QixvQkFBb0I7a0hBR1gsb0JBQW9CLFlBTjdCLHdCQUF3QjtRQUN4Qix1QkFBdUI7UUFDdkIsOEJBQThCO1FBQzlCLG9CQUFvQjsyRkFHWCxvQkFBb0I7a0JBUmhDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLHdCQUF3Qjt3QkFDeEIsdUJBQXVCO3dCQUN2Qiw4QkFBOEI7d0JBQzlCLG9CQUFvQjtxQkFDckI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWNjb3VudFN1bW1hcnlDb3JlTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWNjb3VudC1zdW1tYXJ5L2NvcmUnO1xuaW1wb3J0IHsgQWNjb3VudFN1bW1hcnlPY2NNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hY2NvdW50LXN1bW1hcnkvb2NjJztcbmltcG9ydCB7IEFjY291bnRTdW1tYXJ5Q29tcG9uZW50c01vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FjY291bnQtc3VtbWFyeS9jb21wb25lbnRzJztcbmltcG9ydCB7IEFkbWluaXN0cmF0aW9uTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQWNjb3VudFN1bW1hcnlDb3JlTW9kdWxlLFxuICAgIEFjY291bnRTdW1tYXJ5T2NjTW9kdWxlLFxuICAgIEFjY291bnRTdW1tYXJ5Q29tcG9uZW50c01vZHVsZSxcbiAgICBBZG1pbmlzdHJhdGlvbk1vZHVsZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQWNjb3VudFN1bW1hcnlNb2R1bGUge31cbiJdfQ==