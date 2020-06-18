import { Observable } from 'rxjs';
import { ConsentChangedPushEvent } from './profile-tag.model';

export abstract class ProfileTagLifecycle {
  abstract consentGranted(): Observable<ConsentChangedPushEvent>;
  abstract loginSuccessful(): Observable<boolean>;
}
