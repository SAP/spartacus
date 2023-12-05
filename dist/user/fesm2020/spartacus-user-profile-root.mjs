import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import { facadeFactory, provideDefaultConfigFactory, UserProfileFacadeTransitionalToken } from '@spartacus/core';
import '@spartacus/storefront';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const USER_PROFILE_FEATURE = 'userProfile';
const USER_PROFILE_CORE_FEATURE = 'userProfileCore';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserProfileFacade {
}
UserProfileFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
UserProfileFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: UserProfileFacade,
        feature: USER_PROFILE_CORE_FEATURE,
        methods: ['get', 'update', 'close', 'getTitles'],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: UserProfileFacade,
                        feature: USER_PROFILE_CORE_FEATURE,
                        methods: ['get', 'update', 'close', 'getTitles'],
                    }),
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// TODO: Inline this factory when we start releasing Ivy compiled libraries
function defaultUserProfileComponentsConfig() {
    const config = {
        featureModules: {
            [USER_PROFILE_FEATURE]: {
                cmsComponents: [
                    'RegisterCustomerComponent',
                    'UpdateProfileComponent',
                    'UpdateEmailComponent',
                    'UpdatePasswordComponent',
                    'ForgotPasswordComponent',
                    'ResetPasswordComponent',
                    'CloseAccountComponent',
                ],
            },
            // by default core is bundled together with components
            [USER_PROFILE_CORE_FEATURE]: USER_PROFILE_FEATURE,
        },
    };
    return config;
}
class UserProfileRootModule {
}
UserProfileRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserProfileRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserProfileRootModule });
UserProfileRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileRootModule, providers: [
        provideDefaultConfigFactory(defaultUserProfileComponentsConfig),
        {
            provide: UserProfileFacadeTransitionalToken,
            useExisting: UserProfileFacade,
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileRootModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfigFactory(defaultUserProfileComponentsConfig),
                        {
                            provide: UserProfileFacadeTransitionalToken,
                            useExisting: UserProfileFacade,
                        },
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserEmailFacade {
}
UserEmailFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserEmailFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
UserEmailFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserEmailFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: UserEmailFacade,
        feature: USER_PROFILE_CORE_FEATURE,
        methods: ['update'],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserEmailFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: UserEmailFacade,
                        feature: USER_PROFILE_CORE_FEATURE,
                        methods: ['update'],
                    }),
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserPasswordFacade {
}
UserPasswordFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserPasswordFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
UserPasswordFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserPasswordFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: UserPasswordFacade,
        feature: USER_PROFILE_CORE_FEATURE,
        methods: ['update', 'reset', 'requestForgotPasswordEmail'],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserPasswordFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: UserPasswordFacade,
                        feature: USER_PROFILE_CORE_FEATURE,
                        methods: ['update', 'reset', 'requestForgotPasswordEmail'],
                    }),
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserRegisterFacade {
}
UserRegisterFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegisterFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
UserRegisterFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegisterFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: UserRegisterFacade,
        feature: USER_PROFILE_CORE_FEATURE,
        methods: ['register', 'registerGuest', 'getTitles'],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegisterFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: UserRegisterFacade,
                        feature: USER_PROFILE_CORE_FEATURE,
                        methods: ['register', 'registerGuest', 'getTitles'],
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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/** AUGMENTABLE_TYPES_END */

/**
 * Generated bundle index. Do not edit.
 */

export { USER_PROFILE_CORE_FEATURE, USER_PROFILE_FEATURE, UserEmailFacade, UserPasswordFacade, UserProfileFacade, UserProfileRootModule, UserRegisterFacade, defaultUserProfileComponentsConfig };
//# sourceMappingURL=spartacus-user-profile-root.mjs.map
