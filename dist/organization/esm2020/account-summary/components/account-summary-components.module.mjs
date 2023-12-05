/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { AccountSummaryDocumentModule } from './details/document/account-summary-document.module';
import { AccountSummaryHeaderModule } from './details/header/account-summary-header.module';
import { AccountSummaryListModule } from './list/account-summary-list.module';
import * as i0 from "@angular/core";
export class AccountSummaryComponentsModule {
}
AccountSummaryComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AccountSummaryComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryComponentsModule, imports: [AccountSummaryListModule,
        AccountSummaryHeaderModule,
        AccountSummaryDocumentModule] });
AccountSummaryComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryComponentsModule, imports: [AccountSummaryListModule,
        AccountSummaryHeaderModule,
        AccountSummaryDocumentModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AccountSummaryListModule,
                        AccountSummaryHeaderModule,
                        AccountSummaryDocumentModule,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC1zdW1tYXJ5LWNvbXBvbmVudHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hY2NvdW50LXN1bW1hcnkvY29tcG9uZW50cy9hY2NvdW50LXN1bW1hcnktY29tcG9uZW50cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDbEcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDNUYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7O0FBUzlFLE1BQU0sT0FBTyw4QkFBOEI7OzJIQUE5Qiw4QkFBOEI7NEhBQTlCLDhCQUE4QixZQUx2Qyx3QkFBd0I7UUFDeEIsMEJBQTBCO1FBQzFCLDRCQUE0Qjs0SEFHbkIsOEJBQThCLFlBTHZDLHdCQUF3QjtRQUN4QiwwQkFBMEI7UUFDMUIsNEJBQTRCOzJGQUduQiw4QkFBOEI7a0JBUDFDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLHdCQUF3Qjt3QkFDeEIsMEJBQTBCO3dCQUMxQiw0QkFBNEI7cUJBQzdCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjY291bnRTdW1tYXJ5RG9jdW1lbnRNb2R1bGUgfSBmcm9tICcuL2RldGFpbHMvZG9jdW1lbnQvYWNjb3VudC1zdW1tYXJ5LWRvY3VtZW50Lm1vZHVsZSc7XG5pbXBvcnQgeyBBY2NvdW50U3VtbWFyeUhlYWRlck1vZHVsZSB9IGZyb20gJy4vZGV0YWlscy9oZWFkZXIvYWNjb3VudC1zdW1tYXJ5LWhlYWRlci5tb2R1bGUnO1xuaW1wb3J0IHsgQWNjb3VudFN1bW1hcnlMaXN0TW9kdWxlIH0gZnJvbSAnLi9saXN0L2FjY291bnQtc3VtbWFyeS1saXN0Lm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBBY2NvdW50U3VtbWFyeUxpc3RNb2R1bGUsXG4gICAgQWNjb3VudFN1bW1hcnlIZWFkZXJNb2R1bGUsXG4gICAgQWNjb3VudFN1bW1hcnlEb2N1bWVudE1vZHVsZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQWNjb3VudFN1bW1hcnlDb21wb25lbnRzTW9kdWxlIHt9XG4iXX0=