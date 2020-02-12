import { Observable } from 'rxjs';
import { LoginNotificationResponse } from '../model/login-notification';

export abstract class CdsBackendNotificationAdapter {
  abstract notifySuccessfulLogin(): Observable<LoginNotificationResponse>;
}
