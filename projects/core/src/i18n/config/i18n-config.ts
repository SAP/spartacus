/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '../../config/config-tokens';
import { TranslationResources } from '../translation-resources';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class I18nConfig {
  i18n?: {
    /**
     * When there are missing translation resources for the active language, the fallback language will be used.
     */
    fallbackLang?: string | false;

    /**
     * Configuration for lazy loading of translation files.
     * For eager loading of translations please use config option `i18n.resources`
     */
    backend?: {
      /**
       * The path to JSON translations. It should contain placeholders:
       * - `{{lng}}` for language
       * - `{{ns}}` for the name of chunk.
       *
       * Example:
       * ```ts
       * { loadPath: 'assets/i18n-assets/{{lng}}/{{ns}}.json' }
       * ```
       *
       * **CAUTION: It's recommended to use the `loader` config property instead, for SSR performance reasons
       * (for more, see https://github.com/SAP/spartacus/issues/13460).**
       *
       *
       * If you really want to use this config, you'll need to additionally provide `I18nextHttpBackendService`
       * for `I18nextBackendService`:
       * ```ts
       * { provide: I18nextBackendService, useExisting: I18nextHttpBackendService }
       * ```
       */
      loadPath?: string;

      /**
       * Function that asynchronously loads the translation resources, based on the provided language and namespace.
       *
       * @example
       * ```ts
       * { loader: (lng: string, ns: string) => import(`./assets/i18n-assets/${lng}/${ns}.json`) }
       * ```
       */
      loader?: (
        language: string,
        namespace: string
      ) => Promise<TranslationResources>;
    };

    /**
     * Reference to translation resources that are eagerly bundled with JS app.
     * For lazy loading of translations please use config option `i18n.backend` instead.
     */
    resources?: TranslationResources;

    /**
     * Logs i18n events (like loading translation resources) to the console. Don't use in production!
     */
    debug?: boolean;

    /**
     * Mapping that assigns keys' namespaces to specific chunks. The main purpose of chunks is to lazy load them.
     */
    chunks?: {
      [chunk: string]: string[];
    };
  };
}

declare module '../../config/config-tokens' {
  interface Config extends I18nConfig {}
}
