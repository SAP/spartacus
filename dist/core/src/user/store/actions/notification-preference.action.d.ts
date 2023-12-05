import { StateUtils } from '../../../state/utils/index';
import { EntityFailAction, EntityLoadAction, EntityLoaderResetAction, EntitySuccessAction } from '../../../state/utils/entity-loader/entity-loader.action';
import { NotificationPreference } from '../../../model/notification-preference.model';
export declare const LOAD_NOTIFICATION_PREFERENCES = "[User] Load Notification Preferences";
export declare const LOAD_NOTIFICATION_PREFERENCES_FAIL = "[User] Load Notification Preferences Fail";
export declare const LOAD_NOTIFICATION_PREFERENCES_SUCCESS = "[User] Load Notification Preferences Success";
export declare const UPDATE_NOTIFICATION_PREFERENCES = "[User] Update Notification Preferences";
export declare const UPDATE_NOTIFICATION_PREFERENCES_FAIL = "[User] Update Notification Preferences Fail";
export declare const UPDATE_NOTIFICATION_PREFERENCES_SUCCESS = "[User] Update Notification Preferences Success";
export declare const RESET_NOTIFICATION_PREFERENCES = "[User] Reset Notification Preferences";
export declare const CLEAR_NOTIFICATION_PREFERENCES = "[User] Clear Notification Preferences";
export declare class LoadNotificationPreferences extends StateUtils.LoaderLoadAction {
    payload: string;
    readonly type = "[User] Load Notification Preferences";
    constructor(payload: string);
}
export declare class LoadNotificationPreferencesFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[User] Load Notification Preferences Fail";
    constructor(payload: any);
}
export declare class LoadNotificationPreferencesSuccess extends StateUtils.LoaderSuccessAction {
    payload: NotificationPreference[];
    readonly type = "[User] Load Notification Preferences Success";
    constructor(payload: NotificationPreference[]);
}
export declare class UpdateNotificationPreferences extends EntityLoadAction {
    payload: {
        userId: string;
        preferences: NotificationPreference[];
    };
    readonly type = "[User] Update Notification Preferences";
    constructor(payload: {
        userId: string;
        preferences: NotificationPreference[];
    });
}
export declare class UpdateNotificationPreferencesFail extends EntityFailAction {
    payload: any;
    readonly type = "[User] Update Notification Preferences Fail";
    constructor(payload: any);
}
export declare class UpdateNotificationPreferencesSuccess extends EntitySuccessAction {
    payload: NotificationPreference[];
    readonly type = "[User] Update Notification Preferences Success";
    constructor(payload: NotificationPreference[]);
}
export declare class ResetNotificationPreferences extends EntityLoaderResetAction {
    readonly type = "[User] Reset Notification Preferences";
    constructor();
}
export declare class ClearNotificationPreferences extends StateUtils.LoaderResetAction {
    readonly type = "[User] Clear Notification Preferences";
    constructor();
}
export type NotificationPreferenceAction = LoadNotificationPreferences | LoadNotificationPreferencesFail | LoadNotificationPreferencesSuccess | UpdateNotificationPreferences | UpdateNotificationPreferencesFail | UpdateNotificationPreferencesSuccess | ResetNotificationPreferences | ClearNotificationPreferences;
