import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  B2BApprovalProcess,
  B2BUnitNode,
  B2BUnit,
} from '../../../model/org-unit.model';
import { entityStateSelector } from '../../../state/utils/entity-loader/entity-loader.selectors';
import { EntityLoaderState } from '../../../state/utils/entity-loader/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  OrgUnits,
  OrganizationState,
  StateWithOrganization,
  ORG_UNIT_FEATURE,
  ORG_UNIT_TREE,
  ORG_UNIT_APPROVAL_PROCESSES,
  ORG_UNIT_NODES,
} from '../organization-state';
import { getOrganizationState } from './feature.selector';

export const getB2BOrgUnitState: MemoizedSelector<
  StateWithOrganization,
  OrgUnits
> = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state[ORG_UNIT_FEATURE]
);

export const getOrgUnitsNodeListState: MemoizedSelector<
  StateWithOrganization,
  EntityLoaderState<B2BUnitNode[]>
> = createSelector(
  getB2BOrgUnitState,
  (state: OrgUnits) => state && state.availableOrgUnitNodes
);

export const getOrgUnitsState: MemoizedSelector<
  StateWithOrganization,
  EntityLoaderState<B2BUnitNode>
> = createSelector(
  getB2BOrgUnitState,
  (state: OrgUnits) => state && state.entities
);

export const getOrgUnitsTree: MemoizedSelector<
  StateWithOrganization,
  EntityLoaderState<B2BUnitNode>
> = createSelector(
  getB2BOrgUnitState,
  (state: OrgUnits) => state && state.tree
);

export const getOrgUnitsApprovalProcesses: MemoizedSelector<
  StateWithOrganization,
  EntityLoaderState<B2BApprovalProcess[]>
> = createSelector(
  getB2BOrgUnitState,
  (state: OrgUnits) => state && state.approvalProcesses
);

export const getOrgUnitState = (
  orgUnitId: string
): MemoizedSelector<StateWithOrganization, LoaderState<B2BUnit>> =>
  createSelector(getOrgUnitsState, (state: EntityLoaderState<B2BUnit>) =>
    entityStateSelector(state, orgUnitId)
  );

export const getOrgUnitList = (): MemoizedSelector<
  StateWithOrganization,
  LoaderState<B2BUnitNode[]>
> =>
  createSelector(
    getOrgUnitsNodeListState,
    (state: EntityLoaderState<B2BUnitNode[]>) =>
      entityStateSelector(state, ORG_UNIT_NODES)
  );

export const getOrgUnitTreeState = (): MemoizedSelector<
  StateWithOrganization,
  LoaderState<B2BUnitNode>
> =>
  createSelector(getOrgUnitsTree, (state: EntityLoaderState<B2BUnitNode>) =>
    entityStateSelector(state, ORG_UNIT_TREE)
  );

export const getApprovalProcessesState = (): MemoizedSelector<
  StateWithOrganization,
  LoaderState<B2BApprovalProcess[]>
> =>
  createSelector(
    getOrgUnitsApprovalProcesses,
    (state: EntityLoaderState<B2BApprovalProcess[]>) =>
      entityStateSelector(state, ORG_UNIT_APPROVAL_PROCESSES)
  );
