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
import { filter, map, take, tap } from 'rxjs/operators';
import { Config } from '../../config/config-tokens';
import { deepMerge } from '../../config/utils/deep-merge';
import { I18nConfig } from '../../i18n/config/i18n-config';
import { BaseSite } from '../../model/misc.model';
import { SiteContextConfig } from '../../site-context/config/site-context-config';
import { BaseSiteService } from '../../site-context/facade/base-site.service';
import { ConverterService } from '../../util/converter.service';
import { SERVER_REQUEST_URL } from '../../util/ssr.tokens';
import {
  I18N_CONFIG_CONVERTER,
  OCC_LOADED_CONFIG_CONVERTER,
  SITE_CONTEXT_CONFIG_CONVERTER,
} from './converters';
import { OccLoadedConfigConverter } from './converters/occ-loaded-config-converter';
import { OccLoadedConfig } from './occ-loaded-config';
import { OccSitesConfigLoader } from './occ-sites-config-loader';

export const EXTERNAL_CONFIG_TRANSFER_ID: StateKey<string> = makeStateKey<
  string
>('cx-external-config');

@Injectable({ providedIn: 'root' })
export class OccConfigLoaderService {
  // TODO: remove sitesConfigLoader and converter in 4.0
  // baseSiteService, converterService and javaRegExpConverter are not
  // optional in 4.0
  constructor(
    @Inject(PLATFORM_ID) protected platform: any,
    @Inject(DOCUMENT) protected document: any,
    @Inject(Config) protected config: any,
    protected sitesConfigLoader: OccSitesConfigLoader,
    protected converter: OccLoadedConfigConverter,
    @Optional() protected transferState: TransferState,

    @Optional()
    @Inject(SERVER_REQUEST_URL)
    protected serverRequestUrl?: string,
    protected baseSiteService?: BaseSiteService,
    protected converterService?: ConverterService
  ) {}

  private get currentUrl(): string | undefined {
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
  loadConfig(): Promise<I18nConfig | SiteContextConfig> {
    return this.get()
      .pipe(
        tap((externalConfig) => this.transfer(externalConfig)),
        map((externalConfig) =>
          deepMerge({}, ...this.getConfigChunks(externalConfig))
        ),
        take(1)
      )
      .toPromise();
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
    if (this.baseSiteService && this.converterService) {
      return this.baseSiteService.getAll().pipe(
        map((baseSites) =>
          baseSites?.find((site) => this.isCurrentBaseSite(site))
        ),
        filter((baseSite: any) => {
          if (!baseSite) {
            throw new Error(
              `Error: Cannot get base site config! Current url (${this.currentUrl}) doesn't match any of url patterns of any base sites.`
            );
          }
          return Boolean(baseSite);
        }),
        this.converterService.pipeable(OCC_LOADED_CONFIG_CONVERTER)
      );
    } else {
      return this.sitesConfigLoader
        .load()
        .pipe(
          map((baseSites) =>
            this.converter.fromOccBaseSites(baseSites, this.currentUrl || '')
          )
        );
    }
  }

  /**
   * Tries to rehydrate external config in the browser from SSR
   */
  protected rehydrate(): OccLoadedConfig | undefined {
    if (this.transferState && isPlatformBrowser(this.platform)) {
      return this.transferState.get(EXTERNAL_CONFIG_TRANSFER_ID, undefined);
    }
  }

  /**
   * Transfers the given external config in SSR to the browser
   *
   * @param externalConfig
   */
  protected transfer(externalConfig: OccLoadedConfig) {
    if (
      this.transferState &&
      isPlatformServer(this.platform) &&
      externalConfig
    ) {
      this.transferState.set(EXTERNAL_CONFIG_TRANSFER_ID, externalConfig);
    }
  }

  protected getConfigChunks(
    externalConfig: OccLoadedConfig
  ): (I18nConfig | SiteContextConfig)[] {
    const chunks: any[] = [
      this.converterService
        ? this.converterService.convert(
            externalConfig,
            SITE_CONTEXT_CONFIG_CONVERTER
          )
        : this.converter.toSiteContextConfig(externalConfig),
    ];

    if (this.shouldReturnI18nChunk()) {
      chunks.push(
        this.converterService
          ? this.converterService.convert(externalConfig, I18N_CONFIG_CONVERTER)
          : this.converter.toI18nConfig(externalConfig)
      );
    }

    return chunks;
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
        `There is an already provided static config for 'i18n.fallbackLang', so the value from OCC loaded config is ignored.`
      );
    }
    return !fallbackLangExists;
  }

  private isCurrentBaseSite(site: BaseSite): boolean {
    const index = (site.urlPatterns || []).findIndex((jsRegexp: any) => {
      if (jsRegexp) {
        return jsRegexp.test(this.currentUrl || '');
      }
    });

    return index !== -1;
  }
}
