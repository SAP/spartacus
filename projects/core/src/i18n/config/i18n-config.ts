/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '../../config/config-tokens';
import {
  TranslationResourceKey,
  TranslationResources,
} from '../translation-resources';

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
       * The path for loading JSON translations via HTTP requests.
       * The path should contain the following placeholders:
       * - `{{lng}}` for language
       * - `{{ns}}` for the name of chunk.
       *
       * Example:
       * ```ts
       * loadPath: 'assets/i18n-assets/{{lng}}/{{ns}}.json'
       * ```
       *
       * **NOTE**:
       * This option is NOT recommended for loading translations from local assets.
       * For this case, use the config option `i18n.backend.loader` instead,
       * which is more performant (especially in SSR).
       *
       * This option is recommended ONLY for loading translations resources
       * from an external server.
       */

      loadPath?: string;

      /**
       * Function that load translation resources asynchronously.
       *
       * Returns a Promise with translation resources for the given language and the chunk name.
       *
       * This function can use e.g. a dynamic import() to code-split and lazy load
       * the translation resources.
       *
       * @param lng language
       * @param ns  translation's chunk name (namespace)
       * @example
       * ```ts
       * loader: (language, chunkName) => import(`../../assets/i18n-assets/${language}/${chunkName}.json`)
       * ```
       */
      loader?: (
        language: string,
        chunkName: string
      ) => Promise<TranslationResourceKey>;
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
