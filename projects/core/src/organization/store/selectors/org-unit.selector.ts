import { createSelector, MemoizedSelector } from '@ngrx/store';
import { B2BUnitNode } from '../../../model/org-unit.model';
import { entityStateSelector } from '../../../state/utils/entity-loader/entity-loader.selectors';
import { EntityLoaderState } from '../../../state/utils/entity-loader/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  OrgUnits,
  OrganizationState,
  StateWithOrganization,
  ORG_UNIT_FEATURE,
} from '../organization-state';
import { getOrganizationState } from './feature.selector';
import { denormalizeB2BSearch } from '../../utils/serializer';
import { EntitiesModel } from '../../../model/misc.model';

export const getB2BOrgUnitState: MemoizedSelector<
  StateWithOrganization,
  OrgUnits
> = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state[ORG_UNIT_FEATURE]
);

export const getOrgUnitsState: MemoizedSelector<
  StateWithOrganization,
  EntityLoaderState<B2BUnitNode>
> = createSelector(
  getB2BOrgUnitState,
  (state: OrgUnits) => state && state.entities
);

export const getOrgUnitState = (
  orgUnitId: string
): MemoizedSelector<StateWithOrganization, LoaderState<B2BUnitNode>> =>
  createSelector(
    getOrgUnitsState,
    (state: EntityLoaderState<B2BUnitNode>) =>
      entityStateSelector(state, orgUnitId)
  );

export const getOrgUnitList = (): MemoizedSelector<
  StateWithOrganization,
  LoaderState<EntitiesModel<B2BUnitNode>>
> =>
  createSelector(
    getB2BOrgUnitState,
    (state: OrgUnits) => denormalizeB2BSearch<B2BUnitNode>(state)
  );
