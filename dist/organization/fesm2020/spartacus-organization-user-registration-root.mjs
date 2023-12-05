import * as i0 from '@angular/core';
import { NgModule, Injectable } from '@angular/core';
import { provideDefaultConfigFactory, facadeFactory } from '@spartacus/core';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const ORGANIZATION_USER_REGISTRATION_FEATURE = 'organizationUserRegistration';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function defaultOrganizationUserRegistrationComponentsConfig() {
    const config = {
        featureModules: {
            [ORGANIZATION_USER_REGISTRATION_FEATURE]: {
                cmsComponents: ['OrganizationUserRegistrationComponent'],
            },
        },
    };
    return config;
}
class OrganizationUserRegistrationRootModule {
}
OrganizationUserRegistrationRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationUserRegistrationRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrganizationUserRegistrationRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrganizationUserRegistrationRootModule });
OrganizationUserRegistrationRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationUserRegistrationRootModule, providers: [
        provideDefaultConfigFactory(defaultOrganizationUserRegistrationComponentsConfig),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationUserRegistrationRootModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfigFactory(defaultOrganizationUserRegistrationComponentsConfig),
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserRegistrationFacade {
}
UserRegistrationFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
UserRegistrationFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: UserRegistrationFacade,
        feature: ORGANIZATION_USER_REGISTRATION_FEATURE,
        methods: ['registerUser'],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: UserRegistrationFacade,
                        feature: ORGANIZATION_USER_REGISTRATION_FEATURE,
                        methods: ['registerUser'],
                    }),
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ORGANIZATION_USER_REGISTRATION_FEATURE, OrganizationUserRegistrationRootModule, UserRegistrationFacade, defaultOrganizationUserRegistrationComponentsConfig };
//# sourceMappingURL=spartacus-organization-user-registration-root.mjs.map
