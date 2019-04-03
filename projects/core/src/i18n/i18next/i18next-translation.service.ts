import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslationService } from '../translation.service';
import i18next from 'i18next';
import { I18nConfig } from '../config/i18n-config';
import { TranslationNamespaceService } from '../translation-namespace.service';

@Injectable()
export class I18nextTranslationService implements TranslationService {
  private readonly NON_BREAKING_SPACE = String.fromCharCode(160);
  protected readonly NAMESPACE_SEPARATOR = ':';

  constructor(
    protected config: I18nConfig,
    protected translationNamespace: TranslationNamespaceService
  ) {}

  translate(
    key: string,
    options: any = {},
    whitespaceUntilLoaded: boolean = false
  ): Observable<string> {
    // If we've already loaded the namespace (or failed to load), we should immediately emit the value
    // (or the fallback value in case the key is missing).

    // Moreover, we SHOULD emit a value (or a fallback value) synchronously (not in a promise/setTimeout).
    // Otherwise, we the will trigger additional deferred change detection in a view that consumes the returned observable,
    // which together with `switchMap` operator may lead to an infinite loop.

    const namespace = this.translationNamespace.getNamespace(key);
    const namespacedKey = this.getNamespacedKey(key, namespace);

    return new Observable<string>(subscriber => {
      const translate = () => {
        if (i18next.exists(namespacedKey, options)) {
          subscriber.next(i18next.t(namespacedKey, options));
        } else {
          if (whitespaceUntilLoaded) {
            subscriber.next(this.NON_BREAKING_SPACE);
          }
          i18next.loadNamespaces(namespace, () => {
            if (!i18next.exists(namespacedKey, options)) {
              this.reportMissingKey(namespacedKey);
              subscriber.next(this.getFallbackValue(namespacedKey));
            } else {
              subscriber.next(i18next.t(namespacedKey, options));
            }
          });
        }
      };

      translate();
      i18next.on('languageChanged', translate);
      return () => i18next.off('languageChanged', translate);
    });
  }

  loadNamespaces(namespaces: string | string[]): Promise<any> {
    return i18next.loadNamespaces(namespaces);
  }

  /**
   * Returns a fallback value in case when the given key is missing
   * @param key
   */
  protected getFallbackValue(key: string): string {
    return this.config.production ? this.NON_BREAKING_SPACE : `[${key}]`;
  }

  private reportMissingKey(key: string) {
    if (!this.config.production) {
      console.warn(`Translation key missing '${key}'`);
    }
  }

  private getNamespacedKey(key: string, namespace: string): string {
    return namespace + this.NAMESPACE_SEPARATOR + key;
  }
}
