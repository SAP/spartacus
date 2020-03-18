import { createSelector, MemoizedSelector } from '@ngrx/store';
import { entityStateSelector } from '../../../state/utils/entity-loader/entity-loader.selectors';
import { EntityLoaderState } from '../../../state/utils/entity-loader/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  OrganizationState,
  StateWithOrganization,
  B2BUserManagement,
  B2B_USER_FEATURE,
} from '../organization-state';
import { getOrganizationState } from './feature.selector';
import { denormalizeB2BSearch } from '../../utils/serializer';
import { B2BUser, EntitiesModel } from '../../../model';
import { B2BSearchConfig } from '../../model/search-config';

export const getB2BUserManagementState: MemoizedSelector<
  StateWithOrganization,
  B2BUserManagement
> = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state[B2B_USER_FEATURE]
);

export const getB2BUsersState: MemoizedSelector<
  StateWithOrganization,
  EntityLoaderState<B2BUser>
> = createSelector(
  getB2BUserManagementState,
  (state: B2BUserManagement) => state && state.entities
);

export const getB2BUserState = (
  orgCustomerId: string
): MemoizedSelector<StateWithOrganization, LoaderState<B2BUser>> =>
  createSelector(getB2BUsersState, (state: EntityLoaderState<B2BUser>) =>
    entityStateSelector(state, orgCustomerId)
  );

export const getUserList = (
  params: B2BSearchConfig
): MemoizedSelector<
  StateWithOrganization,
  LoaderState<EntitiesModel<B2BUser>>
> =>
  createSelector(getB2BUserManagementState, (state: B2BUserManagement) =>
    denormalizeB2BSearch<B2BUser>(state, params)
  );
