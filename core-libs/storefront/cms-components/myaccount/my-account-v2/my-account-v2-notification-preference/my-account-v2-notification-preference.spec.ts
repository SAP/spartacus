import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  FeatureDirective,
  MockTranslatePipe,
  NotificationPreference,
  TranslatePipe,
  UserNotificationPreferenceService,
} from '@spartacus/core';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { MockFeatureDirective } from '../../../../shared/test/mock-feature-directive';
import { of } from 'rxjs';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { MyAccountV2NotificationPreferenceComponent } from './my-account-v2-notification-preference.component';

@Component({
  selector: 'cx-spinner',
  template: ` <div>spinner</div> `,
})
class MockCxSpinnerComponent {}

describe('MyAccountV2NotificationPreferenceComponent', () => {
  let component: MyAccountV2NotificationPreferenceComponent;
  let fixture: ComponentFixture<MyAccountV2NotificationPreferenceComponent>;
  let el: DebugElement;

  const notificationPreferenceService = { getPreferences: vi.fn(), loadPreferences: vi.fn(), getPreferencesLoading: vi.fn(), updatePreferences: vi.fn(), getUpdatePreferencesResultLoading: vi.fn(), resetNotificationPreferences: vi.fn() };

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

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyAccountV2NotificationPreferenceComponent],
      providers: [
        {
          provide: UserNotificationPreferenceService,
          useValue: notificationPreferenceService,
        },
      ],
    })
      .overrideComponent(MyAccountV2NotificationPreferenceComponent, {
        remove: {
          imports: [TranslatePipe, SpinnerComponent, FeatureDirective],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockCxSpinnerComponent,
            MockFeatureDirective,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      MyAccountV2NotificationPreferenceComponent
    );
    el = fixture.debugElement;
    component = fixture.componentInstance;

    notificationPreferenceService.loadPreferences.mockImplementation(() => {});
    notificationPreferenceService.updatePreferences.mockImplementation(() => {});
    notificationPreferenceService.getPreferences.mockReturnValue(
      of(notificationPreference)
    );
    notificationPreferenceService.getPreferencesLoading.mockReturnValue(
      of(false)
    );
    notificationPreferenceService.getUpdatePreferencesResultLoading.mockReturnValue(
      of(false)
    );
    notificationPreferenceService.resetNotificationPreferences.mockImplementation(() => {});
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show channels', () => {
    fixture.detectChanges();
    expect(el.query(By.css('.header'))).toBeTruthy();
    expect(el.query(By.css('.pref-info'))).toBeTruthy();
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
    notificationPreferenceService.getPreferences.mockReturnValue(of([]));
    fixture.detectChanges();
    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
  });

  it('should be able to disable a channel when get loading', () => {
    notificationPreferenceService.getUpdatePreferencesResultLoading.mockReturnValue(
      of(false)
    );
    notificationPreferenceService.getPreferencesLoading.mockReturnValue(
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
    notificationPreferenceService.getPreferencesLoading.mockReturnValue(
      of(false)
    );
    notificationPreferenceService.getUpdatePreferencesResultLoading.mockReturnValue(
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
