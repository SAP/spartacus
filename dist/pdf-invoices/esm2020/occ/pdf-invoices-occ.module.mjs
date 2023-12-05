/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { PDFInvoicesAdapter } from '@spartacus/pdf-invoices/core';
import { OccPDFInvoicesAdapter } from './adapters/occ-pdf-invoices.adapter';
import { defaultOccPDFInvoicesConfig } from './config/default-occ-pdf-invoices-config';
import * as i0 from "@angular/core";
export class PDFInvoicesOccModule {
}
PDFInvoicesOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PDFInvoicesOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesOccModule, imports: [CommonModule] });
PDFInvoicesOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesOccModule, providers: [
        provideDefaultConfig(defaultOccPDFInvoicesConfig),
        {
            provide: PDFInvoicesAdapter,
            useClass: OccPDFInvoicesAdapter,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccPDFInvoicesConfig),
                        {
                            provide: PDFInvoicesAdapter,
                            useClass: OccPDFInvoicesAdapter,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmLWludm9pY2VzLW9jYy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcGRmLWludm9pY2VzL29jYy9wZGYtaW52b2ljZXMtb2NjLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sMENBQTBDLENBQUM7O0FBWXZGLE1BQU0sT0FBTyxvQkFBb0I7O2lIQUFwQixvQkFBb0I7a0hBQXBCLG9CQUFvQixZQVRyQixZQUFZO2tIQVNYLG9CQUFvQixhQVJwQjtRQUNULG9CQUFvQixDQUFDLDJCQUEyQixDQUFDO1FBQ2pEO1lBQ0UsT0FBTyxFQUFFLGtCQUFrQjtZQUMzQixRQUFRLEVBQUUscUJBQXFCO1NBQ2hDO0tBQ0YsWUFQUyxZQUFZOzJGQVNYLG9CQUFvQjtrQkFWaEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBQywyQkFBMkIsQ0FBQzt3QkFDakQ7NEJBQ0UsT0FBTyxFQUFFLGtCQUFrQjs0QkFDM0IsUUFBUSxFQUFFLHFCQUFxQjt5QkFDaEM7cUJBQ0Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFBERkludm9pY2VzQWRhcHRlciB9IGZyb20gJ0BzcGFydGFjdXMvcGRmLWludm9pY2VzL2NvcmUnO1xuaW1wb3J0IHsgT2NjUERGSW52b2ljZXNBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVycy9vY2MtcGRmLWludm9pY2VzLmFkYXB0ZXInO1xuaW1wb3J0IHsgZGVmYXVsdE9jY1BERkludm9pY2VzQ29uZmlnIH0gZnJvbSAnLi9jb25maWcvZGVmYXVsdC1vY2MtcGRmLWludm9pY2VzLWNvbmZpZyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0T2NjUERGSW52b2ljZXNDb25maWcpLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFBERkludm9pY2VzQWRhcHRlcixcbiAgICAgIHVzZUNsYXNzOiBPY2NQREZJbnZvaWNlc0FkYXB0ZXIsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUERGSW52b2ljZXNPY2NNb2R1bGUge31cbiJdfQ==