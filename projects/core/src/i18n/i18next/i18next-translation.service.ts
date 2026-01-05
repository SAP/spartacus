/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Inject, inject, Injectable, isDevMode } from '@angular/core';
import { i18n, TOptions } from 'i18next';
import { Observable } from 'rxjs';
import { LoggerService } from '../../logger';
import { I18nConfig } from '../config/i18n-config';
import { TranslationChunkService } from '../translation-chunk.service';
import { TranslationService } from '../translation.service';
import { I18NEXT_INSTANCE } from './i18next-instance';

@Injectable({ providedIn: 'root' })
export class I18nextTranslationService implements TranslationService {
  private readonly NON_BREAKING_SPACE = String.fromCharCode(160);
  protected readonly NAMESPACE_SEPARATOR = ':';

  protected logger = inject(LoggerService);

  constructor(
    protected config: I18nConfig,
    protected translationChunk: TranslationChunkService,
    // Required param added in 3.0.x as a critical bug fix, not subject to the breaking changes policy
    @Inject(I18NEXT_INSTANCE) protected i18next: i18n
  ) {}

  translate(
    key: string | string[],
    options: any = {},
    whitespaceUntilLoaded: boolean = false
  ): Observable<string> {
    // If we've already loaded the chunk (or failed to load), we should immediately emit the value
    // (or the fallback value in case the key is missing).

    // Moreover, we SHOULD emit a value (or a fallback value) synchronously (not in a promise/setTimeout).
    // Otherwise, we the will trigger additional deferred change detection in a view that consumes the returned observable,
    // which together with `switchMap` operator may lead to an infinite loop.

    const translationKeys = Array.isArray(key) ? key : [key];

    const chunkNamesByKeys: Map<string, string> = new Map();
    const namespacedKeys: string[] = [];

    translationKeys.forEach((translationKey) => {
      const chunkName =
        this.translationChunk.getChunkNameForKey(translationKey);
      const namespacedKey = this.getNamespacedKey(translationKey, chunkName);
      namespacedKeys.push(namespacedKey);
      chunkNamesByKeys.set(translationKey, chunkName);
    });

    return new Observable<string>((subscriber) => {
      const translate = () => {
        if (!this.i18next.isInitialized) {
          return;
        }

        // make sure chunks are loaded
        let namespacesLoaded = false;

        // loadNamespaces has cache under the hood, so it won't load the same chunk twice
        // when namespaces are already loaded, the callback will be called synchronously:
        this.i18next.loadNamespaces(
          Array.from(chunkNamesByKeys.values()),
          () => {
            namespacesLoaded = true;
            if (this.i18next.exists(namespacedKeys, options)) {
              subscriber.next(
                this.i18next.t(namespacedKeys, options as TOptions)
              );
            } else {
              this.reportMissingKey(chunkNamesByKeys);
              subscriber.next(this.getFallbackValue(namespacedKeys));
            }
          }
        );

        // if namespaces are not loaded yet, we can emit a non-breaking space
        if (!namespacesLoaded && whitespaceUntilLoaded) {
          subscriber.next(this.NON_BREAKING_SPACE);
        }
      };

      translate();
      this.i18next.on('languageChanged', translate);
      return () => this.i18next.off('languageChanged', translate);
    });
  }

  loadChunks(chunkNames: string | string[]): Promise<any> {
    return this.i18next.loadNamespaces(chunkNames);
  }

  /**
   * Returns a fallback value in case when the all given keys are missing
   */
  protected getFallbackValue(keyOrKeys: string | string[]): string {
    const formattedKey = Array.isArray(keyOrKeys)
      ? keyOrKeys.join(', ')
      : keyOrKeys;

    return isDevMode() ? `[${formattedKey}]` : this.NON_BREAKING_SPACE;
  }

  private reportMissingKey(chunkNamesByKeys: Map<string, string>) {
    const keys = [...chunkNamesByKeys.keys()];
    if (isDevMode()) {
      this.logger.warn(
        `Translation keys missing [${keys.join(', ')}]. Attempted to load ${[
          ...chunkNamesByKeys,
        ]
          .map(([key, chunk]) => `'${key}' from chunk '${chunk}'`)
          .join(', ')}.`
      );
    }
  }

  private getNamespacedKey(key: string, chunk: string): string {
    return chunk + this.NAMESPACE_SEPARATOR + key;
  }
}
