import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationPreferenceComponent } from './notification-preference.component';
import {
  I18nTestingModule,
  UserService,
  AuthService,
  PageMetaService,
  UserToken,
  BasicNotificationPreferenceList,
  PageMeta,
} from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('NotificationPreferenceComponent', () => {
  let component: NotificationPreferenceComponent;
  let fixture: ComponentFixture<NotificationPreferenceComponent>;
  let el: DebugElement;

  const userService = jasmine.createSpyObj('UserService', [
    'getNotificationPreferences',
    'loadNotificationPreferences',
    'updateNotificationPreferences',
  ]);
  const authService = jasmine.createSpyObj('AuthService', ['getUserToken']);
  const pageMetaService = jasmine.createSpyObj('PageMetaService', ['getMeta']);

  const userToken: UserToken = {
    userId: 'test.user',
    access_token: '',
    token_type: '',
    refresh_token: '',
    expires_in: null,
    scope: [],
  };

  const notificationPreference: BasicNotificationPreferenceList = {
    preferences: [
      {
        channel: 'EMAIL',
        enabled: true,
        value: 'test.user@sap.com',
        visible: true,
      },
      {
        channel: 'SMS',
        enabled: false,
        value: '01234567890',
        visible: true,
      },
    ],
  };

  const pageMeta: PageMeta = {
    title: 'Notification Preference',
    heading: 'Notification Preference',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, SpinnerModule],
      declarations: [NotificationPreferenceComponent],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: AuthService, useValue: authService },
        { provide: PageMetaService, useValue: pageMetaService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationPreferenceComponent);
    el = fixture.debugElement;
    component = fixture.componentInstance;

    userService.loadNotificationPreferences.and.stub();
    userService.updateNotificationPreferences.and.stub();
    authService.getUserToken.and.returnValue(of(userToken));
    pageMetaService.getMeta.and.returnValue(of(pageMeta));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show page header', () => {
    userService.getNotificationPreferences.and.returnValue(
      of(notificationPreference)
    );
    fixture.detectChanges();
    expect(el.query(By.css('h3')).nativeElement.innerHTML).toEqual(
      pageMeta.heading
    );
  });

  it('should show channels', () => {
    userService.getNotificationPreferences.and.returnValue(
      of(notificationPreference)
    );
    fixture.detectChanges();
    expect(
      el.queryAll(By.css('[data-channel="text"]')).length ===
        notificationPreference.preferences.length
    ).toBeTruthy();
  });

  it('should show notes', () => {
    userService.getNotificationPreferences.and.returnValue(
      of(notificationPreference)
    );
    fixture.detectChanges();
    expect(el.query(By.css('[data-channel="notes"]'))).toBeTruthy();
  });

  it('should show spinner when loading', () => {
    userService.getNotificationPreferences.and.returnValue(of());
    fixture.detectChanges();
    expect(el.query(By.css('.cx-spinner'))).toBeTruthy();
  });

  it('should be able to enable or disable a channel', () => {
    userService.getNotificationPreferences.and.returnValue(
      of(notificationPreference)
    );
    const updatedPrefs = { ...notificationPreference };
    fixture.detectChanges();
    const channelEls = el.queryAll(By.css('[data-channel="channel"]'));
    for (let i = 0; i < channelEls.length; i++) {
      const channelEl = channelEls[i];
      channelEl.nativeElement.click();
      expect(
        channelEl.nativeElement.checked ===
          !notificationPreference.preferences[i].enabled
      ).toBeTruthy();
      updatedPrefs.preferences[i].enabled = !notificationPreference.preferences[
        i
      ].enabled;
      expect(userService.updateNotificationPreferences).toHaveBeenCalledWith(
        userToken.userId,
        updatedPrefs
      );
    }
  });
});
