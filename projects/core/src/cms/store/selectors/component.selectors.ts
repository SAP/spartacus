import { createSelector, MemoizedSelector } from '@ngrx/store';
import { CmsState, ComponentState, StateWithCms } from '../cms-state';
import { getCmsState } from './feature.selectors';

export const getComponentEntitiesSelector = (state: ComponentState) =>
  state.entities;

export const getComponentState: MemoizedSelector<
  StateWithCms,
  ComponentState
> = createSelector(
  getCmsState,
  (state: CmsState) => state.component
);

export const getComponentEntities: MemoizedSelector<
  StateWithCms,
  { [id: string]: any }
> = createSelector(
  getComponentState,
  getComponentEntitiesSelector
);

export const componentSelectorFactory = (
  uid
): MemoizedSelector<StateWithCms, any> => {
  return createSelector(
    getComponentEntities,
    entities => {
      if (Object.keys(entities).length !== 0) {
        return entities[uid];
      } else {
        return null;
      }
    }
  );
};
