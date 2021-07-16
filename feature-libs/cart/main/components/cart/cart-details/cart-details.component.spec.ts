import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActiveCartService,
  AuthService,
  Cart,
  FeaturesConfigModule,
  I18nTestingModule,
  Order,
  OrderEntry,
  PromotionLocation,
  RoutingService,
  SelectiveCartService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { PromotionsModule } from '../../misc/promotions/promotions.module';
import { CartDetailsComponent } from './cart-details.component';

class MockActiveCartService {
  removeEntry(): void {}
  loadDetails(): void {}
  updateEntry(): void {}
  getActive(): Observable<Cart> {
    return of<Cart>({ code: '123', totalItems: 1 });
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
})
class MockCartCouponComponent {
  @Input()
  cart: Cart | Order;
  @Input()
  cartIsLoading = false;
  userId: string;
}

describe('CartDetailsComponent', () => {
  let component: CartDetailsComponent;
  let fixture: ComponentFixture<CartDetailsComponent>;
  let activeCartService: ActiveCartService;

  const mockSelectiveCartService = jasmine.createSpyObj(
    'SelectiveCartService',
    [
      'getCart',
      'removeEntry',
      'getEntries',
      'isStable',
      'addEntry',
      'isEnabled',
    ]
  );

  const mockAuthService = jasmine.createSpyObj('AuthService', [
    'isUserLoggedIn',
  ]);

  const mockRoutingService = jasmine.createSpyObj('RoutingService', ['go']);

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          PromotionsModule,
          I18nTestingModule,
          FeaturesConfigModule,
        ],
        declarations: [
          CartDetailsComponent,
          MockCartItemListComponent,
          MockCartCouponComponent,
        ],
        providers: [
          { provide: SelectiveCartService, useValue: mockSelectiveCartService },
          { provide: AuthService, useValue: mockAuthService },
          { provide: RoutingService, useValue: mockRoutingService },
          {
            provide: ActiveCartService,
            useClass: MockActiveCartService,
          },
        ],
      }).compileComponents();

      mockSelectiveCartService.isEnabled.and.returnValue(true);
      mockSelectiveCartService.isStable.and.returnValue(of(true));
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDetailsComponent);
    component = fixture.componentInstance;
    activeCartService = TestBed.inject(ActiveCartService);
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
    mockSelectiveCartService.addEntry.and.callThrough();
    spyOn(activeCartService, 'removeEntry').and.callThrough();
    spyOn(activeCartService, 'getEntries').and.callThrough();
    spyOn(activeCartService, 'isStable').and.returnValue(of(true));
    fixture.detectChanges();
    component.saveForLater(mockItem);
    expect(activeCartService.removeEntry).toHaveBeenCalledWith(mockItem);
    expect(mockSelectiveCartService.addEntry).toHaveBeenCalledWith(
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
    mockSelectiveCartService.isEnabled.and.returnValue(of(false));
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
});
