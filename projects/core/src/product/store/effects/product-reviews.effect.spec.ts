import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from '../actions/product-reviews.action';
import * as fromEffects from '../effects/product-reviews.effect';
import { OccProductService } from '../../occ/product.service';
import { ReviewList } from '../../../occ/occ-models';
import { OccConfig } from '../../../occ/config/occ-config';
import { ProductConfig, defaultProductConfig } from '../../product-config';

const reviewData: ReviewList = {
  reviews: [
    {
      id: '1',
      rating: 3
    },
    {
      id: '2',
      rating: 5
    }
  ]
};

const MockOccModuleConfig: OccConfig = {
  server: {
    baseUrl: '',
    occPrefix: ''
  }
};

describe('Product reviews effect', () => {
  let actions$: Observable<Action>;
  let service: OccProductService;
  let effects: fromEffects.ProductReviewsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccProductService,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        { provide: ProductConfig, useValue: defaultProductConfig },
        fromEffects.ProductReviewsEffects,
        provideMockActions(() => actions$)
      ]
    });

    service = TestBed.get(OccProductService);
    effects = TestBed.get(fromEffects.ProductReviewsEffects);

    spyOn(service, 'loadProductReviews').and.returnValue(of(reviewData));
  });

  describe('loadProductReveiws$', () => {
    it('should return specified product reviews', () => {
      const productCode = '12345';
      const action = new fromActions.LoadProductReviews(productCode);
      const completion = new fromActions.LoadProductReviewsSuccess({
        productCode,
        list: reviewData.reviews
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadProductReviews$).toBeObservable(expected);
    });
  });
});
