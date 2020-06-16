import { Component, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { BaseSiteService, WindowRef } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { GigyaConfig } from '../../config';
import { GigyaRaasComponentData } from '../cms.model';
import { GigyaJsService } from '../gigya-js/gigya-js.service';

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
    private baseSiteService: BaseSiteService,
    private gigyaConfig: GigyaConfig,
    private winRef: WindowRef,
    private gigyaJSService: GigyaJsService,
    private zone: NgZone
  ) {
    this.renderScreenSet = true;
  }

  /**
   * Display screen set in embed mode
   *
   * @param data - GigyaRaasComponentData
   */
  displayScreenSetInEmbedMode(data: GigyaRaasComponentData): void {
    if (this.renderScreenSet) {
      if (this.isLoginScreenSet(data)) {
        this.winRef.nativeWindow?.['gigya']?.accounts?.showScreenSet({
          screenSet: data.screenSet,
          startScreen: data.startScreen,
          containerID: data.containerID,
          sessionExpiration: this.getSessionExpirationValue(),
        });
      } else {
        this.winRef.nativeWindow?.['gigya']?.accounts?.showScreenSet({
          screenSet: data.screenSet,
          startScreen: data.startScreen,
          containerID: data.containerID,
          onAfterSubmit: (...params) => {
            this.zone.run(() =>
              this.gigyaJSService.onProfileUpdateEventHandler(...params)
            );
          },
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
      this.winRef.nativeWindow?.['gigya']?.accounts?.showScreenSet({
        screenSet: data.screenSet,
        startScreen: data.startScreen,
        sessionExpiration: this.getSessionExpirationValue(),
      });
    } else {
      this.winRef.nativeWindow?.['gigya']?.accounts?.showScreenSet({
        screenSet: data.screenSet,
        startScreen: data.startScreen,
        onAfterSubmit: (...params) => {
          this.zone.run(() =>
            this.gigyaJSService.onProfileUpdateEventHandler(...params)
          );
        },
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
}
