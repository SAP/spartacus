import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  CmsState,
  NavigationItemState,
  NavigationNodes,
  StateWithCms
} from '../cms-state';
import { getCmsState } from './feature.selectors';

export const getNavigationEntryItemsSelector: (
  state: NavigationItemState
) => NavigationNodes = state => state.nodes;

export const getNavigationEntryItemState: MemoizedSelector<
  StateWithCms,
  NavigationItemState
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
