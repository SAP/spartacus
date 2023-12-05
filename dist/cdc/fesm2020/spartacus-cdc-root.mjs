import * as i0 from '@angular/core';
import { Injectable, InjectionToken, PLATFORM_ID, Inject, NgModule, APP_INITIALIZER } from '@angular/core';
import * as i2 from '@spartacus/core';
import { Config, CxEvent, facadeFactory, GlobalMessageType, OccUserConsentAdapter, I18nModule, UserConsentAdapter, provideDefaultConfigFactory, ConfigInitializerService, provideDefaultConfig } from '@spartacus/core';
import { ConsentManagementComponentService, LogoutGuard } from '@spartacus/storefront';
import { take, switchMap, tap, filter, catchError } from 'rxjs/operators';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Subscription, of, ReplaySubject, combineLatest, throwError, Observable, EMPTY } from 'rxjs';
import * as i1 from '@angular/common/http';
import * as i4 from '@spartacus/user/profile/root';
import * as i2$1 from '@angular/router';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdcUserPreferenceSerializer {
    constructor() {
        // Intentional empty constructor
    }
    convert(source, target) {
        if (source) {
            const preference = source.id?.concat('.isConsentGranted');
            let giveConsent = false;
            if (preference) {
                if (source.currentConsent?.consentGivenDate) {
                    giveConsent = true;
                }
                target = this.convertToCdcPreference(preference, giveConsent);
            }
        }
        return target;
    }
    /**
     * converts a dot separated string to deeply nested object
     * @param path : dot separated string
     * @param value : true if consent is given, false if consent is withdrawn
     * @returns preference object compatible for cdc
     * example:
     * input path x.y.z.isConsentGranted
     * input value: true
     * output=  x:{y:{z:{isConsentGranted: true}}}
     */
    convertToCdcPreference(path, value) {
        const target = {};
        let consentCode = target;
        const list = path.split('.');
        const len = list.length;
        for (let i = 0; i < len - 1; i++) {
            const elem = list[i];
            if (!consentCode[elem]) {
                consentCode[elem] = {};
            }
            consentCode = consentCode[elem];
        }
        consentCode[list[len - 1]] = value;
        return target;
    }
}
CdcUserPreferenceSerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcUserPreferenceSerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CdcUserPreferenceSerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcUserPreferenceSerializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcUserPreferenceSerializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const KEY = 'cdc-consents-list';
class CdcConsentsLocalStorageService {
    constructor(statePersistenceService) {
        this.statePersistenceService = statePersistenceService;
        this.subscription = new Subscription();
    }
    /**
     * saves active cdc consents to storage
     * @param siteConsent - cdc site consent details
     */
    persistCdcConsentsToStorage(siteConsent) {
        const consents = [];
        const siteDetails = siteConsent.siteConsentDetails;
        for (const key in siteDetails) {
            //key will be a string with dot separated IDs
            if (Object.hasOwn(siteDetails, key) &&
                siteDetails[key]?.isActive === true) {
                const consent = {};
                consent.id = key;
                consent.required = siteDetails[key]?.isMandatory;
                consents.push(consent);
            }
        }
        this.subscription.add(this.statePersistenceService.syncWithStorage({
            key: KEY,
            state$: of(consents),
        }));
    }
    /**
     * Returns cdc consents from storage
     * @returns cdc consents
     */
    readCdcConsentsFromStorage() {
        return this.statePersistenceService.readStateFromStorage({
            key: KEY,
        });
    }
    /**
     * Returns true if input consent is present in storage, else returns false
     * @param consentId - cdc consent id
     * @returns - returns true/false
     */
    checkIfConsentExists(consentId) {
        const consents = this.readCdcConsentsFromStorage();
        let result = false;
        consents.forEach((consent) => {
            if (consent.id === consentId) {
                result = true;
            }
        });
        return result;
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
CdcConsentsLocalStorageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcConsentsLocalStorageService, deps: [{ token: i2.StatePersistenceService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcConsentsLocalStorageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcConsentsLocalStorageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcConsentsLocalStorageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i2.StatePersistenceService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdcConsentManagementComponentService extends ConsentManagementComponentService {
    constructor(store) {
        super();
        this.store = store;
    }
    getRequiredConsents(templateList) {
        const requiredConsents = [];
        const cdcConsents = this.getCdcConsentIDs(true);
        requiredConsents.push(...super.getRequiredConsents(templateList));
        requiredConsents.push(...cdcConsents);
        return requiredConsents;
    }
    /**
     * Returns cdc consents from store
     * @param mandatoryConsents - if passed true, only mandatory consents will be returned.
     * if passed false, all active consents (irrespective of whether they are mandatory or not)
     * @returns array of consents
     */
    getCdcConsentIDs(mandatoryConsents = false) {
        const consentIDs = [];
        const consents = this.store.readCdcConsentsFromStorage() || [];
        consents.forEach((consent) => {
            if (mandatoryConsents === true) {
                if (consent.required === true) {
                    consentIDs.push(consent.id);
                }
            }
            else {
                consentIDs.push(consent.id);
            }
        });
        return consentIDs;
    }
}
CdcConsentManagementComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcConsentManagementComponentService, deps: [{ token: CdcConsentsLocalStorageService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcConsentManagementComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcConsentManagementComponentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcConsentManagementComponentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: CdcConsentsLocalStorageService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
//maintaining target as any because 'preferences' in cdc can have any structure
const CDC_USER_PREFERENCE_SERIALIZER = new InjectionToken('CdcUserPreferenceSerializer');

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdcConfig {
}
CdcConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CdcConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useExisting: Config,
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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Indicates the failure during the loading of the user token.
 */
class CdcLoadUserTokenFailEvent extends CxEvent {
}
/**
 * Event's type
 */
CdcLoadUserTokenFailEvent.type = 'CdcLoadUserTokenFailEvent';
class CdcReConsentEvent extends CxEvent {
}
/**
 * Event's type
 */
CdcReConsentEvent.type = 'CdcReConsentEvent';

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
const CDC_FEATURE = 'cdc';
const CDC_CORE_FEATURE = 'cdcCore';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdcAuthFacade {
}
CdcAuthFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcAuthFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CdcAuthFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcAuthFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: CdcAuthFacade,
        feature: CDC_CORE_FEATURE,
        methods: ['loginWithCustomCdcFlow', 'loginWithToken'],
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcAuthFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: CdcAuthFacade,
                        feature: CDC_CORE_FEATURE,
                        methods: ['loginWithCustomCdcFlow', 'loginWithToken'],
                        async: true,
                    }),
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultSessionTimeOut = 3600;
const setAccountInfoAPI = 'accounts.setAccountInfo';
class CdcJsService {
    constructor(cdcConfig, baseSiteService, languageService, scriptLoader, winRef, cdcAuth, auth, zone, userProfileFacade, platform, globalMessageService, eventService, consentStore) {
        this.cdcConfig = cdcConfig;
        this.baseSiteService = baseSiteService;
        this.languageService = languageService;
        this.scriptLoader = scriptLoader;
        this.winRef = winRef;
        this.cdcAuth = cdcAuth;
        this.auth = auth;
        this.zone = zone;
        this.userProfileFacade = userProfileFacade;
        this.platform = platform;
        this.globalMessageService = globalMessageService;
        this.eventService = eventService;
        this.consentStore = consentStore;
        this.loaded$ = new ReplaySubject(1);
        this.errorLoading$ = new ReplaySubject(1);
        this.subscription = new Subscription();
    }
    /**
     * Initialize CDC script
     */
    initialize() {
        this.loadCdcJavascript();
    }
    /**
     * Returns observable with the information if CDC script is loaded.
     */
    didLoad() {
        return this.loaded$.asObservable();
    }
    /**
     * Returns observable with the information if CDC script failed to load.
     */
    didScriptFailToLoad() {
        return this.errorLoading$.asObservable();
    }
    /**
     * Method which loads the CDC Script
     */
    loadCdcJavascript() {
        // Only load the script on client side (no SSR)
        if (isPlatformBrowser(this.platform)) {
            this.subscription.add(combineLatest([
                this.baseSiteService.getActive(),
                this.languageService.getActive(),
            ])
                .pipe(take(1))
                .subscribe(([baseSite, language]) => {
                const scriptForBaseSite = this.getJavascriptUrlForCurrentSite(baseSite);
                if (scriptForBaseSite) {
                    const javascriptUrl = `${scriptForBaseSite}&lang=${language}`;
                    this.scriptLoader.embedScript({
                        src: javascriptUrl,
                        params: undefined,
                        attributes: { type: 'text/javascript' },
                        callback: () => {
                            this.registerEventListeners(baseSite);
                            this.getSiteConsentDetails(true).subscribe(); //fetch CDC consents and persist to local storage
                            this.loaded$.next(true);
                            this.errorLoading$.next(false);
                        },
                        errorCallback: () => {
                            this.errorLoading$.next(true);
                            this.loaded$.next(false);
                        },
                    });
                    if (this.winRef?.nativeWindow !== undefined) {
                        this.winRef.nativeWindow['__gigyaConf'] = {
                            include: 'id_token, missing-required-fields',
                        };
                    }
                }
            }));
        }
    }
    /**
     * Method obtains the CDC SDK URL for a base site
     * @param baseSite
     * @returns CDC SDK URL
     */
    getJavascriptUrlForCurrentSite(baseSite) {
        const filteredConfigs = (this.cdcConfig.cdc ?? []).filter((conf) => conf.baseSite === baseSite);
        if (filteredConfigs && filteredConfigs.length > 0) {
            return filteredConfigs[0].javascriptUrl;
        }
        return '';
    }
    /**
     * Register login event listeners for CDC login
     *
     * @param baseSite
     */
    registerEventListeners(baseSite) {
        this.addCdcEventHandlers(baseSite);
    }
    /**
     * Method to register CDC event handlers
     *
     * @param baseSite
     */
    addCdcEventHandlers(baseSite) {
        this.gigyaSDK = this.winRef.nativeWindow?.['gigya'];
        this.gigyaSDK?.accounts?.addEventHandlers({
            onLogin: (...params) => this.zone.run(() => this.onLoginEventHandler(baseSite, ...params)),
        });
    }
    /**
     * Trigger login to Commerce once an onLogin event is triggered by CDC Screen Set.
     *
     * @param baseSite
     * @param response
     */
    onLoginEventHandler(baseSite, response) {
        if (response && !response?.context?.skipOccAuth) {
            //skip re-authentication during reset email
            this.cdcAuth.loginWithCustomCdcFlow(response.UID, response.UIDSignature, response.signatureTimestamp, response.id_token !== undefined ? response.id_token : '', baseSite);
        }
    }
    /**
     * Trigger CDC User registration and log in using CDC APIs.
     *
     * @param user: UserSignUp
     */
    registerUserWithoutScreenSet(user) {
        if (!user.uid || !user.password) {
            return throwError(null);
        }
        else {
            return this.invokeAPI('accounts.initRegistration', {}).pipe(switchMap((response) => this.onInitRegistrationHandler(user, response)));
        }
    }
    /**
     * Trigger CDC User registration using CDC APIs.
     *
     * @param user
     * @param response
     */
    onInitRegistrationHandler(user, response) {
        if (!response?.regToken || !user?.uid || !user?.password) {
            return throwError(null);
        }
        else {
            const regSource = this.winRef.nativeWindow?.location?.href || '';
            return this.invokeAPI('accounts.register', {
                email: user.uid,
                password: user.password,
                profile: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
                preferences: user.preferences,
                regSource: regSource,
                regToken: response.regToken,
                finalizeRegistration: true,
            }).pipe(take(1), tap({
                error: (errorResponse) => this.handleRegisterError(errorResponse),
            }));
        }
    }
    /**
     * Trigger CDC User log in using CDC APIs.
     *
     * @param email
     * @param password
     * @param context (optional) - indicates the user flow
     */
    loginUserWithoutScreenSet(email, password, context) {
        const missingConsentErrorCode = 206001;
        let ignoreInterruptions = false;
        const channel = this.getCurrentBaseSiteChannel();
        if (channel && channel === 'B2C') {
            ignoreInterruptions = true;
        }
        return this.getSessionExpirationValue().pipe(switchMap((sessionExpiration) => {
            return this.invokeAPI('accounts.login', {
                loginID: email,
                password: password,
                ignoreInterruptions: ignoreInterruptions,
                ...(context && { context: context }),
                sessionExpiry: sessionExpiration,
            }).pipe(take(1), tap({
                error: (response) => {
                    if (response.errorCode !== missingConsentErrorCode) {
                        this.handleLoginError(response);
                    }
                    else {
                        this.raiseCdcReconsentEvent(email, password, response.missingRequiredFields, response.errorMessage, response.regToken);
                    }
                },
            }));
        }));
    }
    /**
     * Trigger CDC Organisation registration using CDC APIs.
     *
     * @param orgInfo
     */
    registerOrganisationWithoutScreenSet(orgInfo) {
        if (!orgInfo?.companyName ||
            !orgInfo?.email ||
            !orgInfo?.firstName ||
            !orgInfo?.lastName) {
            return throwError('Organization details not provided');
        }
        else {
            const regSource = this.winRef.nativeWindow?.location?.href || '';
            const message = orgInfo.message;
            let department = null;
            let position = null;
            if (message) {
                ({ department, position } = this.parseMessage(message));
            }
            return this.invokeAPI('accounts.b2b.registerOrganization', {
                organization: {
                    name: orgInfo.companyName,
                    street_address: orgInfo.addressLine1 + ' ' + orgInfo.addressLine2,
                    city: orgInfo.town,
                    state: orgInfo.region,
                    zip_code: orgInfo.postalCode,
                    country: orgInfo.country,
                },
                requester: {
                    firstName: orgInfo.firstName,
                    lastName: orgInfo.lastName,
                    email: orgInfo.email,
                    ...(orgInfo.phoneNumber &&
                        orgInfo.phoneNumber.length > 0 && { phone: orgInfo.phoneNumber }),
                    department: department,
                    jobFunction: position,
                },
                regSource: regSource,
            }).pipe(take(1), tap({
                error: (errorResponse) => this.handleRegisterError(errorResponse),
            }));
        }
    }
    /**
     * Retrieves the organization selected by the logged in user
     *
     */
    getOrganizationContext() {
        return this.invokeAPI('accounts.b2b.getOrganizationContext', {});
    }
    /**
     * Opens the Organization Management dashboard and logs in the user
     * if they currently have a valid Gigya session on the site
     *
     * @param orgId
     */
    openDelegatedAdminLogin(orgId) {
        return this.zone.run(() => this.gigyaSDK?.accounts?.b2b?.openDelegatedAdminLogin({
            orgId: orgId,
        }));
    }
    /**
     * Show failure message to the user in case registration fails.
     *
     * @param response
     */
    handleRegisterError(response) {
        if (response && response.status === 'FAIL') {
            const errorMessage = (response.validationErrors &&
                response.validationErrors.length > 0 &&
                response.validationErrors[response.validationErrors.length - 1]
                    .message) ||
                'Error';
            this.globalMessageService.add(errorMessage, GlobalMessageType.MSG_TYPE_ERROR);
        }
    }
    /**
     * Show failure message to the user in case login fails.
     *
     * @param response
     */
    handleLoginError(response) {
        if (response && response.status === 'FAIL') {
            this.globalMessageService.add({
                key: 'httpHandlers.badRequestPleaseLoginAgain',
                params: {
                    errorMessage: response.errorMessage,
                },
            }, GlobalMessageType.MSG_TYPE_ERROR);
        }
    }
    getSessionExpirationValue() {
        if (this.cdcConfig?.cdc !== undefined) {
            const filteredConfigs = this.cdcConfig.cdc.filter((conf) => conf.baseSite === this.getCurrentBaseSite());
            if (filteredConfigs && filteredConfigs.length > 0) {
                return of(filteredConfigs[0].sessionExpiration);
            }
        }
        // Return a default value
        return of(defaultSessionTimeOut);
    }
    parseMessage(message) {
        const msgList = message.replace('\n', '').split(';');
        let department = '';
        let position = '';
        for (const msg of msgList) {
            if (msg.trim().toLowerCase().search('department') === 0) {
                department = msg.split(':')[1].trim();
            }
            else if (msg.trim().toLowerCase().search('position') === 0) {
                position = msg.split(':')[1].trim();
            }
        }
        return { department, position };
    }
    getCurrentBaseSite() {
        let baseSite = '';
        this.baseSiteService
            .getActive()
            .pipe(take(1))
            .subscribe((data) => (baseSite = data));
        return baseSite;
    }
    getCurrentBaseSiteChannel() {
        let channel = '';
        const baseSiteUid = this.getCurrentBaseSite();
        this.baseSiteService
            .get(baseSiteUid)
            .pipe(take(1))
            .subscribe((data) => (channel = data?.channel ?? ''));
        return channel;
    }
    /**
     * Trigger CDC forgot password using CDC APIs.
     *
     * @param email
     */
    resetPasswordWithoutScreenSet(email) {
        if (!email || email?.length === 0) {
            return throwError('No email provided');
        }
        else {
            return this.invokeAPI('accounts.resetPassword', {
                loginID: email,
            }).pipe(take(1), tap({
                error: (response) => this.handleResetPassResponse(response),
            }));
        }
    }
    /**
     * Response handler for forgot password
     * @param response
     */
    handleResetPassResponse(response) {
        if (response && response.status === 'OK') {
            this.globalMessageService.add({ key: 'forgottenPassword.passwordResetEmailSent' }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        }
        else {
            const errorMessage = response?.errorMessage || {
                key: 'httpHandlers.unknownError',
            };
            this.globalMessageService.add(errorMessage, GlobalMessageType.MSG_TYPE_ERROR);
        }
    }
    /**
     * Trigger CDC Profile update.
     *
     * @param firstName
     * @param lastName
     */
    updateProfileWithoutScreenSet(user) {
        if (!user?.firstName ||
            user?.firstName?.length === 0 ||
            !user?.lastName ||
            user?.lastName?.length === 0) {
            return throwError('User details not provided');
        }
        else {
            const profileObj = {
                profile: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
            };
            return this.invokeAPI(setAccountInfoAPI, {
                ...profileObj,
            }).pipe(take(1), tap(() => this.userProfileFacade.update(user).subscribe({
                error: (error) => of(error),
            })));
        }
    }
    /**
     * Trigger CDC User Password update.
     *
     * @param oldPassword
     * @param newPassword
     */
    updateUserPasswordWithoutScreenSet(oldPassword, newPassword) {
        if (!oldPassword ||
            oldPassword?.length === 0 ||
            !newPassword ||
            newPassword?.length === 0) {
            return throwError('No passwords provided');
        }
        else {
            return this.invokeAPI(setAccountInfoAPI, {
                password: oldPassword,
                newPassword: newPassword,
            }).pipe(tap({
                error: (error) => of(error),
            }));
        }
    }
    /**
     * Updates user details using the existing User API
     *
     * @param response
     */
    onProfileUpdateEventHandler(response) {
        if (response) {
            const userDetails = {};
            userDetails.firstName = response.profile.firstName;
            userDetails.lastName = response.profile.lastName;
            userDetails.uid = response.profile.email;
            //logout the user only in case of email update.
            this.getLoggedInUserEmail().subscribe((user) => {
                const currentEmail = user?.uid;
                this.userProfileFacade.update(userDetails).subscribe(() => {
                    if (currentEmail !== userDetails.uid) {
                        this.logoutUser();
                    }
                });
            });
        }
    }
    /**
     * Trigger CDC user email update.
     *
     * @param password
     * @param newEmail
     */
    updateUserEmailWithoutScreenSet(password, newEmail) {
        if (!password ||
            password?.length === 0 ||
            !newEmail ||
            newEmail?.length === 0) {
            return throwError('Email or password not provided');
        }
        else {
            //Verify the password by attempting to login
            return this.getLoggedInUserEmail().pipe(switchMap((user) => {
                const email = user?.uid;
                if (!email || email?.length === 0) {
                    return throwError('Email or password not provided');
                }
                // Verify the password by attempting to login
                // - CDC doesn't require to verify password before changing an email, but the default Spartacus requires it.
                // - CDC doesn't have any specific api, for verifying a password, so as a _workaround_ we call the login API of CDC.
                //   We pass a special `context` parameter `'{ skipOccAuth: true }'`
                //   to avoid the full CDC login flow.
                //   Instead we want only half of the CDC login flow, just to verify if the password was correct.
                return this.loginUserWithoutScreenSet(email, password, {
                    skipOccAuth: true,
                }).pipe(switchMap(() => this.invokeAPI(setAccountInfoAPI, {
                    profile: {
                        email: newEmail,
                    },
                }).pipe(take(1), tap({
                    next: () => this.userProfileFacade.update({ uid: newEmail }).pipe(take(1), tap({
                        error: (error) => of(error),
                        complete: () => {
                            this.logoutUser();
                        },
                    })),
                }))));
            }));
        }
    }
    /**
     * Obtain the email of the currently logged in user
     * @returns emailID of the loggedIn user
     */
    getLoggedInUserEmail() {
        return this.userProfileFacade.get().pipe(filter((user) => Boolean(user)), take(1));
    }
    /**
     * Trigger CDC address update.
     *
     * @param address
     */
    updateAddressWithoutScreenSet(formattedAddress, zipCode, city, country) {
        if (!formattedAddress || formattedAddress?.length === 0) {
            return throwError('No address provided');
        }
        else {
            const profileObj = {
                address: formattedAddress,
                ...(city && { city: city }),
                ...(country && { country: country }),
                ...(zipCode && { zip: zipCode }),
            };
            return this.invokeAPI(setAccountInfoAPI, {
                profile: profileObj,
            });
        }
    }
    /**
     * Obtain the CDC SDK Method from the input method name as string
     * @param methodName
     * @returns CDC SDK Function
     */
    getSdkFunctionFromName(methodName) {
        //accounts.setAccountInfo or accounts.b2b.openDelegatedAdmin
        const nestedMethods = methodName.split('.');
        let cdcAPI = this.gigyaSDK;
        nestedMethods.forEach((method) => {
            if (cdcAPI && cdcAPI.hasOwnProperty(method)) {
                cdcAPI = cdcAPI[method];
            }
        });
        return cdcAPI;
    }
    /**
     * Invoke the CDC SDK Method and convert the callback to an Observable
     * @param methodName - method to be invoked
     * @param payload - Object payload
     * @returns - Observable with the response
     */
    invokeAPI(methodName, payload) {
        return new Observable((result) => {
            const actualAPI = this.getSdkFunctionFromName(methodName);
            if (typeof actualAPI != 'function') {
                result.error('CDC API name is incorrect');
                return;
            }
            actualAPI({
                ...payload,
                callback: (response) => {
                    this.zone.run(() => {
                        if (response?.status === 'OK') {
                            result.next(response);
                            result.complete();
                        }
                        else {
                            result.error(response);
                        }
                    });
                },
            });
        });
    }
    /**
     * Retrieves consent statements for logged in CDC site (based on CDC site API Key)
     * @param persistToLocalStorage - set this to true, if you want to save the fetched CDC consents to a local storage
     * @returns - Observable with site consent details
     */
    getSiteConsentDetails(persistToLocalStorage = false) {
        const baseSite = this.getCurrentBaseSite();
        const javascriptURL = this.getJavascriptUrlForCurrentSite(baseSite);
        const queryParams = new URLSearchParams(javascriptURL.substring(javascriptURL.indexOf('?')));
        const siteApiKey = queryParams.get('apikey');
        return this.invokeAPI('accounts.getSiteConsentDetails', {
            apiKey: siteApiKey,
        }).pipe(tap({
            next: (response) => {
                if (persistToLocalStorage) {
                    this.consentStore.persistCdcConsentsToStorage(response);
                }
            },
        }));
    }
    /**
     * Triggers the update (give/withdraw) of a CDC consent for a user
     * @param uid - user ID of the logged in user
     * @param lang - current storefront language
     * @param preferences - object containing the preference details
     * @param regToken - optional parameter, which is necessary when reconsent is provided during login scenario
     * @returns - returns Observable with error code and status
     */
    setUserConsentPreferences(uid, lang, preferences, regToken) {
        const regSource = this.winRef.nativeWindow?.location?.href || '';
        return this.invokeAPI(setAccountInfoAPI, {
            uid: uid,
            lang: lang,
            preferences: preferences,
            regSource: regSource,
            regToken: regToken,
        }).pipe(tap({
            error: (error) => {
                throwError(error);
            },
        }));
    }
    /**
     * Dispatch an event when reconsent is required during login. This will be listened
     * by reconsent module to show reconsent pop-up
     * @param user - user ID provided in login screen
     * @param password - password provided in login screen
     * @param reconsentIds - missing required cdc consent IDs
     * @param errorMessage - error message indicating that reconsent is required
     * @param regToken - token of the login session
     */
    raiseCdcReconsentEvent(user, password, reconsentIds, errorMessage, regToken) {
        const consentIds = [];
        reconsentIds.forEach((template) => {
            const removePreference = template.replace('preferences.', '');
            const removeIsConsentGranted = removePreference.replace('.isConsentGranted', '');
            consentIds.push(removeIsConsentGranted);
        });
        const newReConsentEvent = new CdcReConsentEvent();
        newReConsentEvent.user = user;
        newReConsentEvent.password = password;
        newReConsentEvent.consentIds = consentIds;
        newReConsentEvent.errorMessage = errorMessage;
        newReConsentEvent.regToken = regToken;
        this.eventService.dispatch(newReConsentEvent);
    }
    logoutUser() {
        this.auth.logout();
        this.invokeAPI('accounts.logout', {});
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
CdcJsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcJsService, deps: [{ token: CdcConfig }, { token: i2.BaseSiteService }, { token: i2.LanguageService }, { token: i2.ScriptLoader }, { token: i2.WindowRef }, { token: CdcAuthFacade }, { token: i2.AuthService }, { token: i0.NgZone }, { token: i4.UserProfileFacade }, { token: PLATFORM_ID }, { token: i2.GlobalMessageService }, { token: i2.EventService }, { token: CdcConsentsLocalStorageService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcJsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcJsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcJsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: CdcConfig }, { type: i2.BaseSiteService }, { type: i2.LanguageService }, { type: i2.ScriptLoader }, { type: i2.WindowRef }, { type: CdcAuthFacade }, { type: i2.AuthService }, { type: i0.NgZone }, { type: i4.UserProfileFacade }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i2.GlobalMessageService }, { type: i2.EventService }, { type: CdcConsentsLocalStorageService }]; } });

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
class CdcUserConsentService {
    constructor(languageService, userProfileFacade, cdcJsService, converter, cdcConsentsStorage) {
        this.languageService = languageService;
        this.userProfileFacade = userProfileFacade;
        this.cdcJsService = cdcJsService;
        this.converter = converter;
        this.cdcConsentsStorage = cdcConsentsStorage;
    }
    /**
     *
     * @param isConsentGranted - set true - if consent is given; false - if consent is withdrawn
     * @param consentCodes - array of cdc consent ids
     * @param user - If user is not passed, the logged in user id will be fetched and used. If passed, it will be considered.
     * @param regToken - token
     * @returns - returns Observable with error code and status
     */
    updateCdcConsent(isConsentGranted, consentCodes, user, regToken) {
        let consent;
        let serializedPreference = {};
        for (const consentCode of consentCodes) {
            consent = {};
            consent.id = consentCode;
            consent.currentConsent = {};
            if (isConsentGranted) {
                consent.currentConsent.consentGivenDate = new Date();
            }
            else {
                consent.currentConsent.consentWithdrawnDate = new Date();
            }
            const preference = this.converter.convert(consent, CDC_USER_PREFERENCE_SERIALIZER);
            serializedPreference = Object.assign(serializedPreference, preference);
        }
        let userId = '';
        if (user === undefined) {
            userId = this.getUserID() ?? '';
        }
        else if (user !== undefined) {
            userId = user;
        }
        const currentLanguage = this.getActiveLanguage();
        return this.cdcJsService
            .setUserConsentPreferences(userId, currentLanguage, serializedPreference, regToken)
            .pipe(tap({
            error: (error) => {
                throwError(error);
            },
        }));
    }
    /**
     * Returns logged in User ID
     * @returns user id
     */
    getUserID() {
        let uid;
        this.userProfileFacade.get().subscribe((user) => {
            uid = user?.uid;
        });
        return uid;
    }
    /**
     * Returns current language of the current site
     * @returns language iso code
     */
    getActiveLanguage() {
        let currentLanguage = '';
        this.languageService
            .getActive()
            .subscribe((language) => (currentLanguage = language))
            .unsubscribe();
        return currentLanguage;
    }
}
CdcUserConsentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcUserConsentService, deps: [{ token: i2.LanguageService }, { token: i4.UserProfileFacade }, { token: CdcJsService }, { token: i2.ConverterService }, { token: CdcConsentsLocalStorageService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcUserConsentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcUserConsentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcUserConsentService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i2.LanguageService }, { type: i4.UserProfileFacade }, { type: CdcJsService }, { type: i2.ConverterService }, { type: CdcConsentsLocalStorageService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdcUserConsentAdapter extends OccUserConsentAdapter {
    constructor(http, occEndpoints, converter, cdcUserConsentService, cdcConsentsStorage) {
        super(http, occEndpoints, converter);
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.cdcUserConsentService = cdcUserConsentService;
        this.cdcConsentsStorage = cdcConsentsStorage;
    }
    loadConsents(userId) {
        return super.loadConsents(userId);
    }
    giveConsent(userId, consentTemplateId, consentTemplateVersion) {
        if (!this.cdcConsentsStorage.checkIfConsentExists(consentTemplateId)) {
            return super.giveConsent(userId, consentTemplateId, consentTemplateVersion);
        }
        else {
            return this.cdcUserConsentService
                .updateCdcConsent(true, [consentTemplateId])
                .pipe(catchError((error) => throwError(error)), switchMap((result) => {
                if (result?.errorCode === 0) {
                    return super.giveConsent(userId, consentTemplateId, consentTemplateVersion);
                }
                return EMPTY;
            }));
        }
    }
    withdrawConsent(userId, consentCode, consentId) {
        if (!this.cdcConsentsStorage.checkIfConsentExists(consentId ?? '')) {
            return super.withdrawConsent(userId, consentCode);
        }
        else {
            return this.cdcUserConsentService
                .updateCdcConsent(false, consentId ? [consentId] : [])
                .pipe(catchError((error) => throwError(error)), switchMap((result) => {
                if (result?.errorCode === 0) {
                    return super.withdrawConsent(userId, consentCode);
                }
                return EMPTY;
            }));
        }
    }
}
CdcUserConsentAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcUserConsentAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }, { token: CdcUserConsentService }, { token: CdcConsentsLocalStorageService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcUserConsentAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcUserConsentAdapter, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcUserConsentAdapter, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }, { type: CdcUserConsentService }, { type: CdcConsentsLocalStorageService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdcConsentManagementModule {
}
CdcConsentManagementModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcConsentManagementModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CdcConsentManagementModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CdcConsentManagementModule, imports: [CommonModule, I18nModule] });
CdcConsentManagementModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcConsentManagementModule, providers: [
        { provide: UserConsentAdapter, useClass: CdcUserConsentAdapter },
        {
            provide: ConsentManagementComponentService,
            useClass: CdcConsentManagementComponentService,
        },
        {
            provide: CDC_USER_PREFERENCE_SERIALIZER,
            useExisting: CdcUserPreferenceSerializer,
            multi: true,
        },
    ], imports: [CommonModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcConsentManagementModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule],
                    providers: [
                        { provide: UserConsentAdapter, useClass: CdcUserConsentAdapter },
                        {
                            provide: ConsentManagementComponentService,
                            useClass: CdcConsentManagementComponentService,
                        },
                        {
                            provide: CDC_USER_PREFERENCE_SERIALIZER,
                            useExisting: CdcUserPreferenceSerializer,
                            multi: true,
                        },
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const cdcRoutesConfig = {
    cdcLogin: {
        paths: ['/cdc/login'],
        protected: false,
        authFlow: true,
    },
    cdcCheckoutLogin: {
        paths: ['/cdc/checkout-login'],
        protected: false,
        authFlow: true,
    },
    cdcOrgRegistration: {
        paths: ['/cdc/register-org'],
        protected: false,
        authFlow: true,
    },
};
const defaultCdcRoutingConfig = {
    routing: {
        routes: cdcRoutesConfig,
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @override
 *
 * CDC version of logout guard. In addition to token revocation we invoke logout method from CDC JS lib.
 */
class CdcLogoutGuard extends LogoutGuard {
    constructor(auth, cms, semanticPathService, protectedRoutes, router, winRef) {
        super(auth, cms, semanticPathService, protectedRoutes, router);
        this.auth = auth;
        this.cms = cms;
        this.semanticPathService = semanticPathService;
        this.protectedRoutes = protectedRoutes;
        this.router = router;
        this.winRef = winRef;
    }
    /**
     * Logout user from CDC
     */
    logoutFromCdc() {
        this.winRef.nativeWindow?.['gigya']?.accounts?.logout();
    }
    /**
     * @override
     * @returns promise to resolve after complete logout
     */
    logout() {
        return Promise.all([super.logout(), this.logoutFromCdc()]);
    }
}
CdcLogoutGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcLogoutGuard, deps: [{ token: i2.AuthService }, { token: i2.CmsService }, { token: i2.SemanticPathService }, { token: i2.ProtectedRoutesService }, { token: i2$1.Router }, { token: i2.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
CdcLogoutGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcLogoutGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcLogoutGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i2.AuthService }, { type: i2.CmsService }, { type: i2.SemanticPathService }, { type: i2.ProtectedRoutesService }, { type: i2$1.Router }, { type: i2.WindowRef }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function cdcJsFactory(cdcJsService, configInit) {
    const func = () => configInit
        .getStable('context', 'cdc')
        .pipe(tap(() => {
        cdcJsService.initialize();
    }))
        .toPromise();
    return func;
}
function defaultCdcComponentsConfig() {
    const config = {
        featureModules: {
            [CDC_FEATURE]: {
                cmsComponents: ['GigyaRaasComponent'],
            },
            // by default core is bundled together with components
            [CDC_CORE_FEATURE]: CDC_FEATURE,
        },
    };
    return config;
}
class CdcRootModule {
}
CdcRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CdcRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CdcRootModule, imports: [CdcConsentManagementModule] });
CdcRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcRootModule, providers: [
        provideDefaultConfigFactory(defaultCdcComponentsConfig),
        { provide: LogoutGuard, useExisting: CdcLogoutGuard },
        {
            provide: APP_INITIALIZER,
            useFactory: cdcJsFactory,
            deps: [CdcJsService, ConfigInitializerService],
            multi: true,
        },
        provideDefaultConfig(defaultCdcRoutingConfig),
    ], imports: [CdcConsentManagementModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CdcConsentManagementModule],
                    providers: [
                        provideDefaultConfigFactory(defaultCdcComponentsConfig),
                        { provide: LogoutGuard, useExisting: CdcLogoutGuard },
                        {
                            provide: APP_INITIALIZER,
                            useFactory: cdcJsFactory,
                            deps: [CdcJsService, ConfigInitializerService],
                            multi: true,
                        },
                        provideDefaultConfig(defaultCdcRoutingConfig),
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

export { CDC_CORE_FEATURE, CDC_FEATURE, CDC_USER_PREFERENCE_SERIALIZER, CdcAuthFacade, CdcConfig, CdcConsentManagementComponentService, CdcConsentManagementModule, CdcConsentsLocalStorageService, CdcJsService, CdcLoadUserTokenFailEvent, CdcLogoutGuard, CdcReConsentEvent, CdcRootModule, CdcUserConsentAdapter, CdcUserConsentService, CdcUserPreferenceSerializer, cdcJsFactory, defaultCdcComponentsConfig };
//# sourceMappingURL=spartacus-cdc-root.mjs.map
