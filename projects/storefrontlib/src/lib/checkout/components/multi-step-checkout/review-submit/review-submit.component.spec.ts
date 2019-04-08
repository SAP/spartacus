import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Input, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of, Observable, BehaviorSubject } from 'rxjs';
import createSpy = jasmine.createSpy;

import {
  CartService,
  UserService,
  Cart,
  OrderEntry,
  CheckoutService,
  PaymentDetails,
  Address,
  PromotionResult,
  DeliveryMode,
  Country,
  I18nTestingModule,
} from '@spartacus/core';
import { Item } from '../../../../cart';
import { Card } from '../../../../ui/components/card/card.component';
import { ReviewSubmitComponent } from './review-submit.component';

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
  @Input()
  items: Item[];
  @Input()
  isReadOnly: boolean;
  @Input()
  potentialProductPromotions: PromotionResult[];
}

@Component({
  selector: 'cx-card',
  template: '',
})
class MockCardComponent {
  @Input()
  content: Card;
}

class MockCheckoutService {
  loadSupportedDeliveryModes = createSpy();
  getSelectedDeliveryMode(): Observable<DeliveryMode> {
    return deliveryModeBS.asObservable();
  }
  getDeliveryAddress(): Observable<Address> {
    return of(mockAddress);
  }
  getPaymentDetails(): Observable<PaymentDetails> {
    return of(mockPaymentDetails);
  }
}

class MockUserService {
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

describe('ReviewSubmitComponent', () => {
  let component: ReviewSubmitComponent;
  let fixture: ComponentFixture<ReviewSubmitComponent>;
  let mockCheckoutService: MockCheckoutService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        ReviewSubmitComponent,
        MockCartItemListComponent,
        MockCardComponent,
      ],
      providers: [
        { provide: CheckoutService, useClass: MockCheckoutService },
        { provide: UserService, useClass: MockUserService },
        { provide: CartService, useClass: MockCartService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewSubmitComponent);
    component = fixture.componentInstance;

    mockCheckoutService = TestBed.get(CheckoutService);

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

    expect(mockCheckoutService.loadSupportedDeliveryModes).toHaveBeenCalled();
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
    const card = component.getShippingAddressCard(mockAddress, 'Canada');
    expect(card.title).toEqual('Ship To');
    expect(card.textBold).toEqual('John Doe');
    expect(card.text).toEqual([
      'Toyosaki 2 create on cart',
      'line2',
      'town, JP-27, Canada',
      'zip',
      undefined,
    ]);
  });

  it('should call getDeliveryModeCard(deliveryMode) to get delivery mode card data', () => {
    const selectedMode: DeliveryMode = {
      code: 'standard-gross',
      name: 'Standard gross',
      description: 'Standard Delivery description',
    };
    const card = component.getDeliveryModeCard(selectedMode);
    expect(card.title).toEqual('Shipping Method');
    expect(card.textBold).toEqual('Standard gross');
    expect(card.text).toEqual(['Standard Delivery description']);
  });

  it('should call getPaymentMethodCard(paymentDetails) to get payment card data', () => {
    const card = component.getPaymentMethodCard(mockPaymentDetails);
    expect(card.title).toEqual('Payment');
    expect(card.textBold).toEqual(mockPaymentDetails.accountHolderName);
    expect(card.text).toEqual([
      mockPaymentDetails.cardNumber,
      `Expires: ${mockPaymentDetails.expiryMonth}/${
        mockPaymentDetails.expiryYear
      }`,
    ]);
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
      expect(getCartItemList().isReadOnly).toBe(true);
    });

    it('should receive potentialProductPromotions attribute with potential product promotions of cart', () => {
      fixture.detectChanges();
      expect(getCartItemList().potentialProductPromotions).toEqual([
        { description: 'Promotion 1' },
        { description: 'Promotion 2' },
      ]);
    });
  });
});
