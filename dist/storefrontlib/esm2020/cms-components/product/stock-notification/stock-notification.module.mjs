/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockNotificationComponent } from './stock-notification.component';
import { I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { StockNotificationDialogComponent } from './stock-notification-dialog/stock-notification-dialog.component';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { KeyboardFocusModule } from '../../../layout/a11y/keyboard-focus/keyboard-focus.module';
import { RouterModule } from '@angular/router';
import { defaultStockNotificationLayoutConfig } from './stock-notification-dialog/default-stock-notification-layout.config';
import * as i0 from "@angular/core";
export class StockNotificationModule {
}
StockNotificationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StockNotificationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StockNotificationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: StockNotificationModule, declarations: [StockNotificationComponent, StockNotificationDialogComponent], imports: [CommonModule,
        RouterModule,
        I18nModule,
        SpinnerModule,
        UrlModule,
        KeyboardFocusModule], exports: [StockNotificationComponent, StockNotificationDialogComponent] });
StockNotificationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StockNotificationModule, providers: [
        provideDefaultConfig(defaultStockNotificationLayoutConfig),
        provideDefaultConfig({
            cmsComponents: {
                StockNotificationComponent: {
                    component: StockNotificationComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        RouterModule,
        I18nModule,
        SpinnerModule,
        UrlModule,
        KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StockNotificationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [StockNotificationComponent, StockNotificationDialogComponent],
                    imports: [
                        CommonModule,
                        RouterModule,
                        I18nModule,
                        SpinnerModule,
                        UrlModule,
                        KeyboardFocusModule,
                    ],
                    providers: [
                        provideDefaultConfig(defaultStockNotificationLayoutConfig),
                        provideDefaultConfig({
                            cmsComponents: {
                                StockNotificationComponent: {
                                    component: StockNotificationComponent,
                                },
                            },
                        }),
                    ],
                    exports: [StockNotificationComponent, StockNotificationDialogComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvY2stbm90aWZpY2F0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvcHJvZHVjdC9zdG9jay1ub3RpZmljYXRpb24vc3RvY2stbm90aWZpY2F0aW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDNUUsT0FBTyxFQUVMLFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsU0FBUyxHQUNWLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0saUVBQWlFLENBQUM7QUFDbkgsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDJEQUEyRCxDQUFDO0FBQ2hHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsb0NBQW9DLEVBQUUsTUFBTSxzRUFBc0UsQ0FBQzs7QUF3QjVILE1BQU0sT0FBTyx1QkFBdUI7O29IQUF2Qix1QkFBdUI7cUhBQXZCLHVCQUF1QixpQkFyQm5CLDBCQUEwQixFQUFFLGdDQUFnQyxhQUV6RSxZQUFZO1FBQ1osWUFBWTtRQUNaLFVBQVU7UUFDVixhQUFhO1FBQ2IsU0FBUztRQUNULG1CQUFtQixhQVlYLDBCQUEwQixFQUFFLGdDQUFnQztxSEFFM0QsdUJBQXVCLGFBWnZCO1FBQ1Qsb0JBQW9CLENBQUMsb0NBQW9DLENBQUM7UUFDMUQsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLDBCQUEwQixFQUFFO29CQUMxQixTQUFTLEVBQUUsMEJBQTBCO2lCQUN0QzthQUNGO1NBQ0YsQ0FBQztLQUNILFlBaEJDLFlBQVk7UUFDWixZQUFZO1FBQ1osVUFBVTtRQUNWLGFBQWE7UUFDYixTQUFTO1FBQ1QsbUJBQW1COzJGQWNWLHVCQUF1QjtrQkF0Qm5DLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMsMEJBQTBCLEVBQUUsZ0NBQWdDLENBQUM7b0JBQzVFLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixhQUFhO3dCQUNiLFNBQVM7d0JBQ1QsbUJBQW1CO3FCQUNwQjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQUMsb0NBQW9DLENBQUM7d0JBQzFELG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2IsMEJBQTBCLEVBQUU7b0NBQzFCLFNBQVMsRUFBRSwwQkFBMEI7aUNBQ3RDOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsT0FBTyxFQUFFLENBQUMsMEJBQTBCLEVBQUUsZ0NBQWdDLENBQUM7aUJBQ3hFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTdG9ja05vdGlmaWNhdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vc3RvY2stbm90aWZpY2F0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBDbXNDb25maWcsXG4gIEkxOG5Nb2R1bGUsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxuICBVcmxNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBTdG9ja05vdGlmaWNhdGlvbkRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vc3RvY2stbm90aWZpY2F0aW9uLWRpYWxvZy9zdG9jay1ub3RpZmljYXRpb24tZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTcGlubmVyTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyLm1vZHVsZSc7XG5pbXBvcnQgeyBLZXlib2FyZEZvY3VzTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vbGF5b3V0L2ExMXkva2V5Ym9hcmQtZm9jdXMva2V5Ym9hcmQtZm9jdXMubW9kdWxlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBkZWZhdWx0U3RvY2tOb3RpZmljYXRpb25MYXlvdXRDb25maWcgfSBmcm9tICcuL3N0b2NrLW5vdGlmaWNhdGlvbi1kaWFsb2cvZGVmYXVsdC1zdG9jay1ub3RpZmljYXRpb24tbGF5b3V0LmNvbmZpZyc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1N0b2NrTm90aWZpY2F0aW9uQ29tcG9uZW50LCBTdG9ja05vdGlmaWNhdGlvbkRpYWxvZ0NvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgU3Bpbm5lck1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgS2V5Ym9hcmRGb2N1c01vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdFN0b2NrTm90aWZpY2F0aW9uTGF5b3V0Q29uZmlnKSxcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgU3RvY2tOb3RpZmljYXRpb25Db21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IFN0b2NrTm90aWZpY2F0aW9uQ29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZXhwb3J0czogW1N0b2NrTm90aWZpY2F0aW9uQ29tcG9uZW50LCBTdG9ja05vdGlmaWNhdGlvbkRpYWxvZ0NvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIFN0b2NrTm90aWZpY2F0aW9uTW9kdWxlIHt9XG4iXX0=