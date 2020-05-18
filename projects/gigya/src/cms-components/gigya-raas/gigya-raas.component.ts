import { Component, NgZone, ChangeDetectionStrategy } from '@angular/core';
import {
  AuthRedirectService,
  GlobalMessageType,
  GlobalMessageService,
  BaseSiteService,
} from '@spartacus/core';
import { UserService, User } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { GigyaConfig } from '../../config';
import { GigyaRaasComponentData } from '../cms.model';
import { GigyaAuthService } from '../../auth/facade/gigya-auth.service';

declare var gigya: any;
declare var window: Window;

interface Window {
  gigyaSpaProfileUpdate?: any;
  GigyaRaasComponentReference?: any;
}

window.gigyaSpaProfileUpdate = function (response) {
  window.GigyaRaasComponentReference.zone.run(() =>
    window.GigyaRaasComponentReference.component.onProfileUpdateEventHandler(
      response
    )
  );
};

@Component({
  selector: 'cx-gigya-raas',
  templateUrl: './gigya-raas.component.html',
  styleUrls: ['./gigya-raas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GigyaRaasComponent {
  renderScreenSet: boolean;
  embedScreenSet: boolean;

  public constructor(
    public component: CmsComponentData<GigyaRaasComponentData>,
    private zone: NgZone,
    private auth: GigyaAuthService,
    private userService: UserService,
    private authRedirectService: AuthRedirectService,
    private globalMessageService: GlobalMessageService,
    private baseSiteService: BaseSiteService,
    private gigyaConfig: GigyaConfig
  ) {
    this.renderScreenSet = true;
    window['GigyaRaasComponentReference'] = {
      zone: this.zone,
      onLoginEventHandlerGlobal: this.onLoginEventHandler(null),
      onProfileUpdateEventHandlerGlobal: this.onProfileUpdateEventHandler(null),
      component: this,
    };
  }

  /**
   * Display screen set in embed mode
   *
   * @param data - GigyaRaasComponentData
   */
  displayScreenSetInEmbedMode(data: GigyaRaasComponentData): void {
    if (this.renderScreenSet) {
      if (this.isLoginScreenSet(data)) {
        gigya.accounts.showScreenSet({
          screenSet: data.screenSet,
          startScreen: data.startScreen,
          containerID: data.containerID,
          sessionExpiration: this.getSessionExpirationValue(),
        });
      } else {
        gigya.accounts.showScreenSet({
          screenSet: data.screenSet,
          startScreen: data.startScreen,
          containerID: data.containerID,
          onAfterSubmit: window.gigyaSpaProfileUpdate,
        });
      }
    }
    this.renderScreenSet = false;
  }

  /**
   * Display screen set in popup mode
   *
   * @param data - GigyaRaasComponentData
   */
  displayScreenSetInPopupMode(data: GigyaRaasComponentData): void {
    if (this.isLoginScreenSet(data)) {
      gigya.accounts.showScreenSet({
        screenSet: data.screenSet,
        startScreen: data.startScreen,
        sessionExpiration: this.getSessionExpirationValue(),
      });
    } else {
      gigya.accounts.showScreenSet({
        screenSet: data.screenSet,
        startScreen: data.startScreen,
        onAfterSubmit: window.gigyaSpaProfileUpdate,
      });
    }
  }

  private isLoginScreenSet(data: GigyaRaasComponentData): boolean {
    const profileEditValue: boolean =
      data.profileEdit === 'true' ? true : false;

    if (!profileEditValue) {
      return true;
    }
    return false;
  }

  private getSessionExpirationValue(): number {
    const filteredConfigs: any = this.gigyaConfig.gigya.filter(
      (conf) => conf.baseSite === this.getCurrentBaseSite()
    );
    if (filteredConfigs && filteredConfigs.length > 0) {
      return filteredConfigs[0].sessionExpiration;
    }
    // Return a default value
    return 3600;
  }

  private getCurrentBaseSite(): string {
    let baseSite: string;
    this.baseSiteService.getActive().subscribe((data) => (baseSite = data));

    return baseSite;
  }

  /**
   * Check if the component should be displayed in embeded mode
   *
   * @param data - GigyaRaasComponentData
   */
  displayInEmbedMode(data: GigyaRaasComponentData): boolean {
    const embedValue: boolean = data.embed === 'true' ? true : false;
    if (embedValue && data.containerID && data.containerID.length > 0) {
      return true;
    }
    return false;
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
        response.id_token,
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
