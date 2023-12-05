import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { CheckoutB2BComponentsModule } from '@spartacus/checkout/b2b/components';
import { CheckoutB2BCoreModule } from '@spartacus/checkout/b2b/core';
import { CheckoutB2BOccModule } from '@spartacus/checkout/b2b/occ';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutB2BModule {
}
CheckoutB2BModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutB2BModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BModule, imports: [CheckoutB2BComponentsModule,
        CheckoutB2BCoreModule,
        CheckoutB2BOccModule] });
CheckoutB2BModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BModule, imports: [CheckoutB2BComponentsModule,
        CheckoutB2BCoreModule,
        CheckoutB2BOccModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CheckoutB2BComponentsModule,
                        CheckoutB2BCoreModule,
                        CheckoutB2BOccModule,
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

export { CheckoutB2BModule };
//# sourceMappingURL=spartacus-checkout-b2b.mjs.map
