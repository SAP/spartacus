import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromNavigationEntryItem from '../reducers/navigation-entry-item.reducer';
import { CmsState, NavigationItemState } from '../cms-state';

export const getNavigationEntryItemState: MemoizedSelector<
  any,
  NavigationItemState
> = createSelector(
  fromFeature.getCmsState,
  (state: CmsState) => state.navigation
);

export const getNavigationEntryItems: MemoizedSelector<
  any,
  any
> = createSelector(
  getNavigationEntryItemState,
  fromNavigationEntryItem.getNavigationEntryItems
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
