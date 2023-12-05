import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { UserRegistrationComponentsModule } from '@spartacus/organization/user-registration/components';
import * as i1 from '@spartacus/organization/user-registration/core';
import { UserRegistrationCoreModule } from '@spartacus/organization/user-registration/core';
import { UserRegistrationOccModule } from '@spartacus/organization/user-registration/occ';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrganizationUserRegistrationModule {
}
OrganizationUserRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationUserRegistrationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrganizationUserRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrganizationUserRegistrationModule, imports: [i1.UserRegistrationCoreModule, UserRegistrationComponentsModule,
        UserRegistrationOccModule] });
OrganizationUserRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationUserRegistrationModule, imports: [UserRegistrationCoreModule.forRoot(),
        UserRegistrationComponentsModule,
        UserRegistrationOccModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationUserRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        UserRegistrationCoreModule.forRoot(),
                        UserRegistrationComponentsModule,
                        UserRegistrationOccModule,
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

export { OrganizationUserRegistrationModule };
//# sourceMappingURL=spartacus-organization-user-registration.mjs.map
