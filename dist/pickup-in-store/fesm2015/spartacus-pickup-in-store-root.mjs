import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import { facadeFactory, provideDefaultConfigFactory, provideDefaultConfig } from '@spartacus/core';
import '@spartacus/storefront';
import { ADD_TO_CART_FEATURE, CART_BASE_FEATURE } from '@spartacus/cart/base/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/** pickup-in-store feature name. */
const PICKUP_IN_STORE_FEATURE = 'pickupInStore';
/** pickup-in-store core feature name. */
const PICKUP_IN_STORE_CORE_FEATURE = 'pickupInStoreCore';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Store the Point of Service a user wants to collect a product from before it is added to the cart.
 */
class IntendedPickupLocationFacade {
}
IntendedPickupLocationFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: IntendedPickupLocationFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
IntendedPickupLocationFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: IntendedPickupLocationFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: IntendedPickupLocationFacade,
        feature: PICKUP_IN_STORE_CORE_FEATURE,
        methods: [
            'getIntendedLocation',
            'setIntendedLocation',
            'removeIntendedLocation',
            'getPickupOption',
            'setPickupOption',
        ],
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: IntendedPickupLocationFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: IntendedPickupLocationFacade,
                        feature: PICKUP_IN_STORE_CORE_FEATURE,
                        methods: [
                            'getIntendedLocation',
                            'setIntendedLocation',
                            'removeIntendedLocation',
                            'getPickupOption',
                            'setPickupOption',
                        ],
                        async: true,
                    }),
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// TODO jsdoc
// TODO split this service
class PickupLocationsSearchFacade {
}
PickupLocationsSearchFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupLocationsSearchFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
PickupLocationsSearchFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupLocationsSearchFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: PickupLocationsSearchFacade,
        feature: PICKUP_IN_STORE_CORE_FEATURE,
        methods: [
            'clearSearchResults',
            'getHideOutOfStock',
            'getSearchResults',
            'getStockLevelAtStore',
            'getStoreDetails',
            'hasSearchStarted',
            'isSearchRunning',
            'loadStoreDetails',
            'setBrowserLocation',
            'startSearch',
            'stockLevelAtStore',
            'toggleHideOutOfStock',
        ],
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupLocationsSearchFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: PickupLocationsSearchFacade,
                        feature: PICKUP_IN_STORE_CORE_FEATURE,
                        methods: [
                            'clearSearchResults',
                            'getHideOutOfStock',
                            'getSearchResults',
                            'getStockLevelAtStore',
                            'getStoreDetails',
                            'hasSearchStarted',
                            'isSearchRunning',
                            'loadStoreDetails',
                            'setBrowserLocation',
                            'startSearch',
                            'stockLevelAtStore',
                            'toggleHideOutOfStock',
                        ],
                        async: true,
                    }),
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PickupOptionFacade {
}
PickupOptionFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
PickupOptionFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: PickupOptionFacade,
        feature: PICKUP_IN_STORE_CORE_FEATURE,
        methods: [
            'setPageContext',
            'getPageContext',
            'setPickupOption',
            'getPickupOption',
        ],
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: PickupOptionFacade,
                        feature: PICKUP_IN_STORE_CORE_FEATURE,
                        methods: [
                            'setPageContext',
                            'getPageContext',
                            'setPickupOption',
                            'getPickupOption',
                        ],
                        async: true,
                    }),
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Service to store the user's preferred store for Pickup in Store in local storage.
 */
class PreferredStoreFacade {
}
PreferredStoreFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PreferredStoreFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
PreferredStoreFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PreferredStoreFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: PreferredStoreFacade,
        feature: PICKUP_IN_STORE_CORE_FEATURE,
        methods: [
            'getPreferredStore$',
            'getPreferredStoreWithProductInStock',
            'clearPreferredStore',
            'setPreferredStore',
        ],
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PreferredStoreFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: PreferredStoreFacade,
                        feature: PICKUP_IN_STORE_CORE_FEATURE,
                        methods: [
                            'getPreferredStore$',
                            'getPreferredStoreWithProductInStock',
                            'clearPreferredStore',
                            'setPreferredStore',
                        ],
                        async: true,
                    }),
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/** The used for storing the name of the user's preferred store in browser local storage. */
const PREFERRED_STORE_LOCAL_STORAGE_KEY = 'preferred_store';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function defaultPickupInStoreComponentsConfig() {
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
class PickupInStoreRootModule {
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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getProperty = (o, property) => {
    if (!o) {
        return null;
    }
    if (o.hasOwnProperty(property)) {
        return o[property];
    }
    return null;
};
/** Custom type guard to ensure we have a cart with the required ids for pickup in store */
function cartWithIdAndUserId(cart) {
    return (!!cart &&
        cart.guid !== undefined &&
        cart.user !== undefined &&
        cart.user.uid !== undefined &&
        cart.code !== undefined);
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { IntendedPickupLocationFacade, PICKUP_IN_STORE_CORE_FEATURE, PICKUP_IN_STORE_FEATURE, PREFERRED_STORE_LOCAL_STORAGE_KEY, PickupInStoreRootModule, PickupLocationsSearchFacade, PickupOptionFacade, PreferredStoreFacade, cartWithIdAndUserId, defaultPickupInStoreComponentsConfig, getProperty };
//# sourceMappingURL=spartacus-pickup-in-store-root.mjs.map
