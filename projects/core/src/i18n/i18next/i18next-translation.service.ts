import { Inject, Injectable, isDevMode } from '@angular/core';
import { i18n } from 'i18next';
import { Observable } from 'rxjs';
import { I18nConfig } from '../config/i18n-config';
import { TranslationChunkService } from '../translation-chunk.service';
import { TranslationService } from '../translation.service';
import { I18NEXT_INSTANCE } from './i18next-instance';

@Injectable({ providedIn: 'root' })
export class I18nextTranslationService implements TranslationService {
  private readonly NON_BREAKING_SPACE = String.fromCharCode(160);
  protected readonly NAMESPACE_SEPARATOR = ':';

  constructor(
    protected config: I18nConfig,
    protected translationChunk: TranslationChunkService,
    // Required param added in 3.0.x as a critical bug fix, not subject to the breaking changes policy
    @Inject(I18NEXT_INSTANCE) protected i18next: i18n
  ) {}

  translate(
    key: string,
    options: any = {},
    whitespaceUntilLoaded: boolean = false
  ): Observable<string> {
    // If we've already loaded the chunk (or failed to load), we should immediately emit the value
    // (or the fallback value in case the key is missing).

    // Moreover, we SHOULD emit a value (or a fallback value) synchronously (not in a promise/setTimeout).
    // Otherwise, we the will trigger additional deferred change detection in a view that consumes the returned observable,
    // which together with `switchMap` operator may lead to an infinite loop.

    const chunkName = this.translationChunk.getChunkNameForKey(key);
    const namespacedKey = this.getNamespacedKey(key, chunkName);

    return new Observable<string>((subscriber) => {
      const translate = () => {
        if (!this.i18next.isInitialized) {
          return;
        }
        if (this.i18next.exists(namespacedKey, options)) {
          subscriber.next(this.i18next.t(namespacedKey, options));
        } else {
          if (whitespaceUntilLoaded) {
            subscriber.next(this.NON_BREAKING_SPACE);
          }
          this.i18next.loadNamespaces(chunkName, () => {
            if (!this.i18next.exists(namespacedKey, options)) {
              this.reportMissingKey(key, chunkName);
              subscriber.next(this.getFallbackValue(namespacedKey));
            } else {
              subscriber.next(this.i18next.t(namespacedKey, options));
            }
          });
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
   * Returns a fallback value in case when the given key is missing
   * @param key
   */
  protected getFallbackValue(key: string): string {
    return isDevMode() ? `[${key}]` : this.NON_BREAKING_SPACE;
  }

  private reportMissingKey(key: string, chunkName: string) {
    if (isDevMode()) {
      console.warn(
        `Translation key missing '${key}' in the chunk '${chunkName}'`
      );
    }
  }

  private getNamespacedKey(key: string, chunk: string): string {
    return chunk + this.NAMESPACE_SEPARATOR + key;
  }
}
