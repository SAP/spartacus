import { Injectable, NgZone, OnDestroy } from '@angular/core';
import {
  AuthRedirectService,
  BaseSiteService,
  ExternalJsFileLoader,
  GlobalMessageService,
  GlobalMessageType,
  LanguageService,
  User,
  UserService,
  WindowRef,
} from '@spartacus/core';
import { combineLatest, ReplaySubject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { GigyaAuthService } from '../../auth/facade/gigya-auth.service';
import { GigyaConfig } from '../../config/gigya-config';

@Injectable({
  providedIn: 'root',
})
export class GigyaJsService implements OnDestroy {
  private loaded$ = new ReplaySubject<boolean>(1);
  subscription: Subscription = new Subscription();

  constructor(
    private gigyaConfig: GigyaConfig,
    private baseSiteService: BaseSiteService,
    private languageService: LanguageService,
    private externalJsFileLoader: ExternalJsFileLoader,
    private winRef: WindowRef,
    private auth: GigyaAuthService,
    private globalMessageService: GlobalMessageService,
    private authRedirectService: AuthRedirectService,
    private zone: NgZone,
    private userService: UserService
  ) {}

  initialize(): void {
    this.loadGigyaJavascript();
    this.subscription.add(
      this.auth.getUserToken().subscribe((data) => {
        if (data && data.access_token) {
          this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
          this.authRedirectService.redirect();
        }
      })
    );
  }

  isLoaded() {
    return this.loaded$.asObservable();
  }

  /**
   * Method which loads the CDC Script
   */
  loadGigyaJavascript(): void {
    this.subscription.add(
      combineLatest([
        this.baseSiteService.getActive(),
        this.languageService.getActive(),
      ])
        .pipe(take(1))
        .subscribe(([baseSite, language]) => {
          const javascriptUrl = `${this.getJavascriptUrlForCurrentSite(
            baseSite
          )}&lang=${language}`;
          this.externalJsFileLoader.load(javascriptUrl, undefined, () => {
            this.registerEventListeners();
            this.loaded$.next(true);
          });
          this.winRef.nativeWindow['__gigyaConf'] = { include: 'id_token' };
        })
    );
  }

  private getJavascriptUrlForCurrentSite(baseSite: string): string {
    const filteredConfigs: any = this.gigyaConfig.gigya.filter(
      (conf) => conf.baseSite === baseSite
    );
    if (filteredConfigs && filteredConfigs.length > 0) {
      return filteredConfigs[0].javascriptUrl;
    }
    return '';
  }

  /**
   * Register login event listeners for CDC login
   */
  registerEventListeners(): void {
    this.addGigyaEventHandlers();
  }

  /**
   * Method to register gigya's event handlers
   */
  addGigyaEventHandlers(): void {
    this.winRef.nativeWindow?.['gigya']?.accounts?.addEventHandlers({
      onLogin: (...params) => {
        this.zone.run(() => this.onLoginEventHandler(...params));
      },
    });
  }

  /**
   * Trigger login to Commerce once an onLogin event is triggered by CDC Screen Set.
   *
   * @param response
   */
  onLoginEventHandler(...params: any[]) {
    if (params != null && params.length > 0 && params[0] != null) {
      this.auth.authorizeWithCustomGigyaFlow(
        params[0].UID,
        params[0].UIDSignature,
        params[0].signatureTimestamp,
        params[0].id_token !== undefined ? params[0].id_token : '',
        this.getCurrentBaseSite()
      );
    }
  }

  private getCurrentBaseSite(): string {
    let baseSite: string;
    this.baseSiteService
      .getActive()
      .pipe(take(1))
      .subscribe((data) => (baseSite = data));

    return baseSite;
  }

  /**
   * Updates user details using the existing User API
   *
   * @param response
   */
  onProfileUpdateEventHandler(...params: any[]) {
    if (params != null && params.length > 0 && params[0] != null) {
      const userDetails: User = {};
      userDetails.firstName = params[0].profile.firstName;
      userDetails.lastName = params[0].profile.lastName;
      this.userService.updatePersonalDetails(userDetails);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
