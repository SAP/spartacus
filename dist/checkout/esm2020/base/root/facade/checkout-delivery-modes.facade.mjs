/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { CHECKOUT_CORE_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class CheckoutDeliveryModesFacade {
}
CheckoutDeliveryModesFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryModesFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutDeliveryModesFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryModesFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: CheckoutDeliveryModesFacade,
        feature: CHECKOUT_CORE_FEATURE,
        methods: [
            'getSupportedDeliveryModesState',
            'getSupportedDeliveryModes',
            'setDeliveryMode',
            'getSelectedDeliveryModeState',
            'clearCheckoutDeliveryMode',
        ],
        // TODO:#deprecation-checkout - remove once we remove ngrx
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryModesFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: CheckoutDeliveryModesFacade,
                        feature: CHECKOUT_CORE_FEATURE,
                        methods: [
                            'getSupportedDeliveryModesState',
                            'getSupportedDeliveryModes',
                            'setDeliveryMode',
                            'getSelectedDeliveryModeState',
                            'clearCheckoutDeliveryMode',
                        ],
                        // TODO:#deprecation-checkout - remove once we remove ngrx
                        async: true,
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtZGVsaXZlcnktbW9kZXMuZmFjYWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NoZWNrb3V0L2Jhc2Uvcm9vdC9mYWNhZGUvY2hlY2tvdXQtZGVsaXZlcnktbW9kZXMuZmFjYWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxhQUFhLEVBQWMsTUFBTSxpQkFBaUIsQ0FBQztBQUU1RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFtQnhELE1BQU0sT0FBZ0IsMkJBQTJCOzt3SEFBM0IsMkJBQTJCOzRIQUEzQiwyQkFBMkIsY0FoQm5DLE1BQU0sY0FDTixHQUFHLEVBQUUsQ0FDZixhQUFhLENBQUM7UUFDWixNQUFNLEVBQUUsMkJBQTJCO1FBQ25DLE9BQU8sRUFBRSxxQkFBcUI7UUFDOUIsT0FBTyxFQUFFO1lBQ1AsZ0NBQWdDO1lBQ2hDLDJCQUEyQjtZQUMzQixpQkFBaUI7WUFDakIsOEJBQThCO1lBQzlCLDJCQUEyQjtTQUM1QjtRQUNELDBEQUEwRDtRQUMxRCxLQUFLLEVBQUUsSUFBSTtLQUNaLENBQUM7MkZBRWdCLDJCQUEyQjtrQkFqQmhELFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07b0JBQ2xCLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FDZixhQUFhLENBQUM7d0JBQ1osTUFBTSw2QkFBNkI7d0JBQ25DLE9BQU8sRUFBRSxxQkFBcUI7d0JBQzlCLE9BQU8sRUFBRTs0QkFDUCxnQ0FBZ0M7NEJBQ2hDLDJCQUEyQjs0QkFDM0IsaUJBQWlCOzRCQUNqQiw4QkFBOEI7NEJBQzlCLDJCQUEyQjt5QkFDNUI7d0JBQ0QsMERBQTBEO3dCQUMxRCxLQUFLLEVBQUUsSUFBSTtxQkFDWixDQUFDO2lCQUNMIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVsaXZlcnlNb2RlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBmYWNhZGVGYWN0b3J5LCBRdWVyeVN0YXRlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENIRUNLT1VUX0NPUkVfRkVBVFVSRSB9IGZyb20gJy4uL2ZlYXR1cmUtbmFtZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICB1c2VGYWN0b3J5OiAoKSA9PlxuICAgIGZhY2FkZUZhY3Rvcnkoe1xuICAgICAgZmFjYWRlOiBDaGVja291dERlbGl2ZXJ5TW9kZXNGYWNhZGUsXG4gICAgICBmZWF0dXJlOiBDSEVDS09VVF9DT1JFX0ZFQVRVUkUsXG4gICAgICBtZXRob2RzOiBbXG4gICAgICAgICdnZXRTdXBwb3J0ZWREZWxpdmVyeU1vZGVzU3RhdGUnLFxuICAgICAgICAnZ2V0U3VwcG9ydGVkRGVsaXZlcnlNb2RlcycsXG4gICAgICAgICdzZXREZWxpdmVyeU1vZGUnLFxuICAgICAgICAnZ2V0U2VsZWN0ZWREZWxpdmVyeU1vZGVTdGF0ZScsXG4gICAgICAgICdjbGVhckNoZWNrb3V0RGVsaXZlcnlNb2RlJyxcbiAgICAgIF0sXG4gICAgICAvLyBUT0RPOiNkZXByZWNhdGlvbi1jaGVja291dCAtIHJlbW92ZSBvbmNlIHdlIHJlbW92ZSBuZ3J4XG4gICAgICBhc3luYzogdHJ1ZSxcbiAgICB9KSxcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ2hlY2tvdXREZWxpdmVyeU1vZGVzRmFjYWRlIHtcbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHN1cHBvcnRlZCBkZWxpdmVyeSBtb2RlcyBzdGF0ZS5cbiAgICovXG4gIGFic3RyYWN0IGdldFN1cHBvcnRlZERlbGl2ZXJ5TW9kZXNTdGF0ZSgpOiBPYnNlcnZhYmxlPFxuICAgIFF1ZXJ5U3RhdGU8RGVsaXZlcnlNb2RlW10+XG4gID47XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBzdXBwb3J0ZWQgZGVsaXZlcnkgbW9kZXMsIG9yIGFuIGVtcHR5IGFycmF5IGlmIHRoZSBkYXRhIGlzIHVuZGVmaW5lZC5cbiAgICovXG4gIGFic3RyYWN0IGdldFN1cHBvcnRlZERlbGl2ZXJ5TW9kZXMoKTogT2JzZXJ2YWJsZTxEZWxpdmVyeU1vZGVbXT47XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBzZWxlY3RlZCBkZWxpdmVyeSBtb2RlXG4gICAqL1xuICBhYnN0cmFjdCBnZXRTZWxlY3RlZERlbGl2ZXJ5TW9kZVN0YXRlKCk6IE9ic2VydmFibGU8XG4gICAgUXVlcnlTdGF0ZTxEZWxpdmVyeU1vZGUgfCB1bmRlZmluZWQ+XG4gID47XG4gIC8qKlxuICAgKiBTZXRzIHRoZSBwcm92aWRlZCBkZWxpdmVyeSBtb2RlIHRvIHRoZSBjdXJyZW50IGNhcnRcbiAgICovXG4gIGFic3RyYWN0IHNldERlbGl2ZXJ5TW9kZShtb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHVua25vd24+O1xuICAvKipcbiAgICogQ2xlYXJzIHRoZSBzZWxlY3RlZCBkZWxpdmVyeSBtb2RlIGZyb20gdGhlIGN1cnJlbnQgY2FydFxuICAgKi9cbiAgYWJzdHJhY3QgY2xlYXJDaGVja291dERlbGl2ZXJ5TW9kZSgpOiBPYnNlcnZhYmxlPHVua25vd24+O1xufVxuIl19