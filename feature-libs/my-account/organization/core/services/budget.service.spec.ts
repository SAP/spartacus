import { inject, TestBed } from '@angular/core/testing';
import { ActionsSubject, Store, StoreModule } from '@ngrx/store';
import { AuthService, EntitiesModel, SearchConfig } from '@spartacus/core';
import { of } from 'rxjs';
import { Budget } from '../model/budget.model';
import { BudgetActions } from '../store/actions/index';
import {
  ORGANIZATION_FEATURE,
  StateWithOrganization,
} from '../store/organization-state';
import * as fromReducers from '../store/reducers/index';
import { BudgetService } from './budget.service';
import {
  LoadStatus,
  OrganizationItemStatus,
} from '../model/organization-item-status';
import { take } from 'rxjs/operators';
import { ofType } from '@ngrx/effects';
import createSpy = jasmine.createSpy;

const userId = 'current';
const budgetCode = 'testBudget';
const budget = { code: budgetCode };
const budget2 = { code: 'testBudget2' };
const pagination = { currentPage: 1 };
const sorts = [{ selected: true, name: 'code' }];
const budgetList: EntitiesModel<Budget> = {
  values: [budget, budget2],
  pagination,
  sorts,
};

class MockAuthService {
  getOccUserId = createSpy().and.returnValue(of(userId));
}

describe('BudgetService', () => {
  let service: BudgetService;
  let authService: AuthService;
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
        BudgetService,
        { provide: AuthService, useClass: MockAuthService },
      ],
    });

    store = TestBed.inject(Store);
    service = TestBed.inject(BudgetService);
    authService = TestBed.inject(AuthService);
    spyOn(store, 'dispatch').and.callThrough();

    actions$ = TestBed.inject(ActionsSubject);
  });

  it('should BudgetService is injected', inject(
    [BudgetService],
    (budgetService: BudgetService) => {
      expect(budgetService).toBeTruthy();
    }
  ));

  describe('get budget', () => {
    it('get() should trigger load budget details when they are not present in the store', (done) => {
      const sub = service.get(budgetCode).subscribe();

      actions$
        .pipe(ofType(BudgetActions.LOAD_BUDGET), take(1))
        .subscribe((action) => {
          expect(action).toEqual(
            new BudgetActions.LoadBudget({ userId, budgetCode })
          );
          sub.unsubscribe();
          done();
        });
    });

    it('get() should be able to get budget details when they are present in the store', () => {
      store.dispatch(new BudgetActions.LoadBudgetSuccess([budget, budget2]));
      let budgetDetails: Budget;
      service
        .get(budgetCode)
        .subscribe((data) => {
          budgetDetails = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).not.toHaveBeenCalled();
      expect(budgetDetails).toEqual(budget);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new BudgetActions.LoadBudget({ userId, budgetCode })
      );
    });
  });

  describe('get budgets', () => {
    const params: SearchConfig = { sort: 'code' };

    it('getList() should trigger load budgets when they are not present in the store', () => {
      let budgets: EntitiesModel<Budget>;
      service
        .getList(params)
        .subscribe((data) => {
          budgets = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(budgets).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new BudgetActions.LoadBudgets({ userId, params })
      );
    });

    it('getList() should be able to get budgets when they are present in the store', () => {
      store.dispatch(new BudgetActions.LoadBudgetSuccess([budget, budget2]));
      store.dispatch(
        new BudgetActions.LoadBudgetsSuccess({
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
        .getList(params)
        .subscribe((data) => {
          budgets = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).not.toHaveBeenCalled();
      expect(budgets).toEqual(budgetList);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new BudgetActions.LoadBudgets({ userId, params })
      );
    });
  });

  describe('create budget', () => {
    it('create() should should dispatch CreateBudget action', () => {
      service.create(budget);

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new BudgetActions.CreateBudget({ userId, budget })
      );
    });
  });

  describe('update budget', () => {
    it('update() should should dispatch UpdateBudget action', () => {
      service.update(budgetCode, budget);

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new BudgetActions.UpdateBudget({ userId, budgetCode, budget })
      );
    });
  });

  describe('get loading Status', () => {
    it('getLoadingStatus() should should be able to get status success change from loading with value', () => {
      let loadingStatus: OrganizationItemStatus<Budget>;
      store.dispatch(new BudgetActions.LoadBudget({ userId, budgetCode }));
      service
        .getLoadingStatus(budgetCode)
        .subscribe((status) => (loadingStatus = status));
      expect(loadingStatus).toBeUndefined();
      store.dispatch(new BudgetActions.LoadBudgetSuccess([budget]));
      expect(loadingStatus).toEqual({
        status: LoadStatus.SUCCESS,
        item: budget,
      });
    });

    it('getLoadingStatus() should should be able to get status fail', () => {
      let loadingStatus: OrganizationItemStatus<Budget>;
      store.dispatch(new BudgetActions.LoadBudget({ userId, budgetCode }));
      service
        .getLoadingStatus(budgetCode)
        .subscribe((status) => (loadingStatus = status));
      expect(loadingStatus).toBeUndefined();
      store.dispatch(
        new BudgetActions.LoadBudgetFail({ budgetCode, error: new Error() })
      );
      expect(loadingStatus).toEqual({
        status: LoadStatus.ERROR,
        item: undefined,
      });
    });
  });
});
