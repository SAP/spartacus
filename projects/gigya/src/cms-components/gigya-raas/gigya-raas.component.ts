import { ChangeDetectionStrategy, Component, NgZone } from '@angular/core';
import { BaseSiteService, LanguageService, WindowRef } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { distinctUntilChanged, take, tap } from 'rxjs/operators';
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
  renderScreenSet = true;
  language$: Observable<string>;
  jsLoaded$: Observable<boolean>;

  public constructor(
    public component: CmsComponentData<GigyaRaasComponentData>,
    private baseSiteService: BaseSiteService,
    private languageService: LanguageService,
    private gigyaConfig: GigyaConfig,
    private winRef: WindowRef,
    private gigyaJSService: GigyaJsService,
    private zone: NgZone
  ) {
    this.jsLoaded$ = this.gigyaJSService.isLoaded();
    this.language$ = this.languageService.getActive().pipe(
      distinctUntilChanged(),
      tap(() => (this.renderScreenSet = true))
    );
  }

  /**
   * Display screen set in embed mode
   *
   * @param data - GigyaRaasComponentData
   */
  displayScreenSetInEmbedMode(
    data: GigyaRaasComponentData,
    lang: string
  ): void {
    if (this.renderScreenSet) {
      if (this.isLoginScreenSet(data)) {
        this.winRef.nativeWindow?.['gigya']?.accounts?.showScreenSet({
          screenSet: data.screenSet,
          startScreen: data.startScreen,
          containerID: data.containerID,
          lang,
          sessionExpiration: this.getSessionExpirationValue(),
        });
      } else {
        this.winRef.nativeWindow?.['gigya']?.accounts?.showScreenSet({
          screenSet: data.screenSet,
          startScreen: data.startScreen,
          containerID: data.containerID,
          lang,
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
  displayScreenSetInPopupMode(
    data: GigyaRaasComponentData,
    lang: string
  ): void {
    if (this.isLoginScreenSet(data)) {
      this.winRef.nativeWindow?.['gigya']?.accounts?.showScreenSet({
        screenSet: data.screenSet,
        startScreen: data.startScreen,
        lang,
        sessionExpiration: this.getSessionExpirationValue(),
      });
    } else {
      this.winRef.nativeWindow?.['gigya']?.accounts?.showScreenSet({
        screenSet: data.screenSet,
        startScreen: data.startScreen,
        lang,
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
    this.baseSiteService
      .getActive()
      .pipe(take(1))
      .subscribe((data) => (baseSite = data));

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
