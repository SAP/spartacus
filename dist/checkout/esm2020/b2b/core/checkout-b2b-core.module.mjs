/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { HttpErrorHandler } from '@spartacus/core';
import { CheckoutCostCenterConnector } from './connectors/checkout-cost-center/checkout-cost-center.connector';
import { CheckoutPaymentTypeConnector } from './connectors/checkout-payment-type/checkout-payment-type.connector';
import { facadeProviders } from './facade/facade-providers';
import { BadCostCenterRequestHandler } from './http-interceptors/bad-request/bad-cost-center-request.handler';
import * as i0 from "@angular/core";
export class CheckoutB2BCoreModule {
}
CheckoutB2BCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutB2BCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BCoreModule });
CheckoutB2BCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BCoreModule, providers: [
        ...facadeProviders,
        CheckoutCostCenterConnector,
        CheckoutPaymentTypeConnector,
        {
            provide: HttpErrorHandler,
            useExisting: BadCostCenterRequestHandler,
            multi: true,
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        ...facadeProviders,
                        CheckoutCostCenterConnector,
                        CheckoutPaymentTypeConnector,
                        {
                            provide: HttpErrorHandler,
                            useExisting: BadCostCenterRequestHandler,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtYjJiLWNvcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NoZWNrb3V0L2IyYi9jb3JlL2NoZWNrb3V0LWIyYi1jb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxrRUFBa0UsQ0FBQztBQUMvRyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxvRUFBb0UsQ0FBQztBQUNsSCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0saUVBQWlFLENBQUM7O0FBYzlHLE1BQU0sT0FBTyxxQkFBcUI7O2tIQUFyQixxQkFBcUI7bUhBQXJCLHFCQUFxQjttSEFBckIscUJBQXFCLGFBWHJCO1FBQ1QsR0FBRyxlQUFlO1FBQ2xCLDJCQUEyQjtRQUMzQiw0QkFBNEI7UUFDNUI7WUFDRSxPQUFPLEVBQUUsZ0JBQWdCO1lBQ3pCLFdBQVcsRUFBRSwyQkFBMkI7WUFDeEMsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGOzJGQUVVLHFCQUFxQjtrQkFaakMsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUU7d0JBQ1QsR0FBRyxlQUFlO3dCQUNsQiwyQkFBMkI7d0JBQzNCLDRCQUE0Qjt3QkFDNUI7NEJBQ0UsT0FBTyxFQUFFLGdCQUFnQjs0QkFDekIsV0FBVyxFQUFFLDJCQUEyQjs0QkFDeEMsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cEVycm9ySGFuZGxlciB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDaGVja291dENvc3RDZW50ZXJDb25uZWN0b3IgfSBmcm9tICcuL2Nvbm5lY3RvcnMvY2hlY2tvdXQtY29zdC1jZW50ZXIvY2hlY2tvdXQtY29zdC1jZW50ZXIuY29ubmVjdG9yJztcbmltcG9ydCB7IENoZWNrb3V0UGF5bWVudFR5cGVDb25uZWN0b3IgfSBmcm9tICcuL2Nvbm5lY3RvcnMvY2hlY2tvdXQtcGF5bWVudC10eXBlL2NoZWNrb3V0LXBheW1lbnQtdHlwZS5jb25uZWN0b3InO1xuaW1wb3J0IHsgZmFjYWRlUHJvdmlkZXJzIH0gZnJvbSAnLi9mYWNhZGUvZmFjYWRlLXByb3ZpZGVycyc7XG5pbXBvcnQgeyBCYWRDb3N0Q2VudGVyUmVxdWVzdEhhbmRsZXIgfSBmcm9tICcuL2h0dHAtaW50ZXJjZXB0b3JzL2JhZC1yZXF1ZXN0L2JhZC1jb3N0LWNlbnRlci1yZXF1ZXN0LmhhbmRsZXInO1xuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICAuLi5mYWNhZGVQcm92aWRlcnMsXG4gICAgQ2hlY2tvdXRDb3N0Q2VudGVyQ29ubmVjdG9yLFxuICAgIENoZWNrb3V0UGF5bWVudFR5cGVDb25uZWN0b3IsXG4gICAge1xuICAgICAgcHJvdmlkZTogSHR0cEVycm9ySGFuZGxlcixcbiAgICAgIHVzZUV4aXN0aW5nOiBCYWRDb3N0Q2VudGVyUmVxdWVzdEhhbmRsZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja291dEIyQkNvcmVNb2R1bGUge31cbiJdfQ==