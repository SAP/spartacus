import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PageType } from './../../routing/models/page-context.model';
import { ProductGuard } from './product-guard';

import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as fromStore from './../store';
import * as fromRoot from './../../routing/store';

fdescribe('ProductGuard', () => {
  const productCode = '123';

  let productGuard: ProductGuard;
  let store: Store<fromStore.ProductsState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          products: combineReducers(fromStore.reducers)
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
      payload: {
        routerState: {
          url: '/test',
          queryParams: {},
          params: { productCode: productCode },
          context: { id: 'testPageId', type: PageType.PRODUCT_PAGE }
        },
        event: {}
      }
    });

    let result: boolean;
    productGuard.canActivate().subscribe(value => (result = value));

    expect(result).toBe(true);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadProduct(productCode)
    );
  });
});
