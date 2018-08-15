import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import * as fromRoot from '../../../../routing/store';
import { CartDataService } from '../../../services/cart-data.service';
import { CartService } from '../../../services/cart.service';
import * as fromReducer from '../../../store/reducers';
import { CartItemComponent } from '../../cart-shared/cart-item/cart-item.component';
import { ItemCounterComponent } from '../../cart-shared/item-counter/item-counter.component';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { MediaModule } from './../../../../ui/components/media/media.module';
import { CartDetailsComponent } from './cart-details.component';

class MockCartService {
  removeCartEntry() {}
  loadCartDetails() {}
  updateCartEntry() {}
}

const mockCart = {
  appliedProductPromotions: [
    {
      consumedEntries: [
        {
          orderEntryNumber: 1
        }
      ],
      description: 'test applied product promtion'
    }
  ],
  potentialProductPromotions: [
    {
      consumedEntries: [
        {
          orderEntryNumber: 2
        }
      ],
      description: 'test potential product promtion'
    }
  ]
};
const mockEntries = [
  { entryNumber: 1, quantity: 1, product: { code: 'p1' } },
  { entryNumber: 2, quantity: 2, product: { code: 'p2' } }
];

describe('CartDetailsComponent', () => {
  let store: Store<fromReducer.CartState>;
  let component: CartDetailsComponent;
  let fixture: ComponentFixture<CartDetailsComponent>;
  let service: CartService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          cart: combineReducers(fromReducer.getReducers())
        }),
        MediaModule
      ],
      declarations: [
        CartDetailsComponent,
        OrderSummaryComponent,
        CartItemComponent,
        ItemCounterComponent
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
    service = TestBed.get(CartService);

    store = TestBed.get(Store);
    spyOn(store, 'select').and.returnValues(of(mockCart), of(mockEntries));

    spyOn(service, 'removeCartEntry').and.callThrough();
    spyOn(service, 'loadCartDetails').and.callThrough();
    spyOn(service, 'updateCartEntry').and.callThrough();
  });

  it('should create cart details component', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngInit to fill the formArray', () => {
    const form = component.form;
    expect(form.value).toEqual({});

    component.ngOnInit();
    expect(service.loadCartDetails).toHaveBeenCalled();

    component.cart$.subscribe();
    component.entries$.subscribe(() => {
      expect(form.value).toEqual({
        p1: { entryNumber: 1, quantity: 1 },
        p2: { entryNumber: 2, quantity: 2 }
      });
    });
  });

  it('should remove entry from cart', () => {
    component.ngOnInit();
    component.cart$.subscribe();
    component.entries$.subscribe();
    const form = component.form as FormGroup;

    expect(Object.keys(form.controls).length).toBe(2);
    component.removeEntry({
      entryNumber: 1,
      quantity: 1,
      product: { code: 'p1' }
    });

    expect(service.removeCartEntry).toHaveBeenCalledWith({
      entryNumber: 1,
      quantity: 1,
      product: { code: 'p1' }
    });

    expect(Object.keys(form.controls).length).toBe(1);
  });

  it('should update entry in a cart', () => {
    component.ngOnInit();
    component.cart$.subscribe();
    component.entries$.subscribe();

    const param = {
      entry: {
        entryNumber: 1,
        quantity: 1,
        product: { code: 'p1' }
      },
      updatedQuantity: 2
    };

    component.updateEntry(param);

    expect(service.updateCartEntry).toHaveBeenCalledWith(1, 2);
  });

  it('should get potential promotion for product', () => {
    let promotion = component.getPotentialPromotionForEntry(
      mockCart,
      mockEntries[0]
    );
    expect(promotion).toEqual([]);
    promotion = component.getPotentialPromotionForEntry(
      mockCart,
      mockEntries[1]
    );
    expect(promotion).toEqual([
      {
        consumedEntries: [
          {
            orderEntryNumber: 2
          }
        ],
        description: 'test potential product promtion'
      }
    ]);
  });

  it('should get applied promotion for product', () => {
    let promotion = component.getAppliedPromotionForEntry(
      mockCart,
      mockEntries[0]
    );
    expect(promotion).toEqual([
      {
        consumedEntries: [
          {
            orderEntryNumber: 1
          }
        ],
        description: 'test applied product promtion'
      }
    ]);
    promotion = component.getAppliedPromotionForEntry(mockCart, mockEntries[1]);
    expect(promotion).toEqual([]);
  });
});
