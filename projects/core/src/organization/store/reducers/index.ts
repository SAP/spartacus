import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap, combineReducers } from '@ngrx/store';
import { Budget } from '../../../model/budget.model';
import { ListModel } from '../../../model/misc.model';
import { B2BUnitNode } from '../../../model/org-unit.model';
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
  PERMISSION_ENTITIES,
  PERMISSION_FEATURE,
  PERMISSION_LISTS,
} from '../organization-state';
import { budgetsListReducer } from './budget.reducer';
import { orgUnitListReducer } from './org-unit.reducer';
import { permissionsListReducer } from './permission.reducer';

export function getReducers(): ActionReducerMap<OrganizationState> {
  return {
    [BUDGET_FEATURE]: combineReducers({
      entities: entityLoaderReducer<Budget>(BUDGET_ENTITIES),
      lists: entityLoaderReducer<ListModel>(BUDGET_LISTS, budgetsListReducer),
    }),
    [PERMISSION_FEATURE]: combineReducers({
      entities: entityLoaderReducer<Permission>(PERMISSION_ENTITIES),
      lists: entityLoaderReducer<ListModel>(
        PERMISSION_LISTS,
        permissionsListReducer
      ),
    }),
    [ORG_UNIT_FEATURE]: combineReducers({
      entities: entityLoaderReducer<B2BUnitNode>(ORG_UNIT_ENTITIES),
      lists: entityLoaderReducer<ListModel>(ORG_UNIT_LISTS, orgUnitListReducer),
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
