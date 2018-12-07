import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { hot, cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import { OccProductService } from '../../occ/product.service';
import { PageType } from '../../../occ-models/occ.models';
import { ProductImageConverterService } from '../converters/product-image-converter.service';
import { ProductReferenceConverterService } from '../converters/product-reference-converter.service';

import * as fromEffects from './product.effect';
import * as fromActions from '../actions/product.action';
import { StoreModule } from '@ngrx/store';
import { RoutingService } from '../../../routing/facade/routing.service';
import { Product } from '../../../occ-models';
import { LanguageChange } from '../../../site-context/store/actions/languages.action';
import { OccConfig } from '../../../occ/config/occ-config';

const MockOccModuleConfig: OccConfig = {
  server: {
    baseUrl: '',
    occPrefix: ''
  }
};

const router = {
  state: {
    url: '/',
    queryParams: {},
    params: {},
    context: { id: '1', type: PageType.PRODUCT_PAGE },
    cmsRequired: false
  }
};
class MockRoutingService {
  getRouterState() {
    return of(router);
  }
}

describe('Product Effects', () => {
  let actions$: Observable<any>;
  let service: OccProductService;
  let effects: fromEffects.ProductEffects;

  const productCode = 'testCode';
  const product: Product = {
    code: 'testCode',
    name: 'testProduct'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],
      providers: [
        OccProductService,
        ProductImageConverterService,
        ProductReferenceConverterService,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        fromEffects.ProductEffects,
        provideMockActions(() => actions$),
        { provide: RoutingService, useClass: MockRoutingService }
      ]
    });
    service = TestBed.get(OccProductService);
    effects = TestBed.get(fromEffects.ProductEffects);

    spyOn(service, 'loadProduct').and.returnValue(of(product));
  });

  describe('loadProduct$', () => {
    it('should return searchResult from SearchProductsSuccess', () => {
      const action = new fromActions.LoadProduct(productCode);
      const completion = new fromActions.LoadProductSuccess(product);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadProduct$).toBeObservable(expected);
    });
  });

  describe('refreshProduct$', () => {
    it('should refresh a product', () => {
      const action = new LanguageChange();
      const completion = new fromActions.LoadProductSuccess(product);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.refreshProduct$).toBeObservable(expected);
    });
  });
});
