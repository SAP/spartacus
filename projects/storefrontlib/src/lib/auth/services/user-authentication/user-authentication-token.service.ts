import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from './../../config.service';

const OAUTH_ENDPOINT = '/authorizationserver/oauth/token';

@Injectable()
export class UserAuthenticationTokenService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  loadToken(userId: string, password: string): Observable<any> {
    const url = this.getOAuthEndpoint();
    let creds = '';
    creds += 'client_id=' + this.configService.authentication.client_id;
    creds +=
      '&client_secret=' + this.configService.authentication.client_secret;
    creds += '&grant_type=password'; // authorization_code, client_credentials, password
    creds += '&username=' + userId + '&password=' + password;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http
      .post(url, creds, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  refreshToken(refreshToken: string) {
    const url = this.getOAuthEndpoint();
    let creds = '';
    creds +=
      'client_id=' +
      encodeURIComponent(this.configService.authentication.client_id);
    creds +=
      '&client_secret=' +
      encodeURIComponent(this.configService.authentication.client_secret);
    creds += '&refresh_token=' + encodeURI(refreshToken);
    creds += '&grant_type=refresh_token';
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http
      .post(url, creds, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  protected getOAuthEndpoint() {
    return this.configService.server.baseUrl + OAUTH_ENDPOINT;
  }
}
