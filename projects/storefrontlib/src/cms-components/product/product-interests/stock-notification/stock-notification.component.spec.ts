import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  I18nTestingModule,
  ProductInterestService,
  AuthService,
  UserService,
  TranslationService,
  GlobalMessageService,
  OccConfig,
  BasicNotificationPreferenceList,
} from '@spartacus/core';
import { Pipe, PipeTransform, Component, DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { StockNotificationComponent } from './stock-notification.component';
import { of } from 'rxjs';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';
import { By } from '@angular/platform-browser';
import { cold, getTestScheduler } from 'jasmine-marbles';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
    media: {
      baseUrl: '',
    },
  },
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockCxSpinnerComponent {}

describe('StockNotificationComponent', () => {
  let component: StockNotificationComponent;
  let fixture: ComponentFixture<StockNotificationComponent>;
  let el: DebugElement;
  let modalInstance: any;

  const ngbModal = jasmine.createSpyObj('NgbModal', ['open']);
  const userService = jasmine.createSpyObj('UserService', [
    'getNotificationPreferences',
  ]);
  const translationService = jasmine.createSpyObj('TranslationService', [
    'translate',
  ]);
  const globalMessageService = jasmine.createSpyObj('GlobalMessageService', [
    'add',
  ]);
  const notificationDialogComponent = jasmine.createSpy(
    'NotificationDialogComponent'
  );
  const authService = jasmine.createSpyObj('AuthService', ['getUserToken']);
  const productInterestService = jasmine.createSpyObj(
    'ProductInterestService',
    [
      'loadProductInterests',
      'getProdutInterests',
      'getProdutInterestsLoaded',
      'getBackInStockSubscribed',
      'loadBackInStockSubscribed',
      'deleteBackInStock',
      'createBackInStock',
      'resetBackInStock',
      'getDeleteBackInStockSuccess',
      'getDeleteBackInStockFail',
      'getDeleteBackInStockLoading',
      'getCreateBackInStockSuccess',
      'resetDeleteState',
      'resetCreateState',
    ]
  );
  const basicNotificationPreferenceList: BasicNotificationPreferenceList = {
    preferences: [
      {
        channel: 'EMAIL',
        enabled: true,
        value: 'test@sap.com',
        visible: true,
      },
      {
        channel: 'SITE_MESSAGE',
        enabled: true,
        value: '',
        visible: true,
      },
    ],
  };

  const userToken = {
    access_token: 'xxx',
    token_type: 'bearer',
    refresh_token: 'xxx',
    expires_in: 1000,
    scope: ['xxx'],
    userId: 'xxx',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
      declarations: [
        StockNotificationComponent,
        MockUrlPipe,
        MockCxSpinnerComponent,
        NotificationDialogComponent,
      ],
      providers: [
        { provide: AuthService, useValue: authService },
        {
          provide: ProductInterestService,
          useValue: productInterestService,
        },
        {
          provide: UserService,
          useValue: userService,
        },
        { provide: TranslationService, useValue: translationService },
        { provide: GlobalMessageService, useValue: globalMessageService },
        { provide: OccConfig, useValue: MockOccModuleConfig },
        {
          provide: NotificationDialogComponent,
          useValue: notificationDialogComponent,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    authService.getUserToken.and.returnValue(of({ userToken }));
    userService.getNotificationPreferences.and.returnValue(
      of(basicNotificationPreferenceList)
    );
    productInterestService.getBackInStockSubscribed.and.returnValue(of(false));
    ngbModal.open.and.returnValue(of(modalInstance));

    fixture = TestBed.createComponent(StockNotificationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show disabled button and link for login custom without channel set', () => {
    userService.getNotificationPreferences.and.returnValue(of([]));
    fixture.detectChanges();

    expect(
      el.query(By.css('[data-test]="stocknotify-link"')).nativeElement
    ).toBeTruthy();
    expect(
      el.query(By.css('[data-test]="stocknotify-note"')).nativeElement
    ).toBeTruthy();
    expect(
      el.query(By.css('[data-test]="stocknotify-button"')).nativeElement
        .disabled
    ).toEqual(true);
  });

  it('should show disabled button and link for anonymous', () => {
    authService.getUserToken.and.returnValue(of({}));
    fixture.detectChanges();

    expect(
      el.query(By.css('[data-test]="stocknotify-link"')).nativeElement
    ).toBeTruthy();
    expect(
      el.query(By.css('[data-test]="stocknotify-note"')).nativeElement
    ).toBeTruthy();
    expect(
      el.query(By.css('[data-test]="stocknotify-button"')).nativeElement
        .disabled
    ).toEqual(true);
  });

  it('should show loading when delete stock notification', () => {
    productInterestService.getBackInStockSubscribed.and.returnValue(of(true));
    productInterestService.getDeleteBackInStockLoading.and.returnValue(
      cold('-a|', { a: true })
    );
    fixture.detectChanges();
    const button = el.query(By.css('[data-test="stocknotify-button"]'))
      .nativeElement;
    button.click();

    getTestScheduler().flush();

    expect(button.disabled).toEqual(true);
    expect(el.query(By.css('.cx-spinner'))).toBeTruthy();
  });

  it('should show global message when delete stock notification', () => {
    productInterestService.getBackInStockSubscribed.and.returnValue(of(true));
    productInterestService.getDeleteBackInStockSuccess.and.returnValue(
      cold('-b|', { a: true })
    );
    fixture.detectChanges();
    const button = el.query(By.css('[data-test="stocknotify-button"]'))
      .nativeElement;
    button.click();

    expect(productInterestService.deleteBackInStock).toHaveBeenCalled();

    getTestScheduler().flush();

    expect(ngbModal.open).not.toHaveBeenCalled();
    expect(globalMessageService.add).toHaveBeenCalled();
  });

  it('should show global message when delete stock notification success', () => {
    productInterestService.getBackInStockSubscribed.and.returnValue(of(true));
    productInterestService.getDeleteBackInStockSuccess.and.returnValue(
      cold('-b|', { a: true })
    );
    fixture.detectChanges();
    const button = el.query(By.css('[data-test="stocknotify-button"]'))
      .nativeElement;
    button.click();

    getTestScheduler().flush();

    expect(ngbModal.open).not.toHaveBeenCalled();
    expect(globalMessageService.add).toHaveBeenCalled();
  });

  it('should be able to show dialog and global message for create stock notification', () => {
    fixture.detectChanges();

    const button = el.query(By.css('[data-test="stocknotify-button"]'))
      .nativeElement;
    button.click();
    fixture.detectChanges();

    expect(productInterestService.createBackInStock).toHaveBeenCalled();
    expect(ngbModal.open).toHaveBeenCalled();
    expect(globalMessageService.add).not.toHaveBeenCalled();
  });

  it('should be able to unsubscribe/rest in destory', () => {
    const subscriptions = component['subscription'];
    fixture.detectChanges();

    component.ngOnDestroy();

    expect(subscriptions.unsubscribe).toHaveBeenCalled();
    expect(productInterestService.resetBackInStock).toHaveBeenCalled();
  });
});
