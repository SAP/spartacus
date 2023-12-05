import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { CheckoutComponentsModule } from '@spartacus/checkout/base/components';
import { CheckoutCoreModule } from '@spartacus/checkout/base/core';
import { CheckoutOccModule } from '@spartacus/checkout/base/occ';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutModule {
}
CheckoutModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutModule, imports: [CheckoutComponentsModule, CheckoutCoreModule, CheckoutOccModule] });
CheckoutModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutModule, imports: [CheckoutComponentsModule, CheckoutCoreModule, CheckoutOccModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CheckoutComponentsModule, CheckoutCoreModule, CheckoutOccModule],
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

export { CheckoutModule };
//# sourceMappingURL=spartacus-checkout-base.mjs.map
