import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import * as i5 from '@angular/forms';
import { FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import * as i3$1 from '@spartacus/cdc/root';
import { CdcLoadUserTokenFailEvent, CDC_USER_PREFERENCE_SERIALIZER } from '@spartacus/cdc/root';
import * as i2 from '@spartacus/core';
import { GlobalMessageType, UrlModule, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { RegisterComponentService, ForgotPasswordComponentService, ForgotPasswordComponent, UpdateEmailComponentService, UpdatePasswordComponentService, UpdateProfileComponentService } from '@spartacus/user/profile/components';
import { throwError, merge, Subscription } from 'rxjs';
import { map, tap, filter, switchMap } from 'rxjs/operators';
import * as i1 from '@spartacus/user/profile/root';
import * as i3 from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { SpinnerModule, FormErrorsModule, NgSelectA11yModule, PasswordVisibilityToggleModule } from '@spartacus/storefront';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CDCRegisterComponentService extends RegisterComponentService {
    constructor(userRegisterFacade, command, store, cdcJSService, globalMessageService, authService, eventService, userProfileFacade, cdcConsentManagementService, converter, fb, anonymousConsentsService) {
        super(userRegisterFacade, globalMessageService, fb);
        this.userRegisterFacade = userRegisterFacade;
        this.command = command;
        this.store = store;
        this.cdcJSService = cdcJSService;
        this.globalMessageService = globalMessageService;
        this.authService = authService;
        this.eventService = eventService;
        this.userProfileFacade = userProfileFacade;
        this.cdcConsentManagementService = cdcConsentManagementService;
        this.converter = converter;
        this.fb = fb;
        this.anonymousConsentsService = anonymousConsentsService;
        this.registerCommand = this.command.create(({ user }) => 
        // Registering user through CDC Gigya SDK
        this.cdcJSService.registerUserWithoutScreenSet(user));
        this.loadUserTokenFailed$ = this.eventService
            .get(CdcLoadUserTokenFailEvent)
            .pipe(map((event) => !!event), tap((failed) => {
            if (failed) {
                throw new Error(`User token failed to load.`);
            }
        }));
        this.isLoggedIn$ = this.authService
            .isUserLoggedIn()
            .pipe(filter((loggedIn) => loggedIn));
    }
    /**
     * Register a new user using CDC SDK.
     *
     * @param user as UserSignUp
     */
    register(user) {
        if (!user.firstName || !user.lastName || !user.uid || !user.password) {
            return throwError(`The provided user is not valid: ${user}`);
        }
        /** fill the user preferences */
        user.preferences = this.generatePreferencesObject();
        return this.cdcJSService.didLoad().pipe(tap((cdcLoaded) => {
            if (!cdcLoaded) {
                this.globalMessageService.add({
                    key: 'errorHandlers.scriptFailedToLoad',
                }, GlobalMessageType.MSG_TYPE_ERROR);
                throw new Error(`CDC script didn't load.`);
            }
        }), switchMap(() => 
        // Logging in using CDC Gigya SDK, update the registerCommand
        this.registerCommand.execute({ user })), switchMap(() => merge(this.loadUserTokenFailed$, this.isLoggedIn$).pipe(map(() => {
            //update user title code
            this.userProfileFacade.update(user);
        }))), switchMap(() => {
            return this.userProfileFacade
                .get()
                .pipe(filter((userObj) => Boolean(userObj)));
        }));
    }
    /**
     * Return preferences object that needs to be updated during register process
     * @returns preference object
     */
    generatePreferencesObject() {
        let preferences = null;
        const consentIDs = this.cdcConsentManagementService.getCdcConsentIDs(); //fetch all active consents
        for (const id of consentIDs) {
            const consent = {};
            consent.id = id;
            consent.currentConsent = {};
            consent.currentConsent.consentGivenDate = new Date();
            const serializedPreference = this.converter.convert(consent, CDC_USER_PREFERENCE_SERIALIZER);
            preferences = Object.assign(preferences !== null && preferences !== void 0 ? preferences : {}, serializedPreference);
        }
        return preferences;
    }
    // @override
    postRegisterMessage() {
        // don't show the message
    }
    /**
     * fetch consents that exist in commerce and is active in cdc
     * @returns array of consent templates
     */
    fetchCdcConsentsForRegistration() {
        const consentList = [];
        const cdcActiveConsents = this.cdcConsentManagementService.getCdcConsentIDs();
        this.anonymousConsentsService.getTemplates().subscribe((templates) => {
            if (templates && templates.length > 0) {
                for (const template of templates) {
                    if (template.id && cdcActiveConsents.includes(template.id)) {
                        consentList.push(template);
                    }
                }
            }
        });
        return consentList;
    }
    /**
     * generates a form array with form control for each consent
     * @returns a form array
     */
    generateAdditionalConsentsFormControl() {
        const consentArray = this.fb.array([]);
        const templates = this.fetchCdcConsentsForRegistration();
        for (const _template of templates) {
            consentArray.push(new FormControl(false, [Validators.requiredTrue]));
        }
        return consentArray;
    }
    /**
     * creates an array of active cdc consents and makes them mandatory to be provided during registration
     * @returns consent templates in the necessary format for the component
     */
    getAdditionalConsents() {
        const templates = this.fetchCdcConsentsForRegistration();
        const returnConsents = [];
        for (const template of templates) {
            const returnConsent = {};
            returnConsent['template'] = template;
            returnConsent['required'] = true; //these consents are always mandatory
            returnConsents.push(returnConsent);
        }
        return returnConsents;
    }
}
CDCRegisterComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCRegisterComponentService, deps: [{ token: i1.UserRegisterFacade }, { token: i2.CommandService }, { token: i3.Store }, { token: i3$1.CdcJsService }, { token: i2.GlobalMessageService }, { token: i2.AuthService }, { token: i2.EventService }, { token: i1.UserProfileFacade }, { token: i3$1.CdcConsentManagementComponentService }, { token: i2.ConverterService }, { token: i5.UntypedFormBuilder }, { token: i2.AnonymousConsentsService }], target: i0.ɵɵFactoryTarget.Injectable });
CDCRegisterComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCRegisterComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCRegisterComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserRegisterFacade }, { type: i2.CommandService }, { type: i3.Store }, { type: i3$1.CdcJsService }, { type: i2.GlobalMessageService }, { type: i2.AuthService }, { type: i2.EventService }, { type: i1.UserProfileFacade }, { type: i3$1.CdcConsentManagementComponentService }, { type: i2.ConverterService }, { type: i5.UntypedFormBuilder }, { type: i2.AnonymousConsentsService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CDCRegisterModule {
}
CDCRegisterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCRegisterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CDCRegisterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CDCRegisterModule, imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        SpinnerModule,
        FormErrorsModule,
        NgSelectModule,
        NgSelectA11yModule] });
CDCRegisterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCRegisterModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                RegisterCustomerComponent: {
                    providers: [
                        {
                            provide: RegisterComponentService,
                            useClass: CDCRegisterComponentService,
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        SpinnerModule,
        FormErrorsModule,
        NgSelectModule,
        NgSelectA11yModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCRegisterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        SpinnerModule,
                        FormErrorsModule,
                        NgSelectModule,
                        NgSelectA11yModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                RegisterCustomerComponent: {
                                    providers: [
                                        {
                                            provide: RegisterComponentService,
                                            useClass: CDCRegisterComponentService,
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
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
class CDCForgotPasswordComponentService extends ForgotPasswordComponentService {
    constructor(userPasswordService, routingService, authConfigService, globalMessage, cdcJsService) {
        super(userPasswordService, routingService, authConfigService, globalMessage);
        this.userPasswordService = userPasswordService;
        this.routingService = routingService;
        this.authConfigService = authConfigService;
        this.globalMessage = globalMessage;
        this.cdcJsService = cdcJsService;
        this.subscription = new Subscription();
    }
    /**
     * Sends an email to through CDC SDK to reset the password.
     */
    requestEmail() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy$.next(true);
        this.subscription.add(this.cdcJsService.didLoad().subscribe((cdcLoaded) => {
            if (cdcLoaded) {
                // Reset password using CDC Gigya SDK
                this.cdcJsService
                    .resetPasswordWithoutScreenSet(this.form.value.userEmail)
                    .subscribe({
                    next: (response) => {
                        this.busy$.next(false);
                        if (response.status === 'OK') {
                            this.onSuccess();
                        }
                    },
                    error: () => this.busy$.next(false),
                });
            }
            else {
                this.busy$.next(false);
                // CDC Gigya SDK not loaded, show error to the user
                this.globalMessage.add({
                    key: 'errorHandlers.scriptFailedToLoad',
                }, GlobalMessageType.MSG_TYPE_ERROR);
            }
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
CDCForgotPasswordComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCForgotPasswordComponentService, deps: [{ token: i1.UserPasswordFacade }, { token: i2.RoutingService }, { token: i2.AuthConfigService }, { token: i2.GlobalMessageService }, { token: i3$1.CdcJsService }], target: i0.ɵɵFactoryTarget.Injectable });
CDCForgotPasswordComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCForgotPasswordComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCForgotPasswordComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserPasswordFacade }, { type: i2.RoutingService }, { type: i2.AuthConfigService }, { type: i2.GlobalMessageService }, { type: i3$1.CdcJsService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CDCForgotPasswordModule {
}
CDCForgotPasswordModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCForgotPasswordModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CDCForgotPasswordModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CDCForgotPasswordModule, imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        FormErrorsModule,
        SpinnerModule] });
CDCForgotPasswordModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCForgotPasswordModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ForgotPasswordComponent: {
                    component: ForgotPasswordComponent,
                    providers: [
                        {
                            provide: ForgotPasswordComponentService,
                            useClass: CDCForgotPasswordComponentService,
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        FormErrorsModule,
        SpinnerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCForgotPasswordModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        FormErrorsModule,
                        SpinnerModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ForgotPasswordComponent: {
                                    component: ForgotPasswordComponent,
                                    providers: [
                                        {
                                            provide: ForgotPasswordComponentService,
                                            useClass: CDCForgotPasswordComponentService,
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
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
class CDCUpdateEmailComponentService extends UpdateEmailComponentService {
    constructor(userEmail, routingService, globalMessageService, authService, authRedirectService, cdcJsService) {
        super(userEmail, routingService, globalMessageService, authService, authRedirectService);
        this.userEmail = userEmail;
        this.routingService = routingService;
        this.globalMessageService = globalMessageService;
        this.authService = authService;
        this.authRedirectService = authRedirectService;
        this.cdcJsService = cdcJsService;
    }
    save() {
        var _a, _b;
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy$.next(true);
        const newEmail = (_a = this.form.get('confirmEmail')) === null || _a === void 0 ? void 0 : _a.value;
        const password = (_b = this.form.get('password')) === null || _b === void 0 ? void 0 : _b.value;
        this.cdcJsService
            .updateUserEmailWithoutScreenSet(password, newEmail)
            .subscribe({
            next: () => this.onSuccess(newEmail),
            error: (error) => this.onError(error),
        });
    }
    onError(_error) {
        this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
        this.globalMessageService.add({ key: 'httpHandlers.validationErrors.invalid.password' }, GlobalMessageType.MSG_TYPE_ERROR);
        this.busy$.next(false);
    }
}
CDCUpdateEmailComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdateEmailComponentService, deps: [{ token: i1.UserEmailFacade }, { token: i2.RoutingService }, { token: i2.GlobalMessageService }, { token: i2.AuthService }, { token: i2.AuthRedirectService }, { token: i3$1.CdcJsService }], target: i0.ɵɵFactoryTarget.Injectable });
CDCUpdateEmailComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdateEmailComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdateEmailComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserEmailFacade }, { type: i2.RoutingService }, { type: i2.GlobalMessageService }, { type: i2.AuthService }, { type: i2.AuthRedirectService }, { type: i3$1.CdcJsService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CDCUpdateEmailModule {
}
CDCUpdateEmailModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdateEmailModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CDCUpdateEmailModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdateEmailModule, imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        UrlModule,
        RouterModule,
        I18nModule,
        FormErrorsModule,
        PasswordVisibilityToggleModule] });
CDCUpdateEmailModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdateEmailModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                UpdateEmailComponent: {
                    providers: [
                        {
                            provide: UpdateEmailComponentService,
                            useClass: CDCUpdateEmailComponentService,
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        UrlModule,
        RouterModule,
        I18nModule,
        FormErrorsModule,
        PasswordVisibilityToggleModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdateEmailModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        SpinnerModule,
                        UrlModule,
                        RouterModule,
                        I18nModule,
                        FormErrorsModule,
                        PasswordVisibilityToggleModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                UpdateEmailComponent: {
                                    providers: [
                                        {
                                            provide: UpdateEmailComponentService,
                                            useClass: CDCUpdateEmailComponentService,
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CDCUpdatePasswordComponentService extends UpdatePasswordComponentService {
    constructor(userPasswordService, routingService, globalMessageService, authRedirectService, authService, cdcJsService) {
        super(userPasswordService, routingService, globalMessageService, authRedirectService, authService);
        this.userPasswordService = userPasswordService;
        this.routingService = routingService;
        this.globalMessageService = globalMessageService;
        this.authRedirectService = authRedirectService;
        this.authService = authService;
        this.cdcJsService = cdcJsService;
    }
    /**
     * Updates the password for the user.
     */
    updatePassword() {
        var _a, _b;
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy$.next(true);
        const oldPassword = (_a = this.form.get('oldPassword')) === null || _a === void 0 ? void 0 : _a.value;
        const newPassword = (_b = this.form.get('newPassword')) === null || _b === void 0 ? void 0 : _b.value;
        this.cdcJsService
            .updateUserPasswordWithoutScreenSet(oldPassword, newPassword)
            .subscribe({
            next: () => this.onSuccess(),
            error: (error) => this.onError(error),
        });
    }
    onError(_error) {
        const errorMessage = (_error === null || _error === void 0 ? void 0 : _error.errorDetails) || ' ';
        this.globalMessageService.add(errorMessage, GlobalMessageType.MSG_TYPE_ERROR);
        this.busy$.next(false);
    }
}
CDCUpdatePasswordComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdatePasswordComponentService, deps: [{ token: i1.UserPasswordFacade }, { token: i2.RoutingService }, { token: i2.GlobalMessageService }, { token: i2.AuthRedirectService }, { token: i2.AuthService }, { token: i3$1.CdcJsService }], target: i0.ɵɵFactoryTarget.Injectable });
CDCUpdatePasswordComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdatePasswordComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdatePasswordComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserPasswordFacade }, { type: i2.RoutingService }, { type: i2.GlobalMessageService }, { type: i2.AuthRedirectService }, { type: i2.AuthService }, { type: i3$1.CdcJsService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CDCUpdatePasswordModule {
}
CDCUpdatePasswordModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdatePasswordModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CDCUpdatePasswordModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdatePasswordModule, imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        I18nModule,
        FormErrorsModule,
        UrlModule,
        RouterModule,
        PasswordVisibilityToggleModule] });
CDCUpdatePasswordModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdatePasswordModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                UpdatePasswordComponent: {
                    providers: [
                        {
                            provide: UpdatePasswordComponentService,
                            useClass: CDCUpdatePasswordComponentService,
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        I18nModule,
        FormErrorsModule,
        UrlModule,
        RouterModule,
        PasswordVisibilityToggleModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdatePasswordModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        SpinnerModule,
                        I18nModule,
                        FormErrorsModule,
                        UrlModule,
                        RouterModule,
                        PasswordVisibilityToggleModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                UpdatePasswordComponent: {
                                    providers: [
                                        {
                                            provide: UpdatePasswordComponentService,
                                            useClass: CDCUpdatePasswordComponentService,
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CDCUpdateProfileComponentService extends UpdateProfileComponentService {
    constructor(userProfile, globalMessageService, cdcJsService) {
        super(userProfile, globalMessageService);
        this.userProfile = userProfile;
        this.globalMessageService = globalMessageService;
        this.cdcJsService = cdcJsService;
    }
    /**
     * Updates the user's details and handles the UI.
     */
    updateProfile() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy$.next(true);
        const formValue = this.form.value;
        this.cdcJsService.updateProfileWithoutScreenSet(formValue).subscribe({
            next: () => this.onSuccess(),
            error: (error) => this.onError(error),
        });
    }
    onError(_error) {
        const errorMessage = (_error === null || _error === void 0 ? void 0 : _error.errorMessage) || ' ';
        this.globalMessageService.add(errorMessage, GlobalMessageType.MSG_TYPE_ERROR);
        this.busy$.next(false);
    }
}
CDCUpdateProfileComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdateProfileComponentService, deps: [{ token: i1.UserProfileFacade }, { token: i2.GlobalMessageService }, { token: i3$1.CdcJsService }], target: i0.ɵɵFactoryTarget.Injectable });
CDCUpdateProfileComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdateProfileComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdateProfileComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserProfileFacade }, { type: i2.GlobalMessageService }, { type: i3$1.CdcJsService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CDCUpdateProfileModule {
}
CDCUpdateProfileModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdateProfileModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CDCUpdateProfileModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdateProfileModule, imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        I18nModule,
        FormErrorsModule,
        RouterModule,
        UrlModule,
        NgSelectModule,
        NgSelectA11yModule] });
CDCUpdateProfileModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdateProfileModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                UpdateProfileComponent: {
                    providers: [
                        {
                            provide: UpdateProfileComponentService,
                            useClass: CDCUpdateProfileComponentService,
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        I18nModule,
        FormErrorsModule,
        RouterModule,
        UrlModule,
        NgSelectModule,
        NgSelectA11yModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdateProfileModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        SpinnerModule,
                        I18nModule,
                        FormErrorsModule,
                        RouterModule,
                        UrlModule,
                        NgSelectModule,
                        NgSelectA11yModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                UpdateProfileComponent: {
                                    providers: [
                                        {
                                            provide: UpdateProfileComponentService,
                                            useClass: CDCUpdateProfileComponentService,
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CDCUserProfileModule {
}
CDCUserProfileModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUserProfileModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CDCUserProfileModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CDCUserProfileModule, imports: [CDCRegisterModule,
        CDCForgotPasswordModule,
        CDCUpdateProfileModule,
        CDCUpdatePasswordModule,
        CDCUpdateEmailModule] });
CDCUserProfileModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUserProfileModule, imports: [CDCRegisterModule,
        CDCForgotPasswordModule,
        CDCUpdateProfileModule,
        CDCUpdatePasswordModule,
        CDCUpdateEmailModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUserProfileModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CDCRegisterModule,
                        CDCForgotPasswordModule,
                        CDCUpdateProfileModule,
                        CDCUpdatePasswordModule,
                        CDCUpdateEmailModule,
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

export { CDCForgotPasswordComponentService, CDCForgotPasswordModule, CDCRegisterComponentService, CDCRegisterModule, CDCUserProfileModule };
//# sourceMappingURL=spartacus-cdc-user-profile.mjs.map
