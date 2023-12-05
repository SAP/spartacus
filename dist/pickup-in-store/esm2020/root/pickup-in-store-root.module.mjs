/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { ADD_TO_CART_FEATURE, CART_BASE_FEATURE, } from '@spartacus/cart/base/root';
import { provideDefaultConfig, provideDefaultConfigFactory, } from '@spartacus/core';
import { PICKUP_IN_STORE_CORE_FEATURE, PICKUP_IN_STORE_FEATURE, } from './feature-name';
import * as i0 from "@angular/core";
export function defaultPickupInStoreComponentsConfig() {
    return {
        featureModules: {
            [PICKUP_IN_STORE_FEATURE]: {
                cmsComponents: [
                    'CheckoutReviewPickup',
                    'MyPreferredStoreComponent',
                    'OrderConfirmationPickUpComponent',
                    'PickupInStoreDeliveryModeComponent',
                ],
            },
            [PICKUP_IN_STORE_CORE_FEATURE]: PICKUP_IN_STORE_FEATURE,
        },
    };
}
export class PickupInStoreRootModule {
}
PickupInStoreRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PickupInStoreRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreRootModule });
PickupInStoreRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreRootModule, providers: [
        provideDefaultConfigFactory(defaultPickupInStoreComponentsConfig),
        // make pickup lib loaded before add-to-cart
        provideDefaultConfig({
            featureModules: {
                [ADD_TO_CART_FEATURE]: {
                    dependencies: [PICKUP_IN_STORE_FEATURE],
                },
            },
        }),
        // make pickup lib loaded before cart base
        provideDefaultConfig({
            featureModules: {
                [CART_BASE_FEATURE]: {
                    dependencies: [PICKUP_IN_STORE_FEATURE],
                },
            },
        }),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreRootModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfigFactory(defaultPickupInStoreComponentsConfig),
                        // make pickup lib loaded before add-to-cart
                        provideDefaultConfig({
                            featureModules: {
                                [ADD_TO_CART_FEATURE]: {
                                    dependencies: [PICKUP_IN_STORE_FEATURE],
                                },
                            },
                        }),
                        // make pickup lib loaded before cart base
                        provideDefaultConfig({
                            featureModules: {
                                [CART_BASE_FEATURE]: {
                                    dependencies: [PICKUP_IN_STORE_FEATURE],
                                },
                            },
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3VwLWluLXN0b3JlLXJvb3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3BpY2t1cC1pbi1zdG9yZS9yb290L3BpY2t1cC1pbi1zdG9yZS1yb290Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLGlCQUFpQixHQUNsQixNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFFTCxvQkFBb0IsRUFDcEIsMkJBQTJCLEdBQzVCLE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUNMLDRCQUE0QixFQUM1Qix1QkFBdUIsR0FDeEIsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFeEIsTUFBTSxVQUFVLG9DQUFvQztJQUNsRCxPQUFPO1FBQ0wsY0FBYyxFQUFFO1lBQ2QsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFO2dCQUN6QixhQUFhLEVBQUU7b0JBQ2Isc0JBQXNCO29CQUN0QiwyQkFBMkI7b0JBQzNCLGtDQUFrQztvQkFDbEMsb0NBQW9DO2lCQUNyQzthQUNGO1lBQ0QsQ0FBQyw0QkFBNEIsQ0FBQyxFQUFFLHVCQUF1QjtTQUN4RDtLQUNGLENBQUM7QUFDSixDQUFDO0FBdUJELE1BQU0sT0FBTyx1QkFBdUI7O29IQUF2Qix1QkFBdUI7cUhBQXZCLHVCQUF1QjtxSEFBdkIsdUJBQXVCLGFBcEJ2QjtRQUNULDJCQUEyQixDQUFDLG9DQUFvQyxDQUFDO1FBQ2pFLDRDQUE0QztRQUM1QyxvQkFBb0IsQ0FBQztZQUNuQixjQUFjLEVBQUU7Z0JBQ2QsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO29CQUNyQixZQUFZLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztpQkFDeEM7YUFDRjtTQUNGLENBQUM7UUFDRiwwQ0FBMEM7UUFDMUMsb0JBQW9CLENBQUM7WUFDbkIsY0FBYyxFQUFFO2dCQUNkLENBQUMsaUJBQWlCLENBQUMsRUFBRTtvQkFDbkIsWUFBWSxFQUFFLENBQUMsdUJBQXVCLENBQUM7aUJBQ3hDO2FBQ0Y7U0FDRixDQUFDO0tBQ0g7MkZBRVUsdUJBQXVCO2tCQXJCbkMsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUU7d0JBQ1QsMkJBQTJCLENBQUMsb0NBQW9DLENBQUM7d0JBQ2pFLDRDQUE0Qzt3QkFDNUMsb0JBQW9CLENBQUM7NEJBQ25CLGNBQWMsRUFBRTtnQ0FDZCxDQUFDLG1CQUFtQixDQUFDLEVBQUU7b0NBQ3JCLFlBQVksRUFBRSxDQUFDLHVCQUF1QixDQUFDO2lDQUN4Qzs2QkFDRjt5QkFDRixDQUFDO3dCQUNGLDBDQUEwQzt3QkFDMUMsb0JBQW9CLENBQUM7NEJBQ25CLGNBQWMsRUFBRTtnQ0FDZCxDQUFDLGlCQUFpQixDQUFDLEVBQUU7b0NBQ25CLFlBQVksRUFBRSxDQUFDLHVCQUF1QixDQUFDO2lDQUN4Qzs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEFERF9UT19DQVJUX0ZFQVRVUkUsXG4gIENBUlRfQkFTRV9GRUFUVVJFLFxufSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIENtc0NvbmZpZyxcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcblxuaW1wb3J0IHtcbiAgUElDS1VQX0lOX1NUT1JFX0NPUkVfRkVBVFVSRSxcbiAgUElDS1VQX0lOX1NUT1JFX0ZFQVRVUkUsXG59IGZyb20gJy4vZmVhdHVyZS1uYW1lJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRQaWNrdXBJblN0b3JlQ29tcG9uZW50c0NvbmZpZygpOiBDbXNDb25maWcge1xuICByZXR1cm4ge1xuICAgIGZlYXR1cmVNb2R1bGVzOiB7XG4gICAgICBbUElDS1VQX0lOX1NUT1JFX0ZFQVRVUkVdOiB7XG4gICAgICAgIGNtc0NvbXBvbmVudHM6IFtcbiAgICAgICAgICAnQ2hlY2tvdXRSZXZpZXdQaWNrdXAnLFxuICAgICAgICAgICdNeVByZWZlcnJlZFN0b3JlQ29tcG9uZW50JyxcbiAgICAgICAgICAnT3JkZXJDb25maXJtYXRpb25QaWNrVXBDb21wb25lbnQnLFxuICAgICAgICAgICdQaWNrdXBJblN0b3JlRGVsaXZlcnlNb2RlQ29tcG9uZW50JyxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICBbUElDS1VQX0lOX1NUT1JFX0NPUkVfRkVBVFVSRV06IFBJQ0tVUF9JTl9TVE9SRV9GRUFUVVJFLFxuICAgIH0sXG4gIH07XG59XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeShkZWZhdWx0UGlja3VwSW5TdG9yZUNvbXBvbmVudHNDb25maWcpLFxuICAgIC8vIG1ha2UgcGlja3VwIGxpYiBsb2FkZWQgYmVmb3JlIGFkZC10by1jYXJ0XG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoe1xuICAgICAgZmVhdHVyZU1vZHVsZXM6IHtcbiAgICAgICAgW0FERF9UT19DQVJUX0ZFQVRVUkVdOiB7XG4gICAgICAgICAgZGVwZW5kZW5jaWVzOiBbUElDS1VQX0lOX1NUT1JFX0ZFQVRVUkVdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgICAvLyBtYWtlIHBpY2t1cCBsaWIgbG9hZGVkIGJlZm9yZSBjYXJ0IGJhc2VcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyh7XG4gICAgICBmZWF0dXJlTW9kdWxlczoge1xuICAgICAgICBbQ0FSVF9CQVNFX0ZFQVRVUkVdOiB7XG4gICAgICAgICAgZGVwZW5kZW5jaWVzOiBbUElDS1VQX0lOX1NUT1JFX0ZFQVRVUkVdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUGlja3VwSW5TdG9yZVJvb3RNb2R1bGUge31cbiJdfQ==