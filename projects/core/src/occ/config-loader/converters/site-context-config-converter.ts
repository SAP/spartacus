import { Injectable } from '@angular/core';
import { SiteContextConfig } from '../../../site-context/config/site-context-config';
import {
  BASE_SITE_CONTEXT_ID,
  CURRENCY_CONTEXT_ID,
  LANGUAGE_CONTEXT_ID,
  THEME_CONTEXT_ID,
} from '../../../site-context/providers/context-ids';
import { Converter } from '../../../util/converter.service';
import { OccLoadedConfig } from '../occ-loaded-config';

@Injectable({
  providedIn: 'root',
})
export class SiteContextConfigConverter
  implements Converter<OccLoadedConfig, SiteContextConfig> {
  convert(
    source: OccLoadedConfig,
    target?: SiteContextConfig
  ): SiteContextConfig {
    target = {
      context: {
        urlParameters: source.urlParameters,
        [BASE_SITE_CONTEXT_ID]: [source.baseSite],
        [LANGUAGE_CONTEXT_ID]: source.languages,
        [CURRENCY_CONTEXT_ID]: source.currencies,
        [THEME_CONTEXT_ID]: [source.theme],
      },
    } as SiteContextConfig;

    return target;
  }
}
