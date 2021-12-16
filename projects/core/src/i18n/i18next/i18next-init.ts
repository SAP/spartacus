import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { i18n, InitOptions } from 'i18next';
import i18nextHttpBackend, {
  BackendOptions,
  RequestCallback,
} from 'i18next-http-backend';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { LanguageService } from '../../site-context/facade/language.service';
import { TranslationResources } from '../translation-resources';

export function i18nextInit(
  i18next: i18n,
  configInit: ConfigInitializerService,
  languageService: LanguageService,
  httpClient: HttpClient,
  serverRequestOrigin: string,
  siteContextI18nextSynchronizer: SiteContextI18nextSynchronizer
): () => Promise<any> {
  return () =>
    configInit
      .getStable('i18n')
      .pipe(
        tap((config) => {
          let i18nextConfig: InitOptions = {
            ns: [], // don't preload any namespaces
            fallbackLng: config.i18n?.fallbackLang,
            debug: config.i18n?.debug,
            interpolation: {
              escapeValue: false,
            },
          };

          if (config.i18n?.backend?.loadPath) {
            i18next = i18next.use(i18nextHttpBackend);
            const loadPath = getLoadPath(
              config.i18n.backend.loadPath,
              serverRequestOrigin
            );
            const backend: BackendOptions = {
              loadPath,
              request: i18nextGetHttpClient(httpClient),
            };
            i18nextConfig = { ...i18nextConfig, backend };
          }

          return i18next.init(i18nextConfig, () => {
            // Don't use i18next's 'resources' config key for adding static translations,
            // because it will disable loading chunks from backend. We add resources here, in the init's callback.
            i18nextAddTranslations(i18next, config.i18n?.resources);
            siteContextI18nextSynchronizer.init(i18next, languageService);
          });
        })
      )
      .toPromise();
}

export function i18nextAddTranslations(
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

@Injectable({ providedIn: 'root' })
export class SiteContextI18nextSynchronizer implements OnDestroy {
  sub: Subscription;

  init(i18next: i18n, language: LanguageService) {
    // always update language of i18next on site context (language) change
    this.sub =
      this.sub ??
      language.getActive().subscribe((lang) => i18next.changeLanguage(lang));
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}

/**
 * Returns a function appropriate for i18next to make http calls for JSON files.
 * See docs for `i18next-http-backend`: https://github.com/i18next/i18next-http-backend#backend-options
 *
 * It uses Angular HttpClient under the hood, so it works in SSR.
 * @param httpClient Angular http client
 */
export function i18nextGetHttpClient(
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

/**
 * Resolves the relative path to the absolute one in SSR, using the server request's origin.
 * It's needed, because Angular Universal doesn't support relative URLs in HttpClient. See Angular issues:
 * - https://github.com/angular/angular/issues/19224
 * - https://github.com/angular/universal/issues/858
 */
export function getLoadPath(path: string, serverRequestOrigin: string): string {
  if (serverRequestOrigin && !path.match(/^http(s)?:\/\//)) {
    if (path.startsWith('/')) {
      path = path.slice(1);
    }
    if (path.startsWith('./')) {
      path = path.slice(2);
    }
    const result = `${serverRequestOrigin}/${path}`;
    return result;
  }
  return path;
}
