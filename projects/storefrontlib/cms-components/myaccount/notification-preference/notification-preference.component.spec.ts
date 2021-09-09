import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationPreferenceComponent } from './notification-preference.component';
import {
  I18nTestingModule,
  NotificationPreference,
  UserNotificationPreferenceService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { cold, getTestScheduler } from 'jasmine-marbles';

@Component({
  selector: 'cx-spinner',
  template: ` <div>spinner</div> `,
})
class MockCxSpinnerComponent {}

describe('NotificationPreferenceComponent', () => {
  let component: NotificationPreferenceComponent;
  let fixture: ComponentFixture<NotificationPreferenceComponent>;
  let el: DebugElement;

  const notificationPreferenceService = jasmine.createSpyObj(
    'UserNotificationPreferenceService',
    [
      'getPreferences',
      'loadPreferences',
      'getPreferencesLoading',
      'updatePreferences',
      'getUpdatePreferencesResultLoading',
      'resetNotificationPreferences',
    ]
  );

  const notificationPreference: NotificationPreference[] = [
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
  ];

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [NotificationPreferenceComponent, MockCxSpinnerComponent],
        providers: [
          {
            provide: UserNotificationPreferenceService,
            useValue: notificationPreferenceService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationPreferenceComponent);
    el = fixture.debugElement;
    component = fixture.componentInstance;

    notificationPreferenceService.loadPreferences.and.stub();
    notificationPreferenceService.updatePreferences.and.stub();
    notificationPreferenceService.getPreferences.and.returnValue(
      of(notificationPreference)
    );
    notificationPreferenceService.getPreferencesLoading.and.returnValue(
      of(false)
    );
    notificationPreferenceService.getUpdatePreferencesResultLoading.and.returnValue(
      of(false)
    );
    notificationPreferenceService.resetNotificationPreferences.and.stub();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show channels', () => {
    fixture.detectChanges();
    expect(el.query(By.css('.pref-header'))).toBeTruthy();
    expect(el.query(By.css('.pref-note'))).toBeTruthy();
    expect(
      el.queryAll(By.css('.form-check-input')).length ===
        notificationPreference.length
    ).toBeTruthy();
    expect(
      el.queryAll(By.css('.pref-channel')).length ===
        notificationPreference.length
    ).toBeTruthy();
  });

  it('should show spinner when loading', () => {
    notificationPreferenceService.getPreferences.and.returnValue(of([]));
    fixture.detectChanges();
    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
  });

  it('should be able to disable a channel when get loading', () => {
    notificationPreferenceService.getUpdatePreferencesResultLoading.and.returnValue(
      of(false)
    );
    notificationPreferenceService.getPreferencesLoading.and.returnValue(
      cold('-a|', { a: true })
    );
    fixture.detectChanges();

    const cheboxies = el.queryAll(By.css('.form-check-input'));
    expect(cheboxies.length).toEqual(notificationPreference.length);
    const chx = cheboxies[0].nativeElement;
    chx.click();

    getTestScheduler().flush();
    fixture.detectChanges();

    expect(notificationPreferenceService.updatePreferences).toHaveBeenCalled();
    expect(chx.disabled).toEqual(true);
  });

  it('should be able to disable a channel when update loading', () => {
    notificationPreferenceService.getPreferencesLoading.and.returnValue(
      of(false)
    );
    notificationPreferenceService.getUpdatePreferencesResultLoading.and.returnValue(
      cold('-a|', { a: true })
    );
    fixture.detectChanges();

    const cheboxies = el.queryAll(By.css('.form-check-input'));
    expect(cheboxies.length).toEqual(notificationPreference.length);
    const chx = cheboxies[0].nativeElement;
    chx.click();

    getTestScheduler().flush();
    fixture.detectChanges();

    expect(notificationPreferenceService.updatePreferences).toHaveBeenCalled();
    expect(chx.disabled).toEqual(true);
  });
});
