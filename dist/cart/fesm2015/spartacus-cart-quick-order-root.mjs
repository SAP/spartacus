import * as i0 from '@angular/core';
import { Injectable, InjectionToken, NgModule } from '@angular/core';
import { Config, facadeFactory, provideDefaultConfigFactory, provideDefaultConfig } from '@spartacus/core';
import * as i1 from '@angular/router';
import { RouterModule } from '@angular/router';
import { ORDER_ENTRIES_CONTEXT } from '@spartacus/cart/base/root';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultQuickOrderConfig = {
    quickOrder: {
        searchForm: {
            displayProductImages: true,
            maxProducts: 5,
            minCharactersBeforeRequest: 3,
        },
        list: {
            hardDeleteTimeout: 7000,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class QuickOrderConfig {
}
QuickOrderConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
QuickOrderConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useExisting: Config,
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
const CART_QUICK_ORDER_FEATURE = 'cartQuickOrder';
const CART_QUICK_ORDER_CORE_FEATURE = 'cartQuickOrderCore';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function quickOrderFacadeFactory() {
    return facadeFactory({
        facade: QuickOrderFacade,
        feature: CART_QUICK_ORDER_CORE_FEATURE,
        methods: [
            'addProduct',
            'addToCart',
            'clearList',
            'canAdd',
            'setListLimit',
            'getEntries',
            'getProductAdded',
            'loadEntries',
            'softDeleteEntry',
            'searchProducts',
            'setProductAdded',
            'updateEntryQuantity',
            'getSoftDeletedEntries',
            'restoreSoftDeletedEntry',
            'hardDeleteEntry',
            'clearDeletedEntries',
            'getNonPurchasableProductError',
            'setNonPurchasableProductError',
            'clearNonPurchasableProductError',
        ],
    });
}
class QuickOrderFacade {
}
QuickOrderFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
QuickOrderFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderFacade, providedIn: 'root', useFactory: quickOrderFacadeFactory });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: quickOrderFacadeFactory,
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
const QuickOrderOrderEntriesContextToken = new InjectionToken('QuickOrderOrderEntriesContext');

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function defaultQuickOrderComponentsConfig() {
    const config = {
        featureModules: {
            [CART_QUICK_ORDER_FEATURE]: {
                cmsComponents: ['QuickOrderComponent', 'CartQuickOrderFormComponent'],
            },
            // by default core is bundled together with components
            [CART_QUICK_ORDER_CORE_FEATURE]: CART_QUICK_ORDER_FEATURE,
        },
    };
    return config;
}
const defaultQuickOrderRoutingConfig = {
    routing: {
        routes: {
            quickOrder: {
                paths: ['my-account/quick-order'],
            },
        },
    },
};
class QuickOrderRootModule {
}
QuickOrderRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
QuickOrderRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderRootModule, imports: [i1.RouterModule] });
QuickOrderRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderRootModule, providers: [
        provideDefaultConfigFactory(defaultQuickOrderComponentsConfig),
        provideDefaultConfig(defaultQuickOrderRoutingConfig),
        provideDefaultConfig(defaultQuickOrderConfig),
    ], imports: [RouterModule.forChild([
            {
                // @ts-ignore
                path: null,
                canActivate: [CmsPageGuard],
                component: PageLayoutComponent,
                data: {
                    cxRoute: 'quickOrder',
                    cxContext: {
                        [ORDER_ENTRIES_CONTEXT]: QuickOrderOrderEntriesContextToken,
                    },
                },
            },
        ])] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule.forChild([
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [CmsPageGuard],
                                component: PageLayoutComponent,
                                data: {
                                    cxRoute: 'quickOrder',
                                    cxContext: {
                                        [ORDER_ENTRIES_CONTEXT]: QuickOrderOrderEntriesContextToken,
                                    },
                                },
                            },
                        ]),
                    ],
                    providers: [
                        provideDefaultConfigFactory(defaultQuickOrderComponentsConfig),
                        provideDefaultConfig(defaultQuickOrderRoutingConfig),
                        provideDefaultConfig(defaultQuickOrderConfig),
                    ],
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

/**
 * Generated bundle index. Do not edit.
 */

export { CART_QUICK_ORDER_CORE_FEATURE, CART_QUICK_ORDER_FEATURE, QuickOrderConfig, QuickOrderFacade, QuickOrderOrderEntriesContextToken, QuickOrderRootModule, defaultQuickOrderComponentsConfig, defaultQuickOrderConfig, defaultQuickOrderRoutingConfig, quickOrderFacadeFactory };
//# sourceMappingURL=spartacus-cart-quick-order-root.mjs.map
