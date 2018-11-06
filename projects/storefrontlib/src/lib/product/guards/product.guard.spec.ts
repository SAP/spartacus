import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PageType } from './../../routing/models/page-context.model';
import { ProductGuard } from './product.guard';

import { Store, StoreModule } from '@ngrx/store';
import * as fromStore from './../store';
import { RoutingService } from '../../routing/facade/routing.service';
import { of } from 'rxjs';

const productCode = '123';
const product = {
  code: productCode,
  description: 'random'
};

const router = {
  state: {
    url: '/test',
    queryParams: {},
    params: { productCode: productCode },
    context: { id: 'testPageId', type: PageType.PRODUCT_PAGE }
  }
};
const mockRoutingService = {
  routerState$: of(router)
};
describe('ProductGuard', () => {
  let productGuard: ProductGuard;
  let store: Store<fromStore.ProductsState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('products', fromStore.getReducers())
      ],
      providers: [
        ProductGuard,
        { provide: RoutingService, useValue: mockRoutingService }
      ]
    });

    productGuard = TestBed.get(ProductGuard);
    store = TestBed.get(Store);
  });

  it('should return true and not dispatch LoadProduct action when a product is found', () => {
    store.dispatch(new fromStore.LoadProductSuccess(product));

    let result: boolean;
    productGuard.canActivate().subscribe(value => (result = value));
    expect(result).toBe(true);
  });
});
