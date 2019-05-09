import { TestBed } from '@angular/core/testing';

import { Store, StoreModule, select } from '@ngrx/store';

import * as fromActions from '../actions/index';
import * as fromReducers from '../reducers/index';
import * as fromSelectors from './index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { ProductInterestList } from '../../model/product-interest.model';
import {
  PRODUCT_INTERESTS_FEATURE,
  StateWithProductInterests,
} from '../product-interests-state';

const emptyInterestList: ProductInterestList = {
  results: [],
  sorts: [],
  pagination: {},
};
const mockedInterestList: ProductInterestList = {
  results: [],
  sorts: [
    {
      code: 'name',
      asc: true,
    },
  ],
  pagination: {
    page: 0,
    count: 1,
    totalCount: 1,
    totalPages: 1,
  },
};

describe('Product Interests Selectors', () => {
  let store: Store<StateWithProductInterests>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          PRODUCT_INTERESTS_FEATURE,
          fromReducers.getReducers()
        ),
      ],
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getInterestsState', () => {
    it('should return product interests state', () => {
      let result: LoaderState<ProductInterestList>;
      store
        .pipe(select(fromSelectors.getInterestsState))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual({
        loading: false,
        error: false,
        success: false,
        value: emptyInterestList,
      });
    });
  });

  describe('getInterestsLoaded', () => {
    it('should return success flag of interests state', () => {
      let result: boolean;
      store
        .pipe(select(fromSelectors.getInterestsLoaded))
        .subscribe(value => (result = value));
      expect(result).toEqual(false);

      store.dispatch(
        new fromActions.LoadProductInterestsSuccess(mockedInterestList)
      );
      expect(result).toEqual(true);
    });
  });

  describe('getInterests', () => {
    it('should return a ProductInterestList', () => {
      let result: ProductInterestList;
      store
        .pipe(select(fromSelectors.getInterests))
        .subscribe(value => (result = value));
      expect(result).toEqual(mockedInterestList);

      store.dispatch(
        new fromActions.LoadProductInterestsSuccess(mockedInterestList)
      );
      expect(result).toEqual(mockedInterestList);
    });
  });
});
