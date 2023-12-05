/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig, provideDefaultConfigFactory, } from '@spartacus/core';
import { ListModule } from '@spartacus/organization/administration/components';
import { AccountSummaryListComponent } from './account-summary-list.component';
import { accountSummaryListCmsConfig, accountSummaryUnitsTableConfigFactory, } from './account-summary-list.config';
import * as i0 from "@angular/core";
export class AccountSummaryListModule {
}
AccountSummaryListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AccountSummaryListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryListModule, declarations: [AccountSummaryListComponent], imports: [I18nModule, ListModule], exports: [AccountSummaryListComponent] });
AccountSummaryListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryListModule, providers: [
        provideDefaultConfig(accountSummaryListCmsConfig),
        provideDefaultConfigFactory(accountSummaryUnitsTableConfigFactory),
    ], imports: [I18nModule, ListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [I18nModule, ListModule],
                    providers: [
                        provideDefaultConfig(accountSummaryListCmsConfig),
                        provideDefaultConfigFactory(accountSummaryUnitsTableConfigFactory),
                    ],
                    declarations: [AccountSummaryListComponent],
                    exports: [AccountSummaryListComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC1zdW1tYXJ5LWxpc3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hY2NvdW50LXN1bW1hcnkvY29tcG9uZW50cy9saXN0L2FjY291bnQtc3VtbWFyeS1saXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsVUFBVSxFQUNWLG9CQUFvQixFQUNwQiwyQkFBMkIsR0FDNUIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDL0UsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDL0UsT0FBTyxFQUNMLDJCQUEyQixFQUMzQixxQ0FBcUMsR0FDdEMsTUFBTSwrQkFBK0IsQ0FBQzs7QUFXdkMsTUFBTSxPQUFPLHdCQUF3Qjs7cUhBQXhCLHdCQUF3QjtzSEFBeEIsd0JBQXdCLGlCQUhwQiwyQkFBMkIsYUFMaEMsVUFBVSxFQUFFLFVBQVUsYUFNdEIsMkJBQTJCO3NIQUUxQix3QkFBd0IsYUFQeEI7UUFDVCxvQkFBb0IsQ0FBQywyQkFBMkIsQ0FBQztRQUNqRCwyQkFBMkIsQ0FBQyxxQ0FBcUMsQ0FBQztLQUNuRSxZQUpTLFVBQVUsRUFBRSxVQUFVOzJGQVFyQix3QkFBd0I7a0JBVHBDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQztvQkFDakMsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFDLDJCQUEyQixDQUFDO3dCQUNqRCwyQkFBMkIsQ0FBQyxxQ0FBcUMsQ0FBQztxQkFDbkU7b0JBQ0QsWUFBWSxFQUFFLENBQUMsMkJBQTJCLENBQUM7b0JBQzNDLE9BQU8sRUFBRSxDQUFDLDJCQUEyQixDQUFDO2lCQUN2QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBJMThuTW9kdWxlLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5LFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgTGlzdE1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgQWNjb3VudFN1bW1hcnlMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9hY2NvdW50LXN1bW1hcnktbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgYWNjb3VudFN1bW1hcnlMaXN0Q21zQ29uZmlnLFxuICBhY2NvdW50U3VtbWFyeVVuaXRzVGFibGVDb25maWdGYWN0b3J5LFxufSBmcm9tICcuL2FjY291bnQtc3VtbWFyeS1saXN0LmNvbmZpZyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtJMThuTW9kdWxlLCBMaXN0TW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoYWNjb3VudFN1bW1hcnlMaXN0Q21zQ29uZmlnKSxcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnkoYWNjb3VudFN1bW1hcnlVbml0c1RhYmxlQ29uZmlnRmFjdG9yeSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0FjY291bnRTdW1tYXJ5TGlzdENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtBY2NvdW50U3VtbWFyeUxpc3RDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBBY2NvdW50U3VtbWFyeUxpc3RNb2R1bGUge31cbiJdfQ==