import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap, combineReducers } from '@ngrx/store';
import { Budget } from '../../../model/budget.model';
import { B2BUnitNode } from '../../../model/org-unit.model';
import { ListModel } from '../../../model/misc.model';
import { Permission } from '../../../model/permission.model';
import { entityLoaderReducer } from '../../../state/utils/entity-loader/entity-loader.reducer';
import {
  OrganizationState,
  BUDGET_ENTITIES,
  BUDGET_FEATURE,
  BUDGET_LISTS,
  ORG_UNIT_ENTITIES,
  ORG_UNIT_FEATURE,
  ORG_UNIT_LISTS,
  PERMISSION_FEATURE,
  PERMISSION_ENTITIES,
  PERMISSION_LISTS,
} from '../organization-state';
import { budgetsListReducer } from './budget.reducer';
import { permissionsListReducer } from './permission.reducer';
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
    [PERMISSION_FEATURE]: combineReducers({
      [PERMISSION_ENTITIES]: entityLoaderReducer<Permission>(
        PERMISSION_ENTITIES
      ),
      [PERMISSION_LISTS]: entityLoaderReducer<ListModel>(
        PERMISSION_LISTS,
        permissionsListReducer
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
