import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import { CHECKOUT_B2B_CMS_COMPONENTS } from '@spartacus/checkout/b2b/root';
import { CheckoutQueryResetEvent, CHECKOUT_FEATURE } from '@spartacus/checkout/base/root';
import * as i1 from '@spartacus/core';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { RemoveCartEvent } from '@spartacus/cart/base/root';
import { ReplenishmentOrderScheduledEvent } from '@spartacus/order/root';
import { Subscription } from 'rxjs';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutScheduledReplenishmentEventListener {
    constructor(eventService) {
        this.eventService = eventService;
        this.subscriptions = new Subscription();
        this.onReplenishmentOrder();
    }
    onReplenishmentOrder() {
        this.subscriptions.add(this.eventService
            .get(ReplenishmentOrderScheduledEvent)
            .subscribe(({ userId, cartId, cartCode }) => {
            this.eventService.dispatch({
                userId,
                cartId,
                cartCode,
            }, RemoveCartEvent);
            this.eventService.dispatch({}, CheckoutQueryResetEvent);
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
CheckoutScheduledReplenishmentEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentEventListener, deps: [{ token: i1.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutScheduledReplenishmentEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentEventListener, decorators: [{
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
class CheckoutScheduledReplenishmentEventModule {
    constructor(_checkoutScheduledReplenishmentEventListener) {
        // Intentional empty constructor
    }
}
CheckoutScheduledReplenishmentEventModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentEventModule, deps: [{ token: CheckoutScheduledReplenishmentEventListener }], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutScheduledReplenishmentEventModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentEventModule });
CheckoutScheduledReplenishmentEventModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentEventModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentEventModule, decorators: [{
            type: NgModule,
            args: [{}]
        }], ctorParameters: function () { return [{ type: CheckoutScheduledReplenishmentEventListener }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CHECKOUT_SCHEDULED_REPLENISHMENT_CMS_COMPONENTS = [
    /**
     *  TODO:#9574 - we should be able to remove the spread of `CHECKOUT_BASE_CMS_COMPONENTS`.
     * Re-test the B2B checkout flow after doing it.
     */
    ...CHECKOUT_B2B_CMS_COMPONENTS,
    'CheckoutScheduleReplenishmentOrder',
];
function defaultCheckoutComponentsConfig() {
    const config = {
        featureModules: {
            [CHECKOUT_FEATURE]: {
                cmsComponents: CHECKOUT_SCHEDULED_REPLENISHMENT_CMS_COMPONENTS,
            },
        },
    };
    return config;
}
class CheckoutScheduledReplenishmentRootModule {
}
CheckoutScheduledReplenishmentRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutScheduledReplenishmentRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentRootModule, imports: [CheckoutScheduledReplenishmentEventModule] });
CheckoutScheduledReplenishmentRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentRootModule, providers: [provideDefaultConfigFactory(defaultCheckoutComponentsConfig)], imports: [CheckoutScheduledReplenishmentEventModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CheckoutScheduledReplenishmentEventModule],
                    providers: [provideDefaultConfigFactory(defaultCheckoutComponentsConfig)],
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

export { CHECKOUT_SCHEDULED_REPLENISHMENT_CMS_COMPONENTS, CheckoutScheduledReplenishmentEventListener, CheckoutScheduledReplenishmentEventModule, CheckoutScheduledReplenishmentRootModule, defaultCheckoutComponentsConfig };
//# sourceMappingURL=spartacus-checkout-scheduled-replenishment-root.mjs.map
