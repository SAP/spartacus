import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerConfig } from '../config/server-config/server-config';
import { I18NextService } from './i18next/i18next.service';

@Injectable()
export class TranslationService {
  private readonly NON_BREAKING_SPACE = String.fromCharCode(160);

  constructor(
    private i18NextService: I18NextService,
    private config: ServerConfig
  ) {}

  /**
   * Checks if given key with options exists
   *
   * @param key
   * @param options
   */
  exists(key: string, options: any = {}): boolean {
    return this.i18NextService.exists(key, options);
  }

  /**
   * Translates given key with options.
   * If key is missing, it tries to load the namespace and emits a value when namespace is loaded.
   * If key is missing after loaded namespace, a fallback value is emitted.
   *
   * @param key translation key with preceding namespace
   * @param options values for interpolation in translation
   * @param whitespaceUntilLoaded if true, immediately emits a non-breaking space
   */
  translate(
    key: string,
    options: any = {},
    whitespaceUntilLoaded: boolean = false
  ): Observable<string> {
    return new Observable<string>(subscriber => {
      if (this.i18NextService.exists(key, options)) {
        subscriber.next(this.i18NextService.t(key, options));
        subscriber.complete();
      } else {
        if (whitespaceUntilLoaded) {
          subscriber.next(this.NON_BREAKING_SPACE);
        }
        this.loadKeyNamespace(key, () => {
          if (!this.i18NextService.exists(key, options)) {
            this.reportMissingKey(key);
            subscriber.next(this.getFallbackValue(key));
            subscriber.complete();
          } else {
            subscriber.next(this.i18NextService.t(key, options));
            subscriber.complete();
          }
        });
      }
    });
  }

  /**
   * Loads namespaces
   *
   * @param namespaces array of namespaces to be loaded
   * @param callback will be called after all namespaces are loaded
   */
  loadNamespaces(
    namespaces: string | string[],
    callback?: Function
  ): Promise<any> {
    return this.i18NextService.loadNamespaces(namespaces, callback);
  }

  /**
   * Returns a fallback value in case when the key is missing
   * @param key
   */
  protected getFallbackValue(key: string): string {
    return this.config.production ? this.NON_BREAKING_SPACE : `[${key}]`;
  }

  /**
   * Reports that the key is missing
   * @param key
   */
  protected reportMissingKey(key: string) {
    if (!this.config.production) {
      console.warn(`Translation key missing '${key}'`);
    }
  }

  private loadKeyNamespace(key: string, onNamespaceLoad: Function) {
    // CAUTION - this assumes ':' as namespace separator
    const namespace = key.includes(':') ? key.split(':')[0] : undefined;
    if (namespace !== undefined) {
      this.loadNamespaces(namespace, onNamespaceLoad);
    }
  }
}
