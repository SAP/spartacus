import { Inject, Injectable } from '@angular/core';
import { I18NEXT_INSTANCE } from './i18next';
import { Subject } from 'rxjs';
import i18next from 'i18next';
import { ServerConfig } from '../config/server-config/server-config';

@Injectable()
export class TranslationService {
  private languageChanged = new Subject<string>();
  languageChanged$ = this.languageChanged.asObservable();

  constructor(
    @Inject(I18NEXT_INSTANCE) private i18n: i18next.i18n,
    private config: ServerConfig
  ) {
    this.i18n.on.call(this.i18n, 'languageChanged', lang =>
      this.languageChanged.next(lang)
    );
  }

  translate(key: string, options: any = {}): string {
    if (this.exists(key)) {
      return this.i18n.t.call(this.i18n, key, options);
    } else {
      this.reportMissingKey(key);
      return this.getFallbackValue(key);
    }
  }

  exists(key: string, options: any = {}): boolean {
    return this.i18n.exists.call(this.i18n, key, options);
  }

  translateLazy(
    key: string,
    options: any = {},
    onNamespaceLoad: Function
  ): string {
    if (this.exists(key, options)) {
      return this.i18n.t.call(this.i18n, key, options);
    } else {
      this.loadKeyNamespace(key, (...args) => {
        // report if key is missing even after loading namespace
        if (!this.exists(key)) {
          this.reportMissingKey(key);
        }
        onNamespaceLoad(...args); // spike todo check if it works
      });
      return this.getFallbackValue(key);
    }
  }

  loadNamespaces(namespaces: string | string[]): Promise<any> {
    return this.i18n.loadNamespaces.call(this.i18n, namespaces);
  }

  get language(): string {
    return this.i18n.language;
  }

  protected getFallbackValue(key: string): string {
    return `[${key}]`;
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
      this.i18n.loadNamespaces(namespace, onNamespaceLoad as i18next.Callback);
    }
  }
}
