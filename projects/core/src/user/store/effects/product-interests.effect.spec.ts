import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import * as fromInterestsEffect from './product-interests.effect';
import { UserActions } from '../actions/index';
import { Actions } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { ProductInterestSearchResult } from '../../../model/product-interest.model';
import { hot, cold } from 'jasmine-marbles';
import { UserInterestsConnector } from '../../connectors/interests/user-interests.connector';

const loadParams = {
  userId: 'jack.ma@hybris.com',
  pageSize: 5,
  currentPage: 1,
  sort: 'name:asc',
};
const delParams = {
  userId: 'jack.ma@hybris.com',
  item: {},
};

describe('Product Interests Effect', () => {
  let actions$: Actions;
  let productInterestsEffect: fromInterestsEffect.ProductInterestsEffect;
  let userInterestConnector: UserInterestsConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserInterestsConnector,
        fromInterestsEffect.ProductInterestsEffect,
        provideMockActions(() => actions$),
      ],
    });

    actions$ = TestBed.get(Actions);
    productInterestsEffect = TestBed.get(
      fromInterestsEffect.ProductInterestsEffect
    );
    userInterestConnector = TestBed.get(UserInterestsConnector);
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
      const completion = new UserActions.LoadProductInterestsFail('Error');

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(productInterestsEffect.loadProductInteres$).toBeObservable(
        expected
      );
    });
  });

  describe('deleteProductInterests$', () => {
    it('should be able to delete product interest', () => {
      const delRes = '200';
      spyOn(userInterestConnector, 'removeInterests').and.returnValue(
        of([{ delRes }])
      );
      const action = new UserActions.RemoveProductInterests(delParams);
      const completion = new UserActions.RemoveProductInterestsSuccess(delRes);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(productInterestsEffect.removeProductInterests$).toBeObservable(
        expected
      );
    });
    it('should be able to handle failures for delete product interests', () => {
      spyOn(userInterestConnector, 'removeInterests').and.returnValue(
        throwError('Error')
      );
      const action = new UserActions.RemoveProductInterests(delParams);
      const completion = new UserActions.RemoveProductInterestsFail('Error');

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(productInterestsEffect.removeProductInterests$).toBeObservable(
        expected
      );
    });
  });

  // describe('resetProductInterests$', () => {
  //   it('should be able to return a reset action', () => {
  //     const action: Action = {
  //       type: UserActions.REMOVE_PRODUCT_INTERESTS_SUCCESS,
  //     };
  //     const completion = new LoaderResetAction(PRODUCT_INTERESTS);

  //     actions$ = hot('-a', { a: action });
  //     const expected = cold('-b', { b: completion });

  //     expect(productInterestsEffect.resetProductInterests$).toBeObservable(
  //       expected
  //     );
  //   });
  // });
});
