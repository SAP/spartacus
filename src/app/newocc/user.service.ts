import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class OccUserService extends BaseService {
  // some extending from baseservice is not working here...
  constructor(
    protected http: HttpClient,
    protected configService: ConfigService
  ) {
    super(http, configService);
  }

  public loadUser(username: string): Observable<any> {
    const url = this.getUserEndpoint() + username;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept-Control-Request-Headers': 'authorization',
      'Accept-Control-Request-Method': 'GET'
    });
    return this.http.get(url, { headers: headers });
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

    return this.http.post(url, creds, { headers: headers });
  }
}
