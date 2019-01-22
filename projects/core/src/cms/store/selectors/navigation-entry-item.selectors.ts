import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  CmsState,
  NavigationItemState,
  NavigationNodes,
  StateWithCms
} from '../cms-state';
import { getCmsState } from './feature.selectors';
import { NodeItem } from '../../model/node-item.model';
import { EntityLoaderState } from '../../../state/utils/entity-loader/entity-loader-state';
import { entityStateSelector } from '../../../state/utils/entity-loader/entity-loader.selectors';

export const getNavigationEntryItemsSelector: (
  state: NavigationItemState
) => NavigationNodes = state => state.nodes;

export const getNavigationEntryItemState: MemoizedSelector<
  StateWithCms,
  EntityLoaderState<NodeItem>
> = createSelector(
  getCmsState,
  (state: CmsState) => state.navigation
);

/*export const getNavigationEntryItems: MemoizedSelector<
  StateWithCms,
  any
> = createSelector(
  getNavigationEntryItemState,
  getNavigationEntryItemsSelector
);*/

export const itemsSelectorFactory = (
  nodeId
): MemoizedSelector<StateWithCms, any> => {
  console.log(getNavigationEntryItemState);
  return createSelector(
    getNavigationEntryItemState,
    nodes => entityStateSelector(nodes, nodeId)

    // {
    //  if (Object.keys(nodes).length !== 0) {
    //    return nodes[nodeId];
    //  }
    // }
  );
};
