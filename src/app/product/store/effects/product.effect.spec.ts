import { PageType } from './../../../routing/models/page-context.model';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Actions } from '@ngrx/effects';

import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { OccProductService } from '../../../newocc/product/product.service';
import { ConfigService } from '../../../newocc/config.service';
import { ProductImageConverterService } from '../../converters/product-image-converter.service';
import { ProductReferenceConverterService } from '../../converters/product-reference-converter.service';

import * as fromEffects from './product.effect';
import * as fromActions from '../actions/product.action';
import * as fromSiteContextActions from './../../../site-context/shared/store/actions';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

fdescribe('Product Effects', () => {
  let actions$: TestActions;
  let service: OccProductService;
  let effects: fromEffects.ProductEffects;

  const productCode = 'testCode';
  const product = {
    code: 'testCode',
    name: 'testProduct'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccProductService,
        ProductImageConverterService,
        ProductReferenceConverterService,
        ConfigService,
        fromEffects.ProductEffects,
        { provide: Actions, useFactory: getActions }
      ]
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(OccProductService);
    effects = TestBed.get(fromEffects.ProductEffects);

    spyOn(service, 'loadProduct').and.returnValue(of(product));
  });

  describe('loadProduct$', () => {
    it('should return searchResult from SearchProductsSuccess', () => {
      const action = new fromActions.LoadProduct(productCode);
      const completion = new fromActions.LoadProductSuccess(product);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadProduct$).toBeObservable(expected);
    });
  });

  describe('refreshProduct$', () => {
    it('should refresh a product', () => {
      const pageContext = {
        id: '1',
        type: PageType.PRODUCT_PAGE
      };
      const action = new fromSiteContextActions.LanguageChange(pageContext);
      const completion = new fromActions.LoadProductSuccess(product);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.refreshProduct$).toBeObservable(expected);
    });
  });
});
