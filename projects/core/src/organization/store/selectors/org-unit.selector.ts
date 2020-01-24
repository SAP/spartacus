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
  ORG_UNIT_ENTITIES,
} from '../organization-state';
import { getOrganizationState } from './feature.selector';
import { LIST } from '../../model/search-config';
import { EntitiesModel } from '@spartacus/core';

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
  (state: OrgUnits) => state && state[ORG_UNIT_ENTITIES]
);

export const getOrgUnitState = (
  budgetCode: string
): MemoizedSelector<StateWithOrganization, LoaderState<B2BUnitNode>> =>
  createSelector(
    getOrgUnitsState,
    (state: EntityLoaderState<B2BUnitNode>) =>
      entityStateSelector(state, budgetCode)
  );

// TODO: better mechanism for denormalization
// create service encapsulating denormalization

export const getOrgUnitList = (): MemoizedSelector<
  StateWithOrganization,
  LoaderState<EntitiesModel<B2BUnitNode>>
> =>
  createSelector(
    getB2BOrgUnitState,
    (state: OrgUnits) => {
      const list: any = entityStateSelector(state.list, LIST);
      if (!list.value || !list.value.ids) {
        return list;
      }
      const res: LoaderState<EntitiesModel<B2BUnitNode>> = Object.assign(
        {},
        list,
        {
          value: {
            values: list.value.ids.map(
              id => entityStateSelector(state.entities, id).value
            ),
          },
        }
      );
      return res;
    }
  );
