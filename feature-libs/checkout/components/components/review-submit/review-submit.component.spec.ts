import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CheckoutCostCenterFacade,
  CheckoutDeliveryFacade,
  CheckoutPaymentFacade,
  CheckoutStep,
  CheckoutStepType,
  PaymentTypeFacade,
} from '@spartacus/checkout/root';
import {
  ActiveCartService,
  Address,
  Cart,
  CostCenter,
  Country,
  DeliveryMode,
  I18nTestingModule,
  OrderEntry,
  PaymentDetails,
  PaymentType,
  PromotionLocation,
  UserAddressService,
  UserCostCenterService,
} from '@spartacus/core';
import { Card, PromotionsModule } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IconTestingModule } from '../../../../../projects/storefrontlib/cms-components/misc/icon/testing/icon-testing.module';
import { CheckoutStepService } from '../../services/index';
import { ReviewSubmitComponent } from './review-submit.component';

import createSpy = jasmine.createSpy;

const mockCart: Cart = {
  guid: 'test',
  code: 'test',
  deliveryItemsQuantity: 123,
  totalPrice: { formattedValue: '$999.98' },
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

const mockCostCenter: CostCenter = {
  code: 'test-cost-center',
  name: 'test-cc-name',
  unit: { name: 'test-unit-name' },
};

const mockPaymentTypes: PaymentType[] = [
  { code: 'test-account' },
  { code: 'test-card' },
];

@Component({
  selector: 'cx-cart-item-list',
  template: '',
})
class MockCartItemListComponent {
  @Input() items: OrderEntry[];
  @Input() readonly: boolean;
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

class MockActiveCartService {
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

class MockCheckoutStepService {
  steps$ = of([
    {
      id: 'step1',
      name: 'step1',
      routeName: 'route1',
      type: [CheckoutStepType.PAYMENT_TYPE],
    },
    {
      id: 'step2',
      name: 'step2',
      routeName: 'route2',
      type: [CheckoutStepType.REVIEW_ORDER],
    },
  ]);
  getCheckoutStep(): CheckoutStep {
    return mockCheckoutStep;
  }
}

class MockPaymentTypeService {
  getPoNumber(): Observable<string> {
    return of('test-po');
  }
  getSelectedPaymentType(): Observable<string> {
    return of(mockPaymentTypes[0].code);
  }
  isAccountPayment(): Observable<boolean> {
    return of(true);
  }
}

class MockCheckoutCostCenterService {
  getCostCenter(): Observable<string> {
    return of(mockCostCenter.code);
  }
}

class MockUserCostCenterService {
  getActiveCostCenters(): Observable<CostCenter[]> {
    return of([mockCostCenter]);
  }
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('ReviewSubmitComponent', () => {
  let component: ReviewSubmitComponent;
  let fixture: ComponentFixture<ReviewSubmitComponent>;
  let mockCheckoutDeliveryService: CheckoutDeliveryFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          I18nTestingModule,
          PromotionsModule,
          RouterTestingModule,
          IconTestingModule,
        ],
        declarations: [
          ReviewSubmitComponent,
          MockCartItemListComponent,
          MockCardComponent,
          MockUrlPipe,
        ],
        providers: [
          {
            provide: CheckoutDeliveryFacade,
            useClass: MockCheckoutDeliveryService,
          },
          {
            provide: CheckoutPaymentFacade,
            useClass: MockCheckoutPaymentService,
          },
          { provide: UserAddressService, useClass: MockUserAddressService },
          { provide: ActiveCartService, useClass: MockActiveCartService },
          {
            provide: CheckoutStepService,
            useClass: MockCheckoutStepService,
          },
          {
            provide: PaymentTypeFacade,
            useClass: MockPaymentTypeService,
          },
          {
            provide: CheckoutCostCenterFacade,
            useClass: MockCheckoutCostCenterService,
          },
          {
            provide: UserCostCenterService,
            useClass: MockUserCostCenterService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewSubmitComponent);
    component = fixture.componentInstance;

    mockCheckoutDeliveryService = TestBed.inject(CheckoutDeliveryFacade);

    addressBS.next(mockAddress.country);
    deliveryModeBS.next(mockDeliveryMode);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get cart', () => {
    let cart: Cart;
    component.cart$.subscribe((data: Cart) => {
      cart = data;
    });

    expect(cart).toEqual(mockCart);
  });

  it('should be able to get entries', () => {
    let entries: OrderEntry[];
    component.entries$.subscribe((data: OrderEntry[]) => {
      entries = data;
    });

    expect(entries).toEqual(mockEntries);
  });

  it('should be able to get steps', () => {
    let steps: CheckoutStep[];
    component.steps$.subscribe((data) => (steps = data));

    expect(steps[0]).toEqual({
      id: 'step1',
      name: 'step1',
      routeName: 'route1',
      type: [CheckoutStepType.PAYMENT_TYPE],
    });
    expect(steps[1]).toEqual({
      id: 'step2',
      name: 'step2',
      routeName: 'route2',
      type: [CheckoutStepType.REVIEW_ORDER],
    });
  });

  it('should be able to get deliveryAddress', () => {
    let deliveryAddress: Address;
    component.deliveryAddress$.subscribe((data: Address) => {
      deliveryAddress = data;
    });

    expect(deliveryAddress).toEqual(mockAddress);
  });

  it('should be able to get paymentDetails', () => {
    let paymentDetails: PaymentDetails;
    component.paymentDetails$.subscribe((data: PaymentDetails) => {
      paymentDetails = data;
    });

    expect(paymentDetails).toEqual(mockPaymentDetails);
  });

  it('should be able to get deliveryMode if a mode is selected', () => {
    let deliveryMode: DeliveryMode;
    component.deliveryMode$.subscribe((data: DeliveryMode) => {
      deliveryMode = data;
    });

    expect(deliveryMode).toEqual(mockDeliveryMode);
  });

  it('should be able to load deliveryModes if no modes selected', () => {
    deliveryModeBS.next(null);
    component.deliveryMode$.subscribe();
    expect(
      mockCheckoutDeliveryService.loadSupportedDeliveryModes
    ).toHaveBeenCalled();
  });

  it('should be able to get country', () => {
    let countryName: string;
    component.countryName$.subscribe((data: string) => {
      countryName = data;
    });

    expect(countryName).toEqual(mockAddress.country.name);
  });

  it('should be able to get po number', () => {
    let po: string;
    component.poNumber$.subscribe((data: string) => {
      po = data;
    });

    expect(po).toEqual('test-po');
  });

  it('should be able to get cost center', () => {
    let costCenter: CostCenter;
    component.costCenter$.subscribe((data: CostCenter) => {
      costCenter = data;
    });

    expect(costCenter).toEqual(mockCostCenter);
  });

  it('should get selected payment type', () => {
    let paymentType: string;
    component.paymentType$.subscribe((data: string) => {
      paymentType = data;
    });

    expect(paymentType).toEqual(mockPaymentTypes[0].code);
  });

  it('should call getShippingAddressCard(deliveryAddress, countryName) to get address card data', () => {
    component
      .getShippingAddressCard(mockAddress, 'Canada')
      .subscribe((card) => {
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
      deliveryCost: {
        formattedValue: '$9.99',
      },
    };
    component.getDeliveryModeCard(selectedMode).subscribe((card) => {
      expect(card.title).toEqual('checkoutShipping.shippingMethod');
      expect(card.textBold).toEqual('Standard gross');
      expect(card.text).toEqual(['Standard Delivery description', '$9.99']);
    });
  });

  it('should call getPaymentMethodCard(paymentDetails) to get payment card data', () => {
    component.getPaymentMethodCard(mockPaymentDetails).subscribe((card) => {
      expect(card.title).toEqual('paymentForm.payment');
      expect(card.textBold).toEqual(mockPaymentDetails.accountHolderName);
      expect(card.text).toEqual([
        mockPaymentDetails.cardNumber,
        `paymentCard.expires month:${mockPaymentDetails.expiryMonth} year:${mockPaymentDetails.expiryYear}`,
      ]);
    });
  });

  it('should call getPoNumberCard(po) to get po card data', () => {
    component.getPoNumberCard('test-po').subscribe((card) => {
      expect(card.title).toEqual('checkoutReview.poNumber');
      expect(card.textBold).toEqual('test-po');
    });
  });

  it('should call getCostCenter(costCenter) to get cost center ard data', () => {
    component.getCostCenterCard(mockCostCenter).subscribe((card) => {
      expect(card.title).toEqual('checkoutPO.costCenter');
      expect(card.textBold).toEqual(mockCostCenter.name);
      expect(card.text).toEqual(['(' + mockCostCenter.unit.name + ')']);
    });
  });

  it('should call getPaymentTypeCard(paymentType) to get payment type data', () => {
    component.getPaymentTypeCard(mockPaymentTypes[0].code).subscribe((card) => {
      expect(card.title).toEqual('checkoutProgress.methodOfPayment');
      expect(card.textBold).toEqual('paymentTypes.paymentType_test-account');
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

    it('should contain total number of items', () => {
      fixture.detectChanges();
      expect(getCartTotalText()).toContain(123);
    });

    it('should contain total price', () => {
      fixture.detectChanges();
      expect(getCartTotalText()).toContain('$999.98');
    });
  });

  describe('child cx-cart-item-list component', () => {
    const getCartItemList = () =>
      fixture.debugElement.query(By.css('cx-cart-item-list')).componentInstance;

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
