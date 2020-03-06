import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap, combineReducers } from '@ngrx/store';
import {
  Budget,
  B2BUnitNode,
  ListModel,
  Permission,
  CostCenter,
  B2BUnit,
  B2BApprovalProcess,
} from '../../../model';
import { entityLoaderReducer } from '../../../state/utils/entity-loader/entity-loader.reducer';
import {
  OrganizationState,
  BUDGET_ENTITIES,
  BUDGET_FEATURE,
  BUDGET_LIST,
  ORG_UNIT_FEATURE,
  ORG_UNIT_NODE_LIST,
  PERMISSION_ENTITIES,
  PERMISSION_FEATURE,
  PERMISSION_LIST,
  COST_CENTER_FEATURE,
  COST_CENTER_ENTITIES,
  COST_CENTER_LIST,
  COST_CENTER_ASSIGNED_BUDGETS,
  ORG_UNIT_ENTITIES,
  ORG_UNIT_APPROVAL_PROCESSES_ENTITIES,
  ORG_UNIT_TREE_ENTITY,
} from '../organization-state';
import { budgetsListReducer, budgetsEntitiesReducer } from './budget.reducer';
import { permissionsListReducer } from './permission.reducer';
import {
  costCentersListReducer,
  costCenterAssignedBudgetsListReducer,
} from './cost-center.reducer';

export function getReducers(): ActionReducerMap<OrganizationState> {
  return {
    [BUDGET_FEATURE]: combineReducers({
      entities: entityLoaderReducer<Budget>(
        BUDGET_ENTITIES,
        budgetsEntitiesReducer
      ),
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
      entities: entityLoaderReducer<B2BUnit>(ORG_UNIT_ENTITIES),
      availableOrgUnitNodes: entityLoaderReducer<B2BUnitNode[]>(
        ORG_UNIT_NODE_LIST
      ),
      tree: entityLoaderReducer<B2BUnitNode>(ORG_UNIT_TREE_ENTITY),
      approvalProcesses: entityLoaderReducer<B2BApprovalProcess[]>(
        ORG_UNIT_APPROVAL_PROCESSES_ENTITIES
      ),
    }),
    [COST_CENTER_FEATURE]: combineReducers({
      entities: entityLoaderReducer<CostCenter>(COST_CENTER_ENTITIES),
      list: entityLoaderReducer<ListModel>(
        COST_CENTER_LIST,
        costCentersListReducer
      ),
      budgets: entityLoaderReducer<ListModel>(
        COST_CENTER_ASSIGNED_BUDGETS,
        costCenterAssignedBudgetsListReducer
      ),
    }),
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<
  OrganizationState
>> = new InjectionToken<ActionReducerMap<OrganizationState>>(
  'OrganizationReducers'
);

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
