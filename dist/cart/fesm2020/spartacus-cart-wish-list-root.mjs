import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import { facadeFactory, provideDefaultConfigFactory } from '@spartacus/core';
import { CART_BASE_FEATURE } from '@spartacus/cart/base/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CART_WISH_LIST_FEATURE = 'cartWishList';
const CART_WISH_LIST_CORE_FEATURE = 'cartWishListCore';
const ADD_TO_WISHLIST_FEATURE = 'addToWishList';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class WishListFacade {
}
WishListFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
WishListFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: WishListFacade,
        feature: CART_WISH_LIST_CORE_FEATURE,
        methods: [
            'createWishList',
            'getWishList',
            'loadWishList',
            'addEntry',
            'removeEntry',
            'getWishListLoading',
        ],
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: WishListFacade,
                        feature: CART_WISH_LIST_CORE_FEATURE,
                        methods: [
                            'createWishList',
                            'getWishList',
                            'loadWishList',
                            'addEntry',
                            'removeEntry',
                            'getWishListLoading',
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
function defaultCartWishListComponentsConfig() {
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
class WishListRootModule {
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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ADD_TO_WISHLIST_FEATURE, CART_WISH_LIST_CORE_FEATURE, CART_WISH_LIST_FEATURE, WishListFacade, WishListRootModule, defaultCartWishListComponentsConfig };
//# sourceMappingURL=spartacus-cart-wish-list-root.mjs.map
