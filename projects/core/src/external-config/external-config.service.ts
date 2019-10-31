import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  Inject,
  Injectable,
  isDevMode,
  Optional,
  PLATFORM_ID,
} from '@angular/core';
import {
  makeStateKey,
  StateKey,
  TransferState,
} from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SiteConnector } from '../site-context/connectors/site.connector';
import { SERVER_REQUEST_URL } from '../ssr/ssr.providers';
import { ExternalConfig } from './external-config';
import { ExternalConfigConverter } from './external-config-converter';

export const EXTERNAL_CONFIG_TRANSFER_ID: StateKey<string> = makeStateKey<
  string
>('cx-external-config');

@Injectable({ providedIn: 'root' })
export class ExternalConfigService {
  constructor(
    @Inject(PLATFORM_ID) protected platform: any,
    @Inject(DOCUMENT) protected document: any,
    protected siteConnector: SiteConnector,
    protected converter: ExternalConfigConverter,
    protected transferState: TransferState,

    @Optional()
    @Inject(SERVER_REQUEST_URL)
    protected serverRequestUrl?: string
  ) {}

  private get currentUrl(): string {
    if (isPlatformBrowser(this.platform)) {
      return this.document.location.href;
    }
    if (this.serverRequestUrl) {
      return this.serverRequestUrl;
    }
    if (isDevMode()) {
      console.error(
        `Please provide token 'SERVER_REQUEST_URL' with the requested URL for SSR`
      );
    }
  }

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
    return this.siteConnector
      .getBaseSites()
      .pipe(
        map(baseSites =>
          this.converter.fromOccBaseSites(baseSites, this.currentUrl)
        )
      );
  }

  /**
   * Tries to rehydrate external config in the browser from SSR
   */
  protected rehydrate(): ExternalConfig {
    if (isPlatformBrowser(this.platform)) {
      return this.transferState.get(EXTERNAL_CONFIG_TRANSFER_ID, undefined);
    }
  }

  /**
   * Transfers the given external config in SSR to the browser
   *
   * @param externalConfig
   */
  protected transfer(externalConfig: ExternalConfig) {
    if (isPlatformServer(this.platform) && externalConfig) {
      this.transferState.set(EXTERNAL_CONFIG_TRANSFER_ID, externalConfig);
    }
  }
}
