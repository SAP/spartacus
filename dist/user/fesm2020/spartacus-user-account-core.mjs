import * as i0 from '@angular/core';
import { InjectionToken, Injectable, NgModule } from '@angular/core';
import * as i2 from '@spartacus/core';
import { LoginEvent, LogoutEvent } from '@spartacus/core';
import { UserAccountChangedEvent, UserAccountFacade } from '@spartacus/user/account/root';
import { switchMap } from 'rxjs/operators';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const USER_ACCOUNT_NORMALIZER = new InjectionToken('UserAccountNormalizer');
const USER_ACCOUNT_SERIALIZER = new InjectionToken('UserAccountSerializer');

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserAccountAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserAccountConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    get(userId) {
        return this.adapter.load(userId);
    }
}
UserAccountConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountConnector, deps: [{ token: UserAccountAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
UserAccountConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountConnector });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountConnector, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: UserAccountAdapter }]; } });

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
class UserAccountService {
    constructor(userAccountConnector, userIdService, query) {
        this.userAccountConnector = userAccountConnector;
        this.userIdService = userIdService;
        this.query = query;
        this.userQuery = this.query.create(() => this.userIdService
            .takeUserId(true)
            .pipe(switchMap((userId) => this.userAccountConnector.get(userId))), {
            reloadOn: [UserAccountChangedEvent],
            resetOn: [LoginEvent, LogoutEvent],
        });
    }
    /**
     * Returns the user according the userId
     * no use query for userId can change every time
     */
    getById(userId) {
        return this.userAccountConnector.get(userId);
    }
    /**
     * Returns the current user.
     */
    get() {
        return this.userQuery.get();
    }
}
UserAccountService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountService, deps: [{ token: UserAccountConnector }, { token: i2.UserIdService }, { token: i2.QueryService }], target: i0.ɵɵFactoryTarget.Injectable });
UserAccountService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: UserAccountConnector }, { type: i2.UserIdService }, { type: i2.QueryService }]; } });

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
const facadeProviders = [
    UserAccountService,
    {
        provide: UserAccountFacade,
        useExisting: UserAccountService,
    },
];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserAccountCoreModule {
}
UserAccountCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserAccountCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserAccountCoreModule });
UserAccountCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountCoreModule, providers: [UserAccountConnector, ...facadeProviders] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [UserAccountConnector, ...facadeProviders],
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

export { USER_ACCOUNT_NORMALIZER, USER_ACCOUNT_SERIALIZER, UserAccountAdapter, UserAccountConnector, UserAccountCoreModule, UserAccountService };
//# sourceMappingURL=spartacus-user-account-core.mjs.map
