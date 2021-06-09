import { TestBed } from '@angular/core/testing';
import {
  ActiveCartService,
  Cart,
  OrderEntry,
  PromotionResult,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CartPromotionService } from './cart-promotion.service';

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

const cartEntry0: OrderEntry = {
  entryNumber: 0,
  product: {
    code: '1446509',
    name: 'testitem',
  },
  quantity: 3,
};

const cartEntry1: OrderEntry = {
  entryNumber: 1,
  product: {
    code: '1687508',
    name: 'Remote Control Tripod VCT-80AV',
  },
  quantity: 1,
};

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

const mockCart: Cart = {
  guid: 'test',
  code: 'test',
  deliveryItemsQuantity: 123,
  totalPrice: { formattedValue: '$999.98' },
  entries: [cartEntry0, cartEntry1],
  appliedOrderPromotions: mockAppliedOrderPromotionsForCart,
  appliedProductPromotions: mockAppliedProductPromotions,
};

class MockActiveCartService {
  getActive(): Observable<Cart> {
    return of(mockCart);
  }
}

describe('CartPromotionService', () => {
  let cartPromotionService: CartPromotionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartPromotionService,
        {
          provide: ActiveCartService,
          useClass: MockActiveCartService,
        },
      ],
    });

    cartPromotionService = TestBed.inject(CartPromotionService);
  });

  it('should inject service', () => {
    expect(cartPromotionService).toBeTruthy();
  });

  describe('getOrderPromotions', () => {
    it('should return appropriate applied order promotions for cart', (done) => {
      cartPromotionService
        .getOrderPromotions()
        .subscribe((appliedOrderPromotions) => {
          expect(appliedOrderPromotions).toEqual(
            mockAppliedOrderPromotionsForCart
          );
          done();
        })
        .unsubscribe();
    });

    it('should return appropriate applied order promotions for entry', (done) => {
      cartPromotionService
        .getProductPromotionForEntry(cartEntry1)
        .subscribe((appliedProductPromotions) => {
          expect(appliedProductPromotions).toEqual(
            mockAppliedProductPromotions
          );
          done();
        })
        .unsubscribe();
    });
  });
});
