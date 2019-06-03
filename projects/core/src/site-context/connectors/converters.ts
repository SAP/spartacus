import { InjectionToken } from '@angular/core';
import { Converter } from '../../util/converter.service';
import { Currency, Language } from '../../model/misc.model';
import { Country, Region } from '../../model/address.model';

export const LANGUAGE_NORMALIZER = new InjectionToken<Converter<any, Language>>(
  'LanguageNormalizer'
);

export const CURRENCY_NORMALIZER = new InjectionToken<Converter<any, Currency>>(
  'CurrencyNormalizer'
);

export const COUNTRY_NORMALIZER = new InjectionToken<Converter<any, Country>>(
  'CountryNormalizer'
);

export const REGION_NORMALIZER = new InjectionToken<Converter<any, Region>>(
  'RegionNormalizer'
);
