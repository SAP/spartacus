import * as i0 from '@angular/core';
import { InjectionToken, Injectable, NgModule } from '@angular/core';
import * as i2 from '@spartacus/core';
import { HttpErrorHandler, HttpResponseStatus, GlobalMessageType } from '@spartacus/core';
import { UserRegistrationFacade } from '@spartacus/organization/user-registration/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const ORGANIZATION_USER_REGISTRATION_SERIALIZER = new InjectionToken('OrganizationUserRegistrationSerializer');

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserRegistrationAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserRegistrationConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    registerUser(userData) {
        return this.adapter.registerUser(userData);
    }
}
UserRegistrationConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationConnector, deps: [{ token: UserRegistrationAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
UserRegistrationConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationConnector });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationConnector, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: UserRegistrationAdapter }]; } });

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
class UserRegistrationService {
    constructor(userRegistrationConnector, command) {
        this.userRegistrationConnector = userRegistrationConnector;
        this.command = command;
        this.registerOrganizationUserCommand = this.command.create((payload) => this.userRegistrationConnector.registerUser(payload.userData));
    }
    /**
     * Register a new org user.
     *
     * @param userData
     */
    registerUser(userData) {
        return this.registerOrganizationUserCommand.execute({ userData });
    }
}
UserRegistrationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationService, deps: [{ token: UserRegistrationConnector }, { token: i2.CommandService }], target: i0.ɵɵFactoryTarget.Injectable });
UserRegistrationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: UserRegistrationConnector }, { type: i2.CommandService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const facadeProviders = [
    UserRegistrationService,
    {
        provide: UserRegistrationFacade,
        useExisting: UserRegistrationService,
    },
];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrganizationUserRegistrationConflictHandler extends HttpErrorHandler {
    constructor() {
        super(...arguments);
        this.responseStatus = HttpResponseStatus.CONFLICT;
    }
    handleError(request, response) {
        if (request && this.getErrors(response)?.length) {
            this.globalMessageService.add({ key: 'userRegistrationForm.httpHandlers.conflict' }, GlobalMessageType.MSG_TYPE_ERROR);
        }
    }
    getErrors(response) {
        return (response.error?.errors).filter((error) => error?.type === 'AlreadyExistsError');
    }
    getPriority() {
        return 0 /* Priority.NORMAL */;
    }
}
OrganizationUserRegistrationConflictHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationUserRegistrationConflictHandler, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
OrganizationUserRegistrationConflictHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationUserRegistrationConflictHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrganizationUserRegistrationConflictHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
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
class UserRegistrationCoreModule {
    static forRoot() {
        return {
            ngModule: UserRegistrationCoreModule,
            providers: [
                ...facadeProviders,
                UserRegistrationConnector,
                {
                    provide: HttpErrorHandler,
                    useExisting: OrganizationUserRegistrationConflictHandler,
                    multi: true,
                },
            ],
        };
    }
}
UserRegistrationCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserRegistrationCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationCoreModule });
UserRegistrationCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationCoreModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationCoreModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ORGANIZATION_USER_REGISTRATION_SERIALIZER, OrganizationUserRegistrationConflictHandler, UserRegistrationAdapter, UserRegistrationConnector, UserRegistrationCoreModule };
//# sourceMappingURL=spartacus-organization-user-registration-core.mjs.map
