import * as i0 from '@angular/core';
import { InjectionToken, Injectable, NgModule } from '@angular/core';
import * as i2 from '@spartacus/core';
import { CommandStrategy, LanguageSetEvent, UserActions } from '@spartacus/core';
import { switchMap, take, tap, map } from 'rxjs/operators';
import * as i1 from '@spartacus/user/account/root';
import { UserAccountChangedEvent } from '@spartacus/user/account/root';
import * as i4 from '@ngrx/store';
import { UserEmailFacade, UserPasswordFacade, UserProfileFacade, UserRegisterFacade } from '@spartacus/user/profile/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const USER_PROFILE_NORMALIZER = new InjectionToken('UserProfileNormalizer');
const USER_PROFILE_SERIALIZER = new InjectionToken('UserProfileSerializer');
const USER_SERIALIZER = new InjectionToken('UserSerializer');
const USER_SIGN_UP_SERIALIZER = new InjectionToken('UserSignUpSerializer');
const TITLE_NORMALIZER = new InjectionToken('TitleNormalizer');

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserProfileAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserProfileConnector {
    constructor(userProfileAdapter) {
        this.userProfileAdapter = userProfileAdapter;
    }
    update(username, user) {
        return this.userProfileAdapter.update(username, user);
    }
    register(user) {
        return this.userProfileAdapter.register(user);
    }
    registerGuest(guid, password) {
        return this.userProfileAdapter.registerGuest(guid, password);
    }
    requestForgotPasswordEmail(userEmailAddress) {
        return this.userProfileAdapter.requestForgotPasswordEmail(userEmailAddress);
    }
    resetPassword(token, newPassword) {
        return this.userProfileAdapter.resetPassword(token, newPassword);
    }
    updateEmail(userId, currentPassword, newUserId) {
        return this.userProfileAdapter.updateEmail(userId, currentPassword, newUserId);
    }
    updatePassword(userId, oldPassword, newPassword) {
        return this.userProfileAdapter.updatePassword(userId, oldPassword, newPassword);
    }
    remove(userId) {
        return this.userProfileAdapter.close(userId);
    }
    getTitles() {
        return this.userProfileAdapter.loadTitles();
    }
}
UserProfileConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileConnector, deps: [{ token: UserProfileAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
UserProfileConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileConnector });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileConnector, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: UserProfileAdapter }]; } });

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
class UserEmailService {
    constructor(userIdService, userProfileConnector, command) {
        this.userIdService = userIdService;
        this.userProfileConnector = userProfileConnector;
        this.command = command;
        this.updateCommand = this.command.create((payload) => this.userIdService
            .takeUserId(true)
            .pipe(switchMap((uid) => this.userProfileConnector.updateEmail(uid, payload.password, payload.newUid))), {
            strategy: CommandStrategy.Queue,
        });
    }
    /**
     * Updates the user's email.
     *
     * @param password to users password to confirm the users
     * @param newUid the new proposed email address.
     */
    update(password, newUid) {
        return this.updateCommand.execute({ password, newUid });
    }
}
UserEmailService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserEmailService, deps: [{ token: i2.UserIdService }, { token: UserProfileConnector }, { token: i2.CommandService }], target: i0.ɵɵFactoryTarget.Injectable });
UserEmailService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserEmailService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserEmailService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i2.UserIdService }, { type: UserProfileConnector }, { type: i2.CommandService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserPasswordService {
    constructor(userProfileConnector, userIdService, command) {
        this.userProfileConnector = userProfileConnector;
        this.userIdService = userIdService;
        this.command = command;
        this.updateCommand = this.command.create((payload) => this.userIdService.takeUserId(true).pipe(take(1), switchMap((uid) => this.userProfileConnector.updatePassword(uid, payload.oldPassword, payload.newPassword))));
        this.resetCommand = this.command.create((payload) => this.userProfileConnector.resetPassword(payload.token, payload.password));
        this.requestForgotPasswordEmailCommand = this.command.create((payload) => this.userProfileConnector.requestForgotPasswordEmail(payload.email));
    }
    /**
     * Updates the password for the user
     *
     * The method returns an observable with `LoaderState` information, including the
     * actual user data.
     *
     * @param oldPassword the current password that will be changed
     * @param newPassword the new password
     */
    update(oldPassword, newPassword) {
        return this.updateCommand.execute({ oldPassword, newPassword });
    }
    /**
     * Reset new password. Part of the forgot password flow.
     *
     * @param token
     * @param password
     */
    reset(token, password) {
        return this.resetCommand.execute({ token, password });
    }
    /*
     * Request an email to reset a forgotten password.
     */
    requestForgotPasswordEmail(email) {
        return this.requestForgotPasswordEmailCommand.execute({ email });
    }
}
UserPasswordService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserPasswordService, deps: [{ token: UserProfileConnector }, { token: i2.UserIdService }, { token: i2.CommandService }], target: i0.ɵɵFactoryTarget.Injectable });
UserPasswordService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserPasswordService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserPasswordService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: UserProfileConnector }, { type: i2.UserIdService }, { type: i2.CommandService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserProfileService {
    constructor(userAccountService, authService, userProfileConnector, eventService, userIdService, query, command) {
        this.userAccountService = userAccountService;
        this.authService = authService;
        this.userProfileConnector = userProfileConnector;
        this.eventService = eventService;
        this.userIdService = userIdService;
        this.query = query;
        this.command = command;
        this.updateCommand = this.command.create((payload) => this.userIdService.takeUserId(true).pipe(switchMap((uid) => this.userProfileConnector.update(uid, payload.details).pipe(tap(() => {
            this.eventService.dispatch({ user: payload.details }, UserAccountChangedEvent);
        })))), {
            strategy: CommandStrategy.Queue,
        });
        this.closeCommand = this.command.create(() => this.userIdService
            .takeUserId(true)
            .pipe(switchMap((uid) => this.userProfileConnector
            .remove(uid)
            .pipe(tap(() => this.authService.logout())))));
        this.titleQuery = this.query.create(() => this.userProfileConnector.getTitles(), {
            reloadOn: [LanguageSetEvent],
        });
    }
    get() {
        return this.userAccountService.get();
    }
    /**
     * Updates the user's details.
     *
     * @param details User details to be updated.
     */
    update(details) {
        return this.updateCommand.execute({ details });
    }
    /**
     * Closes the user account.
     */
    close() {
        return this.closeCommand.execute(undefined);
    }
    /**
     * Returns titles that can be used for the user profiles.
     */
    getTitles() {
        return this.titleQuery.get().pipe(map((titles) => titles !== null && titles !== void 0 ? titles : []));
    }
}
UserProfileService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileService, deps: [{ token: i1.UserAccountFacade }, { token: i2.AuthService }, { token: UserProfileConnector }, { token: i2.EventService }, { token: i2.UserIdService }, { token: i2.QueryService }, { token: i2.CommandService }], target: i0.ɵɵFactoryTarget.Injectable });
UserProfileService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserAccountFacade }, { type: i2.AuthService }, { type: UserProfileConnector }, { type: i2.EventService }, { type: i2.UserIdService }, { type: i2.QueryService }, { type: i2.CommandService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserRegisterService {
    constructor(userProfile, userConnector, authService, command, store) {
        this.userProfile = userProfile;
        this.userConnector = userConnector;
        this.authService = authService;
        this.command = command;
        this.store = store;
        this.registerCommand = this.command.create(({ user }) => this.userConnector.register(user).pipe(tap(() => {
            // this is a compatibility mechanism only, to make anonymous consents
            // management work properly in transitional period (when we move logic
            // to separate libraries)
            this.store.dispatch(new UserActions.RegisterUserSuccess());
        })));
        this.registerGuestCommand = this.command.create((payload) => this.userConnector.registerGuest(payload.guid, payload.password).pipe(tap((user) => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.authService.loginWithCredentials(user.uid, payload.password);
        })));
    }
    /**
     * Register a new user.
     *
     * @param submitFormData as UserRegisterFormData
     */
    register(user) {
        return this.registerCommand.execute({ user });
    }
    /**
     * Register a new user from guest.
     *
     * @param guid
     * @param password
     */
    registerGuest(guid, password) {
        return this.registerGuestCommand.execute({ guid, password });
    }
    /**
     * Returns titles that can be used for the user profiles.
     */
    getTitles() {
        return this.userProfile.getTitles();
    }
}
UserRegisterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegisterService, deps: [{ token: UserProfileService }, { token: UserProfileConnector }, { token: i2.AuthService }, { token: i2.CommandService }, { token: i4.Store }], target: i0.ɵɵFactoryTarget.Injectable });
UserRegisterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegisterService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegisterService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: UserProfileService }, { type: UserProfileConnector }, { type: i2.AuthService }, { type: i2.CommandService }, { type: i4.Store }]; } });

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
    UserEmailService,
    UserPasswordService,
    UserProfileService,
    UserRegisterService,
    {
        provide: UserEmailFacade,
        useExisting: UserEmailService,
    },
    {
        provide: UserPasswordFacade,
        useExisting: UserPasswordService,
    },
    {
        provide: UserProfileFacade,
        useExisting: UserProfileService,
    },
    {
        provide: UserRegisterFacade,
        useExisting: UserRegisterService,
    },
];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserProfileCoreModule {
}
UserProfileCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserProfileCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserProfileCoreModule });
UserProfileCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileCoreModule, providers: [UserProfileConnector, ...facadeProviders] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [UserProfileConnector, ...facadeProviders],
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

export { TITLE_NORMALIZER, USER_PROFILE_NORMALIZER, USER_PROFILE_SERIALIZER, USER_SERIALIZER, USER_SIGN_UP_SERIALIZER, UserEmailService, UserPasswordService, UserProfileAdapter, UserProfileConnector, UserProfileCoreModule, UserProfileService, UserRegisterService };
//# sourceMappingURL=spartacus-user-profile-core.mjs.map
