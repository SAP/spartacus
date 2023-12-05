import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { UserAccountComponentsModule } from '@spartacus/user/account/components';
import { UserAccountCoreModule } from '@spartacus/user/account/core';
import { UserAccountOccModule } from '@spartacus/user/account/occ';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserAccountModule {
}
UserAccountModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserAccountModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserAccountModule, imports: [UserAccountCoreModule,
        UserAccountOccModule,
        UserAccountComponentsModule] });
UserAccountModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountModule, imports: [UserAccountCoreModule,
        UserAccountOccModule,
        UserAccountComponentsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        UserAccountCoreModule,
                        UserAccountOccModule,
                        UserAccountComponentsModule,
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

export { UserAccountModule };
//# sourceMappingURL=spartacus-user-account.mjs.map
