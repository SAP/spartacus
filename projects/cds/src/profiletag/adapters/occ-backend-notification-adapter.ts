import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { LoginNotificationResponse } from '../model/login-notification';
import { CdsBackendNotificationAdapter } from './cds-backend-notification-adapter';

@Injectable()
export class OccBackendNotification implements CdsBackendNotificationAdapter {
  constructor(
    private http: HttpClient,
    private occEndpoints: OccEndpointsService
  ) {}
  notifySuccessfulLogin(): Observable<LoginNotificationResponse> {
    return this.http.post(
      `${this.occEndpoints.getBaseEndpoint()}/users/current/loginnotification`,
      {}
    );
  }
}
