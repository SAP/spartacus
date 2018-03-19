import { OccProductService } from './../../../occ/product/product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { ConfigService } from './../../../occ/config.service';

import * as fromEffects from '../effects/product-reviews.effect';
import * as fromActions from '../actions/product-reviews.action';

const reviewData = {
  reviews: [
    {
      id: 1,
      rating: 3
    },
    {
      id: 2,
      rating: 5
    }
  ]
};

class MockActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

describe('Product reviews effect', () => {
  let actions$: MockActions;
  let service: OccProductService;
  let effects: fromEffects.ProductReviewsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccProductService,
        ConfigService,
        fromEffects.ProductReviewsEffects,
        {
          provide: Actions,
          useClass: MockActions
        }
      ]
    });

    actions$ = TestBed.get(Actions);
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

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadProductReviews$).toBeObservable(expected);
    });
  });
});
