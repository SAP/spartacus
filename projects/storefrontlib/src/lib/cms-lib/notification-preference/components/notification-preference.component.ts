import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AuthService,
  NotificationPreferenceService,
  PageMetaService,
  PageMeta,
} from '@spartacus/core';
import { map, filter } from 'rxjs/operators';
@Component({
  selector: 'cx-notification-preference',
  templateUrl: './notification-preference.component.html',
  styleUrls: ['./notification-preference.component.scss'],
})
export class NotificationPreferenceComponent implements OnInit {
  notificationPreferenceList$: Observable<any>;
  userId: string;
  preferences: any;
  loaded: boolean;

  constructor(
    private notificationPreferenceService: NotificationPreferenceService,
    private authService: AuthService,
    protected pageMetaService: PageMetaService
  ) {}

  ngOnInit() {
    this.authService.getUserToken().subscribe(token => {
      this.userId = token.userId;
    });

    this.getNotificationPreferences();
  }

  getNotificationPreferences() {
    this.notificationPreferenceList$ = this.notificationPreferenceService.getNotificationPreference(
      this.userId
    );
  }

  updateNotificationPreferences(preference: any) {
    preference.enabled = !preference.enabled;
    const list: any = {
      preferences: [
        {
          channel: preference.channel,
          enabled: preference.enabled,
        },
      ],
    };
    console.log(JSON.stringify(list));
    this.notificationPreferenceService
      .updateNotificationPreference(this.userId, list)
      .subscribe();
  }

  get title$(): Observable<string> {
    return this.pageMetaService.getMeta().pipe(
      filter(Boolean),
      map((meta: PageMeta) => meta.heading || meta.title)
    );
  }
}
