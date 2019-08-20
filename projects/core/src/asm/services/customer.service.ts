import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  InterceptorUtil,
  USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
} from '../../occ/utils/interceptor-util';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(
    protected http: HttpClient
  ) {}

  search(_searchTerm: string): Observable<any> {
    console.log('CustomerService.search');
    const headers = InterceptorUtil.createHeader(
      USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
      true,
      new HttpHeaders()
    );
    const url =
      '/assistedservicewebservices/customers/search?baseSite=electronics-spa&query=pl';
    console.log('CustomerService.search url', url);
    return this.http
      .get<any>(url, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }
}
