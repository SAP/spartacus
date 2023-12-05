import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { AsmComponentsModule } from '@spartacus/asm/components';
import { AsmCoreModule } from '@spartacus/asm/core';
import { AsmOccModule } from '@spartacus/asm/occ';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmModule {
}
AsmModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmModule, imports: [AsmComponentsModule, AsmCoreModule, AsmOccModule] });
AsmModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmModule, imports: [AsmComponentsModule, AsmCoreModule, AsmOccModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [AsmComponentsModule, AsmCoreModule, AsmOccModule],
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

export { AsmModule };
//# sourceMappingURL=spartacus-asm.mjs.map
