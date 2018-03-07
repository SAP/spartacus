import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';

import { MaterialModule } from 'app/material.module';

import * as fromRoot from '../../../routing/store';
import * as fromCart from '../../../cart/store';
import * as fromUser from '../../../auth/store';

import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { of } from 'rxjs/observable/of';

import { AddToCartComponent } from './add-to-cart.component';
import { CartService } from '../../../cart/services';

describe('AddToCartComponent', () => {
  let store: Store<fromCart.CartState>;
  let addToCartComponent: AddToCartComponent;
  let fixture: ComponentFixture<AddToCartComponent>;

  const productCode = '1234';
  const mockCartEntry: any = [
    { '1234': { entryNumber: 0, product: { code: productCode } } }
  ];

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MaterialModule,
          StoreModule.forRoot({
            ...fromRoot.reducers,
            cart: combineReducers(fromCart.reducers),
            user: combineReducers(fromUser.reducers)
          })
        ],
        declarations: [AddToCartComponent],
        providers: [CartService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToCartComponent);
    addToCartComponent = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'select').and.returnValue(of(mockCartEntry));
  });

  it('should be created', () => {
    expect(addToCartComponent).toBeTruthy();
  });

  it('should call ngOnChanges()', () => {
    addToCartComponent.productCode = productCode;
    addToCartComponent.ngOnChanges();
    addToCartComponent.cartEntry$.subscribe(entry =>
      expect(entry).toEqual(mockCartEntry)
    );
  });

  it(
    'should call addToCart()',
    inject([CartService], (cartService: CartService) => {
      spyOn(cartService, 'addCartEntry').and.callThrough();

      addToCartComponent.productCode = productCode;
      addToCartComponent.addToCart();
      expect(cartService.addCartEntry).toHaveBeenCalledWith(productCode, 1);
    })
  );

  // UI test will be added after replacing Material
});
