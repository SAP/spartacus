import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { ProductReviewsConnector } from '@spartacus/core';

import { cold, hot } from 'jasmine-marbles';

import { Observable, of } from 'rxjs';
import { OccConfig } from '../../../occ/config/occ-config';
import { defaultOccProductConfig } from '../../config/product-config';
import * as fromActions from '../actions/product-reviews.action';
import * as fromEffects from '../effects/product-reviews.effect';
import createSpy = jasmine.createSpy;
import { Review } from '../../../model/product.model';

const reviewData: Review[] = [
  {
    id: '1',
    rating: 3,
  },
  {
    id: '2',
    rating: 5,
  },
];

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

class MockProductReviewsConnector {
  get = createSpy('getList').and.returnValue(of(reviewData));
}

describe('Product reviews effect', () => {
  let actions$: Observable<Action>;
  let effects: fromEffects.ProductReviewsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ProductReviewsConnector,
          useClass: MockProductReviewsConnector,
        },
        { provide: OccConfig, useValue: MockOccModuleConfig },
        { provide: OccConfig, useValue: defaultOccProductConfig },
        fromEffects.ProductReviewsEffects,
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.get(fromEffects.ProductReviewsEffects);
  });

  describe('loadProductReveiws$', () => {
    it('should return specified product reviews', () => {
      const productCode = '12345';
      const action = new fromActions.LoadProductReviews(productCode);
      const completion = new fromActions.LoadProductReviewsSuccess({
        productCode,
        list: reviewData,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadProductReviews$).toBeObservable(expected);
    });
  });
});
