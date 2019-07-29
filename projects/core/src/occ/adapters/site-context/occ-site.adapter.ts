import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country, CountryType, Region } from '../../../model/address.model';
import { BaseSite, Currency, Language } from '../../../model/misc.model';
import {
  COUNTRY_NORMALIZER,
  CURRENCY_NORMALIZER,
  LANGUAGE_NORMALIZER,
  REGION_NORMALIZER,
} from '../../../site-context/connectors/converters';
import { SiteAdapter } from '../../../site-context/connectors/site.adapter';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

@Injectable()
export class OccSiteAdapter implements SiteAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  loadLanguages(): Observable<Language[]> {
    return this.http
      .get<Occ.LanguageList>(this.occEndpoints.getUrl('languages'))
      .pipe(
        map(languageList => languageList.languages),
        this.converter.pipeableMany(LANGUAGE_NORMALIZER)
      );
  }

  loadCurrencies(): Observable<Currency[]> {
    return this.http
      .get<Occ.CurrencyList>(this.occEndpoints.getUrl('currencies'))
      .pipe(
        map(currencyList => currencyList.currencies),
        this.converter.pipeableMany(CURRENCY_NORMALIZER)
      );
  }

  loadCountries(type?: CountryType): Observable<Country[]> {
    return this.http
      .get<Occ.CountryList>(
        this.occEndpoints.getUrl(
          'countries',
          undefined,
          type ? { type } : undefined
        )
      )
      .pipe(
        map(countryList => countryList.countries),
        this.converter.pipeableMany(COUNTRY_NORMALIZER)
      );
  }

  loadRegions(countryIsoCode: string): Observable<Region[]> {
    return this.http
      .get<Occ.RegionList>(
        this.occEndpoints.getUrl('regions', { isoCode: countryIsoCode })
      )
      .pipe(
        map(regionList => regionList.regions),
        this.converter.pipeableMany(REGION_NORMALIZER)
      );
  }

  loadBaseSite(): Observable<BaseSite> {
    const baseUrl = this.occEndpoints.getBaseEndpoint();
    const urlSplits = baseUrl.split('/');
    const activeSite = urlSplits.pop();
    const url = urlSplits.join('/') + '/basesites';

    const params = new HttpParams({
      fromString: 'fields=FULL',
    });

    return this.http
      .get<{ baseSites: BaseSite[] }>(url, { params: params })
      .pipe(
        map(siteList => {
          return siteList.baseSites.find(site => site.uid === activeSite);
        })
      );
  }
}
