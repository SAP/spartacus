import { Injectable } from '@angular/core';
import {
  BaseSiteService,
  ExternalJsFileLoader,
  LanguageService,
} from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { GigyaConfig } from '../../config/gigya-config';

declare var window: Window;

interface Window {
  gigya?: any;
  __gigyaConf?: any;
}

window.__gigyaConf = { include: 'id_token' };

@Injectable({
  providedIn: 'root',
})
export class GigyaJsService {
  loaded$ = new BehaviorSubject<boolean>(false);
  eventListenersAdded = false;

  constructor(
    // private winRef: WindowRef,
    private gigyaConfig: GigyaConfig,
    private baseSiteService: BaseSiteService,
    private languageService: LanguageService,
    private externalJsFileLoader: ExternalJsFileLoader
  ) {}

  initialize(): void {
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
        this.externalJsFileLoader.load(javascriptUrl, undefined, () => {
          this.loaded$.next(true);
        });
      });
    });
  }

  protected getJavascriptUrlForCurrentSite(baseSite: string): string {
    const filteredConfigs: any = this.gigyaConfig.gigya.filter(
      (conf) => conf.baseSite === baseSite
    );
    if (filteredConfigs && filteredConfigs.length > 0) {
      return filteredConfigs[0].javascriptUrl;
    }
    return '';
  }
}
