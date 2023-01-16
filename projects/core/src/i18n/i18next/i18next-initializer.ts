/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Inject, Injectable, OnDestroy } from '@angular/core';
import type { i18n, InitOptions } from 'i18next';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../site-context/facade/language.service';
import { I18nConfig } from '../config/i18n-config';
import { TranslationResources } from '../translation-resources';
import { I18nextBackendInitializer } from './i18next-backend-initializer';
import { SiteContextI18nextSynchronizer } from './i18next-init';
import { I18NEXT_INSTANCE } from './i18next-instance';

/**
 * Initializes the i18next instance.
 */
@Injectable({ providedIn: 'root' })
export class I18nextInitializer implements OnDestroy {
  constructor(
    @Inject(I18NEXT_INSTANCE) protected i18next: i18n,
    protected config: I18nConfig,
    protected i18nextBackendInitializer: I18nextBackendInitializer,
    protected languageService: LanguageService,
    protected siteContextI18nextSynchronizer: SiteContextI18nextSynchronizer
  ) {}

  /**
   * Initializes the i18next instance.
   *
   * @returns Promise that resolves when the i18next instance is initialized.
   */
  initialize(): Promise<any> {
    const i18nextConfig = this.getI18nextConfig();
    return this.i18next.init(i18nextConfig, () => {
      // Don't use i18next's 'resources' config key for adding static translations,
      // because it will disable loading chunks from backend. We add resources here, in the init's callback.
      this.i18nextAddTranslations(this.i18next, this.config.i18n?.resources);
      this.synchronizeLanguage();
    });
  }

  /**
   * Returns the configuration for initializing an i18next instance.
   */
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
      i18nextConfig = {
        ...i18nextConfig,
        ...this.i18nextBackendInitializer.initialize(),
      };
    }

    return i18nextConfig;
  }

  /**
   * Populates the i18next instance with the given static translations.
   *
   * @param i18next i18next instance
   * @param resources translation resources
   */
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

  protected subscription: Subscription;

  /**
   * Ensures that when the site context language changes,
   * the i18next instance is updated with the new language.
   */
  protected synchronizeLanguage() {
    this.subscription =
      this.subscription ??
      this.languageService
        .getActive()
        .subscribe((lang) => this.i18next.changeLanguage(lang));
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
