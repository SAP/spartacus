import { Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import { i18n as I18Next, InitOptions } from 'i18next';
import i18nextXhrBackend from 'i18next-xhr-backend';
import { Subscription } from 'rxjs';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { LanguageService } from '../../site-context/facade/language.service';
import { SERVER_REQUEST_ORIGIN } from '../../ssr';
import { I18nConfig } from '../config/i18n-config';
import { TranslationResources } from '../translation-resources';
import { I18nextHttpClient, I18NEXT_HTTP_CLIENT } from './i18next-http-client';
import { I18NEXT_INSTANCE } from './i18next-instance';

/**
 * Initializes the instance of i18next
 */
@Injectable({ providedIn: 'root' })
export class I18nextInitializer implements OnDestroy {
  constructor(
    @Inject(I18NEXT_INSTANCE) protected i18next: I18Next,
    @Inject(I18NEXT_HTTP_CLIENT) protected i18nextHttpClient: I18nextHttpClient,
    protected configInitializer: ConfigInitializerService,
    protected languageService: LanguageService,
    @Optional()
    @Inject(SERVER_REQUEST_ORIGIN)
    protected serverRequestOrigin: string
  ) {}

  private initCalled = false;
  private sub: Subscription;

  /**
   * Initializes the instance of i18next
   */
  async init(): Promise<any> {
    if (this.initCalled) {
      this.initCalled = true;
      return Promise.resolve();
    }

    const config = await this.configInitializer.getStableConfig('i18n');

    if (config.i18n.backend) {
      this.i18next.use(i18nextXhrBackend);
    }

    const initOptions = this.getInitOptions(config);
    return this.i18next.init(initOptions, () => {
      // Don't use i18next's 'resources' config key for adding static translations,
      // because it will disable loading chunks from backend. We add resources here, in the init's callback.
      this.addTranslations(config.i18n.resources);
      this.syncWithSiteContext();
    });
  }

  /**
   * Turns `I18nConfig` of Spartacus into the init options of i18next.
   */
  private getInitOptions(config: I18nConfig): InitOptions {
    let i18nextConfig: InitOptions = {
      ns: [], // don't preload any namespaces
      fallbackLng: config.i18n.fallbackLang,
      debug: config.i18n.debug,
      interpolation: {
        escapeValue: false,
      },
    };
    if (config.i18n.backend) {
      const loadPath = this.getLoadPath(
        config.i18n.backend.loadPath,
        this.serverRequestOrigin
      );
      const backend = {
        loadPath,
        ajax: this.i18nextHttpClient,
      };
      i18nextConfig = { ...i18nextConfig, backend };
    }
    return i18nextConfig;
  }

  /**
   * Registers provided translation resources in the i18next instance.
   */
  private addTranslations(resources: TranslationResources = {}) {
    Object.keys(resources).forEach((lang) => {
      Object.keys(resources[lang]).forEach((chunkName) => {
        this.i18next.addResourceBundle(
          lang,
          chunkName,
          resources[lang][chunkName],
          true,
          true
        );
      });
    });
  }

  /**
   * Synchronizes the language service with the i18next instance.
   */
  private syncWithSiteContext(): void {
    this.sub = this.languageService
      .getActive()
      .subscribe((lang) => this.i18next.changeLanguage(lang));
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  /**
   * Resolves the relative path to the absolute one in SSR, using the server request's origin.
   * It's needed, because Angular Universal doesn't support relative URLs in HttpClient. See Angular issues:
   * - https://github.com/angular/angular/issues/19224
   * - https://github.com/angular/universal/issues/858
   */
  private getLoadPath(path: string, serverRequestOrigin: string): string {
    if (!path) {
      return undefined;
    }
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
}
