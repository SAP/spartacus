import { createSelector, MemoizedSelector } from '@ngrx/store';
import { CmsState, StateWithCms } from '../cms-state';
import { getCmsState } from './feature.selectors';
import { NodeItem } from '../../model/node-item.model';
import { EntityLoaderState } from '../../../state/utils/entity-loader/entity-loader-state';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { entityStateSelector } from '../../../state/utils/entity-loader/entity-loader.selectors';
import { loaderValueSelector } from '../../../state/utils/loader/loader.selectors';

export const getNavigationEntryItemState: MemoizedSelector<
  StateWithCms,
  EntityLoaderState<NodeItem>
> = createSelector(
  getCmsState,
  (state: CmsState) => state.navigation
);

export const getSelectedNavigationEntryItemState = (
  nodeId: string
): MemoizedSelector<StateWithCms, LoaderState<NodeItem>> => {
  return createSelector(
    getNavigationEntryItemState,
    nodes => entityStateSelector(nodes, nodeId)
  );
};

export const itemsSelectorFactory = (
  nodeId: string
): MemoizedSelector<StateWithCms, NodeItem> => {
  return createSelector(
    getSelectedNavigationEntryItemState(nodeId),
    itemState => loaderValueSelector(itemState)
  );
};
