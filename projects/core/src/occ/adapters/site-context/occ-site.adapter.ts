import { SiteAdapter } from '../../../site-context/connectors/site.adapter';
import { Observable, throwError } from 'rxjs';
import { Currency, Language, BaseSite } from '../../../model/misc.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { catchError, map } from 'rxjs/operators';
import { Occ } from '../../occ-models/occ.models';
import { ConverterService } from '../../../util/converter.service';
import {
  CURRENCY_NORMALIZER,
  LANGUAGE_NORMALIZER,
} from '../../../site-context/connectors/converters';

@Injectable()
export class OccSiteAdapter implements SiteAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  loadLanguages(): Observable<Language[]> {
    return this.http
      .get<Occ.LanguageList>(this.occEndpoints.getEndpoint('languages'))
      .pipe(
        catchError((error: any) => throwError(error.json())),
        map(languageList => languageList.languages),
        this.converter.pipeableMany(LANGUAGE_NORMALIZER)
      );
  }

  loadCurrencies(): Observable<Currency[]> {
    return this.http
      .get<Occ.CurrencyList>(this.occEndpoints.getEndpoint('currencies'))
      .pipe(
        catchError((error: any) => throwError(error.json())),
        map(currencyList => currencyList.currencies),
        this.converter.pipeableMany(CURRENCY_NORMALIZER)
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
        catchError((error: any) => throwError(error)),
        map(siteList => {
          return siteList.baseSites.find(site => site.uid === activeSite);
        })
      );
  }
}
