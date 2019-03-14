import { Inject, Injectable } from '@angular/core';
import { I18NEXT_INSTANCE } from './i18next-providers';
import { Subject } from 'rxjs';
import i18next from 'i18next';
import { ServerConfig } from '../config/server-config/server-config';

@Injectable()
export class TranslationService {
  private languageChanged = new Subject<string>();
  languageChanged$ = this.languageChanged.asObservable();

  constructor(
    @Inject(I18NEXT_INSTANCE) private i18Next: i18next.i18n,
    private config: ServerConfig
  ) {
    this.i18Next.on.call(this.i18Next, 'languageChanged', lang => {
      this.languageChanged.next(lang);
    });
  }

  exists(key: string): boolean {
    return this.i18Next.exists.call(this.i18Next, key);
  }

  translate(key: string, options: any = {}): string {
    if (this.exists(key)) {
      return this.i18Next.t.call(this.i18Next, key, options);
    } else {
      this.reportMissingKey(key);
      return this.getFallbackValue(key);
    }
  }

  lazyTranslate(
    key: string,
    options: any = {},
    onNamespaceLoad?: Function
  ): string {
    if (this.exists(key)) {
      return this.i18Next.t.call(this.i18Next, key, options);
    } else {
      this.loadKeyNamespace(key, (...args) => {
        if (!this.exists(key)) {
          this.reportMissingKey(key);
        }
        if (onNamespaceLoad) {
          onNamespaceLoad(...args);
        }
      });
      return this.getFallbackValue(key);
    }
  }

  loadNamespaces(
    namespaces: string | string[],
    callback?: Function
  ): Promise<any> {
    return this.i18Next.loadNamespaces.call(this.i18Next, namespaces, callback);
  }

  protected getFallbackValue(key: string): string {
    return this.config.production
      ? ` ` // non-breaking space
      : `[${key}]`;
  }

  protected reportMissingKey(key: string) {
    if (!this.config.production) {
      console.warn(`Translation key missing '${key}'`);
    }
  }

  private loadKeyNamespace(key: string, onNamespaceLoad: Function) {
    // CAUTION - this assumes ':' as namespace separator
    const namespace = key.includes(':') ? key.split(':')[0] : undefined;
    if (namespace !== undefined) {
      this.i18Next.loadNamespaces(
        namespace,
        onNamespaceLoad as i18next.Callback
      );
    }
  }
}
