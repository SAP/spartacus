import { createSelector, MemoizedSelector } from '@ngrx/store';
import { CostCenter } from '../../../model/cost-center.model';
import { EntitiesModel } from '../../../model/misc.model';
import { entityStateSelector } from '../../../state/utils/entity-loader/entity-loader.selectors';
import { EntityLoaderState } from '../../../state/utils/entity-loader/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { B2BSearchConfig } from '../../model/search-config';
import { denormalizeB2BSearch } from '../../utils/serializer';
import {
  CostCenterManagement,
  COST_CENTER_FEATURE,
  OrganizationState,
  StateWithOrganization,
} from '../organization-state';
import { getOrganizationState } from './feature.selector';

export const getCostCenterManagementState: MemoizedSelector<
  StateWithOrganization,
  CostCenterManagement
> = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state[COST_CENTER_FEATURE]
);

export const getCostCentersState: MemoizedSelector<
  StateWithOrganization,
  EntityLoaderState<CostCenter>
> = createSelector(
  getCostCenterManagementState,
  (state: CostCenterManagement) => state && state.entities
);

export const getCostCenterState = (
  costCenterCode: string
): MemoizedSelector<StateWithOrganization, LoaderState<CostCenter>> =>
  createSelector(
    getCostCentersState,
    (state: EntityLoaderState<CostCenter>) =>
      entityStateSelector(state, costCenterCode)
  );

export const getCostCenterList = (
  params: B2BSearchConfig
): MemoizedSelector<
  StateWithOrganization,
  LoaderState<EntitiesModel<CostCenter>>
> =>
  createSelector(
    getCostCenterManagementState,
    (state: CostCenterManagement) =>
      denormalizeB2BSearch<CostCenter>(state, params)
  );
