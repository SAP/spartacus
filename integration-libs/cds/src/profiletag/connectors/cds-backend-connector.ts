import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CdsBackendNotificationAdapter } from '../adapters/cds-backend-notification-adapter';

@Injectable({
  providedIn: 'root',
})
export class CdsBackendConnector {
  constructor(
    private cdsBackendNotificationAdapter: CdsBackendNotificationAdapter
  ) {}
  notifySuccessfulLogin(): Observable<void> {
    return this.cdsBackendNotificationAdapter.notifySuccessfulLogin();
  }
}
