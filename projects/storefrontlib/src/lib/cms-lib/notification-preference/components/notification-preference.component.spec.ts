import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { of } from 'rxjs';
import {
  AuthService,
  UserToken,
  PageMetaService,
  PageMeta,
  PageRobotsMeta,
  UserService,
  BasicNotificationPreferenceList,
} from '@spartacus/core';
import { NotificationPreferenceComponent } from './notification-preference.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

describe('NotificationPreferenceComponent', () => {
  let component: NotificationPreferenceComponent;
  let fixture: ComponentFixture<NotificationPreferenceComponent>;
  let initialNotificationPreferenceList: BasicNotificationPreferenceList = {
    preferences: [],
  };
  const getSpinner = () => fixture.debugElement.query(By.css('cx-spinner'));

  let userService = jasmine.createSpyObj('UserService', [
    'getNotificationPreferences',
    'loadNotificationPreferences',
    'updateNotificationPreferences',
  ]);
  const authService = jasmine.createSpyObj('AuthService', ['getUserToken']);
  const pageMetaService = jasmine.createSpyObj('PageMetaService', ['getMeta']);

  userService.getNotificationPreferences.and.returnValue(
    of(initialNotificationPreferenceList)
  );
  authService.getUserToken.and.returnValue(of({ userId: 'test' } as UserToken));
  pageMetaService.getMeta.and.returnValue(
    of(<PageMeta>{
      title: 'Test title',
      description: 'Test description',
      robots: [PageRobotsMeta.INDEX, PageRobotsMeta.FOLLOW],
    })
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationPreferenceComponent, MockSpinnerComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: PageMetaService, useValue: pageMetaService },
        {
          provide: UserService,
          useValue: userService,
        },
      ],
    }).compileComponents();
    userService = TestBed.get(UserService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to show page title', () => {
    let title: string;
    component.title$
      .subscribe(value => {
        title = value;
      })
      .unsubscribe();
    const h3: HTMLElement = fixture.debugElement.nativeElement.querySelector(
      'h3'
    );
    expect(title).toEqual('Test title');
    expect(h3.textContent).toContain(title);
  });

  it('should be able to show notification preferences when data not exist', () => {
    let notificationPreferences: BasicNotificationPreferenceList;
    let span: HTMLElement;
    userService.getNotificationPreferences.and.returnValue(
      of(initialNotificationPreferenceList)
    );

    fixture.detectChanges();
    component.basicNotificationPreferenceList$
      .subscribe(value => {
        notificationPreferences = value;
      })
      .unsubscribe();
    span = fixture.debugElement.nativeElement.querySelector(
      '.cx-notification-preference-span'
    );
    expect(notificationPreferences).toEqual(initialNotificationPreferenceList);
    expect(span).toBeNull();
  });

  it('should be able to show notification preferences when data exist', () => {
    initialNotificationPreferenceList = {
      preferences: [
        {
          channel: 'EMAIL',
          enabled: true,
          value: 'test@sap.com',
        },
        {
          channel: 'SMS',
          enabled: false,
          value: '13800000831',
        },
      ],
    };
    let notificationPreferences: BasicNotificationPreferenceList;
    userService.getNotificationPreferences.and.returnValue(
      of(initialNotificationPreferenceList)
    );
    component.ngOnInit();
    fixture.detectChanges();
    const spans = fixture.debugElement.queryAll(
      By.css('.cx-notification-preference-span')
    );
    const inputs = fixture.debugElement.queryAll(By.css('.form-toggle-input'));
    component.basicNotificationPreferenceList$
      .subscribe(value => (notificationPreferences = value))
      .unsubscribe();
    expect(notificationPreferences).toEqual(initialNotificationPreferenceList);
    expect(spans.length).toBe(2);
    expect(spans[0].nativeElement.textContent).toContain('EMAIL: test@sap.com');
    expect(spans[1].nativeElement.textContent).toContain('SMS: 13800000831');
    expect(inputs.length).toBe(2);
    expect(inputs[0].nativeElement.checked).toEqual(true);
    expect(inputs[1].nativeElement.checked).toEqual(false);
  });

  it('should be able to update notification preferences', () => {
    initialNotificationPreferenceList = {
      preferences: [
        {
          channel: 'EMAIL',
          enabled: true,
          value: 'test@sap.com',
        },
        {
          channel: 'SMS',
          enabled: false,
          value: '13800000831',
        },
      ],
    };
    let notificationPreferences: BasicNotificationPreferenceList;
    userService.getNotificationPreferences.and.returnValue(
      of(initialNotificationPreferenceList)
    );
    userService.updateNotificationPreferences.and.callFake(
      (_userId: string, preference: BasicNotificationPreferenceList) => {
        component.basicNotificationPreferenceList = preference;
      }
    );
    component.ngOnInit();
    fixture.detectChanges();

    const spans = fixture.debugElement.queryAll(
      By.css('.cx-notification-preference-span')
    );
    component.basicNotificationPreferenceList$
      .subscribe(value => (notificationPreferences = value))
      .unsubscribe();
    expect(notificationPreferences).toEqual(initialNotificationPreferenceList);
    expect(spans.length).toBe(2);

    const labels = fixture.debugElement.queryAll(
      By.css('.form-toggle__switch')
    );
    labels[0].nativeElement.click();
    labels[1].nativeElement.click();

    fixture.detectChanges();
    expect(spans.length).toBe(2);
    expect(spans[0].nativeElement.textContent).toContain('EMAIL: test@sap.com');
    expect(spans[1].nativeElement.textContent).toContain('SMS: 13800000831');

    expect(
      component.basicNotificationPreferenceList.preferences[0].enabled
    ).toEqual(false);
    expect(
      component.basicNotificationPreferenceList.preferences[1].enabled
    ).toEqual(true);
  });

  it('should be able to update notification preferences by multiple clicking', () => {
    initialNotificationPreferenceList = {
      preferences: [
        {
          channel: 'EMAIL',
          enabled: true,
          value: 'test@sap.com',
        },
      ],
    };
    userService.getNotificationPreferences.and.returnValue(
      of(initialNotificationPreferenceList)
    );
    userService.updateNotificationPreferences.and.callFake(
      (_userId: string, preference: BasicNotificationPreferenceList) => {
        component.basicNotificationPreferenceList = preference;
      }
    );
    component.ngOnInit();
    fixture.detectChanges();

    const labels = fixture.debugElement.queryAll(
      By.css('.form-toggle__switch')
    );
    expect(labels.length).toBe(1);

    labels[0].nativeElement.click();
    fixture.detectChanges();
    expect(
      component.basicNotificationPreferenceList.preferences[0].enabled
    ).toEqual(false);
    labels[0].nativeElement.click();
    fixture.detectChanges();
    expect(
      component.basicNotificationPreferenceList.preferences[0].enabled
    ).toEqual(true);
    labels[0].nativeElement.click();
    fixture.detectChanges();
    expect(
      component.basicNotificationPreferenceList.preferences[0].enabled
    ).toEqual(false);
    labels[0].nativeElement.click();
    fixture.detectChanges();
    expect(
      component.basicNotificationPreferenceList.preferences[0].enabled
    ).toEqual(true);
    labels[0].nativeElement.click();
    fixture.detectChanges();
    expect(
      component.basicNotificationPreferenceList.preferences[0].enabled
    ).toEqual(false);
  });

  it('should render "Spinner" when notification preferences are loading', fakeAsync(() => {
    component.basicNotificationPreferenceList$ = of(
      initialNotificationPreferenceList
    ).pipe(delay(10000));
    fixture.detectChanges();
    expect(getSpinner()).toBeTruthy();
    tick(10000);
    fixture.detectChanges();
    expect(getSpinner()).toBeFalsy();
  }));
});
