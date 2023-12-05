import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { WishListComponentsModule } from '@spartacus/cart/wish-list/components';
import { WishListCoreModule } from '@spartacus/cart/wish-list/core';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class WishListModule {
}
WishListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
WishListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: WishListModule, imports: [WishListComponentsModule, WishListCoreModule] });
WishListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListModule, imports: [WishListComponentsModule, WishListCoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [WishListComponentsModule, WishListCoreModule],
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

export { WishListModule };
//# sourceMappingURL=spartacus-cart-wish-list.mjs.map
