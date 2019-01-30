import { createSelector, MemoizedSelector } from '@ngrx/store';
import { CmsState, ComponentState, StateWithCms } from '../cms-state';
import { getCmsState } from './feature.selectors';
import { entityStateSelector } from '../../../state/utils/entity-loader/entity-loader.selectors';
import { loaderValueSelector } from '../../../state/utils/loader/loader.selectors';
import { LoaderState } from '../../../state/utils/loader/loader-state';

export const getComponentEntitiesSelector = (state: ComponentState) =>
  Object.keys(state.entities).reduce((acc, cur) => {
    acc[cur] = state.entities[cur].value;
    return acc;
  }, {});

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

export const componentStateSelectorFactory = (
  uid
): MemoizedSelector<StateWithCms, LoaderState<any>> => {
  return createSelector(
    getComponentState,
    entities => entityStateSelector(entities, uid)
  );
};

export const componentSelectorFactory = (
  uid
): MemoizedSelector<StateWithCms, any> => {
  return createSelector(
    componentStateSelectorFactory(uid),
    state => loaderValueSelector(state)
  );
};
