/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuickOrderOrderEntriesContextToken } from '@spartacus/cart/quick-order/root';
import { CartQuickOrderFormModule } from './cart-quick-order-form/cart-quick-order-form.module';
import { QuickOrderOrderEntriesContext } from './page-context/quick-order-order-entries.context';
import { QuickOrderListModule } from './quick-order/quick-order-list.module';
import * as i0 from "@angular/core";
export class QuickOrderComponentsModule {
}
QuickOrderComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
QuickOrderComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderComponentsModule, imports: [RouterModule, QuickOrderListModule, CartQuickOrderFormModule] });
QuickOrderComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderComponentsModule, providers: [
        {
            provide: QuickOrderOrderEntriesContextToken,
            useExisting: QuickOrderOrderEntriesContext,
        },
    ], imports: [RouterModule, QuickOrderListModule, CartQuickOrderFormModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RouterModule, QuickOrderListModule, CartQuickOrderFormModule],
                    providers: [
                        {
                            provide: QuickOrderOrderEntriesContextToken,
                            useExisting: QuickOrderOrderEntriesContext,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpY2stb3JkZXItY29tcG9uZW50cy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9xdWljay1vcmRlci9jb21wb25lbnRzL3F1aWNrLW9yZGVyLWNvbXBvbmVudHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUNoRyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUNqRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7QUFXN0UsTUFBTSxPQUFPLDBCQUEwQjs7dUhBQTFCLDBCQUEwQjt3SEFBMUIsMEJBQTBCLFlBUjNCLFlBQVksRUFBRSxvQkFBb0IsRUFBRSx3QkFBd0I7d0hBUTNELDBCQUEwQixhQVAxQjtRQUNUO1lBQ0UsT0FBTyxFQUFFLGtDQUFrQztZQUMzQyxXQUFXLEVBQUUsNkJBQTZCO1NBQzNDO0tBQ0YsWUFOUyxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsd0JBQXdCOzJGQVEzRCwwQkFBMEI7a0JBVHRDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLG9CQUFvQixFQUFFLHdCQUF3QixDQUFDO29CQUN2RSxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGtDQUFrQzs0QkFDM0MsV0FBVyxFQUFFLDZCQUE2Qjt5QkFDM0M7cUJBQ0Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFF1aWNrT3JkZXJPcmRlckVudHJpZXNDb250ZXh0VG9rZW4gfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvcXVpY2stb3JkZXIvcm9vdCc7XG5pbXBvcnQgeyBDYXJ0UXVpY2tPcmRlckZvcm1Nb2R1bGUgfSBmcm9tICcuL2NhcnQtcXVpY2stb3JkZXItZm9ybS9jYXJ0LXF1aWNrLW9yZGVyLWZvcm0ubW9kdWxlJztcbmltcG9ydCB7IFF1aWNrT3JkZXJPcmRlckVudHJpZXNDb250ZXh0IH0gZnJvbSAnLi9wYWdlLWNvbnRleHQvcXVpY2stb3JkZXItb3JkZXItZW50cmllcy5jb250ZXh0JztcbmltcG9ydCB7IFF1aWNrT3JkZXJMaXN0TW9kdWxlIH0gZnJvbSAnLi9xdWljay1vcmRlci9xdWljay1vcmRlci1saXN0Lm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtSb3V0ZXJNb2R1bGUsIFF1aWNrT3JkZXJMaXN0TW9kdWxlLCBDYXJ0UXVpY2tPcmRlckZvcm1Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBRdWlja09yZGVyT3JkZXJFbnRyaWVzQ29udGV4dFRva2VuLFxuICAgICAgdXNlRXhpc3Rpbmc6IFF1aWNrT3JkZXJPcmRlckVudHJpZXNDb250ZXh0LFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFF1aWNrT3JkZXJDb21wb25lbnRzTW9kdWxlIHt9XG4iXX0=