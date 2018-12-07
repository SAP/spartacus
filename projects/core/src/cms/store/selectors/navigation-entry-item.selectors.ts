import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from '../reducers/index';
import { CmsState, TestState } from '../cms-state';

export const getNavigationEntryItemsSelector = (state: TestState) =>
  state.nodes;

export const getNavigationEntryItemState: MemoizedSelector<
  any,
  TestState
> = createSelector(
  fromFeature.getCmsState,
  (state: CmsState) => state.navigation
);

export const getNavigationEntryItems: MemoizedSelector<
  any,
  any
> = createSelector(
  getNavigationEntryItemState,
  getNavigationEntryItemsSelector
);

export const itemsSelectorFactory = (nodeId): MemoizedSelector<any, any> => {
  return createSelector(
    getNavigationEntryItems,
    nodes => {
      if (Object.keys(nodes).length !== 0) {
        return nodes[nodeId];
      }
    }
  );
};
