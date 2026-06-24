import { Component, Input } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CartConfigService } from '@spartacus/cart/base/core';
import {
  ActiveCartFacade,
  Cart,
  OrderEntry,
  PromotionLocation,
  SelectiveCartFacade,
} from '@spartacus/cart/base/root';
import {
  AuthService,
  CxDatePipe,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  RoutingService,
  TranslatePipe,
  provideMockFeatureToggles,
} from '@spartacus/core';
import { PromotionsModule, SpinnerComponent } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CartCouponComponent } from '../cart-coupon';
import { CartItemListComponent } from '../cart-shared';
import { CartValidationWarningsComponent } from '../public_api';
import { CartDetailsComponent } from './cart-details.component';

const stable$ = new BehaviorSubject<boolean>(true);

class MockActiveCartService {
  removeEntry(): void {}
  loadDetails(): void {}
  updateEntry(): void {}
  getActive(): Observable<Cart> {
    return of({ code: '123', totalItems: 1 } as Cart);
  }
  getEntries(): Observable<OrderEntry[]> {
    return of([{}]);
  }
  isStable(): Observable<boolean> {
    return stable$.asObservable();
  }
}

interface CartItemComponentOptions {
  isSaveForLater?: boolean;
  optionalBtn?: any;
}

@Component({
  template: '',
  selector: 'cx-cart-item-list',
  imports: [PromotionsModule, I18nTestingModule],
})
class MockCartItemListComponent {
  @Input()
  items: OrderEntry[];
  @Input()
  cartIsLoading: Observable<boolean>;
  @Input()
  options: CartItemComponentOptions = {
    isSaveForLater: false,
    optionalBtn: null,
  };
  @Input()
  promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;
}

@Component({
  template: '',
  selector: 'cx-cart-coupon',
  imports: [PromotionsModule, I18nTestingModule],
})
class MockCartCouponComponent {
  cartIsLoading = false;
}

@Component({
  selector: 'cx-cart-validation-warnings',
  template: '',
  imports: [PromotionsModule, I18nTestingModule],
})
class MockCartValidationWarningsComponent {}

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockCxSpinnerComponent {}

describe('CartDetailsComponent', () => {
  let component: CartDetailsComponent;
  let fixture: ComponentFixture<CartDetailsComponent>;
  let activeCartService: ActiveCartFacade;

  const mockSelectiveCartFacade = jasmine.createSpyObj('SelectiveCartFacade', [
    'getCart',
    'removeEntry',
    'getEntries',
    'isStable',
    'addEntry',
  ]);

  const mockCartConfig = jasmine.createSpyObj('CartConfigService', [
    'isSelectiveCartEnabled',
  ]);

  const mockAuthService = jasmine.createSpyObj('AuthService', [
    'isUserLoggedIn',
  ]);

  const mockRoutingService = jasmine.createSpyObj('RoutingService', ['go']);

  beforeEach(waitForAsync(() => {
    stable$.next(true);
    TestBed.configureTestingModule({
      imports: [PromotionsModule, CartDetailsComponent],
      providers: [
        { provide: SelectiveCartFacade, useValue: mockSelectiveCartFacade },
        { provide: AuthService, useValue: mockAuthService },
        { provide: RoutingService, useValue: mockRoutingService },
        {
          provide: ActiveCartFacade,
          useClass: MockActiveCartService,
        },
        { provide: CartConfigService, useValue: mockCartConfig },
        ...provideMockFeatureToggles({ enableCartSlowNetworkResilience: true }),
      ],
    })
      .overrideComponent(CartDetailsComponent, {
        remove: {
          imports: [
            TranslatePipe,
            CxDatePipe,
            CartItemListComponent,
            CartCouponComponent,
            CartValidationWarningsComponent,
            SpinnerComponent,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockCartItemListComponent,
            MockCartCouponComponent,
            MockCartValidationWarningsComponent,
            MockCxSpinnerComponent,
          ],
        },
      })
      .compileComponents();

    mockCartConfig.isSelectiveCartEnabled.and.returnValue(true);
    mockSelectiveCartFacade.isStable.and.returnValue(of(true));
    mockAuthService.isUserLoggedIn.and.returnValue(of(false));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDetailsComponent);
    component = fixture.componentInstance;
    activeCartService = TestBed.inject(ActiveCartFacade);
  });

  it('should create cart details component', () => {
    expect(component).toBeTruthy();
  });

  it('should move to save for later for login user', () => {
    const mockItem = {
      quantity: 5,
      product: {
        code: 'PR0000',
      },
    };
    mockAuthService.isUserLoggedIn.and.returnValue(of(true));
    mockSelectiveCartFacade.addEntry.and.callThrough();
    spyOn(activeCartService, 'removeEntry').and.callThrough();
    spyOn(activeCartService, 'getEntries').and.callThrough();
    spyOn(activeCartService, 'isStable').and.returnValue(of(true));
    fixture.detectChanges();
    component.saveForLater(mockItem);
    expect(activeCartService.removeEntry).toHaveBeenCalledWith(mockItem);
    expect(mockSelectiveCartFacade.addEntry).toHaveBeenCalledWith(
      mockItem.product.code,
      mockItem.quantity
    );
  });

  it('should go to login page for anonymous user', () => {
    const mockItem = {
      quantity: 5,
      product: {
        code: 'PR0000',
      },
    };
    mockAuthService.isUserLoggedIn.and.returnValue(of(false));
    component.saveForLater(mockItem);
    fixture.detectChanges();
    expect(mockRoutingService.go).toHaveBeenCalled();
  });

  it('should not show save for later when selective cart is disabled', () => {
    mockCartConfig.isSelectiveCartEnabled.and.returnValue(of(false));
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('button'));
    expect(el).toBe(null);
  });

  it('should show save for later when selective cart is enabled', () => {
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('button'));
    expect(el).toBeDefined();
  });

  it('should display cart text with cart number', () => {
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.cx-total'));
    const cartName = el.nativeElement.innerText;
    expect(cartName).toEqual('cartDetails.cartName code:123');
  });

  describe('updating banner', () => {
    it('should not render banner when cart is stable', () => {
      stable$.next(true);
      fixture.detectChanges();
      const banner = fixture.debugElement.query(
        By.css('.cx-cart-details-updating')
      );
      expect(banner).toBeNull();
    });

    it('should render banner with a11y attrs and spinner when cart is unstable', fakeAsync(() => {
      stable$.next(false);
      fixture.detectChanges();
      // updating$ has a 250ms debounceTime; advance past it.
      tick(250);
      fixture.detectChanges();
      const banner = fixture.debugElement.query(
        By.css('.cx-cart-details-updating')
      );
      expect(banner).not.toBeNull();
      expect(banner.attributes['role']).toBe('status');
      expect(banner.attributes['aria-live']).toBe('polite');
      const spinner = banner.query(By.css('cx-spinner'));
      expect(spinner).not.toBeNull();
      expect(spinner.attributes['aria-hidden']).toBe('true');
    }));

    it('should hide the banner once the cart becomes stable again (gate release)', fakeAsync(() => {
      // unstable → debounce → banner appears
      stable$.next(false);
      fixture.detectChanges();
      tick(250);
      fixture.detectChanges();
      expect(
        fixture.debugElement.query(By.css('.cx-cart-details-updating'))
      ).not.toBeNull();

      // stable → debounce → banner disappears
      stable$.next(true);
      tick(250);
      fixture.detectChanges();
      expect(
        fixture.debugElement.query(By.css('.cx-cart-details-updating'))
      ).toBeNull();
    }));

    it('should suppress flicker: rapid unstable→stable within debounce window keeps banner hidden', fakeAsync(() => {
      // Within the 250ms debounce window, !stable=true → false → true → false.
      // debounceTime emits the trailing value (false); distinctUntilChanged
      // dedups against the seed `false` from startWith. The user must NOT see
      // a transient banner mount.
      stable$.next(false); // !stable=true
      tick(50);
      stable$.next(true); // !stable=false (matches seed)
      tick(50);
      stable$.next(false); // !stable=true
      tick(50);
      stable$.next(true); // !stable=false (matches seed)

      // Let the debounce window close fully.
      tick(300);
      fixture.detectChanges();

      expect(
        fixture.debugElement.query(By.css('.cx-cart-details-updating'))
      ).toBeNull();
    }));

    it('should NOT render the banner on initial mount (startWith(false) seed)', () => {
      // No isStable() flip — the BehaviorSubject default is true. With
      // startWith(false), the first synchronous emission of updating$ must
      // be `false`, so the banner is absent on the very first detectChanges.
      fixture.detectChanges();

      expect(
        fixture.debugElement.query(By.css('.cx-cart-details-updating'))
      ).toBeNull();
    });
  });
});

describe('CartDetailsComponent — enableCartSlowNetworkResilience OFF', () => {
  let component: CartDetailsComponent;
  let fixture: ComponentFixture<CartDetailsComponent>;

  const mockSelectiveCartFacade = jasmine.createSpyObj('SelectiveCartFacade', [
    'getCart',
    'removeEntry',
    'getEntries',
    'isStable',
    'addEntry',
  ]);
  const mockCartConfig = jasmine.createSpyObj('CartConfigService', [
    'isSelectiveCartEnabled',
  ]);
  const mockAuthService = jasmine.createSpyObj('AuthService', [
    'isUserLoggedIn',
  ]);
  const mockRoutingService = jasmine.createSpyObj('RoutingService', ['go']);

  beforeEach(waitForAsync(() => {
    stable$.next(false);
    TestBed.configureTestingModule({
      imports: [PromotionsModule, CartDetailsComponent],
      providers: [
        { provide: SelectiveCartFacade, useValue: mockSelectiveCartFacade },
        { provide: AuthService, useValue: mockAuthService },
        { provide: RoutingService, useValue: mockRoutingService },
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: CartConfigService, useValue: mockCartConfig },
        ...provideMockFeatureToggles({}),
      ],
    })
      .overrideComponent(CartDetailsComponent, {
        remove: {
          imports: [
            TranslatePipe,
            CxDatePipe,
            CartItemListComponent,
            CartCouponComponent,
            CartValidationWarningsComponent,
            SpinnerComponent,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockCartItemListComponent,
            MockCartCouponComponent,
            MockCartValidationWarningsComponent,
            MockCxSpinnerComponent,
          ],
        },
      })
      .compileComponents();

    mockCartConfig.isSelectiveCartEnabled.and.returnValue(true);
    mockSelectiveCartFacade.isStable.and.returnValue(of(true));
    mockAuthService.isUserLoggedIn.and.returnValue(of(false));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should NOT render the updating banner even when cart is unstable', fakeAsync(() => {
    stable$.next(false);
    fixture.detectChanges();
    tick(250);
    fixture.detectChanges();

    const banner = fixture.debugElement.query(
      By.css('.cx-cart-details-updating')
    );
    expect(banner).toBeNull();
    expect(component).toBeTruthy();
  }));
});
