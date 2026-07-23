import {
  DebugElement,
  ElementRef,
  Pipe,
  PipeTransform,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  CxDatePipe,
  FeatureDirective,
  GlobalMessageService,
  MockDatePipe,
  MockTranslatePipe,
  NotificationPreference,
  NotificationType,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
  Product,
  ProductInterestSearchResult,
  TranslatePipe,
  TranslationService,
  UrlPipe,
  UserIdService,
  UserInterestsService,
  UserNotificationPreferenceService,
} from '@spartacus/core';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { CurrentProductService } from '../current-product.service';
import { StockNotificationDialogComponent } from './stock-notification-dialog/stock-notification-dialog.component';
import { StockNotificationComponent } from './stock-notification.component';

import { RouterModule } from '@angular/router';
import { FocusDirective } from '@spartacus/storefront';
import { MockFeatureDirective } from '../../../shared/test/mock-feature-directive';
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

  const translationService = { translate: vi.fn() };
  const globalMessageService = { add: vi.fn() };
  const dialogComponent = vi.fn();
  const userIdService = { getUserId: vi.fn() };
  const currentProductService = { getProduct: vi.fn() };
  const notificationPrefService = {
    loadPreferences: vi.fn(),
    getEnabledPreferences: vi.fn(),
    clearPreferences: vi.fn(),
  };
  const interestsService = {
    getAddProductInterestSuccess: vi.fn(),
    getRemoveProdutInterestLoading: vi.fn(),
    getRemoveProdutInterestSuccess: vi.fn(),
    getAddProductInterestError: vi.fn(),
    resetRemoveInterestState: vi.fn(),
    resetAddInterestState: vi.fn(),
    addProductInterest: vi.fn(),
    removeProdutInterest: vi.fn(),
    getProductInterests: vi.fn(),
    clearProductInterests: vi.fn(),
    loadProductInterests: vi.fn(),
  };

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

  @Pipe({ name: 'cxUrl' })
  class MockUrlPipe implements PipeTransform {
    transform(): any {}
  }

  let launchDialogService: LaunchDialogService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        SpinnerModule,
        StockNotificationComponent,
        StockNotificationDialogComponent,
        FocusDirective,
        RouterModule.forRoot([]),
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
    })
      .overrideComponent(StockNotificationComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, UrlPipe, FeatureDirective],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockUrlPipe,
            MockFeatureDirective,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    userIdService.getUserId.mockReturnValue(of(OCC_USER_ID_CURRENT));
    notificationPrefService.loadPreferences.mockImplementation(() => {});
    notificationPrefService.clearPreferences.mockImplementation(() => {});
    notificationPrefService.getEnabledPreferences.mockReturnValue(
      of(preferences)
    );
    currentProductService.getProduct.mockReturnValue(of(product));
    interestsService.getProductInterests.mockReturnValue(of(interests));
    interestsService.getAddProductInterestSuccess.mockReturnValue(of(false));
    interestsService.getAddProductInterestError.mockReturnValue(addFail);
    interestsService.getRemoveProdutInterestLoading.mockReturnValue(of(false));
    interestsService.getRemoveProdutInterestSuccess.mockReturnValue(
      removeSuccess
    );
    interestsService.addProductInterest.mockImplementation(() => {});
    interestsService.removeProdutInterest.mockImplementation(() => {});
    interestsService.clearProductInterests.mockImplementation(() => {});
    interestsService.resetRemoveInterestState.mockImplementation(() => {});
    interestsService.loadProductInterests.mockImplementation(() => {});
    translationService.translate.mockReturnValue(of(''));

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
    currentProductService.getProduct.mockReturnValue(
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
    interestsService.getProductInterests.mockReturnValue(of({}));
    notificationPrefService.getEnabledPreferences.mockReturnValue(of([]));
    userIdService.getUserId.mockReturnValue(of(OCC_USER_ID_ANONYMOUS));
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
    interestsService.getProductInterests.mockReturnValue(of({}));
    notificationPrefService.getEnabledPreferences.mockReturnValue(of([]));
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
    vi.spyOn(launchDialogService, 'openDialog').mockImplementation(() => {});

    interestsService.getProductInterests.mockReturnValue(of({}));
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
    vi.spyOn(launchDialogService, 'openDialog').mockImplementation(() => {});

    interestsService.getProductInterests.mockReturnValue(of({}));
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
    vi.spyOn(component['subscriptions'], 'unsubscribe').mockImplementation(
      () => {}
    );
    component.ngOnDestroy();

    expect(component['subscriptions'].unsubscribe).toHaveBeenCalled();
    expect(interestsService.clearProductInterests).toHaveBeenCalled();
    expect(notificationPrefService.clearPreferences).toHaveBeenCalled();
  });
});
