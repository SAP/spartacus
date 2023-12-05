import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { AsmCustomer360ComponentsModule, defaultAsmCustomer360Config } from '@spartacus/asm/customer-360/components';
import { AsmCustomer360CoreModule } from '@spartacus/asm/customer-360/core';
import { AsmCustomer360OccModule } from '@spartacus/asm/customer-360/occ';
import { provideDefaultConfig } from '@spartacus/core';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360Module {
}
AsmCustomer360Module.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Module, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360Module.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Module, imports: [AsmCustomer360CoreModule,
        AsmCustomer360OccModule,
        AsmCustomer360ComponentsModule] });
AsmCustomer360Module.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Module, providers: [provideDefaultConfig(defaultAsmCustomer360Config)], imports: [AsmCustomer360CoreModule,
        AsmCustomer360OccModule,
        AsmCustomer360ComponentsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Module, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AsmCustomer360CoreModule,
                        AsmCustomer360OccModule,
                        AsmCustomer360ComponentsModule,
                    ],
                    providers: [provideDefaultConfig(defaultAsmCustomer360Config)],
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

export { AsmCustomer360Module };
//# sourceMappingURL=spartacus-asm-customer-360.mjs.map
