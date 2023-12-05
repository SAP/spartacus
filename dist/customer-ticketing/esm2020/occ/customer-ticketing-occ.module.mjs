/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { CustomerTicketingAdapter } from '@spartacus/customer-ticketing/core';
import { OccCustomerTicketingAdapter } from './adapters/occ-customer-ticketing.adapter';
import { defaultOccCustomerTicketingConfig } from './config/default-occ-customer-ticketing-config';
import * as i0 from "@angular/core";
export class CustomerTicketingOccModule {
}
CustomerTicketingOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CustomerTicketingOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingOccModule, imports: [CommonModule] });
CustomerTicketingOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingOccModule, providers: [
        provideDefaultConfig(defaultOccCustomerTicketingConfig),
        {
            provide: CustomerTicketingAdapter,
            useClass: OccCustomerTicketingAdapter,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccCustomerTicketingConfig),
                        {
                            provide: CustomerTicketingAdapter,
                            useClass: OccCustomerTicketingAdapter,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItdGlja2V0aW5nLW9jYy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY3VzdG9tZXItdGlja2V0aW5nL29jYy9jdXN0b21lci10aWNrZXRpbmctb2NjLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDOUUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDeEYsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sZ0RBQWdELENBQUM7O0FBWW5HLE1BQU0sT0FBTywwQkFBMEI7O3VIQUExQiwwQkFBMEI7d0hBQTFCLDBCQUEwQixZQVQzQixZQUFZO3dIQVNYLDBCQUEwQixhQVIxQjtRQUNULG9CQUFvQixDQUFDLGlDQUFpQyxDQUFDO1FBQ3ZEO1lBQ0UsT0FBTyxFQUFFLHdCQUF3QjtZQUNqQyxRQUFRLEVBQUUsMkJBQTJCO1NBQ3RDO0tBQ0YsWUFQUyxZQUFZOzJGQVNYLDBCQUEwQjtrQkFWdEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBQyxpQ0FBaUMsQ0FBQzt3QkFDdkQ7NEJBQ0UsT0FBTyxFQUFFLHdCQUF3Qjs0QkFDakMsUUFBUSxFQUFFLDJCQUEyQjt5QkFDdEM7cUJBQ0Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEN1c3RvbWVyVGlja2V0aW5nQWRhcHRlciB9IGZyb20gJ0BzcGFydGFjdXMvY3VzdG9tZXItdGlja2V0aW5nL2NvcmUnO1xuaW1wb3J0IHsgT2NjQ3VzdG9tZXJUaWNrZXRpbmdBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVycy9vY2MtY3VzdG9tZXItdGlja2V0aW5nLmFkYXB0ZXInO1xuaW1wb3J0IHsgZGVmYXVsdE9jY0N1c3RvbWVyVGlja2V0aW5nQ29uZmlnIH0gZnJvbSAnLi9jb25maWcvZGVmYXVsdC1vY2MtY3VzdG9tZXItdGlja2V0aW5nLWNvbmZpZyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0T2NjQ3VzdG9tZXJUaWNrZXRpbmdDb25maWcpLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEN1c3RvbWVyVGlja2V0aW5nQWRhcHRlcixcbiAgICAgIHVzZUNsYXNzOiBPY2NDdXN0b21lclRpY2tldGluZ0FkYXB0ZXIsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJUaWNrZXRpbmdPY2NNb2R1bGUge31cbiJdfQ==