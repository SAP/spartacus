import { Component, OnInit } from '@angular/core';
import {
  NotificationPreference,
  UserNotificationPreferenceService,
} from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-notification-preference',
  templateUrl: './notification-preference.component.html',
  styleUrls: ['./notification-preference.component.scss'],
})
export class NotificationPreferenceComponent implements OnInit {
  preferences$: Observable<NotificationPreference[]>;
  getNotificationPreferencesloading$: Observable<boolean>;
  updateNotificationPreferencesLoading$: Observable<boolean>;

  constructor(
    private notificationPreferenceService: UserNotificationPreferenceService
  ) {}

  ngOnInit() {
    this.preferences$ = this.notificationPreferenceService.getPreferences();
    this.getNotificationPreferencesloading$ = this.notificationPreferenceService.getPreferencesLoading();
    this.updateNotificationPreferencesLoading$ = this.notificationPreferenceService.getUpdatePreferencesResultLoading();
    this.notificationPreferenceService.loadPreferences();
  }

  updatePreference(preference: NotificationPreference) {
    
    const updatedPreferences = [];
    this.notificationPreferenceService.getPreferences().subscribe(preferences=>{preferences.forEach(p => {
      if (p.channel === preference.channel) {
        updatedPreferences.push({
          ...p,
          enabled: !p.enabled,
        });
      } else {
        updatedPreferences.push(p);
      }
    });});
    this.notificationPreferenceService.updatePreferences(updatedPreferences);
  }
}
