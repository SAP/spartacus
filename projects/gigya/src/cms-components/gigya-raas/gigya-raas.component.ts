import {
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GigyaRaasComponent implements OnInit {
  protected renderScreenSet = true;
  language$: Observable<string>;
  jsError$: Observable<boolean>;
  jsLoaded$: Observable<boolean>;

  public constructor(
    public component: CmsComponentData<GigyaRaasComponentData>,
    private baseSiteService: BaseSiteService,
    private languageService: LanguageService,
    private gigyaConfig: GigyaConfig,
    private winRef: WindowRef,
    private gigyaJSService: GigyaJsService,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.jsLoaded$ = this.gigyaJSService.didLoad();
    this.jsError$ = this.gigyaJSService.didScriptFailToLoad();
    this.language$ = this.languageService.getActive().pipe(
      distinctUntilChanged(),
      // On language change we want to rerender gigya screen with proper translations
      tap(() => (this.renderScreenSet = true))
    );
  }

  /**
   * Display screen set in embed mode
   *
   * @param data - GigyaRaasComponentData
   * @param lang - language
   */
  displayScreenSet(data: GigyaRaasComponentData, lang: string): void {
    if (this.renderScreenSet) {
      this.showScreenSet(data, lang);
    }
    this.renderScreenSet = false;
  }

  /**
   * Show screen set
   *
   * @param data - GigyaRaasComponentData
   * @param lang - language
   */
  showScreenSet(data: GigyaRaasComponentData, lang: string) {
    this.winRef.nativeWindow?.['gigya']?.accounts?.showScreenSet({
      screenSet: data.screenSet,
      startScreen: data.startScreen,
      lang,
      ...(this.displayInEmbedMode(data)
        ? { containerID: data.containerID }
        : {}),
      ...(this.isLoginScreenSet(data)
        ? { sessionExpiration: this.getSessionExpirationValue() }
        : {
            onAfterSubmit: (...params) => {
              this.zone.run(() =>
                this.gigyaJSService.onProfileUpdateEventHandler(...params)
              );
            },
          }),
    });
  }

  protected isLoginScreenSet(data: GigyaRaasComponentData): boolean {
    const profileEditScreen: boolean =
      data.profileEdit === 'true' ? true : false;

    return !profileEditScreen;
  }

  protected getSessionExpirationValue(): number {
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
   * Check if the component should be displayed in embed mode
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
