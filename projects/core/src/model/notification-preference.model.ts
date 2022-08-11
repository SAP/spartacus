export interface NotificationPreference {
  channel?: string;
  value?: string;
  enabled?: boolean;
  visible?: boolean;
}

export interface NotificationPreferenceList {
  preferences?: NotificationPreference[];
}
