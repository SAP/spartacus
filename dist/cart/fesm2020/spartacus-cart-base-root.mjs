import * as i0 from '@angular/core';
import { Injectable, NgModule, InjectionToken } from '@angular/core';
import * as i1$1 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i1 from '@spartacus/core';
import { CxEvent, facadeFactory, provideDefaultConfigFactory, provideDefaultConfig, Config } from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent, PageEvent } from '@spartacus/storefront';
import { Subscription } from 'rxjs';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultCartConfig = {
    cart: {
        validation: {
            enabled: false,
        },
        selectiveCart: {
            enabled: false,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultCartRoutingConfig = {
    routing: {
        routes: {
            cart: { paths: ['cart'] },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const ORDER_ENTRIES_CONTEXT = Symbol('ORDER_ENTRIES_CONTEXT');

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Base cart event. Most cart events should have these properties.
 */
class CartEvent extends CxEvent {
}
class CreateCartEvent extends CartEvent {
}
/**
 * Event's type
 */
CreateCartEvent.type = 'CreateCartEvent';
class CreateCartSuccessEvent extends CartEvent {
}
/**
 * Event's type
 */
CreateCartSuccessEvent.type = 'CreateCartSuccessEvent';
class CreateCartFailEvent extends CartEvent {
}
/**
 * Event's type
 */
CreateCartFailEvent.type = 'CreateCartFailEvent';
class CartAddEntryEvent extends CartEvent {
}
/**
 * Event's type
 */
CartAddEntryEvent.type = 'CartAddEntryEvent';
class CartAddEntrySuccessEvent extends CartEvent {
}
/**
 * Event's type
 */
CartAddEntrySuccessEvent.type = 'CartAddEntrySuccessEvent';
class CartAddEntryFailEvent extends CartEvent {
}
/**
 * Event's type
 */
CartAddEntryFailEvent.type = 'CartAddEntryFailEvent';
class CartRemoveEntryFailEvent extends CartEvent {
}
/**
 * Event's type
 */
CartRemoveEntryFailEvent.type = 'CartRemoveEntryFailEvent';
class CartRemoveEntrySuccessEvent extends CartEvent {
}
/**
 * Event's type
 */
CartRemoveEntrySuccessEvent.type = 'CartRemoveEntrySuccessEvent';
class CartUpdateEntrySuccessEvent extends CartEvent {
}
/**
 * Event's type
 */
CartUpdateEntrySuccessEvent.type = 'CartUpdateEntrySuccessEvent';
class CartUpdateEntryFailEvent extends CartEvent {
}
/**
 * Event's type
 */
CartUpdateEntryFailEvent.type = 'CartUpdateEntryFailEvent';
class CartUiEventAddToCart extends CxEvent {
}
/**
 * Event's type
 */
CartUiEventAddToCart.type = 'CartUiEventAddToCart';
/**
 * Fired when the cart has been successfully merged.
 */
class MergeCartSuccessEvent extends CartEvent {
}
/**
 * Event's type
 */
MergeCartSuccessEvent.type = 'MergeCartSuccessEvent';
/**
 * Triggers the loading of the cart.
 */
class LoadCartEvent extends CartEvent {
}
/**
 * Event's type
 */
LoadCartEvent.type = 'LoadCartEvent';
/** Removes the cart. */
class RemoveCartEvent extends CartEvent {
}
/**
 * Event's type
 */
RemoveCartEvent.type = 'RemoveCartEvent';
/**
 * Fired when the cart has been deleted.
 */
class DeleteCartEvent extends CartEvent {
}
/**
 * Event's type
 */
DeleteCartEvent.type = 'DeleteCartEvent';
class DeleteCartSuccessEvent extends CartEvent {
}
/**
 * Event's type
 */
DeleteCartSuccessEvent.type = 'DeleteCartSuccessEvent';
class DeleteCartFailEvent extends CartEvent {
}
/**
 * Event's type
 */
DeleteCartFailEvent.type = 'DeleteCartFailEvent';
class AddCartVoucherEvent extends CartEvent {
}
/**
 * Event's type
 */
AddCartVoucherEvent.type = 'AddCartVoucherEvent';
class AddCartVoucherSuccessEvent extends AddCartVoucherEvent {
}
/**
 * Event's type
 */
AddCartVoucherSuccessEvent.type = 'AddCartVoucherSuccessEvent';
class AddCartVoucherFailEvent extends AddCartVoucherEvent {
}
/**
 * Event's type
 */
AddCartVoucherFailEvent.type = 'AddCartVoucherFailEvent';
class RemoveCartVoucherEvent extends CartEvent {
}
/**
 * Event's type
 */
RemoveCartVoucherEvent.type = 'RemoveCartVoucherEvent';
class RemoveCartVoucherSuccessEvent extends RemoveCartVoucherEvent {
}
/**
 * Event's type
 */
RemoveCartVoucherSuccessEvent.type = 'RemoveCartVoucherSuccessEvent';
class RemoveCartVoucherFailEvent extends RemoveCartVoucherEvent {
}
/**
 * Event's type
 */
RemoveCartVoucherFailEvent.type = 'RemoveCartVoucherFailEvent';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CART_BASE_FEATURE = 'cartBase';
const CART_BASE_CORE_FEATURE = 'cartBaseCore';
const MINI_CART_FEATURE = 'miniCart';
const ADD_TO_CART_FEATURE = 'addToCart';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class MultiCartFacade {
}
MultiCartFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
MultiCartFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: MultiCartFacade,
        feature: CART_BASE_CORE_FEATURE,
        methods: [
            'getCart',
            'getCarts',
            'getCartEntity',
            'isStable',
            'createCart',
            'mergeToCurrentCart',
            'loadCart',
            'getEntries',
            'getLastEntry',
            'addEntry',
            'addEntries',
            'removeEntry',
            'updateEntry',
            'getEntry',
            'assignEmail',
            'removeCart',
            'deleteCart',
            'reloadCart',
            'getCartIdByType',
        ],
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: MultiCartFacade,
                        feature: CART_BASE_CORE_FEATURE,
                        methods: [
                            'getCart',
                            'getCarts',
                            'getCartEntity',
                            'isStable',
                            'createCart',
                            'mergeToCurrentCart',
                            'loadCart',
                            'getEntries',
                            'getLastEntry',
                            'addEntry',
                            'addEntries',
                            'removeEntry',
                            'updateEntry',
                            'getEntry',
                            'assignEmail',
                            'removeCart',
                            'deleteCart',
                            'reloadCart',
                            'getCartIdByType',
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
class MultiCartEventListener {
    constructor(eventService, multiCartFacade) {
        this.eventService = eventService;
        this.multiCartFacade = multiCartFacade;
        this.subscriptions = new Subscription();
        this.onCartBaseAction();
    }
    /**
     * Registers events for the cart base actions.
     */
    onCartBaseAction() {
        this.subscriptions.add(this.eventService.get(LoadCartEvent).subscribe(({ userId, cartId }) => {
            if (userId && cartId) {
                this.multiCartFacade.loadCart({ userId, cartId });
            }
        }));
        this.subscriptions.add(this.eventService.get(RemoveCartEvent).subscribe(({ cartId }) => {
            this.multiCartFacade.removeCart(cartId);
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
MultiCartEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartEventListener, deps: [{ token: i1.EventService }, { token: MultiCartFacade }], target: i0.ɵɵFactoryTarget.Injectable });
MultiCartEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }, { type: MultiCartFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartBaseEventModule {
    constructor(_multiCartEventListener) {
        // Intentional empty constructor
    }
}
CartBaseEventModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseEventModule, deps: [{ token: MultiCartEventListener }], target: i0.ɵɵFactoryTarget.NgModule });
CartBaseEventModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartBaseEventModule });
CartBaseEventModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseEventModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseEventModule, decorators: [{
            type: NgModule,
            args: [{}]
        }], ctorParameters: function () { return [{ type: MultiCartEventListener }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const ActiveCartOrderEntriesContextToken = new InjectionToken('ActiveCartOrderEntriesContext');

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function defaultCartComponentsConfig() {
    const config = {
        featureModules: {
            [CART_BASE_FEATURE]: {
                cmsComponents: [
                    'CartApplyCouponComponent',
                    'CartComponent',
                    'CartProceedToCheckoutComponent',
                    'CartTotalsComponent',
                    'SaveForLaterComponent',
                    'ClearCartComponent',
                ],
            },
            [MINI_CART_FEATURE]: {
                cmsComponents: ['MiniCartComponent'],
            },
            [ADD_TO_CART_FEATURE]: {
                cmsComponents: ['ProductAddToCartComponent'],
            },
            // By default core is bundled together with components.
            // The cart lib should keep using this default.
            //
            // While the lazy loading configurations make it possible to
            // split the core part and the components part, it is required that
            // they stay together for the cart lib.  This compromise is required to
            // optimize performances by delaying the moment the cart lib is loaded and
            // making sure cart lib is loaded when needed.
            [CART_BASE_CORE_FEATURE]: CART_BASE_FEATURE,
        },
    };
    return config;
}
class CartBaseRootModule {
}
CartBaseRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartBaseRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartBaseRootModule, imports: [CartBaseEventModule, i1$1.RouterModule] });
CartBaseRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseRootModule, providers: [
        provideDefaultConfigFactory(defaultCartComponentsConfig),
        provideDefaultConfig(defaultCartConfig),
        provideDefaultConfig(defaultCartRoutingConfig),
    ], imports: [CartBaseEventModule,
        RouterModule.forChild([
            {
                // @ts-ignore
                path: null,
                canActivate: [CmsPageGuard],
                component: PageLayoutComponent,
                data: {
                    cxRoute: 'cart',
                    cxContext: {
                        [ORDER_ENTRIES_CONTEXT]: ActiveCartOrderEntriesContextToken,
                    },
                },
            },
        ])] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CartBaseEventModule,
                        RouterModule.forChild([
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [CmsPageGuard],
                                component: PageLayoutComponent,
                                data: {
                                    cxRoute: 'cart',
                                    cxContext: {
                                        [ORDER_ENTRIES_CONTEXT]: ActiveCartOrderEntriesContextToken,
                                    },
                                },
                            },
                        ]),
                    ],
                    providers: [
                        provideDefaultConfigFactory(defaultCartComponentsConfig),
                        provideDefaultConfig(defaultCartConfig),
                        provideDefaultConfig(defaultCartRoutingConfig),
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartConfig {
}
CartConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CartConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartConfig, decorators: [{
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
 * Indicates that a user visited a cart page.
 */
class CartPageEvent extends PageEvent {
}
/** event's type */
CartPageEvent.type = 'CartPageEvent';

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
class ActiveCartFacade {
}
ActiveCartFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ActiveCartFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ActiveCartFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ActiveCartFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: ActiveCartFacade,
        feature: CART_BASE_CORE_FEATURE,
        methods: [
            'getActive',
            'takeActive',
            'getActiveCartId',
            'takeActiveCartId',
            'getEntries',
            'getLastEntry',
            'getLoading',
            'isStable',
            'addEntry',
            'removeEntry',
            'updateEntry',
            'getEntry',
            'addEmail',
            'getAssignedUser',
            'isGuestCart',
            'addEntries',
            'requireLoadedCart',
            'reloadActiveCart',
            'hasPickupItems',
            'hasDeliveryItems',
            'getPickupEntries',
            'getDeliveryEntries',
        ],
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ActiveCartFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: ActiveCartFacade,
                        feature: CART_BASE_CORE_FEATURE,
                        methods: [
                            'getActive',
                            'takeActive',
                            'getActiveCartId',
                            'takeActiveCartId',
                            'getEntries',
                            'getLastEntry',
                            'getLoading',
                            'isStable',
                            'addEntry',
                            'removeEntry',
                            'updateEntry',
                            'getEntry',
                            'addEmail',
                            'getAssignedUser',
                            'isGuestCart',
                            'addEntries',
                            'requireLoadedCart',
                            'reloadActiveCart',
                            'hasPickupItems',
                            'hasDeliveryItems',
                            'getPickupEntries',
                            'getDeliveryEntries',
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
class CartValidationFacade {
}
CartValidationFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CartValidationFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: CartValidationFacade,
        feature: CART_BASE_CORE_FEATURE,
        methods: ['validateCart', 'getValidationResults'],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: CartValidationFacade,
                        feature: CART_BASE_CORE_FEATURE,
                        methods: ['validateCart', 'getValidationResults'],
                    }),
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartVoucherFacade {
}
CartVoucherFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartVoucherFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CartVoucherFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartVoucherFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: CartVoucherFacade,
        feature: CART_BASE_CORE_FEATURE,
        methods: [
            'addVoucher',
            'removeVoucher',
            'getAddVoucherResultError',
            'getAddVoucherResultSuccess',
            'getAddVoucherResultLoading',
            'resetAddVoucherProcessingState',
        ],
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartVoucherFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: CartVoucherFacade,
                        feature: CART_BASE_CORE_FEATURE,
                        methods: [
                            'addVoucher',
                            'removeVoucher',
                            'getAddVoucherResultError',
                            'getAddVoucherResultSuccess',
                            'getAddVoucherResultLoading',
                            'resetAddVoucherProcessingState',
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
class SelectiveCartFacade {
}
SelectiveCartFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SelectiveCartFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
SelectiveCartFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SelectiveCartFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: SelectiveCartFacade,
        feature: CART_BASE_CORE_FEATURE,
        methods: [
            'getCart',
            'getEntries',
            'isStable',
            'addEntry',
            'removeEntry',
            'updateEntry',
            'getEntry',
        ],
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SelectiveCartFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: SelectiveCartFacade,
                        feature: CART_BASE_CORE_FEATURE,
                        methods: [
                            'getCart',
                            'getEntries',
                            'isStable',
                            'addEntry',
                            'removeEntry',
                            'updateEntry',
                            'getEntry',
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
/**
 * Context for `CartItemComponent`.
 */
class CartItemContext {
}
CartItemContext.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartItemContext, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CartItemContext.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartItemContext });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartItemContext, decorators: [{
            type: Injectable
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Identifiers of outlets inside the cart details view.
 */
var CartOutlets;
(function (CartOutlets) {
    CartOutlets["ITEM"] = "cx-cart-item";
    CartOutlets["LIST_ITEM"] = "cx-cart-item-list-row";
    CartOutlets["ITEM_DETAILS"] = "cx-cart-item.details";
    CartOutlets["ITEM_CONFIGURATOR_ISSUES"] = "cx-configurator-issues-notification";
    CartOutlets["ITEM_BUNDLE_DETAILS"] = "cx-cart-item.bundle-details";
    CartOutlets["ITEM_DELIVERY_DETAILS"] = "cx-cart-item.delivery-details";
    CartOutlets["ORDER_SUMMARY"] = "cx-order-summary";
    CartOutlets["CART_ITEM_LIST"] = "cx-cart-item-list";
    CartOutlets["ADD_TO_CART_CONTAINER"] = "cx-add-to-cart-container";
    CartOutlets["PICKUP_INFO"] = "cx-pickup-info";
    CartOutlets["ADD_TO_CART_PICKUP_OPTION"] = "cx-add-to-cart-pickup-option";
    CartOutlets["DELIVERY_MODE"] = "cx-delivery-mode";
    CartOutlets["ORDER_OVERVIEW"] = "cx-order-overview";
})(CartOutlets || (CartOutlets = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var PromotionLocation;
(function (PromotionLocation) {
    PromotionLocation["ActiveCart"] = "CART";
    PromotionLocation["Checkout"] = "CHECKOUT";
    PromotionLocation["Order"] = "ORDER";
    PromotionLocation["SaveForLater"] = "SAVE_FOR_LATER";
    PromotionLocation["SavedCart"] = "SAVED_CART";
})(PromotionLocation || (PromotionLocation = {}));
var CartType;
(function (CartType) {
    CartType["ACTIVE"] = "Active";
    CartType["WISH_LIST"] = "WishList";
    CartType["SELECTIVE"] = "Selective";
    CartType["NEW_CREATED"] = "NewCreated";
})(CartType || (CartType = {}));
var CartValidationStatusCode;
(function (CartValidationStatusCode) {
    CartValidationStatusCode["NO_STOCK"] = "noStock";
    CartValidationStatusCode["LOW_STOCK"] = "lowStock";
    CartValidationStatusCode["REVIEW_CONFIGURATION"] = "reviewConfiguration";
    CartValidationStatusCode["PRICING_ERROR"] = "pricingError";
    CartValidationStatusCode["UNRESOLVABLE_ISSUES"] = "unresolvableIssues";
})(CartValidationStatusCode || (CartValidationStatusCode = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var OrderEntriesSource;
(function (OrderEntriesSource) {
    OrderEntriesSource["ACTIVE_CART"] = "ACTIVE_CART";
    OrderEntriesSource["NEW_SAVED_CART"] = "NEW_SAVED_CART";
    OrderEntriesSource["QUICK_ORDER"] = "QUICK_ORDER";
    OrderEntriesSource["SAVED_CART"] = "SAVED_CART";
    OrderEntriesSource["ORDER_CONFIRMATION"] = "ORDER_CONFIRMATION";
    OrderEntriesSource["ORDER_DETAILS"] = "ORDER_DETAILS";
    OrderEntriesSource["UNIT_ORDER_DETAILS"] = "UNIT_ORDER_DETAILS";
})(OrderEntriesSource || (OrderEntriesSource = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var ProductImportStatus;
(function (ProductImportStatus) {
    ProductImportStatus["SUCCESS"] = "success";
    ProductImportStatus["LOW_STOCK"] = "lowStock";
    ProductImportStatus["NO_STOCK"] = "noStock";
    ProductImportStatus["UNKNOWN_IDENTIFIER"] = "unknownIdentifier";
    ProductImportStatus["UNKNOWN_ERROR"] = "unknownError";
    ProductImportStatus["LIMIT_EXCEEDED"] = "limitExceeded";
})(ProductImportStatus || (ProductImportStatus = {}));

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
const CART_NORMALIZER = new InjectionToken('CartNormalizer');
const ORDER_ENTRY_PROMOTIONS_NORMALIZER = new InjectionToken('OrderEntryPromotionsNormalizer');
const CART_MODIFICATION_NORMALIZER = new InjectionToken('CartModificationNormalizer');
const SAVE_CART_NORMALIZER = new InjectionToken('SaveCartNormalizer');
const CART_VOUCHER_NORMALIZER = new InjectionToken('CartVoucherNormalizer');

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
/** AUGMENTABLE_TYPES_END */

/**
 * Generated bundle index. Do not edit.
 */

export { ADD_TO_CART_FEATURE, ActiveCartFacade, ActiveCartOrderEntriesContextToken, AddCartVoucherEvent, AddCartVoucherFailEvent, AddCartVoucherSuccessEvent, CART_BASE_CORE_FEATURE, CART_BASE_FEATURE, CART_MODIFICATION_NORMALIZER, CART_NORMALIZER, CART_VOUCHER_NORMALIZER, CartAddEntryEvent, CartAddEntryFailEvent, CartAddEntrySuccessEvent, CartBaseEventModule, CartBaseRootModule, CartConfig, CartEvent, CartItemContext, CartOutlets, CartPageEvent, CartRemoveEntryFailEvent, CartRemoveEntrySuccessEvent, CartType, CartUiEventAddToCart, CartUpdateEntryFailEvent, CartUpdateEntrySuccessEvent, CartValidationFacade, CartValidationStatusCode, CartVoucherFacade, CreateCartEvent, CreateCartFailEvent, CreateCartSuccessEvent, DeleteCartEvent, DeleteCartFailEvent, DeleteCartSuccessEvent, LoadCartEvent, MINI_CART_FEATURE, MergeCartSuccessEvent, MultiCartEventListener, MultiCartFacade, ORDER_ENTRIES_CONTEXT, ORDER_ENTRY_PROMOTIONS_NORMALIZER, OrderEntriesSource, ProductImportStatus, PromotionLocation, RemoveCartEvent, RemoveCartVoucherEvent, RemoveCartVoucherFailEvent, RemoveCartVoucherSuccessEvent, SAVE_CART_NORMALIZER, SelectiveCartFacade, defaultCartComponentsConfig };
//# sourceMappingURL=spartacus-cart-base-root.mjs.map
