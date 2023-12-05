import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { SavedCartComponentsModule } from '@spartacus/cart/saved-cart/components';
import { SavedCartCoreModule } from '@spartacus/cart/saved-cart/core';
import { SavedCartOccModule } from '@spartacus/cart/saved-cart/occ';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SavedCartModule {
}
SavedCartModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SavedCartModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SavedCartModule, imports: [SavedCartCoreModule, SavedCartOccModule, SavedCartComponentsModule] });
SavedCartModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartModule, imports: [SavedCartCoreModule, SavedCartOccModule, SavedCartComponentsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [SavedCartCoreModule, SavedCartOccModule, SavedCartComponentsModule],
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

export { SavedCartModule };
//# sourceMappingURL=spartacus-cart-saved-cart.mjs.map
