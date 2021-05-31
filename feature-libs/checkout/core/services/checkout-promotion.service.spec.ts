import { TestBed } from '@angular/core/testing';
import { CheckoutFacade } from '@spartacus/checkout/root';
import { Order, PromotionResult } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CheckoutPromotionService } from './checkout-promotion.service';

const mockAppliedProductPromotions: PromotionResult[] = [
  {
    consumedEntries: [
      {
        adjustedUnitPrice: 517.4,
        orderEntryNumber: 0,
        quantity: 1,
      },
    ],
    description: '10% off on products EOS450D + 18-55 IS Kit',
    promotion: {
      code: 'product_percentage_discount',
      promotionType: 'Rule Based Promotion',
    },
  },
];

const mockAppliedOrderPromotionsForCheckout: PromotionResult[] = [
  {
    consumedEntries: [
      {
        orderEntryNumber: 2,
      },
    ],
    description: 'test applied order promotion for checkout',
  },
];

const mockCheckoutDetails: Order = {
  code: '1',
  statusDisplay: 'orderDetails.statusDisplay context:Shipped',
  deliveryAddress: {
    firstName: 'John',
    lastName: 'Smith',
    line1: 'Buckingham Street 5',
    line2: '1A',
    phone: '(+11) 111 111 111',
    postalCode: 'MA8902',
    town: 'London',
    country: {
      isocode: 'UK',
    },
  },
  deliveryMode: {
    name: 'Standard order-detail-shipping',
    description: '3-5 days',
  },
  paymentInfo: {
    accountHolderName: 'John Smith',
    cardNumber: '************6206',
    expiryMonth: '12',
    expiryYear: '2026',
    cardType: {
      name: 'Visa',
    },
    billingAddress: {
      firstName: 'John',
      lastName: 'Smith',
      line1: 'Buckingham Street 5',
      line2: '1A',
      phone: '(+11) 111 111 111',
      postalCode: 'MA8902',
      town: 'London',
      country: {
        isocode: 'UK',
      },
    },
  },
  created: new Date('2019-02-11T13:02:58+0000'),
  appliedOrderPromotions: mockAppliedOrderPromotionsForCheckout,
  appliedProductPromotions: mockAppliedProductPromotions,
};

class MockCheckoutService {
  getOrderDetails(): Observable<Order> {
    return of(mockCheckoutDetails);
  }
}

fdescribe('CheckoutPromotionService', () => {
  let promotionService: CheckoutPromotionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutPromotionService,
        {
          provide: CheckoutFacade,
          useClass: MockCheckoutService,
        },
      ],
    });

    promotionService = TestBed.inject(CheckoutPromotionService);
  });

  it('should inject service', () => {
    expect(promotionService).toBeTruthy();
  });

  describe('getOrderPromotions', () => {
    const expectedAppliedOrderPromotions = [
      {
        consumedEntries: [
          {
            orderEntryNumber: 2,
          },
        ],
        description: 'test applied order promotion for checkout',
      },
    ];
    let appliedOrderPromotions: PromotionResult[];

    it('should return appropriate applied order promotions for checkout', () => {
      promotionService
        .getOrderPromotions()
        .subscribe((promotions) => (appliedOrderPromotions = promotions))
        .unsubscribe();
      expect(appliedOrderPromotions).toEqual(expectedAppliedOrderPromotions);
    });
  });
});
