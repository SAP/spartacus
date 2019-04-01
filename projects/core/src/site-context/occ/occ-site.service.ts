import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { LanguageList, CurrencyList } from '../../occ/occ-models/occ.models';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';

@Injectable({
  providedIn: 'root',
})
export class OccSiteService {
  constructor(
    private http: HttpClient,
    private occEndpoints: OccEndpointsService
  ) {}

  loadLanguages(): Observable<LanguageList> {
    return this.http
      .get(this.occEndpoints.getEndpoint('languages'))
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  loadCurrencies(): Observable<CurrencyList> {
    return this.http
      .get(this.occEndpoints.getEndpoint('currencies'))
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
