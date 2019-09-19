import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  InterceptorUtil,
  USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
} from '../../occ/utils/interceptor-util';
import { BaseSiteService } from '../../site-context/facade/base-site.service';
import { AsmConfig } from '../config/asm-config';
import {
  CustomerSearchOptions,
  CustomerSearchPage,
} from '../models/asm.models';

@Injectable({
  providedIn: 'root',
})
export class CustomerConnector {
  private activeBaseSite: string;

  constructor(
    protected http: HttpClient,
    protected config: AsmConfig,
    protected baseSiteService: BaseSiteService
  ) {
    this.baseSiteService
      .getActive()
      .subscribe(value => (this.activeBaseSite = value));
  }

  search(options: CustomerSearchOptions): Observable<CustomerSearchPage> {
    const headers = InterceptorUtil.createHeader(
      USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
      true,
      new HttpHeaders()
    );

    const params: HttpParams = new HttpParams()
      .set('baseSite', this.activeBaseSite)
      .set('query', options.query);

    const url =
      this.config.backend.occ.baseUrl +
      '/assistedservicewebservices/customers/search';
    return this.http
      .get<CustomerSearchPage>(url, { headers, params })
      .pipe(catchError((error: any) => throwError(error)));
  }
}
