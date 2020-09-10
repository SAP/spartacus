import { BudgetActions } from '../actions/index';
import {
  budgetInitialState,
  budgetsInitialState,
  budgetsEntitiesReducer,
  budgetsListReducer,
} from './budget.reducer';
import { Budget } from '../../model';

fdescribe('hehe', () => {
  describe('Budget Entities Reducer', () => {
    describe('no action', () => {
      it('should return the default state', () => {
        const action = { type: '' };
        const state = budgetsEntitiesReducer(undefined, action);

        expect(state).toBe(budgetInitialState);
      });
    });

    describe('LOAD_BUDGET_SUCCESS action', () => {
      it('should return the budget', () => {
        const budget: Budget = {
          name: 'testBudget',
        };

        const action = new BudgetActions.LoadBudgetSuccess([budget]);
        const result = budgetsEntitiesReducer(budgetInitialState, action);

        expect(result).toEqual(budget);
      });
    });
  });

  describe('Budget List Reducer', () => {
    describe('no action', () => {
      it('should return the default state', () => {
        const action = { type: '' };
        const state = budgetsListReducer(undefined, action);

        expect(state).toBe(budgetsInitialState);
      });
    });
  });
});
