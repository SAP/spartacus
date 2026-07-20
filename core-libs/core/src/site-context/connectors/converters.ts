/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '../../util/converter.service';
import { BaseSite, Currency, Language } from '../../model/misc.model';
import { City, CityDistrict, Country, Region } from '../../model/address.model';

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

export const CITY_NORMALIZER = new InjectionToken<Converter<any, City>>(
  'CityNormalizer'
);

export const CITY_DISTRICT_NORMALIZER = new InjectionToken<
  Converter<any, CityDistrict>
>('CityDistrictNormalizer');

export const BASE_SITE_NORMALIZER = new InjectionToken<
  Converter<any, BaseSite>
>('BaseSiteNormalizer');
