/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isPlatformBrowser } from '@angular/common';
import {
  Inject,
  Injectable,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import {
  AuthService,
  BaseSiteService,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  LanguageService,
  ScriptLoader,
  User,
  WindowRef,
} from '@spartacus/core';
import { OrganizationUserRegistrationForm } from '@spartacus/organization/user-registration/root';
import { UserProfileFacade, UserSignUp } from '@spartacus/user/profile/root';
import {
  combineLatest,
  Observable,
  of,
  ReplaySubject,
  Subscription,
  throwError,
} from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { CdcConfig } from '../config/cdc-config';
import { CdcConsentsLocalStorageService } from '../consent-management';
import { CdcSiteConsentTemplate } from '../consent-management/model/index';
import { CdcReConsentEvent } from '../events';
import { CdcAuthFacade } from '../facade/cdc-auth.facade';

const defaultSessionTimeOut = 3600;
const setAccountInfoAPI = 'accounts.setAccountInfo';
@Injectable({
  providedIn: 'root',
})
export class CdcJsService implements OnDestroy {
  protected loaded$ = new ReplaySubject<boolean>(1);
  protected errorLoading$ = new ReplaySubject<boolean>(1);
  protected subscription: Subscription = new Subscription();
  protected gigyaSDK: { [key: string]: any };

  constructor(
    protected cdcConfig: CdcConfig,
    protected baseSiteService: BaseSiteService,
    protected languageService: LanguageService,
    protected scriptLoader: ScriptLoader,
    protected winRef: WindowRef,
    protected cdcAuth: CdcAuthFacade,
    protected auth: AuthService,
    protected zone: NgZone,
    protected userProfileFacade: UserProfileFacade,
    @Inject(PLATFORM_ID) protected platform: any,
    protected globalMessageService: GlobalMessageService,
    protected eventService: EventService,
    protected consentStore: CdcConsentsLocalStorageService
  ) {}

  /**
   * Initialize CDC script
   */
  initialize(): void {
    this.loadCdcJavascript();
  }

  /**
   * Returns observable with the information if CDC script is loaded.
   */
  didLoad(): Observable<boolean> {
    return this.loaded$.asObservable();
  }

  /**
   * Returns observable with the information if CDC script failed to load.
   */
  didScriptFailToLoad(): Observable<boolean> {
    return this.errorLoading$.asObservable();
  }

  /**
   * Method which loads the CDC Script
   */
  loadCdcJavascript(): void {
    // Only load the script on client side (no SSR)
    if (isPlatformBrowser(this.platform)) {
      this.subscription.add(
        combineLatest([
          this.baseSiteService.getActive(),
          this.languageService.getActive(),
        ])
          .pipe(take(1))
          .subscribe(([baseSite, language]) => {
            const scriptForBaseSite =
              this.getJavascriptUrlForCurrentSite(baseSite);
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
                (this.winRef.nativeWindow as { [key: string]: any })[
                  '__gigyaConf'
                ] = {
                  include: 'id_token, missing-required-fields',
                };
              }
            }
          })
      );
    }
  }

  /**
   * Method obtains the CDC SDK URL for a base site
   * @param baseSite
   * @returns CDC SDK URL
   */
  private getJavascriptUrlForCurrentSite(baseSite: string): string {
    const filteredConfigs = (this.cdcConfig.cdc ?? []).filter(
      (conf) => conf.baseSite === baseSite
    );
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
  protected registerEventListeners(baseSite: string): void {
    this.addCdcEventHandlers(baseSite);
  }

  /**
   * Method to register CDC event handlers
   *
   * @param baseSite
   */
  protected addCdcEventHandlers(baseSite: string): void {
    this.gigyaSDK = (this.winRef.nativeWindow as { [key: string]: any })?.[
      'gigya'
    ];
    this.gigyaSDK?.accounts?.addEventHandlers({
      onLogin: (...params: any[]) =>
        this.zone.run(() => this.onLoginEventHandler(baseSite, ...params)),
    });
  }

  /**
   * Trigger login to Commerce once an onLogin event is triggered by CDC Screen Set.
   *
   * @param baseSite
   * @param response
   */
  protected onLoginEventHandler(baseSite: string, response?: any) {
    if (response && !response?.context?.skipOccAuth) {
      //skip re-authentication during reset email
      this.cdcAuth.loginWithCustomCdcFlow(
        response.UID,
        response.UIDSignature,
        response.signatureTimestamp,
        response.id_token !== undefined ? response.id_token : '',
        baseSite
      );
    }
  }

  /**
   * Trigger CDC User registration and log in using CDC APIs.
   *
   * @param user: UserSignUp
   */
  registerUserWithoutScreenSet(
    user: UserSignUp
  ): Observable<{ status: string }> {
    if (!user.uid || !user.password) {
      return throwError(null);
    } else {
      return this.invokeAPI('accounts.initRegistration', {}).pipe(
        switchMap((response) => this.onInitRegistrationHandler(user, response))
      );
    }
  }

  /**
   * Trigger CDC User registration using CDC APIs.
   *
   * @param user
   * @param response
   */
  protected onInitRegistrationHandler(
    user: UserSignUp,
    response: any
  ): Observable<{ status: string }> {
    if (!response?.regToken || !user?.uid || !user?.password) {
      return throwError(null);
    } else {
      const regSource: string = this.winRef.nativeWindow?.location?.href || '';
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
      }).pipe(
        take(1),
        tap({
          error: (errorResponse) => this.handleRegisterError(errorResponse),
        })
      );
    }
  }

  /**
   * Trigger CDC User log in using CDC APIs.
   *
   * @param email
   * @param password
   * @param context (optional) - indicates the user flow
   */
  loginUserWithoutScreenSet(
    email: string,
    password: string,
    context?: any
  ): Observable<{ status: string }> {
    const missingConsentErrorCode = 206001;
    let ignoreInterruptions = false;
    const channel = this.getCurrentBaseSiteChannel();
    if (channel && channel === 'B2C') {
      ignoreInterruptions = true;
    }
    return this.getSessionExpirationValue().pipe(
      switchMap((sessionExpiration) => {
        return this.invokeAPI('accounts.login', {
          loginID: email,
          password: password,
          ignoreInterruptions: ignoreInterruptions,
          ...(context && { context: context }),
          sessionExpiry: sessionExpiration,
        }).pipe(
          take(1),
          tap({
            error: (response) => {
              if (response.errorCode !== missingConsentErrorCode) {
                this.handleLoginError(response);
              } else {
                this.raiseCdcReconsentEvent(
                  email,
                  password,
                  response.missingRequiredFields,
                  response.errorMessage,
                  response.regToken
                );
              }
            },
          })
        );
      })
    );
  }

  /**
   * Trigger CDC Organisation registration using CDC APIs.
   *
   * @param orgInfo
   */
  registerOrganisationWithoutScreenSet(
    orgInfo: OrganizationUserRegistrationForm
  ): Observable<{ status: string }> {
    if (
      !orgInfo?.companyName ||
      !orgInfo?.email ||
      !orgInfo?.firstName ||
      !orgInfo?.lastName
    ) {
      return throwError('Organization details not provided');
    } else {
      const regSource: string = this.winRef.nativeWindow?.location?.href || '';
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
      }).pipe(
        take(1),
        tap({
          error: (errorResponse) => this.handleRegisterError(errorResponse),
        })
      );
    }
  }

  /**
   * Retrieves the organization selected by the logged in user
   *
   */
  getOrganizationContext(): Observable<{ orgId: string }> {
    return this.invokeAPI('accounts.b2b.getOrganizationContext', {});
  }
  /**
   * Opens the Organization Management dashboard and logs in the user
   * if they currently have a valid Gigya session on the site
   *
   * @param orgId
   */
  openDelegatedAdminLogin(orgId: string) {
    return this.zone.run(() =>
      this.gigyaSDK?.accounts?.b2b?.openDelegatedAdminLogin({
        orgId: orgId,
      })
    );
  }

  /**
   * Show failure message to the user in case registration fails.
   *
   * @param response
   */
  protected handleRegisterError(response: any) {
    if (response && response.status === 'FAIL') {
      const errorMessage =
        (response.validationErrors &&
          response.validationErrors.length > 0 &&
          response.validationErrors[response.validationErrors.length - 1]
            .message) ||
        'Error';
      this.globalMessageService.add(
        errorMessage,
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }
  }

  /**
   * Show failure message to the user in case login fails.
   *
   * @param response
   */
  protected handleLoginError(response: any) {
    if (response && response.status === 'FAIL') {
      this.globalMessageService.add(
        {
          key: 'httpHandlers.badRequestPleaseLoginAgain',
          params: {
            errorMessage: response.errorMessage,
          },
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }
  }

  protected getSessionExpirationValue(): Observable<number> {
    if (this.cdcConfig?.cdc !== undefined) {
      const filteredConfigs: any = this.cdcConfig.cdc.filter(
        (conf) => conf.baseSite === this.getCurrentBaseSite()
      );
      if (filteredConfigs && filteredConfigs.length > 0) {
        return of(filteredConfigs[0].sessionExpiration);
      }
    }
    // Return a default value
    return of(defaultSessionTimeOut);
  }

  private parseMessage(message: string): {
    department: string;
    position: string;
  } {
    const msgList = message.replace('\n', '').split(';');
    let department = '';
    let position = '';
    for (const msg of msgList) {
      if (msg.trim().toLowerCase().search('department') === 0) {
        department = msg.split(':')[1].trim();
      } else if (msg.trim().toLowerCase().search('position') === 0) {
        position = msg.split(':')[1].trim();
      }
    }
    return { department, position };
  }

  private getCurrentBaseSite(): string {
    let baseSite: string = '';
    this.baseSiteService
      .getActive()
      .pipe(take(1))
      .subscribe((data) => (baseSite = data));
    return baseSite;
  }

  private getCurrentBaseSiteChannel(): string {
    let channel: string = '';
    const baseSiteUid: string = this.getCurrentBaseSite();
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
  resetPasswordWithoutScreenSet(email: string): Observable<{ status: string }> {
    if (!email || email?.length === 0) {
      return throwError('No email provided');
    } else {
      return this.invokeAPI('accounts.resetPassword', {
        loginID: email,
      }).pipe(
        take(1),
        tap({
          error: (response) => this.handleResetPassResponse(response),
        })
      );
    }
  }

  /**
   * Response handler for forgot password
   * @param response
   */
  protected handleResetPassResponse(response: any) {
    if (response && response.status === 'OK') {
      this.globalMessageService.add(
        { key: 'forgottenPassword.passwordResetEmailSent' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    } else {
      const errorMessage = response?.errorMessage || {
        key: 'httpHandlers.unknownError',
      };
      this.globalMessageService.add(
        errorMessage,
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }
  }

  /**
   * Trigger CDC Profile update.
   *
   * @param firstName
   * @param lastName
   */
  updateProfileWithoutScreenSet(user: User): Observable<{ status: string }> {
    if (
      !user?.firstName ||
      user?.firstName?.length === 0 ||
      !user?.lastName ||
      user?.lastName?.length === 0
    ) {
      return throwError('User details not provided');
    } else {
      const profileObj = {
        profile: {
          firstName: user.firstName,
          lastName: user.lastName,
        },
      };
      return this.invokeAPI(setAccountInfoAPI, {
        ...profileObj,
      }).pipe(
        take(1),
        tap(() =>
          this.userProfileFacade.update(user).subscribe({
            error: (error) => of(error),
          })
        )
      );
    }
  }

  /**
   * Trigger CDC User Password update.
   *
   * @param oldPassword
   * @param newPassword
   */
  updateUserPasswordWithoutScreenSet(
    oldPassword: string,
    newPassword: string
  ): Observable<{ status: string }> {
    if (
      !oldPassword ||
      oldPassword?.length === 0 ||
      !newPassword ||
      newPassword?.length === 0
    ) {
      return throwError('No passwords provided');
    } else {
      return this.invokeAPI(setAccountInfoAPI, {
        password: oldPassword,
        newPassword: newPassword,
      }).pipe(
        tap({
          error: (error) => of(error),
        })
      );
    }
  }

  /**
   * Updates user details using the existing User API
   *
   * @param response
   */
  onProfileUpdateEventHandler(response?: any) {
    if (response) {
      const userDetails: User = {};
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
  updateUserEmailWithoutScreenSet(
    password: string,
    newEmail: string
  ): Observable<{ status: string }> {
    if (
      !password ||
      password?.length === 0 ||
      !newEmail ||
      newEmail?.length === 0
    ) {
      return throwError('Email or password not provided');
    } else {
      //Verify the password by attempting to login
      return this.getLoggedInUserEmail().pipe(
        switchMap((user) => {
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
          }).pipe(
            switchMap(() =>
              this.invokeAPI(setAccountInfoAPI, {
                profile: {
                  email: newEmail,
                },
              }).pipe(
                take(1),
                tap({
                  next: () =>
                    this.userProfileFacade.update({ uid: newEmail }).pipe(
                      take(1),
                      tap({
                        error: (error) => of(error),
                        complete: () => {
                          this.logoutUser();
                        },
                      })
                    ),
                })
              )
            )
          );
        })
      );
    }
  }

  /**
   * Obtain the email of the currently logged in user
   * @returns emailID of the loggedIn user
   */
  protected getLoggedInUserEmail(): Observable<User> {
    return this.userProfileFacade.get().pipe(
      filter((user): user is User => Boolean(user)),
      take(1)
    );
  }

  /**
   * Trigger CDC address update.
   *
   * @param address
   */
  updateAddressWithoutScreenSet(
    formattedAddress: string,
    zipCode?: string,
    city?: string,
    country?: string
  ): Observable<{ status: string }> {
    if (!formattedAddress || formattedAddress?.length === 0) {
      return throwError('No address provided');
    } else {
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
  protected getSdkFunctionFromName(
    methodName: string
  ): (payload: Object) => void {
    //accounts.setAccountInfo or accounts.b2b.openDelegatedAdmin
    const nestedMethods = methodName.split('.');
    let cdcAPI: any = this.gigyaSDK;
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
  protected invokeAPI(methodName: string, payload: Object): Observable<any> {
    return new Observable<any>((result) => {
      const actualAPI = this.getSdkFunctionFromName(methodName);
      if (typeof actualAPI != 'function') {
        result.error('CDC API name is incorrect');
        return;
      }
      actualAPI({
        ...payload,
        callback: (response: any) => {
          this.zone.run(() => {
            if (response?.status === 'OK') {
              result.next(response);
              result.complete();
            } else {
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
  getSiteConsentDetails(
    persistToLocalStorage: boolean = false
  ): Observable<CdcSiteConsentTemplate> {
    const baseSite: string = this.getCurrentBaseSite();
    const javascriptURL: string = this.getJavascriptUrlForCurrentSite(baseSite);
    const queryParams = new URLSearchParams(
      javascriptURL.substring(javascriptURL.indexOf('?'))
    );
    const siteApiKey: string | null = queryParams.get('apikey');
    return this.invokeAPI('accounts.getSiteConsentDetails', {
      apiKey: siteApiKey,
    }).pipe(
      tap({
        next: (response) => {
          if (persistToLocalStorage) {
            this.consentStore.persistCdcConsentsToStorage(response);
          }
        },
      })
    );
  }

  /**
   * Triggers the update (give/withdraw) of a CDC consent for a user
   * @param uid - user ID of the logged in user
   * @param lang - current storefront language
   * @param preferences - object containing the preference details
   * @param regToken - optional parameter, which is necessary when reconsent is provided during login scenario
   * @returns - returns Observable with error code and status
   */
  setUserConsentPreferences(
    uid: string,
    lang: string,
    preferences: any,
    regToken?: string
  ): Observable<{ errorCode: number; errorMessage: string }> {
    const regSource: string = this.winRef.nativeWindow?.location?.href || '';
    return this.invokeAPI(setAccountInfoAPI, {
      uid: uid,
      lang: lang,
      preferences: preferences,
      regSource: regSource,
      regToken: regToken,
    }).pipe(
      tap({
        error: (error) => {
          throwError(error);
        },
      })
    );
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
  raiseCdcReconsentEvent(
    user: string,
    password: string,
    reconsentIds: string[],
    errorMessage: string,
    regToken: string
  ): void {
    const consentIds: string[] = [];
    reconsentIds.forEach((template) => {
      const removePreference = template.replace('preferences.', '');
      const removeIsConsentGranted = removePreference.replace(
        '.isConsentGranted',
        ''
      );
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

  protected logoutUser() {
    this.auth.logout();
    this.invokeAPI('accounts.logout', {});
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
