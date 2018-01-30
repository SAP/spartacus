import { ProductGuard } from './product-guard';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as fromStore from './store';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('ProductGuard', () => {
  const productCode = '123';
  const pageActionPayload = {
    routerState: {
      url: '/product',
      params: {
        productCode: productCode
      }
    }
  };

  let productGuard: ProductGuard;
  let store: Store<fromStore.ProductsState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromStore.reducers,
          product: combineReducers(fromStore.reducers)
        })
      ],
      providers: [ProductGuard]
    });

    productGuard = TestBed.get(ProductGuard);
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should return true when there is no error', () => {
    store.dispatch({
      type: 'ROUTER_NAVIGATION',
      payload: pageActionPayload
    });

    let result: boolean;
    productGuard.canActivate().subscribe(value => (result = value));

    expect(result).toBe(true);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadProduct(productCode),
      new fromStore.LoadProductReviews(productCode)
    );
  });
});
