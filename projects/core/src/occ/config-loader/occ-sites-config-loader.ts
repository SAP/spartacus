import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSite } from '../../model/misc.model';
import { OccConfig } from '../config/occ-config';
import { Occ } from '../occ-models/occ.models';

@Injectable({ providedIn: 'root' })
export class OccSitesConfigLoader {
  constructor(protected config: OccConfig, protected http: HttpClient) {}

  protected readonly endpoint =
    '/basesites?fields=baseSites(uid,defaultLanguage(isocode),urlEncodingAttributes,urlPatterns,stores(currencies(isocode),defaultCurrency(isocode),languages(isocode),defaultLanguage(isocode)))';

  private get baseEndpoint(): string {
    return (
      (this.config.backend.occ.baseUrl || '') + this.config.backend.occ.prefix
    );
  }

  private get url(): string {
    return `${this.baseEndpoint}${this.endpoint}`;
  }

  load(): Observable<BaseSite[]> {
    if (!this.config || !this.config.backend || !this.config.backend.occ) {
      return throwError(new Error(`Missing config for OCC backend!`));
    }

    return this.http
      .get<Occ.BaseSites>(this.url)
      .pipe(map(({ baseSites }) => baseSites));
  }
}
