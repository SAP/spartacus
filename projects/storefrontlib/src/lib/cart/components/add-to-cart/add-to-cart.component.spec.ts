import {
  ComponentFixture,
  TestBed,
  async,
  inject
} from '@angular/core/testing';
import { MatDialog } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { of } from 'rxjs';
import { CartService } from '../../../cart/services';
import * as fromCart from '../../../cart/store';
import { MaterialModule } from '../../../material.module';
import * as fromRoot from '../../../routing/store';
import * as fromUser from '../../../user/store';
import { CartSharedModule } from '../cart-shared/cart-shared.module';
import { AddToCartComponent } from './add-to-cart.component';

describe('AddToCartComponent', () => {
  let store: Store<fromCart.CartState>;
  let addToCartComponent: AddToCartComponent;
  let fixture: ComponentFixture<AddToCartComponent>;

  const productCode = '1234';
  const mockCartEntry: any = [
    { '1234': { entryNumber: 0, product: { code: productCode } } }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        CartSharedModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          cart: combineReducers(fromCart.reducers),
          user: combineReducers(fromUser.reducers)
        })
      ],
      declarations: [AddToCartComponent],
      providers: [CartService]
    }).compileComponents();
  }));

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

  it('should call addToCart()', inject(
    [CartService, MatDialog],
    (cartService: CartService, matDialog: MatDialog) => {
      spyOn(cartService, 'addCartEntry').and.callThrough();
      spyOn(matDialog, 'open').and.callThrough();

      addToCartComponent.productCode = productCode;
      addToCartComponent.addToCart();
      expect(cartService.addCartEntry).toHaveBeenCalledWith(productCode, 1);
    }
  ));

  // UI test will be added after replacing Material
});
