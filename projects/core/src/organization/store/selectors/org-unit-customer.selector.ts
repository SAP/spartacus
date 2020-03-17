import { createSelector, MemoizedSelector } from '@ngrx/store';
import { entityStateSelector } from '../../../state/utils/entity-loader/entity-loader.selectors';
import { EntityLoaderState } from '../../../state/utils/entity-loader/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  OrganizationState,
  StateWithOrganization,
  OrgUnitCustomerManagement,
  ORG_UNIT_CUSTOMER_FEATURE,
} from '../organization-state';
import { getOrganizationState } from './feature.selector';
import { denormalizeB2BSearch } from '../../utils/serializer';
import { OrgUnitCustomer, EntitiesModel } from '../../../model';
import { B2BSearchConfig } from '../../model/search-config';

export const getOrgUnitCustomerManagementState: MemoizedSelector<
  StateWithOrganization,
  OrgUnitCustomerManagement
> = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state[ORG_UNIT_CUSTOMER_FEATURE]
);

export const getOrgUnitCustomersState: MemoizedSelector<
  StateWithOrganization,
  EntityLoaderState<OrgUnitCustomer>
> = createSelector(
  getOrgUnitCustomerManagementState,
  (state: OrgUnitCustomerManagement) => state && state.entities
);

export const getOrgUnitCustomerState = (
  orgUnitCustomerId: string
): MemoizedSelector<StateWithOrganization, LoaderState<OrgUnitCustomer>> =>
  createSelector(
    getOrgUnitCustomersState,
    (state: EntityLoaderState<OrgUnitCustomer>) =>
      entityStateSelector(state, orgUnitCustomerId)
  );

export const getOrgUnitCustomerList = (
  params: B2BSearchConfig
): MemoizedSelector<
  StateWithOrganization,
  LoaderState<EntitiesModel<OrgUnitCustomer>>
> =>
  createSelector(
    getOrgUnitCustomerManagementState,
    (state: OrgUnitCustomerManagement) =>
      denormalizeB2BSearch<OrgUnitCustomer>(state, params)
  );
