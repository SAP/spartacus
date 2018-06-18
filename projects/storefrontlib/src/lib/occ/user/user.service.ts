import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { UserRegisterFormData } from '../../user/models/user.model';

const OAUTH_ENDPOINT = '/authorizationserver/oauth/token';
const USER_ENDPOINT = 'users/';
const ADDRESSES_VERIFICATION_ENDPOINT = '/addresses/verification';
const ADDRESSES_ENDPOINT = '/addresses';
const PAYMENT_DETAILS_ENDPOINT = '/paymentdetails';

@Injectable()
export class OccUserService {
  // some extending from baseservice is not working here...
  constructor(
    protected http: HttpClient,
    protected configService: ConfigService
  ) {}

  public loadUser(userId: string): Observable<any> {
    const url = this.getUserEndpoint() + userId;
    return this.http
      .get(url)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

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
      .post(url, creds, { headers: headers })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  verifyAddress(userId, address) {
    const url =
      this.getUserEndpoint() + userId + ADDRESSES_VERIFICATION_ENDPOINT;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(url, address, { headers: headers })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  loadUserAddresses(userId) {
    const url = this.getUserEndpoint() + userId + ADDRESSES_ENDPOINT;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .get(url, { headers: headers })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  loadUserPaymentMethods(userId) {
    const url = this.getUserEndpoint() + userId + PAYMENT_DETAILS_ENDPOINT;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .get(url, { headers: headers })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  registerUser(user: UserRegisterFormData): Observable<any> {
    const url = this.getUserEndpoint();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(url, user, { headers: headers })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  protected getOAuthEndpoint() {
    return this.configService.server.baseUrl + OAUTH_ENDPOINT;
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
