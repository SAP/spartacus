import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OCC_USER_ID_CURRENT } from '../../occ/utils/occ-constants';
import { StateWithProcess } from '../../process/store/process-state';
import { getProcessLoadingFactory } from '../../process/store/selectors/process.selectors';
import { UserActions } from '../store/actions/index';
import { UsersSelectors } from '../store/selectors/index';
import {
  StateWithUser,
  UPDATE_NOTIFICATION_PREFERENCES_PROCESS_ID,
} from '../store/user-state';
import { NotificationPreference } from '../../model/notification-preference.model';

@Injectable({
  providedIn: 'root',
})
export class UserNotificationPreferenceService {
  constructor(protected store: Store<StateWithUser | StateWithProcess<void>>) {}

  /**
   * Returns all notification preferences.
   */
  getPreferences(): Observable<NotificationPreference[]> {
    return this.store.pipe(select(UsersSelectors.getPreferences));
  }

  /**
   * Returns all enabled notification preferences.
   */
  getEnabledPreferences(): Observable<NotificationPreference[]> {
    return this.store.pipe(select(UsersSelectors.getEnabledPreferences));
  }

  /**
   * Loads all notification preferences.
   */
  loadPreferences(): void {
    this.store.dispatch(
      new UserActions.LoadNotificationPreferences(OCC_USER_ID_CURRENT)
    );
  }

  /**
   * Clear all notification preferences.
   */
  clearPreferences(): void {
    this.store.dispatch(new UserActions.ClearNotificationPreferences());
  }

  /**
   * Returns a loading flag for notification preferences.
   */
  getPreferencesLoading(): Observable<boolean> {
    return this.store.pipe(select(UsersSelectors.getPreferencesLoading));
  }

  /**
   * Updating notification preferences.
   * @param preferences a preference list
   */
  updatePreferences(preferences: NotificationPreference[]): void {
    this.store.dispatch(
      new UserActions.UpdateNotificationPreferences({
        userId: OCC_USER_ID_CURRENT,
        preferences: preferences,
      })
    );
  }

  /**
   * Returns a loading flag for updating preferences.
   */
  getUpdatePreferencesResultLoading(): Observable<boolean> {
    return this.store.select(
      getProcessLoadingFactory(UPDATE_NOTIFICATION_PREFERENCES_PROCESS_ID)
    );
  }

  /**
   * Resets the update notification preferences process state. The state needs to be
   * reset after the process concludes, regardless if it's a success or an error.
   */
  resetNotificationPreferences(): void {
    this.store.dispatch(new UserActions.ResetNotificationPreferences());
  }
}
