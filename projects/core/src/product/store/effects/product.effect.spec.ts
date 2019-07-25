import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { PageType } from '../../../model/cms.model';
import { Product } from '../../../model/product.model';
import { defaultOccProductConfig } from '../../../occ/adapters/product/default-occ-product-config';
import { OccConfig } from '../../../occ/config/occ-config';
import { RoutingService } from '../../../routing/facade/routing.service';
import { ProductConnector } from '../../connectors/product/product.connector';
import { ProductActions } from '../actions/index';
import * as fromEffects from './product.effect';
import createSpy = jasmine.createSpy;

const router = {
  state: {
    url: '/',
    queryParams: {},
    params: {},
    context: { id: '1', type: PageType.PRODUCT_PAGE },
    cmsRequired: false,
  },
};
class MockRoutingService {
  getRouterState() {
    return of(router);
  }
}
const productCode = 'testCode';
const product: Product = {
  code: 'testCode',
  name: 'testProduct',
};

class MockProductConnector {
  get = createSpy().and.returnValue(of(product));
}

describe('Product Effects', () => {
  let actions$: Observable<ProductActions.ProductAction>;
  let effects: fromEffects.ProductEffects;

  const mockProductState = {
    details: {
      entities: {
        testLoadedCode: { loading: false, value: product },
        testLoadingCode: { loading: true, value: null },
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({ product: () => mockProductState }),
      ],
      providers: [
        { provide: ProductConnector, useClass: MockProductConnector },
        { provide: OccConfig, useValue: defaultOccProductConfig },
        fromEffects.ProductEffects,
        provideMockActions(() => actions$),
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    });
    effects = TestBed.get(fromEffects.ProductEffects);
  });

  describe('loadProduct$', () => {
    it('should return loadProductStart action if product not loaded', () => {
      const action = new ProductActions.LoadProduct(productCode);
      const completion = new ProductActions.LoadProductSuccess(product);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadProduct$).toBeObservable(expected);
    });
  });
});
