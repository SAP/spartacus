import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  InterceptorUtil,
  USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
} from '../../occ/utils/interceptor-util';
import { BaseSiteService } from '../../site-context/facade/base-site.service';
import { CustomerSearchPage } from '../models/asm.models';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private activeBaseSite: string;

  constructor(
    protected http: HttpClient,
    protected baseSiteService: BaseSiteService
  ) {
    this.baseSiteService
      .getActive()
      .subscribe(value => (this.activeBaseSite = value));
  }

  search(searchTerm: string): Observable<CustomerSearchPage> {
    console.log('CustomerService.search');
    const headers = InterceptorUtil.createHeader(
      USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
      true,
      new HttpHeaders()
    );

    const params: HttpParams = new HttpParams()
      .set('baseSite', this.activeBaseSite)
      .set('query', searchTerm);

    const url = '/assistedservicewebservices/customers/search';
    console.log('CustomerService.search url', url);
    return this.http
      .get<CustomerSearchPage>(url, { headers, params })
      .pipe(catchError((error: any) => throwError(error)));
  }
}
