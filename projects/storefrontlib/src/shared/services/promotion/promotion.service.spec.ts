import { PromotionService } from './promotion.service';
import {
  CartService,
  CheckoutService,
  Cart,
  PromotionResult,
  Order,
} from '@spartacus/core';
import { OrderDetailsService } from 'projects/storefrontlib/src/cms-components';
import { TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';
import { Observable, of } from 'rxjs';

// import { Cart, Order } from '@spartacus/core';
// import { Observable } from 'rxjs';
// import { Component, Input } from '@angular/core';
// import { Item } from '@spartacus/storefront';

// const mockItems = [
//   {
//     id: 0,
//     quantity: 1,
//     entryNumber: 0,
//     product: {
//       id: 0,
//       code: 'PR0000',
//     },
//   },
//   {
//     id: 1,
//     quantity: 5,
//     entryNumber: 1,
//     product: {
//       id: 1,
//       code: 'PR0001',
//     },
//   },
// ];

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

const mockAppliedOrderPromotions: PromotionResult[] = [
  {
    consumedEntries: [
      {
        orderEntryNumber: 2,
      },
    ],
    description: 'test applied order promotion',
  },
];

// const mockPotentialProductPromotions = [
//   {
//     description: 'Buy two more and win a trip to the Moon',
//     consumedEntries: [
//       {
//         orderEntryNumber: 1,
//       },
//     ],
//   },
// ];

const mockCart: Cart = {
  guid: 'test',
  code: 'test',
  deliveryItemsQuantity: 123,
  totalPrice: { formattedValue: '$999.98' },
  appliedOrderPromotions: mockAppliedOrderPromotions,
  appliedProductPromotions: mockAppliedProductPromotions,
};

// const mockedOrder: Order = {
//   guid: '1',

// };

// @Component({
//   template: '',
//   selector: 'cx-cart-item-list',
// })
// class MockCartItemListComponent {
//   @Input()
//   items: Item[];
//   @Input()
//   cartIsLoading: Observable<boolean>;
// }

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
  appliedOrderPromotions: mockAppliedOrderPromotions,
  appliedProductPromotions: mockAppliedProductPromotions,
};

class MockCartService {
  getActive(): Observable<Cart> {
    return of(mockCart);
  }
}

class MockCheckoutService {
  getOrderDetails(): Observable<Order> {
    return of(mockOrder);
  }
}

class MockOrderDetailsService {
  getOrderDetails(): Observable<Order> {
    return of(mockOrder);
  }
}

describe('PromotionService', () => {
  let promotionService: PromotionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PromotionService,
        {
          provide: CartService,
          useClass: MockCartService,
        },
        {
          provide: CheckoutService,
          useClass: MockCheckoutService,
        },
        {
          provide: OrderDetailsService,
          useClass: MockOrderDetailsService,
        },
      ],
    });

    promotionService = TestBed.get(PromotionService as Type<PromotionService>);
  });

  it('should inject service', () => {
    expect(promotionService).toBeTruthy();
  });

  describe('getOrderPromotions', () => {});

  describe('getProductPromotionForEntry', () => {});
});
