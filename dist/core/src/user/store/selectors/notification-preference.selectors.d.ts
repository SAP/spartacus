import { MemoizedSelector } from '@ngrx/store';
import { NotificationPreference } from '../../../model/notification-preference.model';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { StateWithUser } from '../user-state';
export declare const getPreferencesLoaderState: MemoizedSelector<StateWithUser, LoaderState<NotificationPreference[]>>;
export declare const getPreferences: MemoizedSelector<StateWithUser, NotificationPreference[]>;
export declare const getEnabledPreferences: MemoizedSelector<StateWithUser, NotificationPreference[]>;
export declare const getPreferencesLoading: MemoizedSelector<StateWithUser, boolean>;
