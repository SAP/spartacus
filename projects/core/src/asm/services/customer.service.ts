import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthConfig } from '../../auth/config/auth-config';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(protected http: HttpClient, protected config: AuthConfig) {}

  search(_searchTerm: string): Observable<any> {
    const url = this.getOAuthEndpoint();

    return this.http
      .get<any>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }
  protected getOAuthEndpoint() {
    return (
      (this.config.backend.occ.baseUrl || '') + 'assistedservicewebservices'
    );
  }
}
