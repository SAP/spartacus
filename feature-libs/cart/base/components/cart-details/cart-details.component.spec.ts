import { vi } from 'vitest';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
} from '@spartacus/core';
import { PromotionsModule } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { CartCouponComponent } from '../cart-coupon';
import { CartItemListComponent } from '../cart-shared';
import { CartValidationWarningsComponent } from '../public_api';
import { CartDetailsComponent } from './cart-details.component';

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
    return of(true);
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

describe('CartDetailsComponent', () => {
  let component: CartDetailsComponent;
  let fixture: ComponentFixture<CartDetailsComponent>;
  let activeCartService: ActiveCartFacade;

  const mockSelectiveCartFacade = {
    getCart: vi.fn(),
    removeEntry: vi.fn(),
    getEntries: vi.fn(),
    isStable: vi.fn(),
    addEntry: vi.fn(),
  };

  const mockCartConfig = { isSelectiveCartEnabled: vi.fn() };

  const mockAuthService = { isUserLoggedIn: vi.fn() };

  const mockRoutingService = { go: vi.fn() };

  beforeEach(async () => {
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
        {
          provide: CartConfigService,
          useValue: mockCartConfig,
        },
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
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockCartItemListComponent,
            MockCartCouponComponent,
            MockCartValidationWarningsComponent,
          ],
        },
      })
      .compileComponents();

    mockCartConfig.isSelectiveCartEnabled.mockReturnValue(true);
    mockSelectiveCartFacade.isStable.mockReturnValue(of(true));
  });

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
    mockAuthService.isUserLoggedIn.mockReturnValue(of(true));
    mockSelectiveCartFacade.addEntry;
    vi.spyOn(activeCartService, 'removeEntry');
    vi.spyOn(activeCartService, 'getEntries');
    vi.spyOn(activeCartService, 'isStable').mockReturnValue(of(true));
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
    mockAuthService.isUserLoggedIn.mockReturnValue(of(false));
    component.saveForLater(mockItem);
    fixture.detectChanges();
    expect(mockRoutingService.go).toHaveBeenCalled();
  });

  it('should not show save for later when selective cart is disabled', () => {
    mockCartConfig.isSelectiveCartEnabled.mockReturnValue(of(false));
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
    const cartName = el.nativeElement.textContent?.trim();
    expect(cartName).toEqual('cartDetails.cartName code:123');
  });
});
