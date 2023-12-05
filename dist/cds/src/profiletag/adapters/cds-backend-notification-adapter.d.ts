import { Observable } from 'rxjs';
export declare abstract class CdsBackendNotificationAdapter {
    abstract notifySuccessfulLogin(): Observable<void>;
}
