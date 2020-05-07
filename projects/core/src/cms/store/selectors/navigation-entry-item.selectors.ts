import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateUtils } from '../../../state/utils/index';
import { NodeItem } from '../../model/node-item.model';
import { CmsState, StateWithCms } from '../cms-state';
import { getCmsState } from './feature.selectors';

export const getNavigationEntryItemState: MemoizedSelector<
  StateWithCms,
  StateUtils.EntityLoaderState<NodeItem>
> = createSelector(getCmsState, (state: CmsState) => state.navigation);

export const getSelectedNavigationEntryItemState = (
  nodeId: string
): MemoizedSelector<StateWithCms, StateUtils.LoaderState<NodeItem>> => {
  return createSelector(getNavigationEntryItemState, (nodes) =>
    StateUtils.entityLoaderStateSelector(nodes, nodeId)
  );
};

export const getNavigationEntryItems = (
  nodeId: string
): MemoizedSelector<StateWithCms, NodeItem> => {
  return createSelector(
    getSelectedNavigationEntryItemState(nodeId),
    (itemState) => StateUtils.loaderValueSelector(itemState)
  );
};
