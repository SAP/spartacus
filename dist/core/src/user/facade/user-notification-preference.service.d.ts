import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { NotificationPreference } from '../../model/notification-preference.model';
import { StateWithProcess } from '../../process/store/process-state';
import { StateWithUser } from '../store/user-state';
import * as i0 from "@angular/core";
export declare class UserNotificationPreferenceService {
    protected store: Store<StateWithUser | StateWithProcess<void>>;
    protected userIdService: UserIdService;
    constructor(store: Store<StateWithUser | StateWithProcess<void>>, userIdService: UserIdService);
    /**
     * Returns all notification preferences.
     */
    getPreferences(): Observable<NotificationPreference[]>;
    /**
     * Returns all enabled notification preferences.
     */
    getEnabledPreferences(): Observable<NotificationPreference[]>;
    /**
     * Loads all notification preferences.
     */
    loadPreferences(): void;
    /**
     * Clear all notification preferences.
     */
    clearPreferences(): void;
    /**
     * Returns a loading flag for notification preferences.
     */
    getPreferencesLoading(): Observable<boolean>;
    /**
     * Updating notification preferences.
     * @param preferences a preference list
     */
    updatePreferences(preferences: NotificationPreference[]): void;
    /**
     * Returns a loading flag for updating preferences.
     */
    getUpdatePreferencesResultLoading(): Observable<boolean>;
    /**
     * Resets the update notification preferences process state. The state needs to be
     * reset after the process concludes, regardless if it's a success or an error.
     */
    resetNotificationPreferences(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserNotificationPreferenceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserNotificationPreferenceService>;
}
