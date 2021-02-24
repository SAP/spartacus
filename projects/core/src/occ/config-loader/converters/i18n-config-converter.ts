import { Injectable } from '@angular/core';
import { I18nConfig } from '../../../i18n';
import { Converter } from '../../../util/converter.service';
import { OccLoadedConfig } from '../occ-loaded-config';

@Injectable({
  providedIn: 'root',
})
export class I18nConfigConverter
  implements Converter<OccLoadedConfig, I18nConfig> {
  convert(source: OccLoadedConfig, target?: I18nConfig): I18nConfig {
    target = { i18n: { fallbackLang: source.languages?.[0] } };
    return target;
  }
}
