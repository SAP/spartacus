import { NgZone, OnDestroy } from '@angular/core';
import { AuthService, BaseSiteService, EventService, GlobalMessageService, LanguageService, ScriptLoader, User, WindowRef } from '@spartacus/core';
import { OrganizationUserRegistrationForm } from '@spartacus/organization/user-registration/root';
import { UserProfileFacade, UserSignUp } from '@spartacus/user/profile/root';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { CdcConfig } from '../config/cdc-config';
import { CdcConsentsLocalStorageService } from '../consent-management';
import { CdcSiteConsentTemplate } from '../consent-management/model/index';
import { CdcAuthFacade } from '../facade/cdc-auth.facade';
import * as i0 from "@angular/core";
export declare class CdcJsService implements OnDestroy {
    protected cdcConfig: CdcConfig;
    protected baseSiteService: BaseSiteService;
    protected languageService: LanguageService;
    protected scriptLoader: ScriptLoader;
    protected winRef: WindowRef;
    protected cdcAuth: CdcAuthFacade;
    protected auth: AuthService;
    protected zone: NgZone;
    protected userProfileFacade: UserProfileFacade;
    protected platform: any;
    protected globalMessageService: GlobalMessageService;
    protected eventService: EventService;
    protected consentStore: CdcConsentsLocalStorageService;
    protected loaded$: ReplaySubject<boolean>;
    protected errorLoading$: ReplaySubject<boolean>;
    protected subscription: Subscription;
    protected gigyaSDK: {
        [key: string]: any;
    };
    constructor(cdcConfig: CdcConfig, baseSiteService: BaseSiteService, languageService: LanguageService, scriptLoader: ScriptLoader, winRef: WindowRef, cdcAuth: CdcAuthFacade, auth: AuthService, zone: NgZone, userProfileFacade: UserProfileFacade, platform: any, globalMessageService: GlobalMessageService, eventService: EventService, consentStore: CdcConsentsLocalStorageService);
    /**
     * Initialize CDC script
     */
    initialize(): void;
    /**
     * Returns observable with the information if CDC script is loaded.
     */
    didLoad(): Observable<boolean>;
    /**
     * Returns observable with the information if CDC script failed to load.
     */
    didScriptFailToLoad(): Observable<boolean>;
    /**
     * Method which loads the CDC Script
     */
    loadCdcJavascript(): void;
    /**
     * Method obtains the CDC SDK URL for a base site
     * @param baseSite
     * @returns CDC SDK URL
     */
    private getJavascriptUrlForCurrentSite;
    /**
     * Register login event listeners for CDC login
     *
     * @param baseSite
     */
    protected registerEventListeners(baseSite: string): void;
    /**
     * Method to register CDC event handlers
     *
     * @param baseSite
     */
    protected addCdcEventHandlers(baseSite: string): void;
    /**
     * Trigger login to Commerce once an onLogin event is triggered by CDC Screen Set.
     *
     * @param baseSite
     * @param response
     */
    protected onLoginEventHandler(baseSite: string, response?: any): void;
    /**
     * Trigger CDC User registration and log in using CDC APIs.
     *
     * @param user: UserSignUp
     */
    registerUserWithoutScreenSet(user: UserSignUp): Observable<{
        status: string;
    }>;
    /**
     * Trigger CDC User registration using CDC APIs.
     *
     * @param user
     * @param response
     */
    protected onInitRegistrationHandler(user: UserSignUp, response: any): Observable<{
        status: string;
    }>;
    /**
     * Trigger CDC User log in using CDC APIs.
     *
     * @param email
     * @param password
     * @param context (optional) - indicates the user flow
     */
    loginUserWithoutScreenSet(email: string, password: string, context?: any): Observable<{
        status: string;
    }>;
    /**
     * Trigger CDC Organisation registration using CDC APIs.
     *
     * @param orgInfo
     */
    registerOrganisationWithoutScreenSet(orgInfo: OrganizationUserRegistrationForm): Observable<{
        status: string;
    }>;
    /**
     * Retrieves the organization selected by the logged in user
     *
     */
    getOrganizationContext(): Observable<{
        orgId: string;
    }>;
    /**
     * Opens the Organization Management dashboard and logs in the user
     * if they currently have a valid Gigya session on the site
     *
     * @param orgId
     */
    openDelegatedAdminLogin(orgId: string): any;
    /**
     * Show failure message to the user in case registration fails.
     *
     * @param response
     */
    protected handleRegisterError(response: any): void;
    /**
     * Show failure message to the user in case login fails.
     *
     * @param response
     */
    protected handleLoginError(response: any): void;
    protected getSessionExpirationValue(): Observable<number>;
    private parseMessage;
    private getCurrentBaseSite;
    private getCurrentBaseSiteChannel;
    /**
     * Trigger CDC forgot password using CDC APIs.
     *
     * @param email
     */
    resetPasswordWithoutScreenSet(email: string): Observable<{
        status: string;
    }>;
    /**
     * Response handler for forgot password
     * @param response
     */
    protected handleResetPassResponse(response: any): void;
    /**
     * Trigger CDC Profile update.
     *
     * @param firstName
     * @param lastName
     */
    updateProfileWithoutScreenSet(user: User): Observable<{
        status: string;
    }>;
    /**
     * Trigger CDC User Password update.
     *
     * @param oldPassword
     * @param newPassword
     */
    updateUserPasswordWithoutScreenSet(oldPassword: string, newPassword: string): Observable<{
        status: string;
    }>;
    /**
     * Updates user details using the existing User API
     *
     * @param response
     */
    onProfileUpdateEventHandler(response?: any): void;
    /**
     * Trigger CDC user email update.
     *
     * @param password
     * @param newEmail
     */
    updateUserEmailWithoutScreenSet(password: string, newEmail: string): Observable<{
        status: string;
    }>;
    /**
     * Obtain the email of the currently logged in user
     * @returns emailID of the loggedIn user
     */
    protected getLoggedInUserEmail(): Observable<User>;
    /**
     * Trigger CDC address update.
     *
     * @param address
     */
    updateAddressWithoutScreenSet(formattedAddress: string, zipCode?: string, city?: string, country?: string): Observable<{
        status: string;
    }>;
    /**
     * Obtain the CDC SDK Method from the input method name as string
     * @param methodName
     * @returns CDC SDK Function
     */
    protected getSdkFunctionFromName(methodName: string): (payload: Object) => void;
    /**
     * Invoke the CDC SDK Method and convert the callback to an Observable
     * @param methodName - method to be invoked
     * @param payload - Object payload
     * @returns - Observable with the response
     */
    protected invokeAPI(methodName: string, payload: Object): Observable<any>;
    /**
     * Retrieves consent statements for logged in CDC site (based on CDC site API Key)
     * @param persistToLocalStorage - set this to true, if you want to save the fetched CDC consents to a local storage
     * @returns - Observable with site consent details
     */
    getSiteConsentDetails(persistToLocalStorage?: boolean): Observable<CdcSiteConsentTemplate>;
    /**
     * Triggers the update (give/withdraw) of a CDC consent for a user
     * @param uid - user ID of the logged in user
     * @param lang - current storefront language
     * @param preferences - object containing the preference details
     * @param regToken - optional parameter, which is necessary when reconsent is provided during login scenario
     * @returns - returns Observable with error code and status
     */
    setUserConsentPreferences(uid: string, lang: string, preferences: any, regToken?: string): Observable<{
        errorCode: number;
        errorMessage: string;
    }>;
    /**
     * Dispatch an event when reconsent is required during login. This will be listened
     * by reconsent module to show reconsent pop-up
     * @param user - user ID provided in login screen
     * @param password - password provided in login screen
     * @param reconsentIds - missing required cdc consent IDs
     * @param errorMessage - error message indicating that reconsent is required
     * @param regToken - token of the login session
     */
    raiseCdcReconsentEvent(user: string, password: string, reconsentIds: string[], errorMessage: string, regToken: string): void;
    protected logoutUser(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdcJsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CdcJsService>;
}
