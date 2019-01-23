import * as fromNavigationItem from '../actions/navigation-entry-item.action';
import { NodeItem } from '../../model/node-item.model';

export const initialState: NodeItem = {};

export function reducer(
  state = initialState,
  action: fromNavigationItem.NavigationEntryItemAction
): NodeItem {
  switch (action.type) {
    case fromNavigationItem.LOAD_NAVIGATION_ITEMS_SUCCESS: {
      if (action.payload.components) {
        const components = action.payload.components;

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

        return {
          ...state,
          ...newItem
        };
      }
    }
  }

  return state;
}
