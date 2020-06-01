import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AuthRedirectService,
  BaseSiteService,
  GlobalMessageService,
  GlobalMessageType,
  User,
  UserService,
} from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { filter, take } from 'rxjs/operators';
import { GigyaAuthService } from '../../auth/facade/gigya-auth.service';
import { GigyaConfig } from '../../config';
import { GigyaRaasComponentData } from '../cms.model';
import { GigyaJsService } from '../gigya-js/gigya-js.service';

declare var gigya: any;

@Component({
  selector: 'cx-gigya-raas',
  templateUrl: './gigya-raas.component.html',
  styleUrls: ['./gigya-raas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GigyaRaasComponent {
  renderScreenSet: boolean;

  public constructor(
    public component: CmsComponentData<GigyaRaasComponentData>,
    private auth: GigyaAuthService,
    private userService: UserService,
    private authRedirectService: AuthRedirectService,
    private globalMessageService: GlobalMessageService,
    private baseSiteService: BaseSiteService,
    private gigyaConfig: GigyaConfig,
    protected gigyaJsService: GigyaJsService
  ) {
    this.renderScreenSet = true;

    gigyaJsService.loaded$.pipe(filter(Boolean), take(1)).subscribe(() => {
      if (gigyaJsService.eventListenersAdded) {
        return;
      }
      gigya.accounts.addEventHandlers({
        onLogin: (response) => this.onLoginEventHandler(response),
      });
    });
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
          onAfterSubmit: (response) =>
            this.onProfileUpdateEventHandler(response),
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
        onAfterSubmit: (response) => this.onProfileUpdateEventHandler(response),
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
