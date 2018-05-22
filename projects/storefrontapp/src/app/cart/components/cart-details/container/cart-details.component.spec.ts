import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { ReactiveFormsModule, FormArray } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { CartDetailsComponent } from './cart-details.component';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { ItemCounterComponent } from '../item-counter/item-counter.component';

import * as fromRoot from '../../../../routing/store';
import * as fromReducer from '../../../store/reducers';

import { CartService } from '../../../services/cart.service';
import { of } from 'rxjs';

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

const mockOneEntryFormGroup = { entry: { entryNumber: 1 }, index: 0 };

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
          ...fromRoot.reducers,
          cart: combineReducers(fromReducer.reducers)
        })
      ],
      declarations: [
        CartDetailsComponent,
        OrderSummaryComponent,
        CartItemComponent,
        ItemCounterComponent
      ],
      providers: [{ provide: CartService, useClass: MockCartService }]
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
    component.ngOnInit();
    expect(service.loadCartDetails).toHaveBeenCalled();

    let control = component.form.get('entryArry') as FormArray;
    expect(control.value).toEqual([]);

    component.cart$.subscribe();
    component.entries$.subscribe();

    control = component.form.get('entryArry') as FormArray;
    expect(control.value).toEqual([
      { entryNumber: 1, quantity: 1 },
      { entryNumber: 2, quantity: 2 }
    ]);
  });

  it('should remove entry from cart', () => {
    component.ngOnInit();
    component.cart$.subscribe();
    component.entries$.subscribe();

    component.removeEntry(mockOneEntryFormGroup);
    expect(service.removeCartEntry).toHaveBeenCalledWith({ entryNumber: 1 });

    const control = component.form.get('entryArry') as FormArray;
    expect(control.value.length).toBe(1);
    expect(control.value).toEqual([{ entryNumber: 2, quantity: 2 }]);
  });

  it('should update entry in a cart', () => {
    component.ngOnInit();
    component.cart$.subscribe();
    component.entries$.subscribe();

    component.updateEntry(mockOneEntryFormGroup);
    expect(service.updateCartEntry).toHaveBeenCalledWith(1, 1);
  });

  it('should remove an entry if quantity is set to 0 in a cart', () => {
    component.ngOnInit();
    component.cart$.subscribe();
    component.entries$.subscribe();

    let control = component.form.get('entryArry').value[0];
    control.quantity = 0;

    component.updateEntry({ entry: { entryNumber: 1 }, index: 0 });

    control = component.form.get('entryArry') as FormArray;
    expect(control.value.length).toBe(1);
    expect(control.value).toEqual([{ entryNumber: 2, quantity: 2 }]);
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
