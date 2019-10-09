import { Component, OnInit } from '@angular/core';
import {
  NotificationPreference,
  UserNotificationPreferenceService,
} from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-notification-preference',
  templateUrl: './notification-preference.component.html',
})
export class NotificationPreferenceComponent implements OnInit {
  preferences$: Observable<NotificationPreference[]>;
  getNotificationPreferencesloading: boolean;
  updateNotificationPreferencesLoading: boolean;

  constructor(
    private notificationPreferenceService: UserNotificationPreferenceService
  ) {}

  ngOnInit() {
    this.notificationPreferenceService.resetNotificationPreferences();

    this.preferences$ = this.notificationPreferenceService.getPreferences();
    this.notificationPreferenceService
      .getPreferencesLoading()
      .subscribe(loading => (this.getNotificationPreferencesloading = loading));
    this.notificationPreferenceService
      .getUpdatePreferencesResultLoading()
      .subscribe(
        loading => (this.updateNotificationPreferencesLoading = loading)
      );
    this.notificationPreferenceService.loadPreferences();
  }

  updatePreference(preference: NotificationPreference) {
    const updatedPreferences = [];
    this.notificationPreferenceService
      .getPreferences()
      .subscribe(preferences => {
        preferences.forEach(p => {
          if (p.channel === preference.channel) {
            updatedPreferences.push({
              ...p,
              enabled: !p.enabled,
            });
          } else {
            updatedPreferences.push(p);
          }
        });
      })
      .unsubscribe();
    this.notificationPreferenceService.updatePreferences(updatedPreferences);
  }
}
