import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import * as fromInterestsEffect from './product-interests.effect';
import { UserActions } from '../actions/index';
import { Actions } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import {
  NotificationType,
  ProductInterestSearchResult,
} from '../../../model/product-interest.model';
import { cold, hot } from 'jasmine-marbles';
import { UserInterestsConnector } from '../../connectors/interests/user-interests.connector';
import { UserInterestsAdapter } from '../../connectors/interests/user-interests.adapter';

const loadParams = {
  userId: 'qingyu@sap.com',
  pageSize: 5,
  currentPage: 1,
  sort: 'name:asc',
};

describe('Product Interests Effect', () => {
  let actions$: Actions;
  let productInterestsEffect: fromInterestsEffect.ProductInterestsEffect;
  let userInterestConnector: UserInterestsConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        fromInterestsEffect.ProductInterestsEffect,
        { provide: UserInterestsAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    // actions$ = TestBed.inject(Actions);
    productInterestsEffect = TestBed.inject(
      fromInterestsEffect.ProductInterestsEffect
    );
    userInterestConnector = TestBed.inject(UserInterestsConnector);
  });

  describe('loadProductInteres$', () => {
    it('should be able to load product interests', () => {
      const interests: ProductInterestSearchResult = {
        results: [],
        sorts: [],
        pagination: {},
      };
      spyOn(userInterestConnector, 'getInterests').and.returnValue(
        of(interests)
      );
      const action = new UserActions.LoadProductInterests(loadParams);
      const completion = new UserActions.LoadProductInterestsSuccess(interests);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(productInterestsEffect.loadProductInteres$).toBeObservable(
        expected
      );
    });
    it('should be able to handle failures for load product interests', () => {
      spyOn(userInterestConnector, 'getInterests').and.returnValue(
        throwError('Error')
      );
      const action = new UserActions.LoadProductInterests(loadParams);
      const completion = new UserActions.LoadProductInterestsFail(undefined);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(productInterestsEffect.loadProductInteres$).toBeObservable(
        expected
      );
    });
  });

  describe('removeProductInterests$', () => {
    const delParams = {
      userId: 'qingyu@sap.com',
      item: {},
    };

    const delParams1 = {
      ...delParams,
      item: {
        product: {
          code: '123456',
        },
        productInterestEntry: [
          {
            interestType: NotificationType.BACK_IN_STOCK,
          },
        ],
      },
      singleDelete: true,
    };

    it('should be able to remove product interests', () => {
      const delRes = '200';
      spyOn(userInterestConnector, 'removeInterest').and.returnValue(
        of([delRes])
      );
      const action = new UserActions.RemoveProductInterest(delParams);
      const loadSuccess = new UserActions.LoadProductInterests({
        userId: delParams.userId,
      });
      const removeSuccess = new UserActions.RemoveProductInterestSuccess([
        delRes,
      ]);

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: loadSuccess, c: removeSuccess });
      expect(productInterestsEffect.removeProductInterest$).toBeObservable(
        expected
      );
    });

    it('should be able to remove single product interest', () => {
      const delRes = '200';
      spyOn(userInterestConnector, 'removeInterest').and.returnValue(
        of([delRes])
      );
      const removeAction = new UserActions.RemoveProductInterest(delParams1);
      const loadAction = new UserActions.LoadProductInterests({
        userId: delParams.userId,
        productCode: delParams1.item.product.code,
        notificationType: delParams1.item.productInterestEntry[0].interestType,
      });
      const removeSuccess = new UserActions.RemoveProductInterestSuccess([
        delRes,
      ]);

      actions$ = hot('-a', { a: removeAction });
      const expected = cold('-(bc)', { b: loadAction, c: removeSuccess });
      expect(productInterestsEffect.removeProductInterest$).toBeObservable(
        expected
      );
    });

    it('should be able to handle failures for remove product interest', () => {
      spyOn(userInterestConnector, 'removeInterest').and.returnValue(
        throwError('Error')
      );
      const action = new UserActions.RemoveProductInterest(delParams);
      const completion = new UserActions.RemoveProductInterestFail(undefined);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(productInterestsEffect.removeProductInterest$).toBeObservable(
        expected
      );
    });
  });
});
