import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { StoreFinderCoreModule } from '@spartacus/storefinder/core';
import { StoreFinderOccModule } from '@spartacus/storefinder/occ';
import { StoreFinderComponentsModule } from '@spartacus/storefinder/components';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class StoreFinderModule {
}
StoreFinderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StoreFinderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderModule, imports: [StoreFinderCoreModule,
        StoreFinderOccModule,
        StoreFinderComponentsModule] });
StoreFinderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderModule, imports: [StoreFinderCoreModule,
        StoreFinderOccModule,
        StoreFinderComponentsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        StoreFinderCoreModule,
                        StoreFinderOccModule,
                        StoreFinderComponentsModule,
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

export { StoreFinderModule };
//# sourceMappingURL=spartacus-storefinder.mjs.map
