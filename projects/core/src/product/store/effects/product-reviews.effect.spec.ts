import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import {
  GlobalMessage,
  GlobalMessageService,
} from '../../../global-message/index';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { Review } from '../../../model/product.model';
import { defaultOccProductConfig } from '../../../occ/adapters/product/default-occ-product-config';
import { OccConfig } from '../../../occ/config/occ-config';
import { ProductActions } from '../actions/index';
import * as fromEffects from '../effects/product-reviews.effect';
import { ProductReviewsConnector } from '../../connectors/index';
import createSpy = jasmine.createSpy;

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

class GlobalMessageServiceMock {
  add(_message: GlobalMessage): void {}
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
        { provide: GlobalMessageService, useValue: GlobalMessageServiceMock },
      ],
    });

    effects = TestBed.inject(fromEffects.ProductReviewsEffects);
  });

  describe('loadProductReviews$', () => {
    it('should return specified product reviews', () => {
      const productCode = '12345';
      const action = new ProductActions.LoadProductReviews(productCode);
      const completion = new ProductActions.LoadProductReviewsSuccess({
        productCode,
        list: reviewData,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadProductReviews$).toBeObservable(expected);
    });
  });
});
