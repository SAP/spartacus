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
  GlobalMessageService,
  GlobalMessageType,
  LanguageService,
  ScriptLoader,
  User,
  WindowRef,
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
                  this.loaded$.next(true);
                },
                errorCallback: () => {
                  this.errorLoading$.next(true);
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
  onLoginEventHandler(baseSite: string, response?: any) {
    if (response) {
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
   * @param email
   * @param password
   */
  registerUserWithoutScreenSet(user: UserSignUp) {
    (this.winRef.nativeWindow as { [key: string]: any })?.[
      'gigya'
    ]?.accounts?.initRegistration({
      callback: (response: any) => {
        this.zone.run(() => this.onInitRegistrationHandler(user, response));
      },
    });
  }

  /**
   * Trigger CDC User registration using CDC APIs.
   *
   * @param response
   */
  onInitRegistrationHandler(user: UserSignUp, response: any) {
    if (response && response.regToken && user.uid) {
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
        ignoreInterruptions: true,
        callback: (response: any) => {
          this.zone.run(() => {
            if (user.uid && user.password) {
              this.loginUserWithoutScreenSet(user.uid, user.password, response);
            }
          });
        },
      });
    }
  }

  /**
   * Trigger CDC User log in using CDC APIs.
   *
   * @param response
   */
  loginUserWithoutScreenSet(email: string, password: string, response: any) {
    if (response) {
      (this.winRef.nativeWindow as { [key: string]: any })?.[
        'gigya'
      ]?.accounts?.login({
        loginID: email,
        password: password,
        callback: (response: any) => {
          this.zone.run(() => this.handleLoginResponse(response));
        },
      });
    }
  }

  /**
   * Show success / failure message to the user after login.
   *
   * @param response
   */
  handleLoginResponse(response: any) {
    if (response) {
      if (response.status === 'FAIL') {
        this.globalMessageService.add(
          {
            key: 'httpHandlers.badRequestPleaseLoginAgain',
            params: {
              errorMessage: response.statusMessage,
            },
          },
          GlobalMessageType.MSG_TYPE_ERROR
        );
      } else if (response.status === 'OK') {
        this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
        this.globalMessageService.add(
          { key: 'register.loginSuccessful' },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      }
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
      this.userProfileFacade.update(userDetails);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
