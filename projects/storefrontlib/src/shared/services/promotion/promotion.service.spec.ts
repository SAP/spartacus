import { TestBed } from '@angular/core/testing';
import {
  ActiveCartService,
  Cart,
  Order,
  PromotionLocation,
  PromotionResult,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { OrderDetailsService } from '../../../cms-components/myaccount/order/order-details/order-details.service';
import { PromotionService } from './promotion.service';

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

const mockAppliedOrderPromotionsForCart: PromotionResult[] = [
  {
    consumedEntries: [
      {
        orderEntryNumber: 1,
      },
    ],
    description: 'test applied order promotion for cart',
  },
];

const mockAppliedOrderPromotionsForOrder: PromotionResult[] = [
  {
    consumedEntries: [
      {
        orderEntryNumber: 3,
      },
    ],
    description: 'test applied order promotion for order',
  },
];

const mockCart: Cart = {
  guid: 'test',
  code: 'test',
  deliveryItemsQuantity: 123,
  totalPrice: { formattedValue: '$999.98' },
  appliedOrderPromotions: mockAppliedOrderPromotionsForCart,
  appliedProductPromotions: mockAppliedProductPromotions,
};

const mockOrder: Order = {
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
  appliedOrderPromotions: mockAppliedOrderPromotionsForOrder,
  appliedProductPromotions: mockAppliedProductPromotions,
};

class MockActiveCartService {
  getActive(): Observable<Cart> {
    return of(mockCart);
  }
}

class MockOrderDetailsService {
  getOrderDetails(): Observable<Order> {
    return of(mockOrder);
  }
}

fdescribe('PromotionService', () => {
  let promotionService: PromotionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PromotionService,
        {
          provide: ActiveCartService,
          useClass: MockActiveCartService,
        },
        {
          provide: OrderDetailsService,
          useClass: MockOrderDetailsService,
        },
      ],
    });

    promotionService = TestBed.inject(PromotionService);
  });

  it('should inject service', () => {
    expect(promotionService).toBeTruthy();
  });

  describe('getOrderPromotions', () => {
    describe('for cart', () => {
      const expectedAppliedOrderPromotions = [
        {
          consumedEntries: [
            {
              orderEntryNumber: 1,
            },
          ],
          description: 'test applied order promotion for cart',
        },
      ];
      const promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;
      let appliedOrderPromotions: PromotionResult[];

      it('should return appropriate applied order promotions for cart', () => {
        promotionService
          .getOrderPromotions(promotionLocation)
          .subscribe((promotions) => (appliedOrderPromotions = promotions))
          .unsubscribe();
        expect(appliedOrderPromotions).toEqual(expectedAppliedOrderPromotions);
      });
    });

    describe('for order', () => {
      const expectedAppliedOrderPromotions = [
        {
          consumedEntries: [
            {
              orderEntryNumber: 3,
            },
          ],
          description: 'test applied order promotion for order',
        },
      ];
      const promotionLocation: PromotionLocation = PromotionLocation.Order;
      let appliedOrderPromotions: PromotionResult[];

      it('should return appropriate applied order promotions for order', () => {
        promotionService
          .getOrderPromotions(promotionLocation)
          .subscribe((promotions) => (appliedOrderPromotions = promotions))
          .unsubscribe();
        expect(appliedOrderPromotions).toEqual(expectedAppliedOrderPromotions);
      });
    });
  });
});
