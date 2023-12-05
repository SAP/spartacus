import { NotificationPreference } from '../../../model';
import { UserActions } from '../actions/index';
export declare const initialState: NotificationPreference[];
export declare function reducer(state: NotificationPreference[] | undefined, action: UserActions.NotificationPreferenceAction): NotificationPreference[];
