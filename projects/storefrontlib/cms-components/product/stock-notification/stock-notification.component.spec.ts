import {
  DebugElement,
  ElementRef,
  Pipe,
  PipeTransform,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  GlobalMessageService,
  I18nTestingModule,
  NotificationPreference,
  NotificationType,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
  Product,
  ProductInterestSearchResult,
  TranslationService,
  UserIdService,
  UserInterestsService,
  UserNotificationPreferenceService,
} from '@spartacus/core';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { CurrentProductService } from '../current-product.service';
import { StockNotificationDialogComponent } from './stock-notification-dialog/stock-notification-dialog.component';
import { StockNotificationComponent } from './stock-notification.component';

import { FocusDirective } from '@spartacus/storefront';
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
import { LAUNCH_CALLER } from '../../../layout/launch-dialog/config/index';
import { LaunchDialogService } from '../../../layout/launch-dialog/services/index';

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialog(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef
  ) {
    return EMPTY;
  }
  closeDialog(_reason: string): void {}
}

describe('StockNotificationComponent', () => {
  let component: StockNotificationComponent;
  let fixture: ComponentFixture<StockNotificationComponent>;
  let el: DebugElement;

  const translationService = jasmine.createSpyObj('TranslationService', [
    'translate',
  ]);
  const globalMessageService = jasmine.createSpyObj('GlobalMessageService', [
    'add',
  ]);
  const dialogComponent = jasmine.createSpy('StockNotificationDialogComponent');
  const userIdService = jasmine.createSpyObj('UserIdService', ['getUserId']);
  const currentProductService = jasmine.createSpyObj('CurrentProductService', [
    'getProduct',
  ]);
  const notificationPrefService = jasmine.createSpyObj(
    'UserNotificationPreferenceService',
    ['loadPreferences', 'getEnabledPreferences', 'clearPreferences']
  );
  const interestsService = jasmine.createSpyObj('interestsService', [
    'getAddProductInterestSuccess',
    'getRemoveProdutInterestLoading',
    'getRemoveProdutInterestSuccess',
    'getAddProductInterestError',
    'resetRemoveInterestState',
    'resetAddInterestState',
    'addProductInterest',
    'removeProdutInterest',
    'getProductInterests',
    'clearProductInterests',
    'loadProductInterests',
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

  const removeSuccess = new BehaviorSubject<boolean>(false);
  const addFail = new BehaviorSubject<boolean>(false);

  @Pipe({
    name: 'cxUrl',
  })
  class MockUrlPipe implements PipeTransform {
    transform(): any {}
  }

  let launchDialogService: LaunchDialogService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule, SpinnerModule],
      declarations: [
        StockNotificationComponent,
        StockNotificationDialogComponent,
        MockUrlPipe,
        FocusDirective,
        MockFeatureDirective,
      ],
      providers: [
        { provide: UserIdService, useValue: userIdService },
        { provide: CurrentProductService, useValue: currentProductService },
        { provide: GlobalMessageService, useValue: globalMessageService },
        { provide: TranslationService, useValue: translationService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
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
    console.log('Starting StockNotificationComponent test');
    userIdService.getUserId.and.returnValue(of(OCC_USER_ID_CURRENT));
    notificationPrefService.loadPreferences.and.stub();
    notificationPrefService.clearPreferences.and.stub();
    notificationPrefService.getEnabledPreferences.and.returnValue(
      of(preferences)
    );
    currentProductService.getProduct.and.returnValue(of(product));
    interestsService.getProductInterests.and.returnValue(of(interests));
    interestsService.getAddProductInterestSuccess.and.returnValue(of(false));
    interestsService.getAddProductInterestError.and.returnValue(addFail);
    interestsService.getRemoveProdutInterestLoading.and.returnValue(of(false));
    interestsService.getRemoveProdutInterestSuccess.and.returnValue(
      removeSuccess
    );
    interestsService.addProductInterest.and.stub();
    interestsService.removeProdutInterest.and.stub();
    interestsService.clearProductInterests.and.stub();
    interestsService.resetRemoveInterestState.and.stub();
    interestsService.loadProductInterests.and.stub();
    translationService.translate.and.returnValue(of(''));

    fixture = TestBed.createComponent(StockNotificationComponent);
    launchDialogService = TestBed.inject(LaunchDialogService);
    el = fixture.debugElement;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should not show element expcept out of stock product', () => {
    currentProductService.getProduct.and.returnValue(
      of({
        ...product,
        stock: {
          stockLevelStatus: 'inStock',
          stockLevel: 10,
        },
      })
    );
    fixture.detectChanges();
    expect(el.query(By.css('button'))).toBeNull();
  });

  it('should show elements for anonymous specific', () => {
    interestsService.getProductInterests.and.returnValue(of({}));
    notificationPrefService.getEnabledPreferences.and.returnValue(of([]));
    userIdService.getUserId.and.returnValue(of(OCC_USER_ID_ANONYMOUS));
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
    interestsService.getProductInterests.and.returnValue(of({}));
    notificationPrefService.getEnabledPreferences.and.returnValue(of([]));
    fixture.detectChanges();

    expect(el.query(By.css('a')).nativeElement).toBeTruthy();
    expect(
      el.query(By.css('.stock-notification-notes')).nativeElement
    ).toBeTruthy();
    expect(el.query(By.css('.btn-notify')).nativeElement.disabled).toEqual(
      false
    );
  });

  it('should be able to show dialog for create stock notification for active user with channel set', () => {
    spyOn(launchDialogService, 'openDialog').and.stub();

    interestsService.getProductInterests.and.returnValue(of({}));
    fixture.detectChanges();

    expect(
      el.query(By.css('.stock-notification-notes')).nativeElement
    ).toBeTruthy();
    const button = el.query(By.css('.btn-notify')).nativeElement;
    button.click();

    expect(launchDialogService.openDialog).toHaveBeenCalled();
    expect(interestsService.addProductInterest).toHaveBeenCalledWith(
      product.code,
      NotificationType.BACK_IN_STOCK
    );
  });

  it('should show global message when delete stock notification success for login user with channel set', () => {
    fixture.detectChanges();
    expect(
      el.query(By.css('.stock-notification-notes')).nativeElement
    ).toBeTruthy();
    const button = el.query(By.css('.btn-stop-notify')).nativeElement;
    button.click();
    removeSuccess.next(true);

    expect(globalMessageService.add).toHaveBeenCalled();
    expect(interestsService.removeProdutInterest).toHaveBeenCalled();
  });

  it('should be able to close dialog when adding interest fail', () => {
    spyOn(launchDialogService, 'openDialog').and.stub();

    interestsService.getProductInterests.and.returnValue(of({}));
    fixture.detectChanges();
    expect(
      el.query(By.css('.stock-notification-notes')).nativeElement
    ).toBeTruthy();
    const button = el.query(By.css('.btn-notify')).nativeElement;
    button.click();
    addFail.next(true);

    expect(launchDialogService.openDialog).toHaveBeenCalled();
    expect(interestsService.addProductInterest).toHaveBeenCalledWith(
      product.code,
      NotificationType.BACK_IN_STOCK
    );
    expect(interestsService.resetAddInterestState).toHaveBeenCalled();
  });

  it('should be able to unsubscribe in destory', () => {
    spyOn(component['subscriptions'], 'unsubscribe').and.stub();
    component.ngOnDestroy();

    expect(component['subscriptions'].unsubscribe).toHaveBeenCalled();
    expect(interestsService.clearProductInterests).toHaveBeenCalled();
    expect(notificationPrefService.clearPreferences).toHaveBeenCalled();
  });
});
