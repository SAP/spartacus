/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { CHECKOUT_CORE_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class CheckoutQueryFacade {
}
CheckoutQueryFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutQueryFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutQueryFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutQueryFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: CheckoutQueryFacade,
        feature: CHECKOUT_CORE_FEATURE,
        methods: ['getCheckoutDetailsState'],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutQueryFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: CheckoutQueryFacade,
                        feature: CHECKOUT_CORE_FEATURE,
                        methods: ['getCheckoutDetailsState'],
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtcXVlcnkuZmFjYWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NoZWNrb3V0L2Jhc2Uvcm9vdC9mYWNhZGUvY2hlY2tvdXQtcXVlcnkuZmFjYWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQWMsTUFBTSxpQkFBaUIsQ0FBQztBQUU1RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFZeEQsTUFBTSxPQUFnQixtQkFBbUI7O2dIQUFuQixtQkFBbUI7b0hBQW5CLG1CQUFtQixjQVIzQixNQUFNLGNBQ04sR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO1FBQ1osTUFBTSxFQUFFLG1CQUFtQjtRQUMzQixPQUFPLEVBQUUscUJBQXFCO1FBQzlCLE9BQU8sRUFBRSxDQUFDLHlCQUF5QixDQUFDO0tBQ3JDLENBQUM7MkZBRWdCLG1CQUFtQjtrQkFUeEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtvQkFDbEIsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUNmLGFBQWEsQ0FBQzt3QkFDWixNQUFNLHFCQUFxQjt3QkFDM0IsT0FBTyxFQUFFLHFCQUFxQjt3QkFDOUIsT0FBTyxFQUFFLENBQUMseUJBQXlCLENBQUM7cUJBQ3JDLENBQUM7aUJBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmYWNhZGVGYWN0b3J5LCBRdWVyeVN0YXRlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENIRUNLT1VUX0NPUkVfRkVBVFVSRSB9IGZyb20gJy4uL2ZlYXR1cmUtbmFtZSc7XG5pbXBvcnQgeyBDaGVja291dFN0YXRlIH0gZnJvbSAnLi4vbW9kZWwvY2hlY2tvdXQtc3RhdGUubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290JyxcbiAgdXNlRmFjdG9yeTogKCkgPT5cbiAgICBmYWNhZGVGYWN0b3J5KHtcbiAgICAgIGZhY2FkZTogQ2hlY2tvdXRRdWVyeUZhY2FkZSxcbiAgICAgIGZlYXR1cmU6IENIRUNLT1VUX0NPUkVfRkVBVFVSRSxcbiAgICAgIG1ldGhvZHM6IFsnZ2V0Q2hlY2tvdXREZXRhaWxzU3RhdGUnXSxcbiAgICB9KSxcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ2hlY2tvdXRRdWVyeUZhY2FkZSB7XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjaGVja291dCBkZXRhaWxzIHN0YXRlLlxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0Q2hlY2tvdXREZXRhaWxzU3RhdGUoKTogT2JzZXJ2YWJsZTxcbiAgICBRdWVyeVN0YXRlPENoZWNrb3V0U3RhdGUgfCB1bmRlZmluZWQ+XG4gID47XG59XG4iXX0=