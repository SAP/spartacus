import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { PickupInStoreComponentsModule } from '@spartacus/pickup-in-store/components';
import { PickupInStoreCoreModule } from '@spartacus/pickup-in-store/core';
import { PickupInStoreOccModule } from '@spartacus/pickup-in-store/occ';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PickupInStoreModule {
}
PickupInStoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PickupInStoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreModule, imports: [PickupInStoreComponentsModule,
        PickupInStoreCoreModule,
        PickupInStoreOccModule] });
PickupInStoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreModule, imports: [PickupInStoreComponentsModule,
        PickupInStoreCoreModule,
        PickupInStoreOccModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        PickupInStoreComponentsModule,
                        PickupInStoreCoreModule,
                        PickupInStoreOccModule,
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

export { PickupInStoreModule };
//# sourceMappingURL=spartacus-pickup-in-store.mjs.map
