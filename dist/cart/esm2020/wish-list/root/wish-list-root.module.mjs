/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CART_BASE_FEATURE } from '@spartacus/cart/base/root';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { ADD_TO_WISHLIST_FEATURE, CART_WISH_LIST_CORE_FEATURE, CART_WISH_LIST_FEATURE, } from './feature-name';
import * as i0 from "@angular/core";
export function defaultCartWishListComponentsConfig() {
    const config = {
        featureModules: {
            [CART_WISH_LIST_FEATURE]: {
                cmsComponents: ['WishListComponent'],
                dependencies: [CART_BASE_FEATURE],
            },
            [ADD_TO_WISHLIST_FEATURE]: {
                cmsComponents: ['AddToWishListComponent'],
            },
            // by default core is bundled together with components
            [CART_WISH_LIST_CORE_FEATURE]: CART_WISH_LIST_FEATURE,
        },
    };
    return config;
}
export class WishListRootModule {
}
WishListRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
WishListRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: WishListRootModule });
WishListRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListRootModule, providers: [provideDefaultConfigFactory(defaultCartWishListComponentsConfig)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListRootModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [provideDefaultConfigFactory(defaultCartWishListComponentsConfig)],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lzaC1saXN0LXJvb3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvd2lzaC1saXN0L3Jvb3Qvd2lzaC1saXN0LXJvb3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzlELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsMkJBQTJCLEVBQzNCLHNCQUFzQixHQUN2QixNQUFNLGdCQUFnQixDQUFDOztBQUV4QixNQUFNLFVBQVUsbUNBQW1DO0lBQ2pELE1BQU0sTUFBTSxHQUFHO1FBQ2IsY0FBYyxFQUFFO1lBQ2QsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO2dCQUN4QixhQUFhLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDcEMsWUFBWSxFQUFFLENBQUMsaUJBQWlCLENBQUM7YUFDbEM7WUFDRCxDQUFDLHVCQUF1QixDQUFDLEVBQUU7Z0JBQ3pCLGFBQWEsRUFBRSxDQUFDLHdCQUF3QixDQUFDO2FBQzFDO1lBQ0Qsc0RBQXNEO1lBQ3RELENBQUMsMkJBQTJCLENBQUMsRUFBRSxzQkFBc0I7U0FDdEQ7S0FDRixDQUFDO0lBQ0YsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUtELE1BQU0sT0FBTyxrQkFBa0I7OytHQUFsQixrQkFBa0I7Z0hBQWxCLGtCQUFrQjtnSEFBbEIsa0JBQWtCLGFBRmxCLENBQUMsMkJBQTJCLENBQUMsbUNBQW1DLENBQUMsQ0FBQzsyRkFFbEUsa0JBQWtCO2tCQUg5QixRQUFRO21CQUFDO29CQUNSLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDLG1DQUFtQyxDQUFDLENBQUM7aUJBQzlFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENBUlRfQkFTRV9GRUFUVVJFIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnkgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgQUREX1RPX1dJU0hMSVNUX0ZFQVRVUkUsXG4gIENBUlRfV0lTSF9MSVNUX0NPUkVfRkVBVFVSRSxcbiAgQ0FSVF9XSVNIX0xJU1RfRkVBVFVSRSxcbn0gZnJvbSAnLi9mZWF0dXJlLW5hbWUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdENhcnRXaXNoTGlzdENvbXBvbmVudHNDb25maWcoKSB7XG4gIGNvbnN0IGNvbmZpZyA9IHtcbiAgICBmZWF0dXJlTW9kdWxlczoge1xuICAgICAgW0NBUlRfV0lTSF9MSVNUX0ZFQVRVUkVdOiB7XG4gICAgICAgIGNtc0NvbXBvbmVudHM6IFsnV2lzaExpc3RDb21wb25lbnQnXSxcbiAgICAgICAgZGVwZW5kZW5jaWVzOiBbQ0FSVF9CQVNFX0ZFQVRVUkVdLFxuICAgICAgfSxcbiAgICAgIFtBRERfVE9fV0lTSExJU1RfRkVBVFVSRV06IHtcbiAgICAgICAgY21zQ29tcG9uZW50czogWydBZGRUb1dpc2hMaXN0Q29tcG9uZW50J10sXG4gICAgICB9LFxuICAgICAgLy8gYnkgZGVmYXVsdCBjb3JlIGlzIGJ1bmRsZWQgdG9nZXRoZXIgd2l0aCBjb21wb25lbnRzXG4gICAgICBbQ0FSVF9XSVNIX0xJU1RfQ09SRV9GRUFUVVJFXTogQ0FSVF9XSVNIX0xJU1RfRkVBVFVSRSxcbiAgICB9LFxuICB9O1xuICByZXR1cm4gY29uZmlnO1xufVxuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnkoZGVmYXVsdENhcnRXaXNoTGlzdENvbXBvbmVudHNDb25maWcpXSxcbn0pXG5leHBvcnQgY2xhc3MgV2lzaExpc3RSb290TW9kdWxlIHt9XG4iXX0=