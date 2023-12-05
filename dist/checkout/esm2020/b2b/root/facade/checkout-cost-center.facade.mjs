/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CHECKOUT_CORE_FEATURE } from '@spartacus/checkout/base/root';
import { facadeFactory } from '@spartacus/core';
import * as i0 from "@angular/core";
export class CheckoutCostCenterFacade {
}
CheckoutCostCenterFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCostCenterFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutCostCenterFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCostCenterFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: CheckoutCostCenterFacade,
        feature: CHECKOUT_CORE_FEATURE,
        methods: ['setCostCenter', 'getCostCenterState'],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCostCenterFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: CheckoutCostCenterFacade,
                        feature: CHECKOUT_CORE_FEATURE,
                        methods: ['setCostCenter', 'getCostCenterState'],
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtY29zdC1jZW50ZXIuZmFjYWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NoZWNrb3V0L2IyYi9yb290L2ZhY2FkZS9jaGVja291dC1jb3N0LWNlbnRlci5mYWNhZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDdEUsT0FBTyxFQUFjLGFBQWEsRUFBYyxNQUFNLGlCQUFpQixDQUFDOztBQVl4RSxNQUFNLE9BQWdCLHdCQUF3Qjs7cUhBQXhCLHdCQUF3Qjt5SEFBeEIsd0JBQXdCLGNBUmhDLE1BQU0sY0FDTixHQUFHLEVBQUUsQ0FDZixhQUFhLENBQUM7UUFDWixNQUFNLEVBQUUsd0JBQXdCO1FBQ2hDLE9BQU8sRUFBRSxxQkFBcUI7UUFDOUIsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLG9CQUFvQixDQUFDO0tBQ2pELENBQUM7MkZBRWdCLHdCQUF3QjtrQkFUN0MsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtvQkFDbEIsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUNmLGFBQWEsQ0FBQzt3QkFDWixNQUFNLDBCQUEwQjt3QkFDaEMsT0FBTyxFQUFFLHFCQUFxQjt3QkFDOUIsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLG9CQUFvQixDQUFDO3FCQUNqRCxDQUFDO2lCQUNMIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FydCB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgQ0hFQ0tPVVRfQ09SRV9GRUFUVVJFIH0gZnJvbSAnQHNwYXJ0YWN1cy9jaGVja291dC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgQ29zdENlbnRlciwgZmFjYWRlRmFjdG9yeSwgUXVlcnlTdGF0ZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICB1c2VGYWN0b3J5OiAoKSA9PlxuICAgIGZhY2FkZUZhY3Rvcnkoe1xuICAgICAgZmFjYWRlOiBDaGVja291dENvc3RDZW50ZXJGYWNhZGUsXG4gICAgICBmZWF0dXJlOiBDSEVDS09VVF9DT1JFX0ZFQVRVUkUsXG4gICAgICBtZXRob2RzOiBbJ3NldENvc3RDZW50ZXInLCAnZ2V0Q29zdENlbnRlclN0YXRlJ10sXG4gICAgfSksXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENoZWNrb3V0Q29zdENlbnRlckZhY2FkZSB7XG4gIC8qKlxuICAgKiBTZXQgY29zdCBjZW50ZXIgdG8gY2FydFxuICAgKiBAcGFyYW0gY29zdENlbnRlcklkIDogY29zdCBjZW50ZXIgaWRcbiAgICovXG4gIGFic3RyYWN0IHNldENvc3RDZW50ZXIoY29zdENlbnRlcklkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPENhcnQ+O1xuXG4gIC8qKlxuICAgKiBHZXQgY29zdCBjZW50ZXIgaWQgZnJvbSBjYXJ0XG4gICAqL1xuICBhYnN0cmFjdCBnZXRDb3N0Q2VudGVyU3RhdGUoKTogT2JzZXJ2YWJsZTxRdWVyeVN0YXRlPENvc3RDZW50ZXIgfCB1bmRlZmluZWQ+Pjtcbn1cbiJdfQ==