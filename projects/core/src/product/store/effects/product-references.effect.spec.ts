import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { ProductReference } from '../../../model/product.model';
import { defaultOccProductConfig } from '../../../occ/adapters/product/default-occ-product-config';
import { OccConfig } from '../../../occ/config/occ-config';
import { ProductReferencesConnector } from '../../connectors/references/product-references.connector';
import { ProductActions } from '../actions/index';
import * as fromEffects from '../effects/product-references.effect';
import createSpy = jasmine.createSpy;

const productCode = 'productCode';
const product = {
  code: productCode,
  name: 'testProduct',
};

const list: ProductReference[] = [
  { referenceType: 'SIMILAR', target: product },
  { referenceType: 'ACCESSORIES', target: product },
];

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

class MockProductReferencesConnector {
  get = createSpy('getList').and.returnValue(of(list));
}

describe('Product references effect', () => {
  let actions$: Observable<Action>;
  let effects: fromEffects.ProductReferencesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ProductReferencesConnector,
          useClass: MockProductReferencesConnector,
        },
        { provide: OccConfig, useValue: MockOccModuleConfig },
        { provide: OccConfig, useValue: defaultOccProductConfig },
        fromEffects.ProductReferencesEffects,
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.inject(fromEffects.ProductReferencesEffects);
  });

  describe('loadProductReferences$', () => {
    it('should return specified product references', () => {
      const action = new ProductActions.LoadProductReferences({ productCode });
      const completion = new ProductActions.LoadProductReferencesSuccess({
        productCode,
        list,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadProductReferences$).toBeObservable(expected);
    });
  });
});
