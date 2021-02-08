import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { CostCenter, StateUtils } from '@spartacus/core';
import { CostCenterActions } from '../actions/index';
import {
  CostCenterManagement,
  ORGANIZATION_FEATURE,
  StateWithOrganization,
} from '../organization-state';
import * as fromReducers from '../reducers/index';
import { CostCenterSelectors } from './index';

describe('CostCenter Selectors', () => {
  let store: Store<StateWithOrganization>;

  const code = 'testCode';
  const costCenter: CostCenter = {
    code,
    name: 'testCostCenter',
  };
  const costCenter2: CostCenter = {
    code: 'testCode2',
    name: 'testCostCenter2',
  };

  const entities = {
    testCode: {
      loading: false,
      error: false,
      success: true,
      value: costCenter,
    },
    testCode2: {
      loading: false,
      error: false,
      success: true,
      value: costCenter2,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          ORGANIZATION_FEATURE,
          fromReducers.getReducers()
        ),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getCostCenterManagementState ', () => {
    it('should return costCenters state', () => {
      let result: CostCenterManagement;
      store
        .pipe(select(CostCenterSelectors.getCostCenterManagementState))
        .subscribe((value) => (result = value));

      store.dispatch(
        new CostCenterActions.LoadCostCenterSuccess([costCenter, costCenter2])
      );
      expect(result).toEqual({
        entities: { entities },
        list: { entities: {} },
        budgets: { entities: {} },
      });
    });
  });

  describe('getCostCenters', () => {
    it('should return costCenters', () => {
      let result: StateUtils.EntityLoaderState<CostCenter>;
      store
        .pipe(select(CostCenterSelectors.getCostCentersState))
        .subscribe((value) => (result = value));

      store.dispatch(
        new CostCenterActions.LoadCostCenterSuccess([costCenter, costCenter2])
      );
      expect(result).toEqual({ entities });
    });
  });

  describe('getCostCenter', () => {
    it('should return costCenter by id', () => {
      let result: StateUtils.LoaderState<CostCenter>;
      store
        .pipe(select(CostCenterSelectors.getCostCenter(code)))
        .subscribe((value) => (result = value));

      store.dispatch(
        new CostCenterActions.LoadCostCenterSuccess([costCenter, costCenter2])
      );
      expect(result).toEqual(entities.testCode);
    });
  });
});
