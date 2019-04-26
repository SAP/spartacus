import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductInterestsService } from '../../occ';
import { provideMockActions } from '@ngrx/effects/testing';
import * as fromInterestsEffect from './product-interests.effect';
import * as fromInterestsAction from '../actions/product-interests.actions';
import { Actions } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { ProductInterestList } from '../../model/product-interest.model';
import { hot, cold } from 'jasmine-marbles';
import { Action } from '@ngrx/store';
import { LoaderResetAction } from '../../../state';
import { PRODUCT_INTERESTS } from '../user-state';

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
  let productInterestsService: ProductInterestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductInterestsService,
        fromInterestsEffect.ProductInterestsEffect,
        provideMockActions(() => actions$),
      ],
    });

    actions$ = TestBed.get(Actions);
    productInterestsEffect = TestBed.get(
      fromInterestsEffect.ProductInterestsEffect
    );
    productInterestsService = TestBed.get(ProductInterestsService);
  });

  describe('loadProductInteres$', () => {
    it('should be able to load product interests', () => {
      const interests: ProductInterestList = {
        results: [],
        sorts: [],
        pagination: {},
      };
      spyOn(productInterestsService, 'getInterests').and.returnValue(
        of(interests)
      );
      const action = new fromInterestsAction.LoadProductInterests(loadParams);
      const completion = new fromInterestsAction.LoadProductInterestsSuccess(
        interests
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(productInterestsEffect.loadProductInteres$).toBeObservable(
        expected
      );
    });
    it('should be able to handle failures for load product interests', () => {
      spyOn(productInterestsService, 'getInterests').and.returnValue(
        throwError('Error')
      );
      const action = new fromInterestsAction.LoadProductInterests(loadParams);
      const completion = new fromInterestsAction.LoadProductInterestsFail(
        'Error'
      );

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
      spyOn(productInterestsService, 'removeInterests').and.returnValue(
        of(delRes)
      );
      const action = new fromInterestsAction.DeleteProductInterests(delParams);
      const completion = new fromInterestsAction.DeleteProductInterestsSuccess(
        delRes
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(productInterestsEffect.deleteProductInterests$).toBeObservable(
        expected
      );
    });
    it('should be able to handle failures for delete product interests', () => {
      spyOn(productInterestsService, 'removeInterests').and.returnValue(
        throwError('Error')
      );
      const action = new fromInterestsAction.DeleteProductInterests(delParams);
      const completion = new fromInterestsAction.DeleteProductInterestsFail(
        'Error'
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(productInterestsEffect.deleteProductInterests$).toBeObservable(
        expected
      );
    });
  });

  describe('resetProductInterests$', () => {
    it('should be able to return a reset action', () => {
      const action: Action = {
        type: fromInterestsAction.DELETE_PRODUCT_INTERESTS_SUCCESS,
      };
      const completion = new LoaderResetAction(PRODUCT_INTERESTS);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(productInterestsEffect.resetProductInterests$).toBeObservable(
        expected
      );
    });
  });
});
