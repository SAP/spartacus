/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { CHECKOUT_CORE_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class CheckoutDeliveryAddressFacade {
}
CheckoutDeliveryAddressFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryAddressFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutDeliveryAddressFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryAddressFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: CheckoutDeliveryAddressFacade,
        feature: CHECKOUT_CORE_FEATURE,
        methods: [
            'getDeliveryAddressState',
            'createAndSetAddress',
            'setDeliveryAddress',
            'clearCheckoutDeliveryAddress',
        ],
        // TODO:#deprecation-checkout - remove once we remove ngrx
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryAddressFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: CheckoutDeliveryAddressFacade,
                        feature: CHECKOUT_CORE_FEATURE,
                        methods: [
                            'getDeliveryAddressState',
                            'createAndSetAddress',
                            'setDeliveryAddress',
                            'clearCheckoutDeliveryAddress',
                        ],
                        // TODO:#deprecation-checkout - remove once we remove ngrx
                        async: true,
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtZGVsaXZlcnktYWRkcmVzcy5mYWNhZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYmFzZS9yb290L2ZhY2FkZS9jaGVja291dC1kZWxpdmVyeS1hZGRyZXNzLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQVcsYUFBYSxFQUFjLE1BQU0saUJBQWlCLENBQUM7QUFFckUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBa0J4RCxNQUFNLE9BQWdCLDZCQUE2Qjs7MEhBQTdCLDZCQUE2Qjs4SEFBN0IsNkJBQTZCLGNBZnJDLE1BQU0sY0FDTixHQUFHLEVBQUUsQ0FDZixhQUFhLENBQUM7UUFDWixNQUFNLEVBQUUsNkJBQTZCO1FBQ3JDLE9BQU8sRUFBRSxxQkFBcUI7UUFDOUIsT0FBTyxFQUFFO1lBQ1AseUJBQXlCO1lBQ3pCLHFCQUFxQjtZQUNyQixvQkFBb0I7WUFDcEIsOEJBQThCO1NBQy9CO1FBQ0QsMERBQTBEO1FBQzFELEtBQUssRUFBRSxJQUFJO0tBQ1osQ0FBQzsyRkFFZ0IsNkJBQTZCO2tCQWhCbEQsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtvQkFDbEIsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUNmLGFBQWEsQ0FBQzt3QkFDWixNQUFNLCtCQUErQjt3QkFDckMsT0FBTyxFQUFFLHFCQUFxQjt3QkFDOUIsT0FBTyxFQUFFOzRCQUNQLHlCQUF5Qjs0QkFDekIscUJBQXFCOzRCQUNyQixvQkFBb0I7NEJBQ3BCLDhCQUE4Qjt5QkFDL0I7d0JBQ0QsMERBQTBEO3dCQUMxRCxLQUFLLEVBQUUsSUFBSTtxQkFDWixDQUFDO2lCQUNMIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWRkcmVzcywgZmFjYWRlRmFjdG9yeSwgUXVlcnlTdGF0ZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDSEVDS09VVF9DT1JFX0ZFQVRVUkUgfSBmcm9tICcuLi9mZWF0dXJlLW5hbWUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290JyxcbiAgdXNlRmFjdG9yeTogKCkgPT5cbiAgICBmYWNhZGVGYWN0b3J5KHtcbiAgICAgIGZhY2FkZTogQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NGYWNhZGUsXG4gICAgICBmZWF0dXJlOiBDSEVDS09VVF9DT1JFX0ZFQVRVUkUsXG4gICAgICBtZXRob2RzOiBbXG4gICAgICAgICdnZXREZWxpdmVyeUFkZHJlc3NTdGF0ZScsXG4gICAgICAgICdjcmVhdGVBbmRTZXRBZGRyZXNzJyxcbiAgICAgICAgJ3NldERlbGl2ZXJ5QWRkcmVzcycsXG4gICAgICAgICdjbGVhckNoZWNrb3V0RGVsaXZlcnlBZGRyZXNzJyxcbiAgICAgIF0sXG4gICAgICAvLyBUT0RPOiNkZXByZWNhdGlvbi1jaGVja291dCAtIHJlbW92ZSBvbmNlIHdlIHJlbW92ZSBuZ3J4XG4gICAgICBhc3luYzogdHJ1ZSxcbiAgICB9KSxcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NGYWNhZGUge1xuICAvKipcbiAgICogUmV0dXJucyB0aGUgZGVsaXZlcnkgYWRkcmVzcyBzdGF0ZVxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0RGVsaXZlcnlBZGRyZXNzU3RhdGUoKTogT2JzZXJ2YWJsZTxcbiAgICBRdWVyeVN0YXRlPEFkZHJlc3MgfCB1bmRlZmluZWQ+XG4gID47XG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuZCBzZXRzIHRoZSBkZWxpdmVyeSBhZGRyZXNzIHVzaW5nIHRoZSBwcm92aWRlZCBhZGRyZXNzXG4gICAqL1xuICBhYnN0cmFjdCBjcmVhdGVBbmRTZXRBZGRyZXNzKGFkZHJlc3M6IEFkZHJlc3MpOiBPYnNlcnZhYmxlPHVua25vd24+O1xuICAvKipcbiAgICogU2V0cyB0aGUgZGVsaXZlcnkgYWRkcmVzcyB0byB0aGUgY2FydFxuICAgKi9cbiAgYWJzdHJhY3Qgc2V0RGVsaXZlcnlBZGRyZXNzKGFkZHJlc3M6IEFkZHJlc3MpOiBPYnNlcnZhYmxlPHVua25vd24+O1xuICAvKipcbiAgICogQ2xlYXJzIHRoZSBkZWxpdmVyeSBhZGRyZXNzIHNldCBpbiB0aGUgY2FydFxuICAgKi9cbiAgYWJzdHJhY3QgY2xlYXJDaGVja291dERlbGl2ZXJ5QWRkcmVzcygpOiBPYnNlcnZhYmxlPHVua25vd24+O1xufVxuIl19