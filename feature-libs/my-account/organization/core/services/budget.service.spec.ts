import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { AuthService, EntitiesModel } from '@spartacus/core';
import { BudgetActions } from '../store/actions/index';
import * as fromReducers from '../store/reducers/index';
import { BudgetService } from './budget.service';
import { B2BSearchConfig } from '../model/search-config';
import { Budget } from '../model/budget.model';
import {
  StateWithOrganization,
  ORGANIZATION_FEATURE,
} from '../store/organization-state';

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

    store = TestBed.get(Store as Type<Store<StateWithOrganization>>);
    service = TestBed.get(BudgetService as Type<BudgetService>);
    authService = TestBed.get(AuthService as Type<AuthService>);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should BudgetService is injected', inject(
    [BudgetService],
    (budgetService: BudgetService) => {
      expect(budgetService).toBeTruthy();
    }
  ));

  describe('get budget', () => {
    it('get() should trigger load budget details when they are not present in the store', () => {
      let budgetDetails: Budget;
      service
        .get(budgetCode)
        .subscribe((data) => {
          budgetDetails = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(budgetDetails).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new BudgetActions.LoadBudget({ userId, budgetCode })
      );
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
    const params: B2BSearchConfig = { sort: 'code' };

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
});
