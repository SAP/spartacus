/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { RequestedDeliveryDateAdapter } from '@spartacus/requested-delivery-date/core';
import { OccRequestedDeliveryDateAdapter } from './adapters/occ-requested-delivery-date.adapter';
import { defaultOccRequestedDeliveryDateConfig } from './config/default-occ-requested-delivery-date-config';
import * as i0 from "@angular/core";
export class RequestedDeliveryDateOccModule {
}
RequestedDeliveryDateOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RequestedDeliveryDateOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateOccModule, imports: [CommonModule] });
RequestedDeliveryDateOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateOccModule, providers: [
        provideDefaultConfig(defaultOccRequestedDeliveryDateConfig),
        {
            provide: RequestedDeliveryDateAdapter,
            useClass: OccRequestedDeliveryDateAdapter,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccRequestedDeliveryDateConfig),
                        {
                            provide: RequestedDeliveryDateAdapter,
                            useClass: OccRequestedDeliveryDateAdapter,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdGVkLWRlbGl2ZXJ5LWRhdGUtb2NjLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9yZXF1ZXN0ZWQtZGVsaXZlcnktZGF0ZS9vY2MvcmVxdWVzdGVkLWRlbGl2ZXJ5LWRhdGUtb2NjLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdkYsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDakcsT0FBTyxFQUFFLHFDQUFxQyxFQUFFLE1BQU0scURBQXFELENBQUM7O0FBWTVHLE1BQU0sT0FBTyw4QkFBOEI7OzJIQUE5Qiw4QkFBOEI7NEhBQTlCLDhCQUE4QixZQVQvQixZQUFZOzRIQVNYLDhCQUE4QixhQVI5QjtRQUNULG9CQUFvQixDQUFDLHFDQUFxQyxDQUFDO1FBQzNEO1lBQ0UsT0FBTyxFQUFFLDRCQUE0QjtZQUNyQyxRQUFRLEVBQUUsK0JBQStCO1NBQzFDO0tBQ0YsWUFQUyxZQUFZOzJGQVNYLDhCQUE4QjtrQkFWMUMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBQyxxQ0FBcUMsQ0FBQzt3QkFDM0Q7NEJBQ0UsT0FBTyxFQUFFLDRCQUE0Qjs0QkFDckMsUUFBUSxFQUFFLCtCQUErQjt5QkFDMUM7cUJBQ0Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFJlcXVlc3RlZERlbGl2ZXJ5RGF0ZUFkYXB0ZXIgfSBmcm9tICdAc3BhcnRhY3VzL3JlcXVlc3RlZC1kZWxpdmVyeS1kYXRlL2NvcmUnO1xuaW1wb3J0IHsgT2NjUmVxdWVzdGVkRGVsaXZlcnlEYXRlQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlcnMvb2NjLXJlcXVlc3RlZC1kZWxpdmVyeS1kYXRlLmFkYXB0ZXInO1xuaW1wb3J0IHsgZGVmYXVsdE9jY1JlcXVlc3RlZERlbGl2ZXJ5RGF0ZUNvbmZpZyB9IGZyb20gJy4vY29uZmlnL2RlZmF1bHQtb2NjLXJlcXVlc3RlZC1kZWxpdmVyeS1kYXRlLWNvbmZpZyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0T2NjUmVxdWVzdGVkRGVsaXZlcnlEYXRlQ29uZmlnKSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBSZXF1ZXN0ZWREZWxpdmVyeURhdGVBZGFwdGVyLFxuICAgICAgdXNlQ2xhc3M6IE9jY1JlcXVlc3RlZERlbGl2ZXJ5RGF0ZUFkYXB0ZXIsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUmVxdWVzdGVkRGVsaXZlcnlEYXRlT2NjTW9kdWxlIHt9XG4iXX0=