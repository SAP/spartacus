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
import {
  Pipe,
  PipeTransform,
  Component,
  DebugElement,
  ViewChild,
} from '@angular/core';
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

@Component({
  template: `
    <cx-stock-notification
      [productStockLevelStatus]="outOfStock"
      [productCode]="product?.code"
    >
    </cx-stock-notification>
  `,
})
class MockedProductSummaryComponent {
  productStockLevelStatus = 'outOfStock';
  productCode = '123';

  @ViewChild('StockNotificationComponent', { static: false })
  stockNotificationComponent: StockNotificationComponent;
}

describe('StockNotificationComponent', () => {
  let component: MockedProductSummaryComponent;
  let fixture: ComponentFixture<MockedProductSummaryComponent>;
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
        MockedProductSummaryComponent,
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

    fixture = TestBed.createComponent(MockedProductSummaryComponent);
    component.productStockLevelStatus = 'outOfStock';
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should not show element for out of stock product', () => {
    component.productOutOfStock = 'inStock';
    fixture.detectChanges();

    expect(el.query(By.css('.cx-stock-notification')).children).toBeNull();
  });

  it('should show component for anonymous', () => {
    authService.getUserToken.and.returnValue(of({}));
    fixture.detectChanges();

    expect(
      el.query(By.css('[data-test]="link-setchannel"')).nativeElement
    ).toBeTruthy();
    expect(
      el.query(By.css('[data-test]="note-setchannel')).nativeElement
    ).toBeTruthy();
    expect(
      el.query(By.css('[data-test]="btn-notify"')).nativeElement.disabled
    ).toEqual(true);
  });

  it('should show component for login customer without setting notification channel', () => {
    userService.getNotificationPreferences.and.returnValue(of([]));
    fixture.detectChanges();

    expect(
      el.query(By.css('[data-test]="link-setchannel"')).nativeElement
    ).toBeTruthy();
    expect(
      el.query(By.css('[data-test]="note-setchannel"')).nativeElement
    ).toBeTruthy();
    expect(
      el.query(By.css('[data-test]="btn-notify"')).nativeElement.disabled
    ).toEqual(true);
  });

  it('should be able to show dialog for create stock notification for login user with channel set', () => {
    fixture.detectChanges();

    const button = el.query(By.css('[data-test="btn-notify"]')).nativeElement;
    button.click();

    expect(productInterestService.createBackInStock).toHaveBeenCalled();
    expect(ngbModal.open).toHaveBeenCalled();
  });

  it('should show loading when delete stock notification for login user with channel set', () => {
    productInterestService.getBackInStockSubscribed.and.returnValue(of(true));
    productInterestService.getDeleteBackInStockLoading.and.returnValue(
      cold('-a|', { a: true })
    );
    fixture.detectChanges();
    const button = el.query(By.css('[data-test="btn-notnotify"]'))
      .nativeElement;
    button.click();

    getTestScheduler().flush();
    fixture.detectChanges();

    expect(button.disabled).toEqual(true);
    expect(el.query(By.css('.cx-spinner'))).toBeTruthy();
  });

  it('should show global message when delete stock notification success for login user with channel set', () => {
    productInterestService.getBackInStockSubscribed.and.returnValue(of(true));
    productInterestService.getDeleteBackInStockSuccess.and.returnValue(
      cold('-b|', { a: true })
    );
    fixture.detectChanges();

    const button = el.query(By.css('[data-test="btn-notnotify"]'))
      .nativeElement;
    button.click();
    getTestScheduler().flush();
    fixture.detectChanges();

    expect(globalMessageService.add).toHaveBeenCalled();
  });

  it('should be able to unsubscribeand reset the state in destory', () => {
    const subscriptions = component.stockNotificationComponent['subscription'];

    component.stockNotificationComponent.ngOnDestroy();

    expect(subscriptions.unsubscribe).toHaveBeenCalled();
    expect(productInterestService.resetBackInStock).toHaveBeenCalled();
  });
});
