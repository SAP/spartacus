/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { PageMetaResolver } from '@spartacus/core';
import { AccountSummaryPageMetaResolver } from './account-summary-page-meta.resolver';
import { AccountSummaryConnector } from './connectors/account-summary.connector';
import { facadeProviders } from './facade/facade-providers';
import * as i0 from "@angular/core";
export class AccountSummaryCoreModule {
}
AccountSummaryCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AccountSummaryCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryCoreModule });
AccountSummaryCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryCoreModule, providers: [
        ...facadeProviders,
        AccountSummaryConnector,
        {
            provide: PageMetaResolver,
            useExisting: AccountSummaryPageMetaResolver,
            multi: true,
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        ...facadeProviders,
                        AccountSummaryConnector,
                        {
                            provide: PageMetaResolver,
                            useExisting: AccountSummaryPageMetaResolver,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC1zdW1tYXJ5LWNvcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hY2NvdW50LXN1bW1hcnkvY29yZS9hY2NvdW50LXN1bW1hcnktY29yZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkQsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDakYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDOztBQWE1RCxNQUFNLE9BQU8sd0JBQXdCOztxSEFBeEIsd0JBQXdCO3NIQUF4Qix3QkFBd0I7c0hBQXhCLHdCQUF3QixhQVZ4QjtRQUNULEdBQUcsZUFBZTtRQUNsQix1QkFBdUI7UUFDdkI7WUFDRSxPQUFPLEVBQUUsZ0JBQWdCO1lBQ3pCLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGOzJGQUVVLHdCQUF3QjtrQkFYcEMsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUU7d0JBQ1QsR0FBRyxlQUFlO3dCQUNsQix1QkFBdUI7d0JBQ3ZCOzRCQUNFLE9BQU8sRUFBRSxnQkFBZ0I7NEJBQ3pCLFdBQVcsRUFBRSw4QkFBOEI7NEJBQzNDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2VNZXRhUmVzb2x2ZXIgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQWNjb3VudFN1bW1hcnlQYWdlTWV0YVJlc29sdmVyIH0gZnJvbSAnLi9hY2NvdW50LXN1bW1hcnktcGFnZS1tZXRhLnJlc29sdmVyJztcbmltcG9ydCB7IEFjY291bnRTdW1tYXJ5Q29ubmVjdG9yIH0gZnJvbSAnLi9jb25uZWN0b3JzL2FjY291bnQtc3VtbWFyeS5jb25uZWN0b3InO1xuaW1wb3J0IHsgZmFjYWRlUHJvdmlkZXJzIH0gZnJvbSAnLi9mYWNhZGUvZmFjYWRlLXByb3ZpZGVycyc7XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIC4uLmZhY2FkZVByb3ZpZGVycyxcbiAgICBBY2NvdW50U3VtbWFyeUNvbm5lY3RvcixcbiAgICB7XG4gICAgICBwcm92aWRlOiBQYWdlTWV0YVJlc29sdmVyLFxuICAgICAgdXNlRXhpc3Rpbmc6IEFjY291bnRTdW1tYXJ5UGFnZU1ldGFSZXNvbHZlcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFjY291bnRTdW1tYXJ5Q29yZU1vZHVsZSB7fVxuIl19