import * as fromNavigationItem from '../actions/navigation-entry-item.action';
import { NavigationItemState, NavigationNodes } from '../cms-state';
import { NodeItem } from '../../model/node-item.model';

export const initialState: NavigationItemState = {
  nodes: {} as NavigationNodes
};

export function reducer(
  state = initialState,
  action: fromNavigationItem.NavigationEntryItemAction
): NavigationItemState {
  switch (action.type) {
    case fromNavigationItem.LOAD_NAVIGATION_ITEMS_SUCCESS: {
      if (action.payload.components) {
        const components = action.payload.components;
        const nodeId = action.payload.nodeId;

        const newItem: NodeItem = components.reduce(
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

        const nodes: NavigationNodes = {
          ...state.nodes,
          [nodeId]: newItem
        };

        return {
          ...state,
          nodes
        };
      }
    }
  }

  return state;
}
