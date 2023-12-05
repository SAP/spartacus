/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { CHECKOUT_CORE_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class CheckoutPaymentFacade {
}
CheckoutPaymentFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutPaymentFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: CheckoutPaymentFacade,
        feature: CHECKOUT_CORE_FEATURE,
        methods: [
            'getPaymentCardTypesState',
            'getPaymentCardTypes',
            'getPaymentDetailsState',
            'createPaymentDetails',
            'setPaymentDetails',
        ],
        // TODO:#deprecation-checkout - remove once we remove ngrx
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: CheckoutPaymentFacade,
                        feature: CHECKOUT_CORE_FEATURE,
                        methods: [
                            'getPaymentCardTypesState',
                            'getPaymentCardTypes',
                            'getPaymentDetailsState',
                            'createPaymentDetails',
                            'setPaymentDetails',
                        ],
                        // TODO:#deprecation-checkout - remove once we remove ngrx
                        async: true,
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtcGF5bWVudC5mYWNhZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYmFzZS9yb290L2ZhY2FkZS9jaGVja291dC1wYXltZW50LmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsYUFBYSxFQUFjLE1BQU0saUJBQWlCLENBQUM7QUFFNUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBbUJ4RCxNQUFNLE9BQWdCLHFCQUFxQjs7a0hBQXJCLHFCQUFxQjtzSEFBckIscUJBQXFCLGNBaEI3QixNQUFNLGNBQ04sR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO1FBQ1osTUFBTSxFQUFFLHFCQUFxQjtRQUM3QixPQUFPLEVBQUUscUJBQXFCO1FBQzlCLE9BQU8sRUFBRTtZQUNQLDBCQUEwQjtZQUMxQixxQkFBcUI7WUFDckIsd0JBQXdCO1lBQ3hCLHNCQUFzQjtZQUN0QixtQkFBbUI7U0FDcEI7UUFDRCwwREFBMEQ7UUFDMUQsS0FBSyxFQUFFLElBQUk7S0FDWixDQUFDOzJGQUVnQixxQkFBcUI7a0JBakIxQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO29CQUNsQixVQUFVLEVBQUUsR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO3dCQUNaLE1BQU0sdUJBQXVCO3dCQUM3QixPQUFPLEVBQUUscUJBQXFCO3dCQUM5QixPQUFPLEVBQUU7NEJBQ1AsMEJBQTBCOzRCQUMxQixxQkFBcUI7NEJBQ3JCLHdCQUF3Qjs0QkFDeEIsc0JBQXNCOzRCQUN0QixtQkFBbUI7eUJBQ3BCO3dCQUNELDBEQUEwRDt3QkFDMUQsS0FBSyxFQUFFLElBQUk7cUJBQ1osQ0FBQztpQkFDTCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhcmRUeXBlLCBQYXltZW50RGV0YWlscyB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgZmFjYWRlRmFjdG9yeSwgUXVlcnlTdGF0ZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDSEVDS09VVF9DT1JFX0ZFQVRVUkUgfSBmcm9tICcuLi9mZWF0dXJlLW5hbWUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290JyxcbiAgdXNlRmFjdG9yeTogKCkgPT5cbiAgICBmYWNhZGVGYWN0b3J5KHtcbiAgICAgIGZhY2FkZTogQ2hlY2tvdXRQYXltZW50RmFjYWRlLFxuICAgICAgZmVhdHVyZTogQ0hFQ0tPVVRfQ09SRV9GRUFUVVJFLFxuICAgICAgbWV0aG9kczogW1xuICAgICAgICAnZ2V0UGF5bWVudENhcmRUeXBlc1N0YXRlJyxcbiAgICAgICAgJ2dldFBheW1lbnRDYXJkVHlwZXMnLFxuICAgICAgICAnZ2V0UGF5bWVudERldGFpbHNTdGF0ZScsXG4gICAgICAgICdjcmVhdGVQYXltZW50RGV0YWlscycsXG4gICAgICAgICdzZXRQYXltZW50RGV0YWlscycsXG4gICAgICBdLFxuICAgICAgLy8gVE9ETzojZGVwcmVjYXRpb24tY2hlY2tvdXQgLSByZW1vdmUgb25jZSB3ZSByZW1vdmUgbmdyeFxuICAgICAgYXN5bmM6IHRydWUsXG4gICAgfSksXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENoZWNrb3V0UGF5bWVudEZhY2FkZSB7XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjYXJkIHR5cGVzIHN0YXRlXG4gICAqL1xuICBhYnN0cmFjdCBnZXRQYXltZW50Q2FyZFR5cGVzU3RhdGUoKTogT2JzZXJ2YWJsZTxcbiAgICBRdWVyeVN0YXRlPENhcmRUeXBlW10gfCB1bmRlZmluZWQ+XG4gID47XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjYXJkIHR5cGVzLCBvciBhbiBlbXB0eSBhcnJheSBpZiB0aGUgZGF0YSBpcyB1bmRlZmluZWQuXG4gICAqL1xuICBhYnN0cmFjdCBnZXRQYXltZW50Q2FyZFR5cGVzKCk6IE9ic2VydmFibGU8Q2FyZFR5cGVbXT47XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwYXltZW50IGRldGFpbHMgc3RhdGVcbiAgICovXG4gIGFic3RyYWN0IGdldFBheW1lbnREZXRhaWxzU3RhdGUoKTogT2JzZXJ2YWJsZTxcbiAgICBRdWVyeVN0YXRlPFBheW1lbnREZXRhaWxzIHwgdW5kZWZpbmVkPlxuICA+O1xuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgcGF5bWVudCBkZXRhaWxzIHVzaW5nIHRoZSBwcm92aWRlZCBwYXltZW50RGV0YWlsc1xuICAgKi9cbiAgYWJzdHJhY3QgY3JlYXRlUGF5bWVudERldGFpbHMoXG4gICAgcGF5bWVudERldGFpbHM6IFBheW1lbnREZXRhaWxzXG4gICk6IE9ic2VydmFibGU8dW5rbm93bj47XG4gIC8qKlxuICAgKiBTZXRzIHRoZSBwYXltZW50IGRldGFpbHMgdG8gdGhlIGN1cnJlbnQgY2FydFxuICAgKi9cbiAgYWJzdHJhY3Qgc2V0UGF5bWVudERldGFpbHMoXG4gICAgcGF5bWVudERldGFpbHM6IFBheW1lbnREZXRhaWxzXG4gICk6IE9ic2VydmFibGU8dW5rbm93bj47XG59XG4iXX0=