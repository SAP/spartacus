import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { UnitOrderComponentsModule } from '@spartacus/organization/unit-order/components';
import * as i1 from '@spartacus/organization/unit-order/core';
import { UnitOrderCoreModule } from '@spartacus/organization/unit-order/core';
import { UnitOrderOccModule } from '@spartacus/organization/unit-order/occ';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitOrderModule {
}
UnitOrderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitOrderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderModule, imports: [i1.UnitOrderCoreModule, UnitOrderOccModule,
        UnitOrderComponentsModule] });
UnitOrderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderModule, imports: [UnitOrderCoreModule.forRoot(),
        UnitOrderOccModule,
        UnitOrderComponentsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        UnitOrderCoreModule.forRoot(),
                        UnitOrderOccModule,
                        UnitOrderComponentsModule,
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

export { UnitOrderModule };
//# sourceMappingURL=spartacus-organization-unit-order.mjs.map
