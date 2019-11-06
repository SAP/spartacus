import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { entityLoaderReducer } from '../../../state/utils/entity-loader/entity-loader.reducer';

import { BUDGET_FEATURE, OrganizationState } from '../organization-state';
import { Budget } from '../../../model/budget.model';
import { budgetsEntitiesReducer } from './budget.reducer';

export function getReducers(): any {
  return {
    budget: {
      budgets: entityLoaderReducer<Budget>(BUDGET_FEATURE, budgetsEntitiesReducer),
    },
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<OrganizationState>
> = new InjectionToken<ActionReducerMap<OrganizationState>>(
  'OrganizationReducers'
);

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
