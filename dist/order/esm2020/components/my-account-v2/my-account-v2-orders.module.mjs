/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UrlModule, I18nModule, provideDefaultConfig, AuthGuard, } from '@spartacus/core';
import { MediaModule, SpinnerModule } from '@spartacus/storefront';
import { MyAccountV2OrdersComponent } from './my-account-v2-orders.component';
import * as i0 from "@angular/core";
export class MyAccountV2OrdersModule {
}
MyAccountV2OrdersModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2OrdersModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MyAccountV2OrdersModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2OrdersModule, declarations: [MyAccountV2OrdersComponent], imports: [CommonModule,
        RouterModule,
        FormsModule,
        SpinnerModule,
        UrlModule,
        I18nModule,
        MediaModule], exports: [MyAccountV2OrdersComponent] });
MyAccountV2OrdersModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2OrdersModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                MyAccountViewOrderComponent: {
                    component: MyAccountV2OrdersComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        RouterModule,
        FormsModule,
        SpinnerModule,
        UrlModule,
        I18nModule,
        MediaModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2OrdersModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        FormsModule,
                        SpinnerModule,
                        UrlModule,
                        I18nModule,
                        MediaModule,
                    ],
                    declarations: [MyAccountV2OrdersComponent],
                    exports: [MyAccountV2OrdersComponent],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                MyAccountViewOrderComponent: {
                                    component: MyAccountV2OrdersComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktYWNjb3VudC12Mi1vcmRlcnMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZGVyL2NvbXBvbmVudHMvbXktYWNjb3VudC12Mi9teS1hY2NvdW50LXYyLW9yZGVycy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1Ysb0JBQW9CLEVBRXBCLFNBQVMsR0FDVixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbkUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7O0FBeUI5RSxNQUFNLE9BQU8sdUJBQXVCOztvSEFBdkIsdUJBQXVCO3FIQUF2Qix1QkFBdUIsaUJBYm5CLDBCQUEwQixhQVJ2QyxZQUFZO1FBQ1osWUFBWTtRQUNaLFdBQVc7UUFDWCxhQUFhO1FBQ2IsU0FBUztRQUNULFVBQVU7UUFDVixXQUFXLGFBR0gsMEJBQTBCO3FIQVl6Qix1QkFBdUIsYUFYdkI7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2IsMkJBQTJCLEVBQUU7b0JBQzNCLFNBQVMsRUFBRSwwQkFBMEI7b0JBQ3JDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztpQkFDcEI7YUFDRjtTQUNGLENBQUM7S0FDSCxZQW5CQyxZQUFZO1FBQ1osWUFBWTtRQUNaLFdBQVc7UUFDWCxhQUFhO1FBQ2IsU0FBUztRQUNULFVBQVU7UUFDVixXQUFXOzJGQWVGLHVCQUF1QjtrQkF2Qm5DLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixXQUFXO3dCQUNYLGFBQWE7d0JBQ2IsU0FBUzt3QkFDVCxVQUFVO3dCQUNWLFdBQVc7cUJBQ1o7b0JBQ0QsWUFBWSxFQUFFLENBQUMsMEJBQTBCLENBQUM7b0JBQzFDLE9BQU8sRUFBRSxDQUFDLDBCQUEwQixDQUFDO29CQUNyQyxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYiwyQkFBMkIsRUFBRTtvQ0FDM0IsU0FBUyxFQUFFLDBCQUEwQjtvQ0FDckMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO2lDQUNwQjs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBVcmxNb2R1bGUsXG4gIEkxOG5Nb2R1bGUsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxuICBDbXNDb25maWcsXG4gIEF1dGhHdWFyZCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE1lZGlhTW9kdWxlLCBTcGlubmVyTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IE15QWNjb3VudFYyT3JkZXJzQ29tcG9uZW50IH0gZnJvbSAnLi9teS1hY2NvdW50LXYyLW9yZGVycy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBTcGlubmVyTW9kdWxlLFxuICAgIFVybE1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIE1lZGlhTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtNeUFjY291bnRWMk9yZGVyc0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtNeUFjY291bnRWMk9yZGVyc0NvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBNeUFjY291bnRWaWV3T3JkZXJDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IE15QWNjb3VudFYyT3JkZXJzQ29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW0F1dGhHdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNeUFjY291bnRWMk9yZGVyc01vZHVsZSB7fVxuIl19