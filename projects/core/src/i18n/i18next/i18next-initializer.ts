/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import type { i18n, InitOptions } from 'i18next';
import i18nextHttpBackend, {
  BackendOptions,
  RequestCallback,
} from 'i18next-http-backend';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../site-context/facade/language.service';
import { WindowRef } from '../../window/window-ref';
import { I18nConfig } from '../config/i18n-config';
import { TranslationResources } from '../translation-resources';
import { SiteContextI18nextSynchronizer } from './i18next-init';
import { I18NEXT_INSTANCE } from './i18next-instance';

@Injectable({ providedIn: 'root' })
export class I18nextInitializer implements OnDestroy {
  constructor(
    @Inject(I18NEXT_INSTANCE) protected i18next: i18n,
    protected config: I18nConfig,
    protected languageService: LanguageService,
    protected httpClient: HttpClient,
    protected windowRef: WindowRef,
    protected siteContextI18nextSynchronizer: SiteContextI18nextSynchronizer
  ) {}

  initialize(): Promise<any> {
    const i18nextConfig = this.getI18nextConfig();
    return this.i18next.init(i18nextConfig, () => {
      // Don't use i18next's 'resources' config key for adding static translations,
      // because it will disable loading chunks from backend. We add resources here, in the init's callback.
      this.i18nextAddTranslations(this.i18next, this.config.i18n?.resources);
      this.siteContextI18nextSynchronizer.init(
        this.i18next,
        this.languageService
      );
    });
  }

  protected getI18nextConfig(): InitOptions {
    let i18nextConfig: InitOptions = {
      ns: [], // don't preload any namespaces
      fallbackLng: this.config.i18n?.fallbackLang,
      debug: this.config.i18n?.debug,
      interpolation: {
        escapeValue: false,
        skipOnVariables: false,
      },
    };

    if (this.config.i18n?.backend?.loadPath) {
      this.i18next = this.i18next.use(i18nextHttpBackend);
      const backend = this.getI18nextBackendConfig();
      i18nextConfig = { ...i18nextConfig, backend };
    }

    return i18nextConfig;
  }

  protected getI18nextBackendConfig(): BackendOptions {
    const loadPath = this.getLoadPath(
      // SPIKE TODO: improve typing:
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.config.i18n!.backend!.loadPath!
    );
    const backend: BackendOptions = {
      loadPath,

      // SPIKE TODO: don't pass httpClient as param, use it directly
      request: this.i18nextGetHttpClient(this.httpClient),

      // Disable the periodical reloading. Otherwise SSR would not finish due to the pending task `setInterval()`
      // See source code of `i18next-http-backend` : https://github.com/i18next/i18next-http-backend/blob/00b7e8f67abf8372af17529b51190a7e8b17e3d8/lib/index.js#L40-L41
      reloadInterval: false,
    };
    return backend;
  }

  /**
   * Resolves the relative path to the absolute one in SSR, using the server request's origin.
   * It's needed, because Angular Universal doesn't support relative URLs in HttpClient. See Angular issues:
   * - https://github.com/angular/angular/issues/19224
   * - https://github.com/angular/universal/issues/858
   */
  protected getLoadPath(path: string): string {
    // SPIKE NOTE: changed serverRequestOrigin to !this.windowRef.isBrowser()
    if (!this.windowRef.isBrowser() && !path.match(/^http(s)?:\/\//)) {
      if (path.startsWith('/')) {
        path = path.slice(1);
      }
      if (path.startsWith('./')) {
        path = path.slice(2);
      }
      const serverRequestOrigin = this.windowRef.location.origin;
      const result = `${serverRequestOrigin}/${path}`;
      return result;
    }
    return path;
  }

  // SPIKE TODO: RENAME drop i18next prefix
  /**
   * Returns a function appropriate for i18next to make http calls for JSON files.
   * See docs for `i18next-http-backend`: https://github.com/i18next/i18next-http-backend#backend-options
   *
   * It uses Angular HttpClient under the hood, so it works in SSR.
   * @param httpClient Angular http client
   */
  protected i18nextGetHttpClient(
    httpClient: HttpClient
  ): (
    options: BackendOptions,
    url: string,
    payload: object | string,
    callback: RequestCallback
  ) => void {
    return (
      _options: BackendOptions,
      url: string,
      _payload: object | string,
      callback: RequestCallback
    ) => {
      httpClient.get(url, { responseType: 'text' }).subscribe(
        (data) => callback(null, { status: 200, data }),
        (error) =>
          callback(error, {
            // a workaround for https://github.com/i18next/i18next-http-backend/issues/82
            data: null as any,
            status: error.status,
          })
      );
    };
  }

  protected i18nextAddTranslations(
    i18next: i18n,
    resources: TranslationResources = {}
  ): void {
    Object.keys(resources).forEach((lang) => {
      Object.keys(resources[lang]).forEach((chunkName) => {
        i18next.addResourceBundle(
          lang,
          chunkName,
          resources[lang][chunkName],
          true,
          true
        );
      });
    });
  }

  protected siteContextSyncSubscription: Subscription;

  // SPIKE TODO: start using it
  protected syncWithSiteContext(i18next: i18n) {
    // always update language of i18next on site context (language) change
    this.siteContextSyncSubscription =
      this.siteContextSyncSubscription ??
      this.languageService.getActive().subscribe((lang) => i18next.changeLanguage(lang));
  }

  ngOnDestroy() {
    this.siteContextSyncSubscription?.unsubscribe();
  }
}
