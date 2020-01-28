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
  BUDGET_LIST,
  ORG_UNIT_ENTITIES,
  ORG_UNIT_FEATURE,
  ORG_UNIT_LIST,
  PERMISSION_ENTITIES,
  PERMISSION_FEATURE,
  PERMISSION_LIST,
} from '../organization-state';
import { budgetsListReducer } from './budget.reducer';
import { orgUnitListReducer } from './org-unit.reducer';
import { permissionsListReducer } from './permission.reducer';

export function getReducers(): ActionReducerMap<OrganizationState> {
  return {
    [BUDGET_FEATURE]: combineReducers({
      entities: entityLoaderReducer<Budget>(BUDGET_ENTITIES),
      list: entityLoaderReducer<ListModel>(BUDGET_LIST, budgetsListReducer),
    }),
    [PERMISSION_FEATURE]: combineReducers({
      entities: entityLoaderReducer<Permission>(PERMISSION_ENTITIES),
      list: entityLoaderReducer<ListModel>(
        PERMISSION_LIST,
        permissionsListReducer
      ),
    }),
    [ORG_UNIT_FEATURE]: combineReducers({
      entities: entityLoaderReducer<B2BUnitNode>(ORG_UNIT_ENTITIES),
      list: entityLoaderReducer<ListModel>(ORG_UNIT_LIST, orgUnitListReducer),
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
