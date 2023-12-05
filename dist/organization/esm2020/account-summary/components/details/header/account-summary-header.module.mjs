/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthGuard, I18nModule, provideDefaultConfig, } from '@spartacus/core';
import { AdminGuard } from '@spartacus/organization/administration/core';
import { CardModule } from '@spartacus/storefront';
import { AccountSummaryHeaderComponent } from './account-summary-header.component';
import * as i0 from "@angular/core";
export const accountSummaryHeaderCmsConfig = {
    cmsComponents: {
        AccountSummaryHeaderComponent: {
            component: AccountSummaryHeaderComponent,
            guards: [AuthGuard, AdminGuard],
        },
    },
};
export class AccountSummaryHeaderModule {
}
AccountSummaryHeaderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryHeaderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AccountSummaryHeaderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryHeaderModule, declarations: [AccountSummaryHeaderComponent], imports: [CardModule, CommonModule, I18nModule] });
AccountSummaryHeaderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryHeaderModule, providers: [provideDefaultConfig(accountSummaryHeaderCmsConfig)], imports: [CardModule, CommonModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryHeaderModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [AccountSummaryHeaderComponent],
                    imports: [CardModule, CommonModule, I18nModule],
                    providers: [provideDefaultConfig(accountSummaryHeaderCmsConfig)],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC1zdW1tYXJ5LWhlYWRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FjY291bnQtc3VtbWFyeS9jb21wb25lbnRzL2RldGFpbHMvaGVhZGVyL2FjY291bnQtc3VtbWFyeS1oZWFkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsU0FBUyxFQUVULFVBQVUsRUFDVixvQkFBb0IsR0FDckIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDekUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOztBQUVuRixNQUFNLENBQUMsTUFBTSw2QkFBNkIsR0FBYztJQUN0RCxhQUFhLEVBQUU7UUFDYiw2QkFBNkIsRUFBRTtZQUM3QixTQUFTLEVBQUUsNkJBQTZCO1lBQ3hDLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUM7U0FDaEM7S0FDRjtDQUNGLENBQUM7QUFPRixNQUFNLE9BQU8sMEJBQTBCOzt1SEFBMUIsMEJBQTBCO3dIQUExQiwwQkFBMEIsaUJBSnRCLDZCQUE2QixhQUNsQyxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVU7d0hBR25DLDBCQUEwQixhQUYxQixDQUFDLG9CQUFvQixDQUFDLDZCQUE2QixDQUFDLENBQUMsWUFEdEQsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVOzJGQUduQywwQkFBMEI7a0JBTHRDLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMsNkJBQTZCLENBQUM7b0JBQzdDLE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsVUFBVSxDQUFDO29CQUMvQyxTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO2lCQUNqRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQXV0aEd1YXJkLFxuICBDbXNDb25maWcsXG4gIEkxOG5Nb2R1bGUsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQWRtaW5HdWFyZCB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHsgQ2FyZE1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBBY2NvdW50U3VtbWFyeUhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vYWNjb3VudC1zdW1tYXJ5LWhlYWRlci5jb21wb25lbnQnO1xuXG5leHBvcnQgY29uc3QgYWNjb3VudFN1bW1hcnlIZWFkZXJDbXNDb25maWc6IENtc0NvbmZpZyA9IHtcbiAgY21zQ29tcG9uZW50czoge1xuICAgIEFjY291bnRTdW1tYXJ5SGVhZGVyQ29tcG9uZW50OiB7XG4gICAgICBjb21wb25lbnQ6IEFjY291bnRTdW1tYXJ5SGVhZGVyQ29tcG9uZW50LFxuICAgICAgZ3VhcmRzOiBbQXV0aEd1YXJkLCBBZG1pbkd1YXJkXSxcbiAgICB9LFxuICB9LFxufTtcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbQWNjb3VudFN1bW1hcnlIZWFkZXJDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbQ2FyZE1vZHVsZSwgQ29tbW9uTW9kdWxlLCBJMThuTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbcHJvdmlkZURlZmF1bHRDb25maWcoYWNjb3VudFN1bW1hcnlIZWFkZXJDbXNDb25maWcpXSxcbn0pXG5leHBvcnQgY2xhc3MgQWNjb3VudFN1bW1hcnlIZWFkZXJNb2R1bGUge31cbiJdfQ==