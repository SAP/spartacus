import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';

import { Observable, of } from 'rxjs';

import { cold, hot } from 'jasmine-marbles';

import * as fromActions from '../actions/product.action';
import { ProductImageNormalizer } from '../../occ/converters/product-image-normalizer';
import { ProductReferenceNormalizer } from '../../occ/converters/product-reference-normalizer';
import { ProductConnector } from '../../connectors/product/product.connector';
import { Product } from '../../../occ/occ-models';
import { OccConfig } from '../../../occ/config/occ-config';
import { PageType } from '../../../occ/occ-models/occ.models';
import { RoutingService } from '../../../routing/facade/routing.service';

import * as fromEffects from './product.effect';
import { defaultOccProductConfig } from '../../config/product-config';
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
  let actions$: Observable<fromActions.ProductAction>;
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
        ProductImageNormalizer,
        ProductReferenceNormalizer,
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
      const action = new fromActions.LoadProduct(productCode);
      const completion = new fromActions.LoadProductSuccess(product);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadProduct$).toBeObservable(expected);
    });
  });
});
