import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { ConfigService } from '../../config.service';

@Injectable()
export class OccSiteService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  protected getBaseEndPoint() {
    return (
      this.config.server.baseUrl +
      this.config.server.occPrefix +
      this.config.site.baseSite
    );
  }

  loadLanguages(): Observable<any> {
    return this.http
      .get(this.getBaseEndPoint() + '/languages')
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  loadCurrencies(): Observable<any> {
    return this.http
      .get(this.getBaseEndPoint() + '/currencies')
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
