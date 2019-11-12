import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap, combineReducers } from '@ngrx/store';
import { entityLoaderReducer } from '../../../state/utils/entity-loader/entity-loader.reducer';

import { BUDGET_FEATURE, OrganizationState, BUDGET_ENTITIES, BUDGET_LISTS } from '../organization-state';
import { Budget } from '../../../model/budget.model';
import { ListModel } from '../../../model/misc.model';
import { budgetsListReducer } from './budget.reducer';

export function getReducers(): ActionReducerMap<OrganizationState> {
  return {
    [BUDGET_FEATURE]: combineReducers({
      [BUDGET_ENTITIES]: entityLoaderReducer<Budget>(BUDGET_ENTITIES),
      [BUDGET_LISTS]: entityLoaderReducer<ListModel>(BUDGET_LISTS, budgetsListReducer),
    }),
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
