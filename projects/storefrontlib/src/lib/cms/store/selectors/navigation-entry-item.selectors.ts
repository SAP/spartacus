import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromNavigationEntryItem from '../reducers/navigation-entry-item.reducer';

export const getNavigationEntryItemState: MemoizedSelector<
  any,
  fromNavigationEntryItem.NavigationItemState
> = createSelector(
  fromFeature.getCmsState,
  (state: fromFeature.CmsState) => state.navigation
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
