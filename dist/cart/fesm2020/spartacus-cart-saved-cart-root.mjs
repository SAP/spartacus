import { CartEvent, CART_BASE_FEATURE, ORDER_ENTRIES_CONTEXT } from '@spartacus/cart/base/root';
import * as i0 from '@angular/core';
import { Injectable, InjectionToken, NgModule } from '@angular/core';
import { facadeFactory, provideDefaultConfigFactory, provideDefaultConfig, AuthGuard } from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import * as i1 from '@angular/router';
import { RouterModule } from '@angular/router';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Base saved cart event. Most cart events should have these properties.
 */
class SavedCartEvent extends CartEvent {
}
// =====================================================================
class SaveCartEvent extends SavedCartEvent {
}
/**
 * Event's type
 */
SaveCartEvent.type = 'SaveCartEvent';
class SaveCartSuccessEvent extends SavedCartEvent {
}
/**
 * Event's type
 */
SaveCartSuccessEvent.type = 'SaveCartSuccessEvent';
class SaveCartFailEvent extends SavedCartEvent {
}
/**
 * Event's type
 */
SaveCartFailEvent.type = 'SaveCartEvent';
class RestoreSavedCartEvent extends SavedCartEvent {
}
/**
 * Event's type
 */
RestoreSavedCartEvent.type = 'RestoreSavedCartEvent';
class RestoreSavedCartSuccessEvent extends SavedCartEvent {
}
/**
 * Event's type
 */
RestoreSavedCartSuccessEvent.type = 'RestoreSavedCartSuccessEvent';
class RestoreSavedCartFailEvent extends SavedCartEvent {
}
/**
 * Event's type
 */
RestoreSavedCartFailEvent.type = 'RestoreSavedCartFailEvent';
class EditSavedCartEvent extends SavedCartEvent {
}
/**
 * Event's type
 */
EditSavedCartEvent.type = 'EditSavedCartEvent';
class EditSavedCartSuccessEvent extends SavedCartEvent {
}
/**
 * Event's type
 */
EditSavedCartSuccessEvent.type = 'EditSavedCartSuccessEvent';
class EditSavedCartFailEvent extends SavedCartEvent {
}
/**
 * Event's type
 */
EditSavedCartFailEvent.type = 'EditSavedCartFailEvent';
class CloneSavedCartEvent extends SavedCartEvent {
}
/**
 * Event's type
 */
CloneSavedCartEvent.type = 'CloneSavedCartEvent';
class CloneSavedCartSuccessEvent extends SavedCartEvent {
}
/**
 * Event's type
 */
CloneSavedCartSuccessEvent.type = 'CloneSavedCartSuccessEvent';
class CloneSavedCartFailEvent extends SavedCartEvent {
}
/**
 * Event's type
 */
CloneSavedCartFailEvent.type = 'CloneSavedCartFailEvent';

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
const CART_SAVED_CART_FEATURE = 'cartSavedCart';
const CART_SAVED_CART_CORE_FEATURE = 'cartSavedCartCore';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SavedCartFacade {
}
SavedCartFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
SavedCartFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: SavedCartFacade,
        feature: CART_SAVED_CART_CORE_FEATURE,
        methods: [
            'editSavedCart',
            'deleteSavedCart',
            'getSavedCart',
            'getSavedCartList',
            'loadSavedCart',
            'clearCloneSavedCart',
            'clearRestoreSavedCart',
            'clearSaveCart',
            'clearSavedCarts',
            'get',
            'getList',
            'getCloneSavedCartProcessError',
            'getCloneSavedCartProcessLoading',
            'getCloneSavedCartProcessSuccess',
            'getRestoreSavedCartProcessError',
            'getRestoreSavedCartProcessLoading',
            'getRestoreSavedCartProcessSuccess',
            'getSaveCartProcessError',
            'getSaveCartProcessLoading',
            'getSaveCartProcessSuccess',
            'getSavedCartListProcess',
            'getSavedCartListProcessLoading',
            'isStable',
            'cloneSavedCart',
            'loadSavedCarts',
            'restoreSavedCart',
            'saveCart',
        ],
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: SavedCartFacade,
                        feature: CART_SAVED_CART_CORE_FEATURE,
                        methods: [
                            'editSavedCart',
                            'deleteSavedCart',
                            'getSavedCart',
                            'getSavedCartList',
                            'loadSavedCart',
                            'clearCloneSavedCart',
                            'clearRestoreSavedCart',
                            'clearSaveCart',
                            'clearSavedCarts',
                            'get',
                            'getList',
                            'getCloneSavedCartProcessError',
                            'getCloneSavedCartProcessLoading',
                            'getCloneSavedCartProcessSuccess',
                            'getRestoreSavedCartProcessError',
                            'getRestoreSavedCartProcessLoading',
                            'getRestoreSavedCartProcessSuccess',
                            'getSaveCartProcessError',
                            'getSaveCartProcessLoading',
                            'getSaveCartProcessSuccess',
                            'getSavedCartListProcess',
                            'getSavedCartListProcessLoading',
                            'isStable',
                            'cloneSavedCart',
                            'loadSavedCarts',
                            'restoreSavedCart',
                            'saveCart',
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
var SavedCartFormType;
(function (SavedCartFormType) {
    SavedCartFormType["EDIT"] = "edit";
    SavedCartFormType["DELETE"] = "delete";
    SavedCartFormType["SAVE"] = "save";
    SavedCartFormType["RESTORE"] = "restore";
})(SavedCartFormType || (SavedCartFormType = {}));

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
const SavedCartOrderEntriesContextToken = new InjectionToken('SavedCartOrderEntriesContext');
const NewSavedCartOrderEntriesContextToken = new InjectionToken('NewSavedCartOrderEntriesContext');

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// TODO: Inline this factory when we start releasing Ivy compiled libraries
function defaultCartSavedCartComponentsConfig() {
    const config = {
        featureModules: {
            [CART_SAVED_CART_FEATURE]: {
                cmsComponents: [
                    'AddToSavedCartsComponent',
                    'AccountSavedCartHistoryComponent',
                    'SavedCartDetailsOverviewComponent',
                    'SavedCartDetailsItemsComponent',
                    'SavedCartDetailsActionComponent',
                ],
                dependencies: [CART_BASE_FEATURE],
            },
            // by default core is bundled together with components
            [CART_SAVED_CART_CORE_FEATURE]: CART_SAVED_CART_FEATURE,
        },
    };
    return config;
}
class SavedCartRootModule {
}
SavedCartRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SavedCartRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SavedCartRootModule, imports: [i1.RouterModule] });
SavedCartRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartRootModule, providers: [
        provideDefaultConfigFactory(defaultCartSavedCartComponentsConfig),
        provideDefaultConfig({
            routing: {
                routes: {
                    savedCarts: {
                        paths: ['my-account/saved-carts'],
                    },
                    savedCartsDetails: {
                        paths: ['my-account/saved-cart/:savedCartId'],
                        paramsMapping: { savedCartId: 'savedCartId' },
                    },
                },
            },
        }),
    ], imports: [RouterModule.forChild([
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: {
                    cxRoute: 'savedCartsDetails',
                    cxContext: {
                        [ORDER_ENTRIES_CONTEXT]: SavedCartOrderEntriesContextToken,
                    },
                },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: {
                    cxRoute: 'savedCarts',
                    cxContext: {
                        [ORDER_ENTRIES_CONTEXT]: NewSavedCartOrderEntriesContextToken,
                    },
                },
            },
        ])] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule.forChild([
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: {
                                    cxRoute: 'savedCartsDetails',
                                    cxContext: {
                                        [ORDER_ENTRIES_CONTEXT]: SavedCartOrderEntriesContextToken,
                                    },
                                },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: {
                                    cxRoute: 'savedCarts',
                                    cxContext: {
                                        [ORDER_ENTRIES_CONTEXT]: NewSavedCartOrderEntriesContextToken,
                                    },
                                },
                            },
                        ]),
                    ],
                    providers: [
                        provideDefaultConfigFactory(defaultCartSavedCartComponentsConfig),
                        provideDefaultConfig({
                            routing: {
                                routes: {
                                    savedCarts: {
                                        paths: ['my-account/saved-carts'],
                                    },
                                    savedCartsDetails: {
                                        paths: ['my-account/saved-cart/:savedCartId'],
                                        paramsMapping: { savedCartId: 'savedCartId' },
                                    },
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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CART_SAVED_CART_CORE_FEATURE, CART_SAVED_CART_FEATURE, CloneSavedCartEvent, CloneSavedCartFailEvent, CloneSavedCartSuccessEvent, EditSavedCartEvent, EditSavedCartFailEvent, EditSavedCartSuccessEvent, NewSavedCartOrderEntriesContextToken, RestoreSavedCartEvent, RestoreSavedCartFailEvent, RestoreSavedCartSuccessEvent, SaveCartEvent, SaveCartFailEvent, SaveCartSuccessEvent, SavedCartEvent, SavedCartFacade, SavedCartFormType, SavedCartOrderEntriesContextToken, SavedCartRootModule, defaultCartSavedCartComponentsConfig };
//# sourceMappingURL=spartacus-cart-saved-cart-root.mjs.map
