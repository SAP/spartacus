import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { StateWithUser, USER_FEATURE } from '../user-state';
import * as fromReducers from '../reducers/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { ProductInterestSearchResult } from '../../../model/product-interest.model';
import { UserActions } from '../actions/index';
import { UsersSelectors } from '../selectors/index';

const emptyInterestList: ProductInterestSearchResult = {
  results: [],
  sorts: [],
  pagination: {},
};
const mockedInterestList: ProductInterestSearchResult = {
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
  let store: Store<StateWithUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getInterestsState', () => {
    it('should return product interests state', () => {
      let result: LoaderState<ProductInterestSearchResult>;
      store
        .pipe(select(UsersSelectors.getInterestsState))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual({
        loading: false,
        error: false,
        success: false,
        value: emptyInterestList,
      });
    });
  });

  describe('getInterests', () => {
    it('should return a ProductInterestList', () => {
      let result: ProductInterestSearchResult;
      store
        .pipe(select(UsersSelectors.getInterests))
        .subscribe((value) => (result = value));
      expect(result).toEqual(emptyInterestList);

      store.dispatch(
        new UserActions.LoadProductInterestsSuccess(mockedInterestList)
      );
      expect(result).toEqual(mockedInterestList);
    });
  });

  describe('getInterestsLoading', () => {
    it('should return success flag of interests state', () => {
      let result: boolean;
      store
        .pipe(select(UsersSelectors.getInterestsLoading))
        .subscribe((value) => (result = value));
      expect(result).toEqual(false);

      store.dispatch(
        new UserActions.LoadProductInterests({ userId: 'userId' })
      );
      expect(result).toEqual(true);
    });
  });
});
