import { InjectionToken } from '@angular/core';
import { I18nConfig } from '../../i18n/config/i18n-config';
import { SiteContextConfig } from '../../site-context/config/site-context-config';
import { Converter } from '../../util/converter.service';

export const SITE_CONTEXT_CONFIG_CONVERTER = new InjectionToken<
  Converter<any, SiteContextConfig>
>('SiteContextConfigConverter');

export const I18N_CONFIG_CONVERTER = new InjectionToken<
  Converter<any, I18nConfig>
>('I18nConfigConverter');
