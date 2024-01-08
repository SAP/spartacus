/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Country, Region } from '../../model/address.model';
import { BaseSite, Currency, Language } from '../../model/misc.model';
import { Converter } from '../../util/converter.service';

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

export const BASE_SITE_NORMALIZER = new InjectionToken<
  Converter<any, BaseSite>
>('BaseSiteNormalizer');
