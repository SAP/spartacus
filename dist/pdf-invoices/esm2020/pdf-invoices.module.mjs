/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { PDFInvoicesComponentsModule } from '@spartacus/pdf-invoices/components';
import { PDFInvoicesCoreModule } from '@spartacus/pdf-invoices/core';
import { PDFInvoicesOccModule } from '@spartacus/pdf-invoices/occ';
import * as i0 from "@angular/core";
export class PDFInvoicesModule {
}
PDFInvoicesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PDFInvoicesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesModule, imports: [PDFInvoicesComponentsModule,
        PDFInvoicesCoreModule,
        PDFInvoicesOccModule] });
PDFInvoicesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesModule, imports: [PDFInvoicesComponentsModule,
        PDFInvoicesCoreModule,
        PDFInvoicesOccModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        PDFInvoicesComponentsModule,
                        PDFInvoicesCoreModule,
                        PDFInvoicesOccModule,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmLWludm9pY2VzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wZGYtaW52b2ljZXMvcGRmLWludm9pY2VzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDakYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDckUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7O0FBU25FLE1BQU0sT0FBTyxpQkFBaUI7OzhHQUFqQixpQkFBaUI7K0dBQWpCLGlCQUFpQixZQUwxQiwyQkFBMkI7UUFDM0IscUJBQXFCO1FBQ3JCLG9CQUFvQjsrR0FHWCxpQkFBaUIsWUFMMUIsMkJBQTJCO1FBQzNCLHFCQUFxQjtRQUNyQixvQkFBb0I7MkZBR1gsaUJBQWlCO2tCQVA3QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCwyQkFBMkI7d0JBQzNCLHFCQUFxQjt3QkFDckIsb0JBQW9CO3FCQUNyQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBERkludm9pY2VzQ29tcG9uZW50c01vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvcGRmLWludm9pY2VzL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgUERGSW52b2ljZXNDb3JlTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9wZGYtaW52b2ljZXMvY29yZSc7XG5pbXBvcnQgeyBQREZJbnZvaWNlc09jY01vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvcGRmLWludm9pY2VzL29jYyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBQREZJbnZvaWNlc0NvbXBvbmVudHNNb2R1bGUsXG4gICAgUERGSW52b2ljZXNDb3JlTW9kdWxlLFxuICAgIFBERkludm9pY2VzT2NjTW9kdWxlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBQREZJbnZvaWNlc01vZHVsZSB7fVxuIl19