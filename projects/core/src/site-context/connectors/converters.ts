import { InjectionToken } from '@angular/core';
import { Converter } from '../../util/converter.service';
import { Language } from '../../model/misc.model';

export const LANGUAGE_NORMALIZER = new InjectionToken<Converter<any, Language>>(
  'LanguageNormalizer'
);

export const CURRENCY_NORMALIZER = new InjectionToken<Converter<any, Language>>(
  'CurrencyNormalizer'
);
