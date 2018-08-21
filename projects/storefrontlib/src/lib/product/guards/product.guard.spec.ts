import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PageType } from './../../routing/models/page-context.model';
import { ProductGuard } from './product.guard';

import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as fromStore from './../store';
import * as fromRoot from './../../routing/store';

const productCode = '123';
const product = {
  code: productCode,
  description: 'random'
};

describe('ProductGuard', () => {
  let productGuard: ProductGuard;
  let store: Store<fromStore.ProductsState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          products: combineReducers(fromStore.getReducers())
        })
      ],
      providers: [ProductGuard]
    });

    productGuard = TestBed.get(ProductGuard);
    store = TestBed.get(Store);
  });

  it('should return true and not dispatch LoadProduct action when a product is found', () => {
    store.dispatch(new fromStore.LoadProductSuccess(product));
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
  });
});
