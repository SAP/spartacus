import { Inject, Injectable } from '@angular/core';
import { I18NEXT_INSTANCE } from './i18next-providers';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import i18next from 'i18next';
import { ServerConfig } from '../config/server-config/server-config';
import { filter } from 'rxjs/internal/operators/filter';

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

  exists(key: string, options: any = {}): boolean {
    return this.i18Next.exists.call(this.i18Next, key, options);
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
    // console.error(`lazyTranslate called with key ${key}`); //spike remove

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

  // spike todo reuse observables for the same key
  // spike todo refresh observables on language change
  // spike todo for reusing it probably should be behavior subject or subject with some share/replay?
  // SPIKE - we do not support refreshing those observables on language change.

  spikeLazyTranslate(key: string, options: any = {}): Observable<string> {
    console.error(`spikeLazyTranslate called with key ${key}`); //spike remove

    const result = new BehaviorSubject<string>(undefined);
    if (this.exists(key, options)) {
      result.next(this.translateI18Next(key, options));
    } else {
      this.loadKeyNamespace(key, err => {
        if (err || !this.exists(key, options)) {
          this.reportMissingKey(key);
          result.next(this.getFallbackValue(key));
        } else {
          result.next(this.translateI18Next(key, options));
          result.complete();
        }
      });
    }
    return result.asObservable().pipe(filter(Boolean)); // spike todo check filter(!== undefined)
  }
  private translateI18Next(key: string, options: any = {}): string {
    return this.i18Next.t.call(this.i18Next, key, options);
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
