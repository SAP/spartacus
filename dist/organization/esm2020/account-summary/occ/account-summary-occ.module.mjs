/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { AccountSummaryAdapter } from '@spartacus/organization/account-summary/core';
import { OccAccountSummaryAdapter } from './adapters/occ-account-summary.adapter';
import { defaultOccAccountSummaryConfig } from './config/default-occ-account-summary-config';
import * as i0 from "@angular/core";
export class AccountSummaryOccModule {
}
AccountSummaryOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AccountSummaryOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryOccModule });
AccountSummaryOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryOccModule, providers: [
        provideDefaultConfig(defaultOccAccountSummaryConfig),
        { provide: AccountSummaryAdapter, useClass: OccAccountSummaryAdapter },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryOccModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfig(defaultOccAccountSummaryConfig),
                        { provide: AccountSummaryAdapter, useClass: OccAccountSummaryAdapter },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC1zdW1tYXJ5LW9jYy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FjY291bnQtc3VtbWFyeS9vY2MvYWNjb3VudC1zdW1tYXJ5LW9jYy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDckYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDbEYsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7O0FBUTdGLE1BQU0sT0FBTyx1QkFBdUI7O29IQUF2Qix1QkFBdUI7cUhBQXZCLHVCQUF1QjtxSEFBdkIsdUJBQXVCLGFBTHZCO1FBQ1Qsb0JBQW9CLENBQUMsOEJBQThCLENBQUM7UUFDcEQsRUFBRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUFFLHdCQUF3QixFQUFFO0tBQ3ZFOzJGQUVVLHVCQUF1QjtrQkFObkMsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQUMsOEJBQThCLENBQUM7d0JBQ3BELEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSx3QkFBd0IsRUFBRTtxQkFDdkU7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQWNjb3VudFN1bW1hcnlBZGFwdGVyIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWNjb3VudC1zdW1tYXJ5L2NvcmUnO1xuaW1wb3J0IHsgT2NjQWNjb3VudFN1bW1hcnlBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVycy9vY2MtYWNjb3VudC1zdW1tYXJ5LmFkYXB0ZXInO1xuaW1wb3J0IHsgZGVmYXVsdE9jY0FjY291bnRTdW1tYXJ5Q29uZmlnIH0gZnJvbSAnLi9jb25maWcvZGVmYXVsdC1vY2MtYWNjb3VudC1zdW1tYXJ5LWNvbmZpZyc7XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRPY2NBY2NvdW50U3VtbWFyeUNvbmZpZyksXG4gICAgeyBwcm92aWRlOiBBY2NvdW50U3VtbWFyeUFkYXB0ZXIsIHVzZUNsYXNzOiBPY2NBY2NvdW50U3VtbWFyeUFkYXB0ZXIgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQWNjb3VudFN1bW1hcnlPY2NNb2R1bGUge31cbiJdfQ==