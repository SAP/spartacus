import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { CostCenter } from '../../../model/org-unit.model';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { UserActions } from '../actions/index';
import * as fromReducers from '../reducers/index';
import { UsersSelectors } from '../selectors/index';
import { StateWithUser, USER_FEATURE } from '../user-state';

const mockCostCenters: CostCenter[] = [{ code: 'test' }];

describe('User Cost Centers Selectors', () => {
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

  describe('getCostCentersState', () => {
    it('should return cost centers state', () => {
      let result: LoaderState<CostCenter[]>;
      store
        .pipe(select(UsersSelectors.getCostCentersState))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual({
        loading: false,
        error: false,
        success: false,
        value: [],
      });
    });
  });

  describe('getCostCenters', () => {
    it('should return user cost centers', () => {
      let result: CostCenter[];
      store
        .pipe(select(UsersSelectors.getCostCenters))
        .subscribe((value) => (result = value));
      expect(result).toEqual([]);

      store.dispatch(
        new UserActions.LoadActiveCostCentersSuccess(mockCostCenters)
      );
      expect(result).toEqual(mockCostCenters);
    });
  });
});
