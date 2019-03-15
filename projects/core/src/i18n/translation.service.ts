import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { ServerConfig } from '../config/server-config/server-config';
import { filter } from 'rxjs/internal/operators/filter';
import { I18NextService } from './i18next/i18next.service';

@Injectable()
export class TranslationService {
  private readonly NON_BREAKING_SPACE = String.fromCharCode(160);

  private languageChanged = new Subject<string>();
  languageChanged$ = this.languageChanged.asObservable();

  constructor(
    private i18NextService: I18NextService,
    private config: ServerConfig
  ) {
    this.i18NextService.on('languageChanged', lang => {
      this.languageChanged.next(lang);
    });
  }

  exists(key: string, options: any = {}): boolean {
    return this.i18NextService.exists(key, options);
  }

  translate(key: string, options: any = {}): string {
    if (this.i18NextService.exists(key, options)) {
      return this.i18NextService.t(key, options);
    } else {
      this.reportMissingKey(key);
      return this.getFallbackValue(key);
    }
  }

  translateLazy(key: string, options: any = {}): Observable<string> {
    const result = new BehaviorSubject<string>(undefined);
    if (this.i18NextService.exists(key, options)) {
      result.next(this.i18NextService.t(key, options));
    } else {
      this.loadKeyNamespace(key, () => {
        if (!this.i18NextService.exists(key, options)) {
          this.reportMissingKey(key);
          result.next(this.getFallbackValue(key));
        } else {
          result.next(this.i18NextService.t(key, options));
        }
      });
    }
    return result.asObservable().pipe(filter(val => val !== undefined));
  }

  loadNamespaces(
    namespaces: string | string[],
    callback?: Function
  ): Promise<any> {
    return this.i18NextService.loadNamespaces(namespaces, callback);
  }

  protected getFallbackValue(key: string): string {
    return this.config.production ? this.NON_BREAKING_SPACE : `[${key}]`;
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
      this.loadNamespaces(namespace, onNamespaceLoad);
    }
  }
}
