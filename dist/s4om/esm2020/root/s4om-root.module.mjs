/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { PDFInvoicesComponentsModule } from '@spartacus/pdf-invoices/components';
import { RequestedDeliveryDateComponentsModule } from '@spartacus/requested-delivery-date/root';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { ScheduleLinesComponent } from './components/schedule-lines/schedule-lines.component';
import { ScheduleLinesModule } from './components/schedule-lines/schedule-lines.module';
import * as i0 from "@angular/core";
export class S4omRootModule {
}
S4omRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: S4omRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
S4omRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: S4omRootModule, imports: [ScheduleLinesModule,
        RequestedDeliveryDateComponentsModule,
        PDFInvoicesComponentsModule] });
S4omRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: S4omRootModule, providers: [
        provideOutlet({
            id: CartOutlets.ITEM_DETAILS,
            position: OutletPosition.AFTER,
            component: ScheduleLinesComponent,
        }),
    ], imports: [ScheduleLinesModule,
        RequestedDeliveryDateComponentsModule,
        PDFInvoicesComponentsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: S4omRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        ScheduleLinesModule,
                        RequestedDeliveryDateComponentsModule,
                        PDFInvoicesComponentsModule, //Adding dependency with PDF Invoices so that the library gets installed along with S4OM
                    ],
                    providers: [
                        provideOutlet({
                            id: CartOutlets.ITEM_DETAILS,
                            position: OutletPosition.AFTER,
                            component: ScheduleLinesComponent,
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiczRvbS1yb290Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvczRvbS9yb290L3M0b20tcm9vdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxxQ0FBcUMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hHLE9BQU8sRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDOUYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbURBQW1ELENBQUM7O0FBZ0J4RixNQUFNLE9BQU8sY0FBYzs7MkdBQWQsY0FBYzs0R0FBZCxjQUFjLFlBWnZCLG1CQUFtQjtRQUNuQixxQ0FBcUM7UUFDckMsMkJBQTJCOzRHQVVsQixjQUFjLGFBUmQ7UUFDVCxhQUFhLENBQUM7WUFDWixFQUFFLEVBQUUsV0FBVyxDQUFDLFlBQVk7WUFDNUIsUUFBUSxFQUFFLGNBQWMsQ0FBQyxLQUFLO1lBQzlCLFNBQVMsRUFBRSxzQkFBc0I7U0FDbEMsQ0FBQztLQUNILFlBVkMsbUJBQW1CO1FBQ25CLHFDQUFxQztRQUNyQywyQkFBMkI7MkZBVWxCLGNBQWM7a0JBZDFCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLG1CQUFtQjt3QkFDbkIscUNBQXFDO3dCQUNyQywyQkFBMkIsRUFBRSx3RkFBd0Y7cUJBQ3RIO29CQUNELFNBQVMsRUFBRTt3QkFDVCxhQUFhLENBQUM7NEJBQ1osRUFBRSxFQUFFLFdBQVcsQ0FBQyxZQUFZOzRCQUM1QixRQUFRLEVBQUUsY0FBYyxDQUFDLEtBQUs7NEJBQzlCLFNBQVMsRUFBRSxzQkFBc0I7eUJBQ2xDLENBQUM7cUJBQ0g7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FydE91dGxldHMgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7IFBERkludm9pY2VzQ29tcG9uZW50c01vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvcGRmLWludm9pY2VzL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgUmVxdWVzdGVkRGVsaXZlcnlEYXRlQ29tcG9uZW50c01vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvcmVxdWVzdGVkLWRlbGl2ZXJ5LWRhdGUvcm9vdCc7XG5pbXBvcnQgeyBPdXRsZXRQb3NpdGlvbiwgcHJvdmlkZU91dGxldCB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBTY2hlZHVsZUxpbmVzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3NjaGVkdWxlLWxpbmVzL3NjaGVkdWxlLWxpbmVzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTY2hlZHVsZUxpbmVzTW9kdWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3NjaGVkdWxlLWxpbmVzL3NjaGVkdWxlLWxpbmVzLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBTY2hlZHVsZUxpbmVzTW9kdWxlLFxuICAgIFJlcXVlc3RlZERlbGl2ZXJ5RGF0ZUNvbXBvbmVudHNNb2R1bGUsIC8vQWRkaW5nIGRlcGVuZGVuY3kgd2l0aCBSZXF1ZXN0ZWQgRGVsaXZlcnkgRGF0ZSBzbyB0aGF0IHRoZSBsaWJyYXJ5IGdldHMgaW5zdGFsbGVkIGFsb25nIHdpdGggUzRPTVxuICAgIFBERkludm9pY2VzQ29tcG9uZW50c01vZHVsZSwgLy9BZGRpbmcgZGVwZW5kZW5jeSB3aXRoIFBERiBJbnZvaWNlcyBzbyB0aGF0IHRoZSBsaWJyYXJ5IGdldHMgaW5zdGFsbGVkIGFsb25nIHdpdGggUzRPTVxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlT3V0bGV0KHtcbiAgICAgIGlkOiBDYXJ0T3V0bGV0cy5JVEVNX0RFVEFJTFMsXG4gICAgICBwb3NpdGlvbjogT3V0bGV0UG9zaXRpb24uQUZURVIsXG4gICAgICBjb21wb25lbnQ6IFNjaGVkdWxlTGluZXNDb21wb25lbnQsXG4gICAgfSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFM0b21Sb290TW9kdWxlIHt9XG4iXX0=