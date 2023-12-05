import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { AccountSummaryCoreModule } from '@spartacus/organization/account-summary/core';
import { AccountSummaryOccModule } from '@spartacus/organization/account-summary/occ';
import { AccountSummaryComponentsModule } from '@spartacus/organization/account-summary/components';
import { AdministrationModule } from '@spartacus/organization/administration';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AccountSummaryModule {
}
AccountSummaryModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AccountSummaryModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryModule, imports: [AccountSummaryCoreModule,
        AccountSummaryOccModule,
        AccountSummaryComponentsModule,
        AdministrationModule] });
AccountSummaryModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryModule, imports: [AccountSummaryCoreModule,
        AccountSummaryOccModule,
        AccountSummaryComponentsModule,
        AdministrationModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AccountSummaryCoreModule,
                        AccountSummaryOccModule,
                        AccountSummaryComponentsModule,
                        AdministrationModule,
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

export { AccountSummaryModule };
//# sourceMappingURL=spartacus-organization-account-summary.mjs.map
