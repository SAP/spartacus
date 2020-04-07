import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  B2BApprovalProcess,
  B2BUnitNode,
  B2BUnit,
  B2BUser,
  B2BAddress,
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
import { B2BSearchConfig } from '../../model/search-config';
import { EntitiesModel } from '../../../model/misc.model';
import { denormalizeCustomB2BSearch } from '../../utils/serializer';
import { getB2BUsersState } from './b2b-user.selector';

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

export const getOrgUnitsTreeState: MemoizedSelector<
  StateWithOrganization,
  EntityLoaderState<B2BUnitNode>
> = createSelector(
  getB2BOrgUnitState,
  (state: OrgUnits) => state && state.tree
);

export const getAddressesState: MemoizedSelector<
  StateWithOrganization,
  EntityLoaderState<B2BAddress>
> = createSelector(
  getB2BOrgUnitState,
  (state: OrgUnits) => state && state.addressEntities
);

export const getApprovalProcessesState: MemoizedSelector<
  StateWithOrganization,
  EntityLoaderState<B2BApprovalProcess[]>
> = createSelector(
  getB2BOrgUnitState,
  (state: OrgUnits) => state && state.approvalProcesses
);

export const getOrgUnit = (
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

export const getOrgUnitTree = (): MemoizedSelector<
  StateWithOrganization,
  LoaderState<B2BUnitNode>
> =>
  createSelector(
    getOrgUnitsTreeState,
    (state: EntityLoaderState<B2BUnitNode>) =>
      entityStateSelector(state, ORG_UNIT_TREE)
  );

export const getApprovalProcesses = (): MemoizedSelector<
  StateWithOrganization,
  LoaderState<B2BApprovalProcess[]>
> =>
  createSelector(
    getApprovalProcessesState,
    (state: EntityLoaderState<B2BApprovalProcess[]>) =>
      entityStateSelector(state, ORG_UNIT_APPROVAL_PROCESSES)
  );

export const getAssignedUsers = (
  orgUnitId: string,
  roleId: string,
  params: B2BSearchConfig
): MemoizedSelector<
  StateWithOrganization,
  LoaderState<EntitiesModel<B2BUser>>
> =>
  createSelector(
    getB2BOrgUnitState,
    getB2BUsersState,
    (state: OrgUnits, users: EntityLoaderState<B2BUser>) =>
      denormalizeCustomB2BSearch(
        state.users,
        users,
        params,
        `${orgUnitId},${roleId}`
      )
  );

export const getB2BAddresses = (
  orgUnitId: string,
  params: B2BSearchConfig
): MemoizedSelector<
  StateWithOrganization,
  LoaderState<EntitiesModel<B2BAddress>>
> =>
  createSelector(getB2BOrgUnitState, (state: OrgUnits) =>
    denormalizeCustomB2BSearch(
      state.addressList,
      state.addressEntities,
      params,
      orgUnitId
    )
  );

export const getB2BAddress = (
  addressId: string
): MemoizedSelector<StateWithOrganization, LoaderState<B2BAddress>> =>
  createSelector(getAddressesState, (state: EntityLoaderState<B2BAddress>) =>
    entityStateSelector(state, addressId)
  );
