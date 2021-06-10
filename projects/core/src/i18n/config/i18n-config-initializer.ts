import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigInitializer } from '../../config/config-initializer/config-initializer';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { I18nConfig } from './i18n-config';

@Injectable({ providedIn: 'root' })
export class I18nConfigInitializer implements ConfigInitializer {
  readonly scopes = ['i18n.fallbackLang'];
  readonly configFactory = () => this.resolveConfig().toPromise();

  constructor(protected configInit: ConfigInitializerService) {}

  /**
   * Resolves the `fallbackLang` based on the default language from config `context.language` .
   */
  protected resolveConfig(): Observable<I18nConfig> {
    return this.configInit.getStable('context.language').pipe(
      map((config) => ({
        i18n: {
          // the first language in the array is the default one
          fallbackLang: config?.context?.language?.[0],
        },
      }))
    );
  }
}
