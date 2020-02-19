import { Component, Input, Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Address,
  Cart,
  CartService,
  CheckoutDeliveryService,
  CheckoutPaymentService,
  Country,
  DeliveryMode,
  FeaturesConfig,
  FeaturesConfigModule,
  I18nTestingModule,
  OrderEntry,
  PaymentDetails,
  PromotionLocation,
  PromotionResult,
  UserAddressService,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PromotionsModule } from '../../..';
import { Item } from '../../../../cms-components/cart/index';
import { Card } from '../../../../shared/components/card/card.component';
import { PromotionService } from '../../../../shared/services/promotion/promotion.service';
import { MockFeatureLevelDirective } from '../../../../shared/test/mock-feature-level-directive';
import { CheckoutStep, CheckoutStepType } from '../../model/index';
import { CheckoutConfigService } from '../../services/index';
import { ReviewSubmitComponent } from './review-submit.component';
import createSpy = jasmine.createSpy;

const mockCart: Cart = {
  guid: 'test',
  code: 'test',
  deliveryItemsQuantity: 123,
  totalPrice: { formattedValue: '$999.98' },
  potentialProductPromotions: [
    { description: 'Promotion 1' },
    { description: 'Promotion 2' },
  ],
};

const mockAddress: Address = {
  firstName: 'John',
  lastName: 'Doe',
  titleCode: 'mr',
  line1: 'Toyosaki 2 create on cart',
  line2: 'line2',
  town: 'town',
  region: { isocode: 'JP-27' },
  postalCode: 'zip',
  country: { isocode: 'JP', name: 'Japan' },
};
const addressBS = new BehaviorSubject<Country>(mockAddress.country);

const mockDeliveryMode: DeliveryMode = {
  name: 'standard-gross',
  description: 'Delivery mode test description',
};
const deliveryModeBS = new BehaviorSubject<DeliveryMode>(mockDeliveryMode);

const mockPaymentDetails: PaymentDetails = {
  accountHolderName: 'Name',
  cardNumber: '123456789',
  cardType: { code: 'Visa', name: 'Visa' },
  expiryMonth: '01',
  expiryYear: '2022',
  cvn: '123',
};

const mockEntries: OrderEntry[] = [{ entryNumber: 123 }, { entryNumber: 456 }];

@Component({
  selector: 'cx-cart-item-list',
  template: '',
})
class MockCartItemListComponent {
  @Input() items: Item[];
  @Input() readonly: boolean;
  @Input() potentialProductPromotions: PromotionResult[] = [];
  @Input() promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;
}

@Component({
  selector: 'cx-card',
  template: '',
})
class MockCardComponent {
  @Input()
  content: Card;
}

class MockCheckoutDeliveryService {
  loadSupportedDeliveryModes = createSpy();
  getSelectedDeliveryMode(): Observable<DeliveryMode> {
    return deliveryModeBS.asObservable();
  }
  getDeliveryAddress(): Observable<Address> {
    return of(mockAddress);
  }
}

class MockCheckoutPaymentService {
  getPaymentDetails(): Observable<PaymentDetails> {
    return of(mockPaymentDetails);
  }

  paymentProcessSuccess(): void {}
}

class MockUserAddressService {
  loadDeliveryCountries = createSpy();
  getCountry(): Observable<Country> {
    return addressBS.asObservable();
  }
}

class MockCartService {
  getActive(): Observable<Cart> {
    return of(mockCart);
  }
  getEntries(): Observable<OrderEntry[]> {
    return of(mockEntries);
  }
}

const mockCheckoutStep: CheckoutStep = {
  id: 'step',
  name: 'name',
  routeName: '/route',
  type: [CheckoutStepType.SHIPPING_ADDRESS],
};

class MockCheckoutConfigService {
  getCheckoutStep(): CheckoutStep {
    return mockCheckoutStep;
  }
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

class MockPromotionService {
  getOrderPromotions(): void {}
  getOrderPromotionsFromCart(): void {}
  getOrderPromotionsFromCheckout(): void {}
  getOrderPromotionsFromOrder(): void {}
  getProductPromotionForEntry(): void {}
}

describe('ReviewSubmitComponent', () => {
  let component: ReviewSubmitComponent;
  let fixture: ComponentFixture<ReviewSubmitComponent>;
  let mockCheckoutDeliveryService: MockCheckoutDeliveryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        PromotionsModule,
        RouterTestingModule,
        FeaturesConfigModule,
      ],
      declarations: [
        ReviewSubmitComponent,
        MockCartItemListComponent,
        MockCardComponent,
        MockUrlPipe,
        MockFeatureLevelDirective,
      ],
      providers: [
        {
          provide: CheckoutDeliveryService,
          useClass: MockCheckoutDeliveryService,
        },
        {
          provide: CheckoutPaymentService,
          useClass: MockCheckoutPaymentService,
        },
        { provide: UserAddressService, useClass: MockUserAddressService },
        { provide: CartService, useClass: MockCartService },
        {
          provide: CheckoutConfigService,
          useClass: MockCheckoutConfigService,
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
    fixture = TestBed.createComponent(ReviewSubmitComponent);
    component = fixture.componentInstance;

    mockCheckoutDeliveryService = TestBed.get(CheckoutDeliveryService as Type<
      CheckoutDeliveryService
    >);

    addressBS.next(mockAddress.country);
    deliveryModeBS.next(mockDeliveryMode);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get cart in ngOnInit', () => {
    component.ngOnInit();
    fixture.detectChanges();

    let cart: Cart;
    component.cart$.subscribe((data: Cart) => {
      cart = data;
    });

    expect(cart).toEqual(mockCart);
  });

  it('should get entries in ngOnInit', () => {
    component.ngOnInit();
    fixture.detectChanges();

    let entries: OrderEntry[];
    component.entries$.subscribe((data: OrderEntry[]) => {
      entries = data;
    });

    expect(entries).toEqual(mockEntries);
  });

  it('should get deliveryAddress in ngOnInit', () => {
    component.ngOnInit();
    fixture.detectChanges();

    let deliveryAddress: Address;
    component.deliveryAddress$.subscribe((data: Address) => {
      deliveryAddress = data;
    });

    expect(deliveryAddress).toEqual(mockAddress);
  });

  it('should get paymentDetails in ngOnInit', () => {
    component.ngOnInit();
    fixture.detectChanges();

    let paymentDetails: PaymentDetails;
    component.paymentDetails$.subscribe((data: PaymentDetails) => {
      paymentDetails = data;
    });

    expect(paymentDetails).toEqual(mockPaymentDetails);
  });

  it('should get deliveryMode in ngOnInit if a mode is selected', () => {
    component.ngOnInit();
    fixture.detectChanges();

    let deliveryMode: DeliveryMode;
    component.deliveryMode$.subscribe((data: DeliveryMode) => {
      deliveryMode = data;
    });

    expect(deliveryMode).toEqual(mockDeliveryMode);
  });

  it('should load deliveryModes in ngOnInit if no modes selected', () => {
    deliveryModeBS.next(null);
    component.ngOnInit();
    fixture.detectChanges();

    expect(
      mockCheckoutDeliveryService.loadSupportedDeliveryModes
    ).toHaveBeenCalled();
  });

  it('should get country in ngOnInit', () => {
    component.ngOnInit();
    fixture.detectChanges();

    let countryName: string;
    component.countryName$.subscribe((data: string) => {
      countryName = data;
    });

    expect(countryName).toEqual(mockAddress.country.name);
  });

  it('should call getShippingAddressCard(deliveryAddress, countryName) to get address card data', () => {
    component.getShippingAddressCard(mockAddress, 'Canada').subscribe(card => {
      expect(card.title).toEqual('addressCard.shipTo');
      expect(card.textBold).toEqual('John Doe');
      expect(card.text).toEqual([
        'Toyosaki 2 create on cart',
        'line2',
        'town, JP-27, Canada',
        'zip',
        undefined,
      ]);
    });
  });

  it('should call getDeliveryModeCard(deliveryMode) to get delivery mode card data', () => {
    const selectedMode: DeliveryMode = {
      code: 'standard-gross',
      name: 'Standard gross',
      description: 'Standard Delivery description',
    };
    component.getDeliveryModeCard(selectedMode).subscribe(card => {
      expect(card.title).toEqual('checkoutShipping.shippingMethod');
      expect(card.textBold).toEqual('Standard gross');
      expect(card.text).toEqual(['Standard Delivery description']);
    });
  });

  it('should call getPaymentMethodCard(paymentDetails) to get payment card data', () => {
    component.getPaymentMethodCard(mockPaymentDetails).subscribe(card => {
      expect(card.title).toEqual('paymentForm.payment');
      expect(card.textBold).toEqual(mockPaymentDetails.accountHolderName);
      expect(card.text).toEqual([
        mockPaymentDetails.cardNumber,
        `paymentCard.expires month:${mockPaymentDetails.expiryMonth} year:${mockPaymentDetails.expiryYear}`,
      ]);
    });
  });

  it('should get checkout step url', () => {
    expect(
      component.getCheckoutStepUrl(CheckoutStepType.SHIPPING_ADDRESS)
    ).toEqual(mockCheckoutStep.routeName);
  });

  describe('UI cart total section', () => {
    const getCartTotalText = () =>
      fixture.debugElement.query(By.css('.cx-review-cart-total')).nativeElement
        .textContent;

    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should contain total number of items', () => {
      expect(getCartTotalText()).toContain(123);
    });

    it('should contain total price', () => {
      expect(getCartTotalText()).toContain('$999.98');
    });
  });

  describe('child cx-cart-item-list component', () => {
    const getCartItemList = () =>
      fixture.debugElement.query(By.css('cx-cart-item-list')).componentInstance;

    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should receive items attribute with cart entires', () => {
      fixture.detectChanges();
      expect(getCartItemList().items).toEqual([
        { entryNumber: 123 },
        { entryNumber: 456 },
      ]);
      expect(getCartItemList().readonly).toBe(true);
    });
  });
});
