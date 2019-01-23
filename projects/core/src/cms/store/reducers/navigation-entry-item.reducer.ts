import * as fromNavigationItem from '../actions/navigation-entry-item.action';
import { NodeItem } from '../../model/node-item.model';
import { NavigationNodes } from '../cms-state';

export const initialState: NavigationNodes = {};

export function reducer(
  state = initialState,
  action: fromNavigationItem.NavigationEntryItemAction
): NavigationNodes {
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
          items: newItem
        };
      }
    }
  }

  return state;
}
