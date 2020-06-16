import { Observable } from 'rxjs';
import { ConsentChangedPushEvent } from './profile-tag.model';

export abstract class ProfileTagLifecycle {
  abstract navigated(): Observable<boolean>;
  abstract consentGranted(): Observable<ConsentChangedPushEvent>;
  abstract loginSuccessful(): Observable<boolean>;
}
