import { Injectable, NgZone, OnDestroy } from '@angular/core';
import {
  BaseSiteService,
  LanguageService,
  ExternalJsFileLoader,
  WindowRef,
  GlobalMessageService,
  AuthRedirectService,
  GlobalMessageType,
  User,
  UserService,
} from '@spartacus/core';
import { GigyaConfig } from '../../config/gigya-config';
import { BehaviorSubject, Subscription } from 'rxjs';
import { GigyaAuthService } from '../../auth/facade/gigya-auth.service';

@Injectable({
  providedIn: 'root',
})
export class GigyaJsService implements OnDestroy {
  loaded$ = new BehaviorSubject<boolean>(false);
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
  }

  /**
   * Method which loads the CDC Script
   */
  loadGigyaJavascript(): void {
    this.subscription.add(
      this.baseSiteService.getActive().subscribe((baseSite) => {
        let javascriptUrl = this.getJavascriptUrlForCurrentSite(baseSite);
        this.languageService.getActive().subscribe((language) => {
          javascriptUrl = javascriptUrl + '&lang=' + language;
          this.externalJsFileLoader.load(javascriptUrl, undefined, () => {
            this.loaded$.next(true);
            this.registerEventListeners();
          });
          this.winRef.nativeWindow['__gigyaConf'] = { include: 'id_token' };
        });
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

      this.auth.getUserToken().subscribe((data) => {
        if (data && data.access_token) {
          this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
          this.authRedirectService.redirect();
        }
      });
    }
  }

  private getCurrentBaseSite(): string {
    let baseSite: string;
    this.baseSiteService.getActive().subscribe((data) => (baseSite = data));

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
