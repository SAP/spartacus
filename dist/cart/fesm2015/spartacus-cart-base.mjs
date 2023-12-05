import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { CartBaseComponentsModule } from '@spartacus/cart/base/components';
import { CartBaseCoreModule } from '@spartacus/cart/base/core';
import { CartBaseOccModule } from '@spartacus/cart/base/occ';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartBaseModule {
}
CartBaseModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartBaseModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartBaseModule, imports: [CartBaseCoreModule, CartBaseOccModule, CartBaseComponentsModule] });
CartBaseModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseModule, imports: [CartBaseCoreModule, CartBaseOccModule, CartBaseComponentsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CartBaseCoreModule, CartBaseOccModule, CartBaseComponentsModule],
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

export { CartBaseModule };
//# sourceMappingURL=spartacus-cart-base.mjs.map
