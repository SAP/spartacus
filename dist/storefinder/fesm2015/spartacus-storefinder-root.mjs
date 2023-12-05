import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import { facadeFactory, provideDefaultConfig, provideDefaultConfigFactory } from '@spartacus/core';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const GOOGLE_MAPS_DEVELOPMENT_KEY_CONFIG = 'cx-development';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultStoreFinderLayoutConfig = {
    layoutSlots: {
        StoreFinderPageTemplate: {
            slots: ['MiddleContent', 'SideContent'],
        },
    },
};

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
const STORE_FINDER_FEATURE = 'storeFinder';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Store the Point of Service a user wants to collect a product from before it is added to the cart.
 */
class StoreFinderFacade {
}
StoreFinderFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
StoreFinderFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: StoreFinderFacade,
        feature: STORE_FINDER_FEATURE,
        methods: [
            'getStoresLoading',
            'getStoresLoaded',
            'getFindStoresEntities',
            'getViewAllStoresLoading',
            'getViewAllStoresEntities',
            'findStoresAction',
            'viewAllStores',
            'viewStoreById',
            'callFindStoresAction',
            'getStoreLatitude',
            'getStoreLongitude',
            'getDirections',
            'getFindStoreEntityById',
        ],
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: StoreFinderFacade,
                        feature: STORE_FINDER_FEATURE,
                        methods: [
                            'getStoresLoading',
                            'getStoresLoaded',
                            'getFindStoresEntities',
                            'getViewAllStoresLoading',
                            'getViewAllStoresEntities',
                            'findStoresAction',
                            'viewAllStores',
                            'viewStoreById',
                            'callFindStoresAction',
                            'getStoreLatitude',
                            'getStoreLongitude',
                            'getDirections',
                            'getFindStoreEntityById',
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
var StoreFinderOutlets;
(function (StoreFinderOutlets) {
    StoreFinderOutlets["PREFERRED_STORE"] = "cx-pick-up-in-store-make-my-store";
})(StoreFinderOutlets || (StoreFinderOutlets = {}));

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
// TODO: Inline this factory when we start releasing Ivy compiled libraries
function defaultStoreFinderComponentsConfig() {
    const config = {
        featureModules: {
            [STORE_FINDER_FEATURE]: {
                cmsComponents: ['StoreFinderComponent'],
            },
        },
    };
    return config;
}
class StoreFinderRootModule {
}
StoreFinderRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StoreFinderRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderRootModule });
StoreFinderRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderRootModule, providers: [
        provideDefaultConfig(defaultStoreFinderLayoutConfig),
        provideDefaultConfigFactory(defaultStoreFinderComponentsConfig),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderRootModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [],
                    providers: [
                        provideDefaultConfig(defaultStoreFinderLayoutConfig),
                        provideDefaultConfigFactory(defaultStoreFinderComponentsConfig),
                    ],
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

export { GOOGLE_MAPS_DEVELOPMENT_KEY_CONFIG, STORE_FINDER_FEATURE, StoreFinderFacade, StoreFinderOutlets, StoreFinderRootModule, defaultStoreFinderComponentsConfig, defaultStoreFinderLayoutConfig };
//# sourceMappingURL=spartacus-storefinder-root.mjs.map
