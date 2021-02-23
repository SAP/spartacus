import { Injectable } from '@angular/core';
import { I18nConfig } from '../../../i18n';
import { BaseSite } from '../../../model/misc.model';
import { Converter } from '../../../util/converter.service';

@Injectable({
  providedIn: 'root',
})
export class I18nConfigConverter implements Converter<BaseSite, I18nConfig> {
  convert(source: BaseSite, target?: I18nConfig): I18nConfig {
    target = {
      i18n: {
        fallbackLang:
          source.defaultLanguage.isocode ||
          source.stores[0].defaultLanguage.isocode,
      },
    };
    return target;
  }
}
