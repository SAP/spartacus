import { StateUtils } from '../../../state/utils/index';
import { PROCESS_FEATURE } from '../../../process/store/process-state';
import {
  EntityFailAction,
  EntityLoadAction,
  EntityLoaderResetAction,
  EntitySuccessAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import {
  UPDATE_NOTIFICATION_PREFERENCES_PROCESS_ID,
  NOTIFICATION_PREFERENCES,
} from '../user-state';
import { NotificationPreference } from '../../../model/notification-preference.model';

export const LOAD_NOTIFICATION_PREFERENCES =
  '[User] Load Notification Preferences';
export const LOAD_NOTIFICATION_PREFERENCES_FAIL =
  '[User] Load Notification Preferences Fail';
export const LOAD_NOTIFICATION_PREFERENCES_SUCCESS =
  '[User] Load Notification Preferences Success';
export const UPDATE_NOTIFICATION_PREFERENCES =
  '[User] Update Notification Preferences';
export const UPDATE_NOTIFICATION_PREFERENCES_FAIL =
  '[User] Update Notification Preferences Fail';
export const UPDATE_NOTIFICATION_PREFERENCES_SUCCESS =
  '[User] Update Notification Preferences Success';
export const RESET_NOTIFICATION_PREFERENCES =
  '[User] Reset Notification Preferences';
export const CLEAR_NOTIFICATION_PREFERENCES =
  '[User] Clear Notification Preferences';

export class LoadNotificationPreferences extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_NOTIFICATION_PREFERENCES;
  constructor(public payload: string) {
    super(NOTIFICATION_PREFERENCES);
  }
}

export class LoadNotificationPreferencesFail extends StateUtils.LoaderFailAction {
  readonly type = LOAD_NOTIFICATION_PREFERENCES_FAIL;
  constructor(public payload: any) {
    super(NOTIFICATION_PREFERENCES, payload);
  }
}

export class LoadNotificationPreferencesSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_NOTIFICATION_PREFERENCES_SUCCESS;
  constructor(public payload: NotificationPreference[]) {
    super(NOTIFICATION_PREFERENCES);
  }
}

export class UpdateNotificationPreferences extends EntityLoadAction {
  readonly type = UPDATE_NOTIFICATION_PREFERENCES;
  constructor(
    public payload: { userId: string; preferences: NotificationPreference[] }
  ) {
    super(PROCESS_FEATURE, UPDATE_NOTIFICATION_PREFERENCES_PROCESS_ID);
  }
}

export class UpdateNotificationPreferencesFail extends EntityFailAction {
  readonly type = UPDATE_NOTIFICATION_PREFERENCES_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, UPDATE_NOTIFICATION_PREFERENCES_PROCESS_ID, payload);
  }
}

export class UpdateNotificationPreferencesSuccess extends EntitySuccessAction {
  readonly type = UPDATE_NOTIFICATION_PREFERENCES_SUCCESS;
  constructor(public payload: NotificationPreference[]) {
    super(PROCESS_FEATURE, UPDATE_NOTIFICATION_PREFERENCES_PROCESS_ID);
  }
}

export class ResetNotificationPreferences extends EntityLoaderResetAction {
  readonly type = RESET_NOTIFICATION_PREFERENCES;
  constructor() {
    super(PROCESS_FEATURE, UPDATE_NOTIFICATION_PREFERENCES_PROCESS_ID);
  }
}

export class ClearNotificationPreferences extends StateUtils.LoaderResetAction {
  readonly type = CLEAR_NOTIFICATION_PREFERENCES;
  constructor() {
    super(NOTIFICATION_PREFERENCES);
  }
}

export type NotificationPreferenceAction =
  | LoadNotificationPreferences
  | LoadNotificationPreferencesFail
  | LoadNotificationPreferencesSuccess
  | UpdateNotificationPreferences
  | UpdateNotificationPreferencesFail
  | UpdateNotificationPreferencesSuccess
  | ResetNotificationPreferences
  | ClearNotificationPreferences;
