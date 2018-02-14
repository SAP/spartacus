import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const OAUTH_ENDPOINT = '/authorizationserver/oauth/token';
const USER_ENDPOINT = 'users/';

@Injectable()
export class OccUserService {
  // some extending from baseservice is not working here...
  constructor(
    protected http: HttpClient,
    protected configService: ConfigService
  ) { }

  public loadUser(username: string, accessToken: string): Observable<any> {
    const url = this.getUserEndpoint() + username;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + accessToken
    });

    return this.http
      .get(url, { headers: headers })
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  loadToken(username: string, password: string): Observable<any> {
    const url = this.getOAuthEndpoint();
    let creds = '';
    creds += 'client_id=' + this.configService.authentication.client_id;
    creds +=
      '&client_secret=' + this.configService.authentication.client_secret;
    creds += '&grant_type=password'; // authorization_code, client_credentials, password
    creds += '&username=' + username + '&password=' + password;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http
      .post(url, creds, { headers: headers })
      .pipe(catchError((error: any) => Observable.throw(error.json())));;
  }

  protected getOAuthEndpoint() {
    return (
      this.configService.server.baseUrl +
      OAUTH_ENDPOINT
    );
  }

  protected getUserEndpoint() {
    return (
      this.configService.server.baseUrl +
      this.configService.server.occPrefix +
      this.configService.site.baseSite +
      '/' +
      USER_ENDPOINT
    );
  }
}
