import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ConfigInitializer } from '../../config/config-initializer/config-initializer';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { I18nConfig } from './i18n-config';

@Injectable({ providedIn: 'root' })
export class I18nConfigInitializer implements ConfigInitializer {
  readonly scopes = ['i18n.fallbackLang'];
  readonly configFactory = () => this.resolveConfig().toPromise();

  constructor(
    protected configInit: ConfigInitializerService,
    protected config: I18nConfig
  ) {}

  /**
   * Resolves the `fallbackLang` based on the default langauge from config `context.language` .
   * If `fallbackLang` was already configured statically, the empty object is emitted.
   */
  protected resolveConfig(): Observable<I18nConfig> {
    if (this.config?.i18n?.fallbackLang !== undefined) {
      return of({});
    }
    return this.configInit.getStable('context.language').pipe(
      map((config) => ({
        i18n: {
          // the first language in the array is the default one
          fallbackLang: config?.context?.language?.[0],
        },
      })),
      take(1)
    );
  }
}
