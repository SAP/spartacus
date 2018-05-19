import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Actions } from '@ngrx/effects';

import { hot, cold } from 'jasmine-marbles';
import { Observable ,  EMPTY ,  of } from 'rxjs';

import { OccProductService } from '../../../occ/product/product.service';
import { ConfigService } from '../../../occ/config.service';
import { ProductImageConverterService } from '../../converters/product-image-converter.service';
import { ProductReferenceConverterService } from '../../converters/product-reference-converter.service';

import * as fromEffects from './product.effect';
import * as fromActions from '../actions/product.action';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import * as fromRoot from '../../../routing/store';
import * as fromCmsReducer from '../../../cms/store/reducers';
import * as fromSiteContext from './../../../site-context/shared/store';
import { PageType } from '../../../routing/models/page-context.model';

@Injectable()
export class TestActions extends Actions {
  constructor() {
    super(EMPTY);
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('Product Effects', () => {
  let store: Store<fromRoot.State>;
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
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          cms: combineReducers(fromCmsReducer.reducers)
        })
      ],
      providers: [
        OccProductService,
        ProductImageConverterService,
        ProductReferenceConverterService,
        ConfigService,
        fromEffects.ProductEffects,
        { provide: Actions, useFactory: getActions }
      ]
    });

    store = TestBed.get(Store);
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
      const router = {
        state: {
          url: '/',
          queryParams: {},
          params: {},
          context: { id: '1', type: PageType.PRODUCT_PAGE },
          cmsRequired: false
        }
      };

      spyOn(store, 'select').and.returnValue(of(router));

      const action = new fromSiteContext.LanguageChange();
      const completion = new fromActions.LoadProductSuccess(product);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.refreshProduct$).toBeObservable(expected);
    });
  });
});
