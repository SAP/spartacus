import { inject, TestBed } from '@angular/core/testing';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store, StoreModule } from '@ngrx/store';
import {
  CostCenter,
  EntitiesModel,
  SearchConfig,
  UserIdService,
} from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Budget } from '../model/budget.model';
import {
  LoadStatus,
  OrganizationItemStatus,
} from '../model/organization-item-status';
import { BudgetActions, CostCenterActions } from '../store/actions/index';
import {
  ORGANIZATION_FEATURE,
  StateWithOrganization,
} from '../store/organization-state';
import * as fromReducers from '../store/reducers/index';
import { CostCenterService } from './cost-center.service';

const userId = 'current';
const costCenterCode = 'testCostCenter';
const costCenter = { code: costCenterCode };
const costCenter2 = { code: 'testCostCenter2' };
const pagination = { currentPage: 1 };
const sorts = [{ selected: true, name: 'code' }];
const costCenterList: EntitiesModel<CostCenter> = {
  values: [costCenter, costCenter2],
  pagination,
  sorts,
};

const budgetCode = 'testBudget';
const budget = { code: budgetCode };
const budget2 = { code: 'testBudget2' };
const budgetList: EntitiesModel<Budget> = {
  values: [budget, budget2],
  pagination,
  sorts,
};

let takeUserId$: BehaviorSubject<string | never>;
class MockUserIdService implements Partial<UserIdService> {
  takeUserId = () => takeUserId$.asObservable();
}
describe('CostCenterService', () => {
  let service: CostCenterService;
  let userIdService: UserIdService;
  let store: Store<StateWithOrganization>;
  let actions$: ActionsSubject;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          ORGANIZATION_FEATURE,
          fromReducers.getReducers()
        ),
      ],
      providers: [
        CostCenterService,
        { provide: UserIdService, useClass: MockUserIdService },
      ],
    });

    store = TestBed.inject(Store);
    service = TestBed.inject(CostCenterService);
    userIdService = TestBed.inject(UserIdService);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(userIdService, 'takeUserId').and.callThrough();

    actions$ = TestBed.inject(ActionsSubject);
    takeUserId$ = new BehaviorSubject(userId);
  });

  it('should CostCenterService is injected', inject(
    [CostCenterService],
    (costCenterService: CostCenterService) => {
      expect(costCenterService).toBeTruthy();
    }
  ));

  describe('get costCenter', () => {
    xit('get() should trigger load costCenter details when they are not present in the store', (done) => {
      const sub = service.get(costCenterCode).subscribe();

      actions$
        .pipe(ofType(CostCenterActions.LOAD_COST_CENTER), take(1))
        .subscribe((action) => {
          expect(action).toEqual(
            new CostCenterActions.LoadCostCenter({ userId, costCenterCode })
          );
          sub.unsubscribe();
          done();
        });
    });

    it('get() should be able to get costCenter details when they are present in the store', () => {
      store.dispatch(
        new CostCenterActions.LoadCostCenterSuccess([costCenter, costCenter2])
      );
      let costCenterDetails: CostCenter;
      service
        .get(costCenterCode)
        .subscribe((data) => {
          costCenterDetails = data;
        })
        .unsubscribe();

      expect(userIdService.takeUserId).not.toHaveBeenCalled();
      expect(costCenterDetails).toEqual(costCenter);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new CostCenterActions.LoadCostCenter({ userId, costCenterCode })
      );
    });
  });

  describe('get costCenters', () => {
    const params: SearchConfig = { sort: 'code' };

    it('getList() should trigger load costCenters when they are not present in the store', () => {
      let costCenters: EntitiesModel<CostCenter>;
      service
        .getList(params)
        .subscribe((data) => {
          costCenters = data;
        })
        .unsubscribe();

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(costCenters).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new CostCenterActions.LoadCostCenters({ userId, params })
      );
    });

    it('getList() should be able to get costCenters when they are present in the store', () => {
      store.dispatch(
        new CostCenterActions.LoadCostCenterSuccess([costCenter, costCenter2])
      );
      store.dispatch(
        new CostCenterActions.LoadCostCentersSuccess({
          params,
          page: {
            ids: [costCenter.code, costCenter2.code],
            pagination,
            sorts,
          },
        })
      );
      let costCenters: EntitiesModel<CostCenter>;
      service
        .getList(params)
        .subscribe((data) => {
          costCenters = data;
        })
        .unsubscribe();

      expect(userIdService.takeUserId).not.toHaveBeenCalled();
      expect(costCenters).toEqual(costCenterList);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new CostCenterActions.LoadCostCenters({ userId, params })
      );
    });
  });

  describe('create costCenter', () => {
    it('create() should should dispatch CreateCostCenter action', () => {
      service.create(costCenter);

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new CostCenterActions.CreateCostCenter({ userId, costCenter })
      );
    });
  });

  describe('update costCenter', () => {
    it('update() should should dispatch UpdateCostCenter action', () => {
      service.update(costCenterCode, costCenter);

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new CostCenterActions.UpdateCostCenter({
          userId,
          costCenterCode,
          costCenter,
        })
      );
    });
  });

  describe('get budgets', () => {
    const params: SearchConfig = { sort: 'code' };

    it('getBudgets() should trigger load budgets when they are not present in the store', () => {
      let budgets: EntitiesModel<Budget>;
      service
        .getBudgets(costCenterCode, params)
        .subscribe((data) => {
          budgets = data;
        })
        .unsubscribe();

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(budgets).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new CostCenterActions.LoadAssignedBudgets({
          userId,
          costCenterCode,
          params,
        })
      );
    });

    it('getBudgets() should be able to get budgets when they are present in the store', () => {
      store.dispatch(new BudgetActions.LoadBudgetSuccess([budget, budget2]));
      store.dispatch(
        new CostCenterActions.LoadAssignedBudgetsSuccess({
          costCenterCode,
          params,
          page: {
            ids: [budget.code, budget2.code],
            pagination,
            sorts,
          },
        })
      );
      let budgets: EntitiesModel<Budget>;
      service
        .getBudgets(costCenterCode, params)
        .subscribe((data) => {
          budgets = data;
        })
        .unsubscribe();

      expect(userIdService.takeUserId).not.toHaveBeenCalled();
      expect(budgets).toEqual(budgetList);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new BudgetActions.LoadBudgets({ userId, params })
      );
    });
  });

  describe('assign budget to costCenter', () => {
    it('assignBudget() should should dispatch AssignBudget action', () => {
      service.assignBudget(costCenterCode, budgetCode);

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new CostCenterActions.AssignBudget({
          userId,
          costCenterCode,
          budgetCode,
        })
      );
    });
  });

  describe('unassign budget to costCenter', () => {
    it('unassignBudget() should should dispatch UnassignBudget action', () => {
      service.unassignBudget(costCenterCode, budgetCode);

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new CostCenterActions.UnassignBudget({
          userId,
          costCenterCode,
          budgetCode,
        })
      );
    });
  });

  describe('get loading Status', () => {
    it('getLoadingStatus() should should be able to get status success change from loading with value', () => {
      let loadingStatus: OrganizationItemStatus<CostCenter>;
      store.dispatch(
        new CostCenterActions.LoadCostCenter({ userId, costCenterCode })
      );
      service
        .getLoadingStatus(costCenterCode)
        .subscribe((status) => (loadingStatus = status));
      expect(loadingStatus).toBeUndefined();
      store.dispatch(new CostCenterActions.LoadCostCenterSuccess([costCenter]));
      expect(loadingStatus).toEqual({
        status: LoadStatus.SUCCESS,
        item: costCenter,
      });
    });

    it('getLoadingStatus() should should be able to get status fail', () => {
      let loadingStatus: OrganizationItemStatus<CostCenter>;
      store.dispatch(
        new CostCenterActions.LoadCostCenter({ userId, costCenterCode })
      );
      service
        .getLoadingStatus(costCenterCode)
        .subscribe((status) => (loadingStatus = status));
      expect(loadingStatus).toBeUndefined();
      store.dispatch(
        new CostCenterActions.LoadCostCenterFail({
          costCenterCode,
          error: new Error(),
        })
      );
      expect(loadingStatus).toEqual({
        status: LoadStatus.ERROR,
        item: undefined,
      });
    });
  });

  describe('getErrorState', () => {
    it('getErrorState() should be able to get status error', () => {
      let errorState: boolean;
      spyOn<any>(service, 'getCostCenterState').and.returnValue(
        of({ loading: false, success: false, error: true })
      );

      service.getErrorState('code').subscribe((error) => (errorState = error));

      expect(errorState).toBeTrue();
    });
  });
});
