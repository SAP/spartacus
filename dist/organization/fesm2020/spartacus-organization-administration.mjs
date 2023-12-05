import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { AdministrationComponentsModule } from '@spartacus/organization/administration/components';
import * as i1 from '@spartacus/organization/administration/core';
import { AdministrationCoreModule } from '@spartacus/organization/administration/core';
import { AdministrationOccModule } from '@spartacus/organization/administration/occ';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AdministrationModule {
}
AdministrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AdministrationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AdministrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AdministrationModule, imports: [i1.AdministrationCoreModule, AdministrationOccModule,
        AdministrationComponentsModule] });
AdministrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AdministrationModule, imports: [AdministrationCoreModule.forRoot(),
        AdministrationOccModule,
        AdministrationComponentsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AdministrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdministrationCoreModule.forRoot(),
                        AdministrationOccModule,
                        AdministrationComponentsModule,
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

export { AdministrationModule };
//# sourceMappingURL=spartacus-organization-administration.mjs.map
