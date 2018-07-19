import { MediaModule } from './../../../../ui/components/media/media.module';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { of } from 'rxjs';
import * as fromRoot from '../../../../routing/store';
import { CartService } from '../../../services/cart.service';
import * as fromReducer from '../../../store/reducers';
import { CartItemComponent } from '../../cart-shared/cart-item/cart-item.component';
import { ItemCounterComponent } from '../../cart-shared/item-counter/item-counter.component';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
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

const mockOneEntryFormGroup = { entryNumber: 1 };
const mockZeroIndex = 0;

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
        }),
        MediaModule
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
    let control = component.form.get('entryArry') as FormArray;
    expect(control.value).toEqual([]);

    component.ngOnInit();
    expect(service.loadCartDetails).toHaveBeenCalled();

    component.cart$.subscribe();
    component.entries$.subscribe(() => {
      control = component.form.get('entryArry') as FormArray;
      expect(control.value).toEqual([
        { entryNumber: 1, quantity: 1 },
        { entryNumber: 2, quantity: 2 }
      ]);
    });
  });

  it('should remove entry from cart', () => {
    component.ngOnInit();
    component.cart$.subscribe();
    component.entries$.subscribe();

    component.removeEntry(mockOneEntryFormGroup, mockZeroIndex);
    expect(service.removeCartEntry).toHaveBeenCalledWith({ entryNumber: 1 });

    const control = component.form.get('entryArry') as FormArray;
    expect(control.value.length).toBe(1);
    expect(control.value).toEqual([{ entryNumber: 2, quantity: 2 }]);
  });

  it('should update entry in a cart', () => {
    component.ngOnInit();
    component.cart$.subscribe();
    component.entries$.subscribe();

    component.updateEntry(mockOneEntryFormGroup, mockZeroIndex);
    expect(service.updateCartEntry).toHaveBeenCalledWith(1, 1);
  });

  it('should remove an entry if quantity is set to 0 in a cart', () => {
    component.ngOnInit();
    component.cart$.subscribe();
    component.entries$.subscribe();

    let control = component.form.get('entryArry').value[0];
    control.quantity = 0;

    component.updateEntry(mockOneEntryFormGroup, mockZeroIndex);

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
