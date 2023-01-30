/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isPlatformBrowser } from '@angular/common';
import {
  Inject,
  Injectable,
  NgZone,
  OnDestroy,
  PLATFORM_ID
} from '@angular/core';
import {
  AuthService,
  BaseSiteService,
  GlobalMessageService,
  GlobalMessageType,
  LanguageService,
  ScriptLoader,
  User,
  WindowRef
} from '@spartacus/core';
import { UserProfileFacade, UserSignUp } from '@spartacus/user/profile/root';
import { combineLatest, Observable, ReplaySubject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { CdcConfig } from '../config/cdc-config';
import { CdcAuthFacade } from '../facade/cdc-auth.facade';

@Injectable({
  providedIn: 'root',
})
export class CdcJsService implements OnDestroy {
  protected loaded$ = new ReplaySubject<boolean>(1);
  protected errorLoading$ = new ReplaySubject<boolean>(1);
  protected subscription: Subscription = new Subscription();

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
    protected globalMessageService: GlobalMessageService
  ) { }

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
                  include: 'id_token',
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
   * Unregister login event listeners for CDC login
   *
   */
  protected unRegisterEventListeners(): void {
    (this.winRef.nativeWindow as { [key: string]: any })?.[
      'gigya'
    ]?.accounts?.addEventHandlers({
      onLogin: () => {
        this.zone.run(() => { });
      },
    });
  }

  /**
   * Method to register CDC event handlers
   *
   * @param baseSite
   */
  protected addCdcEventHandlers(baseSite: string): void {
    (this.winRef.nativeWindow as { [key: string]: any })?.[
      'gigya'
    ]?.accounts?.addEventHandlers({
      onLogin: (...params: any[]) => {
        this.zone.run(() => this.onLoginEventHandler(baseSite, ...params));
      },
    });
  }

  /**
   * Trigger login to Commerce once an onLogin event is triggered by CDC Screen Set.
   *
   * @param baseSite
   * @param response
   */
  protected onLoginEventHandler(baseSite: string, response?: any) {
    if (response) {
      if (response?.context != 'RESET_EMAIL') { //skip re-authentication during reset email
        this.cdcAuth.loginWithCustomCdcFlow(
          response.UID,
          response.UIDSignature,
          response.signatureTimestamp,
          response.id_token !== undefined ? response.id_token : '',
          baseSite
        );
      }
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
    return new Observable<{ status: string }>((initRegistration) => {
      if (!user.uid || !user.password) {
        initRegistration.error(null);
      } else {
        (this.winRef.nativeWindow as { [key: string]: any })?.[
          'gigya'
        ]?.accounts?.initRegistration({
          callback: (response: any) => {
            this.zone.run(() => {
              this.onInitRegistrationHandler(user, response).subscribe({
                next: (result) => {
                  initRegistration.next(result);
                  initRegistration.complete();
                },
                error: (error) => initRegistration.error(error),
              });
            });
          },
        });
      }
    });
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
    return new Observable<{ status: string }>((isRegistered) => {
      if (response && response.regToken && user.uid && user.password) {
        (this.winRef.nativeWindow as { [key: string]: any })?.[
          'gigya'
        ]?.accounts?.register({
          email: user.uid,
          password: user.password,
          profile: {
            firstName: user.firstName,
            lastName: user.lastName,
          },
          regToken: response.regToken,
          finalizeRegistration: true,
          callback: (response: any) => {
            this.zone.run(() => {
              if (response?.status === 'OK') {
                isRegistered.next(response);
                isRegistered.complete();
              } else {
                this.handleRegisterError(response);
                isRegistered.error(response);
              }
            });
          },
        });
      }
    });
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
    context?: string
  ): Observable<{ status: string }> {
    return new Observable<{ status: string }>((isLoggedIn) => {
      (this.winRef.nativeWindow as { [key: string]: any })?.[
        'gigya'
      ]?.accounts?.login({
        loginID: email,
        password: password,
        ...(context) && { context: context },
        sessionExpiry: this.getSessionExpirationValue(),
        callback: (response: any) => {
          this.zone.run(() => {
            if (response?.status === 'OK') {
              isLoggedIn.next({ status: response.status });
              isLoggedIn.complete();
            } else {
              this.handleLoginError(response);
              isLoggedIn.error(response);
            }
          });
        },
      });
    });
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
            errorMessage: response.errorDetails,
          },
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }
  }


  protected getSessionExpirationValue(): number {
    if (this.cdcConfig?.cdc !== undefined) {
      const filteredConfigs: any = this.cdcConfig.cdc.filter(
        (conf) => conf.baseSite === this.getCurrentBaseSite()
      );
      if (filteredConfigs && filteredConfigs.length > 0) {
        return filteredConfigs[0].sessionExpiration;
      }
    }
    // Return a default value
    return 3600;
  }

  private getCurrentBaseSite(): string {
    let baseSite: string = '';
    this.baseSiteService
      .getActive()
      .pipe(take(1))
      .subscribe((data) => (baseSite = data));
    return baseSite;
  }


  /**
   * Trigger CDC forgot password using CDC APIs.
   *
   * @param email
   */
  resetPasswordWithoutScreenSet(email: string): Observable<{ status: string }> {
    return new Observable<{ status: string }>((isResetPassword) => {
      if (email && email.length > 0) {
        (this.winRef.nativeWindow as { [key: string]: any })?.[
          'gigya'
        ]?.accounts?.resetPassword({
          loginID: email,
          callback: (response: any) => {
            this.zone.run(() => {
              this.handleResetPassResponse(response);

              if (response?.status === 'OK') {
                isResetPassword.next({ status: response.status });
                isResetPassword.complete();
              } else {
                isResetPassword.error(response);
              }
            });
          },
        });
      }
    });
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
      this.globalMessageService.add(
        {
          key: 'httpHandlers.unknownError',
        },
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
    return new Observable<{ status: string }>((isProfileUpdated) => {
      if (user.firstName && user.firstName.length > 0 && user.lastName && user.lastName.length > 0) {
        let profileObj = {
          profile: {
            firstName: user.firstName,
            lastName: user.lastName
          }
        };
        (this.winRef.nativeWindow as { [key: string]: any })?.[
          'gigya'
        ]?.accounts?.setAccountInfo({
          ...profileObj,
          callback: (response: any) => {
            this.zone.run(() => {
              if (response?.status === 'OK') {
                //update user title code
                this.userProfileFacade.update(user as User).subscribe({
                  next: () => {
                    isProfileUpdated.next({ status: response.status });
                    isProfileUpdated.complete();
                  },
                  error: (error) => isProfileUpdated.error(error),
                });
              } else {
                isProfileUpdated.error(response);
              }
            });
          },
        });
      }
    });
  }


  /**
   * Trigger CDC User Password update.
   *
   * @param oldPassword
   * @param newPassword
   */
  updateUserPasswordWithoutScreenSet(oldPassword: string, newPassword: string): Observable<{ status: string }> {
    return new Observable<{ status: string }>((isPasswordUpdated) => {
      if (oldPassword && oldPassword.length > 0 && newPassword && newPassword.length > 0) {
        (this.winRef.nativeWindow as { [key: string]: any })?.[
          'gigya'
        ]?.accounts?.setAccountInfo({
          password: oldPassword,
          newPassword: newPassword,
          callback: (response: any) => {
            this.zone.run(() => {
              if (response?.status === 'OK') {
                isPasswordUpdated.next({ status: response.status });
                isPasswordUpdated.complete();
              } else {
                let errorMessage = response.errorMessage;
                this.globalMessageService.add(errorMessage, GlobalMessageType.MSG_TYPE_ERROR);
                isPasswordUpdated.error(response);
              }
            });
          },
        });
      }
    });
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
      this.userProfileFacade.update(userDetails);
    }
  }


  /**
  * Trigger CDC user email update.
  *
  * @param password
  * @param newEmail
  */
  updateUserEmailWithoutScreenSet(password: string, newEmail: string): Observable<{ status: string }> {
    return new Observable<{ status: string }>((isEmailUpdated) => {

      if (password && password.length > 0 && newEmail && newEmail.length > 0) {
        let email = this.getLoggedInUserEmail();

        //Verify the password by attempting to login
        this.loginUserWithoutScreenSet(email, password, "RESET_EMAIL").subscribe({
          next: (response) => {
            if (response?.status === 'OK') {

              (this.winRef.nativeWindow as { [key: string]: any })?.[
                'gigya'
              ]?.accounts?.setAccountInfo({
                profile: {
                  email: newEmail
                },
                callback: (response: any) => {
                  this.zone.run(() => {
                    if (response?.status === 'OK') {
                      this.userProfileFacade.update({ uid: newEmail });
                    } else {
                      isEmailUpdated.error(response);
                    }
                  });
                },
              });
            } else {
              isEmailUpdated.error(response);
            }
          },
          error: (error) => isEmailUpdated.error(error),
          complete: () => {
            isEmailUpdated.next({ status: 'OK' });
            isEmailUpdated.complete();
            this.auth.coreLogout();
            (this.winRef.nativeWindow as { [key: string]: any })?.[
              'gigya'
            ]?.accounts?.logout();
          },
        });

      }
    });
  }

  /**
   * Obtain the email of the currently logged in user
   * @returns emailID of the loggedIn user
   */
  protected getLoggedInUserEmail() {
    let email: string = '';
    this.userProfileFacade.get().pipe(take(1)).subscribe((user?: User) => {
      if (user && user.uid) {
        email = user.uid;
      }
    });
    return email;
  }


  /**
   * Trigger CDC address update.
   *
   * @param address
   */
  updateAddressWithoutScreenSet(address: string): Observable<{ status: string }> {
    return new Observable<{ status: string }>((isAddressUpdated) => {
      if (address && address.length > 0) {
        let profileObj = {
          profile: {
            address: address,
          }
        };
        (this.winRef.nativeWindow as { [key: string]: any })?.[
          'gigya'
        ]?.accounts?.setAccountInfo({
          ...profileObj,
          callback: (response: any) => {
            this.zone.run(() => {
              if (response?.status === 'OK') {
                isAddressUpdated.next({ status: response.status });
                isAddressUpdated.complete();
              } else {
                isAddressUpdated.error(response);
              }
            });
          },
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
