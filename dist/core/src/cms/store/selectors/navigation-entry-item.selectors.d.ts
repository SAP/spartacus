import { MemoizedSelector } from '@ngrx/store';
import { StateUtils } from '../../../state/utils/index';
import { NodeItem } from '../../model/node-item.model';
import { StateWithCms } from '../cms-state';
export declare const getNavigationEntryItemState: MemoizedSelector<StateWithCms, StateUtils.EntityLoaderState<NodeItem>>;
export declare const getSelectedNavigationEntryItemState: (nodeId: string) => MemoizedSelector<StateWithCms, StateUtils.LoaderState<NodeItem>>;
export declare const getNavigationEntryItems: (nodeId: string) => MemoizedSelector<StateWithCms, NodeItem>;
