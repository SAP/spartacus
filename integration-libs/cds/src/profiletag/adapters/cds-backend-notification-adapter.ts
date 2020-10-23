import { Observable } from 'rxjs';

export abstract class CdsBackendNotificationAdapter {
  abstract notifySuccessfulLogin(): Observable<void>;
}
