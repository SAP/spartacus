import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SiteConnector } from '../site-context/connectors/site.connector';
import { TransferData } from '../util/transfer-data';
import { ExternalConfig } from './external-config';
import { ExternalConfigConverter } from './external-config-converter';

@Injectable({ providedIn: 'root' })
export class ExternalConfigService {
  protected readonly EXTERNAL_CONFIG_TRANSFER_ID = 'cx-external-config';

  constructor(
    @Inject(PLATFORM_ID) protected platform: any,
    @Inject(DOCUMENT) protected document: Document,
    protected siteConnector: SiteConnector,
    protected converter: ExternalConfigConverter
  ) {}

  /**
   * Initializes the Spartacus config asynchronously basing on the external config
   */
  getConfigChunks(): Promise<object[]> {
    return this.get()
      .toPromise()
      .then(externalConfig => {
        this.transfer(externalConfig);

        return [
          this.converter.toSiteContextConfig(externalConfig),
          this.converter.toI18nConfig(externalConfig),
        ];
      });
  }

  /**
   * Returns the external config
   */
  protected get(): Observable<ExternalConfig> {
    const rehydratedExternalConfig = this.rehydrate();

    return rehydratedExternalConfig
      ? of(rehydratedExternalConfig)
      : this.load();
  }

  /**
   * Loads the external config from backend
   */
  protected load(): Observable<ExternalConfig> {
    return this.siteConnector.getBaseSites().pipe(
      map(baseSites =>
        this.converter.fromOccBaseSites(
          baseSites,
          document.location.href // spike todo replace it with URL for SSR
        )
      )
    );
  }

  /**
   * Tries to rehydrate external config in the browser from SSR
   */
  protected rehydrate(): ExternalConfig {
    if (isPlatformBrowser(this.platform)) {
      return TransferData.rehydrate(this.EXTERNAL_CONFIG_TRANSFER_ID, document);
    }
  }

  /**
   * Transfers the given external config in SSR to the browser
   *
   * @param externalConfig
   */
  protected transfer(externalConfig: ExternalConfig) {
    if (isPlatformServer(this.platform) && externalConfig) {
      TransferData.transfer(
        this.EXTERNAL_CONFIG_TRANSFER_ID,
        externalConfig,
        document
      );
    }
  }
}
