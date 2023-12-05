import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import { DeliveryModePreferences, CheckoutEvent, CheckoutSupportedDeliveryModesQueryResetEvent, CheckoutQueryResetEvent, CHECKOUT_BASE_CMS_COMPONENTS, CHECKOUT_FEATURE, CHECKOUT_CORE_FEATURE } from '@spartacus/checkout/base/root';
import * as i1 from '@spartacus/core';
import { LanguageSetEvent, CurrencySetEvent, LogoutEvent, LoginEvent, provideDefaultConfig, provideDefaultConfigFactory, facadeFactory } from '@spartacus/core';
import { Subscription, merge } from 'rxjs';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultB2BCheckoutConfig = {
    checkout: {
        steps: [
            {
                id: 'paymentType',
                name: 'checkoutB2B.progress.methodOfPayment',
                routeName: 'checkoutPaymentType',
                type: ["paymentType" /* CheckoutStepType.PAYMENT_TYPE */],
            },
            {
                id: 'deliveryAddress',
                name: 'checkoutProgress.deliveryAddress',
                routeName: 'checkoutDeliveryAddress',
                type: ["deliveryAddress" /* CheckoutStepType.DELIVERY_ADDRESS */],
            },
            {
                id: 'deliveryMode',
                name: 'checkoutProgress.deliveryMode',
                routeName: 'checkoutDeliveryMode',
                type: ["deliveryMode" /* CheckoutStepType.DELIVERY_MODE */],
            },
            {
                id: 'paymentDetails',
                name: 'checkoutProgress.paymentDetails',
                routeName: 'checkoutPaymentDetails',
                type: ["paymentDetails" /* CheckoutStepType.PAYMENT_DETAILS */],
            },
            {
                id: 'reviewOrder',
                name: 'checkoutProgress.reviewOrder',
                routeName: 'checkoutReviewOrder',
                type: ["reviewOrder" /* CheckoutStepType.REVIEW_ORDER */],
            },
        ],
        express: false,
        defaultDeliveryMode: [DeliveryModePreferences.FREE],
        guest: false,
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultCheckoutB2BRoutingConfig = {
    routing: {
        routes: {
            checkoutPaymentType: { paths: ['checkout/payment-type'] },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * An abstract event for all the cost center related events.
 */
class CheckoutCostCenterEvent extends CheckoutEvent {
}
/**
 * Fired when the cost center has been set.
 */
class CheckoutCostCenterSetEvent extends CheckoutCostCenterEvent {
}
/**
 * Event's type
 */
CheckoutCostCenterSetEvent.type = 'CheckoutCostCenterSetEvent';
/**
 * An abstract event for all the payment type related events.
 */
class CheckoutPaymentTypeEvent extends CheckoutEvent {
}
/**
 * Emit this event to force payment types reload
 */
class CheckoutPaymentTypesQueryReloadEvent extends CheckoutPaymentTypeEvent {
}
/**
 * Event's type
 */
CheckoutPaymentTypesQueryReloadEvent.type = 'CheckoutPaymentTypesQueryReloadEvent';
/**
 * Emit this event to force payment types reset
 */
class CheckoutPaymentTypesQueryResetEvent extends CheckoutPaymentTypeEvent {
}
/**
 * Event's type
 */
CheckoutPaymentTypesQueryResetEvent.type = 'CheckoutPaymentTypesQueryResetEvent';
/**
 * Fired when the payment type has been set
 */
class CheckoutPaymentTypeSetEvent extends CheckoutPaymentTypeEvent {
}
/**
 * Event's type
 */
CheckoutPaymentTypeSetEvent.type = 'CheckoutPaymentTypeSetEvent';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutCostCenterEventListener {
    constructor(eventService) {
        this.eventService = eventService;
        this.subscriptions = new Subscription();
        this.onCostCenterSet();
    }
    onCostCenterSet() {
        this.subscriptions.add(this.eventService
            .get(CheckoutCostCenterSetEvent)
            .subscribe(({ cartId, userId }) => {
            this.eventService.dispatch({ cartId, userId }, CheckoutSupportedDeliveryModesQueryResetEvent);
            this.eventService.dispatch({}, CheckoutQueryResetEvent);
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
CheckoutCostCenterEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCostCenterEventListener, deps: [{ token: i1.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutCostCenterEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCostCenterEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCostCenterEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutPaymentTypeEventListener {
    constructor(eventService) {
        this.eventService = eventService;
        this.subscriptions = new Subscription();
        this.onPaymentTypeSet();
        this.onGetPaymentTypesQueryReload();
        this.onGetPaymentTypesQueryReset();
    }
    onPaymentTypeSet() {
        this.subscriptions.add(this.eventService
            .get(CheckoutPaymentTypeSetEvent)
            .subscribe(({ userId, cartId }) => {
            this.eventService.dispatch({ userId, cartId }, CheckoutSupportedDeliveryModesQueryResetEvent);
            this.eventService.dispatch({}, CheckoutQueryResetEvent);
        }));
    }
    onGetPaymentTypesQueryReload() {
        this.subscriptions.add(merge(this.eventService.get(LanguageSetEvent), this.eventService.get(CurrencySetEvent)).subscribe(() => {
            this.eventService.dispatch({}, CheckoutPaymentTypesQueryReloadEvent);
        }));
    }
    onGetPaymentTypesQueryReset() {
        this.subscriptions.add(merge(this.eventService.get(LogoutEvent), this.eventService.get(LoginEvent)).subscribe(() => {
            this.eventService.dispatch({}, CheckoutPaymentTypesQueryResetEvent);
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
CheckoutPaymentTypeEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeEventListener, deps: [{ token: i1.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutPaymentTypeEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutB2BEventModule {
    constructor(_checkoutCostCenterEventListener, _checkoutPaymentTypeEventListener) {
        // Intentional empty constructor
    }
}
CheckoutB2BEventModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BEventModule, deps: [{ token: CheckoutCostCenterEventListener }, { token: CheckoutPaymentTypeEventListener }], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutB2BEventModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BEventModule });
CheckoutB2BEventModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BEventModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BEventModule, decorators: [{
            type: NgModule,
            args: [{}]
        }], ctorParameters: function () { return [{ type: CheckoutCostCenterEventListener }, { type: CheckoutPaymentTypeEventListener }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CHECKOUT_B2B_CMS_COMPONENTS = [
    /**
     *  TODO:#9574 - we should be able to remove the spread of `CHECKOUT_BASE_CMS_COMPONENTS`.
     * Re-test the B2B checkout flow after doing it.
     */
    ...CHECKOUT_BASE_CMS_COMPONENTS,
    'CheckoutCostCenterComponent',
    'CheckoutPaymentType',
];
function defaultCheckoutComponentsConfig() {
    const config = {
        featureModules: {
            [CHECKOUT_FEATURE]: {
                cmsComponents: CHECKOUT_B2B_CMS_COMPONENTS,
            },
        },
    };
    return config;
}
class CheckoutB2BRootModule {
}
CheckoutB2BRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutB2BRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BRootModule, imports: [CheckoutB2BEventModule] });
CheckoutB2BRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BRootModule, providers: [
        provideDefaultConfig(defaultB2BCheckoutConfig),
        provideDefaultConfig(defaultCheckoutB2BRoutingConfig),
        provideDefaultConfigFactory(defaultCheckoutComponentsConfig),
    ], imports: [CheckoutB2BEventModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CheckoutB2BEventModule],
                    providers: [
                        provideDefaultConfig(defaultB2BCheckoutConfig),
                        provideDefaultConfig(defaultCheckoutB2BRoutingConfig),
                        provideDefaultConfigFactory(defaultCheckoutComponentsConfig),
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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutCostCenterFacade {
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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutPaymentTypeFacade {
}
CheckoutPaymentTypeFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutPaymentTypeFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: CheckoutPaymentTypeFacade,
        feature: CHECKOUT_CORE_FEATURE,
        methods: [
            'getPaymentTypes',
            'getPaymentTypesState',
            'setPaymentType',
            'getSelectedPaymentTypeState',
            'isAccountPayment',
            'getPurchaseOrderNumberState',
        ],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: CheckoutPaymentTypeFacade,
                        feature: CHECKOUT_CORE_FEATURE,
                        methods: [
                            'getPaymentTypes',
                            'getPaymentTypesState',
                            'setPaymentType',
                            'getSelectedPaymentTypeState',
                            'isAccountPayment',
                            'getPurchaseOrderNumberState',
                        ],
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
var B2BPaymentTypeEnum;
(function (B2BPaymentTypeEnum) {
    B2BPaymentTypeEnum["ACCOUNT_PAYMENT"] = "ACCOUNT";
    B2BPaymentTypeEnum["CARD_PAYMENT"] = "CARD";
})(B2BPaymentTypeEnum || (B2BPaymentTypeEnum = {}));

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

export { B2BPaymentTypeEnum, CHECKOUT_B2B_CMS_COMPONENTS, CheckoutB2BEventModule, CheckoutB2BRootModule, CheckoutCostCenterEvent, CheckoutCostCenterEventListener, CheckoutCostCenterFacade, CheckoutCostCenterSetEvent, CheckoutPaymentTypeEvent, CheckoutPaymentTypeEventListener, CheckoutPaymentTypeFacade, CheckoutPaymentTypeSetEvent, CheckoutPaymentTypesQueryReloadEvent, CheckoutPaymentTypesQueryResetEvent, defaultB2BCheckoutConfig, defaultCheckoutB2BRoutingConfig, defaultCheckoutComponentsConfig };
//# sourceMappingURL=spartacus-checkout-b2b-root.mjs.map
