import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  Address,
  B2BApprovalProcess,
  B2BUnit,
  B2BUser,
  EntitiesModel,
  SearchConfig,
  StateUtils,
} from '@spartacus/core';
import { B2BUnitNode } from '../../model/unit-node.model';
import {
  OrganizationState,
  OrgUnits,
  ORG_UNIT_APPROVAL_PROCESSES,
  ORG_UNIT_FEATURE,
  ORG_UNIT_NODES,
  ORG_UNIT_TREE,
  StateWithOrganization,
} from '../organization-state';
import { getB2BUsersState } from './b2b-user.selector';
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
  StateUtils.EntityLoaderState<B2BUnitNode[]>
> = createSelector(
  getB2BOrgUnitState,
  (state: OrgUnits) => state && state.availableOrgUnitNodes
);

export const getOrgUnitsState: MemoizedSelector<
  StateWithOrganization,
  StateUtils.EntityLoaderState<B2BUnitNode>
> = createSelector(
  getB2BOrgUnitState,
  (state: OrgUnits) => state && state.entities
);

export const getOrgUnitsTreeState: MemoizedSelector<
  StateWithOrganization,
  StateUtils.EntityLoaderState<B2BUnitNode>
> = createSelector(
  getB2BOrgUnitState,
  (state: OrgUnits) => state && state.tree
);

export const getAddressesState: MemoizedSelector<
  StateWithOrganization,
  StateUtils.EntityLoaderState<Address>
> = createSelector(
  getB2BOrgUnitState,
  (state: OrgUnits) => state && state.addressEntities
);

export const getApprovalProcessesState: MemoizedSelector<
  StateWithOrganization,
  StateUtils.EntityLoaderState<B2BApprovalProcess[]>
> = createSelector(
  getB2BOrgUnitState,
  (state: OrgUnits) => state && state.approvalProcesses
);

export const getOrgUnit = (
  orgUnitId: string
): MemoizedSelector<StateWithOrganization, StateUtils.LoaderState<B2BUnit>> =>
  createSelector(
    getOrgUnitsState,
    (state: StateUtils.EntityLoaderState<B2BUnit>) =>
      StateUtils.entityLoaderStateSelector(state, orgUnitId)
  );

export const getOrgUnitValue = (
  orgUnitId: string
): MemoizedSelector<StateWithOrganization, B2BUnit> => {
  return createSelector(getOrgUnit(orgUnitId), (orgUnitState) =>
    StateUtils.loaderValueSelector(orgUnitState)
  );
};

export const getOrgUnitState = (
  orgUnitId: string
): MemoizedSelector<StateWithOrganization, StateUtils.LoaderState<B2BUnit>> =>
  createSelector(
    getOrgUnitsState,
    (state: StateUtils.EntityLoaderState<B2BUnit>) =>
      StateUtils.entityLoaderStateSelector(state, orgUnitId)
  );

export const getOrgUnitList = (): MemoizedSelector<
  StateWithOrganization,
  StateUtils.LoaderState<B2BUnitNode[]>
> =>
  createSelector(
    getOrgUnitsNodeListState,
    (state: StateUtils.EntityLoaderState<B2BUnitNode[]>) =>
      StateUtils.entityLoaderStateSelector(state, ORG_UNIT_NODES)
  );

export const getOrgUnitTree = (): MemoizedSelector<
  StateWithOrganization,
  StateUtils.LoaderState<B2BUnitNode>
> =>
  createSelector(
    getOrgUnitsTreeState,
    (state: StateUtils.EntityLoaderState<B2BUnitNode>) =>
      StateUtils.entityLoaderStateSelector(state, ORG_UNIT_TREE)
  );

export const getApprovalProcesses = (): MemoizedSelector<
  StateWithOrganization,
  StateUtils.LoaderState<B2BApprovalProcess[]>
> =>
  createSelector(
    getApprovalProcessesState,
    (state: StateUtils.EntityLoaderState<B2BApprovalProcess[]>) =>
      StateUtils.entityLoaderStateSelector(state, ORG_UNIT_APPROVAL_PROCESSES)
  );

export const getAssignedUsers = (
  orgUnitId: string,
  roleId: string,
  params: SearchConfig
): MemoizedSelector<
  StateWithOrganization,
  StateUtils.LoaderState<EntitiesModel<B2BUser>>
> =>
  createSelector(
    getB2BOrgUnitState,
    getB2BUsersState,
    (state: OrgUnits, users: StateUtils.EntityLoaderState<B2BUser>) =>
      StateUtils.denormalizeCustomB2BSearch(
        state.users,
        users,
        params,
        `${orgUnitId},${roleId}`
      )
  );

export const getB2BAddresses = (
  orgUnitId: string,
  params: SearchConfig
): MemoizedSelector<
  StateWithOrganization,
  StateUtils.LoaderState<EntitiesModel<Address>>
> =>
  createSelector(getB2BOrgUnitState, (state: OrgUnits) =>
    StateUtils.denormalizeCustomB2BSearch(
      state.addressList,
      state.addressEntities,
      params,
      orgUnitId
    )
  );

export const getB2BAddress = (
  addressId: string
): MemoizedSelector<StateWithOrganization, StateUtils.LoaderState<Address>> =>
  createSelector(
    getAddressesState,
    (state: StateUtils.EntityLoaderState<Address>) =>
      StateUtils.entityLoaderStateSelector(state, addressId)
  );
