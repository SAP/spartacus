import { TestBed } from '@angular/core/testing';
import { Order, OrderEntry, PromotionResult } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { OrderDetailsService } from './order-details.service';
import { OrderPromotionService } from './order-promotion.service';

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

const orderEntry0: OrderEntry = {
  entryNumber: 0,
  product: {
    code: '1446509',
    name: 'testitem',
  },
  quantity: 3,
};

const orderEntry1: OrderEntry = {
  entryNumber: 1,
  product: {
    code: '1687508',
    name: 'Remote Control Tripod VCT-80AV',
  },
  quantity: 1,
};
const mockOrderDetails: Order = {
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
  entries: [orderEntry0, orderEntry1],
};

class MockOrderDetailsService {
  getOrderDetails(): Observable<Order> {
    return of(mockOrderDetails);
  }
}

describe('OrderPromotionService', () => {
  let orderPromotionService: OrderPromotionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderPromotionService,
        {
          provide: OrderDetailsService,
          useClass: MockOrderDetailsService,
        },
      ],
    });

    orderPromotionService = TestBed.inject(OrderPromotionService);
  });

  it('should inject service', () => {
    expect(orderPromotionService).toBeTruthy();
  });

  describe('getOrderPromotions', () => {
    it('should return appropriate applied order promotions for order', (done) => {
      orderPromotionService
        .getOrderPromotions()
        .subscribe((appliedOrderPromotions) => {
          expect(appliedOrderPromotions).toEqual(mockAppliedOrderPromotions);
          done();
        })
        .unsubscribe();
    });
  });
});
