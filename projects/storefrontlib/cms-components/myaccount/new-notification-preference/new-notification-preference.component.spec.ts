import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewNotificationPreferenceComponent } from './new-notification-preference.component';
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

describe('NewNotificationPreferenceComponent', () => {
  let component: NewNotificationPreferenceComponent;
  let fixture: ComponentFixture<NewNotificationPreferenceComponent>;
  let el: DebugElement;

  const newNotificationPreferenceService = jasmine.createSpyObj(
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

  const newNotificationPreference: NotificationPreference[] = [
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
        declarations: [
          NewNotificationPreferenceComponent,
          MockCxSpinnerComponent,
        ],
        providers: [
          {
            provide: UserNotificationPreferenceService,
            useValue: newNotificationPreferenceService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNotificationPreferenceComponent);
    el = fixture.debugElement;
    component = fixture.componentInstance;

    newNotificationPreferenceService.loadPreferences.and.stub();
    newNotificationPreferenceService.updatePreferences.and.stub();
    newNotificationPreferenceService.getPreferences.and.returnValue(
      of(newNotificationPreference)
    );
    newNotificationPreferenceService.getPreferencesLoading.and.returnValue(
      of(false)
    );
    newNotificationPreferenceService.getUpdatePreferencesResultLoading.and.returnValue(
      of(false)
    );
    newNotificationPreferenceService.resetNotificationPreferences.and.stub();
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
        newNotificationPreference.length
    ).toBeTruthy();
    expect(
      el.queryAll(By.css('.pref-channels')).length ===
        newNotificationPreference.length
    ).toBeTruthy();
  });

  it('should show spinner when loading', () => {
    newNotificationPreferenceService.getPreferences.and.returnValue(of([]));
    fixture.detectChanges();
    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
  });

  it('should be able to disable a channel when get loading', () => {
    newNotificationPreferenceService.getUpdatePreferencesResultLoading.and.returnValue(
      of(false)
    );
    newNotificationPreferenceService.getPreferencesLoading.and.returnValue(
      cold('-a|', { a: true })
    );
    fixture.detectChanges();

    const cheboxies = el.queryAll(By.css('.form-check-input'));
    expect(cheboxies.length).toEqual(newNotificationPreference.length);
    const chx = cheboxies[0].nativeElement;
    chx.click();

    getTestScheduler().flush();
    fixture.detectChanges();

    expect(
      newNotificationPreferenceService.updatePreferences
    ).toHaveBeenCalled();
    expect(chx.disabled).toEqual(true);
  });

  it('should be able to disable a channel when update loading', () => {
    newNotificationPreferenceService.getPreferencesLoading.and.returnValue(
      of(false)
    );
    newNotificationPreferenceService.getUpdatePreferencesResultLoading.and.returnValue(
      cold('-a|', { a: true })
    );
    fixture.detectChanges();

    const cheboxies = el.queryAll(By.css('.form-check-input'));
    expect(cheboxies.length).toEqual(newNotificationPreference.length);
    const chx = cheboxies[0].nativeElement;
    chx.click();

    getTestScheduler().flush();
    fixture.detectChanges();

    expect(
      newNotificationPreferenceService.updatePreferences
    ).toHaveBeenCalled();
    expect(chx.disabled).toEqual(true);
  });
});
