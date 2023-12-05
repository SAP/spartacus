/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { HttpErrorHandler } from '@spartacus/core';
import { RequestedDeliveryDateFacade } from '@spartacus/requested-delivery-date/root';
import { RequestedDeliveryDateConnector } from './connectors/requested-delivery-date.connector';
import { RequestedDeliveryDateBadRequestHandler } from './http-interceptors/bad-request/requested-delivery-date-badrequest.handler';
import { RequestedDeliveryDateService } from './services';
import * as i0 from "@angular/core";
export class RequestedDeliveryDateCoreModule {
}
RequestedDeliveryDateCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RequestedDeliveryDateCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateCoreModule });
RequestedDeliveryDateCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateCoreModule, providers: [
        RequestedDeliveryDateService,
        {
            provide: RequestedDeliveryDateFacade,
            useExisting: RequestedDeliveryDateService,
        },
        {
            provide: HttpErrorHandler,
            useExisting: RequestedDeliveryDateBadRequestHandler,
            multi: true,
        },
        RequestedDeliveryDateConnector,
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                    providers: [
                        RequestedDeliveryDateService,
                        {
                            provide: RequestedDeliveryDateFacade,
                            useExisting: RequestedDeliveryDateService,
                        },
                        {
                            provide: HttpErrorHandler,
                            useExisting: RequestedDeliveryDateBadRequestHandler,
                            multi: true,
                        },
                        RequestedDeliveryDateConnector,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdGVkLWRlbGl2ZXJ5LWRhdGUtY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcmVxdWVzdGVkLWRlbGl2ZXJ5LWRhdGUvY29yZS9yZXF1ZXN0ZWQtZGVsaXZlcnktZGF0ZS1jb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN0RixPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUNoRyxPQUFPLEVBQUUsc0NBQXNDLEVBQUUsTUFBTSw0RUFBNEUsQ0FBQztBQUNwSSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxZQUFZLENBQUM7O0FBa0IxRCxNQUFNLE9BQU8sK0JBQStCOzs0SEFBL0IsK0JBQStCOzZIQUEvQiwrQkFBK0I7NkhBQS9CLCtCQUErQixhQWQvQjtRQUNULDRCQUE0QjtRQUM1QjtZQUNFLE9BQU8sRUFBRSwyQkFBMkI7WUFDcEMsV0FBVyxFQUFFLDRCQUE0QjtTQUMxQztRQUNEO1lBQ0UsT0FBTyxFQUFFLGdCQUFnQjtZQUN6QixXQUFXLEVBQUUsc0NBQXNDO1lBQ25ELEtBQUssRUFBRSxJQUFJO1NBQ1o7UUFDRCw4QkFBOEI7S0FDL0I7MkZBRVUsK0JBQStCO2tCQWhCM0MsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsRUFBRTtvQkFDWCxTQUFTLEVBQUU7d0JBQ1QsNEJBQTRCO3dCQUM1Qjs0QkFDRSxPQUFPLEVBQUUsMkJBQTJCOzRCQUNwQyxXQUFXLEVBQUUsNEJBQTRCO3lCQUMxQzt3QkFDRDs0QkFDRSxPQUFPLEVBQUUsZ0JBQWdCOzRCQUN6QixXQUFXLEVBQUUsc0NBQXNDOzRCQUNuRCxLQUFLLEVBQUUsSUFBSTt5QkFDWjt3QkFDRCw4QkFBOEI7cUJBQy9CO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBFcnJvckhhbmRsZXIgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUmVxdWVzdGVkRGVsaXZlcnlEYXRlRmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy9yZXF1ZXN0ZWQtZGVsaXZlcnktZGF0ZS9yb290JztcbmltcG9ydCB7IFJlcXVlc3RlZERlbGl2ZXJ5RGF0ZUNvbm5lY3RvciB9IGZyb20gJy4vY29ubmVjdG9ycy9yZXF1ZXN0ZWQtZGVsaXZlcnktZGF0ZS5jb25uZWN0b3InO1xuaW1wb3J0IHsgUmVxdWVzdGVkRGVsaXZlcnlEYXRlQmFkUmVxdWVzdEhhbmRsZXIgfSBmcm9tICcuL2h0dHAtaW50ZXJjZXB0b3JzL2JhZC1yZXF1ZXN0L3JlcXVlc3RlZC1kZWxpdmVyeS1kYXRlLWJhZHJlcXVlc3QuaGFuZGxlcic7XG5pbXBvcnQgeyBSZXF1ZXN0ZWREZWxpdmVyeURhdGVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtdLFxuICBwcm92aWRlcnM6IFtcbiAgICBSZXF1ZXN0ZWREZWxpdmVyeURhdGVTZXJ2aWNlLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFJlcXVlc3RlZERlbGl2ZXJ5RGF0ZUZhY2FkZSxcbiAgICAgIHVzZUV4aXN0aW5nOiBSZXF1ZXN0ZWREZWxpdmVyeURhdGVTZXJ2aWNlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogSHR0cEVycm9ySGFuZGxlcixcbiAgICAgIHVzZUV4aXN0aW5nOiBSZXF1ZXN0ZWREZWxpdmVyeURhdGVCYWRSZXF1ZXN0SGFuZGxlcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAgUmVxdWVzdGVkRGVsaXZlcnlEYXRlQ29ubmVjdG9yLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBSZXF1ZXN0ZWREZWxpdmVyeURhdGVDb3JlTW9kdWxlIHt9XG4iXX0=