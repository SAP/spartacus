import { Injectable, NgZone } from '@angular/core';
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
import { BehaviorSubject } from 'rxjs';
import { GigyaAuthService } from '../../auth/facade/gigya-auth.service';

export function gigyaLogin(response) {
  window['GigyaJSServiceReference'].zone.run(() =>
    window['GigyaJSServiceReference'].component.onLoginEventHandler(response)
  );
}

export function gigyaProfileUpdate(response) {
  window['GigyaJSServiceReference'].zone.run(() =>
    window['GigyaJSServiceReference'].component.onProfileUpdateEventHandler(
      response
    )
  );
}

@Injectable({
  providedIn: 'root',
})
export class GigyaJsService {
  loaded$ = new BehaviorSubject<boolean>(false);

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
    window['GigyaJSServiceReference'] = {
      zone: this.zone,
      onLoginEventHandlerGlobal: this.onLoginEventHandler(null),
      onProfileUpdateEventHandlerGlobal: this.onProfileUpdateEventHandler(null),
      component: this,
    };
  }

  /**
   * Method which loads the CDC Script
   */
  loadGigyaJavascript(): void {
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
    });
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
    this.winRef.nativeWindow['gigya'].accounts.addEventHandlers({
      onLogin: gigyaLogin,
    });
  }

  /**
   * Trigger login to Commerce once an onLogin event is triggered by CDC Screen Set.
   *
   * @param response
   */
  onLoginEventHandler(response: any) {
    if (response) {
      this.auth.authorizeWithCustomGigyaFlow(
        response.UID,
        response.UIDSignature,
        response.signatureTimestamp,
        response.id_token !== undefined ? response.id_token : '',
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
  onProfileUpdateEventHandler(response: any) {
    if (response) {
      const userDetails: User = {};
      userDetails.firstName = response.profile.firstName;
      userDetails.lastName = response.profile.lastName;
      this.userService.updatePersonalDetails(userDetails);
    }
  }
}
