/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';

export abstract class TranslationService {
  /**
   * Translates given key with options.
   * It accepts also an array of keys. It allows for providing multiple variations of a key or multiple keys that may be used interchangeably as fallback.
   * In case the primary key is not available, the fallback keys will be attempted in the order they are provided.
   * The first key that can be resolved will be used for the translation.
   *
   * Note: When using lazy-loading of translation chunks, it will first load all the chunks for the corresponding keys before attempting to resolve the value.
   * This ensures that all the necessary data is available before the translation is performed.
   *
   * @param key translation key or array of keys
   * @param options values for interpolation in translation
   * @param whitespaceUntilLoaded if true, immediately emits a non-breaking space
   */
  translate: (
    key: string | string[],
    options?: any,
    whitespaceUntilLoaded?: boolean
  ) => Observable<string>;

  /**
   * Loads chunks with translations
   *
   * @param chunkNames array of chunk names to be loaded
   */
  loadChunks: (chunkNames: string | string[]) => Promise<any>;
}
