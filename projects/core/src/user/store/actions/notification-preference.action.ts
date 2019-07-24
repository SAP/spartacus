import { Action } from '@ngrx/store';
import { NotificationPreference } from '../../../model';
import { PROCESS_FEATURE } from '../../../process/store/process-state';
import {
  EntityFailAction,
  EntityLoadAction,
  EntityResetAction,
  EntitySuccessAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import { UPDATE_NOTIFICATION_PREFERENCES_PROCESS_ID } from '../user-state';

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

export class LoadNotificationPreferences implements Action {
  readonly type = LOAD_NOTIFICATION_PREFERENCES;
  constructor(public payload: string) {}
}

export class LoadNotificationPreferencesFail implements Action {
  readonly type = LOAD_NOTIFICATION_PREFERENCES_FAIL;
  constructor(public payload: any) {}
}

export class LoadNotificationPreferencesSuccess implements Action {
  readonly type = LOAD_NOTIFICATION_PREFERENCES_SUCCESS;
  constructor(public payload: NotificationPreference[]) {}
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

export class UpdateNotificationPreferencesReset extends EntityResetAction {
  readonly type = RESET_NOTIFICATION_PREFERENCES;
  constructor() {
    super(PROCESS_FEATURE, UPDATE_NOTIFICATION_PREFERENCES_PROCESS_ID);
  }
}

export type NotificationPreferenceAction =
  | LoadNotificationPreferences
  | LoadNotificationPreferencesFail
  | LoadNotificationPreferencesSuccess
  | UpdateNotificationPreferences
  | UpdateNotificationPreferencesFail
  | UpdateNotificationPreferencesSuccess
  | UpdateNotificationPreferencesReset;
