import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  StateEntityLoaderSelectors,
  StateLoaderSelectors,
} from '../../../state/utils/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { CmsState, ComponentState, StateWithCms } from '../cms-state';
import { getCmsState } from './feature.selectors';

const getComponentEntitiesSelector = (state: ComponentState): any =>
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
  uid: string
): MemoizedSelector<StateWithCms, LoaderState<any>> => {
  return createSelector(
    getComponentState,
    entities => {
      // the whole component entities are emtpy
      if (Object.keys(entities.entities).length === 0) {
        return undefined;
      } else {
        return StateEntityLoaderSelectors.entityStateSelector(entities, uid);
      }
    }
  );
};

export const componentSelectorFactory = (
  uid: string
): MemoizedSelector<StateWithCms, any> => {
  return createSelector(
    componentStateSelectorFactory(uid),
    state => {
      if (state) {
        return StateLoaderSelectors.loaderValueSelector(state);
      } else {
        return undefined;
      }
    }
  );
};
