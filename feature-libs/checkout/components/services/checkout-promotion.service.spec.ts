import { TestBed } from '@angular/core/testing';
import { CheckoutFacade } from '@spartacus/checkout/root';
import { Order, PromotionResult } from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
import { CheckoutPromotionService } from './checkout-promotion.service';

const mockAppliedProductPromotions: PromotionResult[] = [
  {
    consumedEntries: [
      {
        adjustedUnitPrice: 0.0,
        orderEntryNumber: 1,
        quantity: 1,
      },
    ],
    description: 'Buy over $500.00 get 1 free gift',
    promotion: {
      code: 'free_gift',
      description: 'A free gift',
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
  entries: [
    {
      entryNumber: 0,
      product: {
        code: '1446509',
        name: 'testitem',
      },
      quantity: 3,
    },
    {
      entryNumber: 1,
      product: {
        code: '1687508',
        name: 'Remote Control Tripod VCT-80AV',
      },
      quantity: 1,
    },
  ],
};

class MockCheckoutService {
  getOrderDetails(): Observable<Order> {
    return of(mockCheckoutDetails);
  }
}

fdescribe('CheckoutPromotionService', () => {
  let checkoutPromotionService: CheckoutPromotionService;

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

    checkoutPromotionService = TestBed.inject(CheckoutPromotionService);
  });

  it('should inject service', () => {
    expect(checkoutPromotionService).toBeTruthy();
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
      checkoutPromotionService
        .getOrderPromotions()
        .subscribe((promotions) => (appliedOrderPromotions = promotions))
        .unsubscribe();
      expect(appliedOrderPromotions).toEqual(expectedAppliedOrderPromotions);
    });
  });

  describe('getOrderPromotions', () => {
    it('should return appropriate applied product promotions for all entries', (done) => {
      const productPromotionForAllEntries = checkoutPromotionService.getProductPromotionForAllEntries(
        mockCheckoutDetails
      );
      expect(productPromotionForAllEntries).toBeTruthy();
      expect(Object.keys(productPromotionForAllEntries)).toEqual(['0', '1']);

      combineLatest([
        productPromotionForAllEntries[0],
        productPromotionForAllEntries[1],
      ]).subscribe(([promotionsForEntry0, promotionsForEntry1]) => {
        expect(promotionsForEntry0.length).toEqual(0);
        expect(promotionsForEntry1.length).toEqual(1);
        expect(promotionsForEntry1[0]).toEqual(mockAppliedProductPromotions[0]);
        done();
      });
    });
  });
});
