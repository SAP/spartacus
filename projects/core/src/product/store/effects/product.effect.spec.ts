import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { AuthActions } from '../../../auth/user-auth/store/actions';
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
  getMany = createSpy().and.callFake((products) =>
    products.map((pr) => ({ ...pr, data$: of(product) }))
  );
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

    effects = TestBed.inject(fromEffects.ProductEffects);
  });

  describe('loadProduct$', () => {
    it('should return loadProductStart action if product not loaded', () => {
      const action = new ProductActions.LoadProduct(productCode);
      const completion = new ProductActions.LoadProductSuccess(product);
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(
        effects.loadProduct$({ scheduler: getTestScheduler() })
      ).toBeObservable(expected);
    });

    it('should group actions for specified time frame', () => {
      const action = new ProductActions.LoadProduct(productCode);
      const action2 = new ProductActions.LoadProduct(productCode, 'scope');
      const completion = new ProductActions.LoadProductSuccess(product);
      const completion2 = new ProductActions.LoadProductSuccess(
        product,
        'scope'
      );
      actions$ = hot('-a-b---a--b', { a: action, b: action2 });
      // first a-b are in 20 millisecond threshold so should be emitted together
      const expected = cold('-----(ab)a--b', { a: completion, b: completion2 });
      expect(
        effects.loadProduct$({ scheduler: getTestScheduler(), debounce: 20 })
      ).toBeObservable(expected);
    });
  });

  describe('clearProductPrice$', () => {
    const loginLogoutAction = ['Login', 'Logout'];

    loginLogoutAction.forEach((actionName) => {
      it(`should reset product price on ${actionName}`, () => {
        const action = new AuthActions[actionName]();
        const clearProductPrice = new ProductActions.ClearProductPrice();

        actions$ = hot('-a', { a: action });
        const expected = cold('-b', {
          b: clearProductPrice,
        });

        expect(effects.clearProductPrice$).toBeObservable(expected);
      });
    });
  });
});
