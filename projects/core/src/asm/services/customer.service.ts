import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthConfig } from '../../auth/config/auth-config';
import {
  InterceptorUtil,
  USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
} from '../../occ/utils/interceptor-util';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(protected http: HttpClient, protected config: AuthConfig) {}

  search(_searchTerm: string): Observable<any> {
    const url = this.getOAuthEndpoint();
    const headers = InterceptorUtil.createHeader(
      USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
      true,
      new HttpHeaders()
    );
    return this.http
      .get<any>(url, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }
  protected getOAuthEndpoint() {
    return (
      (this.config.backend.occ.baseUrl || '') + 'assistedservicewebservices'
    );
  }
}
