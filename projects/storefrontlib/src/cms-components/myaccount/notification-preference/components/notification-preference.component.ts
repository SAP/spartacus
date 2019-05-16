import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AuthService,
  UserService,
  PageMetaService,
  PageMeta,
  BasicNotificationPreferenceList,
  BasicNotificationPreference,
} from '@spartacus/core';
import { map, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-notification-preference',
  templateUrl: './notification-preference.component.html',
  styleUrls: ['./notification-preference.component.scss'],
})
export class NotificationPreferenceComponent implements OnInit {
  basicNotificationPreferenceList$: Observable<BasicNotificationPreferenceList>;
  basicNotificationPreferenceList: BasicNotificationPreferenceList;
  userId: string;
  preferences: any;

  constructor(
    private userService: UserService,
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
    this.basicNotificationPreferenceList$ = this.userService
      .getNotificationPreferences()
      .pipe(tap(value => (this.basicNotificationPreferenceList = value)));
    this.userService.loadNotificationPreferences(this.userId);
  }

  updateNotificationPreferences(preference: BasicNotificationPreference) {
    const basicNotificationPreferenceList: BasicNotificationPreferenceList = {
      preferences: [],
    };
    this.basicNotificationPreferenceList.preferences.forEach(p => {
      if (p.channel === preference.channel) {
        basicNotificationPreferenceList.preferences.push({
          channel: p.channel,
          enabled: !p.enabled,
          value: p.value,
          visible: p.visible,
        });
      } else {
        basicNotificationPreferenceList.preferences.push(p);
      }
    });
    this.userService.updateNotificationPreferences(
      this.userId,
      basicNotificationPreferenceList
    );
  }

  get title$(): Observable<string> {
    return this.pageMetaService.getMeta().pipe(
      filter(Boolean),
      map((meta: PageMeta) => meta.heading || meta.title)
    );
  }
}
