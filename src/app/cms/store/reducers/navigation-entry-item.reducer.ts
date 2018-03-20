import * as fromNavigationItem from '../actions/navigation-entry-item.action';
import { NodeItem } from '../../models/node-item.model';

export interface NavigationItemState {
  nodes: { [nodeId: string]: NodeItem };
  loading: boolean;
}

export const initialState: NavigationItemState = {
  nodes: {},
  loading: false
};

export function reducer(
  state = initialState,
  action: fromNavigationItem.NavigationEntryItemAction
): NavigationItemState {
  switch (action.type) {
    case fromNavigationItem.LOAD_NAVIGATION_ITEMS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromNavigationItem.LOAD_NAVIGATION_ITEMS_FAIL: {
      return {
        ...state,
        loading: false
      };
    }

    case fromNavigationItem.LOAD_NAVIGATION_ITEMS_SUCCESS: {
      if (action.payload.components) {
        const components = action.payload.components;
        const nodeId = action.payload.nodeId;

        const newItem = components.reduce(
          (compItems: { [uid_type: string]: any }, component: any) => {
            return {
              ...compItems,
              [`${component.uid}_AbstractCMSComponent`]: component
            };
          },
          {
            ...{}
          }
        );

        const nodes = {
          ...state.nodes,
          [nodeId]: newItem
        };
        console.log(newItem);
        return {
          ...state,
          nodes,
          loading: false
        };
      }
    }
  }

  return state;
}

export const getNavigationEntryItems = (state: NavigationItemState) =>
  state.nodes;
export const getLoadingStatue = (state: NavigationItemState) => state.loading;
