import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActiveCartFacade,
  Cart,
  DeliveryMode,
  OrderEntry,
  PaymentDetails,
  PaymentType,
} from '@spartacus/cart/base/root';
import {
  CheckoutCostCenterFacade,
  CheckoutPaymentTypeFacade,
} from '@spartacus/checkout/b2b/root';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
  CheckoutPaymentFacade,
  CheckoutStep,
  CheckoutStepType,
} from '@spartacus/checkout/base/root';
import {
  Address,
  CostCenter,
  Country,
  I18nTestingModule,
  QueryState,
  UserCostCenterService,
} from '@spartacus/core';
import { Card, OutletModule, PromotionsModule } from '@spartacus/storefront';
import { IconTestingModule } from 'projects/storefrontlib/cms-components/misc/icon/testing/icon-testing.module';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { B2BCheckoutReviewSubmitComponent } from './checkout-review-submit.component';

import createSpy = jasmine.createSpy;

const mockCart: Cart = {
  guid: 'test',
  code: 'test',
  deliveryItemsQuantity: 123,
  totalPrice: { formattedValue: '$999.98' },
};
const mockCountry: Country = { isocode: 'JP', name: 'Japan' };
const mockAddress: Address = {
  firstName: 'John',
  lastName: 'Doe',
  titleCode: 'mr',
  line1: 'Toyosaki 2 create on cart',
  line2: 'line2',
  town: 'town',
  region: { isocode: 'JP-27' },
  postalCode: 'zip',
  country: mockCountry,
};
const addressBS = new BehaviorSubject<Country>(mockCountry);

const mockDeliveryMode: DeliveryMode = {
  name: 'standard-gross',
  description: 'Delivery mode test description',
};
const deliveryModeBS = new BehaviorSubject<QueryState<DeliveryMode>>({
  loading: false,
  error: false,
  data: mockDeliveryMode,
});

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
  selector: 'cx-card',
  template: '',
})
class MockCardComponent {
  @Input()
  content: Card;
}

class MockCheckoutDeliveryAddressService
  implements Partial<CheckoutDeliveryAddressFacade>
{
  getDeliveryAddressState(): Observable<QueryState<Address | undefined>> {
    return of({
      loading: false,
      error: false,
      data: mockAddress,
    });
  }
}

class MockCheckoutDeliveryModesService
  implements Partial<CheckoutDeliveryModesFacade>
{
  loadSupportedDeliveryModes = createSpy();
  getSelectedDeliveryModeState(): Observable<
    QueryState<DeliveryMode | undefined>
  > {
    return deliveryModeBS.asObservable();
  }
}

class MockCheckoutPaymentService implements Partial<CheckoutPaymentFacade> {
  getPaymentDetailsState(): Observable<QueryState<PaymentDetails | undefined>> {
    return of({ loading: false, error: false, data: mockPaymentDetails });
  }
  paymentProcessSuccess(): void {}
}

class MockActiveCartService implements Partial<ActiveCartFacade> {
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
  type: [CheckoutStepType.DELIVERY_ADDRESS],
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

class MockCheckoutPaymentTypeFacade
  implements Partial<CheckoutPaymentTypeFacade>
{
  getPurchaseOrderNumberState(): Observable<QueryState<string | undefined>> {
    return of({ loading: false, error: false, data: 'test-po' });
  }
  getSelectedPaymentTypeState(): Observable<
    QueryState<PaymentType | undefined>
  > {
    return of({
      loading: false,
      error: false,
      data: { code: mockPaymentTypes[0].code },
    });
  }
  isAccountPayment(): Observable<boolean> {
    return of(true);
  }
}

class MockCheckoutCostCenterService
  implements Partial<CheckoutCostCenterFacade>
{
  getCostCenterState(): Observable<QueryState<CostCenter | undefined>> {
    return of({
      loading: false,
      error: false,
      data: mockCostCenter,
    });
  }
}

class MockUserCostCenterService implements Partial<UserCostCenterService> {
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

describe('B2BCheckoutReviewSubmitComponent', () => {
  let component: B2BCheckoutReviewSubmitComponent;
  let fixture: ComponentFixture<B2BCheckoutReviewSubmitComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          I18nTestingModule,
          PromotionsModule,
          RouterTestingModule,
          IconTestingModule,
          OutletModule,
        ],
        declarations: [
          B2BCheckoutReviewSubmitComponent,
          MockCardComponent,
          MockUrlPipe,
        ],
        providers: [
          {
            provide: CheckoutDeliveryAddressFacade,
            useClass: MockCheckoutDeliveryAddressService,
          },
          {
            provide: CheckoutDeliveryModesFacade,
            useClass: MockCheckoutDeliveryModesService,
          },
          {
            provide: CheckoutPaymentFacade,
            useClass: MockCheckoutPaymentService,
          },
          { provide: ActiveCartFacade, useClass: MockActiveCartService },
          {
            provide: CheckoutStepService,
            useClass: MockCheckoutStepService,
          },
          {
            provide: CheckoutPaymentTypeFacade,
            useClass: MockCheckoutPaymentTypeFacade,
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
    fixture = TestBed.createComponent(B2BCheckoutReviewSubmitComponent);
    component = fixture.componentInstance;

    addressBS.next(mockCountry);
    deliveryModeBS.next({
      loading: false,
      error: false,
      data: mockDeliveryMode,
    });
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get cart', () => {
    let cart: Cart | undefined;
    component.cart$.subscribe((data: Cart) => {
      cart = data;
    });

    expect(cart).toEqual(mockCart);
  });

  it('should be able to get entries', () => {
    let entries: OrderEntry[] | undefined;
    component.entries$.subscribe((data: OrderEntry[]) => {
      entries = data;
    });

    expect(entries).toEqual(mockEntries);
  });

  it('should be able to get steps', () => {
    let steps: CheckoutStep[] | undefined;
    component.steps$.subscribe((data) => (steps = data));

    expect(steps?.[0]).toEqual({
      id: 'step1',
      name: 'step1',
      routeName: 'route1',
      type: [CheckoutStepType.PAYMENT_TYPE],
    });
    expect(steps?.[1]).toEqual({
      id: 'step2',
      name: 'step2',
      routeName: 'route2',
      type: [CheckoutStepType.REVIEW_ORDER],
    });
  });

  it('should be able to get deliveryAddress', () => {
    let deliveryAddress: Address | undefined;
    component.deliveryAddress$.subscribe((data) => {
      deliveryAddress = data;
    });

    expect(deliveryAddress).toEqual(mockAddress);
  });

  it('should be able to get paymentDetails', () => {
    let paymentDetails: PaymentDetails | undefined;
    component.paymentDetails$.subscribe((data) => {
      paymentDetails = data;
    });

    expect(paymentDetails).toEqual(mockPaymentDetails);
  });

  it('should be able to get deliveryMode if a mode is selected', () => {
    let deliveryMode: DeliveryMode | undefined;
    component.deliveryMode$.subscribe((data) => {
      deliveryMode = data;
    });

    expect(deliveryMode).toEqual(mockDeliveryMode);
  });

  it('should be able to get po number', () => {
    let po: string | undefined;
    component.poNumber$.subscribe((data) => {
      po = data;
    });

    expect(po).toEqual('test-po');
  });

  it('should be able to get cost center', () => {
    let costCenter: CostCenter | undefined;
    component.costCenter$.subscribe((data) => {
      costCenter = data;
    });

    expect(costCenter).toEqual(mockCostCenter);
  });

  it('should get selected payment type', () => {
    let paymentType: PaymentType | undefined;
    component.paymentType$.subscribe((data) => {
      paymentType = data;
    });

    expect(paymentType).toEqual(mockPaymentTypes[0]);
  });

  it('should call getDeliveryAddressCard(deliveryAddress, countryName) to get address card data', () => {
    component
      .getDeliveryAddressCard(mockAddress, 'Canada')
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
      expect(card.title).toEqual('checkoutMode.deliveryMethod');
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
      expect(card.title).toEqual('checkoutB2B.review.poNumber');
      expect(card.textBold).toEqual('test-po');
    });
  });

  it('should call getCostCenter(costCenter) to get cost center ard data', () => {
    component.getCostCenterCard(mockCostCenter).subscribe((card) => {
      expect(card.title).toEqual('checkoutB2B.costCenter');
      expect(card.textBold).toEqual(mockCostCenter.name);
      expect(card.text).toEqual(['(' + mockCostCenter.unit?.name + ')']);
    });
  });

  it('should call getPaymentTypeCard(paymentType) to get payment type data', () => {
    component.getPaymentTypeCard(mockPaymentTypes[0]).subscribe((card) => {
      expect(card.title).toEqual('checkoutB2B.progress.methodOfPayment');
      expect(card.textBold).toEqual('paymentTypes.paymentType_test-account');
    });
  });

  it('should get checkout step url', () => {
    expect(
      component.getCheckoutStepUrl(CheckoutStepType.DELIVERY_ADDRESS)
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
});
