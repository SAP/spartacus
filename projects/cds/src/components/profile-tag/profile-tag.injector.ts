import { Injectable } from '@angular/core';
import { BaseSiteService, WindowRef } from '@spartacus/core';
import { filter } from 'rxjs/operators';
import { CdsConfig } from '../../config/config.model';
import { CdsTrackerOptions } from './profile-tag.model';

@Injectable({
  providedIn: 'root',
})
export class ScriptService {
  constructor(
    private winRef: WindowRef,
    private config: CdsConfig,
    private baseSiteService: BaseSiteService
  ) {
    this.addTracker();
    this.addScript();
  }

  private addTracker(): void {
    const config = this.config.cds;
    this.baseSiteService
      .getActive()
      .pipe(filter(Boolean))
      .subscribe(site => {
        const args: CdsTrackerOptions = {
          siteId: site,
          allowInsecureCookies: config.allowInsecureCookies,
          tenant: config.tenantId,
          clientId: config.clientId,
          configUrl: config.profileTagTrackUrl,
        };
        this.track(args);
      });
  }

  private addScript(): void {
    const doc: Document = this.winRef.document;
    const profileTagScript: HTMLScriptElement = doc.createElement('script');
    profileTagScript.type = 'text/javascript';
    profileTagScript.async = true;
    profileTagScript.src = this.config.cds.profileTagScriptUrl;

    doc.getElementsByTagName('head')[0].appendChild(profileTagScript);
  }

  private track(options: CdsTrackerOptions) {
    const w: any = this.winRef.nativeWindow;

    w.Y_TRACKING = function() {
      (w.Y_TRACKING.q = w.Y_TRACKING.q || []).push(arguments);
    };

    w.Y_TRACKING(options);
  }
}
