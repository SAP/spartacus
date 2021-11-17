import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country, CountryType, Region } from '../../../model/address.model';
import { BaseSite, Currency, Language } from '../../../model/misc.model';
import {
  BASE_SITE_NORMALIZER,
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
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  loadLanguages(): Observable<Language[]> {
    return this.http
      .get<Occ.LanguageList>(this.occEndpointsService.buildUrl('languages'))
      .pipe(
        map((languageList) => languageList.languages),
        this.converterService.pipeableMany(LANGUAGE_NORMALIZER)
      );
  }

  loadCurrencies(): Observable<Currency[]> {
    return this.http
      .get<Occ.CurrencyList>(this.occEndpointsService.buildUrl('currencies'))
      .pipe(
        map((currencyList) => currencyList.currencies),
        this.converterService.pipeableMany(CURRENCY_NORMALIZER)
      );
  }

  loadCountries(type?: CountryType): Observable<Country[]> {
    return this.http
      .get<Occ.CountryList>(
        this.occEndpointsService.buildUrl('countries', {
          queryParams: type ? { type } : undefined,
        })
      )
      .pipe(
        map((countryList) => countryList.countries),
        this.converterService.pipeableMany(COUNTRY_NORMALIZER)
      );
  }

  loadRegions(countryIsoCode: string): Observable<Region[]> {
    return this.http
      .get<Occ.RegionList>(
        this.occEndpointsService.buildUrl('regions', {
          urlParams: { isoCode: countryIsoCode },
        })
      )
      .pipe(
        map((regionList) => regionList.regions),
        this.converterService.pipeableMany(REGION_NORMALIZER)
      );
  }

  /**
   * There is no OCC API to load one site based on Uid.
   * So, we have to load all sites, and find the one from the list.
   */
  loadBaseSite(siteUid?: string): Observable<BaseSite | undefined> {
    if (!siteUid) {
      const baseUrl = this.occEndpointsService.getBaseUrl();
      const urlSplits = baseUrl.split('/');
      siteUid = urlSplits.pop();
    }

    return this.http
      .get<{ baseSites: BaseSite[] }>(
        this.occEndpointsService.buildUrl('baseSites', {}, { baseSite: false })
      )
      .pipe(
        map((siteList) => {
          return siteList.baseSites.find((site) => site.uid === siteUid);
        })
      );
  }

  loadBaseSites(): Observable<BaseSite[]> {
    return this.http
      .get<{ baseSites: BaseSite[] }>(
        this.occEndpointsService.buildUrl('baseSites', {}, { baseSite: false })
      )
      .pipe(
        map((baseSiteList) => baseSiteList.baseSites),
        this.converterService.pipeableMany(BASE_SITE_NORMALIZER)
      );
  }
}
