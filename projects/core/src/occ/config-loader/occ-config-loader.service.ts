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
import { Config } from '../../config/config.module';
import { SERVER_REQUEST_URL } from '../../ssr/ssr.providers';
import { OccLoadedConfig } from './occ-loaded-config';
import { OccLoadedConfigConverter } from './occ-loaded-config.converter';
import { OccSitesConfigLoader } from './occ-sites-config-loader';

export const EXTERNAL_CONFIG_TRANSFER_ID: StateKey<string> = makeStateKey<
  string
>('cx-external-config');

@Injectable({ providedIn: 'root' })
export class OccConfigLoaderService {
  constructor(
    @Inject(PLATFORM_ID) protected platform: any,
    @Inject(DOCUMENT) protected document: any,
    @Inject(Config) protected config: any,
    protected siteConfigLoader: OccSitesConfigLoader,
    protected converter: OccLoadedConfigConverter,
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
          ...(this.shouldReturnI18nChunk()
            ? [this.converter.toI18nConfig(externalConfig)]
            : []),
        ];
      });
  }

  private shouldReturnI18nChunk(): boolean {
    const fallbackLangExists =
      typeof (
        this.config &&
        this.config.i18n &&
        this.config.i18n.fallbackLang
      ) !== 'undefined';
    if (fallbackLangExists && isDevMode()) {
      console.warn(
        `Loaded i18n fallback lang from OCC, but using the already provided static value of 'i18n.fallbackLang'`
      );
    }
    return !fallbackLangExists;
  }

  /**
   * Returns the external config
   */
  protected get(): Observable<OccLoadedConfig> {
    const rehydratedExternalConfig = this.rehydrate();

    return rehydratedExternalConfig
      ? of(rehydratedExternalConfig)
      : this.load();
  }

  /**
   * Loads the external config from backend
   */
  protected load(): Observable<OccLoadedConfig> {
    return this.siteConfigLoader
      .load()
      .pipe(
        map(baseSites =>
          this.converter.fromOccBaseSites(baseSites, this.currentUrl)
        )
      );
  }

  /**
   * Tries to rehydrate external config in the browser from SSR
   */
  protected rehydrate(): OccLoadedConfig {
    if (isPlatformBrowser(this.platform)) {
      return this.transferState.get(EXTERNAL_CONFIG_TRANSFER_ID, undefined);
    }
  }

  /**
   * Transfers the given external config in SSR to the browser
   *
   * @param externalConfig
   */
  protected transfer(externalConfig: OccLoadedConfig) {
    if (isPlatformServer(this.platform) && externalConfig) {
      this.transferState.set(EXTERNAL_CONFIG_TRANSFER_ID, externalConfig);
    }
  }
}
