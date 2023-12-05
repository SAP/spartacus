import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { QuickOrderComponentsModule } from '@spartacus/cart/quick-order/components';
import { QuickOrderCoreModule } from '@spartacus/cart/quick-order/core';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class QuickOrderModule {
}
QuickOrderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
QuickOrderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderModule, imports: [QuickOrderCoreModule, QuickOrderComponentsModule] });
QuickOrderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderModule, imports: [QuickOrderCoreModule, QuickOrderComponentsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [QuickOrderCoreModule, QuickOrderComponentsModule],
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

export { QuickOrderModule };
//# sourceMappingURL=spartacus-cart-quick-order.mjs.map
