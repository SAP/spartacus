import * as fromNavigationItem from '../actions/navigation-entry-item.action';
import { NodeItem } from '../../models/node-item.model';

export interface NavigationItemState {
  items: { [nodeId: string]: NodeItem };
}

export const initialState: NavigationItemState = {
  items: {}
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

        const items = components.reduce(
          (compItems: { [uid_type: string]: any }, component: any) => {
            return {
              ...compItems,
              [component.uid_`AbstractCMSComponent`]: component
            };
          },
          {
            ...state[nodeId].items
          }
        );

        return {
          ...state,
          items
        };
      }
    }
  }
  return state;
}

export const getNavigationEntryItems = (state: NavigationItemState) =>
  state.items;
