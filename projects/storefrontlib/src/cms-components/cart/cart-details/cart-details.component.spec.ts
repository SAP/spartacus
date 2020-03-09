import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AuthService,
  Cart,
  ActiveCartService,
  FeatureConfigService,
  FeaturesConfig,
  FeaturesConfigModule,
  I18nTestingModule,
  Order,
  OrderEntry,
  PromotionLocation,
  PromotionResult,
  RoutingService,
  SelectiveCartService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { PromotionsModule } from '../../checkout/components/promotions/promotions.module';
import { Item } from '../cart-shared/cart-item/cart-item.component';
import { CartDetailsComponent } from './cart-details.component';
import { PromotionService } from '../../../shared/services/promotion/promotion.service';
import { By } from '@angular/platform-browser';

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
  getLoaded(): Observable<boolean> {
    return of(true);
  }
}

interface CartItemComponentOptions {
  isSaveForLater?: boolean;
  optionalBtn?: any;
}
class MockPromotionService {
  getOrderPromotions(): void {}
  getOrderPromotionsFromCart(): void {}
  getOrderPromotionsFromCheckout(): void {}
  getOrderPromotionsFromOrder(): void {}
  getProductPromotionForEntry(): void {}
}

@Component({
  template: '',
  selector: 'cx-cart-item-list',
})
class MockCartItemListComponent {
  @Input()
  items: Item[];
  @Input()
  potentialProductPromotions: PromotionResult[] = [];
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
  let activeCartService: activeCartService;

  const mockSelectiveCartService = jasmine.createSpyObj(
    'SelectiveCartService',
    ['getCart', 'getLoaded', 'removeEntry', 'getEntries', 'addEntry']
  );

  const mockFeatureConfigService = jasmine.createSpyObj(
    'FeatureConfigService',
    ['isEnabled', 'isLevel']
  );
  const mockAuthService = jasmine.createSpyObj('AuthService', [
    'isUserLoggedIn',
  ]);

  const mockRoutingService = jasmine.createSpyObj('RoutingService', ['go']);

  beforeEach(async(() => {
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
        { provide: FeatureConfigService, useValue: mockFeatureConfigService },
        { provide: SelectiveCartService, useValue: mockSelectiveCartService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: RoutingService, useValue: mockRoutingService },
        {
          provide: ActiveCartService,
          useClass: MockActiveCartService,
        },
        {
          provide: PromotionService,
          useClass: MockPromotionService,
        },
        {
          provide: FeaturesConfig,
          useValue: {
            features: { level: '1.3' },
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDetailsComponent);
    component = fixture.componentInstance;
    activeCartService = TestBed.inject(ActiveCartService);
  });

  it('should create cart details component', () => {
    mockFeatureConfigService.isEnabled.and.returnValue(false);
    fixture.detectChanges();
    expect(component).toBeTruthy();

    mockFeatureConfigService.isEnabled.and.returnValue(true);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should move to save for later for login user', () => {
    const mockItem = {
      quantity: 5,
      product: {
        code: 'PR0000',
      },
    };
    mockFeatureConfigService.isLevel.and.returnValue(true);
    mockFeatureConfigService.isEnabled.and.returnValue(true);
    mockAuthService.isUserLoggedIn.and.returnValue(of(true));
    mockSelectiveCartService.addEntry.and.callThrough();
    mockSelectiveCartService.getLoaded.and.returnValue(of(true));
    spyOn(activeCartService, 'removeEntry').and.callThrough();
    spyOn(activeCartService, 'getEntries').and.callThrough();
    spyOn(activeCartService, 'getLoaded').and.returnValue(of(true));
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
    mockAuthService.isUserLoggedIn.and.returnValue(false);
    component.saveForLater(mockItem);
    fixture.detectChanges();
    expect(mockRoutingService.go).toHaveBeenCalled();
  });

  it('should display cart text with cart number', () => {
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.cx-total'));
    const cartName = el.nativeElement.innerText;
    expect(cartName).toEqual('cartDetails.cartName code:123');
  });
});
