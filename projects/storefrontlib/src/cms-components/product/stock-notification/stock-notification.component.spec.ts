import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockNotificationComponent } from './stock-notification.component';
import {
  I18nTestingModule,
  NotificationPreference,
  AuthService,
  GlobalMessageService,
  TranslationService,
  UserNotificationPreferenceService,
  ProductInterestSearchResult,
  NotificationType,
  OCC_USER_ID_CURRENT,
  Product,
  OCC_USER_ID_ANONYMOUS,
  UserInterestsService,
} from '@spartacus/core';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { StockNotificationDialogComponent } from './stock-notification-dialog/stock-notification-dialog.component';
import { CurrentProductService } from '../current-product.service';
import { ModalService, SpinnerModule } from '../../../shared';
import { of, Observable } from 'rxjs';
import { By } from '@angular/platform-browser';
import { cold, getTestScheduler } from 'jasmine-marbles';

describe('StockNotificationComponent', () => {
  let component: StockNotificationComponent;
  let fixture: ComponentFixture<StockNotificationComponent>;
  let el: DebugElement;

  const translationService = jasmine.createSpyObj('TranslationService', [
    'translate',
  ]);
  const modalService = jasmine.createSpyObj('ModalService', ['open']);
  const globalMessageService = jasmine.createSpyObj('GlobalMessageService', [
    'add',
  ]);
  const dialogComponent = jasmine.createSpy('StockNotificationDialogComponent');
  const authService = jasmine.createSpyObj('AuthService', ['getOccUserId']);
  const currentProductService = jasmine.createSpyObj('CurrentProductService', [
    'getProduct',
  ]);
  const notificationPrefService = jasmine.createSpyObj(
    'UserNotificationPreferenceService',
    ['loadPreferences', 'getEnabledPreferences']
  );
  const interestsService = jasmine.createSpyObj('interestsService', [
    'getAddProductInterestSuccess',
    'getRemoveProdutInterestLoading',
    'getRemoveProdutInterestSuccess',
    'resetRemoveInterestState',
    'addProductInterest',
    'removeProdutInterest',
    'getProdutInterests',
    'clearProductInterests',
  ]);

  const preferences: NotificationPreference[] = [
    {
      channel: 'EMAIL',
      enabled: true,
      value: 'test@sap.com',
      visible: true,
    },
  ];
  const interests: ProductInterestSearchResult = {
    results: [
      {
        product: {
          code: '7566514',
        },
        productInterestEntry: [
          {
            interestType: NotificationType.BACK_IN_STOCK,
          },
        ],
      },
    ],
  };
  const product: Product = {
    code: '7566514',
    stock: {
      stockLevelStatus: 'outOfStock',
    },
  };
  const modalInstance: {
    componentInstance?: {
      subscribeSuccess$?: Observable<boolean>;
      enabledPrefs?: NotificationPreference[];
    };
  } = {
    componentInstance: {},
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule, SpinnerModule],
      declarations: [
        StockNotificationComponent,
        StockNotificationDialogComponent,
      ],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: CurrentProductService, useValue: currentProductService },
        { provide: GlobalMessageService, useValue: globalMessageService },
        { provide: TranslationService, useValue: translationService },
        { provide: ModalService, useValue: modalService },
        {
          provide: UserNotificationPreferenceService,
          useValue: notificationPrefService,
        },
        {
          provide: StockNotificationDialogComponent,
          useValue: dialogComponent,
        },
        { provide: UserInterestsService, useValue: interestsService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    authService.getOccUserId.and.returnValue(of(OCC_USER_ID_CURRENT));
    notificationPrefService.loadPreferences.and.stub();
    notificationPrefService.getEnabledPreferences.and.returnValue(
      of(preferences)
    );
    currentProductService.getProduct.and.returnValue(of(product));
    interestsService.getProdutInterests.and.returnValue(of(interests));
    interestsService.getAddProductInterestSuccess.and.returnValue(of(false));
    interestsService.getRemoveProdutInterestLoading.and.returnValue(of(true));
    interestsService.getRemoveProdutInterestSuccess.and.returnValue(of(false));
    interestsService.addProductInterest.and.stub();
    interestsService.removeProdutInterest.and.stub();
    interestsService.clearProductInterests.and.stub();
    interestsService.resetRemoveInterestState.and.stub();
    modalService.open.and.returnValue(modalInstance);
    translationService.translate.and.returnValue(of(''));

    fixture = TestBed.createComponent(StockNotificationComponent);
    el = fixture.debugElement;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should not show element expcept out of stock product', () => {
    fixture.detectChanges();
    expect(el.query(By.css('button'))).toBeNull();
  });

  it('should show elements for anonymous specific', () => {
    authService.getOccUserId.and.returnValue(of(OCC_USER_ID_ANONYMOUS));
    fixture.detectChanges();

    expect(el.query(By.css('a')).nativeElement).toBeTruthy();
    expect(
      el.query(By.css('.stock-notification-notes')).nativeElement
    ).toBeTruthy();
    expect(el.query(By.css('.btn-notify')).nativeElement.disabled).toEqual(
      true
    );
  });

  it('should show correct elements for active customer without enabled preferences', () => {
    interestsService.getProdutInterests.and.returnValue(of({}));
    notificationPrefService.getEnabledPreferences.and.returnValue(of([]));
    fixture.detectChanges();

    expect(el.query(By.css('a')).nativeElement).toBeTruthy();
    expect(
      el.query(By.css('.stock-notification-notes')).nativeElement
    ).toBeTruthy();
    expect(el.query(By.css('.btn-notify')).nativeElement.disabled).toEqual(
      true
    );
  });

  it('should be able to show dialog for create stock notification for active user with channel set', () => {
    interestsService.getProdutInterests.and.returnValue(of({}));
    fixture.detectChanges();

    expect(
      el.query(By.css('.stock-notification-notes')).nativeElement
    ).toBeTruthy();
    const button = el.query(By.css('.btn-notify')).nativeElement;
    button.click();

    expect(modalService.open).toHaveBeenCalled();
    expect(interestsService.addProductInterest).toHaveBeenCalledWith(
      product.code,
      NotificationType.BACK_IN_STOCK
    );
  });

  it('should show global message when delete stock notification success for login user with channel set', () => {
    interestsService.getRemoveProdutInterestLoading.and.returnValue(of(false));
    interestsService.getRemoveProdutInterestSuccess.and.returnValue(
      cold('-a|', { a: true })
    );
    fixture.detectChanges();
    expect(
      el.query(By.css('.stock-notification-notes')).nativeElement
    ).toBeTruthy();
    const button = el.query(By.css('button')).nativeElement;
    button.click();
    getTestScheduler().flush();
    fixture.detectChanges();

    expect(globalMessageService.add).toHaveBeenCalled();
    expect(interestsService.removeProdutInterest).toHaveBeenCalled();
  });

  it('should be able to unsubscribe and reset the state in destory', () => {
    spyOn(component['subscription'], 'unsubscribe').and.stub();

    component.ngOnDestroy();

    expect(component['subscription'].unsubscribe).toHaveBeenCalled();
    expect(interestsService.clearProductInterests).toHaveBeenCalled();
  });
});
