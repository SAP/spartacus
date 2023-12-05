/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { HttpErrorHandler, PageMetaResolver } from '@spartacus/core';
import { CustomerTicketingConnector } from './connectors/customer-ticketing.connector';
import { facadeProviders } from './facade/facade-providers';
import { NotFoundTicketRequestHandler } from './http-interceptors/handlers/not-found-ticket-request.handler';
import { CustomerTicketingPageMetaResolver } from './services/customer-ticketing-page-meta.resolver';
import * as i0 from "@angular/core";
export class CustomerTicketingCoreModule {
}
CustomerTicketingCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CustomerTicketingCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCoreModule });
CustomerTicketingCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCoreModule, providers: [
        ...facadeProviders,
        CustomerTicketingConnector,
        CustomerTicketingPageMetaResolver,
        {
            provide: HttpErrorHandler,
            useExisting: NotFoundTicketRequestHandler,
            multi: true,
        },
        {
            provide: PageMetaResolver,
            useExisting: CustomerTicketingPageMetaResolver,
            multi: true,
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        ...facadeProviders,
                        CustomerTicketingConnector,
                        CustomerTicketingPageMetaResolver,
                        {
                            provide: HttpErrorHandler,
                            useExisting: NotFoundTicketRequestHandler,
                            multi: true,
                        },
                        {
                            provide: PageMetaResolver,
                            useExisting: CustomerTicketingPageMetaResolver,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItdGlja2V0aW5nLWNvcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2N1c3RvbWVyLXRpY2tldGluZy9jb3JlL2N1c3RvbWVyLXRpY2tldGluZy1jb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN2RixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDN0csT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sa0RBQWtELENBQUM7O0FBbUJyRyxNQUFNLE9BQU8sMkJBQTJCOzt3SEFBM0IsMkJBQTJCO3lIQUEzQiwyQkFBMkI7eUhBQTNCLDJCQUEyQixhQWhCM0I7UUFDVCxHQUFHLGVBQWU7UUFDbEIsMEJBQTBCO1FBQzFCLGlDQUFpQztRQUNqQztZQUNFLE9BQU8sRUFBRSxnQkFBZ0I7WUFDekIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxLQUFLLEVBQUUsSUFBSTtTQUNaO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsZ0JBQWdCO1lBQ3pCLFdBQVcsRUFBRSxpQ0FBaUM7WUFDOUMsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGOzJGQUVVLDJCQUEyQjtrQkFqQnZDLFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFO3dCQUNULEdBQUcsZUFBZTt3QkFDbEIsMEJBQTBCO3dCQUMxQixpQ0FBaUM7d0JBQ2pDOzRCQUNFLE9BQU8sRUFBRSxnQkFBZ0I7NEJBQ3pCLFdBQVcsRUFBRSw0QkFBNEI7NEJBQ3pDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxnQkFBZ0I7NEJBQ3pCLFdBQVcsRUFBRSxpQ0FBaUM7NEJBQzlDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBFcnJvckhhbmRsZXIsIFBhZ2VNZXRhUmVzb2x2ZXIgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ3VzdG9tZXJUaWNrZXRpbmdDb25uZWN0b3IgfSBmcm9tICcuL2Nvbm5lY3RvcnMvY3VzdG9tZXItdGlja2V0aW5nLmNvbm5lY3Rvcic7XG5pbXBvcnQgeyBmYWNhZGVQcm92aWRlcnMgfSBmcm9tICcuL2ZhY2FkZS9mYWNhZGUtcHJvdmlkZXJzJztcbmltcG9ydCB7IE5vdEZvdW5kVGlja2V0UmVxdWVzdEhhbmRsZXIgfSBmcm9tICcuL2h0dHAtaW50ZXJjZXB0b3JzL2hhbmRsZXJzL25vdC1mb3VuZC10aWNrZXQtcmVxdWVzdC5oYW5kbGVyJztcbmltcG9ydCB7IEN1c3RvbWVyVGlja2V0aW5nUGFnZU1ldGFSZXNvbHZlciB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tZXItdGlja2V0aW5nLXBhZ2UtbWV0YS5yZXNvbHZlcic7XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIC4uLmZhY2FkZVByb3ZpZGVycyxcbiAgICBDdXN0b21lclRpY2tldGluZ0Nvbm5lY3RvcixcbiAgICBDdXN0b21lclRpY2tldGluZ1BhZ2VNZXRhUmVzb2x2ZXIsXG4gICAge1xuICAgICAgcHJvdmlkZTogSHR0cEVycm9ySGFuZGxlcixcbiAgICAgIHVzZUV4aXN0aW5nOiBOb3RGb3VuZFRpY2tldFJlcXVlc3RIYW5kbGVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBQYWdlTWV0YVJlc29sdmVyLFxuICAgICAgdXNlRXhpc3Rpbmc6IEN1c3RvbWVyVGlja2V0aW5nUGFnZU1ldGFSZXNvbHZlcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyVGlja2V0aW5nQ29yZU1vZHVsZSB7fVxuIl19