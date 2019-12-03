import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap, combineReducers } from '@ngrx/store';
import { Budget } from '../../../model/budget.model';
import { B2BUnitNode } from '../../../model/org-unit.model';
import { ListModel } from '../../../model/misc.model';
import { entityLoaderReducer } from '../../../state/utils/entity-loader/entity-loader.reducer';
import {
  BUDGET_ENTITIES,
  BUDGET_FEATURE,
  BUDGET_LISTS,
  ORG_UNIT_ENTITIES,
  ORG_UNIT_FEATURE,
  ORG_UNIT_LISTS,
  OrganizationState,
} from '../organization-state';
import { budgetsListReducer } from './budget.reducer';
import { orgUnitListReducer } from './org-unit.reducer';

// TODO: Add scopes for entityLoaders

export function getReducers(): ActionReducerMap<OrganizationState> {
  return {
    [BUDGET_FEATURE]: combineReducers({
      [BUDGET_ENTITIES]: entityLoaderReducer<Budget>(BUDGET_ENTITIES),
      [BUDGET_LISTS]: entityLoaderReducer<ListModel>(
        BUDGET_LISTS,
        budgetsListReducer
      ),
    }),
    [ORG_UNIT_FEATURE]: combineReducers({
      [ORG_UNIT_ENTITIES]: entityLoaderReducer<B2BUnitNode>(ORG_UNIT_ENTITIES),
      [ORG_UNIT_LISTS]: entityLoaderReducer<ListModel>(
        ORG_UNIT_LISTS,
        orgUnitListReducer
      ),
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
