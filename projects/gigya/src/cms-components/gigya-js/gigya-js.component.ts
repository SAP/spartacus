import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { WindowRef, BaseSiteService, LanguageService } from '@spartacus/core';
import { GigyaConfig } from '../../config/gigya-config';

declare var gigya: any;
declare var window: Window;

interface Window {
  gigyaSpaLogin?: any;
  GigyaRaasComponentReference?: any;
  gigya?: any;
  zone?: any;
  __gigyaConf?: any;
}

window.__gigyaConf = { include: 'id_token' };

window.gigyaSpaLogin = function (response) {
  window.GigyaRaasComponentReference.zone.run(() =>
    window.GigyaRaasComponentReference.component.onLoginEventHandler(response)
  );
};

@Component({
  selector: 'cx-gigya-js',
  templateUrl: './gigya-js.component.html',
})
export class GigyaJsComponent implements OnInit {
  registerEventListener?: boolean;

  constructor(
    private winRef: WindowRef,
    private cdRef: ChangeDetectorRef,
    private gigyaConfig: GigyaConfig,
    private baseSiteService: BaseSiteService,
    private languageService: LanguageService
  ) {
    this.registerEventListener = true;
  }

  ngOnInit() {
    this.loadGigyaJavascript();
  }

  /**
   * Method which loads the CDC Script
   */
  loadGigyaJavascript(): void {
    this.baseSiteService.getActive().subscribe((baseSite) => {
      let javascriptUrl = this.getJavascriptUrlForCurrentSite(baseSite);
      this.languageService.getActive().subscribe((language) => {
        javascriptUrl = javascriptUrl + '&lang=' + language;
        const gigyaJsScript = this.winRef.document.createElement('script');
        gigyaJsScript.type = 'text/javascript';
        gigyaJsScript.defer = true;
        gigyaJsScript.src = javascriptUrl;

        const idScript = this.winRef.document.createElement('div');

        this.winRef.document
          .getElementsByTagName('head')[0]
          .appendChild(gigyaJsScript);

        this.winRef.document
          .getElementsByTagName('head')[0]
          .appendChild(idScript);
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
    if (this.registerEventListener && window.gigya !== undefined) {
      gigya.accounts.addEventHandlers({
        onLogin: window.gigyaSpaLogin,
      });
      this.registerEventListener = false;
      this.cdRef.detectChanges();
    }
  }
}
