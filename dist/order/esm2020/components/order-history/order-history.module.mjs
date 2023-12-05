/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { inject, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthGuard, I18nModule, provideDefaultConfig, provideDefaultConfigFactory, UrlModule, } from '@spartacus/core';
import { ListNavigationModule, MediaModule, SpinnerModule, } from '@spartacus/storefront';
import { OrderHistoryComponent } from './order-history.component';
import { USE_MY_ACCOUNT_V2_ORDER } from '@spartacus/order/root';
import { MyAccountV2OrderHistoryComponent, MyAccountV2OrderConsolidatedInformationComponent, MyAccountV2ConsignmentEntriesComponent, } from './my-account-v2';
import * as i0 from "@angular/core";
const myAccountV2CmsMapping = {
    cmsComponents: {
        AccountOrderHistoryComponent: {
            component: MyAccountV2OrderHistoryComponent,
            //guards: inherited from standard config,
        },
    },
};
const moduleComponents = [
    MyAccountV2OrderHistoryComponent,
    MyAccountV2OrderConsolidatedInformationComponent,
    MyAccountV2ConsignmentEntriesComponent,
];
export class OrderHistoryModule {
}
OrderHistoryModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderHistoryModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderHistoryModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderHistoryModule, declarations: [OrderHistoryComponent, MyAccountV2OrderHistoryComponent,
        MyAccountV2OrderConsolidatedInformationComponent,
        MyAccountV2ConsignmentEntriesComponent], imports: [CommonModule,
        RouterModule,
        FormsModule,
        NgSelectModule,
        ListNavigationModule,
        UrlModule,
        I18nModule,
        SpinnerModule,
        MediaModule], exports: [OrderHistoryComponent, MyAccountV2OrderHistoryComponent,
        MyAccountV2OrderConsolidatedInformationComponent,
        MyAccountV2ConsignmentEntriesComponent] });
OrderHistoryModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderHistoryModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                AccountOrderHistoryComponent: {
                    component: OrderHistoryComponent,
                    guards: [AuthGuard],
                },
            },
        }),
        provideDefaultConfigFactory(() => inject(USE_MY_ACCOUNT_V2_ORDER) ? myAccountV2CmsMapping : {}),
    ], imports: [CommonModule,
        RouterModule,
        FormsModule,
        NgSelectModule,
        ListNavigationModule,
        UrlModule,
        I18nModule,
        SpinnerModule,
        MediaModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderHistoryModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        FormsModule,
                        NgSelectModule,
                        ListNavigationModule,
                        UrlModule,
                        I18nModule,
                        SpinnerModule,
                        MediaModule,
                    ],
                    declarations: [OrderHistoryComponent, ...moduleComponents],
                    exports: [OrderHistoryComponent, ...moduleComponents],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                AccountOrderHistoryComponent: {
                                    component: OrderHistoryComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                        provideDefaultConfigFactory(() => inject(USE_MY_ACCOUNT_V2_ORDER) ? myAccountV2CmsMapping : {}),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItaGlzdG9yeS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvY29tcG9uZW50cy9vcmRlci1oaXN0b3J5L29yZGVyLWhpc3RvcnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUNMLFNBQVMsRUFFVCxVQUFVLEVBQ1Ysb0JBQW9CLEVBQ3BCLDJCQUEyQixFQUMzQixTQUFTLEdBQ1YsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLFdBQVcsRUFDWCxhQUFhLEdBQ2QsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRSxPQUFPLEVBQ0wsZ0NBQWdDLEVBQ2hDLGdEQUFnRCxFQUNoRCxzQ0FBc0MsR0FDdkMsTUFBTSxpQkFBaUIsQ0FBQzs7QUFFekIsTUFBTSxxQkFBcUIsR0FBYztJQUN2QyxhQUFhLEVBQUU7UUFDYiw0QkFBNEIsRUFBRTtZQUM1QixTQUFTLEVBQUUsZ0NBQWdDO1lBQzNDLHlDQUF5QztTQUMxQztLQUNGO0NBQ0YsQ0FBQztBQUVGLE1BQU0sZ0JBQWdCLEdBQUc7SUFDdkIsZ0NBQWdDO0lBQ2hDLGdEQUFnRDtJQUNoRCxzQ0FBc0M7Q0FDdkMsQ0FBQztBQThCRixNQUFNLE9BQU8sa0JBQWtCOzsrR0FBbEIsa0JBQWtCO2dIQUFsQixrQkFBa0IsaUJBaEJkLHFCQUFxQixFQWpCcEMsZ0NBQWdDO1FBQ2hDLGdEQUFnRDtRQUNoRCxzQ0FBc0MsYUFLcEMsWUFBWTtRQUNaLFlBQVk7UUFDWixXQUFXO1FBQ1gsY0FBYztRQUNkLG9CQUFvQjtRQUNwQixTQUFTO1FBQ1QsVUFBVTtRQUNWLGFBQWE7UUFDYixXQUFXLGFBR0gscUJBQXFCLEVBbEIvQixnQ0FBZ0M7UUFDaEMsZ0RBQWdEO1FBQ2hELHNDQUFzQztnSEErQjNCLGtCQUFrQixhQWRsQjtRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYiw0QkFBNEIsRUFBRTtvQkFDNUIsU0FBUyxFQUFFLHFCQUFxQjtvQkFDaEMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO2lCQUNwQjthQUNGO1NBQ0YsQ0FBQztRQUNGLDJCQUEyQixDQUFDLEdBQUcsRUFBRSxDQUMvQixNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDN0Q7S0FDRixZQXhCQyxZQUFZO1FBQ1osWUFBWTtRQUNaLFdBQVc7UUFDWCxjQUFjO1FBQ2Qsb0JBQW9CO1FBQ3BCLFNBQVM7UUFDVCxVQUFVO1FBQ1YsYUFBYTtRQUNiLFdBQVc7MkZBa0JGLGtCQUFrQjtrQkE1QjlCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixXQUFXO3dCQUNYLGNBQWM7d0JBQ2Qsb0JBQW9CO3dCQUNwQixTQUFTO3dCQUNULFVBQVU7d0JBQ1YsYUFBYTt3QkFDYixXQUFXO3FCQUNaO29CQUNELFlBQVksRUFBRSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsZ0JBQWdCLENBQUM7b0JBQzFELE9BQU8sRUFBRSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsZ0JBQWdCLENBQUM7b0JBQ3JELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLDRCQUE0QixFQUFFO29DQUM1QixTQUFTLEVBQUUscUJBQXFCO29DQUNoQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7aUNBQ3BCOzZCQUNGO3lCQUNGLENBQUM7d0JBQ0YsMkJBQTJCLENBQUMsR0FBRyxFQUFFLENBQy9CLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUM3RDtxQkFDRjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBpbmplY3QsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBOZ1NlbGVjdE1vZHVsZSB9IGZyb20gJ0BuZy1zZWxlY3Qvbmctc2VsZWN0JztcbmltcG9ydCB7XG4gIEF1dGhHdWFyZCxcbiAgQ21zQ29uZmlnLFxuICBJMThuTW9kdWxlLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5LFxuICBVcmxNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBMaXN0TmF2aWdhdGlvbk1vZHVsZSxcbiAgTWVkaWFNb2R1bGUsXG4gIFNwaW5uZXJNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBPcmRlckhpc3RvcnlDb21wb25lbnQgfSBmcm9tICcuL29yZGVyLWhpc3RvcnkuY29tcG9uZW50JztcbmltcG9ydCB7IFVTRV9NWV9BQ0NPVU5UX1YyX09SREVSIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmRlci9yb290JztcbmltcG9ydCB7XG4gIE15QWNjb3VudFYyT3JkZXJIaXN0b3J5Q29tcG9uZW50LFxuICBNeUFjY291bnRWMk9yZGVyQ29uc29saWRhdGVkSW5mb3JtYXRpb25Db21wb25lbnQsXG4gIE15QWNjb3VudFYyQ29uc2lnbm1lbnRFbnRyaWVzQ29tcG9uZW50LFxufSBmcm9tICcuL215LWFjY291bnQtdjInO1xuXG5jb25zdCBteUFjY291bnRWMkNtc01hcHBpbmc6IENtc0NvbmZpZyA9IHtcbiAgY21zQ29tcG9uZW50czoge1xuICAgIEFjY291bnRPcmRlckhpc3RvcnlDb21wb25lbnQ6IHtcbiAgICAgIGNvbXBvbmVudDogTXlBY2NvdW50VjJPcmRlckhpc3RvcnlDb21wb25lbnQsXG4gICAgICAvL2d1YXJkczogaW5oZXJpdGVkIGZyb20gc3RhbmRhcmQgY29uZmlnLFxuICAgIH0sXG4gIH0sXG59O1xuXG5jb25zdCBtb2R1bGVDb21wb25lbnRzID0gW1xuICBNeUFjY291bnRWMk9yZGVySGlzdG9yeUNvbXBvbmVudCxcbiAgTXlBY2NvdW50VjJPcmRlckNvbnNvbGlkYXRlZEluZm9ybWF0aW9uQ29tcG9uZW50LFxuICBNeUFjY291bnRWMkNvbnNpZ25tZW50RW50cmllc0NvbXBvbmVudCxcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE5nU2VsZWN0TW9kdWxlLFxuICAgIExpc3ROYXZpZ2F0aW9uTW9kdWxlLFxuICAgIFVybE1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIFNwaW5uZXJNb2R1bGUsXG4gICAgTWVkaWFNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW09yZGVySGlzdG9yeUNvbXBvbmVudCwgLi4ubW9kdWxlQ29tcG9uZW50c10sXG4gIGV4cG9ydHM6IFtPcmRlckhpc3RvcnlDb21wb25lbnQsIC4uLm1vZHVsZUNvbXBvbmVudHNdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgQWNjb3VudE9yZGVySGlzdG9yeUNvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogT3JkZXJIaXN0b3J5Q29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW0F1dGhHdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeSgoKSA9PlxuICAgICAgaW5qZWN0KFVTRV9NWV9BQ0NPVU5UX1YyX09SREVSKSA/IG15QWNjb3VudFYyQ21zTWFwcGluZyA6IHt9XG4gICAgKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgT3JkZXJIaXN0b3J5TW9kdWxlIHt9XG4iXX0=