/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CHECKOUT_CORE_FEATURE } from '@spartacus/checkout/base/root';
import { facadeFactory } from '@spartacus/core';
import * as i0 from "@angular/core";
export class CheckoutPaymentTypeFacade {
}
CheckoutPaymentTypeFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutPaymentTypeFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: CheckoutPaymentTypeFacade,
        feature: CHECKOUT_CORE_FEATURE,
        methods: [
            'getPaymentTypes',
            'getPaymentTypesState',
            'setPaymentType',
            'getSelectedPaymentTypeState',
            'isAccountPayment',
            'getPurchaseOrderNumberState',
        ],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: CheckoutPaymentTypeFacade,
                        feature: CHECKOUT_CORE_FEATURE,
                        methods: [
                            'getPaymentTypes',
                            'getPaymentTypesState',
                            'setPaymentType',
                            'getSelectedPaymentTypeState',
                            'isAccountPayment',
                            'getPurchaseOrderNumberState',
                        ],
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtcGF5bWVudC10eXBlLmZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jaGVja291dC9iMmIvcm9vdC9mYWNhZGUvY2hlY2tvdXQtcGF5bWVudC10eXBlLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN0RSxPQUFPLEVBQUUsYUFBYSxFQUFjLE1BQU0saUJBQWlCLENBQUM7O0FBbUI1RCxNQUFNLE9BQWdCLHlCQUF5Qjs7c0hBQXpCLHlCQUF5QjswSEFBekIseUJBQXlCLGNBZmpDLE1BQU0sY0FDTixHQUFHLEVBQUUsQ0FDZixhQUFhLENBQUM7UUFDWixNQUFNLEVBQUUseUJBQXlCO1FBQ2pDLE9BQU8sRUFBRSxxQkFBcUI7UUFDOUIsT0FBTyxFQUFFO1lBQ1AsaUJBQWlCO1lBQ2pCLHNCQUFzQjtZQUN0QixnQkFBZ0I7WUFDaEIsNkJBQTZCO1lBQzdCLGtCQUFrQjtZQUNsQiw2QkFBNkI7U0FDOUI7S0FDRixDQUFDOzJGQUVnQix5QkFBeUI7a0JBaEI5QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO29CQUNsQixVQUFVLEVBQUUsR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO3dCQUNaLE1BQU0sMkJBQTJCO3dCQUNqQyxPQUFPLEVBQUUscUJBQXFCO3dCQUM5QixPQUFPLEVBQUU7NEJBQ1AsaUJBQWlCOzRCQUNqQixzQkFBc0I7NEJBQ3RCLGdCQUFnQjs0QkFDaEIsNkJBQTZCOzRCQUM3QixrQkFBa0I7NEJBQ2xCLDZCQUE2Qjt5QkFDOUI7cUJBQ0YsQ0FBQztpQkFDTCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBheW1lbnRUeXBlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBDSEVDS09VVF9DT1JFX0ZFQVRVUkUgfSBmcm9tICdAc3BhcnRhY3VzL2NoZWNrb3V0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBmYWNhZGVGYWN0b3J5LCBRdWVyeVN0YXRlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG4gIHVzZUZhY3Rvcnk6ICgpID0+XG4gICAgZmFjYWRlRmFjdG9yeSh7XG4gICAgICBmYWNhZGU6IENoZWNrb3V0UGF5bWVudFR5cGVGYWNhZGUsXG4gICAgICBmZWF0dXJlOiBDSEVDS09VVF9DT1JFX0ZFQVRVUkUsXG4gICAgICBtZXRob2RzOiBbXG4gICAgICAgICdnZXRQYXltZW50VHlwZXMnLFxuICAgICAgICAnZ2V0UGF5bWVudFR5cGVzU3RhdGUnLFxuICAgICAgICAnc2V0UGF5bWVudFR5cGUnLFxuICAgICAgICAnZ2V0U2VsZWN0ZWRQYXltZW50VHlwZVN0YXRlJyxcbiAgICAgICAgJ2lzQWNjb3VudFBheW1lbnQnLFxuICAgICAgICAnZ2V0UHVyY2hhc2VPcmRlck51bWJlclN0YXRlJyxcbiAgICAgIF0sXG4gICAgfSksXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENoZWNrb3V0UGF5bWVudFR5cGVGYWNhZGUge1xuICAvKipcbiAgICogR2V0IHBheW1lbnQgdHlwZXMgc3RhdGUuXG4gICAqL1xuICBhYnN0cmFjdCBnZXRQYXltZW50VHlwZXNTdGF0ZSgpOiBPYnNlcnZhYmxlPFxuICAgIFF1ZXJ5U3RhdGU8UGF5bWVudFR5cGVbXSB8IHVuZGVmaW5lZD5cbiAgPjtcblxuICAvKipcbiAgICogR2V0IHBheW1lbnQgdHlwZXMuXG4gICAqL1xuICBhYnN0cmFjdCBnZXRQYXltZW50VHlwZXMoKTogT2JzZXJ2YWJsZTxQYXltZW50VHlwZVtdPjtcblxuICAvKipcbiAgICogU2V0IHBheW1lbnQgdHlwZSB0byBjYXJ0XG4gICAqL1xuICBhYnN0cmFjdCBzZXRQYXltZW50VHlwZShcbiAgICBwYXltZW50VHlwZUNvZGU6IHN0cmluZyxcbiAgICBwdXJjaGFzZU9yZGVyTnVtYmVyPzogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8dW5rbm93bj47XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgc2VsZWN0ZWQgcGF5bWVudCB0eXBlXG4gICAqL1xuICBhYnN0cmFjdCBnZXRTZWxlY3RlZFBheW1lbnRUeXBlU3RhdGUoKTogT2JzZXJ2YWJsZTxcbiAgICBRdWVyeVN0YXRlPFBheW1lbnRUeXBlIHwgdW5kZWZpbmVkPlxuICA+O1xuICAvKipcbiAgICogR2V0IHdoZXRoZXIgdGhlIHNlbGVjdGVkIHBheW1lbnQgdHlwZSBpcyBcIkFDQ09VTlRcIiBwYXltZW50XG4gICAqL1xuICBhYnN0cmFjdCBpc0FjY291bnRQYXltZW50KCk6IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgLyoqXG4gICAqIEdldCBwdXJjaGFzZSBvcmRlciBudW1iZXJcbiAgICovXG4gIGFic3RyYWN0IGdldFB1cmNoYXNlT3JkZXJOdW1iZXJTdGF0ZSgpOiBPYnNlcnZhYmxlPFxuICAgIFF1ZXJ5U3RhdGU8c3RyaW5nIHwgdW5kZWZpbmVkPlxuICA+O1xufVxuIl19