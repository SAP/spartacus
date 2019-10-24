import { Injectable } from '@angular/core';
import { BaseSiteService, WindowRef } from '@spartacus/core';
import { filter } from 'rxjs/operators';
import { CdsConfig, ProfileTagConfig } from '../../config/config.model';

@Injectable({
  providedIn: 'root',
})
export class ScriptService {
  profiletagConfig: ProfileTagConfig
  constructor(
    private winRef: WindowRef,
    private config: CdsConfig,
    private baseSiteService: BaseSiteService
  ) {
    this.profiletagConfig = this.config.cds.profileTag;
    this.addTracker();
    this.addScript();
  }

  private addTracker(): void {
    this.baseSiteService
      .getActive()
      .pipe(filter(Boolean))
      .subscribe((site: string) => {
        const newConfig: ProfileTagConfig = { ...this.profiletagConfig };
        newConfig.siteId = site;
        this.track(newConfig);
      });
  }

  private addScript(): void {
    const doc: Document = this.winRef.document;
    const profileTagScript: HTMLScriptElement = doc.createElement('script');
    profileTagScript.type = 'text/javascript';
    profileTagScript.async = true;
    profileTagScript.src = this.profiletagConfig.javascriptUrl;

    doc.getElementsByTagName('head')[0].appendChild(profileTagScript);
  }

  private track(options: ProfileTagConfig) {
    const w: any = this.winRef.nativeWindow;
    w.Y_TRACKING = function () {
      (w.Y_TRACKING.q = w.Y_TRACKING.q || []).push(arguments);
    };

    w.Y_TRACKING(options);
    // w.Y_TRACKING = w.Y_TRACKING || {}
    // w.Y_TRACKING.config = options;
  }
}
