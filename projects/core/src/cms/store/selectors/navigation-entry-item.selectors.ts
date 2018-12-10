import { createSelector, MemoizedSelector } from '@ngrx/store';
import { CmsState, StateWithCms, TestState } from '../cms-state';
import { getCmsState } from './feature.selectors';

export const getNavigationEntryItemsSelector = (state: TestState) =>
  state.nodes;

export const getNavigationEntryItemState: MemoizedSelector<
  StateWithCms,
  TestState
> = createSelector(
  getCmsState,
  (state: CmsState) => state.navigation
);

export const getNavigationEntryItems: MemoizedSelector<
  StateWithCms,
  any
> = createSelector(
  getNavigationEntryItemState,
  getNavigationEntryItemsSelector
);

export const itemsSelectorFactory = (
  nodeId
): MemoizedSelector<StateWithCms, any> => {
  return createSelector(
    getNavigationEntryItems,
    nodes => {
      if (Object.keys(nodes).length !== 0) {
        return nodes[nodeId];
      }
    }
  );
};
