import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { UserRegisterFormData } from '../../user/models/user.model';
import {
  InterceptorUtil,
  REQUEST_MAPPING_CUSTOM_HEADER
} from '../../site-context/shared/http-interceptors/interceptor-util';
import { RequestMapping } from '@auth/models/request-mapping.model';

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
      .pipe(catchError((error: any) => throwError(error)));
  }

  verifyAddress(userId, address) {
    const url =
      this.getUserEndpoint() + userId + ADDRESSES_VERIFICATION_ENDPOINT;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(url, address, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  loadUserAddresses(userId) {
    const url = this.getUserEndpoint() + userId + ADDRESSES_ENDPOINT;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .get(url, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  loadUserPaymentMethods(userId) {
    const url = this.getUserEndpoint() + userId + PAYMENT_DETAILS_ENDPOINT;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .get(url, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  registerUser(user: UserRegisterFormData): Observable<any> {
    const url = this.getUserEndpoint();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const requestMapping: RequestMapping = {
      method: 'POST',
      urlPattern: '^(.*?)/users/$'
    };
    headers = InterceptorUtil.createHeader(
      REQUEST_MAPPING_CUSTOM_HEADER,
      requestMapping,
      headers
    );

    return this.http
      .post(url, user, { headers })
      .pipe(catchError((error: any) => throwError(error)));
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
