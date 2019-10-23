import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Cart,
  CartService,
  I18nTestingModule,
  Order,
  OrderEntry,
  PromotionResult,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { PromotionsModule } from '../../checkout';
import { Item } from '../cart-shared/cart-item/cart-item.component';
import { CartDetailsComponent } from './cart-details.component';

class MockCartService {
  removeEntry(): void {}
  loadDetails(): void {}
  updateEntry(): void {}
  getActive(): Observable<Cart> {
    return of<Cart>({ code: '123' });
  }
  getEntries(): Observable<OrderEntry[]> {
    return of([{}]);
  }
  getLoaded(): Observable<boolean> {
    return of(true);
  }
}

@Component({
  template: '',
  selector: 'cx-cart-item-list',
})
class MockCartItemListComponent {
  @Input()
  items: Item[];
  @Input()
  potentialProductPromotions: PromotionResult[] = [];
  @Input()
  cartIsLoading: Observable<boolean>;
}

@Component({
  template: '',
  selector: 'cx-cart-coupon',
})
class MockCartCouponComponent {
  @Input()
  cart: Cart | Order;
  @Input()
  cartIsLoading = false;
  userId: string;
}

describe('CartDetailsComponent', () => {
  let component: CartDetailsComponent;
  let fixture: ComponentFixture<CartDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, PromotionsModule, I18nTestingModule],
      declarations: [
        CartDetailsComponent,
        MockCartItemListComponent,
        MockCartCouponComponent,
      ],
      providers: [{ provide: CartService, useClass: MockCartService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create cart details component', () => {
    expect(component).toBeTruthy();
  });

  // potentialOrderPromotions and appliedOrderPromotions tests
  describe('when cart has potentialOrderPromotions and appliedOrderPromotions are defined', () => {
    it('should have two consumedEntries', () => {
      const mockedCart: Cart = {
        guid: '1',
        potentialOrderPromotions: [
          {
            consumedEntries: [
              {
                orderEntryNumber: 1,
              },
            ],
            description: 'test applied order promotion',
          },
        ],
        appliedOrderPromotions: [
          {
            consumedEntries: [
              {
                orderEntryNumber: 2,
              },
            ],
            description: 'test potential order promotion',
          },
        ],
      };

      const expectedResult: PromotionResult[] = [
        {
          consumedEntries: [
            {
              orderEntryNumber: 1,
            },
          ],
          description: 'test applied order promotion',
        },
        {
          consumedEntries: [
            {
              orderEntryNumber: 2,
            },
          ],
          description: 'test potential order promotion',
        },
      ];

      const promotions = component.getAllPromotionsForCart(mockedCart);
      expect(promotions).toEqual(expectedResult);
    });
  });

  describe('when cart has potentialOrderPromotions is empty and appliedOrderPromotions is defined', () => {
    it('should have one consumedEntries', () => {
      const mockedCart: Cart = {
        guid: '2',
        potentialOrderPromotions: [],
        appliedOrderPromotions: [
          {
            consumedEntries: [
              {
                orderEntryNumber: 2,
              },
            ],
            description: 'test potential order promotion',
          },
        ],
      };

      const expectedResult: PromotionResult[] = [
        {
          consumedEntries: [
            {
              orderEntryNumber: 2,
            },
          ],
          description: 'test potential order promotion',
        },
      ];

      const promotions = component.getAllPromotionsForCart(mockedCart);
      expect(promotions).toEqual(expectedResult);
    });
  });

  describe('when cart has potentialOrderPromotions is defined and appliedOrderPromotions is empty', () => {
    it('should have one consumedEntries', () => {
      const mockedCart: Cart = {
        guid: '3',
        potentialOrderPromotions: [
          {
            consumedEntries: [
              {
                orderEntryNumber: 1,
              },
            ],
            description: 'test applied order promotion',
          },
        ],
        appliedOrderPromotions: [],
      };

      const expectedResult: PromotionResult[] = [
        {
          consumedEntries: [
            {
              orderEntryNumber: 1,
            },
          ],
          description: 'test applied order promotion',
        },
      ];

      const promotions = component.getAllPromotionsForCart(mockedCart);
      expect(promotions).toEqual(expectedResult);
    });
  });

  describe('when cart has potentialOrderPromotions is defined and appliedOrderPromotions is undefined', () => {
    it('should have one consumedEntries', () => {
      const mockedCart: Cart = {
        guid: '4',
        potentialOrderPromotions: [
          {
            consumedEntries: [
              {
                orderEntryNumber: 1,
              },
            ],
            description: 'test applied order promotion',
          },
        ],
      };

      const expectedResult: PromotionResult[] = [
        {
          consumedEntries: [
            {
              orderEntryNumber: 1,
            },
          ],
          description: 'test applied order promotion',
        },
      ];

      const promotions = component.getAllPromotionsForCart(mockedCart);
      expect(promotions).toEqual(expectedResult);
    });
  });

  describe('when cart has potentialOrderPromotions is undefined and appliedOrderPromotions is defined', () => {
    it('should have one consumedEntries', () => {
      const mockedCart: Cart = {
        guid: '5',
        appliedOrderPromotions: [
          {
            consumedEntries: [
              {
                orderEntryNumber: 2,
              },
            ],
            description: 'test potential order promotion',
          },
        ],
      };

      const expectedResult: PromotionResult[] = [
        {
          consumedEntries: [
            {
              orderEntryNumber: 2,
            },
          ],
          description: 'test potential order promotion',
        },
      ];

      const promotions = component.getAllPromotionsForCart(mockedCart);
      expect(promotions).toEqual(expectedResult);
    });
  });

  it('should display cart text with cart number', () => {
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.cx-total'));
    const cartName = el.nativeElement.innerText;
    expect(cartName).toEqual('cartDetails.cartName code:123');
  });

  // potentialProductPromotions and appliedProductPromotions tests
  describe('when cart has potentialProductPromotions and appliedProductPromotions are defined', () => {
    it('should have two consumedEntries', () => {
      const mockedCart: Cart = {
        guid: '6',
        potentialProductPromotions: [
          {
            consumedEntries: [
              {
                orderEntryNumber: 1,
              },
            ],
            description: 'test applied product promotion',
          },
        ],
        appliedProductPromotions: [
          {
            consumedEntries: [
              {
                orderEntryNumber: 2,
              },
            ],
            description: 'test potential product promotion',
          },
        ],
      };

      const expectedResult: PromotionResult[] = [
        {
          consumedEntries: [
            {
              orderEntryNumber: 1,
            },
          ],
          description: 'test applied product promotion',
        },
        {
          consumedEntries: [
            {
              orderEntryNumber: 2,
            },
          ],
          description: 'test potential product promotion',
        },
      ];

      const promotions = component.getAllPromotionsForCart(mockedCart);
      expect(promotions).toEqual(expectedResult);
    });
  });

  describe('when cart has potentialProductPromotions is empty and appliedProductPromotions is defined', () => {
    it('should have one consumedEntries', () => {
      const mockedCart: Cart = {
        guid: '7',
        potentialProductPromotions: [],
        appliedProductPromotions: [
          {
            consumedEntries: [
              {
                orderEntryNumber: 2,
              },
            ],
            description: 'test applied product promotion',
          },
        ],
      };

      const expectedResult: PromotionResult[] = [
        {
          consumedEntries: [
            {
              orderEntryNumber: 2,
            },
          ],
          description: 'test applied product promotion',
        },
      ];

      const promotions = component.getAllPromotionsForCart(mockedCart);
      expect(promotions).toEqual(expectedResult);
    });
  });

  describe('when cart has potentialProductPromotions is defined and appliedProductPromotions is empty', () => {
    it('should have one consumedEntries', () => {
      const mockedCart: Cart = {
        guid: '8',
        potentialProductPromotions: [
          {
            consumedEntries: [
              {
                orderEntryNumber: 1,
              },
            ],
            description: 'test potential product promotion',
          },
        ],
        appliedProductPromotions: [],
      };

      const expectedResult: PromotionResult[] = [
        {
          consumedEntries: [
            {
              orderEntryNumber: 1,
            },
          ],
          description: 'test potential product promotion',
        },
      ];

      const promotions = component.getAllPromotionsForCart(mockedCart);
      expect(promotions).toEqual(expectedResult);
    });
  });

  describe('when cart has potentialProductPromotions is defined and appliedProductPromotions is undefined', () => {
    it('should have one consumedEntries', () => {
      const mockedCart: Cart = {
        guid: '9',
        potentialOrderPromotions: [
          {
            consumedEntries: [
              {
                orderEntryNumber: 1,
              },
            ],
            description: 'test potential product promotion',
          },
        ],
      };

      const expectedResult: PromotionResult[] = [
        {
          consumedEntries: [
            {
              orderEntryNumber: 1,
            },
          ],
          description: 'test potential product promotion',
        },
      ];

      const promotions = component.getAllPromotionsForCart(mockedCart);
      expect(promotions).toEqual(expectedResult);
    });
  });

  describe('when cart has potentialProductPromotions is undefined and appliedProductPromotions is defined', () => {
    it('should have one consumedEntries', () => {
      const mockedCart: Cart = {
        guid: '10',
        appliedProductPromotions: [
          {
            consumedEntries: [
              {
                orderEntryNumber: 2,
              },
            ],
            description: 'test applied product promotion',
          },
        ],
      };

      const expectedResult: PromotionResult[] = [
        {
          consumedEntries: [
            {
              orderEntryNumber: 2,
            },
          ],
          description: 'test applied product promotion',
        },
      ];

      const promotions = component.getAllPromotionsForCart(mockedCart);
      expect(promotions).toEqual(expectedResult);
    });
  });

  // appliedProductPromotions and appliedOrderPromotion tests
  describe('when cart has appliedProductPromotions and appliedOrderPromotions both defined', () => {
    it('should have two consumedEntries', () => {
      const mockedCart: Cart = {
        guid: '11',
        appliedOrderPromotions: [
          {
            consumedEntries: [
              {
                orderEntryNumber: 1,
              },
            ],
            description: 'test applied order promotion',
          },
        ],
        appliedProductPromotions: [
          {
            consumedEntries: [
              {
                orderEntryNumber: 2,
              },
            ],
            description: 'test applied product promotion',
          },
        ],
      };

      const expectedResult: PromotionResult[] = [
        {
          consumedEntries: [
            {
              orderEntryNumber: 1,
            },
          ],
          description: 'test applied order promotion',
        },
        {
          consumedEntries: [
            {
              orderEntryNumber: 2,
            },
          ],
          description: 'test applied product promotion',
        },
      ];

      const promotions = component.getAllPromotionsForCart(mockedCart);
      expect(promotions).toEqual(expectedResult);
    });
  });

  describe('when cart has appliedProductPromotions is empty and appliedOrderPromotions is defined', () => {
    it('should have one consumedEntries', () => {
      const mockedCart: Cart = {
        guid: '12',
        appliedProductPromotions: [],
        appliedOrderPromotions: [
          {
            consumedEntries: [
              {
                orderEntryNumber: 2,
              },
            ],
            description: 'test applied order promotion',
          },
        ],
      };

      const expectedResult: PromotionResult[] = [
        {
          consumedEntries: [
            {
              orderEntryNumber: 2,
            },
          ],
          description: 'test applied order promotion',
        },
      ];

      const promotions = component.getAllPromotionsForCart(mockedCart);
      expect(promotions).toEqual(expectedResult);
    });
  });

  describe('when cart has appliedProductPromotions is defined and appliedOrderPromotions is empty', () => {
    it('should have one consumedEntries', () => {
      const mockedCart: Cart = {
        guid: '13',
        appliedProductPromotions: [
          {
            consumedEntries: [
              {
                orderEntryNumber: 1,
              },
            ],
            description: 'test applied product promotion',
          },
        ],
        appliedOrderPromotions: [],
      };

      const expectedResult: PromotionResult[] = [
        {
          consumedEntries: [
            {
              orderEntryNumber: 1,
            },
          ],
          description: 'test applied product promotion',
        },
      ];

      const promotions = component.getAllPromotionsForCart(mockedCart);
      expect(promotions).toEqual(expectedResult);
    });
  });

  describe('when cart has appliedProductPromotions is defined and appliedOrderPromotions is undefined', () => {
    it('should have one consumedEntries', () => {
      const mockedCart: Cart = {
        guid: '14',
        appliedProductPromotions: [
          {
            consumedEntries: [
              {
                orderEntryNumber: 1,
              },
            ],
            description: 'test applied product promotion',
          },
        ],
      };

      const expectedResult: PromotionResult[] = [
        {
          consumedEntries: [
            {
              orderEntryNumber: 1,
            },
          ],
          description: 'test applied product promotion',
        },
      ];

      const promotions = component.getAllPromotionsForCart(mockedCart);
      expect(promotions).toEqual(expectedResult);
    });
  });

  describe('when cart has appliedProductPromotions is undefined and appliedOrderPromotions is defined', () => {
    it('should have one consumedEntries', () => {
      const mockedCart: Cart = {
        guid: '15',
        appliedOrderPromotions: [
          {
            consumedEntries: [
              {
                orderEntryNumber: 2,
              },
            ],
            description: 'test applied order promotion',
          },
        ],
      };

      const expectedResult: PromotionResult[] = [
        {
          consumedEntries: [
            {
              orderEntryNumber: 2,
            },
          ],
          description: 'test applied order promotion',
        },
      ];

      const promotions = component.getAllPromotionsForCart(mockedCart);
      expect(promotions).toEqual(expectedResult);
    });
  });

  // All promotions
  describe('when all promotions are empty', () => {
    it('should have zero consumedEntries', () => {
      const mockedCart: Cart = {
        guid: '16',
        appliedOrderPromotions: [],
        appliedProductPromotions: [],
        potentialOrderPromotions: [],
        potentialProductPromotions: [],
      };

      const expectedResult: PromotionResult[] = [];

      const promotions = component.getAllPromotionsForCart(mockedCart);
      expect(promotions).toEqual(expectedResult);
    });
  });

  describe('when all promotions are undefined', () => {
    it('should have zero consumedEntries', () => {
      const mockedCart: Cart = {
        guid: '17',
      };

      const expectedResult: PromotionResult[] = [];

      const promotions = component.getAllPromotionsForCart(mockedCart);
      expect(promotions).toEqual(expectedResult);
    });
  });
});
