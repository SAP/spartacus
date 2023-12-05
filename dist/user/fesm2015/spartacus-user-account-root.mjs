import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import * as i1 from '@spartacus/core';
import { LogoutEvent, GlobalMessageType, provideDefaultConfigFactory, facadeFactory, CxEvent } from '@spartacus/core';
import { Subscription } from 'rxjs';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * User account event listener.
 */
class UserAccountEventListener {
    constructor(eventService, globalMessageService) {
        this.eventService = eventService;
        this.globalMessageService = globalMessageService;
        this.subscriptions = new Subscription();
        this.onAuth();
    }
    /**
     * Registers events for the auth events.
     */
    onAuth() {
        this.subscriptions.add(this.eventService.get(LogoutEvent).subscribe(() => {
            this.globalMessageService.add({ key: 'authMessages.signedOutSuccessfully' }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
UserAccountEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountEventListener, deps: [{ token: i1.EventService }, { token: i1.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
UserAccountEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }, { type: i1.GlobalMessageService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserAccountEventModule {
    constructor(_userAccountEventListener) {
        // Intentional empty constructor
    }
}
UserAccountEventModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountEventModule, deps: [{ token: UserAccountEventListener }], target: i0.ɵɵFactoryTarget.NgModule });
UserAccountEventModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserAccountEventModule });
UserAccountEventModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountEventModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountEventModule, decorators: [{
            type: NgModule,
            args: [{}]
        }], ctorParameters: function () { return [{ type: UserAccountEventListener }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const USER_ACCOUNT_FEATURE = 'userAccount';
const USER_ACCOUNT_CORE_FEATURE = 'userAccountCore';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// TODO: Inline this factory when we start releasing Ivy compiled libraries
function defaultUserAccountComponentsConfig() {
    const config = {
        featureModules: {
            [USER_ACCOUNT_FEATURE]: {
                cmsComponents: [
                    'LoginComponent',
                    'ReturningCustomerLoginComponent',
                    'ReturningCustomerRegisterComponent',
                    'MyAccountViewUserComponent',
                ],
            },
            // by default core is bundled together with components
            [USER_ACCOUNT_CORE_FEATURE]: USER_ACCOUNT_FEATURE,
        },
    };
    return config;
}
class UserAccountRootModule {
}
UserAccountRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserAccountRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserAccountRootModule, imports: [UserAccountEventModule] });
UserAccountRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountRootModule, providers: [provideDefaultConfigFactory(defaultUserAccountComponentsConfig)], imports: [UserAccountEventModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [UserAccountEventModule],
                    providers: [provideDefaultConfigFactory(defaultUserAccountComponentsConfig)],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserAccountFacade {
}
UserAccountFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
UserAccountFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: UserAccountFacade,
        feature: USER_ACCOUNT_CORE_FEATURE,
        methods: ['get', 'getById'],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: UserAccountFacade,
                        feature: USER_ACCOUNT_CORE_FEATURE,
                        methods: ['get', 'getById'],
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
class UserAccountEvent extends CxEvent {
}
class UserAccountChangedEvent extends UserAccountEvent {
}
UserAccountChangedEvent.type = 'UserAccountChangedEvent';

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

export { USER_ACCOUNT_CORE_FEATURE, USER_ACCOUNT_FEATURE, UserAccountChangedEvent, UserAccountEvent, UserAccountEventListener, UserAccountEventModule, UserAccountFacade, UserAccountRootModule, defaultUserAccountComponentsConfig };
//# sourceMappingURL=spartacus-user-account-root.mjs.map
