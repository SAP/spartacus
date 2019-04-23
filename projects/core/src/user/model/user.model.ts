export interface UserRegisterFormData {
  lastName: string;
  firstName: string;
  uid: string;
  password: string;
  titleCode: string;
}
export interface BasicNotificationPreferenceList {
  preferences: BasicNotificationPreference[];
}
export interface BasicNotificationPreference {
  channel: string;
  enabled: boolean;
  value: string;
}
export interface NotificationPreferenceList {
  preferences: NotificationPreference[];
}
export interface NotificationPreference {
  channel: string;
  enabled: boolean;
}
