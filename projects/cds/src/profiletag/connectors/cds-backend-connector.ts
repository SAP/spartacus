import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CdsBackendNotificationAdapter } from '../adapters/cds-backend-notification-adapter';
import { LoginNotificationResponse } from '../model/login-notification';

@Injectable({
  providedIn: 'root',
})
export class CdsBackendConnector {
  constructor(
    private cdsBackendNotificationAdapter: CdsBackendNotificationAdapter
  ) {}
  notifySuccessfulLogin(): Observable<LoginNotificationResponse> {
    return this.cdsBackendNotificationAdapter.notifySuccessfulLogin();
  }
}
