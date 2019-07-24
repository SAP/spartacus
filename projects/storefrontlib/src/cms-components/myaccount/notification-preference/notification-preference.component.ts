import { Component, OnInit } from '@angular/core';
import {
  NotificationPreference,
  UserNotificationPreferenceService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-notification-preference',
  templateUrl: './notification-preference.component.html',
  styleUrls: ['./notification-preference.component.scss'],
})
export class NotificationPreferenceComponent implements OnInit {
  preferences$: Observable<NotificationPreference[]>;
  loading$: Observable<boolean>;
  updateResultLoading$: Observable<boolean>;
  preferences: NotificationPreference[];

  constructor(
    private notificationPreferenceService: UserNotificationPreferenceService
  ) {}

  ngOnInit() {
    this.preferences$ = this.notificationPreferenceService
      .getPreferences()
      .pipe(tap(preferences => (this.preferences = preferences)));
    this.loading$ = this.notificationPreferenceService.getPreferencesLoading();
    this.updateResultLoading$ = this.notificationPreferenceService.getUpdatePreferencesResultLoading();
    this.notificationPreferenceService.loadPreferences();
  }

  updatePreference(preference: NotificationPreference) {
    const updatedPreferences = [];
    this.preferences.forEach(p => {
      if (p.channel === preference.channel) {
        updatedPreferences.push({
          ...p,
          enabled: !p.enabled,
        });
      } else {
        updatedPreferences.push(p);
      }
    });
    this.notificationPreferenceService.updatePreferences(updatedPreferences);
  }
}
