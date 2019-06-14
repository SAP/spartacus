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
import { Pipe, PipeTransform, Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { StockNotificationComponent } from './stock-notification.component';
import { of } from 'rxjs';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { By } from '@angular/platform-browser';

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

class MockNgbActiveModal {
  dismiss(): void {}
  close(): void {}
}

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockCxSpinnerComponent {}

describe('StockNotificationComponent', () => {
  let component: StockNotificationComponent;
  let fixture: ComponentFixture<StockNotificationComponent>;

  const userToken = {
    access_token: 'xxx',
    token_type: 'bearer',
    refresh_token: 'xxx',
    expires_in: 1000,
    scope: ['xxx'],
    userId: 'xxx',
  };

  const userNotExist = {
    access_token: '',
    token_type: '',
    refresh_token: '',
    expires_in: 1000,
    scope: [''],
    userId: '',
  };

  let userService = jasmine.createSpyObj('UserService', [
    'getNotificationPreferences',
  ]);
  const translationService = jasmine.createSpyObj('TranslationService', [
    'translate',
  ]);
  translationService.translate.and.returnValue(of('test'));
  const globalMessageService = jasmine.createSpyObj('GlobalMessageService', [
    'add',
  ]);
  const notificationDialogComponent = jasmine.createSpy(
    'NotificationDialogComponent'
  );

  let authService = jasmine.createSpyObj('AuthService', ['getUserToken']);
  let productInterestService = jasmine.createSpyObj('ProductInterestService', [
    'loadProductInterests',
    'getProdutInterests',
    'getProdutInterestsLoaded',
    'getBackInStockSubscribed',
    'loadBackInStockSubscribed',
    'deleteBackInStock',
    'createBackInStock',
    'resetBackInStock',
    'getDeleteBackInStockSuccess',
    'getDeleteBackInStockLoading',
    'getCreateBackInStockSuccess',
    'resetDeleteState',
    'resetCreateState',
  ]);

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
        {
          provide: NgbActiveModal,
          useClass: MockNgbActiveModal,
        },
      ],
    }).compileComponents();

    authService = TestBed.get(AuthService);
    productInterestService = TestBed.get(ProductInterestService);
    userService = TestBed.get(UserService);

    authService.getUserToken.and.returnValue(of(userToken));
    productInterestService.getBackInStockSubscribed.and.stub();
    productInterestService.getCreateBackInStockSuccess.and.stub();
    productInterestService.loadBackInStockSubscribed.and.stub();
    productInterestService.getDeleteBackInStockSuccess.and.returnValue(
      of(true)
    );
    productInterestService.getDeleteBackInStockLoading.and.stub();
    productInterestService.createBackInStock.and.stub();
    productInterestService.resetBackInStock.and.stub();
    productInterestService.deleteBackInStock.and.stub();

    userService.getNotificationPreferences.and.returnValue(of({}));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fdescribe('Methods test', () => {
    describe('ngOnInit', () => {
      it('should not load stock notificaiton data, when customer is not login', () => {
        authService.getUserToken.and.returnValue(of({}));
        component.ngOnInit();
        component.logged$.subscribe(x => expect(x).toBeFalsy());
      });

      it('should load stock notification data , when customer is login', () => {
        authService.getUserToken.and.returnValue(of({ userToken }));
        component.logged$.subscribe(x => expect(x).toBeTruthy());
      });
    });

    describe('notify', () => {
      it('should create the product notification', () => {
        const notificationComponent = TestBed.createComponent(
          NotificationDialogComponent
        );
        notificationComponent.componentInstance.subscribeSuccess$ = of(true);
        notificationComponent.componentInstance.selectedChannels = [
          {
            channel: 'EMAIL',
            value: 'test@sap.com',
          },
          {
            channel: 'SMS',
            value: '13800000831',
          },
        ];
        spyOn(component['ngbModal'], 'open').and.returnValue(
          notificationComponent
        );
        component.notify();
        expect(productInterestService.createBackInStock).toHaveBeenCalled();
      });
    });

    describe('stopNotify', () => {
      it('should delete the product notification', () => {
        component.stopNotify();
        expect(productInterestService.deleteBackInStock).toHaveBeenCalled();
      });
    });

    describe('notificationPrefUrl', () => {
      it('should return the notification preferences endpoint URL', () => {
        component.userId = 'test@sap.com';
        expect(component.notificationPrefUrl).toEqual(
          '/users/test@sap.com/notificationpreferences'
        );
      });
    });

    describe('ngOnDestroy', () => {
      it('should call the methods unsubscribe and reset the processing states', () => {
        spyOn(component['subscription'], 'unsubscribe').and.stub();
        component.ngOnDestroy();
        expect(component['subscription'].unsubscribe).toHaveBeenCalled();
        expect(productInterestService.resetBackInStock).toHaveBeenCalled();
      });
    });
  });

  fdescribe('UI test', () => {
    it('should show notify me, when logged$ is true, subscribed$ is false, channelEnabled$ is true', () => {
      authService.getUserToken.and.returnValue(of(userToken));
      productInterestService.getBackInStockSubscribed.and.returnValue(
        of(false)
      );
      productInterestService.getDeleteBackInStockSuccess.and.returnValue(
        of(true)
      );
      spyOn(
        StockNotificationComponent.prototype as any,
        'onUnsubscribeSuccess'
      ).and.stub();
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
      userService.getNotificationPreferences.and.returnValue(
        of(basicNotificationPreferenceList)
      );

      component.ngOnInit();
      fixture.detectChanges();

      component.logged$.subscribe(x => expect(x).toEqual(true));
      component.subscribed$.subscribe(x => expect(x).toEqual(false));
      component.channelEnabled$.subscribe(x => expect(x).toEqual(true));

      const buttons = fixture.debugElement.queryAll(By.css('button'));
      expect(buttons[0].nativeElement.textContent).toContain(
        'stockNotification.notifyMe'
      );
    });

    it('should show active channel link, when logged$ is true, subscribed$ is false, channelEnabled$ is false', () => {
      authService.getUserToken.and.returnValue(of(userToken));
      productInterestService.getBackInStockSubscribed.and.returnValue(
        of(false)
      );
      productInterestService.getDeleteBackInStockSuccess.and.returnValue(
        of(true)
      );
      spyOn(
        StockNotificationComponent.prototype as any,
        'onUnsubscribeSuccess'
      ).and.stub();
      component.ngOnInit();
      fixture.detectChanges();

      component.logged$.subscribe(x => expect(x).toEqual(true));
      component.subscribed$.subscribe(x => expect(x).toEqual(false));
      component.channelEnabled$.subscribe(x => expect(x).toEqual(false));
      const ahrefs = fixture.debugElement.queryAll(By.css('a'));
      expect(ahrefs[0].nativeElement.textContent).toContain(
        'stockNotification.channelsLink'
      );
    });

    it('should show stop notify me, when logged$ is true, subscribed$ is true', () => {
      authService.getUserToken.and.returnValue(of(userToken));
      productInterestService.getBackInStockSubscribed.and.returnValue(of(true));
      productInterestService.getDeleteBackInStockLoading.and.returnValue(
        of(false)
      );
      component.ngOnInit();
      fixture.detectChanges();

      component.logged$.subscribe(x => expect(x).toEqual(true));
      component.subscribed$.subscribe(x => expect(x).toEqual(true));
      component.unsubscribeLoading$.subscribe(x => expect(x).toEqual(false));
      const buttons = fixture.debugElement.queryAll(By.css('button'));
      expect(buttons[0].nativeElement.textContent).toContain(
        'stockNotification.stopNotify'
      );
    });

    it('should show active channel link, when logged$ is false', () => {
      authService.getUserToken.and.returnValue(of({ userNotExist }));
      component.ngOnInit();
      fixture.detectChanges();

      component.logged$.subscribe(x => {
        expect(x).toEqual(false);
      });
      const ahrefs = fixture.debugElement.queryAll(By.css('a'));
      expect(ahrefs[0].nativeElement.textContent).toContain(
        'stockNotification.channelsLink'
      );
    });
  });
});
