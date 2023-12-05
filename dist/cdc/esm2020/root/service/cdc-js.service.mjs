/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, NgZone, PLATFORM_ID, } from '@angular/core';
import { AuthService, BaseSiteService, EventService, GlobalMessageService, GlobalMessageType, LanguageService, ScriptLoader, WindowRef, } from '@spartacus/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { combineLatest, Observable, of, ReplaySubject, Subscription, throwError, } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { CdcConfig } from '../config/cdc-config';
import { CdcConsentsLocalStorageService } from '../consent-management';
import { CdcReConsentEvent } from '../events';
import { CdcAuthFacade } from '../facade/cdc-auth.facade';
import * as i0 from "@angular/core";
import * as i1 from "../config/cdc-config";
import * as i2 from "@spartacus/core";
import * as i3 from "../facade/cdc-auth.facade";
import * as i4 from "@spartacus/user/profile/root";
import * as i5 from "../consent-management";
const defaultSessionTimeOut = 3600;
const setAccountInfoAPI = 'accounts.setAccountInfo';
export class CdcJsService {
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
CdcJsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcJsService, deps: [{ token: i1.CdcConfig }, { token: i2.BaseSiteService }, { token: i2.LanguageService }, { token: i2.ScriptLoader }, { token: i2.WindowRef }, { token: i3.CdcAuthFacade }, { token: i2.AuthService }, { token: i0.NgZone }, { token: i4.UserProfileFacade }, { token: PLATFORM_ID }, { token: i2.GlobalMessageService }, { token: i2.EventService }, { token: i5.CdcConsentsLocalStorageService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcJsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcJsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcJsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CdcConfig }, { type: i2.BaseSiteService }, { type: i2.LanguageService }, { type: i2.ScriptLoader }, { type: i2.WindowRef }, { type: i3.CdcAuthFacade }, { type: i2.AuthService }, { type: i0.NgZone }, { type: i4.UserProfileFacade }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i2.GlobalMessageService }, { type: i2.EventService }, { type: i5.CdcConsentsLocalStorageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLWpzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2NkYy9yb290L3NlcnZpY2UvY2RjLWpzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7QUFFSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQ0wsTUFBTSxFQUNOLFVBQVUsRUFDVixNQUFNLEVBRU4sV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxXQUFXLEVBQ1gsZUFBZSxFQUNmLFlBQVksRUFDWixvQkFBb0IsRUFDcEIsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixZQUFZLEVBRVosU0FBUyxHQUNWLE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUFFLGlCQUFpQixFQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDN0UsT0FBTyxFQUNMLGFBQWEsRUFDYixVQUFVLEVBQ1YsRUFBRSxFQUNGLGFBQWEsRUFDYixZQUFZLEVBQ1osVUFBVSxHQUNYLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV2RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDOUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7Ozs7O0FBRTFELE1BQU0scUJBQXFCLEdBQUcsSUFBSSxDQUFDO0FBQ25DLE1BQU0saUJBQWlCLEdBQUcseUJBQXlCLENBQUM7QUFJcEQsTUFBTSxPQUFPLFlBQVk7SUFNdkIsWUFDWSxTQUFv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Q0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7UUFDbEQsaUJBQWlCLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUM5QixpQkFBaUIsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3RDLGlCQUFpQixDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDMUMsaUJBQWlCLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUM5QyxpQkFBaUIsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVTLFVBQVU7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDakM7SUFDSCxDQUFDOzt5R0E1d0JVLFlBQVksNlFBZ0JiLFdBQVc7NkdBaEJWLFlBQVksY0FGWCxNQUFNOzJGQUVQLFlBQVk7a0JBSHhCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzswQkFpQkksTUFBTTsyQkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBJbmplY3QsXG4gIEluamVjdGFibGUsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBQTEFURk9STV9JRCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBBdXRoU2VydmljZSxcbiAgQmFzZVNpdGVTZXJ2aWNlLFxuICBFdmVudFNlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlVHlwZSxcbiAgTGFuZ3VhZ2VTZXJ2aWNlLFxuICBTY3JpcHRMb2FkZXIsXG4gIFVzZXIsXG4gIFdpbmRvd1JlZixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9yZ2FuaXphdGlvblVzZXJSZWdpc3RyYXRpb25Gb3JtIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vdXNlci1yZWdpc3RyYXRpb24vcm9vdCc7XG5pbXBvcnQgeyBVc2VyUHJvZmlsZUZhY2FkZSwgVXNlclNpZ25VcCB9IGZyb20gJ0BzcGFydGFjdXMvdXNlci9wcm9maWxlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgY29tYmluZUxhdGVzdCxcbiAgT2JzZXJ2YWJsZSxcbiAgb2YsXG4gIFJlcGxheVN1YmplY3QsXG4gIFN1YnNjcmlwdGlvbixcbiAgdGhyb3dFcnJvcixcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHN3aXRjaE1hcCwgdGFrZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2RjQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL2NkYy1jb25maWcnO1xuaW1wb3J0IHsgQ2RjQ29uc2VudHNMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vY29uc2VudC1tYW5hZ2VtZW50JztcbmltcG9ydCB7IENkY1NpdGVDb25zZW50VGVtcGxhdGUgfSBmcm9tICcuLi9jb25zZW50LW1hbmFnZW1lbnQvbW9kZWwvaW5kZXgnO1xuaW1wb3J0IHsgQ2RjUmVDb25zZW50RXZlbnQgfSBmcm9tICcuLi9ldmVudHMnO1xuaW1wb3J0IHsgQ2RjQXV0aEZhY2FkZSB9IGZyb20gJy4uL2ZhY2FkZS9jZGMtYXV0aC5mYWNhZGUnO1xuXG5jb25zdCBkZWZhdWx0U2Vzc2lvblRpbWVPdXQgPSAzNjAwO1xuY29uc3Qgc2V0QWNjb3VudEluZm9BUEkgPSAnYWNjb3VudHMuc2V0QWNjb3VudEluZm8nO1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENkY0pzU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByb3RlY3RlZCBsb2FkZWQkID0gbmV3IFJlcGxheVN1YmplY3Q8Ym9vbGVhbj4oMSk7XG4gIHByb3RlY3RlZCBlcnJvckxvYWRpbmckID0gbmV3IFJlcGxheVN1YmplY3Q8Ym9vbGVhbj4oMSk7XG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgcHJvdGVjdGVkIGdpZ3lhU0RLOiB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjZGNDb25maWc6IENkY0NvbmZpZyxcbiAgICBwcm90ZWN0ZWQgYmFzZVNpdGVTZXJ2aWNlOiBCYXNlU2l0ZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBzY3JpcHRMb2FkZXI6IFNjcmlwdExvYWRlcixcbiAgICBwcm90ZWN0ZWQgd2luUmVmOiBXaW5kb3dSZWYsXG4gICAgcHJvdGVjdGVkIGNkY0F1dGg6IENkY0F1dGhGYWNhZGUsXG4gICAgcHJvdGVjdGVkIGF1dGg6IEF1dGhTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB6b25lOiBOZ1pvbmUsXG4gICAgcHJvdGVjdGVkIHVzZXJQcm9maWxlRmFjYWRlOiBVc2VyUHJvZmlsZUZhY2FkZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcm90ZWN0ZWQgcGxhdGZvcm06IGFueSxcbiAgICBwcm90ZWN0ZWQgZ2xvYmFsTWVzc2FnZVNlcnZpY2U6IEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBldmVudFNlcnZpY2U6IEV2ZW50U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29uc2VudFN0b3JlOiBDZGNDb25zZW50c0xvY2FsU3RvcmFnZVNlcnZpY2VcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIENEQyBzY3JpcHRcbiAgICovXG4gIGluaXRpYWxpemUoKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkQ2RjSmF2YXNjcmlwdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgb2JzZXJ2YWJsZSB3aXRoIHRoZSBpbmZvcm1hdGlvbiBpZiBDREMgc2NyaXB0IGlzIGxvYWRlZC5cbiAgICovXG4gIGRpZExvYWQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMubG9hZGVkJC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIG9ic2VydmFibGUgd2l0aCB0aGUgaW5mb3JtYXRpb24gaWYgQ0RDIHNjcmlwdCBmYWlsZWQgdG8gbG9hZC5cbiAgICovXG4gIGRpZFNjcmlwdEZhaWxUb0xvYWQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuZXJyb3JMb2FkaW5nJC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2Qgd2hpY2ggbG9hZHMgdGhlIENEQyBTY3JpcHRcbiAgICovXG4gIGxvYWRDZGNKYXZhc2NyaXB0KCk6IHZvaWQge1xuICAgIC8vIE9ubHkgbG9hZCB0aGUgc2NyaXB0IG9uIGNsaWVudCBzaWRlIChubyBTU1IpXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm0pKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXG4gICAgICAgIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgICAgIHRoaXMuYmFzZVNpdGVTZXJ2aWNlLmdldEFjdGl2ZSgpLFxuICAgICAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLmdldEFjdGl2ZSgpLFxuICAgICAgICBdKVxuICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgLnN1YnNjcmliZSgoW2Jhc2VTaXRlLCBsYW5ndWFnZV0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNjcmlwdEZvckJhc2VTaXRlID1cbiAgICAgICAgICAgICAgdGhpcy5nZXRKYXZhc2NyaXB0VXJsRm9yQ3VycmVudFNpdGUoYmFzZVNpdGUpO1xuICAgICAgICAgICAgaWYgKHNjcmlwdEZvckJhc2VTaXRlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGphdmFzY3JpcHRVcmwgPSBgJHtzY3JpcHRGb3JCYXNlU2l0ZX0mbGFuZz0ke2xhbmd1YWdlfWA7XG4gICAgICAgICAgICAgIHRoaXMuc2NyaXB0TG9hZGVyLmVtYmVkU2NyaXB0KHtcbiAgICAgICAgICAgICAgICBzcmM6IGphdmFzY3JpcHRVcmwsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogeyB0eXBlOiAndGV4dC9qYXZhc2NyaXB0JyB9LFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMoYmFzZVNpdGUpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5nZXRTaXRlQ29uc2VudERldGFpbHModHJ1ZSkuc3Vic2NyaWJlKCk7IC8vZmV0Y2ggQ0RDIGNvbnNlbnRzIGFuZCBwZXJzaXN0IHRvIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGVkJC5uZXh0KHRydWUpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvckxvYWRpbmckLm5leHQoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvckxvYWRpbmckLm5leHQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICB0aGlzLmxvYWRlZCQubmV4dChmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGlmICh0aGlzLndpblJlZj8ubmF0aXZlV2luZG93ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAodGhpcy53aW5SZWYubmF0aXZlV2luZG93IGFzIHsgW2tleTogc3RyaW5nXTogYW55IH0pW1xuICAgICAgICAgICAgICAgICAgJ19fZ2lneWFDb25mJ1xuICAgICAgICAgICAgICAgIF0gPSB7XG4gICAgICAgICAgICAgICAgICBpbmNsdWRlOiAnaWRfdG9rZW4sIG1pc3NpbmctcmVxdWlyZWQtZmllbGRzJyxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBvYnRhaW5zIHRoZSBDREMgU0RLIFVSTCBmb3IgYSBiYXNlIHNpdGVcbiAgICogQHBhcmFtIGJhc2VTaXRlXG4gICAqIEByZXR1cm5zIENEQyBTREsgVVJMXG4gICAqL1xuICBwcml2YXRlIGdldEphdmFzY3JpcHRVcmxGb3JDdXJyZW50U2l0ZShiYXNlU2l0ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBmaWx0ZXJlZENvbmZpZ3MgPSAodGhpcy5jZGNDb25maWcuY2RjID8/IFtdKS5maWx0ZXIoXG4gICAgICAoY29uZikgPT4gY29uZi5iYXNlU2l0ZSA9PT0gYmFzZVNpdGVcbiAgICApO1xuICAgIGlmIChmaWx0ZXJlZENvbmZpZ3MgJiYgZmlsdGVyZWRDb25maWdzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBmaWx0ZXJlZENvbmZpZ3NbMF0uamF2YXNjcmlwdFVybDtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGxvZ2luIGV2ZW50IGxpc3RlbmVycyBmb3IgQ0RDIGxvZ2luXG4gICAqXG4gICAqIEBwYXJhbSBiYXNlU2l0ZVxuICAgKi9cbiAgcHJvdGVjdGVkIHJlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMoYmFzZVNpdGU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuYWRkQ2RjRXZlbnRIYW5kbGVycyhiYXNlU2l0ZSk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIHJlZ2lzdGVyIENEQyBldmVudCBoYW5kbGVyc1xuICAgKlxuICAgKiBAcGFyYW0gYmFzZVNpdGVcbiAgICovXG4gIHByb3RlY3RlZCBhZGRDZGNFdmVudEhhbmRsZXJzKGJhc2VTaXRlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmdpZ3lhU0RLID0gKHRoaXMud2luUmVmLm5hdGl2ZVdpbmRvdyBhcyB7IFtrZXk6IHN0cmluZ106IGFueSB9KT8uW1xuICAgICAgJ2dpZ3lhJ1xuICAgIF07XG4gICAgdGhpcy5naWd5YVNESz8uYWNjb3VudHM/LmFkZEV2ZW50SGFuZGxlcnMoe1xuICAgICAgb25Mb2dpbjogKC4uLnBhcmFtczogYW55W10pID0+XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gdGhpcy5vbkxvZ2luRXZlbnRIYW5kbGVyKGJhc2VTaXRlLCAuLi5wYXJhbXMpKSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIGxvZ2luIHRvIENvbW1lcmNlIG9uY2UgYW4gb25Mb2dpbiBldmVudCBpcyB0cmlnZ2VyZWQgYnkgQ0RDIFNjcmVlbiBTZXQuXG4gICAqXG4gICAqIEBwYXJhbSBiYXNlU2l0ZVxuICAgKiBAcGFyYW0gcmVzcG9uc2VcbiAgICovXG4gIHByb3RlY3RlZCBvbkxvZ2luRXZlbnRIYW5kbGVyKGJhc2VTaXRlOiBzdHJpbmcsIHJlc3BvbnNlPzogYW55KSB7XG4gICAgaWYgKHJlc3BvbnNlICYmICFyZXNwb25zZT8uY29udGV4dD8uc2tpcE9jY0F1dGgpIHtcbiAgICAgIC8vc2tpcCByZS1hdXRoZW50aWNhdGlvbiBkdXJpbmcgcmVzZXQgZW1haWxcbiAgICAgIHRoaXMuY2RjQXV0aC5sb2dpbldpdGhDdXN0b21DZGNGbG93KFxuICAgICAgICByZXNwb25zZS5VSUQsXG4gICAgICAgIHJlc3BvbnNlLlVJRFNpZ25hdHVyZSxcbiAgICAgICAgcmVzcG9uc2Uuc2lnbmF0dXJlVGltZXN0YW1wLFxuICAgICAgICByZXNwb25zZS5pZF90b2tlbiAhPT0gdW5kZWZpbmVkID8gcmVzcG9uc2UuaWRfdG9rZW4gOiAnJyxcbiAgICAgICAgYmFzZVNpdGVcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXIgQ0RDIFVzZXIgcmVnaXN0cmF0aW9uIGFuZCBsb2cgaW4gdXNpbmcgQ0RDIEFQSXMuXG4gICAqXG4gICAqIEBwYXJhbSB1c2VyOiBVc2VyU2lnblVwXG4gICAqL1xuICByZWdpc3RlclVzZXJXaXRob3V0U2NyZWVuU2V0KFxuICAgIHVzZXI6IFVzZXJTaWduVXBcbiAgKTogT2JzZXJ2YWJsZTx7IHN0YXR1czogc3RyaW5nIH0+IHtcbiAgICBpZiAoIXVzZXIudWlkIHx8ICF1c2VyLnBhc3N3b3JkKSB7XG4gICAgICByZXR1cm4gdGhyb3dFcnJvcihudWxsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaW52b2tlQVBJKCdhY2NvdW50cy5pbml0UmVnaXN0cmF0aW9uJywge30pLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgocmVzcG9uc2UpID0+IHRoaXMub25Jbml0UmVnaXN0cmF0aW9uSGFuZGxlcih1c2VyLCByZXNwb25zZSkpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIENEQyBVc2VyIHJlZ2lzdHJhdGlvbiB1c2luZyBDREMgQVBJcy5cbiAgICpcbiAgICogQHBhcmFtIHVzZXJcbiAgICogQHBhcmFtIHJlc3BvbnNlXG4gICAqL1xuICBwcm90ZWN0ZWQgb25Jbml0UmVnaXN0cmF0aW9uSGFuZGxlcihcbiAgICB1c2VyOiBVc2VyU2lnblVwLFxuICAgIHJlc3BvbnNlOiBhbnlcbiAgKTogT2JzZXJ2YWJsZTx7IHN0YXR1czogc3RyaW5nIH0+IHtcbiAgICBpZiAoIXJlc3BvbnNlPy5yZWdUb2tlbiB8fCAhdXNlcj8udWlkIHx8ICF1c2VyPy5wYXNzd29yZCkge1xuICAgICAgcmV0dXJuIHRocm93RXJyb3IobnVsbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHJlZ1NvdXJjZTogc3RyaW5nID0gdGhpcy53aW5SZWYubmF0aXZlV2luZG93Py5sb2NhdGlvbj8uaHJlZiB8fCAnJztcbiAgICAgIHJldHVybiB0aGlzLmludm9rZUFQSSgnYWNjb3VudHMucmVnaXN0ZXInLCB7XG4gICAgICAgIGVtYWlsOiB1c2VyLnVpZCxcbiAgICAgICAgcGFzc3dvcmQ6IHVzZXIucGFzc3dvcmQsXG4gICAgICAgIHByb2ZpbGU6IHtcbiAgICAgICAgICBmaXJzdE5hbWU6IHVzZXIuZmlyc3ROYW1lLFxuICAgICAgICAgIGxhc3ROYW1lOiB1c2VyLmxhc3ROYW1lLFxuICAgICAgICB9LFxuICAgICAgICBwcmVmZXJlbmNlczogdXNlci5wcmVmZXJlbmNlcyxcbiAgICAgICAgcmVnU291cmNlOiByZWdTb3VyY2UsXG4gICAgICAgIHJlZ1Rva2VuOiByZXNwb25zZS5yZWdUb2tlbixcbiAgICAgICAgZmluYWxpemVSZWdpc3RyYXRpb246IHRydWUsXG4gICAgICB9KS5waXBlKFxuICAgICAgICB0YWtlKDEpLFxuICAgICAgICB0YXAoe1xuICAgICAgICAgIGVycm9yOiAoZXJyb3JSZXNwb25zZSkgPT4gdGhpcy5oYW5kbGVSZWdpc3RlckVycm9yKGVycm9yUmVzcG9uc2UpLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlciBDREMgVXNlciBsb2cgaW4gdXNpbmcgQ0RDIEFQSXMuXG4gICAqXG4gICAqIEBwYXJhbSBlbWFpbFxuICAgKiBAcGFyYW0gcGFzc3dvcmRcbiAgICogQHBhcmFtIGNvbnRleHQgKG9wdGlvbmFsKSAtIGluZGljYXRlcyB0aGUgdXNlciBmbG93XG4gICAqL1xuICBsb2dpblVzZXJXaXRob3V0U2NyZWVuU2V0KFxuICAgIGVtYWlsOiBzdHJpbmcsXG4gICAgcGFzc3dvcmQ6IHN0cmluZyxcbiAgICBjb250ZXh0PzogYW55XG4gICk6IE9ic2VydmFibGU8eyBzdGF0dXM6IHN0cmluZyB9PiB7XG4gICAgY29uc3QgbWlzc2luZ0NvbnNlbnRFcnJvckNvZGUgPSAyMDYwMDE7XG4gICAgbGV0IGlnbm9yZUludGVycnVwdGlvbnMgPSBmYWxzZTtcbiAgICBjb25zdCBjaGFubmVsID0gdGhpcy5nZXRDdXJyZW50QmFzZVNpdGVDaGFubmVsKCk7XG4gICAgaWYgKGNoYW5uZWwgJiYgY2hhbm5lbCA9PT0gJ0IyQycpIHtcbiAgICAgIGlnbm9yZUludGVycnVwdGlvbnMgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nZXRTZXNzaW9uRXhwaXJhdGlvblZhbHVlKCkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoc2Vzc2lvbkV4cGlyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW52b2tlQVBJKCdhY2NvdW50cy5sb2dpbicsIHtcbiAgICAgICAgICBsb2dpbklEOiBlbWFpbCxcbiAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQsXG4gICAgICAgICAgaWdub3JlSW50ZXJydXB0aW9uczogaWdub3JlSW50ZXJydXB0aW9ucyxcbiAgICAgICAgICAuLi4oY29udGV4dCAmJiB7IGNvbnRleHQ6IGNvbnRleHQgfSksXG4gICAgICAgICAgc2Vzc2lvbkV4cGlyeTogc2Vzc2lvbkV4cGlyYXRpb24sXG4gICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICB0YXAoe1xuICAgICAgICAgICAgZXJyb3I6IChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZXJyb3JDb2RlICE9PSBtaXNzaW5nQ29uc2VudEVycm9yQ29kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTG9naW5FcnJvcihyZXNwb25zZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yYWlzZUNkY1JlY29uc2VudEV2ZW50KFxuICAgICAgICAgICAgICAgICAgZW1haWwsXG4gICAgICAgICAgICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLm1pc3NpbmdSZXF1aXJlZEZpZWxkcyxcbiAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmVycm9yTWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnJlZ1Rva2VuXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXIgQ0RDIE9yZ2FuaXNhdGlvbiByZWdpc3RyYXRpb24gdXNpbmcgQ0RDIEFQSXMuXG4gICAqXG4gICAqIEBwYXJhbSBvcmdJbmZvXG4gICAqL1xuICByZWdpc3Rlck9yZ2FuaXNhdGlvbldpdGhvdXRTY3JlZW5TZXQoXG4gICAgb3JnSW5mbzogT3JnYW5pemF0aW9uVXNlclJlZ2lzdHJhdGlvbkZvcm1cbiAgKTogT2JzZXJ2YWJsZTx7IHN0YXR1czogc3RyaW5nIH0+IHtcbiAgICBpZiAoXG4gICAgICAhb3JnSW5mbz8uY29tcGFueU5hbWUgfHxcbiAgICAgICFvcmdJbmZvPy5lbWFpbCB8fFxuICAgICAgIW9yZ0luZm8/LmZpcnN0TmFtZSB8fFxuICAgICAgIW9yZ0luZm8/Lmxhc3ROYW1lXG4gICAgKSB7XG4gICAgICByZXR1cm4gdGhyb3dFcnJvcignT3JnYW5pemF0aW9uIGRldGFpbHMgbm90IHByb3ZpZGVkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHJlZ1NvdXJjZTogc3RyaW5nID0gdGhpcy53aW5SZWYubmF0aXZlV2luZG93Py5sb2NhdGlvbj8uaHJlZiB8fCAnJztcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBvcmdJbmZvLm1lc3NhZ2U7XG4gICAgICBsZXQgZGVwYXJ0bWVudCA9IG51bGw7XG4gICAgICBsZXQgcG9zaXRpb24gPSBudWxsO1xuICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgKHsgZGVwYXJ0bWVudCwgcG9zaXRpb24gfSA9IHRoaXMucGFyc2VNZXNzYWdlKG1lc3NhZ2UpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuaW52b2tlQVBJKCdhY2NvdW50cy5iMmIucmVnaXN0ZXJPcmdhbml6YXRpb24nLCB7XG4gICAgICAgIG9yZ2FuaXphdGlvbjoge1xuICAgICAgICAgIG5hbWU6IG9yZ0luZm8uY29tcGFueU5hbWUsXG4gICAgICAgICAgc3RyZWV0X2FkZHJlc3M6IG9yZ0luZm8uYWRkcmVzc0xpbmUxICsgJyAnICsgb3JnSW5mby5hZGRyZXNzTGluZTIsXG4gICAgICAgICAgY2l0eTogb3JnSW5mby50b3duLFxuICAgICAgICAgIHN0YXRlOiBvcmdJbmZvLnJlZ2lvbixcbiAgICAgICAgICB6aXBfY29kZTogb3JnSW5mby5wb3N0YWxDb2RlLFxuICAgICAgICAgIGNvdW50cnk6IG9yZ0luZm8uY291bnRyeSxcbiAgICAgICAgfSxcbiAgICAgICAgcmVxdWVzdGVyOiB7XG4gICAgICAgICAgZmlyc3ROYW1lOiBvcmdJbmZvLmZpcnN0TmFtZSxcbiAgICAgICAgICBsYXN0TmFtZTogb3JnSW5mby5sYXN0TmFtZSxcbiAgICAgICAgICBlbWFpbDogb3JnSW5mby5lbWFpbCxcbiAgICAgICAgICAuLi4ob3JnSW5mby5waG9uZU51bWJlciAmJlxuICAgICAgICAgICAgb3JnSW5mby5waG9uZU51bWJlci5sZW5ndGggPiAwICYmIHsgcGhvbmU6IG9yZ0luZm8ucGhvbmVOdW1iZXIgfSksXG4gICAgICAgICAgZGVwYXJ0bWVudDogZGVwYXJ0bWVudCxcbiAgICAgICAgICBqb2JGdW5jdGlvbjogcG9zaXRpb24sXG4gICAgICAgIH0sXG4gICAgICAgIHJlZ1NvdXJjZTogcmVnU291cmNlLFxuICAgICAgfSkucGlwZShcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgdGFwKHtcbiAgICAgICAgICBlcnJvcjogKGVycm9yUmVzcG9uc2UpID0+IHRoaXMuaGFuZGxlUmVnaXN0ZXJFcnJvcihlcnJvclJlc3BvbnNlKSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgb3JnYW5pemF0aW9uIHNlbGVjdGVkIGJ5IHRoZSBsb2dnZWQgaW4gdXNlclxuICAgKlxuICAgKi9cbiAgZ2V0T3JnYW5pemF0aW9uQ29udGV4dCgpOiBPYnNlcnZhYmxlPHsgb3JnSWQ6IHN0cmluZyB9PiB7XG4gICAgcmV0dXJuIHRoaXMuaW52b2tlQVBJKCdhY2NvdW50cy5iMmIuZ2V0T3JnYW5pemF0aW9uQ29udGV4dCcsIHt9KTtcbiAgfVxuICAvKipcbiAgICogT3BlbnMgdGhlIE9yZ2FuaXphdGlvbiBNYW5hZ2VtZW50IGRhc2hib2FyZCBhbmQgbG9ncyBpbiB0aGUgdXNlclxuICAgKiBpZiB0aGV5IGN1cnJlbnRseSBoYXZlIGEgdmFsaWQgR2lneWEgc2Vzc2lvbiBvbiB0aGUgc2l0ZVxuICAgKlxuICAgKiBAcGFyYW0gb3JnSWRcbiAgICovXG4gIG9wZW5EZWxlZ2F0ZWRBZG1pbkxvZ2luKG9yZ0lkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bigoKSA9PlxuICAgICAgdGhpcy5naWd5YVNESz8uYWNjb3VudHM/LmIyYj8ub3BlbkRlbGVnYXRlZEFkbWluTG9naW4oe1xuICAgICAgICBvcmdJZDogb3JnSWQsXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdyBmYWlsdXJlIG1lc3NhZ2UgdG8gdGhlIHVzZXIgaW4gY2FzZSByZWdpc3RyYXRpb24gZmFpbHMuXG4gICAqXG4gICAqIEBwYXJhbSByZXNwb25zZVxuICAgKi9cbiAgcHJvdGVjdGVkIGhhbmRsZVJlZ2lzdGVyRXJyb3IocmVzcG9uc2U6IGFueSkge1xuICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5zdGF0dXMgPT09ICdGQUlMJykge1xuICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID1cbiAgICAgICAgKHJlc3BvbnNlLnZhbGlkYXRpb25FcnJvcnMgJiZcbiAgICAgICAgICByZXNwb25zZS52YWxpZGF0aW9uRXJyb3JzLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICByZXNwb25zZS52YWxpZGF0aW9uRXJyb3JzW3Jlc3BvbnNlLnZhbGlkYXRpb25FcnJvcnMubGVuZ3RoIC0gMV1cbiAgICAgICAgICAgIC5tZXNzYWdlKSB8fFxuICAgICAgICAnRXJyb3InO1xuICAgICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICAgIGVycm9yTWVzc2FnZSxcbiAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNob3cgZmFpbHVyZSBtZXNzYWdlIHRvIHRoZSB1c2VyIGluIGNhc2UgbG9naW4gZmFpbHMuXG4gICAqXG4gICAqIEBwYXJhbSByZXNwb25zZVxuICAgKi9cbiAgcHJvdGVjdGVkIGhhbmRsZUxvZ2luRXJyb3IocmVzcG9uc2U6IGFueSkge1xuICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5zdGF0dXMgPT09ICdGQUlMJykge1xuICAgICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICAgIHtcbiAgICAgICAgICBrZXk6ICdodHRwSGFuZGxlcnMuYmFkUmVxdWVzdFBsZWFzZUxvZ2luQWdhaW4nLFxuICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiByZXNwb25zZS5lcnJvck1lc3NhZ2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGdldFNlc3Npb25FeHBpcmF0aW9uVmFsdWUoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICBpZiAodGhpcy5jZGNDb25maWc/LmNkYyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBmaWx0ZXJlZENvbmZpZ3M6IGFueSA9IHRoaXMuY2RjQ29uZmlnLmNkYy5maWx0ZXIoXG4gICAgICAgIChjb25mKSA9PiBjb25mLmJhc2VTaXRlID09PSB0aGlzLmdldEN1cnJlbnRCYXNlU2l0ZSgpXG4gICAgICApO1xuICAgICAgaWYgKGZpbHRlcmVkQ29uZmlncyAmJiBmaWx0ZXJlZENvbmZpZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gb2YoZmlsdGVyZWRDb25maWdzWzBdLnNlc3Npb25FeHBpcmF0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmV0dXJuIGEgZGVmYXVsdCB2YWx1ZVxuICAgIHJldHVybiBvZihkZWZhdWx0U2Vzc2lvblRpbWVPdXQpO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZU1lc3NhZ2UobWVzc2FnZTogc3RyaW5nKToge1xuICAgIGRlcGFydG1lbnQ6IHN0cmluZztcbiAgICBwb3NpdGlvbjogc3RyaW5nO1xuICB9IHtcbiAgICBjb25zdCBtc2dMaXN0ID0gbWVzc2FnZS5yZXBsYWNlKCdcXG4nLCAnJykuc3BsaXQoJzsnKTtcbiAgICBsZXQgZGVwYXJ0bWVudCA9ICcnO1xuICAgIGxldCBwb3NpdGlvbiA9ICcnO1xuICAgIGZvciAoY29uc3QgbXNnIG9mIG1zZ0xpc3QpIHtcbiAgICAgIGlmIChtc2cudHJpbSgpLnRvTG93ZXJDYXNlKCkuc2VhcmNoKCdkZXBhcnRtZW50JykgPT09IDApIHtcbiAgICAgICAgZGVwYXJ0bWVudCA9IG1zZy5zcGxpdCgnOicpWzFdLnRyaW0oKTtcbiAgICAgIH0gZWxzZSBpZiAobXNnLnRyaW0oKS50b0xvd2VyQ2FzZSgpLnNlYXJjaCgncG9zaXRpb24nKSA9PT0gMCkge1xuICAgICAgICBwb3NpdGlvbiA9IG1zZy5zcGxpdCgnOicpWzFdLnRyaW0oKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgZGVwYXJ0bWVudCwgcG9zaXRpb24gfTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q3VycmVudEJhc2VTaXRlKCk6IHN0cmluZyB7XG4gICAgbGV0IGJhc2VTaXRlOiBzdHJpbmcgPSAnJztcbiAgICB0aGlzLmJhc2VTaXRlU2VydmljZVxuICAgICAgLmdldEFjdGl2ZSgpXG4gICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4gKGJhc2VTaXRlID0gZGF0YSkpO1xuICAgIHJldHVybiBiYXNlU2l0ZTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q3VycmVudEJhc2VTaXRlQ2hhbm5lbCgpOiBzdHJpbmcge1xuICAgIGxldCBjaGFubmVsOiBzdHJpbmcgPSAnJztcbiAgICBjb25zdCBiYXNlU2l0ZVVpZDogc3RyaW5nID0gdGhpcy5nZXRDdXJyZW50QmFzZVNpdGUoKTtcbiAgICB0aGlzLmJhc2VTaXRlU2VydmljZVxuICAgICAgLmdldChiYXNlU2l0ZVVpZClcbiAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAuc3Vic2NyaWJlKChkYXRhKSA9PiAoY2hhbm5lbCA9IGRhdGE/LmNoYW5uZWwgPz8gJycpKTtcbiAgICByZXR1cm4gY2hhbm5lbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIENEQyBmb3Jnb3QgcGFzc3dvcmQgdXNpbmcgQ0RDIEFQSXMuXG4gICAqXG4gICAqIEBwYXJhbSBlbWFpbFxuICAgKi9cbiAgcmVzZXRQYXNzd29yZFdpdGhvdXRTY3JlZW5TZXQoZW1haWw6IHN0cmluZyk6IE9ic2VydmFibGU8eyBzdGF0dXM6IHN0cmluZyB9PiB7XG4gICAgaWYgKCFlbWFpbCB8fCBlbWFpbD8ubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhyb3dFcnJvcignTm8gZW1haWwgcHJvdmlkZWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaW52b2tlQVBJKCdhY2NvdW50cy5yZXNldFBhc3N3b3JkJywge1xuICAgICAgICBsb2dpbklEOiBlbWFpbCxcbiAgICAgIH0pLnBpcGUoXG4gICAgICAgIHRha2UoMSksXG4gICAgICAgIHRhcCh7XG4gICAgICAgICAgZXJyb3I6IChyZXNwb25zZSkgPT4gdGhpcy5oYW5kbGVSZXNldFBhc3NSZXNwb25zZShyZXNwb25zZSksXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNwb25zZSBoYW5kbGVyIGZvciBmb3Jnb3QgcGFzc3dvcmRcbiAgICogQHBhcmFtIHJlc3BvbnNlXG4gICAqL1xuICBwcm90ZWN0ZWQgaGFuZGxlUmVzZXRQYXNzUmVzcG9uc2UocmVzcG9uc2U6IGFueSkge1xuICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5zdGF0dXMgPT09ICdPSycpIHtcbiAgICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgICB7IGtleTogJ2ZvcmdvdHRlblBhc3N3b3JkLnBhc3N3b3JkUmVzZXRFbWFpbFNlbnQnIH0sXG4gICAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX0NPTkZJUk1BVElPTlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gcmVzcG9uc2U/LmVycm9yTWVzc2FnZSB8fCB7XG4gICAgICAgIGtleTogJ2h0dHBIYW5kbGVycy51bmtub3duRXJyb3InLFxuICAgICAgfTtcbiAgICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgICBlcnJvck1lc3NhZ2UsXG4gICAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX0VSUk9SXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIENEQyBQcm9maWxlIHVwZGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIGZpcnN0TmFtZVxuICAgKiBAcGFyYW0gbGFzdE5hbWVcbiAgICovXG4gIHVwZGF0ZVByb2ZpbGVXaXRob3V0U2NyZWVuU2V0KHVzZXI6IFVzZXIpOiBPYnNlcnZhYmxlPHsgc3RhdHVzOiBzdHJpbmcgfT4ge1xuICAgIGlmIChcbiAgICAgICF1c2VyPy5maXJzdE5hbWUgfHxcbiAgICAgIHVzZXI/LmZpcnN0TmFtZT8ubGVuZ3RoID09PSAwIHx8XG4gICAgICAhdXNlcj8ubGFzdE5hbWUgfHxcbiAgICAgIHVzZXI/Lmxhc3ROYW1lPy5sZW5ndGggPT09IDBcbiAgICApIHtcbiAgICAgIHJldHVybiB0aHJvd0Vycm9yKCdVc2VyIGRldGFpbHMgbm90IHByb3ZpZGVkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHByb2ZpbGVPYmogPSB7XG4gICAgICAgIHByb2ZpbGU6IHtcbiAgICAgICAgICBmaXJzdE5hbWU6IHVzZXIuZmlyc3ROYW1lLFxuICAgICAgICAgIGxhc3ROYW1lOiB1c2VyLmxhc3ROYW1lLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIHJldHVybiB0aGlzLmludm9rZUFQSShzZXRBY2NvdW50SW5mb0FQSSwge1xuICAgICAgICAuLi5wcm9maWxlT2JqLFxuICAgICAgfSkucGlwZShcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgdGFwKCgpID0+XG4gICAgICAgICAgdGhpcy51c2VyUHJvZmlsZUZhY2FkZS51cGRhdGUodXNlcikuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgIGVycm9yOiAoZXJyb3IpID0+IG9mKGVycm9yKSxcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIENEQyBVc2VyIFBhc3N3b3JkIHVwZGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIG9sZFBhc3N3b3JkXG4gICAqIEBwYXJhbSBuZXdQYXNzd29yZFxuICAgKi9cbiAgdXBkYXRlVXNlclBhc3N3b3JkV2l0aG91dFNjcmVlblNldChcbiAgICBvbGRQYXNzd29yZDogc3RyaW5nLFxuICAgIG5ld1Bhc3N3b3JkOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTx7IHN0YXR1czogc3RyaW5nIH0+IHtcbiAgICBpZiAoXG4gICAgICAhb2xkUGFzc3dvcmQgfHxcbiAgICAgIG9sZFBhc3N3b3JkPy5sZW5ndGggPT09IDAgfHxcbiAgICAgICFuZXdQYXNzd29yZCB8fFxuICAgICAgbmV3UGFzc3dvcmQ/Lmxlbmd0aCA9PT0gMFxuICAgICkge1xuICAgICAgcmV0dXJuIHRocm93RXJyb3IoJ05vIHBhc3N3b3JkcyBwcm92aWRlZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5pbnZva2VBUEkoc2V0QWNjb3VudEluZm9BUEksIHtcbiAgICAgICAgcGFzc3dvcmQ6IG9sZFBhc3N3b3JkLFxuICAgICAgICBuZXdQYXNzd29yZDogbmV3UGFzc3dvcmQsXG4gICAgICB9KS5waXBlKFxuICAgICAgICB0YXAoe1xuICAgICAgICAgIGVycm9yOiAoZXJyb3IpID0+IG9mKGVycm9yKSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdXNlciBkZXRhaWxzIHVzaW5nIHRoZSBleGlzdGluZyBVc2VyIEFQSVxuICAgKlxuICAgKiBAcGFyYW0gcmVzcG9uc2VcbiAgICovXG4gIG9uUHJvZmlsZVVwZGF0ZUV2ZW50SGFuZGxlcihyZXNwb25zZT86IGFueSkge1xuICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgY29uc3QgdXNlckRldGFpbHM6IFVzZXIgPSB7fTtcbiAgICAgIHVzZXJEZXRhaWxzLmZpcnN0TmFtZSA9IHJlc3BvbnNlLnByb2ZpbGUuZmlyc3ROYW1lO1xuICAgICAgdXNlckRldGFpbHMubGFzdE5hbWUgPSByZXNwb25zZS5wcm9maWxlLmxhc3ROYW1lO1xuICAgICAgdXNlckRldGFpbHMudWlkID0gcmVzcG9uc2UucHJvZmlsZS5lbWFpbDtcbiAgICAgIC8vbG9nb3V0IHRoZSB1c2VyIG9ubHkgaW4gY2FzZSBvZiBlbWFpbCB1cGRhdGUuXG4gICAgICB0aGlzLmdldExvZ2dlZEluVXNlckVtYWlsKCkuc3Vic2NyaWJlKCh1c2VyKSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRFbWFpbCA9IHVzZXI/LnVpZDtcbiAgICAgICAgdGhpcy51c2VyUHJvZmlsZUZhY2FkZS51cGRhdGUodXNlckRldGFpbHMpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgaWYgKGN1cnJlbnRFbWFpbCAhPT0gdXNlckRldGFpbHMudWlkKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ291dFVzZXIoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXIgQ0RDIHVzZXIgZW1haWwgdXBkYXRlLlxuICAgKlxuICAgKiBAcGFyYW0gcGFzc3dvcmRcbiAgICogQHBhcmFtIG5ld0VtYWlsXG4gICAqL1xuICB1cGRhdGVVc2VyRW1haWxXaXRob3V0U2NyZWVuU2V0KFxuICAgIHBhc3N3b3JkOiBzdHJpbmcsXG4gICAgbmV3RW1haWw6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPHsgc3RhdHVzOiBzdHJpbmcgfT4ge1xuICAgIGlmIChcbiAgICAgICFwYXNzd29yZCB8fFxuICAgICAgcGFzc3dvcmQ/Lmxlbmd0aCA9PT0gMCB8fFxuICAgICAgIW5ld0VtYWlsIHx8XG4gICAgICBuZXdFbWFpbD8ubGVuZ3RoID09PSAwXG4gICAgKSB7XG4gICAgICByZXR1cm4gdGhyb3dFcnJvcignRW1haWwgb3IgcGFzc3dvcmQgbm90IHByb3ZpZGVkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vVmVyaWZ5IHRoZSBwYXNzd29yZCBieSBhdHRlbXB0aW5nIHRvIGxvZ2luXG4gICAgICByZXR1cm4gdGhpcy5nZXRMb2dnZWRJblVzZXJFbWFpbCgpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgodXNlcikgPT4ge1xuICAgICAgICAgIGNvbnN0IGVtYWlsID0gdXNlcj8udWlkO1xuICAgICAgICAgIGlmICghZW1haWwgfHwgZW1haWw/Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoJ0VtYWlsIG9yIHBhc3N3b3JkIG5vdCBwcm92aWRlZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBWZXJpZnkgdGhlIHBhc3N3b3JkIGJ5IGF0dGVtcHRpbmcgdG8gbG9naW5cbiAgICAgICAgICAvLyAtIENEQyBkb2Vzbid0IHJlcXVpcmUgdG8gdmVyaWZ5IHBhc3N3b3JkIGJlZm9yZSBjaGFuZ2luZyBhbiBlbWFpbCwgYnV0IHRoZSBkZWZhdWx0IFNwYXJ0YWN1cyByZXF1aXJlcyBpdC5cbiAgICAgICAgICAvLyAtIENEQyBkb2Vzbid0IGhhdmUgYW55IHNwZWNpZmljIGFwaSwgZm9yIHZlcmlmeWluZyBhIHBhc3N3b3JkLCBzbyBhcyBhIF93b3JrYXJvdW5kXyB3ZSBjYWxsIHRoZSBsb2dpbiBBUEkgb2YgQ0RDLlxuICAgICAgICAgIC8vICAgV2UgcGFzcyBhIHNwZWNpYWwgYGNvbnRleHRgIHBhcmFtZXRlciBgJ3sgc2tpcE9jY0F1dGg6IHRydWUgfSdgXG4gICAgICAgICAgLy8gICB0byBhdm9pZCB0aGUgZnVsbCBDREMgbG9naW4gZmxvdy5cbiAgICAgICAgICAvLyAgIEluc3RlYWQgd2Ugd2FudCBvbmx5IGhhbGYgb2YgdGhlIENEQyBsb2dpbiBmbG93LCBqdXN0IHRvIHZlcmlmeSBpZiB0aGUgcGFzc3dvcmQgd2FzIGNvcnJlY3QuXG4gICAgICAgICAgcmV0dXJuIHRoaXMubG9naW5Vc2VyV2l0aG91dFNjcmVlblNldChlbWFpbCwgcGFzc3dvcmQsIHtcbiAgICAgICAgICAgIHNraXBPY2NBdXRoOiB0cnVlLFxuICAgICAgICAgIH0pLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT5cbiAgICAgICAgICAgICAgdGhpcy5pbnZva2VBUEkoc2V0QWNjb3VudEluZm9BUEksIHtcbiAgICAgICAgICAgICAgICBwcm9maWxlOiB7XG4gICAgICAgICAgICAgICAgICBlbWFpbDogbmV3RW1haWwsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSkucGlwZShcbiAgICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICAgIHRhcCh7XG4gICAgICAgICAgICAgICAgICBuZXh0OiAoKSA9PlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJQcm9maWxlRmFjYWRlLnVwZGF0ZSh7IHVpZDogbmV3RW1haWwgfSkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICAgICAgICAgIHRhcCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogKGVycm9yKSA9PiBvZihlcnJvciksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ291dFVzZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE9idGFpbiB0aGUgZW1haWwgb2YgdGhlIGN1cnJlbnRseSBsb2dnZWQgaW4gdXNlclxuICAgKiBAcmV0dXJucyBlbWFpbElEIG9mIHRoZSBsb2dnZWRJbiB1c2VyXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0TG9nZ2VkSW5Vc2VyRW1haWwoKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgcmV0dXJuIHRoaXMudXNlclByb2ZpbGVGYWNhZGUuZ2V0KCkucGlwZShcbiAgICAgIGZpbHRlcigodXNlcik6IHVzZXIgaXMgVXNlciA9PiBCb29sZWFuKHVzZXIpKSxcbiAgICAgIHRha2UoMSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXIgQ0RDIGFkZHJlc3MgdXBkYXRlLlxuICAgKlxuICAgKiBAcGFyYW0gYWRkcmVzc1xuICAgKi9cbiAgdXBkYXRlQWRkcmVzc1dpdGhvdXRTY3JlZW5TZXQoXG4gICAgZm9ybWF0dGVkQWRkcmVzczogc3RyaW5nLFxuICAgIHppcENvZGU/OiBzdHJpbmcsXG4gICAgY2l0eT86IHN0cmluZyxcbiAgICBjb3VudHJ5Pzogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8eyBzdGF0dXM6IHN0cmluZyB9PiB7XG4gICAgaWYgKCFmb3JtYXR0ZWRBZGRyZXNzIHx8IGZvcm1hdHRlZEFkZHJlc3M/Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRocm93RXJyb3IoJ05vIGFkZHJlc3MgcHJvdmlkZWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcHJvZmlsZU9iaiA9IHtcbiAgICAgICAgYWRkcmVzczogZm9ybWF0dGVkQWRkcmVzcyxcbiAgICAgICAgLi4uKGNpdHkgJiYgeyBjaXR5OiBjaXR5IH0pLFxuICAgICAgICAuLi4oY291bnRyeSAmJiB7IGNvdW50cnk6IGNvdW50cnkgfSksXG4gICAgICAgIC4uLih6aXBDb2RlICYmIHsgemlwOiB6aXBDb2RlIH0pLFxuICAgICAgfTtcbiAgICAgIHJldHVybiB0aGlzLmludm9rZUFQSShzZXRBY2NvdW50SW5mb0FQSSwge1xuICAgICAgICBwcm9maWxlOiBwcm9maWxlT2JqLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE9idGFpbiB0aGUgQ0RDIFNESyBNZXRob2QgZnJvbSB0aGUgaW5wdXQgbWV0aG9kIG5hbWUgYXMgc3RyaW5nXG4gICAqIEBwYXJhbSBtZXRob2ROYW1lXG4gICAqIEByZXR1cm5zIENEQyBTREsgRnVuY3Rpb25cbiAgICovXG4gIHByb3RlY3RlZCBnZXRTZGtGdW5jdGlvbkZyb21OYW1lKFxuICAgIG1ldGhvZE5hbWU6IHN0cmluZ1xuICApOiAocGF5bG9hZDogT2JqZWN0KSA9PiB2b2lkIHtcbiAgICAvL2FjY291bnRzLnNldEFjY291bnRJbmZvIG9yIGFjY291bnRzLmIyYi5vcGVuRGVsZWdhdGVkQWRtaW5cbiAgICBjb25zdCBuZXN0ZWRNZXRob2RzID0gbWV0aG9kTmFtZS5zcGxpdCgnLicpO1xuICAgIGxldCBjZGNBUEk6IGFueSA9IHRoaXMuZ2lneWFTREs7XG4gICAgbmVzdGVkTWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHtcbiAgICAgIGlmIChjZGNBUEkgJiYgY2RjQVBJLmhhc093blByb3BlcnR5KG1ldGhvZCkpIHtcbiAgICAgICAgY2RjQVBJID0gY2RjQVBJW21ldGhvZF07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY2RjQVBJO1xuICB9XG5cbiAgLyoqXG4gICAqIEludm9rZSB0aGUgQ0RDIFNESyBNZXRob2QgYW5kIGNvbnZlcnQgdGhlIGNhbGxiYWNrIHRvIGFuIE9ic2VydmFibGVcbiAgICogQHBhcmFtIG1ldGhvZE5hbWUgLSBtZXRob2QgdG8gYmUgaW52b2tlZFxuICAgKiBAcGFyYW0gcGF5bG9hZCAtIE9iamVjdCBwYXlsb2FkXG4gICAqIEByZXR1cm5zIC0gT2JzZXJ2YWJsZSB3aXRoIHRoZSByZXNwb25zZVxuICAgKi9cbiAgcHJvdGVjdGVkIGludm9rZUFQSShtZXRob2ROYW1lOiBzdHJpbmcsIHBheWxvYWQ6IE9iamVjdCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPGFueT4oKHJlc3VsdCkgPT4ge1xuICAgICAgY29uc3QgYWN0dWFsQVBJID0gdGhpcy5nZXRTZGtGdW5jdGlvbkZyb21OYW1lKG1ldGhvZE5hbWUpO1xuICAgICAgaWYgKHR5cGVvZiBhY3R1YWxBUEkgIT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXN1bHQuZXJyb3IoJ0NEQyBBUEkgbmFtZSBpcyBpbmNvcnJlY3QnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYWN0dWFsQVBJKHtcbiAgICAgICAgLi4ucGF5bG9hZCxcbiAgICAgICAgY2FsbGJhY2s6IChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2U/LnN0YXR1cyA9PT0gJ09LJykge1xuICAgICAgICAgICAgICByZXN1bHQubmV4dChyZXNwb25zZSk7XG4gICAgICAgICAgICAgIHJlc3VsdC5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVzdWx0LmVycm9yKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyBjb25zZW50IHN0YXRlbWVudHMgZm9yIGxvZ2dlZCBpbiBDREMgc2l0ZSAoYmFzZWQgb24gQ0RDIHNpdGUgQVBJIEtleSlcbiAgICogQHBhcmFtIHBlcnNpc3RUb0xvY2FsU3RvcmFnZSAtIHNldCB0aGlzIHRvIHRydWUsIGlmIHlvdSB3YW50IHRvIHNhdmUgdGhlIGZldGNoZWQgQ0RDIGNvbnNlbnRzIHRvIGEgbG9jYWwgc3RvcmFnZVxuICAgKiBAcmV0dXJucyAtIE9ic2VydmFibGUgd2l0aCBzaXRlIGNvbnNlbnQgZGV0YWlsc1xuICAgKi9cbiAgZ2V0U2l0ZUNvbnNlbnREZXRhaWxzKFxuICAgIHBlcnNpc3RUb0xvY2FsU3RvcmFnZTogYm9vbGVhbiA9IGZhbHNlXG4gICk6IE9ic2VydmFibGU8Q2RjU2l0ZUNvbnNlbnRUZW1wbGF0ZT4ge1xuICAgIGNvbnN0IGJhc2VTaXRlOiBzdHJpbmcgPSB0aGlzLmdldEN1cnJlbnRCYXNlU2l0ZSgpO1xuICAgIGNvbnN0IGphdmFzY3JpcHRVUkw6IHN0cmluZyA9IHRoaXMuZ2V0SmF2YXNjcmlwdFVybEZvckN1cnJlbnRTaXRlKGJhc2VTaXRlKTtcbiAgICBjb25zdCBxdWVyeVBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoXG4gICAgICBqYXZhc2NyaXB0VVJMLnN1YnN0cmluZyhqYXZhc2NyaXB0VVJMLmluZGV4T2YoJz8nKSlcbiAgICApO1xuICAgIGNvbnN0IHNpdGVBcGlLZXk6IHN0cmluZyB8IG51bGwgPSBxdWVyeVBhcmFtcy5nZXQoJ2FwaWtleScpO1xuICAgIHJldHVybiB0aGlzLmludm9rZUFQSSgnYWNjb3VudHMuZ2V0U2l0ZUNvbnNlbnREZXRhaWxzJywge1xuICAgICAgYXBpS2V5OiBzaXRlQXBpS2V5LFxuICAgIH0pLnBpcGUoXG4gICAgICB0YXAoe1xuICAgICAgICBuZXh0OiAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZiAocGVyc2lzdFRvTG9jYWxTdG9yYWdlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnNlbnRTdG9yZS5wZXJzaXN0Q2RjQ29uc2VudHNUb1N0b3JhZ2UocmVzcG9uc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VycyB0aGUgdXBkYXRlIChnaXZlL3dpdGhkcmF3KSBvZiBhIENEQyBjb25zZW50IGZvciBhIHVzZXJcbiAgICogQHBhcmFtIHVpZCAtIHVzZXIgSUQgb2YgdGhlIGxvZ2dlZCBpbiB1c2VyXG4gICAqIEBwYXJhbSBsYW5nIC0gY3VycmVudCBzdG9yZWZyb250IGxhbmd1YWdlXG4gICAqIEBwYXJhbSBwcmVmZXJlbmNlcyAtIG9iamVjdCBjb250YWluaW5nIHRoZSBwcmVmZXJlbmNlIGRldGFpbHNcbiAgICogQHBhcmFtIHJlZ1Rva2VuIC0gb3B0aW9uYWwgcGFyYW1ldGVyLCB3aGljaCBpcyBuZWNlc3Nhcnkgd2hlbiByZWNvbnNlbnQgaXMgcHJvdmlkZWQgZHVyaW5nIGxvZ2luIHNjZW5hcmlvXG4gICAqIEByZXR1cm5zIC0gcmV0dXJucyBPYnNlcnZhYmxlIHdpdGggZXJyb3IgY29kZSBhbmQgc3RhdHVzXG4gICAqL1xuICBzZXRVc2VyQ29uc2VudFByZWZlcmVuY2VzKFxuICAgIHVpZDogc3RyaW5nLFxuICAgIGxhbmc6IHN0cmluZyxcbiAgICBwcmVmZXJlbmNlczogYW55LFxuICAgIHJlZ1Rva2VuPzogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8eyBlcnJvckNvZGU6IG51bWJlcjsgZXJyb3JNZXNzYWdlOiBzdHJpbmcgfT4ge1xuICAgIGNvbnN0IHJlZ1NvdXJjZTogc3RyaW5nID0gdGhpcy53aW5SZWYubmF0aXZlV2luZG93Py5sb2NhdGlvbj8uaHJlZiB8fCAnJztcbiAgICByZXR1cm4gdGhpcy5pbnZva2VBUEkoc2V0QWNjb3VudEluZm9BUEksIHtcbiAgICAgIHVpZDogdWlkLFxuICAgICAgbGFuZzogbGFuZyxcbiAgICAgIHByZWZlcmVuY2VzOiBwcmVmZXJlbmNlcyxcbiAgICAgIHJlZ1NvdXJjZTogcmVnU291cmNlLFxuICAgICAgcmVnVG9rZW46IHJlZ1Rva2VuLFxuICAgIH0pLnBpcGUoXG4gICAgICB0YXAoe1xuICAgICAgICBlcnJvcjogKGVycm9yKSA9PiB7XG4gICAgICAgICAgdGhyb3dFcnJvcihlcnJvcik7XG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogRGlzcGF0Y2ggYW4gZXZlbnQgd2hlbiByZWNvbnNlbnQgaXMgcmVxdWlyZWQgZHVyaW5nIGxvZ2luLiBUaGlzIHdpbGwgYmUgbGlzdGVuZWRcbiAgICogYnkgcmVjb25zZW50IG1vZHVsZSB0byBzaG93IHJlY29uc2VudCBwb3AtdXBcbiAgICogQHBhcmFtIHVzZXIgLSB1c2VyIElEIHByb3ZpZGVkIGluIGxvZ2luIHNjcmVlblxuICAgKiBAcGFyYW0gcGFzc3dvcmQgLSBwYXNzd29yZCBwcm92aWRlZCBpbiBsb2dpbiBzY3JlZW5cbiAgICogQHBhcmFtIHJlY29uc2VudElkcyAtIG1pc3NpbmcgcmVxdWlyZWQgY2RjIGNvbnNlbnQgSURzXG4gICAqIEBwYXJhbSBlcnJvck1lc3NhZ2UgLSBlcnJvciBtZXNzYWdlIGluZGljYXRpbmcgdGhhdCByZWNvbnNlbnQgaXMgcmVxdWlyZWRcbiAgICogQHBhcmFtIHJlZ1Rva2VuIC0gdG9rZW4gb2YgdGhlIGxvZ2luIHNlc3Npb25cbiAgICovXG4gIHJhaXNlQ2RjUmVjb25zZW50RXZlbnQoXG4gICAgdXNlcjogc3RyaW5nLFxuICAgIHBhc3N3b3JkOiBzdHJpbmcsXG4gICAgcmVjb25zZW50SWRzOiBzdHJpbmdbXSxcbiAgICBlcnJvck1lc3NhZ2U6IHN0cmluZyxcbiAgICByZWdUb2tlbjogc3RyaW5nXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnNlbnRJZHM6IHN0cmluZ1tdID0gW107XG4gICAgcmVjb25zZW50SWRzLmZvckVhY2goKHRlbXBsYXRlKSA9PiB7XG4gICAgICBjb25zdCByZW1vdmVQcmVmZXJlbmNlID0gdGVtcGxhdGUucmVwbGFjZSgncHJlZmVyZW5jZXMuJywgJycpO1xuICAgICAgY29uc3QgcmVtb3ZlSXNDb25zZW50R3JhbnRlZCA9IHJlbW92ZVByZWZlcmVuY2UucmVwbGFjZShcbiAgICAgICAgJy5pc0NvbnNlbnRHcmFudGVkJyxcbiAgICAgICAgJydcbiAgICAgICk7XG4gICAgICBjb25zZW50SWRzLnB1c2gocmVtb3ZlSXNDb25zZW50R3JhbnRlZCk7XG4gICAgfSk7XG4gICAgY29uc3QgbmV3UmVDb25zZW50RXZlbnQgPSBuZXcgQ2RjUmVDb25zZW50RXZlbnQoKTtcbiAgICBuZXdSZUNvbnNlbnRFdmVudC51c2VyID0gdXNlcjtcbiAgICBuZXdSZUNvbnNlbnRFdmVudC5wYXNzd29yZCA9IHBhc3N3b3JkO1xuICAgIG5ld1JlQ29uc2VudEV2ZW50LmNvbnNlbnRJZHMgPSBjb25zZW50SWRzO1xuICAgIG5ld1JlQ29uc2VudEV2ZW50LmVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZTtcbiAgICBuZXdSZUNvbnNlbnRFdmVudC5yZWdUb2tlbiA9IHJlZ1Rva2VuO1xuICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoKG5ld1JlQ29uc2VudEV2ZW50KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBsb2dvdXRVc2VyKCkge1xuICAgIHRoaXMuYXV0aC5sb2dvdXQoKTtcbiAgICB0aGlzLmludm9rZUFQSSgnYWNjb3VudHMubG9nb3V0Jywge30pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuIl19