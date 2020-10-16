import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OccEndpointsService } from '../../../occ/services/occ-endpoints.service';
import {
  InterceptorUtil,
  TOKEN_REVOCATION_HEADER,
} from '../../../occ/utils/interceptor-util';
import { AuthConfig } from '../../config/auth-config';
import { UserToken } from '../../models/token-types.model';

@Injectable({
  providedIn: 'root',
})
export class UserAuthenticationTokenService {
  constructor(
    protected http: HttpClient,
    protected config: AuthConfig,
    protected occEndpointsService: OccEndpointsService
  ) {}

  loadToken(userId: string, password: string): Observable<UserToken> {
    const url = this.occEndpointsService.getRawEndpoint('login');
    const params = new HttpParams()
      .set('client_id', this.config.authentication.client_id)
      .set('client_secret', this.config.authentication.client_secret)
      .set('grant_type', 'password')
      .set('username', userId)
      .set('password', password);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http
      .post<UserToken>(url, params, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  refreshToken(refreshToken: string): Observable<UserToken> {
    const url = this.occEndpointsService.getRawEndpoint('login');
    const params = new HttpParams()
      .set(
        'client_id',
        encodeURIComponent(this.config.authentication.client_id)
      )
      .set(
        'client_secret',
        encodeURIComponent(this.config.authentication.client_secret)
      )
      .set('refresh_token', encodeURI(refreshToken))
      .set('grant_type', 'refresh_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http
      .post<UserToken>(url, params, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  revoke(userToken: UserToken): Observable<{}> {
    const url = this.occEndpointsService.getRawEndpoint('revoke');
    const headers = InterceptorUtil.createHeader(
      TOKEN_REVOCATION_HEADER,
      true,
      new HttpHeaders({
        Authorization: `${userToken.token_type} ${userToken.access_token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    );
    const params = new HttpParams().set('token', userToken.access_token);
    return this.http
      .post<{}>(url, params, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }
}
