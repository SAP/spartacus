/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { ORGANIZATION_ACCOUNT_SUMMARY_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class AccountSummaryFacade {
}
AccountSummaryFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AccountSummaryFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: AccountSummaryFacade,
        feature: ORGANIZATION_ACCOUNT_SUMMARY_FEATURE,
        methods: [
            'getAccountSummary',
            'getDocumentList',
            'getDocumentAttachment',
        ],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: AccountSummaryFacade,
                        feature: ORGANIZATION_ACCOUNT_SUMMARY_FEATURE,
                        methods: [
                            'getAccountSummary',
                            'getDocumentList',
                            'getDocumentAttachment',
                        ],
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC1zdW1tYXJ5LmZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWNjb3VudC1zdW1tYXJ5L3Jvb3QvZmFjYWRlL2FjY291bnQtc3VtbWFyeS5mYWNhZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxvQ0FBb0MsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQW9CdkUsTUFBTSxPQUFnQixvQkFBb0I7O2lIQUFwQixvQkFBb0I7cUhBQXBCLG9CQUFvQixjQVo1QixNQUFNLGNBQ04sR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO1FBQ1osTUFBTSxFQUFFLG9CQUFvQjtRQUM1QixPQUFPLEVBQUUsb0NBQW9DO1FBQzdDLE9BQU8sRUFBRTtZQUNQLG1CQUFtQjtZQUNuQixpQkFBaUI7WUFDakIsdUJBQXVCO1NBQ3hCO0tBQ0YsQ0FBQzsyRkFFZ0Isb0JBQW9CO2tCQWJ6QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO29CQUNsQixVQUFVLEVBQUUsR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO3dCQUNaLE1BQU0sc0JBQXNCO3dCQUM1QixPQUFPLEVBQUUsb0NBQW9DO3dCQUM3QyxPQUFPLEVBQUU7NEJBQ1AsbUJBQW1COzRCQUNuQixpQkFBaUI7NEJBQ2pCLHVCQUF1Qjt5QkFDeEI7cUJBQ0YsQ0FBQztpQkFDTCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZhY2FkZUZhY3RvcnkgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT1JHQU5JWkFUSU9OX0FDQ09VTlRfU1VNTUFSWV9GRUFUVVJFIH0gZnJvbSAnLi4vZmVhdHVyZS1uYW1lJztcbmltcG9ydCB7XG4gIEFjY291bnRTdW1tYXJ5RGV0YWlscyxcbiAgQWNjb3VudFN1bW1hcnlMaXN0LFxuICBEb2N1bWVudFF1ZXJ5UGFyYW1zLFxufSBmcm9tICcuLi9tb2RlbC9hY2NvdW50LXN1bW1hcnkubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290JyxcbiAgdXNlRmFjdG9yeTogKCkgPT5cbiAgICBmYWNhZGVGYWN0b3J5KHtcbiAgICAgIGZhY2FkZTogQWNjb3VudFN1bW1hcnlGYWNhZGUsXG4gICAgICBmZWF0dXJlOiBPUkdBTklaQVRJT05fQUNDT1VOVF9TVU1NQVJZX0ZFQVRVUkUsXG4gICAgICBtZXRob2RzOiBbXG4gICAgICAgICdnZXRBY2NvdW50U3VtbWFyeScsXG4gICAgICAgICdnZXREb2N1bWVudExpc3QnLFxuICAgICAgICAnZ2V0RG9jdW1lbnRBdHRhY2htZW50JyxcbiAgICAgIF0sXG4gICAgfSksXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFjY291bnRTdW1tYXJ5RmFjYWRlIHtcbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGFjY291bnQgc3VtbWFyeSBoZWFkZXIgZGV0YWlscyBmb3IgYSBvcmdVbml0IGFuZCBjdXJyZW50IGxvZ2dlZCBpbiB1c2VyXG4gICAqIEBwYXJhbSBvcmdVbml0SWQgSWYgcHJvdmlkZWQsIGl0IHdpbGwgYmUgdXNlZCwgb3RoZXJ3aXNlIGl0IHdpbGwgdXNlIG9yZ1VuaXRJZCBmcm9tIHJvdXRlciBzdGF0ZS5cbiAgICovXG4gIGFic3RyYWN0IGdldEFjY291bnRTdW1tYXJ5KFxuICAgIG9yZ1VuaXRJZD86IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPEFjY291bnRTdW1tYXJ5RGV0YWlscz47XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJlc3VsdCBvZiBhY2NvdW50IHN1bW1hcnkgZG9jdW1lbnRzIHNlYXJjaFxuICAgKiBAcGFyYW0gcGFyYW1zIFNlYXJjaCBwYXJhbWV0ZXJzXG4gICAqIEBwYXJhbSBvcmdVbml0SWQgSWYgcHJvdmlkZWQsIGl0IHdpbGwgYmUgdXNlZCwgb3RoZXJ3aXNlIGl0IHdpbGwgdXNlIG9yZ1VuaXRJZCBmcm9tIHJvdXRlciBzdGF0ZS5cbiAgICovXG4gIGFic3RyYWN0IGdldERvY3VtZW50TGlzdChcbiAgICBwYXJhbXM6IERvY3VtZW50UXVlcnlQYXJhbXMsXG4gICAgb3JnVW5pdElkPzogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8QWNjb3VudFN1bW1hcnlMaXN0PjtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZG9jdW1lbnQgYmxvYiBmb3IgZ2l2ZW4gb3JnRG9jdW1lbnRJZCBhbmQgb3JnRG9jdW1lbnRBdHRhY2htZW50SWRcbiAgICogQHBhcmFtIG9yZ0RvY3VtZW50SWQgb3JnYW5pemF0aW9uIGRvY3VtZW50IGlkXG4gICAqIEBwYXJhbSBvcmdEb2N1bWVudEF0dGFjaG1lbnRJZCBhdHRhY2htZW50IGlkIGJlbG9uZ2luZyB0byBhIG9yZ2FuaXphdGlvbiBkb2N1bWVudCBpZFxuICAgKiBAcGFyYW0gb3JnVW5pdElkIElmIHByb3ZpZGVkLCBpdCB3aWxsIGJlIHVzZWQsIG90aGVyd2lzZSBpdCB3aWxsIHVzZSBvcmdVbml0SWQgZnJvbSByb3V0ZXIgc3RhdGUuXG4gICAqL1xuICBhYnN0cmFjdCBnZXREb2N1bWVudEF0dGFjaG1lbnQoXG4gICAgb3JnRG9jdW1lbnRJZD86IHN0cmluZyxcbiAgICBvcmdEb2N1bWVudEF0dGFjaG1lbnRJZD86IHN0cmluZyxcbiAgICBvcmdVbml0SWQ/OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxCbG9iPjtcbn1cbiJdfQ==