/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';
import { Country, CountryType, Region } from '../../model/address.model';
import { BaseSite, Currency, Language } from '../../model/misc.model';

export abstract class SiteAdapter {
  abstract loadLanguages(): Observable<Language[]>;

  abstract loadCurrencies(): Observable<Currency[]>;

  abstract loadCountries(type?: CountryType): Observable<Country[]>;

  abstract loadRegions(countryIsoCode: string): Observable<Region[]>;

  abstract loadBaseSite(siteUid?: string): Observable<BaseSite | undefined>;

  abstract loadBaseSites(): Observable<BaseSite[]>;

  abstract loadCities(
    regionIsocode: string
  ): Observable<{ isocode?: string; name?: string }[]>;

  abstract loadDistricts(
    cityIsocode: string
  ): Observable<{ isocode?: string; name?: string }[]>;
}
