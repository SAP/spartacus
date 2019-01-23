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
import { loaderValueSelector } from '../../../state/utils/loader/loader.selectors';

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

export const getSelectedNavigationEntryItemState = (
  nodeId
): MemoizedSelector<StateWithCms, any> => {
  return createSelector(
    getNavigationEntryItemState,
    nodes => entityStateSelector(nodes, nodeId)
  );
};

export const itemsSelectorFactory = (
  nodeId
): MemoizedSelector<StateWithCms, any> => {
  return createSelector(
    getSelectedNavigationEntryItemState(nodeId),
    itemState => loaderValueSelector(itemState)
  );
};
