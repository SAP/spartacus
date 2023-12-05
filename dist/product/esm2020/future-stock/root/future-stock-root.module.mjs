/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { PRODUCT_FUTURE_STOCK_FEATURE } from './feature-name';
import * as i0 from "@angular/core";
export function defaultFutureStockComponentsConfig() {
    return {
        featureModules: {
            [PRODUCT_FUTURE_STOCK_FEATURE]: {
                cmsComponents: ['FutureStockComponent'],
            },
        },
    };
}
export class FutureStockRootModule {
}
FutureStockRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FutureStockRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: FutureStockRootModule });
FutureStockRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockRootModule, providers: [provideDefaultConfigFactory(defaultFutureStockComponentsConfig)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                    providers: [provideDefaultConfigFactory(defaultFutureStockComponentsConfig)],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnV0dXJlLXN0b2NrLXJvb3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QvZnV0dXJlLXN0b2NrL3Jvb3QvZnV0dXJlLXN0b2NrLXJvb3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUU5RCxNQUFNLFVBQVUsa0NBQWtDO0lBQ2hELE9BQU87UUFDTCxjQUFjLEVBQUU7WUFDZCxDQUFDLDRCQUE0QixDQUFDLEVBQUU7Z0JBQzlCLGFBQWEsRUFBRSxDQUFDLHNCQUFzQixDQUFDO2FBQ3hDO1NBQ0Y7S0FDRixDQUFDO0FBQ0osQ0FBQztBQU1ELE1BQU0sT0FBTyxxQkFBcUI7O2tIQUFyQixxQkFBcUI7bUhBQXJCLHFCQUFxQjttSEFBckIscUJBQXFCLGFBRnJCLENBQUMsMkJBQTJCLENBQUMsa0NBQWtDLENBQUMsQ0FBQzsyRkFFakUscUJBQXFCO2tCQUpqQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxFQUFFO29CQUNYLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDLGtDQUFrQyxDQUFDLENBQUM7aUJBQzdFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBQUk9EVUNUX0ZVVFVSRV9TVE9DS19GRUFUVVJFIH0gZnJvbSAnLi9mZWF0dXJlLW5hbWUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdEZ1dHVyZVN0b2NrQ29tcG9uZW50c0NvbmZpZygpIHtcbiAgcmV0dXJuIHtcbiAgICBmZWF0dXJlTW9kdWxlczoge1xuICAgICAgW1BST0RVQ1RfRlVUVVJFX1NUT0NLX0ZFQVRVUkVdOiB7XG4gICAgICAgIGNtc0NvbXBvbmVudHM6IFsnRnV0dXJlU3RvY2tDb21wb25lbnQnXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcbn1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW10sXG4gIHByb3ZpZGVyczogW3Byb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeShkZWZhdWx0RnV0dXJlU3RvY2tDb21wb25lbnRzQ29uZmlnKV0sXG59KVxuZXhwb3J0IGNsYXNzIEZ1dHVyZVN0b2NrUm9vdE1vZHVsZSB7fVxuIl19