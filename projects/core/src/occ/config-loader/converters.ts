import { InjectionToken } from '@angular/core';
import { I18nConfig } from '../../i18n/config/i18n-config';
import { BaseSite } from '../../model/misc.model';
import { SiteContextConfig } from '../../site-context/config/site-context-config';
import { Converter } from '../../util/converter.service';
import { OccLoadedConfig } from './occ-loaded-config';

export const SITE_CONTEXT_CONFIG_CONVERTER = new InjectionToken<
  Converter<OccLoadedConfig, SiteContextConfig>
>('SiteContextConfigConverter');

export const I18N_CONFIG_CONVERTER = new InjectionToken<
  Converter<OccLoadedConfig, I18nConfig>
>('I18nConfigConverter');

export const OCC_LOADED_CONFIG_CONVERTER = new InjectionToken<
  Converter<BaseSite, OccLoadedConfig>
>('OccLoadedConfigConverter');
