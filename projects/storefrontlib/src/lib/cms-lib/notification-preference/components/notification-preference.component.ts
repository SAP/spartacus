import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AuthService,
  UserService,
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

  constructor(
    private userService: UserService,
    private authService: AuthService,
    protected pageMetaService: PageMetaService
  ) {}

  ngOnInit() {
    this.authService.getUserToken().subscribe(token => {
      this.userId = token.userId;
    });

    this.notificationPreferenceList$ = this.userService.getNotificationPreferences();
    this.userService.loadNotificationPreferences(this.userId);
  }

  updateNotificationPreferences(preference: any) {
    const list: any = {
      preferences: [
        {
          channel: preference.channel,
          enabled: !preference.enabled,
        },
      ],
    };

    this.userService.updateNotificationPreferences(this.userId, list);
    preference.enabled = !preference.enabled;
  }

  get title$(): Observable<string> {
    return this.pageMetaService.getMeta().pipe(
      filter(Boolean),
      map((meta: PageMeta) => meta.heading || meta.title)
    );
  }
}
