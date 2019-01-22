import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CartDataService } from '@spartacus/core';
import { CartService } from '@spartacus/core';

import { CartDetailsComponent } from './cart-details.component';
import { Pipe, PipeTransform, Component, Input } from '@angular/core';

class MockCartService {
  removeEntry() {}
  loadDetails() {}
  updateEntry() {}
}

const mockData = [
  {
    cart: {
      id: 1,
      potentialOrderPromotions: [
        {
          consumedEntries: [
            {
              orderEntryNumber: 1
            }
          ],
          description: 'test applied product promtion'
        }
      ],
      appliedOrderPromotions: [
        {
          consumedEntries: [
            {
              orderEntryNumber: 2
            }
          ],
          description: 'test potential product promtion'
        }
      ]
    },
    expectedResult: [
      {
        consumedEntries: [
          {
            orderEntryNumber: 1
          }
        ],
        description: 'test applied product promtion'
      },
      {
        consumedEntries: [
          {
            orderEntryNumber: 2
          }
        ],
        description: 'test potential product promtion'
      }
    ]
  },
  {
    cart: {
      id: 2,
      potentialOrderPromotions: [],
      appliedOrderPromotions: [
        {
          consumedEntries: [
            {
              orderEntryNumber: 2
            }
          ],
          description: 'test potential product promtion'
        }
      ]
    },
    expectedResult: [
      {
        consumedEntries: [
          {
            orderEntryNumber: 2
          }
        ],
        description: 'test potential product promtion'
      }
    ]
  },
  {
    cart: {
      id: 3,
      potentialOrderPromotions: [
        {
          consumedEntries: [
            {
              orderEntryNumber: 1
            }
          ],
          description: 'test applied product promtion'
        }
      ],
      appliedOrderPromotions: []
    },
    expectedResult: [
      {
        consumedEntries: [
          {
            orderEntryNumber: 1
          }
        ],
        description: 'test applied product promtion'
      }
    ]
  },
  {
    cart: {
      id: 4,
      potentialOrderPromotions: [
        {
          consumedEntries: [
            {
              orderEntryNumber: 1
            }
          ],
          description: 'test applied product promtion'
        }
      ]
    },
    expectedResult: [
      {
        consumedEntries: [
          {
            orderEntryNumber: 1
          }
        ],
        description: 'test applied product promtion'
      }
    ]
  },
  {
    cart: {
      id: 5,
      appliedOrderPromotions: [
        {
          consumedEntries: [
            {
              orderEntryNumber: 2
            }
          ],
          description: 'test potential product promtion'
        }
      ]
    },
    expectedResult: [
      {
        consumedEntries: [
          {
            orderEntryNumber: 2
          }
        ],
        description: 'test potential product promtion'
      }
    ]
  }
];
@Pipe({
  name: 'cxTranslateUrl'
})
class MockTranslateUrlPipe implements PipeTransform {
  transform() {}
}

@Component({
  template: '',
  selector: 'cx-cart-item-list'
})
class MockCartItemListComponent {
  @Input()
  items;
  @Input()
  potentialProductPromotions;
  @Input()
  cartIsLoading;
}
@Component({
  template: '',
  selector: 'cx-order-summary'
})
class MockOrderSummaryComponent {
  @Input()
  cart;
}

@Component({
  selector: 'cx-dynamic-slot',
  template: 'dynamic-slot.component'
})
export class MockDynamicSlotComponent {
  @Input()
  position: string;
}

describe('CartDetailsComponent', () => {
  let component: CartDetailsComponent;
  let fixture: ComponentFixture<CartDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        CartDetailsComponent,
        MockCartItemListComponent,
        MockOrderSummaryComponent,
        MockDynamicSlotComponent,
        MockTranslateUrlPipe
      ],
      providers: [
        CartDataService,
        { provide: CartService, useClass: MockCartService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create cart details component', () => {
    expect(component).toBeTruthy();
  });

  mockData.forEach(({ cart, expectedResult }) => {
    it(`should get all promotions for cart ${cart.id}`, () => {
      const promotions = component.getAllPromotionsForCart(cart);
      expect(promotions).toEqual(expectedResult);
    });

    it(`should check if cart has promotions ${cart.id}`, () => {
      const hasPromotion = component.cartHasPromotions(cart);
      expect(hasPromotion).toEqual(expectedResult.length > 0);
    });
  });
});
