/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { HttpErrorHandler } from '@spartacus/core';
import { PDFInvoicesFacade } from '@spartacus/pdf-invoices/root';
import { PDFInvoicesConnector } from './connectors/pdf-invoices.connector';
import { PDFInvoicesBadRequestHandler } from './http-interceptors/bad-request/pdf-invoices-badrequest.handler';
import { PDFInvoicesService } from './services';
import * as i0 from "@angular/core";
export class PDFInvoicesCoreModule {
}
PDFInvoicesCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PDFInvoicesCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesCoreModule });
PDFInvoicesCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesCoreModule, providers: [
        PDFInvoicesService,
        {
            provide: PDFInvoicesFacade,
            useExisting: PDFInvoicesService,
        },
        {
            provide: HttpErrorHandler,
            useExisting: PDFInvoicesBadRequestHandler,
            multi: true,
        },
        PDFInvoicesConnector,
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                    providers: [
                        PDFInvoicesService,
                        {
                            provide: PDFInvoicesFacade,
                            useExisting: PDFInvoicesService,
                        },
                        {
                            provide: HttpErrorHandler,
                            useExisting: PDFInvoicesBadRequestHandler,
                            multi: true,
                        },
                        PDFInvoicesConnector,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmLWludm9pY2VzLWNvcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3BkZi1pbnZvaWNlcy9jb3JlL3BkZi1pbnZvaWNlcy1jb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxpRUFBaUUsQ0FBQztBQUMvRyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxZQUFZLENBQUM7O0FBa0JoRCxNQUFNLE9BQU8scUJBQXFCOztrSEFBckIscUJBQXFCO21IQUFyQixxQkFBcUI7bUhBQXJCLHFCQUFxQixhQWRyQjtRQUNULGtCQUFrQjtRQUNsQjtZQUNFLE9BQU8sRUFBRSxpQkFBaUI7WUFDMUIsV0FBVyxFQUFFLGtCQUFrQjtTQUNoQztRQUNEO1lBQ0UsT0FBTyxFQUFFLGdCQUFnQjtZQUN6QixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLEtBQUssRUFBRSxJQUFJO1NBQ1o7UUFDRCxvQkFBb0I7S0FDckI7MkZBRVUscUJBQXFCO2tCQWhCakMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsRUFBRTtvQkFDWCxTQUFTLEVBQUU7d0JBQ1Qsa0JBQWtCO3dCQUNsQjs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsa0JBQWtCO3lCQUNoQzt3QkFDRDs0QkFDRSxPQUFPLEVBQUUsZ0JBQWdCOzRCQUN6QixXQUFXLEVBQUUsNEJBQTRCOzRCQUN6QyxLQUFLLEVBQUUsSUFBSTt5QkFDWjt3QkFDRCxvQkFBb0I7cUJBQ3JCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBFcnJvckhhbmRsZXIgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUERGSW52b2ljZXNGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL3BkZi1pbnZvaWNlcy9yb290JztcbmltcG9ydCB7IFBERkludm9pY2VzQ29ubmVjdG9yIH0gZnJvbSAnLi9jb25uZWN0b3JzL3BkZi1pbnZvaWNlcy5jb25uZWN0b3InO1xuaW1wb3J0IHsgUERGSW52b2ljZXNCYWRSZXF1ZXN0SGFuZGxlciB9IGZyb20gJy4vaHR0cC1pbnRlcmNlcHRvcnMvYmFkLXJlcXVlc3QvcGRmLWludm9pY2VzLWJhZHJlcXVlc3QuaGFuZGxlcic7XG5pbXBvcnQgeyBQREZJbnZvaWNlc1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW10sXG4gIHByb3ZpZGVyczogW1xuICAgIFBERkludm9pY2VzU2VydmljZSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBQREZJbnZvaWNlc0ZhY2FkZSxcbiAgICAgIHVzZUV4aXN0aW5nOiBQREZJbnZvaWNlc1NlcnZpY2UsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBIdHRwRXJyb3JIYW5kbGVyLFxuICAgICAgdXNlRXhpc3Rpbmc6IFBERkludm9pY2VzQmFkUmVxdWVzdEhhbmRsZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIFBERkludm9pY2VzQ29ubmVjdG9yLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBQREZJbnZvaWNlc0NvcmVNb2R1bGUge31cbiJdfQ==