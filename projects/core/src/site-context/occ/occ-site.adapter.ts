import { SiteAdapter } from '../connectors/site.adapter';
import { Observable, throwError } from 'rxjs';
import { Currency, Language } from '../../model/misc.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { catchError, map } from 'rxjs/operators';
import { Occ } from '../../occ/occ-models/occ.models';
import { ConverterService } from '../../util/converter.service';
import {
  CURRENCY_NORMALIZER,
  LANGUAGE_NORMALIZER,
} from '../connectors/converters';

@Injectable()
export class OccSiteAdapter implements SiteAdapter {
  constructor(
    private http: HttpClient,
    private occEndpoints: OccEndpointsService,
    private converter: ConverterService
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
}
